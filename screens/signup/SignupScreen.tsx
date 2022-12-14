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
import axios from 'axios';

export default function SignupScreen({
  navigation,
}: {
  navigation: NativeStackNavigationProp<AuthenNavigatorParamList, 'Signup'>;
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
      width: '90%',
      marginBottom: 10,
    },
    fieldStyle: styles.withUnderline,
    migrate: true,
  };

  const handleSignUp = async () => {
    const res = await axios.post('http://127.0.0.1:3000/api/register', {
      email: phone,
      password,
      is_admin: false,
    });
    console.log({ res });
    navigation.navigate('Signin');
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/register-background.png')}
        resizeMode='cover'
        style={styles.image}
      >
        <View center>
          <Text color='white' text40>
            Đăng Ký
          </Text>
          <Text color='white' text50>
            TerraInn
          </Text>
        </View>
        <View center style={styles.box}>
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
            label='Đăng Ký'
            backgroundColor={TERRA_COLOR.PRIMARY[3]}
            style={styles.button}
            onPress={() => handleSignUp()}
            text60
          />
          <Button
            label='Đã có tài khoản? Đăng nhập ngay'
            color={TERRA_COLOR.PRIMARY[3]}
            style={styles.hyperLink}
            link
            text70
            onPress={() => navigation.navigate('Signin')}
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
  box: {
    height: 'auto',
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 20,
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
