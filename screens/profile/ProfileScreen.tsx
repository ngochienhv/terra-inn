import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { View, TextField, Text, Button, Colors, Avatar } from 'react-native-ui-lib';
import { TERRA_COLOR } from '../../constants/theme/color';
import { useAppDispatch } from '../../redux/store';
import { signOut } from '../../redux/slices/userSlice';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ProfileNavigatorParamList } from 'types/navigator';

const testData = {
  name: 'Nguyễn Văn A',
  email: 'example@gmail.com',
  phone: '0987654321',
  year: '1994',
  cccd: '123456789123456',
};

interface IProfileData {
  name: string;
  email: string;
  phone: string;
  year: string;
  cccd: string;
}

export default function ProfileScreen({
  navigation,
}: {
  navigation: NativeStackNavigationProp<ProfileNavigatorParamList>;
}) {
  const [data, setData] = useState<IProfileData>(testData);
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
        <View style={styles.avatarContainer}>
          <Avatar
            source={{
              uri: 'https://lh3.googleusercontent.com/-cw77lUnOvmI/AAAAAAAAAAI/AAAAAAAAAAA/WMNck32dKbc/s181-c/104220521160525129167.jpg',
            }}
            size={140}
          />
        </View>
        <TextField {...textFieldProps} label="Tên đầy đủ" value={data.name} />
        <TextField {...textFieldProps} label="Email" value={data.email} />
        <TextField {...textFieldProps} label="Số điện thoại" value={data.phone} />
        <TextField {...textFieldProps} label="Năm sinh" value={data.year} />
        <TextField {...textFieldProps} label="Số CCCD" value={data.cccd} />
        <View marginT-20 style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
          <Button
            label="Thay đổi mật khẩu"
            link
            color={TERRA_COLOR.PRIMARY[3]}
            text80
            onPress={() => navigation.navigate('ChangePassword')}
          />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} marginT-15>
          <Button label="Hủy" backgroundColor="white" color="black" />
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
