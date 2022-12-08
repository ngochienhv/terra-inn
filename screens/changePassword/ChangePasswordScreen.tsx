import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { View, TextField, Text, Button, Colors, Avatar } from 'react-native-ui-lib';
import { TERRA_COLOR } from '../../constants/theme/color';
import { useAppDispatch } from '../../redux/store';
import { signOut } from '../../redux/slices/userSlice';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ProfileNavigatorParamList } from 'types/navigator';

export default function ChangePasswordScreen({
  navigation,
}: {
  navigation: NativeStackNavigationProp<ProfileNavigatorParamList>;
}) {
  const dispatch = useAppDispatch();
  const textFieldProps = {
    floatingPlaceholder: false,
    fieldStyle: styles.withUnderline,
    migrate: true,
    labelColor: TERRA_COLOR.PRIMARY[3],
    containerStyle: styles.inputContainer,
  };

  return (
    <ScrollView>
      <View flex padding-20>
        <Button
          label="Đăng xuất"
          backgroundColor={TERRA_COLOR.ERROR[2]}
          marginB-20
          onPress={() => dispatch(signOut())}
        />
        <TextField {...textFieldProps} label="Mật khẩu cũ" secureTextEntry value={'123456789'} />
        <TextField {...textFieldProps} label="Mật khẩu mới" secureTextEntry value={'123456789'} />
        <TextField
          {...textFieldProps}
          label="Xác nhận mật khẩu mới"
          secureTextEntry
          value={'123456789'}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} marginT-15>
          <Button
            label="Hủy"
            backgroundColor="white"
            color="black"
            onPress={() => navigation.goBack()}
          />
          <Button label="Lưu thay đổi" backgroundColor={TERRA_COLOR.PRIMARY[3]} />
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
