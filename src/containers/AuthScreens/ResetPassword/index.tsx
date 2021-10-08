import React, { Component, FC, useState } from 'react';
import { Text, View, FlatList, Image, TouchableOpacity, Platform, ImageBackground, ScrollView, Alert, BackHandler } from 'react-native';
import styles from './styles';
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

interface ResetPasswordScreenProps {
  navigation: any;
}

const ResetPassword = (props: ResetPasswordScreenProps) => {

  const [oldPassword, setoldPassword] = useState('');
  const [newPassword, setnewPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [entry, setEntery] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [SecureTextEntryold, setSecureTextEntryold] = useState(true);
  const [SecureTextEntrynew, setSecureTextEntrynew] = useState(true);
  const [SecureTextEntryconfirm, setSecureTextEntryconfirm] = useState(true);


  const dispatch = useDispatch();

  React.useEffect(() => {
    //  console.log('rtyuigfghj', props)
    BackHandler.addEventListener('hardwareBackPress', handleBackBut);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackBut);
    };

  }, []);

  function handleBackBut() {
    props.navigation.goBack();
    return true;
  }
  const submit = async () => {
    const passwordError = Validate("old_password", oldPassword);
    // const newPasswordError = Validate("password", newPassword);
    const confirmPasswordError = Validate(
      "confirm_password",
      confirmPassword, newPassword
    );
    if (passwordError || confirmPasswordError) {
      Toast.show(passwordError || confirmPasswordError, Toast.SHORT);
      return false;
    }
    else {
      var token = '';
      try {
        const value = await AsyncStorage.getItem('tokenlogin');
        if (value !== null) {
          // value previously stored
          token = value;
        }
      } catch (e) {
        // error reading value
      }

      const data = {
        token: token,
        old_password: oldPassword,
        password: newPassword,
        confirm_password: confirmPassword
      }
      setLoading(true);
      dispatch(
        userActions.getResetPassword({
          data,
          callback: ({ result, error }) => {

            if (result.status === true) {
              console.warn(
                JSON.stringify(result.status, undefined, 2),

              );
              Toast.show(result.message, Toast.SHORT);
              setoldPassword(''),
                setnewPassword(''),
                setconfirmPassword('')
              setLoading(false);
            }
            if (result.status === false) {
              console.warn(JSON.stringify(error, undefined, 2));
              Toast.show(result.error.message[0], Toast.SHORT);
              setLoading(false);
            }
            else {
              setLoading(false);
              console.warn(JSON.stringify(error, undefined, 2));
            }
          },
        }),
      );
    }
  };



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
    <KeyboardAwareScrollView keyboardShouldPersistTaps={'always'}
      style={{ flex: 1 }}
      showsVerticalScrollIndicator={false}>

      <View style={styles.container}>
        <CustomStatusBar />

        <View style={{
          height: Platform.OS === 'ios' ? '10%' : '11%',
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
              }}>{'Change Password'}</Text>
            </View>


          </View>

        </View>

        {/* <CustomHeader Title={'Change Password'} Back={'true'} navigation={props.navigation} /> */}


        {isLoading && renderIndicator()}

        {/* <View style={styles.backbtnCss}><BackBtn navigation={props.navigation} /></View> */}

        <ScrollView>
          <View style={styles.inputContainer}>

            <View style={{ flex: 1 }}>

              <View style={{ marginTop: '30%' }}>
                <TextField
                  secureTextEntry={SecureTextEntryold}
                  onIconPress={() => {
                    setSecureTextEntryold(!SecureTextEntryold)
                  }}
                  imageIcon={SecureTextEntryold == true ? Images.eye_64 : Images.invisible_64}
                  placeholder="Enter Old Password"
                  onChangeText={val => setoldPassword(val)} value={oldPassword}
                />
              </View>
              <View style={{ marginTop: 20 }}>
                <TextField
                  secureTextEntry={SecureTextEntrynew}
                  onIconPress={() => {
                    setSecureTextEntrynew(!SecureTextEntrynew)
                  }}
                  imageIcon={SecureTextEntrynew == true ? Images.eye_64 : Images.invisible_64}
                  placeholder="Enter Password"
                  onChangeText={val => setnewPassword(val)} value={newPassword}
                />
              </View>
              <View style={{ marginTop: 20 }}>
                <TextField
                  secureTextEntry={SecureTextEntryconfirm}
                  onIconPress={() => {
                    setSecureTextEntryconfirm(!SecureTextEntryconfirm)
                  }}
                  imageIcon={SecureTextEntryconfirm == true ? Images.eye_64 : Images.invisible_64}
                  placeholder="Confirm Password"
                  onChangeText={val => setconfirmPassword(val)} value={confirmPassword}
                />
              </View>
            </View>
            <View style={{ marginTop: 30 }}>
              <CustomButton title="Submit" onPress={submit} />
            </View>
          </View>

        </ScrollView>
      </View>


    </KeyboardAwareScrollView>
  );
}
export default ResetPassword;