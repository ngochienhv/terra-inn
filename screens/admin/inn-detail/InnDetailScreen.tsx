import React, { useState, useCallback } from 'react';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { View, TabController, Text, Card } from 'react-native-ui-lib';
import { useNavigation } from '@react-navigation/native';
import { TERRA_COLOR } from '../../../constants/theme/color';
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { INN_STATUS } from '../../../constants/status';
import { debounce } from 'lodash';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AdminInnNavigatorParamList } from 'types/navigator';

const rooms = [
  {
    number: 101,
    status: INN_STATUS[2],
  },
  {
    number: 102,
    status: INN_STATUS[1],
  },
  {
    number: 103,
    status: INN_STATUS[2],
  },
  {
    number: 104,
    status: INN_STATUS[2],
  },
  {
    number: 105,
    status: INN_STATUS[1],
  },
  {
    number: 106,
    status: INN_STATUS[1],
  },
  {
    number: 107,
    status: INN_STATUS[2],
  },
  {
    number: 108,
    status: INN_STATUS[1],
  },
  {
    number: 109,
    status: INN_STATUS[2],
  },
  {
    number: 110,
    status: INN_STATUS[2],
  },
];

const getStatusColor = (status: string) => {
  if (status === INN_STATUS[1]) {
    return TERRA_COLOR.ERROR[3];
  } else if (status === INN_STATUS[2]) {
    return TERRA_COLOR.SECONDARY[3];
  }
};

function AddminInnDetailComponent() {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const navigation = useNavigation<NativeStackNavigationProp<AdminInnNavigatorParamList>>();

  const setIndexDebounce = debounce((value) => {
    setSelectedIndex(value);
  }, 500);

  const onChangeDebounce = useCallback((value: number) => setIndexDebounce(value), []);

  return (
    <TabController
      items={[{ label: 'Tất cả' }, { label: 'Phòng trống' }, { label: 'Đang cho thuê' }]}
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
  navigation: NativeStackNavigationProp<AdminInnNavigatorParamList>
) => {
  return (
    <View>
      <ScrollView>
        <View margin-20>
          <Card>
            {rooms.map((room) => (
              <>
                <TouchableOpacity
                  style={styles.rowContainer}
                  //@ts-ignore
                  onPress={() => navigation.navigate('InnRoomDetail', { action: 'update' })}
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
      <TouchableOpacity
        //@ts-ignore
        onPress={() => navigation.navigate('InnRoomDetail', { action: 'add' })}
        style={styles.affixButton}
      >
        <Text style={{ fontSize: 40, color: 'white' }}>+</Text>
      </TouchableOpacity>
    </View>
  );
};
const AdminInnDetailScreen = gestureHandlerRootHOC(AddminInnDetailComponent);

export default AdminInnDetailScreen;

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
});
