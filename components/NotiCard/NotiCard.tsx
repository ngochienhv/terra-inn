import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text, View } from 'react-native-ui-lib';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TERRA_COLOR } from '../../constants/theme/color';

export default function NotificationCard() {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.iconContainer}>
        <Ionicons name={'ios-notifications-outline'} size={30} color={TERRA_COLOR.ERROR[4]} />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <Text text70 style={styles.text}>
            Kiểm tra thông tin đợt 2
          </Text>
          <Text color={TERRA_COLOR.GRAY[2]}>16:08 03/11</Text>
        </View>
        <Text numberOfLines={2}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore a dolores nam at quasi
          odit accusantium explicabo ipsam dolore nostrum!
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  iconContainer: {
    width: '20%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: TERRA_COLOR.ERROR[0],
    marginRight: '5%',
    marginBottom: '5%',
  },
  contentContainer: { borderBottomWidth: 1, borderColor: TERRA_COLOR.GRAY[3], paddingBottom: '4%' },
  titleContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  text: { fontWeight: 'bold' },
});
