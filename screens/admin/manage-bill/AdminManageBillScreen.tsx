import React, { useState, useCallback } from 'react';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { View, DateTimePicker, TabController, Text, Card } from 'react-native-ui-lib';
import { useNavigation } from '@react-navigation/native';
import { TERRA_COLOR } from '../../../constants/theme/color';
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { BILL_STATUS } from '../../../constants/status';
import { debounce } from 'lodash';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AdminBillNavigatorParamList } from 'types/navigator';

const rooms = [
  {
    number: 101,
    status: BILL_STATUS[0],
  },
  {
    number: 102,
    status: BILL_STATUS[1],
  },
  {
    number: 103,
    status: BILL_STATUS[2],
  },
  {
    number: 104,
    status: BILL_STATUS[2],
  },
  {
    number: 105,
    status: BILL_STATUS[0],
  },
  {
    number: 106,
    status: BILL_STATUS[1],
  },
  {
    number: 107,
    status: BILL_STATUS[0],
  },
  {
    number: 108,
    status: BILL_STATUS[2],
  },
  {
    number: 109,
    status: BILL_STATUS[2],
  },
  {
    number: 110,
    status: BILL_STATUS[2],
  },
];

const getStatusColor = (status: string) => {
  if (status === BILL_STATUS[0]) {
    return TERRA_COLOR.SUCCESS[3];
  } else if (status === BILL_STATUS[1]) {
    return TERRA_COLOR.WARNING[3];
  } else if (status === BILL_STATUS[2]) {
    return TERRA_COLOR.ERROR[3];
  }
};

function AdminManageBillComponents() {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const navigation = useNavigation<NativeStackNavigationProp<AdminBillNavigatorParamList>>();

  const setIndexDebounce = debounce((value) => {
    setSelectedIndex(value);
  }, 500);

  const onChangeDebounce = useCallback((value: number) => setIndexDebounce(value), []);

  return (
    <TabController
      items={[
        { label: 'Tất cả' },
        { label: 'Chưa thanh toán' },
        { label: 'Đã thanh toán' },
        { label: 'Quá hạn' },
      ]}
      initialIndex={selectedIndex}
      onChangeIndex={onChangeDebounce}
    >
      <TabController.TabBar
        enableShadows
        activeBackgroundColor={TERRA_COLOR.PRIMARY[0]}
        selectedLabelColor={TERRA_COLOR.PRIMARY[3]}
        uppercase
      />
      <View flex style={{ backgroundColor: TERRA_COLOR.PRIMARY[1] }}>
        <TabController.TabPage index={0}>
          {renderPage(selectedDate, setSelectedDate, navigation)}
        </TabController.TabPage>
        <TabController.TabPage index={1}>
          {/* {renderPage(selectedDate, setSelectedDate)} */}
        </TabController.TabPage>
        <TabController.TabPage index={2}>
          {/* {renderPage(selectedDate, setSelectedDate)} */}
        </TabController.TabPage>
        <TabController.TabPage index={3}>
          {/* {renderPage(selectedDate, setSelectedDate)} */}
        </TabController.TabPage>
      </View>
    </TabController>
  );
}

const renderPage = (
  selectedDate: Date,
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>,
  navigation: NativeStackNavigationProp<AdminBillNavigatorParamList>
) => {
  return (
    <ScrollView>
      <View margin-20>
        <Text marginB-10 text70>
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
        <Card>
          {rooms.map((room) => (
            <>
              <TouchableOpacity
                style={styles.rowContainer}
                onPress={() => navigation.navigate('BillDetail')}
              >
                <Text>Phòng {room.number}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text color={getStatusColor(room.status)}>{room.status}</Text>
                  <Ionicons name={'ios-chevron-forward-outline'} size={20} />
                </View>
              </TouchableOpacity>
              <View height={1} backgroundColor={TERRA_COLOR.GRAY[0]} marginL-15 marginR-15 />
            </>
          ))}
        </Card>
      </View>
    </ScrollView>
  );
};
const AdminManageBillScreen = gestureHandlerRootHOC(AdminManageBillComponents);

export default AdminManageBillScreen;

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
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    backgroundColor: '#fff',
    borderRadius: 50,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '5%',
    marginLeft: '3%',
    marginRight: '3%',
  },
  datePicker: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    padding: '2%',
  },
});
