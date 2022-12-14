import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  Button,
  Carousel,
  Checkbox,
  Image,
  LoaderScreen,
  Text,
  TextField,
  TouchableOpacity,
  View,
  Wizard,
} from 'react-native-ui-lib';
import { useSelector } from 'react-redux';
import { IRoom } from 'types/roomType';
import { TERRA_COLOR } from '../../../constants/theme';
import { selectRoomForm } from '../../../redux/selectors/formSelector';
import { useAppDispatch } from '../../../redux/store';
import { resetRoomFormValue, setRoomFormValue } from '../../../redux/slices/roomSlice';
import { useRoute, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getRoomDetail } from '../../../redux/actions/roomActions';
import { AdminInnNavigatorParamList } from 'types/navigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const innImages = [
  'https://bandon.vn/uploads/posts/thiet-ke-nha-tro-dep-2020-bandon-0.jpg',
  'https://angcovat.vn/imagesdata/KN208117/thiet-ke-phong-tro-khep-kin-co-gac-lung.jpg',
  'https://www.hancorp.com.vn/wp-content/uploads/2020/08/phong-tro-2.jpg',
];

const data = {
  id: 1,
  name: 'H1-711',
  group_id: 1,
  status: 2,
  max_slot: 4,
  floor: 1,
  description: ' Lorem isum',
  area: 40,
  rental_price: 4000000,
  elec_rate: 2500,
  water_rate: 5000,
  service_fee: 50000,
  garbage_fee: 100000,
  parking_fee: 120000,
};

