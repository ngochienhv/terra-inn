import React, { useState, useEffect } from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { View, TextField, Text, Colors, Typography, Button } from 'react-native-ui-lib';
import { TERRA_COLOR } from '../../constants/theme/color';
import { AuthenNavigatorParamList } from 'types/navigator';
import { useAppDispatch } from '../../redux/store';
import { signIn } from '../../redux/slices/userSlice';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserProfile } from '../../redux/actions/userActions';

import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { getAllInns } from '../../redux/actions/innGroupActions';
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
    Toast.show({
      type: 'info',
      text1: 'Đang chờ',
    });
    try {
      const res = await axios.post('/login', {
        phone,
        password,
      });
      dispatch(signIn(res.data.is_admin ? 'admin' : 'guest'));
      dispatch(getUserProfile(res.data.token));
      dispatch(getAllInns(res.data.token));

      await AsyncStorage.setItem('token', res.data.token);
      await AsyncStorage.setItem('role', res.data.is_admin ? 'admin' : 'guest');
      Toast.show({
        type: 'success',
        text1: 'Thành công',
      });
    } catch (err) {
      console.log(err);
      Toast.show({
        type: 'error',
        text1: 'Có lỗi xảy ra',
      });
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
          <Text color={TERRA_COLOR.ERROR[4]} text50 style={{ marginBottom: 20 }}>
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
            text60
            onPress={handleSignin}
          />
          <Button
            label="Chưa có tài khoản? Đăng ký ngay"
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
