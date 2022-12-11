import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { ImageBackground, StyleSheet, TextInput } from 'react-native';
import { Avatar, Carousel, Text, TextField, View, Button } from 'react-native-ui-lib';
import { HomeNavigatorParamList } from 'types/navigator';
import InnCard from '../../../components/InnCard/InnCard';
import { TERRA_COLOR } from '../../../constants/theme/color';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function AdminHomeScreen({
  navigation,
}: {
  navigation: NativeStackNavigationProp<HomeNavigatorParamList>;
}) {
  return (
    // <ImageBackground
    //   source={require('../../../assets/home-background.png')}
    //   resizeMode="cover"
    //   style={styles.image}
    // >
      <View flex padding-20>
        {/* <TextInput style={styles.input} placeholder="Tìm kiếm" /> */}
        <View margin-20 style={styles.title}>
          <View>
            <Text text50 color={TERRA_COLOR.GRAY[4]}>
              Xin chào, Admin
            </Text>
            {/* <Text text40 style={{ fontFamily: 'Roboto' }}>
              TerraInn
            </Text> */}
            </View>
          <Avatar source={require('../../../assets/terra-logo.png')} size={60} />
        </View>
        <View style={{ ...styles.headerBox, justifyContent: 'center' }}>
            <View style={styles.utilityBox}>
              <View style={styles.utilityItem}>
                <Ionicons name={'notifications-outline'} size={30} />
                <Text text70>Quản lý</Text>
                <Text text60 color={TERRA_COLOR.GRAY[4]}>Phòng trọ</Text>
              </View>
              <View style={styles.utilityItem}>
                <Ionicons name={'notifications-outline'} size={30} />
                <Text text70>Quản lý</Text>
                <Text text60 color={TERRA_COLOR.GRAY[4]}>Yêu cầu</Text>
              </View>
              <View style={styles.utilityItem}>
                <Ionicons name={'list-box'} size={30} />
                <Text text70>Quản lý</Text>
                <Text text60 color={TERRA_COLOR.GRAY[4]}>Hóa đơn</Text>
              </View>
              <View style={styles.utilityItem}>
                <Ionicons name={'options'} size={30} />
                <Text text70>Quản lý</Text>
                <Text text60 color={TERRA_COLOR.GRAY[4]}>Điện nước</Text>
              </View>
            </View>
          </View>
        <Text text70 color={TERRA_COLOR.GRAY[4]}>
          Thông báo mới
        </Text>
        
        <View style={{ ...styles.headerBox, justifyContent: 'center' }}>
            <View style={styles.notiBox}>
              <View style={styles.notiItem}>
              <Ionicons name={'build'} size={30} >
                    <Text text70>Phòng 771 có 1 yêu cầu sửa chữa</Text>
                </Ionicons>
              </View>
              <View style={styles.notiItem}>
              <Ionicons name={'build'} size={30} >
                    <Text text70>Phòng 771 có 1 yêu cầu sửa chữa</Text>
                </Ionicons>
              </View>
              <View style={styles.notiItem}>
                <Ionicons name={'build'} size={30} >
                    <Text text70>Phòng 771 có 1 yêu cầu sửa chữa</Text>
                </Ionicons>
                
              </View>
            </View>
          </View>

       <View style={styles.buttonBox}>
       <Button
         label="Tạo thông báo"
         backgroundColor={TERRA_COLOR.PRIMARY[3]}
         style={styles.button}
         />
     </View>
    </View>
    // </ImageBackground>
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
    borderRadius: 10,
    flexWrap: 'wrap',
  },
  utilityItem: { alignItems: 'center', 
  margin: '4%' ,
  backgroundColor: TERRA_COLOR.PRIMARY[1],
  borderRadius: 4,
  height: '40%',
  width: '40%',
},
notiBox: {
    flexDirection: 'column',
    marginTop: '5%',
    alignSelf: 'baseline',
    borderRadius: 10,
    flexWrap: 'wrap',
},
notiItem: { alignItems: 'center', 
  margin: '4%' ,
  backgroundColor: TERRA_COLOR.WARNING[1],
  borderRadius: 4,
//   height: '15%',
  width: '80%',
},
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonBox: { flexDirection: 'row', justifyContent: 'flex-end', margin: '6%' },
  button: { alignSelf: 'baseline' },
});
