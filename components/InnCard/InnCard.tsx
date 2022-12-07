import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button, Card, Image, Text, View } from 'react-native-ui-lib';
import { TERRA_COLOR } from '../../constants/theme/color';
import { HomeNavigatorParamList } from 'types/navigator';

export default function InnCard({
  navigation,
}: {
  navigation: NativeStackNavigationProp<HomeNavigatorParamList>;
}) {
  return (
    <Card containerStyle={{ marginBottom: 15 }} onPress={() => navigation.navigate('Detail')}>
      <Card.Image
        style={{ height: 200 }}
        source={{
          uri: 'https://xaydungthuanphuoc.com/wp-content/uploads/2022/09/mau-phong-tro-co-gac-lung-dep2022-5.jpg',
        }}
      />
      <View padding-20>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text text60 color={TERRA_COLOR.PRIMARY[4]}>
            Nhà trọ An Khang
          </Text>
          <Text text80 color="red" marginT-2>
            1.500.000đ/tháng
          </Text>
        </View>

        <Text text70 $textDefault marginT-5>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem iste porro modi
          nobis.
        </Text>

        <View marginT-10>
          <Text text80 color={TERRA_COLOR.GRAY[3]}>
            Xem chi tiết
          </Text>
        </View>
      </View>
    </Card>
  );
}
