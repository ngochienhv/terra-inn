import axios from 'axios';
import React, { useEffect } from 'react';
import { Dimensions, ScrollView, StyleSheet } from 'react-native';
import { View, Carousel, Image, Text, Button, GridList } from 'react-native-ui-lib';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { TERRA_COLOR } from '../../constants/theme/color';

import { Toast } from 'react-native-toast-message/lib/src/Toast';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeNavigatorParamList } from 'types/navigator';

const description = ['Thoáng mát', 'Có bảo vệ', 'Không chung chủ', 'Giờ giấc thoải mái', 'Sạch sẽ'];

//@ts-ignore
function DetailComponent({ data }) {
  const motel = data;
  const images = motel.images.split(',');
  return (
    <View flex>
      <ScrollView>
        <Carousel onChangePage={() => console.log('page changed')} loop pageControlPosition="under">
          {images.map((image) => (
            <Image
              source={{ uri: `https://terrainn-api.fly.dev/assets/${image}` }}
              style={{ height: 200 }}
            />
          ))}
        </Carousel>
        <View padding-20>
          <View style={styles.headerBox}>
            <Text text40 color={TERRA_COLOR.PRIMARY[3]}>
              {motel.name}
            </Text>
          </View>
          <View style={styles.headerBox} marginT-10>
            <Text text65>
              Giá: <Text color={TERRA_COLOR.ERROR[4]}>{motel.rental_price} đ/tháng</Text>
            </Text>
            <Text text65 color={TERRA_COLOR.PRIMARY[3]}>
              {new Array(motel.max_slot).map((x) => (
                <Ionicons name={'ios-person'} size={20} color={TERRA_COLOR.PRIMARY[3]} />
              ))}
            </Text>
          </View>
          <View
            style={{ borderBottomWidth: 1, borderBottomColor: TERRA_COLOR.GRAY[1] }}
            marginT-20
          />
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
            {motel.description}
          </Text>
          <View
            style={{ borderBottomWidth: 1, borderBottomColor: TERRA_COLOR.GRAY[1] }}
            marginT-20
          />
          <View style={styles.headerBox} marginT-10>
            <Text text70BL>Mô tả:</Text>
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
      <Text key={description} style={styles.descriptionText} text70>
        {description}
      </Text>
    </View>
  );
};

//@ts-ignore
export default function DetailScreen(props) {
  const { width } = Dimensions.get('window');
  const itemWidth = width / 2;
  const navigation = useNavigation<NativeStackNavigationProp<HomeNavigatorParamList>>();
  const motel = props.route.params.motel;

  const check = () => {
    console.log(motel)
  }

  // const handleRequest = async () => {
  //   Toast.show({
  //     type: 'info',
  //     text1: 'Đang gửi yêu cầu',
  //   });
  //   try {
  //     const token = await AsyncStorage.getItem('token');
  //     const res = await axios.post(
  //       '/request',
  //       {
  //         is_from_admin: false,
  //         motel_id: motel.id,
  //         type: 1,
  //         status: 0,
  //         title: 'Yêu cầu thuê phòng',
  //         due_date: '2022-12-15',
  //         content: `Yêu cầu thuê phòng cho ${motel.name}`,
  //       },
  //       { headers: { token } }
  //     );

  //     Toast.show({
  //       type: 'success',
  //       text1: 'Đã gửi yêu cầu',
  //     });
  //   } catch (err) {
  //     console.log(err);
  //     Toast.show({
  //       type: 'error',
  //       text1: 'Có lỗi xảy ra:(',
  //     });
  //   }
  // };
  return (
    <GridList
      ListHeaderComponent={<DetailComponent data={motel} />}
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
            onPress={() => navigation.navigate('Add', {motel_id: motel.id, request: "Yêu cầu thuê phòng"})}
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
