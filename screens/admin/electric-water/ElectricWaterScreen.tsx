import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { DateTimePicker, Picker, Text, View } from 'react-native-ui-lib';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';

import { selectInnGroups } from '../../../redux/selectors/innGroupSelector';
import { TERRA_COLOR } from '../../../constants/theme/color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import axios from 'axios';
import { BILL_STATUS } from '../../../constants/status';

const Cell = ({ content, color }: { content: string | number; color?: string }) => (
  <View flex style={{ alignSelf: 'flex-start' }}>
    <Text color={color}>{content}</Text>
  </View>
);

const Row = ({ room, electric, water }: { room: string; electric: number; water: number }) => (
  <>
    <View style={styles.rowContainer}>
      <Cell content={room} />
      <Cell content={electric} />
      <Cell content={water} />
    </View>
    <View height={1} backgroundColor={TERRA_COLOR.GRAY[0]} marginL-15 marginR-15 />
  </>
);

export default function ElectricWaterScreen() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedInn, setSelectedInn] = useState<{ label: string; value: string }>();
  const [data, setData] = useState([]);
  const innsList = useSelector(selectInnGroups);

  const fetchData = async () => {
    Toast.show({
      type: 'info',
      text1: 'Đang tải dữ liệu',
    });
    try {
      const month = selectedDate.getMonth() + 1;
      const year = selectedDate.getFullYear();
      const monthQuery = year + '-' + month;

      const token = await AsyncStorage.getItem('token');
      const res = await axios.get(`/invoice?group-id=${selectedInn?.value}&month=${monthQuery}`, {
        headers: { token },
      });
      setData(
        res.data.map((room) => ({
          id: room.id,
          name: room.room_name,
          status: BILL_STATUS[room.pay_status],
          electric: room.elec_used,
          water: room.water_used,
          tabs: room.pay_status,
        }))
      );
      Toast.show({
        type: 'success',
        text1: 'Thành công',
      });
    } catch (err) {
      console.log(err);
      Toast.show({
        type: 'error',
        text1: 'Có lỗi xảy ra',
      });
    }
  };

  useEffect(() => {
    if (selectedDate && selectedInn) {
      fetchData();
    }
  }, [selectedDate, selectedInn]);

  return (
    <View flex style={{ backgroundColor: 'white' }}>
      <ScrollView>
        <View marginL-20 marginR-20 marginT-20>
          <Text marginB-5>Khu trọ</Text>
          {/* @ts-ignore */}
          <Picker
            placeholder={'Chọn khu trọ'}
            onChange={setSelectedInn}
            value={selectedInn}
            style={{ backgroundColor: 'white', padding: '2%' }}
          >
            {innsList.map((inn) => (
              <Picker.Item key={inn.id} value={inn.id} label={inn.group_name} />
            ))}
          </Picker>
          <Text marginB-10 text70 color={TERRA_COLOR.PRIMARY[3]}>
            Chọn ngày tháng
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
        <View style={styles.rowContainer}>
          <Cell content="Phòng" color={TERRA_COLOR.PRIMARY[3]} />
          <Cell content="Chỉ số điện" color={TERRA_COLOR.PRIMARY[3]} />
          <Cell content="Chỉ số nước" color={TERRA_COLOR.PRIMARY[3]} />
        </View>
        <View height={1} backgroundColor={TERRA_COLOR.GRAY[0]} marginL-15 marginR-15 />
        {data.map((room) => (
          //@ts-ignore
          <Row room={room.name} electric={room.electric} water={room.water} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '5%',
    marginLeft: '3%',
    marginRight: '3%',
    alignItems: 'center',
  },
  datePicker: {
    padding: '2%',
  },
});
