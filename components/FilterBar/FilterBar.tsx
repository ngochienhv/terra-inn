import React from 'react';
import { ImageBackground, StyleSheet, TextInput, Dimensions, Pressable } from 'react-native';
import { View, TextField, Text, Button, Modal, Image } from 'react-native-ui-lib';
import { TERRA_COLOR } from '../../constants/theme/color';
import Ionicons from 'react-native-vector-icons/Ionicons';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;



export default function FilterBar (props: any) {
    return (
        <View>
            {/* <ScrollView style={{marginRight: 40}} horizontal={true} showsHorizontalScrollIndicator={false} stickyHeaderIndices={[0]} alwaysBounceHorizontal={false} bounces={false}> */}
                <Pressable style={styles.filterItem} onPress={() => console.log(props)}>
                    <Text style={styles.itemText} adjustsFontSizeToFit={true} numberOfLines={1}>
                        {props.name}
                    </Text> 
                </Pressable>    
            {/* </ScrollView> */}
            {/* <View style={styles.stickyItem} flex right>
                        <Ionicons style={{marginTop: 2}} name={'ios-funnel'} size={15} color={TERRA_COLOR.PRIMARY[3]} /> 
            </View> */}
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 5
  },
  filterItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    margin: 0.5,
    borderRadius: 15,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    marginTop: 10,
  },
  itemText: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    overflow: 'hidden',
  },
  choosenItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    margin: 0.5,
    borderRadius: 15,
    borderBottomColor: TERRA_COLOR.PRIMARY[3],
    borderBottomWidth: 2,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    marginTop: 10,
  },
  choosenItemText: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    overflow: 'hidden',
    color: TERRA_COLOR.PRIMARY[3],
  },
  stickyItem: {
    position: 'absolute',
    left: screenWidth - 37,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    backgroundColor: 'white',
    margin: 0.5,
    borderRadius: 15,
    borderBottomColor: TERRA_COLOR.PRIMARY[3],
    borderBottomWidth: 2,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    marginTop: 10,
  },
});
  
