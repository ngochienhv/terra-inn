import React, { useState }  from 'react';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { ImageBackground, StyleSheet, TextInput, Dimensions, ScrollView } from 'react-native';
import { View, TextField, Text, Button, Modal, Image, TabController } from 'react-native-ui-lib';
import RequestCard from '../../components/RequestCard/RequestCard';
import { TERRA_COLOR } from '../../constants/theme';
import axios from 'axios';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const users = [
  {
    "id": 1,
    "creator": "abc@gmail.com",
    "is_from_admin": false,
    "motel_id": 1,
    "type": 2,
    "status": 1,
    "title": "Đăng kí dịch vụ wifi",
    "due_date": "",
    "content": "Lorem isume",
    "create_at": "2022-12-14T14:01:53.646+07:00"
},
{
    "id": 2,
    "creator": "admin@gmail.com",
    "is_from_admin": true,
    "motel_id": 1,
    "type": 0,
    "status": 2,
    "title": "Thông báo thay đổi phương thức thanh toán",
    "due_date": "",
    "content": "Lorem isume",
    "create_at": "2022-12-13T14:01:53.649+07:00"
}
];

const getRequest = async () => {
  try {
    await axios.post('/request?room-id=1').then(res => {console.log(res)})
  } catch (err) {
    console.log(err);
  }
};

const pageContent = (index: number) => {
  users.sort
  return (
    <ScrollView>
      <View>
        {users.filter(user => (index === 0) ? (user.status === 1 || user.status === 2) : (user.status === index))
        .sort((a, b) => a.create_at > b.create_at ? 1 : -1)
        .map((user) => (
          <RequestCard
            key={user.id}
            title={user.title}
            content={user.content}
            creator={user.creator}
            create_at={user.create_at}
            status={user.status}
          />
        ))}
      </View>
    </ScrollView>
  )
}

getRequest()

function RequestComponents() {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  return (
    <TabController
      items={[{ label: 'Tất cả' }, { label: 'Đã hoàn thành' }, { label: 'Chưa hoàn thành' }]}
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
        <TabController.TabPage index={0}>{pageContent(0)}</TabController.TabPage>
        <TabController.TabPage index={1}>{pageContent(2)}</TabController.TabPage>
        <TabController.TabPage index={2}>{pageContent(1)}</TabController.TabPage>
      </View>
    </TabController>
  );
}

const RequestScreen = gestureHandlerRootHOC(RequestComponents);

export default RequestScreen;

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
