import React, { useState, useCallback, useEffect } from 'react';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import {
  View,
  DateTimePicker,
  TabController,
  Text,
  Card,
  Picker,
} from 'react-native-ui-lib';
import { useNavigation } from '@react-navigation/native';
import { TERRA_COLOR } from '../../../constants/theme/color';
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { BILL_STATUS } from '../../../constants/status';
import { debounce } from 'lodash';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AdminBillNavigatorParamList } from 'types/navigator';
import { useSelector } from 'react-redux';
import { selectInnGroups } from '../../../redux/selectors/innGroupSelector';
import { Inn } from 'types/innType';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getStatusColor = (status: string) => {
  if (status === BILL_STATUS[1]) {
    return TERRA_COLOR.SUCCESS[3];
  } else if (status === BILL_STATUS[0]) {
    return TERRA_COLOR.WARNING[3];
  } else if (status === BILL_STATUS[2]) {
    return TERRA_COLOR.ERROR[3];
  }
};

function AdminManageBillComponents() {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const innsList = useSelector(selectInnGroups);
  const navigation =
    useNavigation<NativeStackNavigationProp<AdminBillNavigatorParamList>>();

  const setIndexDebounce = debounce((value) => {
    setSelectedIndex(value);
  }, 500);

  const onChangeDebounce = useCallback(
    (value: number) => setIndexDebounce(value),
    []
  );

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
          {renderPage(innsList, selectedDate, setSelectedDate, navigation, -1)}
        </TabController.TabPage>
        <TabController.TabPage index={1}>
          {renderPage(innsList, selectedDate, setSelectedDate, navigation, 0)}
        </TabController.TabPage>
        <TabController.TabPage index={2}>
          {renderPage(innsList, selectedDate, setSelectedDate, navigation, 1)}
        </TabController.TabPage>
        <TabController.TabPage index={3}>
          {renderPage(innsList, selectedDate, setSelectedDate, navigation, 2)}
        </TabController.TabPage>
      </View>
    </TabController>
  );
}

const renderPage = (
  innsList: Inn[],
  selectedDate: Date,
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>,
  navigation: NativeStackNavigationProp<AdminBillNavigatorParamList>,
  index: number
) => {
  const [rooms, setRooms] = useState([]);
  const [group, setGroup] = useState({});

  const fetchData = async () => {
    Toast.show({
      type: 'info',
      text1: 'Đang tải dữ liệu',
    });
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await axios.get('/invoice?group-id=1&month=2022-12', {
        headers: { token },
      });
      setRooms(
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
    fetchData();
  }, [selectedDate, group]);

  return (
    <>
      <ScrollView>
        <View margin-20>
          <Text marginB-5>Khu trọ</Text>
          {/* @ts-ignore */}
          <Picker
            placeholder={'Chọn khu trọ'}
            value={group}
            onChange={(value) => setGroup(value)}
            style={{ backgroundColor: 'white', padding: '2%' }}
          >
            {innsList.map((inn) => (
              <Picker.Item key={inn.id} value={inn.id} label={inn.group_name} />
            ))}
          </Picker>
          <Text marginB-10 text70>
            Chọn ngày tháng
          </Text>
          <DateTimePicker
            migrate
            label='Time'
            placeholder={'Select time'}
            value={selectedDate}
            onChange={(date: Date) => setSelectedDate(date)}
            style={styles.datePicker}
          />
          <Card>
            {rooms
              .filter((room) => {
                return index == -1 || room.tabs == index;
              })
              .map((room) => (
                <>
                  <TouchableOpacity
                    style={styles.rowContainer}
                    onPress={() => navigation.navigate('BillDetail', { room })}
                  >
                    <Text>Phòng {room.name}</Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Text color={getStatusColor(room.status)}>
                        {room.status}
                      </Text>
                      <Ionicons
                        name={'ios-chevron-forward-outline'}
                        size={20}
                      />
                    </View>
                  </TouchableOpacity>
                  <View
                    height={1}
                    backgroundColor={TERRA_COLOR.GRAY[0]}
                    marginL-15
                    marginR-15
                  />
                </>
              ))}
          </Card>
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => navigation.navigate('BillForm')}
        style={styles.affixButton}
      >
        <Text style={{ fontSize: 40, color: 'white' }}>+</Text>
      </TouchableOpacity>
    </>
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
