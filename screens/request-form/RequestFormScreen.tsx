import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { Button, Card, Picker, Text, View, DateTimePicker } from 'react-native-ui-lib';
import { TERRA_COLOR } from '../../constants/theme';
import BillDetailScreen from '../../screens/bill-detail/BillDetailScreen';

const requets = [
  { label: 'Thuê phòng', value: 1 },
  { label: 'Trả phòng', value: 2 },
  { label: 'Sửa chữa', value: 3 },
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

export default function RequestFormScreen() {
  const [PickerValue, setPickerValue] = useState<string>('Loại yêu cầu');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  return (
    <ScrollView>
        <View flex style={{ backgroundColor: TERRA_COLOR.PRIMARY[1] }}>
          <Card padding-20 margin-20>
            <Text marginB-5 color={TERRA_COLOR.GRAY[2]}>
              Loại yêu cầu
            </Text>
            {/* @ts-ignore */}
            <Picker value={PickerValue} placeholder={'Loại yêu cầu'} onChange={(value) => setPickerValue(value.label)} >
              {requets.map((request) => (
                <Picker.Item key={request.label} value={request.value} label={request.label} />
              ))}
            </Picker>
            <Text marginB-5 color={TERRA_COLOR.GRAY[2]}>
              Phòng
            </Text>
            {/* @ts-ignore */}
            <Picker placeholder={'Chọn phòng trọ'} onChange={() => console.log('changed')}>
              {rooms.map((room) => (
                <Picker.Item key={room.id} value={room.id} label={room.number.toString()} />
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
                onChange={(date: Date) => setSelectedDate(date)}
                style={styles.datePicker}
              />
            </View>
            <View marginB-10>
              <Text marginB-5 color={TERRA_COLOR.GRAY[2]}>
                Nội dung
              </Text>
              <View style = {{ padding: '2%' }}><TextInput style={styles.paragraphInput} /></View>
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
    flex: 1,
    borderWidth: 1,
    borderColor: TERRA_COLOR.GRAY[0],
    padding: '2%',
    borderRadius: 4,
    height: 200,
  },
  datePicker: {
    padding: '2%',
  },
});
