import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Dimensions,
  Alert,
  ActivityIndicator,
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
import ProgressLoader from 'rn-progress-loader';
import {
  NavigationContainer,
  useIsFocused,
  DrawerActions,
} from '@react-navigation/native';
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

  React.useEffect(() => {
    // console.log('rtyuigfghj', props)
    setEmail('');
    setPassword('');
  }, [isFocused]);

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

  const onPressLogin = async () => {
    //  console.log(1 < 2 < 3);
    //  console.log(3 > 2 > 1);
    //   for(let i = 0; i < 4; i++) {
    //     setTimeout(function() {
    //        console.log(i);
    //     }, i * 1000);
    //  }

    var key = email.indexOf('@') != -1 ? 'email' : 'mobile';
    const emailError = Validate(key, email);
    const passwordError = Validate('password', password);

    if (emailError || passwordError) {
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
          callback: ({result, error}) => {
            if (result.status === 'True') {
              // console.warn(
              //   'after login result',
              //   JSON.stringify(result.status, undefined, 2),

              // );
              setLoading(false);
              //return;
              props.navigation.navigate('OtpLogin', {
                firebase_id: result.firebase_username,
                username: email,
              });
            }
            if (result.status === false) {
              console.warn(JSON.stringify(error, undefined, 2));
              setLoading(false);
              Toast.show(result.error.message[0], Toast.SHORT);
            } else {
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

      <View style={{flex: 1}}>
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
                //onPress={() => props.navigation.navigate('Home')}
              />
            </View>
          </KeyboardAvoidingView>

          <View style={styles.forgotPassword}>
            <Text
              style={styles.forgotPasswordText}
              onPress={() => props.navigation.navigate('ForgotPassword')}>
              Forgot Password ?
            </Text>
          </View>
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
