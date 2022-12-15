import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button, Card, Image, Text, View } from 'react-native-ui-lib';
import { TERRA_COLOR } from '../../constants/theme/color';
import { HomeNavigatorParamList } from 'types/navigator';

export default function InnCard({
  navigation,
  motel,
}: {
  navigation: NativeStackNavigationProp<HomeNavigatorParamList>;
  motel: any;
}) {
  const coverImage = motel.images.split(',')[0];
  return (
    <Card
      containerStyle={{ marginBottom: 15 }}
      // @ts-ignore
      onPress={() => navigation.navigate('Detail', { motel })}
    >
      <Card.Image
        style={{ height: 200 }}
        source={{
          uri: `https://terrainn-api.fly.dev/assets/${coverImage}`,
        }}
      />
      <View padding-20>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text text60 color={TERRA_COLOR.PRIMARY[4]}>
            {motel.name}
          </Text>
          <Text text80 color="red" marginT-2>
            {motel.rental_price} đ/tháng
          </Text>
        </View>

        <Text text70 $textDefault marginT-5 numberOfLines={5}>
          {motel.description}
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
