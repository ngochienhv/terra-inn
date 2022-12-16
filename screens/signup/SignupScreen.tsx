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
  RadioGroup,
  RadioButton,
} from 'react-native-ui-lib';
import { TERRA_COLOR } from '../../constants/theme/color';
import { AuthenNavigatorParamList } from 'types/navigator';
import axios from 'axios';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

export default function SignupScreen({
  navigation,
}: {
  navigation: NativeStackNavigationProp<AuthenNavigatorParamList, 'Signup'>;
}) {
  const [phone, setPhone] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [isAdmin, setIsAdmin] = useState<number>(0);

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
    Toast.show({
      type: 'info',
      text1: 'Đang chờ',
    });
    try {
      console.log({ phone, password });
      await axios.post('/register', {
        phone,
        password,
        is_admin: isAdmin === 0 ? false : true,
      });
      navigation.navigate('Signin');
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
        source={{ uri: 'https://i.ibb.co/znBxTDM/register-background.png' }}
        resizeMode="cover"
        style={styles.image}
      >
        <View center style={styles.box}>
          <View center>
            <Text color={TERRA_COLOR.PRIMARY[4]} text40>
              Đăng Ký
            </Text>
            <Text color={TERRA_COLOR.PRIMARY[4]} text50>
              TerraInn
            </Text>
          </View>
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
          <View style={{ alignItems: 'flex-start', width: '100%' }}>
            <Text marginT-20 marginL-20 color={TERRA_COLOR.PRIMARY[4]} text70>
              Bạn là
            </Text>
            <RadioGroup initialValue={isAdmin} onValueChange={setIsAdmin}>
              <RadioButton
                value={0}
                label={'Người thuê trọ'}
                marginT-15
                marginL-15
                color={TERRA_COLOR.PRIMARY[4]}
              />
              <RadioButton
                value={1}
                label={'Chủ trọ'}
                marginT-15
                marginL-15
                color={TERRA_COLOR.PRIMARY[4]}
              />
            </RadioGroup>
          </View>
          <Button
            label="Đăng Ký"
            backgroundColor={TERRA_COLOR.PRIMARY[3]}
            style={styles.button}
            onPress={() => handleSignUp()}
            text60
          />
          <Button
            label="Đã có tài khoản? Đăng nhập ngay"
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
    marginTop: 30,
    paddingLeft: 90,
    paddingRight: 90,
  },
  hyperLink: {
    marginTop: 20,
  },
});
