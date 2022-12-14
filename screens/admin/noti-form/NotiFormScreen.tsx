import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Card, TextField, View } from 'react-native-ui-lib';
import { AdminHomeNavigatorParamList } from 'types/navigator';
import { TERRA_COLOR } from '../../../constants/theme';

export default function NotiFormScreen({
  navigation,
}: {
  navigation: NativeStackNavigationProp<AdminHomeNavigatorParamList>;
}) {
  const textFieldProps = {
    floatingPlaceholder: false,
    fieldStyle: styles.withUnderline,
    migrate: true,
    labelColor: TERRA_COLOR.PRIMARY[3],
    containerStyle: styles.inputContainer,
  };

  return (
    <View flex style={{ backgroundColor: TERRA_COLOR.PRIMARY[0] }}>
      <Card padding-10 margin-20>
        <TextField {...textFieldProps} label="Tiêu đề" placeholder="Tiêu đề thông báo" />
        <TextField
          {...textFieldProps}
          label="Nội dung"
          multiline={true}
          numberOfLines={8}
          placeholder="Nội dung thông báo"
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} marginT-15>
          <Button
            label="Hủy"
            backgroundColor={TERRA_COLOR.GRAY[0]}
            color="black"
            onPress={() => navigation.goBack()}
          />
          <Button label="Gửi" backgroundColor={TERRA_COLOR.PRIMARY[3]} />
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  withUnderline: {
    borderBottomWidth: 1,
    borderColor: TERRA_COLOR.PRIMARY[3],
    paddingBottom: 4,
  },
  inputContainer: {
    margin: '5%',
  },
});
