import React from 'react';
import { Dimensions, ScrollView, StyleSheet } from 'react-native';
import { View, Carousel, Image, Text, Button, GridList } from 'react-native-ui-lib';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { TERRA_COLOR } from '../../constants/theme/color';

const innImages = [
  'https://bandon.vn/uploads/posts/thiet-ke-nha-tro-dep-2020-bandon-0.jpg',
  'https://angcovat.vn/imagesdata/KN208117/thiet-ke-phong-tro-khep-kin-co-gac-lung.jpg',
  'https://www.hancorp.com.vn/wp-content/uploads/2020/08/phong-tro-2.jpg',
];

const description = ['Thoáng mát', 'Có bảo vệ', 'Không chung chủ', 'Giờ giấc thoải mái', 'Sạch sẽ'];

function DetailComponent() {
  return (
    <View flex>
      <ScrollView>
        <Carousel onChangePage={() => console.log('page changed')} loop pageControlPosition="under">
          {innImages.map((image) => (
            <Image source={{ uri: image }} style={{ height: 200 }} />
          ))}
        </Carousel>
        <View padding-15>
          <View style={styles.headerBox}>
            <Text text50 color={TERRA_COLOR.PRIMARY[3]}>
              Phòng trọ An Khang
            </Text>
            <Text text50 color={TERRA_COLOR.PRIMARY[3]}>
              P101
            </Text>
          </View>
          <View style={styles.headerBox} marginT-10>
            <Text text60>
              Giá: <Text color={TERRA_COLOR.ERROR[4]}>1,500,000đ/tháng</Text>
            </Text>
            <Text text70 color={TERRA_COLOR.PRIMARY[3]}>
              {[1, 2, 3].map((x) => (
                <Ionicons name={'ios-person'} size={20} color={TERRA_COLOR.PRIMARY[3]} />
              ))}
            </Text>
          </View>
          <View style={{ ...styles.headerBox, justifyContent: 'center' }}>
            <View style={styles.utilityBox}>
              <View style={styles.utilityItem}>
                <Ionicons name={'ios-wifi'} size={30} />
                <Text text70>Wifi miễn phí</Text>
              </View>
              <View style={styles.utilityItem}>
                <Ionicons name={'ios-car'} size={30} />
                <Text text70>Có hầm xe</Text>
              </View>
              <View style={styles.utilityItem}>
                <Ionicons name={'ios-home'} size={30} />
                <Text text70>An toàn</Text>
              </View>
            </View>
          </View>
          <Text text70 marginT-10>
            Lorem ipsum dolor, sit amet conse adipisicing elit. Officiis odit animi error quis
            temporibus! Reprehenderit ipsum accusantium sequi nemo esse?
          </Text>
          <View style={styles.headerBox} marginT-10>
            <Text text70>Mô tả:</Text>
            <View style={styles.headerBox}>
              <Button text70 label="Vị trí" link color={TERRA_COLOR.PRIMARY[3]} />
              <Ionicons name={'ios-home'} size={20} color={TERRA_COLOR.PRIMARY[3]} />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const renderDescription = (description: string) => {
  return (
    <View style={styles.descriptionBox}>
      <Ionicons name="ios-arrow-redo-circle" size={14} color={TERRA_COLOR.PRIMARY[4]} />
      <Text key={description} style={styles.descriptionText}>
        {description}
      </Text>
    </View>
  );
};

export default function DetailScreen() {
  const { width } = Dimensions.get('window');
  const itemWidth = width / 2;
  return (
    <GridList
      ListHeaderComponent={<DetailComponent />}
      data={description}
      maxItemWidth={itemWidth}
      numColumns={2}
      renderItem={({ item }) => renderDescription(item)}
      ListFooterComponent={
        <View style={styles.buttonBox}>
          <Button
            label="Yêu cầu thuê phòng"
            backgroundColor={TERRA_COLOR.PRIMARY[3]}
            style={styles.button}
          />
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  headerBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  utilityBox: {
    flexDirection: 'row',
    backgroundColor: TERRA_COLOR.PRIMARY[1],
    marginTop: '5%',
    alignSelf: 'baseline',
    borderRadius: 10,
  },
  utilityItem: { alignItems: 'center', margin: '4%' },
  descriptionBox: { flexDirection: 'row', marginLeft: '13%' },
  descriptionText: { marginLeft: 5 },
  buttonBox: { flexDirection: 'row', justifyContent: 'center', margin: '6%' },
  button: { alignSelf: 'baseline' },
});
