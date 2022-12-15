import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  Button,
  Card,
  LoaderScreen,
  Modal,
  Text,
  TextField,
  TouchableOpacity,
  View,
} from 'react-native-ui-lib';
import { TERRA_COLOR } from '../../../constants/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FlatList } from 'react-native-gesture-handler';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AdminInnNavigatorParamList } from 'types/navigator';
import { useAppDispatch } from '../../../redux/store';
import { getAllInns } from '../../../redux/actions/innGroupActions';
import { useSelector } from 'react-redux';
import { selectAddInnForms, selectInnGroups } from '../../../redux/selectors/innGroupSelector';
import { setInnForm } from '../../../redux/slices/innGroupSlice';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenWidth = Dimensions.get('window').width;

const data = [
  {
    name: 'Nhà trọ 01',
    address: 'Hẻm 1806/127 Huỳnh Tấn Phát, Nhà Bè, TP.HCM',
  },
  {
    name: 'Nhà trọ An Khang',
    address: 'Hẻm 1806/127 Huỳnh Tấn Phát, Nhà Bè, TP.HCM',
  },
  {
    name: 'Nhà trọ 01',
    address: 'Hẻm 1806/127 Huỳnh Tấn Phát, Nhà Bè, TP.HCM',
  },
  {
    name: 'Nhà trọ 01',
    address: 'Hẻm 1806/127 Huỳnh Tấn Phát, Nhà Bè, TP.HCM',
  },
  {
    name: 'Nhà trọ 01',
    address: 'Hẻm 1806/127 Huỳnh Tấn Phát, Nhà Bè, TP.HCM',
  },
  {
    name: 'Nhà trọ 01',
    address: 'Hẻm 1806/127 Huỳnh Tấn Phát, Nhà Bè, TP.HCM',
  },
  {
    name: 'Nhà trọ 01',
    address: 'Hẻm 1806/127 Huỳnh Tấn Phát, Nhà Bè, TP.HCM',
  },
];

const InnButton = ({ name, address, id }: { name: string; address: string; id: string }) => {
  const navigation = useNavigation<NativeStackNavigationProp<AdminInnNavigatorParamList>>();
  return (
    <Card
      style={styles.utilityItem}
      //@ts-ignore
      onPress={() => navigation.navigate('InnDetail', { innId: id })}
    >
      <Ionicons name={'ios-home'} size={25} />
      <Text text65 marginB-5 style={{ textAlign: 'center' }}>
        {name}
      </Text>
      <Text text85 color={TERRA_COLOR.GRAY[4]} style={{ textAlign: 'center' }} numberOfLines={2}>
        {address}
      </Text>
    </Card>
  );
};

export default function InnGroupScreen() {
  const [visible, setVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const inns = useSelector(selectInnGroups);
  const form = useSelector(selectAddInnForms);

  const textFieldProps = {
    floatingPlaceholder: false,
    fieldStyle: styles.withUnderline,
    migrate: true,
    labelColor: TERRA_COLOR.PRIMARY[3],
    containerStyle: styles.inputContainer,
  };

  const handleCreateInn = async () => {
    let token = await AsyncStorage.getItem('token');
    await axios
      .post(
        'motel-group',
        {
          ...form,
        },
        {
          headers: {
            token: token,
          },
        }
      )
      .then(() => {
        dispatch(getAllInns(token as string));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View flex style={{ alignItems: 'center' }}>
      {inns.length > 0 ? (
        <FlatList
          data={inns}
          renderItem={({ item }) => (
            <InnButton name={item.group_name} address={item.address} id={item.id} />
          )}
          numColumns={2}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Text text50>Hiện tại chưa có khu trọ, vui lòng tạo khu trọ mới</Text>
      )}
      <Modal visible={visible} onBackgroundPress={() => console.log('background pressed')}>
        <Modal.TopBar
          title={'Tạo khu trọ mới'}
          onCancel={() => setVisible(false)}
          onDone={() => console.log('done')}
          doneLabel="Tạo"
          titleStyle={{ fontSize: 20 }}
        />
        <TextField
          {...textFieldProps}
          label="Tên"
          placeholder="Tên khu trọ"
          value={form.group_name}
          onChangeText={(value: string) => dispatch(setInnForm({ ...form, group_name: value }))}
        />
        <TextField
          {...textFieldProps}
          label="Địa chỉ"
          placeholder="Địa chỉ khu trọ"
          value={form.address}
          onChangeText={(value: string) => dispatch(setInnForm({ ...form, address: value }))}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} margin-15>
          <Button
            label="Hủy"
            backgroundColor={TERRA_COLOR.GRAY[0]}
            color="black"
            onPress={() => setVisible(false)}
          />
          <Button
            label="Tạo"
            backgroundColor={TERRA_COLOR.PRIMARY[3]}
            onPress={() => {
              handleCreateInn();
              setVisible(false);
            }}
          />
        </View>
      </Modal>
      <TouchableOpacity onPress={() => setVisible(true)} style={styles.affixButton}>
        <Text style={{ fontSize: 40, color: 'white' }}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  utilityItem: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: '4%',
    backgroundColor: TERRA_COLOR.PRIMARY[1],
    borderRadius: 10,
    height: screenWidth * 0.4,
    width: screenWidth * 0.4,
    padding: '3%',
  },
  affixButton: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: TERRA_COLOR.DEFAULT[3],
    borderRadius: 30,
    elevation: 8,
  },
  withUnderline: {
    borderBottomWidth: 1,
    borderColor: TERRA_COLOR.PRIMARY[3],
    paddingBottom: 4,
  },
  inputContainer: {
    margin: '5%',
  },
});
