import React, { useState, useEffect } from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  View,
  TextField,
  Text,
  Colors,
  Typography,
  Button,
} from 'react-native-ui-lib';
import { TERRA_COLOR } from '../../constants/theme/color';
import { AuthenNavigatorParamList } from 'types/navigator';
import { useAppDispatch } from '../../redux/store';
import { signIn } from '../../redux/slices/userSlice';
import axios from 'axios';

export default function SigninScreen({
  navigation,
}: {
  navigation: NativeStackNavigationProp<AuthenNavigatorParamList, 'Signin'>;
}) {
  const [phone, setPhone] = useState<string>();
  const [password, setPassword] = useState<string>();
  const dispatch = useAppDispatch();

  const textFieldProps = {
    floatingPlaceholder: true,
    floatingPlaceholderColor: {
      focus: TERRA_COLOR.DEFAULT[4],
      default: TERRA_COLOR.PRIMARY[4],
    },
    containerStyle: {
      width: '80%',
      marginBottom: 10,
    },
    fieldStyle: styles.withUnderline,
    migrate: true,
  };

  const handleSignin = async () => {
    const res = await fetch('http://127.0.0.1:3000/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone, password }),
    });
    // const res = await axios.post('http://127.0.0.1:3000/login', {
    //   phone,
    //   password,
    // });
    console.log(res);
    if (phone === '0000000000' && password === '12345678') {
      dispatch(signIn('admin'));
    } else if (phone == '1000000000' && password === '12345678') {
      dispatch(signIn('guest'));
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/login-background.png')}
        resizeMode='cover'
        style={styles.image}
      >
        <View flex center>
          <Text text40>Đăng nhập</Text>
          <Text
            color={TERRA_COLOR.ERROR[4]}
            text50
            style={{ marginBottom: 20 }}
          >
            TerraInn
          </Text>
          <TextField
            placeholder='Số điện thoại'
            {...textFieldProps}
            value={phone}
            onChangeText={setPhone}
          />
          <TextField
            placeholder='Mật khẩu'
            {...textFieldProps}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
          <Button
            label='Đăng nhập'
            backgroundColor={TERRA_COLOR.PRIMARY[3]}
            style={styles.button}
            text60
            onPress={handleSignin}
          />
          <Button
            label='Chưa có tài khoản? Đăng ký ngay'
            color={TERRA_COLOR.PRIMARY[3]}
            style={styles.hyperLink}
            link
            text70
            onPress={() => navigation.navigate('Signup')}
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
    paddingLeft: 90,
    paddingRight: 90,
  },
  hyperLink: {
    marginTop: 20,
  },
});
