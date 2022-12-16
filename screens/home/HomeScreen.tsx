import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, TextInput } from 'react-native';
import { Avatar, Carousel, Text, TextField, View } from 'react-native-ui-lib';
import { HomeNavigatorParamList } from 'types/navigator';
import InnCard from '../../components/InnCard/InnCard';
import { TERRA_COLOR } from '../../constants/theme/color';

export default function HomeScreen({
  navigation,
}: {
  navigation: NativeStackNavigationProp<HomeNavigatorParamList>;
}) {
  const [motels, setMotels] = useState([]);
  useEffect(() => {
    const fetchMotelList = async () => {
      try {
        const res = await axios.get('/motel?guest=true');
        setMotels(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchMotelList();
  }, []);
  return (
    <ImageBackground
      source={{ uri: 'https://i.ibb.co/105qd0V/home-background.png' }}
      resizeMode="cover"
      style={styles.image}
    >
      <View flex padding-20>
        <TextInput style={styles.input} placeholder="Tìm kiếm" />
        <View margin-20 style={styles.title}>
          <View>
            <Text text50 color={TERRA_COLOR.GRAY[4]}>
              Thuê và ở cùng
            </Text>
            <Text text40 style={{ fontFamily: 'Roboto' }}>
              TerraInn
            </Text>
          </View>
          <Avatar
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdgKnRGHPC_HSqeO4lUvjyxHaTxrmc-uIeiw&usqp=CAU',
            }}
            size={60}
          />
        </View>
        <Text marginB-10 text7>
          Khám phá trọ gần bạn
        </Text>
        <Carousel onChangePage={() => console.log('page changed')} loop pageControlPosition="under">
          {motels.map((motel) => (
            <InnCard navigation={navigation} motel={motel} />
          ))}
        </Carousel>
      </View>
    </ImageBackground>
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
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
