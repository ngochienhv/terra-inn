import React, { useState } from 'react';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { View, TextField, Text, Button, TabController} from 'react-native-ui-lib';
import NotificationCard from '../../../components/NotiCard/NotiCard';
import { TERRA_COLOR } from '../../../constants/theme/color';
import RequestCard from '../../../components/RequestCard/RequestCard'
import {FlatList, ImageBackground, StyleSheet, TextInput, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';

const users = [
  {
      id: 1,
      name: '1.700.000',
      image: {uri: 'https://scontent.fsgn13-2.fna.fbcdn.net/v/t39.30808-6/264503003_4487878974650832_6897324498459401338_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=ttmXErzQ6DwAX-MFtcW&_nc_ht=scontent.fsgn13-2.fna&oh=00_AfBLA51eeg-rVu8MWWAZZ0Ay4myb6b4BAik-WNp5vE6Hng&oe=63960044'},
      time: '2 giờ trước',
      inn: 'An Khang',
      room: '02',
      request: 'Quá hạn thanh toán tiền phòng',
  },
  {
      id: 2,
      name: 'Lương Nguyễn Thị Thu Hoài',
      image: {uri: 'https://scontent.fsgn13-3.fna.fbcdn.net/v/t39.30808-6/317838285_131700689707738_3868177724488407947_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=GB4kT5OnYzkAX90XQPp&_nc_ht=scontent.fsgn13-3.fna&oh=00_AfBvxpo2VQvMINWDiAfvGOSkNgNMBl2LBXUKHd7GHM0-1w&oe=63962DA2'},
      time: '2 giờ trước',
      inn: 'An Khang',
      room: '02',
      request: 'Đã thanh toán tiền phòng',
  },
  {
    id: 3,
    name: 'Nguyễn Phương Lan Anh',
    image: {uri: 'https://scontent.fsgn4-1.fna.fbcdn.net/v/t39.30808-6/315142649_6154953301231904_8123856781363846108_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=M0NPBP__LKkAX8Lt5o4&tn=AGlP9pozc-tpxuWV&_nc_ht=scontent.fsgn4-1.fna&oh=00_AfCzQd_90VIFa-DaDwb7mhjloPRFsfVNBw45x0kpNsq_Dw&oe=6396EA34'},
    time: '2 giờ trước',
    inn: 'An Khang',
    room: '02',
      request: 'Đến hạn thanh toán tiền phòng',
  },
  {
    id: 4,
    name: 'Nguyễn Phương Lan Anh',
    image: {uri: 'https://scontent.fsgn4-1.fna.fbcdn.net/v/t39.30808-6/315142649_6154953301231904_8123856781363846108_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=M0NPBP__LKkAX8Lt5o4&tn=AGlP9pozc-tpxuWV&_nc_ht=scontent.fsgn4-1.fna&oh=00_AfCzQd_90VIFa-DaDwb7mhjloPRFsfVNBw45x0kpNsq_Dw&oe=6396EA34'},
    time: '2 giờ trước',
    inn: 'An Khang',
    room: '02',
      request: 'Quá hạn thanh toán tiền phòng',
  },
  {
    id: 5,
    name: 'Nguyễn Phương Lan Anh',
    image: {uri: 'https://scontent.fsgn4-1.fna.fbcdn.net/v/t39.30808-6/315142649_6154953301231904_8123856781363846108_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=M0NPBP__LKkAX8Lt5o4&tn=AGlP9pozc-tpxuWV&_nc_ht=scontent.fsgn4-1.fna&oh=00_AfCzQd_90VIFa-DaDwb7mhjloPRFsfVNBw45x0kpNsq_Dw&oe=6396EA34'},
    time: '2 giờ trước',
    inn: 'An Khang',
    room: '02',
      request: 'Đã thanh toán tiền phòng',
  },
  {
    id: 6,
    name: 'Nguyễn Phương Lan Anh',
    image: {uri: 'https://scontent.fsgn4-1.fna.fbcdn.net/v/t39.30808-6/315142649_6154953301231904_8123856781363846108_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=M0NPBP__LKkAX8Lt5o4&tn=AGlP9pozc-tpxuWV&_nc_ht=scontent.fsgn4-1.fna&oh=00_AfCzQd_90VIFa-DaDwb7mhjloPRFsfVNBw45x0kpNsq_Dw&oe=6396EA34'},
    time: '2 giờ trước',
    inn: 'An Khang',
    room: '02',
      request: 'Đã thanh toán tiền phòng',
  },
  {
    id: 7,
    name: 'Nguyễn Phương Lan Anh',
    image: {uri: 'https://scontent.fsgn4-1.fna.fbcdn.net/v/t39.30808-6/315142649_6154953301231904_8123856781363846108_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=M0NPBP__LKkAX8Lt5o4&tn=AGlP9pozc-tpxuWV&_nc_ht=scontent.fsgn4-1.fna&oh=00_AfCzQd_90VIFa-DaDwb7mhjloPRFsfVNBw45x0kpNsq_Dw&oe=6396EA34'},
    time: '2 giờ trước',
    inn: 'An Khang',
    room: '02',
      request: 'Đã thanh toán tiền phòng',
  },
  {
    id: 8,
    name: 'Nguyễn Phương Lan Anh',
    image: {uri: 'https://scontent.fsgn4-1.fna.fbcdn.net/v/t39.30808-6/315142649_6154953301231904_8123856781363846108_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=M0NPBP__LKkAX8Lt5o4&tn=AGlP9pozc-tpxuWV&_nc_ht=scontent.fsgn4-1.fna&oh=00_AfCzQd_90VIFa-DaDwb7mhjloPRFsfVNBw45x0kpNsq_Dw&oe=6396EA34'},
    time: '2 giờ trước',
    inn: 'An Khang',
    room: '02',
      request: 'Đã thanh toán tiền phòng',
  },
  {
    id: 9,
    name: 'Nguyễn Phương Lan Anh',
    image: {uri: 'https://scontent.fsgn4-1.fna.fbcdn.net/v/t39.30808-6/315142649_6154953301231904_8123856781363846108_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=M0NPBP__LKkAX8Lt5o4&tn=AGlP9pozc-tpxuWV&_nc_ht=scontent.fsgn4-1.fna&oh=00_AfCzQd_90VIFa-DaDwb7mhjloPRFsfVNBw45x0kpNsq_Dw&oe=6396EA34'},
    time: '2 giờ trước',
    inn: 'An Khang',
    room: '02',
      request: 'Đã thanh toán tiền phòng',
  },
  {
    id: 10,
    name: 'Nguyễn Phương Lan Anh',
    image: {uri: 'https://scontent.fsgn4-1.fna.fbcdn.net/v/t39.30808-6/315142649_6154953301231904_8123856781363846108_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=M0NPBP__LKkAX8Lt5o4&tn=AGlP9pozc-tpxuWV&_nc_ht=scontent.fsgn4-1.fna&oh=00_AfCzQd_90VIFa-DaDwb7mhjloPRFsfVNBw45x0kpNsq_Dw&oe=6396EA34'},
    time: '2 giờ trước',
    inn: 'An Khang',
    room: '02',
      request: 'Đã thanh toán tiền phòng',
  },
  {
    id: 11,
    name: 'Nguyễn Phương Lan Anh',
    image: {uri: 'https://scontent.fsgn4-1.fna.fbcdn.net/v/t39.30808-6/315142649_6154953301231904_8123856781363846108_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=M0NPBP__LKkAX8Lt5o4&tn=AGlP9pozc-tpxuWV&_nc_ht=scontent.fsgn4-1.fna&oh=00_AfCzQd_90VIFa-DaDwb7mhjloPRFsfVNBw45x0kpNsq_Dw&oe=6396EA34'},
    time: '2 giờ trước',
    inn: 'An Khang',
    room: '02',
      request: 'Đã thanh toán tiền phòng',
  },
  {
    id: 12,
    name: 'Nguyễn Phương Lan Anh',
    image: {uri: 'https://scontent.fsgn4-1.fna.fbcdn.net/v/t39.30808-6/315142649_6154953301231904_8123856781363846108_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=M0NPBP__LKkAX8Lt5o4&tn=AGlP9pozc-tpxuWV&_nc_ht=scontent.fsgn4-1.fna&oh=00_AfCzQd_90VIFa-DaDwb7mhjloPRFsfVNBw45x0kpNsq_Dw&oe=6396EA34'},
    time: '2 giờ trước',
    inn: 'An Khang',
    room: '02',
      request: 'Đã thanh toán tiền phòng',
  },
  ]

function AdminManageComponents() {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  return (
    <TabController
      items={[{ label: 'Chưa thanh toán' }, { label: 'Đã thanh toán' }, { label: 'Quá hạn' }]}
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
      {/* <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        /> */}
      {users.map((user) => (
        <RequestCard 
          key = {user.id}
          name = {user.name}
          request = {user.request}
          time = {user.time}
          image = {user.image}
          request = {user.request}/>
      ))}
        
    <TouchableOpacity
   style={styles.buttonBox}
 >
   <Ionicons name={'ios-add-outline'} size={30} color="#fff"/>
 </TouchableOpacity>
    </ScrollView>
  );
};

const AdminManageScreen = gestureHandlerRootHOC(AdminManageComponents);

export default AdminManageScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    margin: 10,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  buttonBox: { 
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    justifyContent:'center',
    width:100,
    height:100,
    backgroundColor:'#fff',
    borderRadius:50,
    flexDirection: 'row', 
  }
});
