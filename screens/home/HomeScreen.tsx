import React from 'react';
import { ImageBackground, StyleSheet, TextInput } from 'react-native';
import { Avatar, Carousel, Text, TextField, View } from 'react-native-ui-lib';
import InnCard from '../../components/InnCard/InnCard';
import { TERRA_COLOR } from '../../constants/theme/color';

export default function HomeScreen() {
  return (
    <ImageBackground
      source={require('../../assets/home-background.png')}
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
          <Avatar source={require('../../assets/terra-logo.png')} size={60} />
        </View>
        <Text marginB-10 text7>
          Khám phá trọ gần bạn
        </Text>
        <Carousel onChangePage={() => console.log('page changed')} loop pageControlPosition="under">
          {[1, 2, 3, 4, 5].map(() => (
            <InnCard />
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
