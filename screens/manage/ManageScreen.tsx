import React, { useState } from 'react';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { View, TextField, Text, Button, TabController, Checkbox } from 'react-native-ui-lib';
import NotificationCard from '../../components/NotiCard/NotiCard';
import { TERRA_COLOR } from '../../constants/theme/color';
import MemberCard from '../../components/MemberCard/MemberCard';
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  TextInput,
  Dimensions,
  ScrollView,
} from 'react-native';

const users = [
  {
    id: 1,
    name: 'Hoàng Nhân Linh Chi',
    image:
      'https://scontent.fsgn13-2.fna.fbcdn.net/v/t39.30808-6/264503003_4487878974650832_6897324498459401338_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=ttmXErzQ6DwAX-MFtcW&_nc_ht=scontent.fsgn13-2.fna&oh=00_AfBLA51eeg-rVu8MWWAZZ0Ay4myb6b4BAik-WNp5vE6Hng&oe=63960044',
    phone: '0987654321',
    age: 19,
  },
  {
    id: 2,
    name: 'Hoàng Nhân Linh Chi',
    image:
      'https://scontent.fsgn13-2.fna.fbcdn.net/v/t39.30808-6/264503003_4487878974650832_6897324498459401338_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=ttmXErzQ6DwAX-MFtcW&_nc_ht=scontent.fsgn13-2.fna&oh=00_AfBLA51eeg-rVu8MWWAZZ0Ay4myb6b4BAik-WNp5vE6Hng&oe=63960044',
    phone: '0987654321',
    age: 19,
  },
  {
    id: 3,
    name: 'Hoàng Nhân Linh Chi',
    image:
      'https://scontent.fsgn13-2.fna.fbcdn.net/v/t39.30808-6/264503003_4487878974650832_6897324498459401338_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=ttmXErzQ6DwAX-MFtcW&_nc_ht=scontent.fsgn13-2.fna&oh=00_AfBLA51eeg-rVu8MWWAZZ0Ay4myb6b4BAik-WNp5vE6Hng&oe=63960044',
    phone: '0987654321',
    age: 19,
  },
];

function ManageComponents() {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  return (
    <TabController
      items={[{ label: 'Thành Viên' }, { label: 'Giá Tiền' }, { label: 'Dịch vụ' }]}
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
        <TabController.TabPage index={1}>{renderSecondPage()}</TabController.TabPage>
        <TabController.TabPage index={2}>{renderThirdPage()}</TabController.TabPage>
      </View>
    </TabController>
  );
}

const renderFirstPage = () => {
  return (
    <ScrollView>
      <View>
        {users.map((user) => (
          <MemberCard key={user.id} {...user} />
        ))}
      </View>
    </ScrollView>
  );
};

const Row = ({ title, content }: { title: string; content: string | number }) => (
  <View style={styles.rowContainer}>
    <Text color={TERRA_COLOR.GRAY[3]}>{title}</Text>
    <Text color={TERRA_COLOR.PRIMARY[4]}>{content}</Text>
  </View>
);

const renderSecondPage = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Row title="Giá thuê" content="2000000 đ" />
        <Row title="Giá điện" content="2500 đ/kWh" />
        <Row title="Giá nước" content="14000 đ/kWh" />
        <View style={{ padding: 10 }}>
          <View
            style={{
              ...styles.rowContainerSpec,
              borderTopRightRadius: 15,
              borderTopLeftRadius: 15,
            }}
          >
            <Text color={TERRA_COLOR.GRAY[3]}>Phí dịch vụ</Text>
            <Text color={TERRA_COLOR.PRIMARY[4]}>200000 đ</Text>
          </View>
          <View style={styles.rowContainerSpec}>
            <Text color={TERRA_COLOR.GRAY[3]}>Tiền rác</Text>
            <Text color={TERRA_COLOR.PRIMARY[4]}>50000 đ</Text>
          </View>
          <View style={styles.rowContainerSpec}>
            <Text color={TERRA_COLOR.GRAY[3]}>Tiền wifi</Text>
            <Text color={TERRA_COLOR.PRIMARY[4]}>100000 đ</Text>
          </View>
          <View
            style={{
              ...styles.rowContainerSpec,
              borderBottomLeftRadius: 15,
              borderBottomRightRadius: 15,
            }}
          >
            <Text color={TERRA_COLOR.GRAY[3]}>Tiền giữ xe</Text>
            <Text color={TERRA_COLOR.PRIMARY[4]}>50000 đ</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const renderThirdPage = () => {
  return (
    <ScrollView>
      <View>
        <Text text65 color={TERRA_COLOR.GRAY[3]}>
          Các dịch vụ của phòng
        </Text>
        <Checkbox value={false} label="Wifi" color={TERRA_COLOR.DEFAULT[4]} margin-5 />
        <Checkbox value={false} label="Dọn rác hằng ngày" color={TERRA_COLOR.DEFAULT[4]} margin-5 />
        <Checkbox value={false} label="Trông giữ xe" color={TERRA_COLOR.DEFAULT[4]} margin-5 />
      </View>
    </ScrollView>
  );
};

const ManageScreen = gestureHandlerRootHOC(ManageComponents);

export default ManageScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    margin: 10,
    borderRadius: 20,
    backgroundColor: TERRA_COLOR.PRIMARY[2],
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '5%',
    margin: '2%',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
  },
  rowContainerSpec: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '5%',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
