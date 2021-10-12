import React, { Component, FC, useState } from 'react';
import { Text, View, FlatList, Image, TouchableOpacity, Platform, ImageBackground, ScrollView, Alert, BackHandler } from 'react-native';
import styles from './style.tsx';  
import { TextField, CustomButton, CustomStatusBar, Validate, CustomHeader, BackBtn } from '../../../components';
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

interface ResetPasswordScreenProps {
  navigation: any;
}

const Reminders= (props: ResetPasswordScreenProps) => {

   

   
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
          }}>{'Reminders'}</Text>
        </View>


      </View>
</View>
<ScrollView>
<View style={{paddingHorizontal:16}}> 
   <View style={styles.reminderrowcontainer}>
       <Text style={styles.schoolremindertext} >School Reminder 1</Text>
       <View style={styles.reminderarrowcontainer}>  
            <View style={{height: 18, width: 20}}>
                 <Image
                  style={{height: '100%', width: '100%',tintColor:'white'}}
                  source={Images.rightarrow}
                />
             </View>
       </View>
   </View>
   <View style={styles.reminderrowcontainer}>
       <Text style={styles.schoolremindertext}>School Reminder 2</Text>
       <View style={styles.reminderarrowcontainer}>  
            <View style={{height: 18, width: 20}}>
                 <Image
                  style={{height: '100%', width: '100%',tintColor:'white'}}
                  source={Images.rightarrow}
                />
             </View>
       </View>
   </View>
   <View style={styles.reminderrowcontainer}>
       <Text style={styles.schoolremindertext}>School Reminder 3</Text>
       <View style={styles.reminderarrowcontainer}>  
            <View style={{height: 18, width: 20}}>
                 <Image
                  style={{height: '100%', width: '100%',tintColor:'white'}}
                  source={Images.rightarrow}
                />
             </View>
       </View>
   </View>
   <View style={styles.reminderrowcontainer}>
       <Text style={styles.schoolremindertext}>School Reminder 4</Text>
       <View style={styles.reminderarrowcontainer}>  
            <View style={{height: 18, width: 20}}>
                 <Image
                  style={{height: '100%', width: '100%',tintColor:'white'}}
                  source={Images.rightarrow}
                />
             </View>
       </View>
   </View>
   
 </View>
 </ScrollView>
</View>


  );
}
export default Reminders;