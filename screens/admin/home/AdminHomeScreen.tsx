import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Dimensions, ImageBackground, ScrollView, StyleSheet, TextInput } from 'react-native';
import { Avatar, Carousel, Text, TextField, View, Button, Card } from 'react-native-ui-lib';
import { AdminHomeNavigatorParamList, HomeNavigatorParamList } from 'types/navigator';
import InnCard from '../../../components/InnCard/InnCard';
import { TERRA_COLOR } from '../../../constants/theme/color';
import Ionicons from 'react-native-vector-icons/Ionicons';

const screenWidth = Dimensions.get('window').width;

export default function AdminHomeScreen({
  navigation,
}: {
  navigation: NativeStackNavigationProp<AdminHomeNavigatorParamList>;
}) {
  return (
    <ScrollView>
      <View flex padding-20>
        <View margin-20 marginT-40 style={styles.title}>
          <View>
            <Text text50 color={TERRA_COLOR.GRAY[4]}>
              Xin chào, Admin
            </Text>
          </View>
          <Avatar
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBwBc9x_-B3ksahoBkr9zvK22-C-iA-eKORg&usqp=CAU',
            }}
            size={60}
          />
        </View>
        <View style={{ justifyContent: 'center' }}>
          <View style={styles.utilityBox}>
            <Card style={styles.utilityItem} onPress={() => navigation.navigate('Inn')}>
              <Ionicons name={'ios-home'} size={30} />
              <Text text70>Quản lý</Text>
              <Text text60 color={TERRA_COLOR.GRAY[4]}>
                Khu trọ
              </Text>
            </Card>
            <Card
              style={styles.utilityItem}
              //@ts-ignore
              onPress={() => navigation.navigate('AdminRequest', { screen: 'AllRequest' })}
            >
              <Ionicons name={'ios-paper-plane'} size={30} />
              <Text text70>Quản lý</Text>
              <Text text60 color={TERRA_COLOR.GRAY[4]}>
                Yêu cầu
              </Text>
            </Card>
            <Card
              style={styles.utilityItem}
              //@ts-ignore
              onPress={() => navigation.navigate('Bill', { screen: 'AdminBill' })}
            >
              <Ionicons name={'ios-cash'} size={30} />
              <Text text70>Quản lý</Text>
              <Text text60 color={TERRA_COLOR.GRAY[4]}>
                Hóa đơn
              </Text>
            </Card>
            <Card style={styles.utilityItem} onPress={() => navigation.navigate('ElectricWater')}>
              <Ionicons name={'ios-flash'} size={30} />
              <Text text70>Quản lý</Text>
              <Text text60 color={TERRA_COLOR.GRAY[4]}>
                Điện nước
              </Text>
            </Card>
          </View>
        </View>
        <Text text65 color={TERRA_COLOR.GRAY[4]} style={{ fontWeight: '700' }} margin-10>
          Thông báo mới
        </Text>

        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
          <Card margin-8>
            <View style={styles.notiItem}>
              <Ionicons name={'build'} size={30} color={TERRA_COLOR.ERROR[4]} />
              <Text text70 marginL-10>
                Phòng 771 có 1 yêu cầu sửa chữa
              </Text>
            </View>
          </Card>
        </View>

        <View style={styles.buttonBox}>
          <Button
            label="Tạo thông báo"
            backgroundColor={TERRA_COLOR.PRIMARY[3]}
            style={styles.button}
            onPress={() => navigation.navigate('Notifications')}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    height: 50,
    marginTop: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 12,
  },
  utilityBox: {
    flexDirection: 'row',
    marginTop: '5%',
    alignSelf: 'baseline',
    justifyContent: 'center',
    borderRadius: 10,
    flexWrap: 'wrap',
  },
  utilityItem: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: '4%',
    backgroundColor: TERRA_COLOR.PRIMARY[1],
    borderRadius: 4,
    height: screenWidth * 0.37,
    width: screenWidth * 0.37,
  },
  notiItem: {
    alignItems: 'center',
    backgroundColor: TERRA_COLOR.WARNING[1],
    flexDirection: 'row',
    padding: '2%',
    paddingLeft: '5%',
    paddingRight: '5%',
    borderRadius: 12,
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonBox: { flexDirection: 'row', justifyContent: 'flex-end', margin: '6%' },
  button: { alignSelf: 'baseline' },
});
