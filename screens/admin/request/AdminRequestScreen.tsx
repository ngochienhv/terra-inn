import React, { useState, useCallback, useEffect }  from 'react';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { View, TextField, Text, Button, TabController } from 'react-native-ui-lib';
import NotificationCard from '../../../components/NotiCard/NotiCard';
import { TERRA_COLOR } from '../../../constants/theme/color';
import AdminRequestCard from '../../../components/RequestCardAdmin/RequestCardAdmin'
import {FlatList, ImageBackground, StyleSheet, TextInput, Dimensions, ScrollView, RefreshControl, SafeAreaView } from 'react-native';
import { debounce } from 'lodash';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const users = [
  {
      id: 1,
      name: 'Hoàng Nhân Linh Chi',
      image: {uri: 'https://scontent.fsgn13-2.fna.fbcdn.net/v/t39.30808-6/264503003_4487878974650832_6897324498459401338_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=ttmXErzQ6DwAX-MFtcW&_nc_ht=scontent.fsgn13-2.fna&oh=00_AfBLA51eeg-rVu8MWWAZZ0Ay4myb6b4BAik-WNp5vE6Hng&oe=63960044'},
      time: '2 giờ trước',
      inn: 'An Khang',
      room: '02',
      request: 'Đăng ký thuê phòng',
      status: 'Chưa hoàn thành',
  },
  ]

function AdminRequestComponents() {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  
  const setIndexDebounce = debounce((value) => {
    setSelectedIndex(value);
  }, 500);

  const onChangeDebounce = useCallback((value: number) => setIndexDebounce(value), []);
  return (
      <TabController
        items={[{ label: 'Tất cả' }, { label: 'Sửa chữa' }, { label: 'Dịch vụ' }, { label: 'QL trọ' }]}
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
          <TabController.TabPage index={0}>{pageContent()}</TabController.TabPage>
          <TabController.TabPage index={1}>{pageContent()}</TabController.TabPage>
          <TabController.TabPage index={2}>{pageContent()}</TabController.TabPage>
          <TabController.TabPage index={3}>{pageContent()}</TabController.TabPage>
        </View>
      </TabController>
  );
}

const pageContent = () => {
  const [request, setRequest] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const wait = (timeout: any) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const getRequest = async () => {
    const token = await AsyncStorage.getItem('token')
    try {
      const requests = await axios({
        method: 'get',
        url: `/request?by-admin=true`,
        headers: {
          token: token
        }
      })
      setRequest(requests.data)
      console.log(request)
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getRequest()
  }, [])
  return (
    <ScrollView refreshControl={
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
      />}>
      <View style={styles.container}>
        {request.map((user) => (
          <AdminRequestCard 
            key={user.id}
            title={user.title}
            content={user.content}
            creator_name={user.creator_name}
            create_at={user.create_at}
            status={user.status}
            room_name={user.room_name}
            group_name = {user.group_name}/>
        ))}

      </View>
    {/* <View style={{padding: 50 }} /> */}
    </ScrollView>
  );
};

const AdminRequestScreen = gestureHandlerRootHOC(AdminRequestComponents);

export default AdminRequestScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    margin: 10,
    borderRadius: 20,
    backgroundColor: 'white',
  },
});