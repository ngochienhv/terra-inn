import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { View, TextField, Text, Button, Colors, Avatar } from 'react-native-ui-lib';
import { TERRA_COLOR } from '../../constants/theme/color';
import { useAppDispatch } from '../../redux/store';
import { signOut } from '../../redux/slices/userSlice';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ProfileNavigatorParamList } from 'types/navigator';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useSelector } from 'react-redux';
import { selectUserProfile } from '../../redux/selectors/userSelectors';

const testData = {
  avatar:
    'https://lh3.googleusercontent.com/-cw77lUnOvmI/AAAAAAAAAAI/AAAAAAAAAAA/WMNck32dKbc/s181-c/104220521160525129167.jpg',
  name: '...',
  email: '...',
  phone: '...',
  year: '...',
  cccd: '...',
};

interface IProfileData {
  avatar: string;
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
  const userProfile = useSelector(selectUserProfile);
  const dispatch = useAppDispatch();
  const textFieldProps = {
    floatingPlaceholder: false,
    fieldStyle: styles.withUnderline,
    migrate: true,
    labelColor: TERRA_COLOR.PRIMARY[3],
    containerStyle: styles.inputContainer,
  };

  useEffect(() => {
    Toast.show({
      type: 'info',
      text1: 'Đang tải dữ liệu',
    });
    if (userProfile) {
      setData({
        name: userProfile.full_name,
        email: userProfile.email,
        phone: userProfile.phone,
        year: userProfile.date_of_birth,
        avatar: userProfile.avatar_url,
        cccd: userProfile.cid_number,
      });
    }
  }, [userProfile]);

  const handleSaveChange = async () => {
    try {
      Toast.show({
        type: 'info',
        text1: 'Đang lưu',
      });
      const token = await AsyncStorage.getItem('token');
      const res = await axios.put(
        '/user/update',
        {
          email: data.email,
          full_name: data.name,
          phone: data.phone,
          date_of_birth: data.year,
          cid_number: data.cccd,
        },
        {
          headers: {
            token,
          },
        }
      );
      await AsyncStorage.setItem('token', res.data.new_token);
      Toast.show({
        type: 'success',
        text1: 'Đã lưu',
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
        <TextField
          {...textFieldProps}
          label="Tên đầy đủ"
          value={data.name}
          onChangeText={(name: string) => {
            setData({
              ...data,
              name,
            });
          }}
        />
        <TextField
          {...textFieldProps}
          label="Email"
          value={data.email}
          onChangeText={(email: string) => {
            setData({
              ...data,
              email,
            });
          }}
        />
        <TextField {...textFieldProps} label="Số điện thoại" value={data.phone} />
        <TextField
          {...textFieldProps}
          label="Năm sinh"
          value={data.year}
          onChangeText={(year: string) => {
            setData((data) => ({
              ...data,
              year,
            }));
          }}
        />
        <TextField
          {...textFieldProps}
          label="Số CCCD"
          value={data.cccd}
          onChangeText={(cccd: string) => {
            setData((data) => ({
              ...data,
              cccd,
            }));
          }}
        />
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
          <Button
            label="Lưu thay đổi"
            backgroundColor={TERRA_COLOR.PRIMARY[3]}
            onPress={handleSaveChange}
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
