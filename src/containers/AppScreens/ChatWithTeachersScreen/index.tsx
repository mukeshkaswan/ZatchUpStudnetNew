   
   
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



const teacher_chat_data = [
    {
      id: 1,
      name: 'Mukesh Sharma',
      time: '2:26PM',
      profileImage: Images.profile_img2,
      message:
        'Lorem Ipsum is simply dummy text of the printing and type setting industry.',
      msg_read: false,
    },
    {
      id: 2,
      name: 'Prashant Chaudhary',
      time: 'Yesterday',
      profileImage: Images.profile_img2,
      message:
        'Lorem Ipsum is simply dummy text of the printing and type setting industry.',
      msg_read: true,
    },
    {
      id: 3,
      name: 'Mukesh Sharma',
      time: 'Yesterday',
      profileImage: Images.profile_img2,
      message:
        'Lorem Ipsum is simply dummy text of the printing and type setting industry.',
      msg_read: true,
    },
    {
      id: 4,
      name: 'Prashant Sharma',
      time: 'Yesterday',
      profileImage: Images.profile_img2,
      message:
        'Lorem Ipsum is simply dummy text of the printing and type setting industry.',
      msg_read: true,
    },
    {
      id: 5,
      name: 'Prashant Chaudhary',
      time: 'Yesterday',
      profileImage: Images.profile_img2,
      message:
        'Lorem Ipsum is simply dummy text of the printing and type setting industry.',
      msg_read: true,
    },
    {
      id: 6,
      name: 'Prashant Chaudhary',
      time: 'Yesterday',
      profileImage: Images.profile_img2,
      message:
        'Lorem Ipsum is simply dummy text of the printing and type setting industry.',
      msg_read: true,
    },
    {
      id: 7,
      name: 'Mukesh Sharma',
      time: 'Yesterday',
      profileImage: Images.profile_img2,
      message:
        'Lorem Ipsum is simply dummy text of the printing and type setting industry.',
      msg_read: true,
    },
    {
      id: 8,
      name: 'Prashant Sharma',
      time: 'Yesterday',
      profileImage: Images.profile_img2,
      message:
        'Lorem Ipsum is simply dummy text of the printing and type setting industry.',
      msg_read: true,
    },
    {
      id: 9,
      name: 'Prashant Chaudhary',
      time: 'Yesterday',
      profileImage: Images.profile_img2,
      message:
        'Lorem Ipsum is simply dummy text of the printing and type setting industry.',
      msg_read: true,
    },
  ];
interface ResetPasswordScreenProps {
  navigation: any;
}

const ChatWithTeachersScreen= (props: ResetPasswordScreenProps) => {
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

   


  return (
    <View style={styles.container}>
    <CustomStatusBar />
    <HeaderTitleWithBack
           navigation={props.navigation}
          headerTitle="Teachers for Chat"
        />
       <FlatList
             data={teacher_chat_data}
            renderItem={({ item }) =>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                      <View style={styles.listCardWrapper}>
          <View style={styles.userImageWrapper}>
            <Image style={styles.userImageStyle} source={item.profileImage} />
          </View>
          <View style={styles.msgCardRightWrapper}>
            <View style={styles.msgCardHeaderWrapper}>
              <View style={{flex: 1}}>
                <Text
                  style={styles.userNameStyle}>
                  {item.name}
                </Text>
              </View>
              <TouchableOpacity onPress={() => props.navigation.navigate('TeacherMessageChat')}>
              <View style={{height: 15, width: 15}}>
              <Image
                    style={{height: '100%', width: '100%'}}
                    source={Images.rightarrow}
                  />
                  </View>
                </TouchableOpacity>
            </View>
  </View>
        </View>
        <View
          style={{
            height: 2,
            width: '90%',
            marginLeft: 100,
            // marginRight:10,
            backgroundColor: '#E9E9E9',
          }}
        />
            </ScrollView>
          }
            
          />
            
                     
     
        
            
 </View>

  );
}
export default ChatWithTeachersScreen;