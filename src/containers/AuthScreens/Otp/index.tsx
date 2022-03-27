import React, { useState, useEffect, } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import styles from './style';
import { Images } from '../../../components/index';
import OtpInputs from 'react-native-otp-inputs';
import {
  TextField,
  CustomButton,
  CustomStatusBar,
  BackBtn,
  Validate
} from '../../../components';

import { useDispatch, useSelector } from 'react-redux';
import * as userActions from '../../../actions/user-actions-types';
import Toast from 'react-native-simple-toast';
import ProgressLoader from 'rn-progress-loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  NavigationContainer,
  useIsFocused,
  useFocusEffect,
} from '@react-navigation/native';
const screenWidth = Dimensions.get('window').width;

interface OtpScreenProps {
  navigation: any;
  route: any;
}

const Otp = (props: OtpScreenProps) => {
  const [isLoading, setLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const [key, setKey] = useState('');

  const isFocused = useIsFocused();

  const dispatch = useDispatch();

  const renderIndicator = () => {
    return (
      <View style={{}}>
        <ProgressLoader
          visible={true}
          isModal={true}
          isHUD={true}
          //hudColor={"#ffffff00"}
          hudColor={'#4B2A6A'}
          style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
          color={'white'}
        />
      </View>
    );
  };

  useEffect(() => {

    var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (format.test(props.route.params.username)) {
      setKey('Email');
    } else {
      setKey('Phone');

    }
  }, [isFocused]);


  // const Validate = () => {
  //   if (otp === '') {
  //     Toast.show('Please enter a valid Otp', Toast.SHORT);
  //   }
  // };




  const _storeData = async (data) => {

    console.log('token', data.token)
    try {
      await AsyncStorage.setItem('token', data.token);

    } catch (e) {
      // saving error
    }
  };


  const onPressResendOtp = () => {
    //Validate();


    const data = {
      username: props.route.params.username,
    };

    setLoading(true);

    dispatch(
      userActions.getResendotp({
        data,
        callback: ({ result, error }) => {
          if (result.status === true) {
            // console.warn(
            //   'after otp Re Send result',
            //   JSON.stringify(result, undefined, 2),

            //   // props.navigation.navigate('eKYC')
            //   // props.navigation.navigate('eKYC'),
            // );
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
    //Validate();

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
        username: props.route.params.username,
        verify_otp_no: otp,
      };

      setLoading(true);

      dispatch(
        userActions.registerOtpSuccess({
          data,
          callback: ({ result, error }) => {
            if (result.status === true) {
              console.warn(
                'after otp register result',
                JSON.stringify(result, undefined, 2),
                // props.navigation.navigate('eKYC')

                props.navigation.navigate('eKYC', { 'signup': 'signup', 'is_kyc_rejected': '', 'reg_step': '', 'Editdobsignup': true }),
              );
              // setSpinnerStart(false);
              _storeData(result);

              setLoading(false);
            }

            if (result.status === false) {
              //console.warn(JSON.stringify(error, undefined, 2));
              // setLoginSuccess(result);
              Toast.show('OTP is Not Valid', Toast.SHORT)
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
    }
  };


  const onPressOtpSkip = () => {

    const data = {
      username: props.route.params.username,
      firebase_id: props.route.params.firebase_id,
    };

    setLoading(true);

    dispatch(
      userActions.otpSuccessSkip({
        data,
        callback: ({ result, error }) => {
          if (result.status === 'True') {
            console.warn(
              'after otp register result',
              JSON.stringify(result, undefined, 2),
              // props.navigation.navigate('eKYC')

              props.navigation.navigate('eKYC', { 'signup': 'signup', 'is_kyc_rejected': '', 'reg_step': '', 'Editdobsignup': true }),
            );
            // setSpinnerStart(false);
            _storeData(result);

            setLoading(false);
          }

          if (result.status === 'False') {
            //console.warn(JSON.stringify(error, undefined, 2));
            // setLoginSuccess(result);
            Toast.show('OTP is Not Valid', Toast.SHORT)
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
  return (
    <View style={styles.container}>
      <CustomStatusBar />
      {isLoading && renderIndicator()}
      <View style={styles.backbtnCss}>
        <BackBtn navigation={props.navigation} />
      </View>

      <View style={styles.logoContainer}>
        <Image source={Images.message_icon} style={styles.messagelogo} />
      </View>
      {/* <View style={styles.enterTextConatiner}>
        <Text style={styles.enterText}>Two Step Log-In</Text>
      </View> */}
      <View style={styles.enterTextConatiner}>
        {key == 'Email' ? <Text style={styles.enterText}>
          {'Enter the OTP received on your email id.'}
        </Text>:<Text style={styles.enterText}>
          {'Enter the OTP received on your phone number.'}
        </Text>}
      </View>
      <View style={{ paddingHorizontal: '9%', marginVertical: '15%' }}>
        <OtpInputs
          inputContainerStyles={styles.OtpinputContainer}
          inputStyles={styles.otpinput}
          handleChange={val => setOtp(val)}
          numberOfInputs={4}
          focusStyles={{ borderWidth: 2, borderColor: '#4B2A6A' }}


        />
      </View>
      <View style={styles.inputContainer}>
        <View>
          <CustomButton
            title={'Submit'}
            onPress={onPressOtp}
          // onPress={() => props.navigation.navigate('eKYC')}
          />
        </View>

        {/* <View style={styles.Skip}>
          <Text style={styles.skipText} onPress={onPressOtpSkip}>
            Skip
          </Text>
        </View> */}
        <View style={styles.OtpResendContainer}>
          <Text
            style={styles.resendText}
            onPress={onPressResendOtp}
          >
            Resend Code
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Otp;
