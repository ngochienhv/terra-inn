import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import {
  View,
  TextField,
  Text,
  Button,
  Colors,
  Avatar,
} from 'react-native-ui-lib';
import { TERRA_COLOR } from '../../constants/theme/color';
import { useAppDispatch } from '../../redux/store';
import { signOut } from '../../redux/slices/userSlice';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ProfileNavigatorParamList } from 'types/navigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

export default function ChangePasswordScreen({
  navigation,
}: {
  navigation: NativeStackNavigationProp<ProfileNavigatorParamList>;
}) {
  const dispatch = useAppDispatch();
  const [oldPassword, setOldPassWord] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  const textFieldProps = {
    floatingPlaceholder: false,
    fieldStyle: styles.withUnderline,
    migrate: true,
    labelColor: TERRA_COLOR.PRIMARY[3],
    containerStyle: styles.inputContainer,
  };

  const handleChangePassword = async () => {
    const token = await AsyncStorage.getItem('token');
    try {
      Toast.show({
        type: 'info',
        text1: 'Đang lưu',
      });
      const res = axios.put(
        '/user/change-password',
        {
          current_password: oldPassword,
          new_password: newPassword,
        },
        { headers: { token } }
      );
      navigation.navigate('Profile');
      Toast.show({
        type: 'success',
        text1: 'Đã lưu',
      });
    } catch (err) {
      console.log(err);
      Toast.show({
        type: 'erorr',
        text1: 'Có lỗi xảy ra',
      });
    }
  };

  return (
    <ScrollView>
      <View flex padding-20>
        <Button
          label='Đăng xuất'
          backgroundColor={TERRA_COLOR.ERROR[2]}
          marginB-20
          onPress={() => dispatch(signOut())}
        />
        <TextField
          {...textFieldProps}
          label='Mật khẩu cũ'
          secureTextEntry
          onChangeText={setOldPassWord}
        />
        <TextField
          {...textFieldProps}
          label='Mật khẩu mới'
          secureTextEntry
          onChangeText={setNewPassword}
        />
        <TextField
          {...textFieldProps}
          label='Xác nhận mật khẩu mới'
          secureTextEntry
          onChangeText={setRePassword}
        />
        <View
          style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          marginT-15
        >
          <Button
            label='Hủy'
            backgroundColor='white'
            color='black'
            onPress={() => navigation.goBack()}
          />
          <Button
            label='Lưu thay đổi'
            backgroundColor={TERRA_COLOR.PRIMARY[3]}
            onPress={handleChangePassword}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  withUnderline: {
    borderBottomWidth: 1,
    borderColor: TERRA_COLOR.PRIMARY[3],
    paddingBottom: 4,
  },
  inputContainer: {
    marginTop: '7%',
  },
  avatarContainer: { flexDirection: 'row', justifyContent: 'center' },
});
