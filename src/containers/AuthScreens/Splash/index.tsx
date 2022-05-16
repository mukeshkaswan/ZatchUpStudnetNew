import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Dimensions,
  Alert,
  ActivityIndicator,
  ImageBackground,
  StatusBar,
} from 'react-native';
import styles from './style';
import {Images} from '../../../components/index';
import {
  TextField,
  CustomButton,
  CustomStatusBar,
  Validate,
} from '../../../components';
import {useDispatch, useSelector} from 'react-redux';
import * as userActions from '../../../actions/user-actions-types';
import Toast from 'react-native-simple-toast';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
const screenWidth = Dimensions.get('window').width;

interface SplashScProps {
  navigation: any;
}
const SplashSc = (props: SplashScProps) => {
  React.useEffect(() => {
    SplashScreen.hide();

    navigate();

    // console.log('rtyuigfghj', props)
  }, []);

  const navigate = async () => {
    const dataSetTimeOut = setTimeout(async () => {
      const value = await AsyncStorage.getItem('Loginflag');

      if (value == 'true') {
        // props.navigation.replace(
        //     'MySchoolScreen'
        // )
        props.navigation.replace('CoomingSoon');
      } else {
        props.navigation.replace('LoginScreen');
      }

      return () => {
        dataSetTimeOut.clear();
      };
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />

      <View style={{flex: 1}}>
        <ImageBackground
          source={Images.Splash}
          style={styles.imagess}></ImageBackground>
      </View>
    </View>
  );
};

export default SplashSc;
