import React, {Component, FC, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Platform,
  ImageBackground,
  ScrollView,
  Alert,
  BackHandler,
} from 'react-native';
import styles from './style.tsx';

import {Images} from '../../../components/index';
import Toast from 'react-native-simple-toast';
import {useDispatch, useSelector} from 'react-redux';
import * as userActions from '../../../actions/user-actions-types';
import ProgressLoader from 'rn-progress-loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import style from '../Messages/style';
import {
  TextField,
  CustomButton,
  CustomStatusBar,
  Validate,
  CustomHeader,
  BackBtn,
  HeaderTitleWithBack,
} from '../../../components';

interface ResetPasswordScreenProps {
  navigation: any;
  route: any;
}

const ReminderTitleScreen = (props: ResetPasswordScreenProps) => {
  console.log('props==>>>>', props);

  const {item} = props.route.params;

  function handleBackBut() {
    props.navigation.goBack();
    return true;
  }

  const renderIndicator = () => {
    return (
      <View style={{}}>
        <ProgressLoader
          visible={true}
          isModal={true}
          isHUD={true}
          //hudColor={"#ffffff00"}
          hudColor={'#4B2A6A'}
          style={{justifyContent: 'center', alignItems: 'center', flex: 1}}
          color={'white'}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <CustomStatusBar />
      <HeaderTitleWithBack
        navigation={props.navigation}
        headerTitle="Reminder Details"
      />

      <View
        style={{
          width: '100%',
          alignSelf: 'center',
          paddingHorizontal: 10,
          marginTop: 10,
        }}>
        <Image
          source={{uri: item.attachment}} //Change your icon image here
          style={{
            // padding: 10,
            marginTop: 10,
            width: '100%',
            alignSelf: 'center',
            //  marginLeft:20,
            // tintColor: '#4B2A6A',
            // height: 40,
            // width: 40,
            height: 220,
            borderRadius: 10,
            resizeMode: 'stretch',
            alignItems: 'center',
          }}
        />
      </View>
      <View style={{marginTop: 15, paddingHorizontal: 15, alignSelf: 'center'}}>
        <Text style={{fontSize: 16}}>{item.recived_time}</Text>
      </View>
      {/* <Image
        source={Images.attachment} //Change your icon image here
        style={{
          // padding: 10,
          marginTop: 15,
          width: 50,
          marginLeft: 15,
          //  marginLeft:20,
          // tintColor: '#4B2A6A',
          // height: 40,
          // width: 40,
          height: 50,

          resizeMode: 'stretch',
          alignItems: 'center',
        }}
      /> */}
      {/* <View style={{width: '80%', alignSelf: 'center', marginTop: 40}}>
        <CustomButton
          title={'Reply on Reminder'}
          // onPress={onPressLogin}
        />
      </View> */}
    </View>
  );
};
export default ReminderTitleScreen;
