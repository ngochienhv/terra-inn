import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { DateTimePicker, Picker, Text, View } from 'react-native-ui-lib';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';

import { selectInnGroups } from '../../../redux/selectors/innGroupSelector';
import { TERRA_COLOR } from '../../../constants/theme/color';

const data = [
  {
    room_name: 'H1-711',
    elec_used: 80,
    water_used: 20,
  },
  {
    room_name: 'H1-711',
    elec_used: 80,
    water_used: 20,
  },
  {
    room_name: 'H1-711',
    elec_used: 80,
    water_used: 20,
  },
  {
    room_name: 'H1-711',
    elec_used: 80,
    water_used: 20,
  },
  {
    room_name: 'H1-711',
    elec_used: 80,
    water_used: 20,
  },
  {
    room_name: 'H1-711',
    elec_used: 80,
    water_used: 20,
  },
  {
    room_name: 'H1-711',
    elec_used: 80,
    water_used: 20,
  },
  {
    room_name: 'H1-711',
    elec_used: 80,
    water_used: 20,
  },
  {
    room_name: 'H1-711',
    elec_used: 80,
    water_used: 20,
  },
];

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
  const [selectedInn, setSelectedInn] = useState<string>();
  const innsList = useSelector(selectInnGroups);

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
          <Row room={room.room_name} electric={room.elec_used} water={room.water_used} />
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
