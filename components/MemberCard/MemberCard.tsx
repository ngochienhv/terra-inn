import React from 'react';
import { Card, Image, Text, View } from 'react-native-ui-lib';
import { TERRA_COLOR } from '../../constants/theme';

export default function MemberCard({
  name,
  phone,
  age,
  image,
}: {
  name: string;
  phone: string;
  age: number;
  image: string;
}) {
  return (
    <Card margin-10 containerStyle={{ backgroundColor: TERRA_COLOR.PRIMARY[0] }}>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }} padding-10>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Image
            source={{
              uri: image,
            }}
            borderRadius={50}
            height={50}
            width={50}
          />
        </View>
        <View marginL-20>
          <Text text60BL style={{ fontWeight: '700' }}>
            {name}
          </Text>
          <Text text70 color={TERRA_COLOR.GRAY[3]}>
            SĐT: {phone}
          </Text>
          <Text text70 color={TERRA_COLOR.GRAY[3]}>
            {age} tuổi
          </Text>
        </View>
      </View>
    </Card>
  );
}
