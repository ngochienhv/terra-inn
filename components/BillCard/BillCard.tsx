import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Card, Image, Text, View } from 'react-native-ui-lib';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ManageNavigatorParamList } from 'types/navigator';
import { TERRA_COLOR } from '../../constants/theme';

const getProps = (status: number) => {
  switch (status) {
    case 0:
      return {
        text: 'Đến hạn thanh toán tiền phòng',
        color: TERRA_COLOR.WARNING[3],
      };
    case 1:
      return {
        text: 'Đã thanh toán tiền phòng',
        color: TERRA_COLOR.PRIMARY[3],
      };
    case 2:
      return {
        text: 'Đã quá hạn thanh toán tiền phòng',
        color: TERRA_COLOR.ERROR[3],
      };
    default:
      return {
        text: 'Đã thanh toán tiền phòng',
        color: TERRA_COLOR.PRIMARY[3],
      };
  }
};

export default function BillCard({
  time,
  money,
  status,
}: {
  time: Date;
  money: number;
  status: number;
}) {
  const { text, color } = getProps(status);
  const navigation = useNavigation<NativeStackNavigationProp<ManageNavigatorParamList>>();
  return (
    <Card margin-10 onPress={() => navigation.navigate('BillDetailGuest')}>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }} padding-10>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: TERRA_COLOR.GRAY[0],
            padding: '4%',
            borderRadius: 8,
          }}
        >
          <Text text65BL color={color}>
            T{time.getMonth() + 1}
          </Text>
          <Text text65BL>{time.getFullYear()}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View marginL-20 style={{ justifyContent: 'center', width: '65%' }}>
            <Text text80 style={{ fontWeight: '700' }} color={color}>
              {text}
            </Text>
            <Text text50 color={color} marginT-10>
              {money} VNĐ
            </Text>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Ionicons
              name={'ios-arrow-forward-outline'}
              size={30}
              color={TERRA_COLOR.SECONDARY[4]}
            />
          </View>
        </View>
      </View>
    </Card>
  );
}
