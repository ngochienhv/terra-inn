import React, { useState, useEffect } from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { View, TextField, Text, Colors, Typography, Button } from 'react-native-ui-lib';
import { TERRA_COLOR } from '../../constants/theme/color';
import { NavigatorParamList } from 'types/navigator';

export default function SigninScreen({
  navigation,
}: {
  navigation: NativeStackNavigationProp<NavigatorParamList, 'Home'>;
}) {
  const [phone, setPhone] = useState<string>();
  const [password, setPassword] = useState<string>();

  const textFieldProps = {
    floatingPlaceholder: true,
    floatingPlaceholderColor: {
      focus: TERRA_COLOR.DEFAULT[4],
      default: TERRA_COLOR.PRIMARY[4],
    },
    containerStyle: {
      width: '80%',
    },
    fieldStyle: styles.withUnderline,
    migrate: true,
  };

  useEffect(() => {
    console.log(phone, password);
  }, [phone, password]);

  const handleSignin = () => {
    if (phone === '000000000' && password === '12345678') {
      console.log('true', phone, password);

      navigation.navigate('Home');
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/login-background.png')}
        resizeMode="cover"
        style={styles.image}
      >
        <View flex center>
          <Text text40>Đăng nhập</Text>
          <Text color="red" text50>
            TerraInn
          </Text>
          <TextField
            placeholder="Số điện thoại"
            {...textFieldProps}
            value={phone}
            onChangeText={setPhone}
          />
          <TextField
            placeholder="Mật khẩu"
            {...textFieldProps}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
          <Button
            label="Đăng nhập"
            backgroundColor={TERRA_COLOR.PRIMARY[3]}
            style={styles.button}
            onPress={() => handleSignin()}
          />
          <Button
            label="Chưa có tài khoản? Đăng ký ngay"
            color={TERRA_COLOR.PRIMARY[3]}
            style={styles.hyperLink}
            link
          />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  withUnderline: {
    borderBottomWidth: 1,
    borderColor: Colors.$outlineDisabledHeavy,
    paddingBottom: 4,
  },
  button: {
    marginTop: 50,
    paddingLeft: 70,
    paddingRight: 70,
  },
  hyperLink: {
    marginTop: 20,
  },
});
