import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { Button, Card, Picker, Text, View, Wizard } from 'react-native-ui-lib';
import { TERRA_COLOR } from '../../../constants/theme';
import BillDetailScreen from '../../../screens/bill-detail/BillDetailScreen';

const inns = [
  { label: 'Khu trọ An Khang', value: 1 },
  { label: 'Khu trọ thần', value: 2 },
];

const rooms = [
  {
    id: 1,
    number: 101,
  },
  {
    id: 2,
    number: 102,
  },
  {
    id: 3,
    number: 103,
  },
  {
    id: 4,
    number: 104,
  },
  { id: 5, number: 105 },
  { id: 6, number: 106 },
  { id: 7, number: 107 },
  { id: 8, number: 108 },
  { id: 9, number: 109 },
  { id: 10, number: 110 },
];

export default function BillFormScreen() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [completedStepIndex, setCompletedStepIndex] = useState<number>(-1);

  const getStepState = (index: number) => {
    let state: string = Wizard.States.DISABLED;

    if (completedStepIndex > index - 1) {
      state = Wizard.States.COMPLETED;
    } else if (activeIndex === index || completedStepIndex === index - 1) {
      state = Wizard.States.ENABLED;
    }
    console.log(state);

    return state;
  };

  const goToPreviousStep = () => {
    const tempActiveIndex = activeIndex === 0 ? 0 : activeIndex - 1;
    return setActiveIndex(tempActiveIndex);
  };

  const goToNextStep = () => {
    const prevActiveIndex = activeIndex;
    const prevCompletedStepIndex = completedStepIndex;

    const tempActiveIndex = prevActiveIndex + 1;
    let tempCompletedStepIndex = prevCompletedStepIndex;
    if (!prevCompletedStepIndex || prevCompletedStepIndex < prevActiveIndex) {
      tempCompletedStepIndex = prevActiveIndex;
    }

    if (tempActiveIndex !== prevActiveIndex || tempCompletedStepIndex !== prevCompletedStepIndex) {
      setActiveIndex(tempActiveIndex);
      setCompletedStepIndex(tempCompletedStepIndex);
    }
  };

  return (
    <ScrollView>
      <Wizard activeIndex={activeIndex} onActiveIndexChanged={setActiveIndex}>
        <Wizard.Step state={getStepState(0)} label={'Nhập thông tin hóa đơn'} />
        <Wizard.Step state={getStepState(1)} label={'Xác nhận'} />
      </Wizard>
      {activeIndex === 0 ? (
        <View flex style={{ backgroundColor: TERRA_COLOR.PRIMARY[1] }}>
          <Card padding-20 margin-20>
            <Text marginB-5 color={TERRA_COLOR.GRAY[2]}>
              Khu trọ
            </Text>
            {/* @ts-ignore */}
            <Picker placeholder={'Chọn khu trọ'} onChange={() => console.log('changed')}>
              {inns.map((inn) => (
                <Picker.Item key={inn.label} value={inn.value} label={inn.label} />
              ))}
            </Picker>
            <Text marginB-5 color={TERRA_COLOR.GRAY[2]}>
              Phòng trọ
            </Text>
            {/* @ts-ignore */}
            <Picker placeholder={'Chọn phòng trọ'} onChange={() => console.log('changed')}>
              {rooms.map((room) => (
                <Picker.Item key={room.id} value={room.id} label={room.number.toString()} />
              ))}
            </Picker>
            <View marginB-10>
              <Text marginB-5 color={TERRA_COLOR.GRAY[2]}>
                Tiền phòng (VND)
              </Text>
              <TextInput style={styles.textInput} />
            </View>
            <View marginB-10>
              <Text marginB-5 color={TERRA_COLOR.GRAY[2]}>
                Chỉ số điện cũ (KwH)
              </Text>
              <TextInput style={styles.textInput} />
            </View>
            <View marginB-10>
              <Text marginB-5 color={TERRA_COLOR.GRAY[2]}>
                Chỉ số điện mới (KwH)
              </Text>
              <TextInput style={styles.textInput} />
            </View>
            <View marginB-10>
              <Text marginB-5 color={TERRA_COLOR.GRAY[2]}>
                Chỉ số nước cũ (m3)
              </Text>
              <TextInput style={styles.textInput} />
            </View>
            <View marginB-10>
              <Text marginB-5 color={TERRA_COLOR.GRAY[2]}>
                Chỉ số nước mới (m3)
              </Text>
              <TextInput style={styles.textInput} />
            </View>
            <View marginB-10>
              <Text marginB-5 color={TERRA_COLOR.GRAY[2]}>
                Tiền rác (VND)
              </Text>
              <TextInput style={styles.textInput} />
            </View>
            <View marginB-10>
              <Text marginB-5 color={TERRA_COLOR.GRAY[2]}>
                Tiền wifi (VND)
              </Text>
              <TextInput style={styles.textInput} />
            </View>
            <View marginB-10>
              <Text marginB-5 color={TERRA_COLOR.GRAY[2]}>
                Tiền giữ xe (VND)
              </Text>
              <TextInput style={styles.textInput} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} margin-30>
              <Button label="Hủy" backgroundColor={TERRA_COLOR.GRAY[0]} color="black" />
              <Button
                label="Tiếp theo"
                backgroundColor={TERRA_COLOR.PRIMARY[3]}
                onPress={goToNextStep}
              />
            </View>
          </Card>
        </View>
      ) : (
        <>
          <BillDetailScreen isPreviewing />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} margin-30>
            <Button
              label="Quay lại"
              backgroundColor={TERRA_COLOR.GRAY[0]}
              color="black"
              onPress={goToPreviousStep}
            />
            <Button label="Lưu" backgroundColor={TERRA_COLOR.PRIMARY[3]} />
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor: TERRA_COLOR.GRAY[0],
    padding: '2%',
    borderRadius: 4,
  },
});
