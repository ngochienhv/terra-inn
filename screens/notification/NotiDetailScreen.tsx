import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Text, View } from 'react-native-ui-lib';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { TERRA_COLOR } from '../../constants/theme/color';

export default function NotiDetailScreen() {
  return (
    <ScrollView style={styles.container}>
      <View margin-20>
        <Text color={TERRA_COLOR.PRIMARY[4]} text40 style={{ fontWeight: '700' }}>
          Thay đổi về phương thức thanh toán
        </Text>
        <View style={styles.notify}>
          <Ionicons
            name={'ios-information-circle-outline'}
            size={30}
            color={TERRA_COLOR.ERROR[4]}
          />
          <View flex>
            <Text marginL-10 color="white" text70>
              Thông báo này được gửi với mức độ quan trọng cao
            </Text>
          </View>
        </View>
        <View marginT-20 marginB-20>
          <Text text65BL>
            <Text color={TERRA_COLOR.GRAY[3]}>Từ:</Text> Trưởng nhà
          </Text>
          <Text text65BL>
            <Text color={TERRA_COLOR.GRAY[3]}>Vào lúc:</Text> 12:23AM 10/11/22
          </Text>
        </View>
        <Text text70BL color={TERRA_COLOR.GRAY[4]}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore aliquid praesentium
          quisquam similique fugiat hic perferendis ex dolor labore, quod minus. Qui dignissimos
          veritatis numquam vitae est expedita in enim esse mollitia. Perspiciatis, maxime? Ad
          repellat nisi, repellendus ut earum error suscipit aliquam atque distinctio. Dolorem
          repellendus at tenetur cupiditate autem numquam ab illo ea, voluptatem odit magnam
          laboriosam beatae quasi nisi! Delectus, dolorem? Quo adipisci sapiente perferendis
          delectus ab cupiditate necessitatibus veniam eius maxime dignissimos
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: 'white', flex: 1 },
  notify: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: TERRA_COLOR.ERROR[1],
    padding: 15,
    borderRadius: 8,
    marginTop: '5%',
  },
});
