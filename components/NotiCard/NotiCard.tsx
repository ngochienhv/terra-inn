import React from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Card, Text, View } from 'react-native-ui-lib';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TERRA_COLOR } from '../../constants/theme/color';
import { NotificationNavigatorParamList } from '../../types/navigator';

export default function NotificationCard() {
  const navigation = useNavigation<NativeStackNavigationProp<NotificationNavigatorParamList>>();

  return (
    <Card padding-8 margin-5 onPress={() => navigation.navigate('NotificationDetail')}>
      <View style={styles.cardContainer}>
        <View style={styles.iconContainer}>
          <Ionicons name={'ios-notifications-outline'} size={30} color={TERRA_COLOR.ERROR[4]} />
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <Text text70 style={styles.text}>
              Kiểm tra thông tin đợt 2
            </Text>
            <Text color={TERRA_COLOR.GRAY[2]} text90>
              3 giờ
            </Text>
          </View>
          <Text numberOfLines={2}>
            Lorem ipsum dolor sit amet consect, adipisicing elit. Inventore a dolores nam at quasi
            odit accusantium explicabo ipsam dolore nostrum!
          </Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '75%',
  },
  iconContainer: {
    width: '25%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: TERRA_COLOR.ERROR[0],
    marginRight: '5%',
  },
  contentContainer: { paddingBottom: '4%' },
  titleContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  text: { fontWeight: 'bold' },
});
