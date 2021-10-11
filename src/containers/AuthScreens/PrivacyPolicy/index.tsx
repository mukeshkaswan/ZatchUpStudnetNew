import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Dimensions,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  BackHandler,
  ImageBackground,
  FlatList,
  Platform
} from 'react-native';
import styles from './style';
import { Images } from '../../../components/index';
import { TextField, CustomButton, CustomStatusBar } from '../../../components';
import { useDispatch, useSelector } from 'react-redux';
import * as userActions from '../../../actions/user-actions-types';
import Toast from 'react-native-simple-toast';
import CardView from 'react-native-cardview'
import ProgressLoader from 'rn-progress-loader';
import { NavigationContainer, useIsFocused, DrawerActions } from '@react-navigation/native';
import { Card } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
 
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const screenWidth = Dimensions.get('window').width;

interface HomeScreenProps {
  navigation: any;
}
const MySchool = (props: HomeScreenProps) => {
 
  const backPressed = () => {
    props.navigation.goBack(null);
    return true;
  }

  
  return (
 
<View style={{flex:1}}>
<CustomStatusBar />

<View style={{
  height: Platform.OS === 'ios' ? '10%' : '7%',
  backgroundColor: 'rgb(70,50,103)',
  borderBottomLeftRadius: 15,
  borderBottomRightRadius: 15,

}}>
  <View style={{ flexDirection: 'row', width: '100%', alignSelf: 'center', }}>


    <TouchableOpacity onPress={backPressed}
      style={{ marginTop: Platform.OS === 'ios' ? 30 : 10, marginLeft: 10 }} >
      <Icon name="arrow-left" size={25} color="white" />
    </TouchableOpacity>



    <View style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",

    }}>
      <Text style={{
        textAlignVertical: "center",
        textAlign: "center",
        color: 'white',
        fontSize: hp(2.8),
        marginRight: 20,
        fontFamily: 'Lato-Regular',
        marginTop: Platform.OS === 'ios' ? 30 : 5,
      }}>{'Privacy Policy'}</Text>
    </View>


  </View>

  <View style={{width:'100%',height:200,backgroundColor:'white',marginTop:15}}>



  </View>

</View>






</View>
  );
};

export default MySchool;