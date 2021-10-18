import React, { Component, FC, useState } from 'react';
import { Text, View, FlatList, Image, TouchableOpacity, Platform, ImageBackground, ScrollView, Alert, BackHandler } from 'react-native';
import styles from './style.tsx';  
import { TextField, CustomButton, CustomStatusBar, Validate, CustomHeader, BackBtn ,HeaderTitleWithBack} from '../../../components';
import { Images } from '../../../components/index';
import Toast from 'react-native-simple-toast';
import { useDispatch, useSelector } from 'react-redux';
import * as userActions from '../../../actions/user-actions-types';
import ProgressLoader from 'rn-progress-loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import style from '../Messages/style';
import CardView from 'react-native-cardview';

 
interface ResetPasswordScreenProps {
  navigation: any;
}

const PendingRequestScreen= (props: ResetPasswordScreenProps) => {
 function handleBackBut() {
    props.navigation.goBack();
    return true;
  }
 const renderIndicator = () => {
    return (
      <View style={{}}>

        <ProgressLoader
          visible={true}
          isModal={true} isHUD={true}
          //hudColor={"#ffffff00"}
          hudColor={"#4B2A6A"}
          style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
          color={"white"} />
      </View>
    );
  }

  const backPressed = () => {
    props.navigation.goBack(null);
    return true;
  }


  return (
    <View style={styles.container}>
    <CustomStatusBar />
      <HeaderTitleWithBack
           navigation={props.navigation}
          headerTitle="Pending Requests"
        />
       <View style={styles.boxcontainer}>
           <Text style={styles.pendingtext}>Pending Requests</Text>
           <View style={styles.mainbordercontainer}>
                <View style={styles.bordercontainer}>
                     <Text style={{fontSize:16}}>Records Not Available</Text>
                </View>
           </View>

       </View>
       <View style={styles.boxcontainer}>
           <Text style={styles.pendingtext}>Kyc Pending Requests</Text>
           <View style={styles.mainbordercontainer}>
                <View style={styles.bordercontainer}>
                     <Text style={{fontSize:16}}>Records Not Available</Text>
                </View>
           </View>

       </View>
</View>


  );
}
export default PendingRequestScreen;