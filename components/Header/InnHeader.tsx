import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { Button, Card, Image, Text, View } from 'react-native-ui-lib';
import { TERRA_COLOR } from '../../constants/theme/color';
import { getHeaderTitle } from '@react-navigation/elements';
import InnCard from '../../../components/InnCard/InnCard';
import { Dimensions, ScrollView, StyleSheet } from 'react-native';
import { View, Carousel, Image, Text, Button, GridList } from 'react-native-ui-lib';
import Ionicons from 'react-native-vector-icons/Ionicons';



export const InnHeader = ({title, leftButton}) => {
  return (
    // <View style={{justifyItem: "between"}}>
    //   {leftButton}
    //   <Text>{title}</Text>
    // </View>
    <View style={styles.descriptionBox}>
      <Text key={title} style={styles.descriptionText}>
        {title}
      </Text>
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