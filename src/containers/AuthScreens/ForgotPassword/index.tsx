import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, Image, KeyboardAvoidingView, Dimensions } from 'react-native';
import styles from './style';
import { Images } from '../../../components/index';
import { TextField, CustomButton, CustomStatusBar, BackBtn, ModelComponent, Validate } from '../../../components';
import { useDispatch, useSelector } from 'react-redux';
import * as userActions from '../../../actions/user-actions-types';
import Toast from 'react-native-simple-toast';
import ProgressLoader from 'rn-progress-loader';
const screenWidth = Dimensions.get('window').width;

interface ForgotPasswordScreenProps { navigation: any }

const ForgotPassword = (props: ForgotPasswordScreenProps) => {
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);

  const dispatch = useDispatch();

  React.useEffect(() => {
    // console.log('rtyuigfghj', props)
  }, []);





  const getData = async () => {
 
    var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if (format.test(password)) {
      Toast.show('Email Sent Successfully',Toast.SHORT)
      props.navigation.navigate('LoginScreen', { 'mobile': password })

    } else {
      props.navigation.navigate('OtpForgot', { 'mobile': password })


    }

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

    const onPressForgot = async () => {

      var key = password.indexOf("@") != -1 ? 'email' : 'mobile'
      const emailError = Validate(key, password);
      // const passwordError = Validate("password", password);


      if (
        emailError
      ) {
        Toast.show(emailError, Toast.SHORT);

        return false;
      }

      else {
        const data = {
          "email_or_phone": password,
        }

        setLoading(true);

        dispatch(
          userActions.getAdminForgotPassword({
            data,
            callback: ({ result, error }) => {

              if (result.status === true) {
                console.warn(
                  'after on Press Forgot result',
                  JSON.stringify(result.status, undefined, 2),
                );
                getData()

                setLoading(false);
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
      }

    };
    return (
      <View style={styles.container}>
        <CustomStatusBar />
        {isLoading && renderIndicator()}
        <View style={styles.backbtnCss}><BackBtn navigation={props.navigation} /></View>
        {/* <ModelComponent isvisible={true} modeltype={'add_info'} /> */}

        <View style={styles.logoContainer}>

          <Image source={Images.inbox_img} style={styles.messagelogo} />
        </View>

        <View style={styles.enterTextConatiner}>
          <Text style={styles.enterText}>Enter your registered Mobile Number or Email Id to reset your password.</Text>
        </View>
        <View style={styles.inputContainer}>

          <View style={styles.inputmarginBottom}>
            <TextField placeholder={'Email Id or Mobile Number'} imageIcon={Images.emailormobile} onChangeText={val => setPassword(val)} value={password}

            />
          </View>

          <View>
            <CustomButton title={'Submit'}
              onPress={onPressForgot}
            // onPress={() => props.navigation.navigate('OtpForgot')}  
            />
          </View>


        </View>


      </View>
    );
  };

  export default ForgotPassword;

