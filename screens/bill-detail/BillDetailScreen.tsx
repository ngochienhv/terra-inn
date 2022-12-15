import React, { useEffect, useState } from 'react';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, Card, LoaderScreen, Text, View } from 'react-native-ui-lib';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { TERRA_COLOR } from '../../constants/theme/color';
import { BILL_STATUS } from '../../constants/status';
import { useSelector } from 'react-redux';
import { selectUserRole } from '../../redux/selectors/userSelectors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const data = {
  id: 1,
  motel_id: 1,
  invoice_date: '2022-12',
  rental_price: 4000000,
  elec_rate: 2500,
  water_rate: 5000,
  service_fee: 50000,
  garbage_fee: 100000,
  parking_fee: 120000,
  elec_index_before: 100,
  elec_index_after: 180,
  water_index_before: 100,
  water_index_after: 120,
  due_date: '2022-12-31',
  pay_status: 0,
  create_at: '0001-01-01T00:00:00Z',
  note: '',
};

const getStatusColor = (status: number) => {
  if (status === 0) {
    return TERRA_COLOR.WARNING[3];
  } else if (status === 1) {
    return TERRA_COLOR.SUCCESS[3];
  } else if (status === 2) {
    return TERRA_COLOR.ERROR[3];
  }
};

const getButtonLabel = (status: number) => {
  if (status === 0) {
    return 'Thanh toán';
  } else if (status === 1) {
    return 'In hóa đơn';
  } else if (status === 2) {
    return 'Nhắc nhở';
  }
};

const Row = ({ title, content }: { title: string; content: string | number }) => (
  <>
    <View style={styles.rowContainer}>
      <Text color={TERRA_COLOR.GRAY[3]}>{title}</Text>
      <Text color={title === 'Tình trạng thanh toán' && getStatusColor(content as number)}>
        {/*@ts-ignore */}
        {title === 'Tình trạng thanh toán' ? BILL_STATUS[content] : content}
      </Text>
    </View>
    {title !== 'Tình trạng thanh toán' ? (
      <View height={1} backgroundColor={TERRA_COLOR.GRAY[0]} marginL-15 marginR-15 />
    ) : null}
  </>
);

export default function BillDetailScreen({
  isPreviewing,
  route,
}: {
  isPreviewing?: boolean;
  route?: any;
}) {
  const bill = !isPreviewing ? route.params.room : '';
  const [billData, setBillData] = useState({});
  const [loading, setLoading] = useState<boolean>(true);
  const totalElec = (billData.elec_index_after - billData.elec_index_before) * billData.elec_rate;
  const totalWater =
    (billData.water_index_after - billData.water_index_before) * billData.water_rate;
  const isAdmin = useSelector(selectUserRole) === 'admin';

  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await axios.get(`/invoice?id=${bill.id}`, {
        headers: { token },
      });
      console.log(res.data);
      setBillData(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isPreviewing) {
      fetchData();
    } else {
      setLoading(false);
      setBillData(data);
    }
  }, []);

  return (
    <>
      {loading ? (
        <LoaderScreen color={TERRA_COLOR.PRIMARY[2]} message="Loading..." overlay />
      ) : (
        <View flex style={{ backgroundColor: TERRA_COLOR.PRIMARY[1] }}>
          <ScrollView>
            <Card margin-20>
              <Row title="Phòng" content={bill.name} />
              <Row title="Tháng/năm" content={billData.invoice_date} />
              <Row title="Ngày chốt" content={new Date(billData.create_at).toDateString()} />
              <View style={{ ...styles.rowContainer, justifyContent: 'flex-start' }}>
                <Text color={TERRA_COLOR.GRAY[3]}>Chỉ số điện</Text>
                <Ionicons name={'ios-flash'} size={20} color={TERRA_COLOR.WARNING[3]} />
              </View>
              <View height={1} backgroundColor={TERRA_COLOR.GRAY[0]} marginL-15 marginR-15 />
              <Row title="Chỉ số đầu" content={billData.elec_index_before} />
              <Row title="Chỉ số cuối" content={billData.elec_index_after} />
              <Row
                title="Sử dụng"
                content={billData.elec_index_after - billData.elec_index_before}
              />
              <Row title="Đơn giá" content={billData.elec_rate + ' KwH'} />
              <Row title="Thành tiền" content={totalElec + ' đ'} />
              <View style={{ ...styles.rowContainer, justifyContent: 'flex-start' }}>
                <Text color={TERRA_COLOR.GRAY[3]}>Chỉ số nước</Text>
                <Ionicons name={'ios-water'} size={20} color={TERRA_COLOR.DEFAULT[3]} />
              </View>
              <View height={1} backgroundColor={TERRA_COLOR.GRAY[0]} marginL-15 marginR-15 />
              <Row title="Chỉ số đầu" content={billData.water_index_before} />
              <Row title="Chỉ số cuối" content={billData.water_index_after} />
              <Row
                title="Sử dụng"
                content={billData.water_index_after - billData.water_index_before}
              />
              <Row title="Đơn giá" content={billData.water_rate + ' m3'} />
              <Row title="Thành tiền" content={totalWater + ' đ'} />
              <Row title="Tiền phòng" content={billData.rental_price + ' đ'} />
              <Row title="Phí dịch vụ" content={billData.service_fee + ' đ'} />
              <Row
                title="Tổng tiền"
                content={
                  totalWater + totalElec + billData.rental_price + billData.service_fee + ' đ'
                }
              />
              {!isPreviewing ? (
                <>
                  <Row title="Tình trạng thanh toán" content={billData.pay_status} />
                  <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                    {isAdmin ? (
                      <Button
                        label={getButtonLabel(billData.pay_status)}
                        backgroundColor={TERRA_COLOR.PRIMARY[4]}
                        style={{ alignSelf: 'baseline', margin: '5%' }}
                      />
                    ) : null}
                  </View>
                </>
              ) : null}
            </Card>
          </ScrollView>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '5%',
    marginLeft: '3%',
    marginRight: '3%',
  },
});
