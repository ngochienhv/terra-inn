import React from 'react';
import { Button, Card, Text, View } from 'react-native-ui-lib';
import { StyleSheet } from 'react-native';

import { TERRA_COLOR } from '../../constants/theme';
import { REQUEST_STATUS } from '../../constants/status';

const getStatusColor = (status: number) => {
  if (status === 1) {
    return TERRA_COLOR.ERROR[3];
  } else if (status === 2) {
    return TERRA_COLOR.SUCCESS[3];
  }
};

const data = {
  id: 1,
  creator: 'abc@gmail.com',
  creator_name: 'Nguyễn Văn A',
  room_name: 'H1-711',
  group_name: 'Khu trọ An Khang',
  is_from_admin: false,
  motel_id: 1,
  type: 2,
  status: 0,
  title: 'Đăng kí dịch vụ wifi',
  due_date: '',
  content: 'Lorem isume',
  create_at: '2022-12-14T08:45:29.221+07:00',
};

const Row = ({ title, content }: { title: string; content: string | number }) => (
  <>
    <View style={styles.rowContainer}>
      <Text color={TERRA_COLOR.GRAY[3]}>{title}</Text>
      <Text color={title === 'Tình trạng' && getStatusColor(content as number)}>
        {/*@ts-ignore */}
        {title === 'Tình trạng' ? REQUEST_STATUS[content] : content}
      </Text>
    </View>
    <View height={1} backgroundColor={TERRA_COLOR.GRAY[0]} marginL-15 marginR-15 />
  </>
);

export default function RequestDetailScreen() {
  return (
    <View flex style={{ backgroundColor: TERRA_COLOR.PRIMARY[1] }}>
      <Card margin-20 padding-20>
        <Text text40L margin-10>
          {data.title}
        </Text>
        <Row title="Phòng" content={data.room_name} />
        <Row title="Nguời yêu cầu" content={data.creator_name} />
        <Row title="Loại yêu cầu" content={data.type} />
        <Row title="Ngày yêu cầu" content={new Date(data.create_at).toDateString()} />
        <Row title="Ngày cần hoàn thành" content={data.due_date} />
        <Row title="Tình trạng" content={data.status} />
        <View style={{ ...styles.rowContainer, flexDirection: 'column', alignItems: 'flex-start' }}>
          <Text color={TERRA_COLOR.GRAY[3]}>Nội dung</Text>
          <Text marginT-10>{data.content}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
          <Button
            label={data.status === 0 ? 'Hoàn thành yêu cầu' : 'Bỏ hoàn thành'}
            backgroundColor={TERRA_COLOR.PRIMARY[4]}
            style={{ alignSelf: 'baseline', margin: '5%' }}
          />
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '5%',
    marginLeft: '3%',
    marginRight: '3%',
    alignItems: 'center',
  },
});
