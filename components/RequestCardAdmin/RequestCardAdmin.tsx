import React from 'react';
import { ImageBackground, StyleSheet, TextInput, Dimensions } from 'react-native';
import { View, TextField, Text, Button, Modal, Image, TouchableOpacity } from 'react-native-ui-lib';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AdminRequestNavigatorParamList } from 'types/navigator';
import {ADMIN_REQUEST_STATUS} from '../../constants/status'
import {TERRA_COLOR} from '../../constants/theme/color'

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const getStatus = (status: number) => {
  if (status === 0) {
    return [TERRA_COLOR.ERROR[3], 'Chưa hoàn thành']
  } else if (status === 1) {
    return [TERRA_COLOR.SUCCESS[3], 'Hoàn thành']
  }
  return 'undefined'
};

export default function RequestCardAdmin({
  title,
  content,
  creator_name,
  create_at,
  status,
  room_name,
  group_name,
}: {
  title: string;
  content: string;
  creator_name: string;
  create_at: string;
  status: number;
  room_name: string;
  group_name: string;
}) {
  const navigation = useNavigation<NativeStackNavigationProp<AdminRequestNavigatorParamList>>();
  const statusProps = getStatus(status);
  const colorStyles = {
    backgroundColor: statusProps[0]
};

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Detail')}>
      <View style={styles.modalView}>
        <View flex center>
          <Image style={styles.profileImage} source={{uri:'https://scontent.fsgn13-4.fna.fbcdn.net/v/t1.6435-9/31369162_885771468275939_4964628091302313984_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=sT04S8RQvJ4AX-RVAEm&tn=AGlP9pozc-tpxuWV&_nc_ht=scontent.fsgn13-4.fna&oh=00_AfCjWbf3nsSYp6vLlt3YNxQ8IWym9BYw6kGaGk8HsVEhFw&oe=63C2BADE'}} />
        </View>

        <View style={styles.textView} flex left>
          <Text style={styles.headerText}>
            <Text style={{ fontWeight: 'bold' }}>{title}</Text> • {new Date(create_at).toDateString()}
          </Text>

          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end', marginRight: 10 }}>
            <View style={{ width: '80%' }}>
              <Text style={styles.nameText} numberOfLines={1}>
                {creator_name}
              </Text>
            </View>
            <View style={{ width: '20%' }}>
              <Text
                style={
                  status == 1
                    ? styles.statusDone
                    : styles.statusDonent
                }
              >
                {statusProps[1]}
              </Text>
            </View>
          </View>
          <Text style={styles.footerText}>
            <Text style={{ fontWeight: 'bold' }}>{group_name}</Text> • Phòng {room_name}
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
  modalView: {
    flexDirection: 'row',
    backgroundColor: 'white',
    margin: 0.5,
    borderRadius: 20,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.2,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    marginTop: 5,
  },
  profileImage: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 64,
  },
  textView: {
    flex: 5,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  headerText: {
    textAlign: 'center',
    fontSize: 12,
  },
  nameText: {
    flex: 3,
    fontSize: 18,
    textAlign: 'left',
    overflow: 'hidden',
  },
  footerText: {
    fontSize: 11,
    textAlign: 'center',
  },
  statusDone: {
    flex: 1,
    fontSize: 10,
    fontWeight: 'bold',
    color: TERRA_COLOR.SUCCESS[3],
    justifyContent: 'center',
    textAlign: 'right',
    top: -4,
  },
  statusDonent: {
    flex: 1,
    fontSize: 10,
    fontWeight: 'bold',
    color: TERRA_COLOR.ERROR[3],
    justifyContent: 'center',
    textAlign: 'right',
    top: -4,
  },
});
