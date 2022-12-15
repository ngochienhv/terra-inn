import React from 'react';
import { ImageBackground, StyleSheet, TextInput, Dimensions } from 'react-native';
import { View, TextField, Text, Button, Modal, Image, TouchableOpacity } from 'react-native-ui-lib';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AdminRequestNavigatorParamList } from 'types/navigator';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TERRA_COLOR } from '../../constants/theme';
import { REQUEST_STATUS } from '../../constants/status';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const getStatus = (status: number) => {
  if (status === 1) {
    return ['rgba(255, 167, 38, 0.2)', 'ios-warning', 'Chưa hoàn thành  '];
  } else if (status === 2) {
    return ['#D3EFED', 'ios-checkmark-circle', 'Đã hoàn thành  '];
  }
  return 'undefined'
};

export default function RequestCard({
  title,
  content,
  creator,
  create_at,
  status,
}: {
  title: string;
  content: string;
  creator: string;
  create_at: string;
  status: number;
}) {
  const navigation = useNavigation<NativeStackNavigationProp<AdminRequestNavigatorParamList>>();
  const statusProps = getStatus(status);
  const colorStyles = {
    backgroundColor: statusProps[0]
};
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Detail')}>
      <View style={[styles.modalViewDone, colorStyles]} flex left>
          <View> 
            <Text style={styles.headerText}>
              {creator} • {new Date(create_at).toDateString()}
            </Text>
          </View>
          <View>
            <Text style={styles.mainText}>
              {title}
            </Text>
          </View>
          <View>
            <Text style={styles.subText}>
              {content}
            </Text>
          </View>
          <View>
            <Text style={styles.subText}>
              <Text style={{ fontWeight: 'bold' }}>Trạng thái: </Text> {statusProps[2]}  
              <Ionicons name={statusProps[1]} size={16} color={status === 1 ? TERRA_COLOR.ERROR[3] : TERRA_COLOR.PRIMARY[4]}/>
            </Text>
          </View>
          
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  modalViewDone: {
    flex: 0,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    margin: 0.5,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    marginTop: 5,
  },
  modalViewDonent: {
    flex: 0,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(255, 167, 38, 0.2)',
    margin: 0.5,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    marginTop: 5,
  },
  headerText: {
    fontSize: 15,
    textAlign: 'left',
    color: TERRA_COLOR.GRAY[4],
    marginBottom: 2,
  },
  mainText: {
    fontSize: 20,
    textAlign: 'left',
    marginBottom: 2,
    fontWeight: 'bold',
  },
  subText: {
    fontSize: 15,
    textAlign: 'left',
    color: TERRA_COLOR.GRAY[4],
    marginBottom: 2,
  },
  statusDone: {
    flex: 1,
    fontSize: 10,
    fontWeight: 'bold',
    color: '#66BB6A',
    justifyContent: 'center',
    textAlign: 'right',
    top: -4,
  },
  statusDonent: {
    flex: 1.25,
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FF3939',
    justifyContent: 'center',
    textAlign: 'right',
    top: -4,
  },
  statusPending: {
    flex: 1,
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFA726',
    justifyContent: 'center',
    textAlign: 'right',
    top: -4,
  },
});
