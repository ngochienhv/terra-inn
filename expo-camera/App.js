import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, Button, Modal, Alert, Pressable, Dimensions, Image, ImageBackground } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import {WithSplashScreen} from './WithSplashScreen';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default function App() {
  const store = useRef(undefined);
  const queryClient = useRef(undefined);

  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsAppReady(true);
    }, 1000);
  }, []);

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [studentID, setstudentID] = useState(null);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    //alert(!isNaN(+data)); 
    setScanned(true);
    if (!isNaN(+data)) setModalVisible(!modalVisible);
    else alert('Please scan BKNet ID !');
    setstudentID(data);
    //alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <WithSplashScreen isAppReady={isAppReady}>
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Pressable
              style={[styles.button, styles.buttonScan]}
              onPress={() => setScanned(false)}>
              <Text style={styles.textStyle2}>Tap to Scan Again</Text>
            </Pressable>}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        
        <View>
          <View style={styles.modalView}>
          <Image style={styles.profileImage} source={require('./quang-hai.png')}/>
            <Text style={styles.modalTitle}>Nguyễn Quang Hải</Text>
            <Text style={styles.modalText}>Student ID:  <Text style={{fontWeight: "bold"}}>{studentID}</Text></Text>
            {scanned && <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>  Close  </Text>
            </Pressable>}
          </View>
        </View>
      </Modal>
    </View>
    </WithSplashScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  modalContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  modalView: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 200,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonScan: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: deviceWidth,
    color: 'black',
    backgroundColor: '#12ffd3',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textStyle2: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 15,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 15,
    marginBottom: 15,
    textAlign: 'center',
  },
  profileImage:{
    width:200,
    height:200,
    marginBottom:20,
  },
});