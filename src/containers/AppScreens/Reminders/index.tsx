import React, { Component, FC, useState } from 'react';
import { Text, View, FlatList, Image, TouchableOpacity, Platform, ImageBackground, ScrollView, Alert, BackHandler } from 'react-native';
import styles from './style.tsx';  
import { TextField, CustomButton, CustomStatusBar, Validate, CustomHeader, BackBtn,HeaderTitleWithBack } from '../../../components';
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
  

const data = [
  {
    id: 1,
    Text: 'School Reminder 1',
    
  },
  {
    id: 2,
    Text: 'School Reminder 2',
  },
  {
    id: 3,
    Text: 'School Reminder 3',
  },
  {
    id: 4,
    Text: 'School Reminder 4',
  },
]
interface ResetPasswordScreenProps {
  navigation: any;
}

const Reminders= (props: ResetPasswordScreenProps) => {

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
          headerTitle="Reminders"
        />
     
<ScrollView>
 



    {/* dsv */}

    <FlatList
             data={data}
            renderItem={({ item }) =>
       <View style={{paddingHorizontal:16}}> 
            <View style={styles.reminderrowcontainer}>
                 <Text style={styles.schoolremindertext} >{item.Text}</Text>
                  <View style={styles.reminderarrowcontainer}>  
                     <TouchableOpacity style={styles.zatchupstarclassbtn} onPress={() => {
                        props.navigation.navigate('ReminderTitleScreen');
  }}>
                   <View style={{height: 18, width: 20}}>
                       <Image
                        style={{height: '100%', width: '100%',tintColor:'white'}}
                   source={Images.rightarrow}
                />
             </View>
          </TouchableOpacity> 
       </View>
   </View>
   </View>
            
          }
            
          />


 </ScrollView>
</View>


  );
}
export default Reminders;