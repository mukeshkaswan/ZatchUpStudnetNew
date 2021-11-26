import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, KeyboardAvoidingView, Dimensions } from 'react-native';
import styles from './style';
import { Images } from '../../../components/index';
import OtpInputs from 'react-native-otp-inputs';
import { TextField, CustomButton, CustomStatusBar, BackBtn, Validate } from '../../../components';
import { useDispatch, useSelector } from 'react-redux';
import * as userActions from '../../../actions/user-actions-types';
import Toast from 'react-native-simple-toast';
import ProgressLoader from 'rn-progress-loader';
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenWidth = Dimensions.get('window').width;

interface OtpLoginScreenProps { navigation: any, route: any }

const OtpLogin = (props: OtpLoginScreenProps) => {
  const [isLoading, setLoading] = useState(false);
  const [otp, setOtp] = useState('');

  const dispatch = useDispatch();

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


  const getData_is_kyc_rejected = async (result) => {

    if (result.reg_step == '1') {

      if (result.is_kyc_rejected === true) {
        props.navigation.navigate('eKYC')
      } else {
        props.navigation.navigate('eKYC')
      }

    } else if (result.reg_step == '2') {
      if (result.is_kyc_rejected === true) {
        props.navigation.navigate('eKYC')
      } else {
        props.navigation.navigate('SelectStudent')

      }
    }
    else if (result.reg_step == '4') {
      if (result.is_kyc_rejected === true) {
        props.navigation.navigate('eKYC')
      } else {
        props.navigation.navigate('SelectStudent')

      }
    }
    else if (result.reg_step == '6') {
      if (result.is_kyc_rejected === true) {
        props.navigation.navigate('eKYC')
      } else {
        props.navigation.navigate('Personalinfo')

      }
    }
    else if (result.reg_step == '7') {
      if (result.is_kyc_rejected === true) {
        props.navigation.navigate('eKYC')
      } else {
        Toast.show('Login Successfully', Toast.SHORT)
        props.navigation.navigate('MySchoolScreen')

      }
    }

    else if (result.reg_step == '5') {
      if (result.is_kyc_rejected === true) {
        props.navigation.navigate('eKYC')
      } else {
        props.navigation.navigate('Personalinfo')

      }
    }
    else {
      // console.log('step_4', '4')
      props.navigation.navigate('SelectStudent')

    }

  }



  const getData = async (result) => {

   // console.log('tokenlogin', result.token)
    try {
      await AsyncStorage.setItem('tokenlogin', result.token);

    } catch (e) {
      // saving error
    }

    getStepCountAPi(result.token)

  }


  /***************************User getStepCountAPi *******************************/


  const getStepCountAPi = async (token) => {



    const data = {
      token: token,
    }

    dispatch(
      userActions.getRegStepCount({
        data,
        callback: ({ result, error }) => {
          if (result) {
            console.warn(
              'after result step count',
              JSON.stringify(result, undefined, 2),
              getData_is_kyc_rejected(result)

              //  props.navigation.navigate('OtpLogin', { 'firebase_id': result.firebase_username, 'username': email })
            );
            // setSpinnerStart(false);
            setLoading(false);
          }
          if (!error) {
            console.warn(JSON.stringify(error, undefined, 2));
            // setLoginSuccess(result);
            setLoading(false);
            //console.log('dfdfdf--------', error)
            // Toast.show('Invalid credentials', Toast.SHORT);

            // Alert.alert(error.message[0])

            // signOut();
          } else {
            // setError(true);
            // signOut();
            // Alert.alert(result.status)
            // Toast.show('Invalid credentials', Toast.SHORT);
            setLoading(false);
            console.warn(JSON.stringify(error, undefined, 2));
          }
        },
      }),
    );
  }

  const onPressResendOtp = () => {
    const data = {
      username: props.route.params.username,
    };

    setLoading(true);

    dispatch(
      userActions.getResendotp({
        data,
        callback: ({ result, error }) => {
          if (result.status === true) {
            console.warn(
              'after otp Re Send result',
              JSON.stringify(result, undefined, 2),

            );
            Toast.show(result.message, Toast.SHORT)
            // setSpinnerStart(false);
            setLoading(false);
          }

          if (!error) {
            console.warn(JSON.stringify(error, undefined, 2));
            // setLoginSuccess(result);
            setLoading(false);

            // signOut();
          } else {
            // setError(true);
            // signOut();
            setLoading(false);
            console.warn(JSON.stringify(error, undefined, 2));
          }
        },
      }),
    );

  };

  const onPressOtp = () => {

    // Validate()

    const otpError = Validate("otp", otp);

    if (
      otpError
    ) {
      //this._scrollView.scrollTo(0);
      Toast.show(otpError, Toast.SHORT);

      return false;
    }

    else {

      const data = {
        "firebase_id": props.route.params.firebase_id,
        "phone_otp": otp,
        "username": props.route.params.username
      }

      setLoading(true);

      dispatch(
        userActions.otpSuccess({
          data,
          callback: ({ result, error }) => {

            if (result.status === 'True') {
              console.warn(
                'after otp result',
                JSON.stringify(result, undefined, 2),
                getData(result)
                //props.navigation.navigate('Home')
              );
              // setSpinnerStart(false);
              setLoading(false);
            }
            if (result.status === 'False') {
              //console.warn(JSON.stringify(error, undefined, 2));
              // setLoginSuccess(result);
              Toast.show(result.error, Toast.SHORT)
              setLoading(false);


              // signOut();
            }

            // if (!error) {
            //   console.warn(JSON.stringify(error, undefined, 2));
            //   // setLoginSuccess(result);
            //   //Toast.show('Invalid Otp', Toast.SHORT);

            //   setLoading(false);

            //   // signOut();
            // }
            else {
              // setError(true);
              // signOut();
              //   Toast.show('Invalid Otp', Toast.SHORT);

              setLoading(false);
              console.warn(JSON.stringify(error, undefined, 2));
            }
          },
        }),
      );
    }
  };
  return (
    <View style={styles.container}>
      <CustomStatusBar />
      {isLoading && renderIndicator()}

      <View style={styles.backbtnCss}><BackBtn navigation={props.navigation} /></View>

      <View style={styles.logoContainer}>
        
        <Image source={Images.message_icon} style={styles.messagelogo} />
      </View>
      {/* <View style={styles.enterTextConatiner}>
        <Text style={styles.enterText}>Two Step Log-In</Text>
      </View> */}
      <View style={styles.enterTextConatiner}>
        <Text style={styles.enterText}> {'Enter OTP Send On Your' + " " + props.route.params.username + "."}</Text>
      </View>
      <View style={{ paddingHorizontal: '9%', marginVertical: '15%' }}>
        <OtpInputs
          inputContainerStyles={styles.OtpinputContainer}
          inputStyles={styles.otpinput}
          handleChange={val => setOtp(val)}
          numberOfInputs={4}

        // value={otp}
        />
      </View>
      <View style={styles.inputContainer}>

        <View>
          <CustomButton title={'Submit'}
            onPress={onPressOtp}
          // onPress={() => props.navigation.navigate('Home')}
          />
        </View>
        <View style={styles.OtpResendContainer}>
          <Text style={styles.resendText}
            onPress={onPressResendOtp}
          >Resend Code</Text>
        </View>

      </View>


    </View>
  );
};

export default OtpLogin;

