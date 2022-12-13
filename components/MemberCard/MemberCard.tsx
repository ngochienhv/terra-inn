import React from 'react';
import { ImageBackground, StyleSheet, TextInput, Dimensions } from 'react-native';
import { View, TextField, Text, Button, Modal, Image } from 'react-native-ui-lib';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;


export default function RequestCard (props: any) {
    return (
        <View>
            <View style={styles.modalView}>
            <View flex center><Image style={styles.profileImage} source={(props.image)}/></View>
            
            <View style={styles.textView} flex left>
            <Text style={styles.headerText}><Text style={{fontWeight: "bold"}}>{props.request}</Text></Text>
            
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-end', marginRight: 10}}>
                <Text style={styles.nameText} numberOfLines={1}>{props.name}</Text> 
                <Text style={(props.status == "Đã hoàn thành" ? styles.statusDone : 
                              props.status == "Chờ thanh toán" ? styles.statusPending :
                              styles.statusDonent)}>{props.status}</Text>
            </View>
            <Text style={styles.footerText}><Text style={{fontWeight: "bold"}}>Nhà trọ {props.inn}</Text> • Phòng {props.room}</Text>
            </View>
            </View>
        </View>
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
    marginTop: 5
  },
  profileImage:{
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 15,
  },
  textView: {
    flex: 5,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  headerText:{
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
    fontSize: 12,
    textAlign: 'center',
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
  
