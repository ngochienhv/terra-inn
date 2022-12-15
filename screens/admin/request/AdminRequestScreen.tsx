import React, { useState } from 'react';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { View, TextField, Text, Button, TabController } from 'react-native-ui-lib';
import NotificationCard from '../../../components/NotiCard/NotiCard';
import { TERRA_COLOR } from '../../../constants/theme/color';
import AdminRequestCard from '../../../components/RequestCardAdmin/RequestCardAdmin'
import {FlatList, ImageBackground, StyleSheet, TextInput, Dimensions, ScrollView } from 'react-native';

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
  {
      id: 2,
      name: 'Lương Nguyễn Thị Thu Hoài',
      image: {uri: 'https://scontent.fsgn13-3.fna.fbcdn.net/v/t39.30808-6/317838285_131700689707738_3868177724488407947_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=GB4kT5OnYzkAX90XQPp&_nc_ht=scontent.fsgn13-3.fna&oh=00_AfBvxpo2VQvMINWDiAfvGOSkNgNMBl2LBXUKHd7GHM0-1w&oe=63962DA2'},
      time: '2 giờ trước',
      inn: 'An Khang',
      room: '02',
      request: 'Đăng ký thuê phòng',
      status: 'Đã hoàn thành',
  },
  {
    id: 3,
    name: 'Nguyễn Phương Lan Anh',
    image: {uri: 'https://scontent.fsgn4-1.fna.fbcdn.net/v/t39.30808-6/315142649_6154953301231904_8123856781363846108_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=M0NPBP__LKkAX8Lt5o4&tn=AGlP9pozc-tpxuWV&_nc_ht=scontent.fsgn4-1.fna&oh=00_AfCzQd_90VIFa-DaDwb7mhjloPRFsfVNBw45x0kpNsq_Dw&oe=6396EA34'},
    time: '2 giờ trước',
    inn: 'An Khang',
    room: '02',
    request: 'Đăng ký thuê phòng',
      status: 'Chờ thanh toán',
  },
  {
    id: 4,
    name: 'Nguyễn Phương Lan Anh',
    image: {uri: 'https://scontent.fsgn4-1.fna.fbcdn.net/v/t39.30808-6/315142649_6154953301231904_8123856781363846108_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=M0NPBP__LKkAX8Lt5o4&tn=AGlP9pozc-tpxuWV&_nc_ht=scontent.fsgn4-1.fna&oh=00_AfCzQd_90VIFa-DaDwb7mhjloPRFsfVNBw45x0kpNsq_Dw&oe=6396EA34'},
    time: '2 giờ trước',
    inn: 'An Khang',
    room: '02',
    request: 'Đăng ký thuê phòng',
      status: 'Chưa hoàn thành',
  },
  {
    id: 5,
    name: 'Nguyễn Phương Lan Anh',
    image: {uri: 'https://scontent.fsgn4-1.fna.fbcdn.net/v/t39.30808-6/315142649_6154953301231904_8123856781363846108_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=M0NPBP__LKkAX8Lt5o4&tn=AGlP9pozc-tpxuWV&_nc_ht=scontent.fsgn4-1.fna&oh=00_AfCzQd_90VIFa-DaDwb7mhjloPRFsfVNBw45x0kpNsq_Dw&oe=6396EA34'},
    time: '2 giờ trước',
    inn: 'An Khang',
    room: '02',
    request: 'Đăng ký thuê phòng',
      status: 'Đã hoàn thành',
  },
  {
    id: 6,
    name: 'Nguyễn Phương Lan Anh',
    image: {uri: 'https://scontent.fsgn4-1.fna.fbcdn.net/v/t39.30808-6/315142649_6154953301231904_8123856781363846108_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=M0NPBP__LKkAX8Lt5o4&tn=AGlP9pozc-tpxuWV&_nc_ht=scontent.fsgn4-1.fna&oh=00_AfCzQd_90VIFa-DaDwb7mhjloPRFsfVNBw45x0kpNsq_Dw&oe=6396EA34'},
    time: '2 giờ trước',
    inn: 'An Khang',
    room: '02',
    request: 'Đăng ký thuê phòng',
      status: 'Đã hoàn thành',
  },
  {
    id: 7,
    name: 'Nguyễn Phương Lan Anh',
    image: {uri: 'https://scontent.fsgn4-1.fna.fbcdn.net/v/t39.30808-6/315142649_6154953301231904_8123856781363846108_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=M0NPBP__LKkAX8Lt5o4&tn=AGlP9pozc-tpxuWV&_nc_ht=scontent.fsgn4-1.fna&oh=00_AfCzQd_90VIFa-DaDwb7mhjloPRFsfVNBw45x0kpNsq_Dw&oe=6396EA34'},
    time: '2 giờ trước',
    inn: 'An Khang',
    room: '02',
    request: 'Đăng ký thuê phòng',
      status: 'Đã hoàn thành',
  },
  {
    id: 8,
    name: 'Nguyễn Phương Lan Anh',
    image: {uri: 'https://scontent.fsgn4-1.fna.fbcdn.net/v/t39.30808-6/315142649_6154953301231904_8123856781363846108_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=M0NPBP__LKkAX8Lt5o4&tn=AGlP9pozc-tpxuWV&_nc_ht=scontent.fsgn4-1.fna&oh=00_AfCzQd_90VIFa-DaDwb7mhjloPRFsfVNBw45x0kpNsq_Dw&oe=6396EA34'},
    time: '2 giờ trước',
    inn: 'An Khang',
    room: '02',
    request: 'Đăng ký thuê phòng',
      status: 'Đã hoàn thành',
  },
  {
    id: 9,
    name: 'Nguyễn Phương Lan Anh',
    image: {uri: 'https://scontent.fsgn4-1.fna.fbcdn.net/v/t39.30808-6/315142649_6154953301231904_8123856781363846108_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=M0NPBP__LKkAX8Lt5o4&tn=AGlP9pozc-tpxuWV&_nc_ht=scontent.fsgn4-1.fna&oh=00_AfCzQd_90VIFa-DaDwb7mhjloPRFsfVNBw45x0kpNsq_Dw&oe=6396EA34'},
    time: '2 giờ trước',
    inn: 'An Khang',
    room: '02',
    request: 'Đăng ký thuê phòng',
      status: 'Đã hoàn thành',
  },
  {
    id: 10,
    name: 'Nguyễn Phương Lan Anh',
    image: {uri: 'https://scontent.fsgn4-1.fna.fbcdn.net/v/t39.30808-6/315142649_6154953301231904_8123856781363846108_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=M0NPBP__LKkAX8Lt5o4&tn=AGlP9pozc-tpxuWV&_nc_ht=scontent.fsgn4-1.fna&oh=00_AfCzQd_90VIFa-DaDwb7mhjloPRFsfVNBw45x0kpNsq_Dw&oe=6396EA34'},
    time: '2 giờ trước',
    inn: 'An Khang',
    room: '02',
    request: 'Đăng ký thuê phòng',
      status: 'Đã hoàn thành',
  },
  {
    id: 11,
    name: 'Nguyễn Phương Lan Anh',
    image: {uri: 'https://scontent.fsgn4-1.fna.fbcdn.net/v/t39.30808-6/315142649_6154953301231904_8123856781363846108_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=M0NPBP__LKkAX8Lt5o4&tn=AGlP9pozc-tpxuWV&_nc_ht=scontent.fsgn4-1.fna&oh=00_AfCzQd_90VIFa-DaDwb7mhjloPRFsfVNBw45x0kpNsq_Dw&oe=6396EA34'},
    time: '2 giờ trước',
    inn: 'An Khang',
    room: '02',
    request: 'Đăng ký thuê phòng',
      status: 'Đã hoàn thành',
  },
  {
    id: 12,
    name: 'Nguyễn Phương Lan Anh',
    image: {uri: 'https://scontent.fsgn4-1.fna.fbcdn.net/v/t39.30808-6/315142649_6154953301231904_8123856781363846108_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=M0NPBP__LKkAX8Lt5o4&tn=AGlP9pozc-tpxuWV&_nc_ht=scontent.fsgn4-1.fna&oh=00_AfCzQd_90VIFa-DaDwb7mhjloPRFsfVNBw45x0kpNsq_Dw&oe=6396EA34'},
    time: '2 giờ trước',
    inn: 'An Khang',
    room: '02',
    request: 'Đăng ký thuê phòng',
      status: 'Đã hoàn thành',
  },
  ]

function AdminRequestComponents() {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  return (
    <TabController
      items={[{ label: 'Sửa chữa' }, { label: 'Dịch vụ' }, { label: 'QL trọ' }]}
      initialIndex={selectedIndex}
      onChangeIndex={(index: number) => setSelectedIndex(index)}
    >
      <TabController.TabBar
        enableShadows
        activeBackgroundColor={TERRA_COLOR.PRIMARY[0]}
        selectedLabelColor={TERRA_COLOR.PRIMARY[3]}
        uppercase
      />
      <View flex>
        <TabController.TabPage index={0}>{renderFirstPage()}</TabController.TabPage>
        <TabController.TabPage index={1}>{renderFirstPage()}</TabController.TabPage>
        <TabController.TabPage index={2}>{renderFirstPage()}</TabController.TabPage>
      </View>
    </TabController>
  );
}

const renderFirstPage = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        {users.map((user) => (
          <AdminRequestCard 
            key = {user.id}
            name = {user.name}
            request = {user.request}
            inn = {user.inn}
            room = {user.room}
            time = {user.time}
            image = {user.image}
            status = {user.status}/>
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