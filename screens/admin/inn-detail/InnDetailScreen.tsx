import React, { useState, useCallback, useEffect } from 'react';
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
import { useRoute } from '@react-navigation/native';
import { IRoom } from 'types/roomType';
import axios from 'axios';

const getStatusColor = (status: number) => {
  if (status === 1) {
    return TERRA_COLOR.ERROR[3];
  } else if (status === 2) {
    return TERRA_COLOR.SECONDARY[3];
  }
};

function AddminInnDetailComponent() {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const route = useRoute();
  //@ts-ignore
  const { innId } = route.params;
  const navigation = useNavigation<NativeStackNavigationProp<AdminInnNavigatorParamList>>();

  const setIndexDebounce = debounce((value) => {
    setSelectedIndex(value);
  }, 500);

  const onChangeDebounce = useCallback((value: number) => setIndexDebounce(value), []);

  useEffect(() => {
    const getAllRooms = async () => {
      await axios
        .get('motel', { params: { 'group-id': innId } })
        .then((response) => {
          setRooms(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getAllRooms();
  }, []);

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
          {renderPage(rooms, innId, selectedDate, setSelectedDate, navigation)}
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
  rooms: IRoom[],
  innId: string,
  selectedDate: Date,
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>,
  navigation: NativeStackNavigationProp<AdminInnNavigatorParamList>
) => {
  return (
    <View flex>
      <ScrollView>
        <View margin-20>
          <Card>
            {rooms.length > 0 ? (
              rooms.map((room) => (
                <>
                  <TouchableOpacity
                    style={styles.rowContainer}
                    onPress={() =>
                      //@ts-ignore
                      navigation.navigate('InnRoomDetail', {
                        action: 'update',
                        roomId: room.id,
                        innId: innId,
                      })
                    }
                  >
                    <Text>Phòng {room.name}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      {/* @ts-ignore */}
                      <Text color={getStatusColor(room.status)}>{INN_STATUS[room.status]}</Text>
                      <Ionicons name={'ios-chevron-forward-outline'} size={20} />
                    </View>
                  </TouchableOpacity>
                  <View height={1} backgroundColor={TERRA_COLOR.GRAY[0]} marginL-15 marginR-15 />
                </>
              ))
            ) : (
              <Text text50 margin-20>
                Hiện tại khu trọ chưa có phòng nào, vui lòng tạo phòng
              </Text>
            )}
          </Card>
        </View>
      </ScrollView>
      <TouchableOpacity
        //@ts-ignore
        onPress={() => navigation.navigate('InnRoomDetail', { action: 'add', innId: innId })}
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