export default function AdminRoomDetailScreen() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [completedStepIndex, setCompletedStepIndex] = useState<number>(-1);
  const [loading, setLoading] = useState<boolean>(true);
  const roomForm = useSelector(selectRoomForm);
  const dispatch = useAppDispatch();
  const route = useRoute();
  const navigation = useNavigation<NativeStackNavigationProp<AdminInnNavigatorParamList>>();
  //@ts-ignore
  const { action, roomId, innId } = route.params;

  const textFieldProps = {
    floatingPlaceholder: false,
    fieldStyle: styles.withUnderline,
    migrate: true,
    labelColor: TERRA_COLOR.PRIMARY[3],
    containerStyle: styles.inputContainer,
  };

  const getStepState = (index: number) => {
    let state: string = Wizard.States.DISABLED;

    if (completedStepIndex > index - 1) {
      state = Wizard.States.COMPLETED;
    } else if (activeIndex === index || completedStepIndex === index - 1) {
      state = Wizard.States.ENABLED;
    }

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

  useEffect(() => {
    if (action !== 'add') {
      dispatch(getRoomDetail(roomId));
    } else {
      dispatch(resetRoomFormValue());
    }
    setLoading(false);
  }, []);

  const handleSaveForm = async () => {
    let token = await AsyncStorage.getItem('token');
    console.log(roomForm);

    if (action === 'add') {
      await axios
        .post('motel', { ...roomForm, group_id: innId }, { headers: { token: token } })
        .then((response) => {
          console.log('success');
          //@ts-ignore
          navigation.navigate('InnDetail', {
            params: {
              innId: innId,
            },
          });
        })
        .catch((error) => {
          console.log('failed');
        });
    }
  };
  return (
    <>
      {loading ? (
        <View flex>
          <LoaderScreen color={TERRA_COLOR.DEFAULT[2]} message="Loading..." overlay />
        </View>
      ) : (
        <ScrollView>
          <View flex style={{ backgroundColor: 'white' }}>
            <Text color={TERRA_COLOR.PRIMARY[3]} text70 marginT-20 marginR-20 marginL-20>
              H??nh ???nh
            </Text>
            <Carousel loop pageControlPosition="under" style={{ margin: 20 }}>
              {innImages.map((image) => (
                <Image source={{ uri: image }} style={{ height: 200 }} />
              ))}
            </Carousel>
            <Wizard activeIndex={activeIndex} onActiveIndexChanged={setActiveIndex}>
              <Wizard.Step state={getStepState(0)} label={'Th??ng tin c?? b???n'} />
              <Wizard.Step state={getStepState(1)} label={'M?? t???'} />
            </Wizard>
            {activeIndex === 0 ? (
              <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <TextField
                    {...textFieldProps}
                    label="M??/S??? ph??ng"
                    value={roomForm.name}
                    onChangeText={(value: string) =>
                      dispatch(setRoomFormValue({ ...roomForm, name: value }))
                    }
                  />
                  <TextField
                    {...textFieldProps}
                    label="T???ng"
                    value={roomForm.floor?.toString()}
                    onChangeText={(value: string) =>
                      dispatch(setRoomFormValue({ ...roomForm, floor: parseInt(value) }))
                    }
                  />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <TextField
                    {...textFieldProps}
                    label="S??? l?????ng ng?????i"
                    value={roomForm.max_slot?.toString()}
                    onChangeText={(value: string) =>
                      dispatch(setRoomFormValue({ ...roomForm, max_slot: parseInt(value) }))
                    }
                  />
                  <TextField
                    {...textFieldProps}
                    label="Di???n t??ch ph??ng"
                    value={roomForm.area?.toString()}
                    onChangeText={(value: string) =>
                      dispatch(setRoomFormValue({ ...roomForm, area: parseInt(value) }))
                    }
                  />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <TextField
                    {...textFieldProps}
                    label="Gi?? ??i???n"
                    value={roomForm.elec_rate?.toString()}
                    onChangeText={(value: string) =>
                      dispatch(setRoomFormValue({ ...roomForm, elec_rate: parseInt(value) }))
                    }
                  />
                  <TextField
                    {...textFieldProps}
                    label="Gi?? n?????c"
                    value={roomForm.water_rate?.toString()}
                    onChangeText={(value: string) =>
                      dispatch(setRoomFormValue({ ...roomForm, water_rate: parseInt(value) }))
                    }
                  />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <TextField
                    {...textFieldProps}
                    label="Gi?? cho thu??"
                    value={roomForm.rental_price?.toString()}
                    onChangeText={(value: string) =>
                      dispatch(setRoomFormValue({ ...roomForm, rental_price: parseInt(value) }))
                    }
                  />
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} margin-30>
                  <Button label="H???y" backgroundColor={TERRA_COLOR.GRAY[0]} color="black" />
                  <Button
                    label="Ti???p theo"
                    backgroundColor={TERRA_COLOR.PRIMARY[3]}
                    onPress={goToNextStep}
                  />
                </View>
              </View>
            ) : (
              <View>
                <TextField
                  {...textFieldProps}
                  label="M?? t??? ng???n"
                  value={roomForm.description}
                  onChangeText={(value: string) =>
                    dispatch(setRoomFormValue({ ...roomForm, description: value }))
                  }
                />
                <View padding-15>
                  <Text color={TERRA_COLOR.PRIMARY[3]} text75 margin-5>
                    Ch???n m?? t??? ph??ng
                  </Text>
                  <Checkbox
                    value={false}
                    label="Wifi/Internet mi???n ph??"
                    color={TERRA_COLOR.DEFAULT[4]}
                    margin-5
                  />
                  <Checkbox
                    value={false}
                    label="Tho??ng m??t"
                    color={TERRA_COLOR.DEFAULT[4]}
                    margin-5
                  />
                  <Checkbox
                    value={false}
                    label="Tr??ng gi??? xe"
                    color={TERRA_COLOR.DEFAULT[4]}
                    margin-5
                  />
                  <Checkbox
                    value={false}
                    label="Gi??? gi???c tho???i m??i"
                    color={TERRA_COLOR.DEFAULT[4]}
                    margin-5
                  />
                  <Checkbox
                    value={false}
                    label="Kh??ng chung ch???"
                    color={TERRA_COLOR.DEFAULT[4]}
                    margin-5
                  />
                  <Checkbox
                    value={false}
                    label="V??? sinh ?????nh k??"
                    color={TERRA_COLOR.DEFAULT[4]}
                    margin-5
                  />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} margin-30>
                  <Button
                    label="Quay l???i"
                    backgroundColor={TERRA_COLOR.GRAY[0]}
                    color="black"
                    onPress={goToPreviousStep}
                  />
                  <Button
                    label="L??u"
                    backgroundColor={TERRA_COLOR.PRIMARY[3]}
                    onPress={handleSaveForm}
                  />
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  withUnderline: {
    borderBottomWidth: 1,
    borderColor: TERRA_COLOR.PRIMARY[3],
    paddingBottom: 4,
  },
  inputContainer: {
    flex: 1,
    margin: '5%',
  },
});
