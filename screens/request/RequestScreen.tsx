import React, { useState, useCallback, useEffect }  from 'react';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { ImageBackground, StyleSheet, TextInput, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { View, TextField, Text, Button, Modal, Image, TabController } from 'react-native-ui-lib';
import RequestCard from '../../components/RequestCard/RequestCard';
import { TERRA_COLOR } from '../../constants/theme';
import { debounce } from 'lodash';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RequestNavigatorParamList } from 'types/navigator';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const users = [
  {
    "id": 1,
    "creator": "abc@gmail.com",
    "is_from_admin": false,
    "motel_id": 1,
    "type": 2,
    "status": 0,
    "title": "Đăng kí dịch vụ wifi",
    "due_date": "",
    "content": "Lorem isume",
    "create_at": "2022-12-14T14:01:53.646+07:00"
},
{
    "id": 2,
    "creator": "admin@gmail.com",
    "is_from_admin": true,
    "motel_id": 1,
    "type": 0,
    "status": 1,
    "title": "Thông báo thay đổi phương thức thanh toán",
    "due_date": "",
    "content": "Lorem isume",
    "create_at": "2022-12-13T14:01:53.649+07:00"
}
];

const pageContent = (index: number) => {
  const [request, setRequest] = useState<any[]>([]);
  const [roomID, setroomID] = useState<number>(0);
  const [isRented, setisRented] = useState<boolean>();
  const getRequest = async () => {
    const token = await AsyncStorage.getItem('token')
    try {
      const user = await axios.get('/user', {
        headers: {
          token: token
        }
      })
      const motel_id = user.data.motel_id;
      setisRented(user.data.is_rented)
      setroomID(motel_id);
      const requests = await axios({
        method: 'get',
        url: `/request?room-id=${motel_id}`,
        headers: {
          token: token
        }
      })
      setRequest(requests.data)
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getRequest()
  }, [])
  return (
    <ScrollView>
      <View>
        {request.filter(user => (index === 2) ? (user.status === 0 || user.status === 1) : (user.status === index))
        .sort((a, b) => a.create_at > b.create_at ? 1 : -1)
        .map((user) => (
          <RequestCard
            key={user.id}
            title={user.title}
            content={user.content}
            creator={user.creator}
            create_at={user.create_at}
            status={user.status}
            roomId = {roomID}
          />
        ))}
      </View>
      <View style={{padding: 5 }} />
    </ScrollView>
  )
}

function RequestComponents() {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(false);

  const setIndexDebounce = debounce((value) => {
    setSelectedIndex(value);
  }, 500);
  const navigation = useNavigation<NativeStackNavigationProp<RequestNavigatorParamList>>();
  const onChangeDebounce = useCallback((value: number) => setIndexDebounce(value), []);
  return (
    <TabController
      items={[{ label: 'Tất cả' }, { label: 'Đã hoàn thành' }, { label: 'Chưa hoàn thành' }]}
      initialIndex={selectedIndex}
      onChangeIndex={onChangeDebounce}
    >
      <TabController.TabBar
        enableShadows
        activeBackgroundColor={TERRA_COLOR.PRIMARY[0]}
        selectedLabelColor={TERRA_COLOR.PRIMARY[3]}
        uppercase
      />
      <View flex>
        <TabController.TabPage index={0}>{pageContent(2)}</TabController.TabPage>
        <TabController.TabPage index={1}>{pageContent(1)}</TabController.TabPage>
        <TabController.TabPage index={2}>{pageContent(0)}</TabController.TabPage>
      </View>
      
      <TouchableOpacity onPress={() => navigation.navigate('Add')} style={styles.affixButton}>
        <Text style={{ fontSize: 40, color: 'white' }}>+</Text>
      </TouchableOpacity>
    </TabController>
  );
}

const RequestScreen = gestureHandlerRootHOC(RequestComponents);

export default RequestScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    margin: 10,
    borderRadius: 20,
    backgroundColor: 'white',
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
    zIndex: 999
  },
});
