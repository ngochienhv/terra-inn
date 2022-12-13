import React, { useState } from 'react';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { View, TextField, Text, Button, TabController} from 'react-native-ui-lib';
import NotificationCard from '../../../components/NotiCard/NotiCard';
import { TERRA_COLOR } from '../../../constants/theme/color';
import RequestCard from '../../../components/RequestCard/RequestCard'
import {FlatList, ImageBackground, StyleSheet, TextInput, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';


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
    <TouchableOpacity
   style={styles.buttonBox}
 >
   <Ionicons name={'ios-add-outline'} size={30} Color="#fff"/>
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
  buttonBox: { borderWidth:1,
    borderColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    justifyContent:'center',
    width:100,
    height:100,
    backgroundColor:'#fff',
    borderRadius:50,},
    flexDirection: 'row', 
});