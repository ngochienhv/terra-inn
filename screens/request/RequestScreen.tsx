import React from 'react';
import { ImageBackground, StyleSheet, TextInput, Dimensions, ScrollView } from 'react-native';
import { View, TextField, Text, Button, Modal, Image, TabController } from 'react-native-ui-lib';
import RequestCard from '../../components/RequestCard/RequestCard';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const users = [
  {
    id: 1,
    name: 'Hoàng Nhân Linh Chi',
    image: {
      uri: 'https://scontent.fsgn13-2.fna.fbcdn.net/v/t39.30808-6/264503003_4487878974650832_6897324498459401338_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=ttmXErzQ6DwAX-MFtcW&_nc_ht=scontent.fsgn13-2.fna&oh=00_AfBLA51eeg-rVu8MWWAZZ0Ay4myb6b4BAik-WNp5vE6Hng&oe=63960044',
    },
    time: '2 giờ trước',
    inn: 'An Khang',
    room: '02',
    request: 'Đăng ký thuê phòng',
    status: 'Chưa hoàn thành',
  },
  {
    id: 2,
    name: 'Lương Nguyễn Thị Thu Hoài',
    image: {
      uri: 'https://scontent.fsgn13-3.fna.fbcdn.net/v/t39.30808-6/317838285_131700689707738_3868177724488407947_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=GB4kT5OnYzkAX90XQPp&_nc_ht=scontent.fsgn13-3.fna&oh=00_AfBvxpo2VQvMINWDiAfvGOSkNgNMBl2LBXUKHd7GHM0-1w&oe=63962DA2',
    },
    time: '2 giờ trước',
    inn: 'An Khang',
    room: '02',
    request: 'Đăng ký thuê phòng',
    status: 'Đã hoàn thành',
  },
  {
    id: 3,
    name: 'Nguyễn Phương Lan Anh',
    image: {
      uri: 'https://scontent.fsgn4-1.fna.fbcdn.net/v/t39.30808-6/315142649_6154953301231904_8123856781363846108_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=M0NPBP__LKkAX8Lt5o4&tn=AGlP9pozc-tpxuWV&_nc_ht=scontent.fsgn4-1.fna&oh=00_AfCzQd_90VIFa-DaDwb7mhjloPRFsfVNBw45x0kpNsq_Dw&oe=6396EA34',
    },
    time: '2 giờ trước',
    inn: 'An Khang',
    room: '02',
    request: 'Đăng ký thuê phòng',
    status: 'Chờ thanh toán',
  },
  {
    id: 4,
    name: 'Nguyễn Phương Lan Anh',
    image: {
      uri: 'https://scontent.fsgn4-1.fna.fbcdn.net/v/t39.30808-6/315142649_6154953301231904_8123856781363846108_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=M0NPBP__LKkAX8Lt5o4&tn=AGlP9pozc-tpxuWV&_nc_ht=scontent.fsgn4-1.fna&oh=00_AfCzQd_90VIFa-DaDwb7mhjloPRFsfVNBw45x0kpNsq_Dw&oe=6396EA34',
    },
    time: '2 giờ trước',
    inn: 'An Khang',
    room: '02',
    request: 'Đăng ký thuê phòng',
    status: 'Chưa hoàn thành',
  },
  {
    id: 5,
    name: 'Nguyễn Phương Lan Anh',
    image: {
      uri: 'https://scontent.fsgn4-1.fna.fbcdn.net/v/t39.30808-6/315142649_6154953301231904_8123856781363846108_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=M0NPBP__LKkAX8Lt5o4&tn=AGlP9pozc-tpxuWV&_nc_ht=scontent.fsgn4-1.fna&oh=00_AfCzQd_90VIFa-DaDwb7mhjloPRFsfVNBw45x0kpNsq_Dw&oe=6396EA34',
    },
    time: '2 giờ trước',
    inn: 'An Khang',
    room: '02',
    request: 'Đăng ký thuê phòng',
    status: 'Đã hoàn thành',
  },
  {
    id: 6,
    name: 'Nguyễn Phương Lan Anh',
    image: {
      uri: 'https://scontent.fsgn4-1.fna.fbcdn.net/v/t39.30808-6/315142649_6154953301231904_8123856781363846108_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=M0NPBP__LKkAX8Lt5o4&tn=AGlP9pozc-tpxuWV&_nc_ht=scontent.fsgn4-1.fna&oh=00_AfCzQd_90VIFa-DaDwb7mhjloPRFsfVNBw45x0kpNsq_Dw&oe=6396EA34',
    },
    time: '2 giờ trước',
    inn: 'An Khang',
    room: '02',
    request: 'Đăng ký thuê phòng',
    status: 'Đã hoàn thành',
  },
  {
    id: 7,
    name: 'Nguyễn Phương Lan Anh',
    image: {
      uri: 'https://scontent.fsgn4-1.fna.fbcdn.net/v/t39.30808-6/315142649_6154953301231904_8123856781363846108_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=M0NPBP__LKkAX8Lt5o4&tn=AGlP9pozc-tpxuWV&_nc_ht=scontent.fsgn4-1.fna&oh=00_AfCzQd_90VIFa-DaDwb7mhjloPRFsfVNBw45x0kpNsq_Dw&oe=6396EA34',
    },
    time: '2 giờ trước',
    inn: 'An Khang',
    room: '02',
    request: 'Đăng ký thuê phòng',
    status: 'Đã hoàn thành',
  },
  {
    id: 8,
    name: 'Nguyễn Phương Lan Anh',
    image: {
      uri: 'https://scontent.fsgn4-1.fna.fbcdn.net/v/t39.30808-6/315142649_6154953301231904_8123856781363846108_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=M0NPBP__LKkAX8Lt5o4&tn=AGlP9pozc-tpxuWV&_nc_ht=scontent.fsgn4-1.fna&oh=00_AfCzQd_90VIFa-DaDwb7mhjloPRFsfVNBw45x0kpNsq_Dw&oe=6396EA34',
    },
    time: '2 giờ trước',
    inn: 'An Khang',
    room: '02',
    request: 'Đăng ký thuê phòng',
    status: 'Đã hoàn thành',
  },
  {
    id: 9,
    name: 'Nguyễn Phương Lan Anh',
    image: {
      uri: 'https://scontent.fsgn4-1.fna.fbcdn.net/v/t39.30808-6/315142649_6154953301231904_8123856781363846108_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=M0NPBP__LKkAX8Lt5o4&tn=AGlP9pozc-tpxuWV&_nc_ht=scontent.fsgn4-1.fna&oh=00_AfCzQd_90VIFa-DaDwb7mhjloPRFsfVNBw45x0kpNsq_Dw&oe=6396EA34',
    },
    time: '2 giờ trước',
    inn: 'An Khang',
    room: '02',
    request: 'Đăng ký thuê phòng',
    status: 'Đã hoàn thành',
  },
  {
    id: 10,
    name: 'Nguyễn Phương Lan Anh',
    image: {
      uri: 'https://scontent.fsgn4-1.fna.fbcdn.net/v/t39.30808-6/315142649_6154953301231904_8123856781363846108_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=M0NPBP__LKkAX8Lt5o4&tn=AGlP9pozc-tpxuWV&_nc_ht=scontent.fsgn4-1.fna&oh=00_AfCzQd_90VIFa-DaDwb7mhjloPRFsfVNBw45x0kpNsq_Dw&oe=6396EA34',
    },
    time: '2 giờ trước',
    inn: 'An Khang',
    room: '02',
    request: 'Đăng ký thuê phòng',
    status: 'Đã hoàn thành',
  },
  {
    id: 11,
    name: 'Nguyễn Phương Lan Anh',
    image: {
      uri: 'https://scontent.fsgn4-1.fna.fbcdn.net/v/t39.30808-6/315142649_6154953301231904_8123856781363846108_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=M0NPBP__LKkAX8Lt5o4&tn=AGlP9pozc-tpxuWV&_nc_ht=scontent.fsgn4-1.fna&oh=00_AfCzQd_90VIFa-DaDwb7mhjloPRFsfVNBw45x0kpNsq_Dw&oe=6396EA34',
    },
    time: '2 giờ trước',
    inn: 'An Khang',
    room: '02',
    request: 'Đăng ký thuê phòng',
    status: 'Đã hoàn thành',
  },
  {
    id: 12,
    name: 'Nguyễn Phương Lan Anh',
    image: {
      uri: 'https://scontent.fsgn4-1.fna.fbcdn.net/v/t39.30808-6/315142649_6154953301231904_8123856781363846108_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=M0NPBP__LKkAX8Lt5o4&tn=AGlP9pozc-tpxuWV&_nc_ht=scontent.fsgn4-1.fna&oh=00_AfCzQd_90VIFa-DaDwb7mhjloPRFsfVNBw45x0kpNsq_Dw&oe=6396EA34',
    },
    time: '2 giờ trước',
    inn: 'An Khang',
    room: '02',
    request: 'Đăng ký thuê phòng',
    status: 'Đã hoàn thành',
  },
];

export default function RequestScreen() {
  return (
    <ScrollView>
      <View>
        {users.map((user, index) => (
          <RequestCard
            key={user.id}
            name={user.name}
            request={user.request}
            inn={user.inn}
            room={user.room}
            time={user.time}
            image={user.image}
            status={user.status}
            index={index}
          />
        ))}
      </View>
    </ScrollView>
   
  );
}

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
