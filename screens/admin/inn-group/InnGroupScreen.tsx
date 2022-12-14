import React from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Card, Text, TouchableOpacity, View } from 'react-native-ui-lib';
import { TERRA_COLOR } from '../../../constants/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FlatList } from 'react-native-gesture-handler';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AdminInnNavigatorParamList } from 'types/navigator';

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

const InnButton = ({ name, address }: { name: string; address: string }) => {
  const navigation = useNavigation<NativeStackNavigationProp<AdminInnNavigatorParamList>>();
  return (
    <Card style={styles.utilityItem} onPress={() => navigation.navigate('InnDetail')}>
      <Ionicons name={'ios-home'} size={30} />
      <Text text60 marginB-5 style={{ textAlign: 'center' }}>
        {name}
      </Text>
      <Text text80 color={TERRA_COLOR.GRAY[4]} style={{ textAlign: 'center' }} numberOfLines={2}>
        {address}
      </Text>
    </Card>
  );
};

export default function InnGroupScreen() {
  return (
    <View style={{ alignItems: 'center' }}>
      <FlatList
        data={data}
        renderItem={({ item }) => <InnButton name={item.name} address={item.address} />}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity onPress={() => alert('FAB clicked')} style={styles.affixButton}>
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
});
