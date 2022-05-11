import React, { useState, useEffect, useRef } from 'react';
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
  BackHandler
} from 'react-native';
import styles from './style';
import { Images } from '../../../components/index';
import {
  TextField,
  CustomButton,
  CustomStatusBar,
  Validate,
} from '../../../components';
import { useDispatch, useSelector } from 'react-redux';
import * as userActions from '../../../actions/user-actions-types';
import Toast from 'react-native-simple-toast';
import ProgressLoader from 'rn-progress-loader';
import {
  NavigationContainer,
  useIsFocused,
  DrawerActions,
  useFocusEffect
} from '@react-navigation/native';
import auth from '@react-native-firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenWidth = Dimensions.get('window').width;

interface LoginScreenProps {
  navigation: any;
}
const LoginScreen = (props: LoginScreenProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [entry, setEntery] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [SecureTextEntry, setSecureTextEntry] = useState(true);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [flag, setFlag] = useState(false);

  React.useEffect(() => {
    // console.log('rtyuigfghj', props)
    setEmail('');
    setPassword('');
    setFlag(false);
    //Clear();
  }, [isFocused]);

  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);

      return () =>
        BackHandler.removeEventListener(
          'hardwareBackPress',
          handleBackButtonClick,
        );
    }, []),
  );

  const handleBackButtonClick = () => {
    Alert.alert(
      'ZatchUp',
      'Do you want to exit?',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'Yes', onPress: BackHandler.exitApp },
      ],
      { cancelable: false },
    );
    return true;
  };
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


  // const Clear = async () => {

  //   await AsyncStorage.removeItem('tokenlogin')

  // }

  const onNaviagte = async (result, user) => {

    // console.log('result123', result);

    if (result.two_factor_authentication === 'False') {

      onPressOtp(user);
    }
    else {

      props.navigation.navigate('OtpLogin', {
        firebase_id: user._user.uid,
        username: email,
        firebase: user._user.uid,
      });
    }


  }


  const onPressOtp = (user) => {


    const data = {
      firebase_id: user._user.uid,
      username: email,
    };

    // setLoading(true);

    dispatch(
      userActions.otpSuccessSkip({
        data,
        callback: ({ result, error }) => {
          if (result.status === 'True') {
            console.warn(
              'after otp result 1',
              // JSON.stringify(result, undefined, 2),
              // props.navigation.navigate('Home'),
            );
            Toast.show('Login Successfully', Toast.SHORT)

            getData(result),

              //setSpinnerStart(false);
              setLoading(false);
          }
          if (result.status === 'False') {
            //console.warn(JSON.stringify(error, undefined, 2));
            // setLoginSuccess(result);
            Toast.show(result.error, Toast.SHORT);
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

  };


  const getData = async result => {
    // console.log('tokenlogin', result.token)
    try {
      await AsyncStorage.setItem('tokenlogin', result.token);
      await AsyncStorage.setItem('token', result.token);
      await AsyncStorage.setItem('username', result.first_name + ' ' + result.last_name);

      // await AsyncStorage.setItem('dob', date_copy);
    } catch (e) {
      // saving error
    }
    UserCourseDelete(result.token);
    getLogoutView(result.token);
    getStepCountAPi(result.token);
  };


  const getData_is_kyc_rejected = async result => {
    // console.log('step 3')
    if (result.reg_step == 1) {
      if (result.is_kyc_rejected === true) {
        props.navigation.navigate('eKYC', { 'is_kyc_rejected': result.is_kyc_rejected, 'reg_step': result.reg_step, 'signup': '', 'Editdobsignup': true });
      } else {
        props.navigation.navigate('eKYC', { 'Editdobsignup': true });
      }
    } else if (result.reg_step == 2) {
      if (result.is_kyc_rejected === true) {
        props.navigation.navigate('eKYC', { 'is_kyc_rejected': result.is_kyc_rejected, 'reg_step': result.reg_step, 'signup': '', 'Editdobsignup': true });
      } else {
        props.navigation.navigate('SelectStudent', { 're_verify': false, 'ei_request_count': 0 });
      }
    } else if (result.reg_step == 4) {
      if (result.is_kyc_rejected === true) {
        props.navigation.navigate('eKYC', { 'is_kyc_rejected': result.is_kyc_rejected, 'reg_step': result.reg_step, 'signup': '', 'Editdobsignup': true });
      } else {
        props.navigation.navigate('SelectStudent', { 're_verify': false, 'ei_request_count': 0 });
      }
    } else if (result.reg_step == 6) {
      if (result.is_kyc_rejected === true) {
        props.navigation.navigate('eKYC', { 'is_kyc_rejected': result.is_kyc_rejected, 'reg_step': result.reg_step, 'signup': '', 'Editdobsignup': true });
      } else {
        props.navigation.navigate('Personalinfo');
      }
    } else if (result.reg_step == 7) {
      if (result.is_kyc_rejected === true) {
        props.navigation.navigate('eKYC', { 'is_kyc_rejected': result.is_kyc_rejected, 'reg_step': result.reg_step, 'signup': '', 'Editdobsignup': true });
      } else {

        // Toast.show('Login Successfully', Toast.SHORT)
        // props.navigation.navigate('MySchoolScreen')
        // props.navigation.navigate('Home')
        await AsyncStorage.setItem('Loginflag', 'true');
        props.navigation.navigate('MySchoolScreen')
        //props.navigation.navigate('Comming')

      }
    } else if (result.reg_step == 5) {
      if (result.is_kyc_rejected === true) {
        props.navigation.navigate('eKYC', { 'is_kyc_rejected': result.is_kyc_rejected, 'reg_step': result.reg_step, 'signup': '', 'Editdobsignup': true });
      } else {
        // props.navigation.navigate('Personalinfo');

        props.navigation.navigate('SelectStudent', { 're_verify': false, 'ei_request_count': 0 });

      }
    } else {
      // console.log('step_4', '4')
      props.navigation.navigate('SelectStudent', { 're_verify': false, 'ei_request_count': 0 });
    }
  };


  /***************************User getStepCountAPi *******************************/

  const getStepCountAPi = async token => {
    const data = {
      token: token,
    };

    dispatch(
      userActions.getRegStepCount({
        data,
        callback: ({ result, error }) => {
          if (result) {
            console.warn(
              'after result step count 2',
              JSON.stringify(result, undefined, 2),
              getData_is_kyc_rejected(result),

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
  };



  /***************************User GET Logout View Status *******************************/

  const getLogoutView = async token => {
    const data = {
      token: token,
    };

    dispatch(
      userActions.getLogoutViewStatus({
        data,
        callback: ({ result, error }) => {
          if (result) {
            console.warn(
              'after result Logout View Status',
              JSON.stringify(result, undefined, 2),
              //  getData_is_kyc_rejected(result),

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
  };


  const UserCourseDelete = async token => {

    const data = {
      token: token,
    };

    dispatch(
      userActions.getUserCourseDeleteNotConfirm({
        data,
        callback: ({ result, error }) => {
          if (result) {
            // console.warn(
            //   'after.....>',
            //   JSON.stringify(result, undefined, 2),

            //   //  props.navigation.navigate('OtpLogin', { 'firebase_id': result.firebase_username, 'username': email })
            // );
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



  const onPressLogin = async () => {
    setFlag(true);

    var key = email.indexOf('@') != -1 ? 'email' : 'mobile';
    const emailError = Validate(key, email);
    const passwordError = Validate('password_', password);

    if (emailError || passwordError) {
      setFlag(false);
      Toast.show(emailError || passwordError, Toast.SHORT);

      return false;
    } else {
      const data = {
        username: email,
        password: password,
      };

      setLoading(true);

      dispatch(
        userActions.emailLogin({
          data,
          callback: ({ result, error }) => {
            if (result.status) {

              // console.warn(
              //   'after login result',
              //   JSON.stringify(result.status, undefined, 2),

              // );


              auth()
                .signInWithEmailAndPassword(
                  result.firebase_username + '@zatchup.com',
                  password,
                )
                .then(({ user }) => {

                  // console.log('FirebaseUSerLogin===>>>', user);
                  onNaviagte(result, user);

                  // props.navigation.navigate('OtpLogin', {
                  //   firebase_id: user._user.uid,
                  //   username: email,
                  //   firebase: user._user.uid,
                  // });

                })

                // .catch((error) => {
                //   setLoading(false);
                //   setFlag(false);

                //   if (error.code === 'auth/email-already-in-use') {
                //   }

                //   if (error.code === 'auth/invalid-email') {
                //   }

                //   console.error(error);
                //   //   Toast.show(error, Toast.SHORT);

                // });

                .catch(function (error) {
                  // Handle Errors here.
                  var errorCode = error.code;
                  var errorMessage = error.message;
                  console.log('User did not sign up correctly');
                  console.log(errorCode);
                  console.log(errorMessage);
                  console.error(error);
                  setLoading(false);
                  setFlag(false);

                });
              //return;
              setLoading(false);
              setFlag(false);


              // props.navigation.navigate('OtpLogin', {
              //   firebase_id: result.firebase_username,
              //   username: email,
              // });
            }
            if (result.status === false) {
              console.warn(JSON.stringify(error, undefined, 2));
              setLoading(false);
              setFlag(false);
              Toast.show(result.error.message[0], Toast.SHORT);
            } else {
              setFlag(false);

              setLoading(false);
              console.warn(JSON.stringify(error, undefined, 2));
            }
          },
        }),
      );
      // }
    }
  };
  return (
    <View style={styles.container}>
      <CustomStatusBar />
      {isLoading && renderIndicator()}

      <View style={{ flex: 1 }}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={Images.logo} />
        </View>
        <View style={styles.inputContainer}>
          <KeyboardAvoidingView behavior="padding">
            <View style={styles.inputmarginBottom}>
              <TextField
                placeholder={'Email Id or Mobile Number'}
                imageIcon={Images.emailormobile}
                onChangeText={val => setEmail(val)}
                keyboardType={'email-address'}
                value={email}
              />
            </View>

            <View style={styles.inputmarginBottom}>
              <TextField
                placeholder={'Enter Password'}
                secureTextEntry={SecureTextEntry}
                onIconPress={() => {
                  setSecureTextEntry(!SecureTextEntry);
                }}
                imageIcon={
                  SecureTextEntry == true ? Images.eye_64 : Images.invisible_64
                }
                onChangeText={val => setPassword(val)}
                value={password}
              />
            </View>

            <View>
              <CustomButton
                title={'Sign In'}
                onPress={onPressLogin}
                disabled={flag}

              // onPress={() => onPressLogin()}

              //onPress={() => props.navigation.navigate('Home')}
              />
            </View>
          </KeyboardAvoidingView>

          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 50, marginRight: 50
            }}
            onPress={() => props.navigation.navigate('ForgotPassword')}>
            <Text
              style={styles.forgotPasswordText}
            >
              Forgot Password ?
            </Text>

          </TouchableOpacity>

        </View>

        <View style={styles.bottomText}>
          <Text style={styles.dontAccountText}>
            Don’t have an account?
            <Text
              style={styles.signupText}
              onPress={() => props.navigation.navigate('SignUpScreen')}>
              {/* CurrentSchoolinfo EducationProfile */} Sign Up
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
