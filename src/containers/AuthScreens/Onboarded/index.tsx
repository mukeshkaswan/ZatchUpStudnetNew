import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, Image, KeyboardAvoidingView, Dimensions, ScrollView, Alert, BackHandler } from 'react-native';
import styles from './style';
import { Images } from '../../../components/index';
import { TextField, CustomButton, CustomStatusBar, BackBtn, ModelComponent, CustomHeader, CustomDropdown } from '../../../components';
import { useDispatch, useSelector } from 'react-redux';
import * as userActions from '../../../actions/user-actions-types';
import Toast from 'react-native-simple-toast';
import ProgressLoader from 'rn-progress-loader';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenWidth = Dimensions.get('window').width;

interface OnboardedScreenProps { navigation: any, route: any }

const Onboarded = (props: OnboardedScreenProps) => {
  const [Aadhar, setAadhar] = useState('');
  const [Name, setName] = useState('');
  const [selectedSchool, setselectedSchool] = useState('');

  const dispatch = useDispatch();



  useEffect(() => {

    getAuthUserInfoApi()

    // console.log('idddddd',props.route.parmas.opening_da);

    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };

  }, []);



  function handleBackButtonClick() {
    props.navigation.goBack();
    return true;
  }

  /***************************User Auth  User Info *******************************/

  const getAuthUserInfoApi = async () => {

    var token = '';
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        // value previously stored
        token = value;
      }
    } catch (e) {
      // error reading value
    }

    const data = {
      token: token,
    }

    dispatch(
      userActions.getAuthUserInfo({
        data,
        callback: ({ result, error }) => {
          if (result) {
            console.warn(
              'after result Auth User INfo',
              JSON.stringify(result, undefined, 2),

              //  props.navigation.navigate('OtpLogin', { 'firebase_id': result.firebase_username, 'username': email })
            );
            // setSpinnerStart(false);
            //  setLoading(false);
          }
          if (!error) {
            console.warn(JSON.stringify(error, undefined, 2));
            // setLoginSuccess(result);
            //  setLoading(false);
            //console.log('dfdfdf--------', error)
            // Toast.show('Invalid credentials', Toast.SHORT);

            // Alert.alert(error.message[0])

            // signOut();
          } else {
            // setError(true);
            // signOut();
            // Alert.alert(result.status)
            // Toast.show('Invalid credentials', Toast.SHORT);
            //   setLoading(false);
            console.warn(JSON.stringify(error, undefined, 2));
          }
        },
      }),
    );
  }
  /***************************User getStepCountAPi *******************************/


  const getStepCountAPi = async () => {
    var token = '';
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        // value previously stored
        token = value;
      }
    } catch (e) {
      // error reading value
    }

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

              //  props.navigation.navigate('OtpLogin', { 'firebase_id': result.firebase_username, 'username': email })
            );
            // setSpinnerStart(false);
            // setLoading(false);
          }
          if (!error) {
            console.warn(JSON.stringify(error, undefined, 2));
            // setLoginSuccess(result);
            // setLoading(false);
            //console.log('dfdfdf--------', error)
            // Toast.show('Invalid credentials', Toast.SHORT);

            // Alert.alert(error.message[0])

            // signOut();
          } else {
            // setError(true);
            // signOut();
            // Alert.alert(result.status)
            // Toast.show('Invalid credentials', Toast.SHORT);
            // setLoading(false);
            console.warn(JSON.stringify(error, undefined, 2));
          }
        },
      }),
    );
  }
  return (
    <View style={styles.container}>

      <CustomStatusBar />

      <CustomHeader Title={'Onboarded'} />

      {/*   <View style={styles.backbtnCss}><BackBtn navigation={this.props.navigation} /></View> */}

      <ScrollView>

        <View style={styles.inputContainer}>


          <View style={styles.logoContainer}>

            <Image source={Images.blue_tick} style={styles.messagelogo} />
          </View>

          <View style={styles.enterTextConatiner}>
            <Text style={styles.enterText}>Congratulations!</Text>
          </View>


          <View style={styles.enterTextConatiner}>
            <Text style={styles.enterText_copy}>Your school is Onboarded on ZatchUp.</Text>
          </View>


          <View>
            {/* <CustomButton title={'Confirm'} onPress={() => props.navigation.navigate('EducationProfile')} /> */}
            <CustomButton title={'Confirm'} onPress={() => { props.route.params.data === true ? props.navigation.navigate('EducationProfile', { 'school_id': props.route.params.school_id, 'nameofschool': props.route.params.nameofschool, 'school_zatchup_id': props.route.params.school_zatchup_id, 'state': props.route.params.state, 'city': props.route.params.city, 'address': props.route.params.address, 'board': props.route.params.board }) : props.navigation.navigate('AlumniNo', { 'school_id': props.route.params.school_id, 'nameofschool': props.route.params.nameofschool, 'school_zatchup_id': props.route.params.school_zatchup_id, 'state': props.route.params.state, 'city': props.route.params.city, 'address': props.route.params.address, 'board': props.route.params.board}) }} />

          </View>
        </View>


      </ScrollView>
    </View>
  );
};

export default Onboarded;
