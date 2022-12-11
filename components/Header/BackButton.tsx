import React from 'react';
import { Dimensions, ScrollView, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button, Card, Image, Text, View } from 'react-native-ui-lib';
import { TERRA_COLOR } from '../../constants/theme/color';
import { getHeaderTitle } from '@react-navigation/elements';
import Ionicons from 'react-native-vector-icons/Ionicons';


export const BackButton = ({onPress}) => {
  return (
    <View style={styles.utilityItem}>
                <Ionicons name={'arrow-back'} size={30} />
              </View>
  )
}

const styles = StyleSheet.create({
  headerBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  utilityBox: {
    flexDirection: 'row',
    backgroundColor: TERRA_COLOR.PRIMARY[1],
    marginTop: '5%',
    alignSelf: 'baseline',
    borderRadius: 10,
  },
  utilityItem: { alignItems: 'center', margin: '4%' },
  descriptionBox: { flexDirection: 'row', marginLeft: '13%' },
  descriptionText: { marginLeft: 5 },
  buttonBox: { flexDirection: 'row', justifyContent: 'center', margin: '6%' },
  button: { alignSelf: 'baseline' },
});