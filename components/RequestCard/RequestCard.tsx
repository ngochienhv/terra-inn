import React from 'react';
import { ImageBackground, StyleSheet, TextInput, Dimensions } from 'react-native';
import { View, TextField, Text, Button, Modal, Image, TouchableOpacity } from 'react-native-ui-lib';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AdminRequestNavigatorParamList } from 'types/navigator';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TERRA_COLOR } from '../../constants/theme';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function RequestCard(props: any) {
  const navigation = useNavigation<NativeStackNavigationProp<AdminRequestNavigatorParamList>>();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Detail')}>
      <View style={styles.modalViewDonent} flex left>
          <View> 
            <Text style={styles.headerText}>
              <Text>Lê A • 4 Feb 2022</Text>
            </Text>
          </View>
          <View>
            <Text style={styles.mainText}>
              <Ionicons name={'ios-construct-outline'} size={25} /><Text style={{ fontWeight: 'bold' }}>  Sửa chữa điều hòa</Text>
            </Text>
          </View>
          <View>
            <Text style={styles.subText}>
              <Text>Điều hòa bị hỏng không khởi động được</Text>
            </Text>
          </View>
          <View>
            <Text style={styles.subText}>
              <Text><Text style={{ fontWeight: 'bold' }}>Trạng thái: </Text> Chưa hoàn thành  </Text>
              <Ionicons name={'ios-warning-outline'} size={16} color={TERRA_COLOR.ERROR[3]}/>
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
    backgroundColor: '#D3EFED',
    margin: 0.5,
    borderRadius: 20,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.2,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
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
    color: 'gray',
    marginBottom: 2,
  },
  mainText: {
    fontSize: 20,
    textAlign: 'left',
    marginBottom: 2,
  },
  subText: {
    fontSize: 15,
    textAlign: 'left',
    color: 'gray',
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
