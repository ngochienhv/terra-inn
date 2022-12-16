import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { Button, Card, Picker, Text, View, DateTimePicker } from 'react-native-ui-lib';
import { TERRA_COLOR } from '../../constants/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RequestNavigatorParamList } from 'types/navigator';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const requets = [
  { label: 'Yêu cầu thuê phòng', value: 1 },
  { label: 'Yêu cầu trả phòng', value: 2 },
  { label: 'Yêu cầu sửa chữa', value: 3 },
];

const rooms = [
  {
    id: 1,
    number: 101,
  },
  {
    id: 2,
    number: 102,
  },
  {
    id: 3,
    number: 103,
  },
  {
    id: 4,
    number: 104,
  },
  { id: 5, number: 105 },
  { id: 6, number: 106 },
  { id: 7, number: 107 },
  { id: 8, number: 108 },
  { id: 9, number: 109 },
  { id: 10, number: 110 },
];

export default function RequestFormScreen(motel_id: any) {
  

  const motel_ID = (motel_id.route.params.motel_id) ? motel_id.route.params.motel_id : "";
  const request = (motel_id.route.params.motel_id) ? motel_id.route.params.request : "";

  const [selectedRequest, setselectedRequest] = useState<{ label: string; value: number }>({label: motel_id.route.params.motel_id ? request : "", value: motel_id.route.params.motel_id ? 1 : 0});
  const [selectedRoom, setselectedRoom] = useState<number>();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [requests, setrequests] = useState({})
  const navigation = useNavigation<NativeStackNavigationProp<RequestNavigatorParamList>>();
  
  
  let formdata = new FormData();
  const handleRequest = async () => {
    setrequests({...requests, is_from_admin: 0})
    setrequests({...requests, status: 0})
    formdata.append('is_from_admin', 0)
    formdata.append('motel_id', requests.motel_id)
    formdata.append('title', requests.title)
    formdata.append('type', requests.type)
    formdata.append('status', requests.status)
    formdata.append('due_date', requests.due_date)
    formdata.append('content', requests.content)
    // console.log(formdata)
    Toast.show({
      type: 'info',
      text1: 'Đang gửi yêu cầu',
    });
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await axios({
        method: 'post',
        url: '/request',
        data: (formdata),
        headers: { 
          token: token,
          "Content-Type": 'multipart/form-data' } }
      );
        console.log(res.data)
      Toast.show({
        type: 'success',
        text1: 'Đã gửi yêu cầu',
      });
      navigation.navigate("AllRequest")
    } catch (err) {
      console.log(err);
      Toast.show({
        type: 'error',
        text1: 'Có lỗi xảy ra:(',
      });
    }
  };

  return (
    <ScrollView>
        <View flex style={{ backgroundColor: TERRA_COLOR.PRIMARY[1] }}>
          <Card padding-20 margin-20>
            <Text marginB-5 color={TERRA_COLOR.GRAY[2]}>
              Loại yêu cầu
            </Text>
            {/* @ts-ignore */}
            <Picker value={selectedRequest} placeholder={'Loại yêu cầu'} onChange={value => {setselectedRequest(value); setrequests({...requests, type: value.value}); setrequests({...requests, title: value.lable})}} >
              {requets.map((request) => (
                <Picker.Item key={request.label} value={request.value} label={request.label} />
              ))}
            </Picker>
            <Text marginB-5 color={TERRA_COLOR.GRAY[2]}>
              Phòng
            </Text>
            {/* @ts-ignore */}
            <Picker value={selectedRoom} placeholder={'Chọn phòng trọ'} onChange={value => {setselectedRoom(value); setrequests({...requests, motel_id: value.value})}} >
              {rooms.map((room) => (
                <Picker.Item key={room.id} value={room.number} label={`${room.number}`} />
              ))}
            </Picker>
            <View marginB-10>
              <Text marginB-5 color={TERRA_COLOR.GRAY[2]}>
                Yêu cầu cần được hoàn thành trước ngày
              </Text>
              <DateTimePicker
                migrate
                label="Time"
                placeholder={'Select time'}
                value={selectedDate}
                onChange={(date: Date) => {setSelectedDate(date); setrequests({...requests, due_date: (new Date(date).toDateString())})}}
                style={styles.datePicker}
              />
            </View>
            <View marginB-10>
              <Text marginB-5 color={TERRA_COLOR.GRAY[2]}>
                Nội dung
              </Text>
              <View style = {{ padding: '2%'}}><TextInput style={styles.paragraphInput} onChangeText={(text) => {setrequests({...requests, content: text})}}/></View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} margin-30>
              <Button backgroundColor={TERRA_COLOR.GRAY[0]} color="black">
                <Text style={styles.button} onPress={() => navigation.goBack()}>Hủy</Text>
              </Button>
              <Button
                backgroundColor={TERRA_COLOR.PRIMARY[3]}
              ><View>
                
                <Text style={styles.button} onPress={() => handleRequest()}>Gửi <Ionicons name={'ios-send'} color={'white'} size={15} /></Text>
          </View></Button>
            </View>
          </Card>
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor: TERRA_COLOR.GRAY[0],
    padding: '2%',
    borderRadius: 4,
  },
  paragraphInput: {
    borderWidth: 1,
    borderColor: TERRA_COLOR.GRAY[0],
    padding: '2%',
    borderRadius: 4,
    height: 200,
  },
  datePicker: {
    padding: '2%',
  },
  button: {
    fontSize: 18,
  },
});
