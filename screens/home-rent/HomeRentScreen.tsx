import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, Button, Card, Text, View } from 'react-native-ui-lib';
import { TERRA_COLOR } from '../../constants/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { selectUserProfile } from '../../redux/selectors/userSelectors';

const Row = ({ title, content }: { title: string; content: string | number }) => (
  <View style={styles.rowContainer}>
    <Text color={TERRA_COLOR.GRAY[3]}>{title}</Text>
    <Text color={TERRA_COLOR.PRIMARY[4]}>{content}</Text>
  </View>
);

//@ts-ignore
export default function HomeRentScreen({ navigation }) {
  const userProfile = useSelector(selectUserProfile);

  return (
    <View>
      <View padding-20 style={{ backgroundColor: TERRA_COLOR.PRIMARY[0] }}>
        <View style={{ alignItems: 'flex-start' }}>
          <Text text50 color={TERRA_COLOR.GRAY[4]}>
            TerraInn Xin chào!
          </Text>
          <View margin-20 marginT-40 style={styles.title}>
            <Avatar source={require('../../assets/terra-logo.png')} size={60} />
            <Text text50 marginL-10>
              {userProfile.full_name.length > 0 ? userProfile.full_name : 'Người dùng'}
            </Text>
          </View>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Card
            style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%' }}
            padding-15
          >
            <TouchableOpacity onPress={() => navigation.navigate('Request', { screen: 'Request' })}>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Ionicons name={'ios-paper-plane'} size={30} color={TERRA_COLOR.SECONDARY[4]} />
                <Text text65 color={TERRA_COLOR.SECONDARY[4]}>
                  Yêu cầu
                </Text>
              </View>
            </TouchableOpacity>
            <View style={{ borderLeftWidth: 1, borderColor: TERRA_COLOR.GRAY[0] }} />
            <TouchableOpacity onPress={() => navigation.navigate('Manage', { screen: 'BillList' })}>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Ionicons name={'ios-cash'} size={30} color={TERRA_COLOR.SECONDARY[4]} />
                <Text text65 color={TERRA_COLOR.SECONDARY[4]}>
                  Hóa đơn
                </Text>
              </View>
            </TouchableOpacity>
            <View style={{ borderLeftWidth: 1, borderColor: TERRA_COLOR.GRAY[0] }} />
            <TouchableOpacity onPress={() => navigation.navigate('Profile', { screen: 'Profile' })}>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Ionicons name={'ios-person-circle'} size={30} color={TERRA_COLOR.SECONDARY[4]} />
                <Text text65 color={TERRA_COLOR.SECONDARY[4]}>
                  Tài khoản
                </Text>
              </View>
            </TouchableOpacity>
          </Card>
        </View>
      </View>
      <View style={styles.container}>
        <Row title="Khu trọ" content="Khu trọ An Khang" />
        <Row title="Phòng" content="H2-1121" />
        <Row title="Số lượng thành viên" content="5" />
        <Button
          label="Xem chi tiết"
          style={{
            padding: '5%',
            margin: '2%',
            borderRadius: 15,
            backgroundColor: TERRA_COLOR.PRIMARY[4],
          }}
          text70
          onPress={() => navigation.navigate('Manage', { screen: 'Manage' })}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
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
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    margin: 10,
    borderRadius: 20,
    backgroundColor: TERRA_COLOR.PRIMARY[2],
  },
});
