import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, Image, KeyboardAvoidingView, Dimensions, ScrollView, BackHandler, Alert } from 'react-native';
import styles from './style';
import { Images } from '../../../components/index';
import { TextField, CustomButton, CustomStatusBar, BackBtn, ModelComponent, CustomHeader } from '../../../components';
import {
  NavigationContainer,
  useIsFocused,
  DrawerActions,
} from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import * as userActions from '../../../actions/user-actions-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';

const screenWidth = Dimensions.get('window').width;

interface eKycSuccesscreenProps { navigation: any; route: any; }

const KYCEiRequestSingle = (props: eKycSuccesscreenProps) => {
  const [Aadhar, setAadhar] = useState('');
  const [Name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [schoolid, setSchoolID] = useState();


  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);


  function handleBackButtonClick() {
    Alert.alert(
      'ZatchUp',
      'Do you want to exit?',
      [
        { text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'Yes', onPress: () => BackHandler.exitApp() },
      ],
      { cancelable: false });
    return true;
  }

  // function handleBackButtonClick() {
  //     props.navigation.goBack();
  //     return true;
  //   }

  useEffect(() => {


    if(props.route.params.KYCEiRequestMultiple === true){
      getEidetailMulti(props.route.params.school_id);
    }
    else{
      getEidetail();

    }


    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  }, [isFocused]);



   /***************************User GET Logout View Status *******************************/

   const getLogoutView = async () => {


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
    };

    dispatch(
      userActions.getLogoutViewStatus({
        data,
        callback: ({ result, error }) => {
          if (result) {
            setLoading(false);

            console.warn(
              'after result Logout View Status',
              JSON.stringify(result, undefined, 2),
              //  getData_is_kyc_rejected(result),

              //  props.navigation.navigate('OtpLogin', { 'firebase_id': result.firebase_username, 'username': email })
            );
            props.navigation.navigate('CurrentSchoolinfo', { data: props.route.params.data, 're_verify': props.route.params.re_verify, 'schoolid':schoolid});

            // setSpinnerStart(false);
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



  const UserCourseDelete = async () => {

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
    };

    dispatch(
      userActions.getUserCourseDeleteNotConfirm({
        data,
        callback: ({ result, error }) => {
          if (result) {
            setLoading(false);

            console.warn(
              'after.....Delete>',
              JSON.stringify(result, undefined, 2),

            );
            getLogoutView();

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


  const Changestatus = async () => {

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
      is_sent_up:true,
      school_id: schoolid,
      status: "APPROVBYUSER"
    };


   // setLoading(true);

    dispatch(
      userActions.getChangestatusacceptedbyuser({
        data,
        callback: ({ result, error }) => {
          if (result.status === true) {
            setLoading(false);

            console.warn(
              'after Change status accepted by user..',
              JSON.stringify(result, undefined, 2),
            );
            UserCourseDelete();

          }

          else if (result.status === false) {

            //Toast.show('User is verified as student', Toast.SHORT);

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


  const Changestatusmulti = async () => {

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
      school_id: schoolid,
      status: "REJECTBYUSER"
    };


   // setLoading(true);

    dispatch(
      userActions.getChangestatusacceptedbyusermulti({
        data,
        callback: ({ result, error }) => {
          if (result.status === true) {
            setLoading(false);

            console.warn(
              'after Change status accepted by user..',
              JSON.stringify(result, undefined, 2),
            );
            if(props.route.params.length > 1){
              props.navigation.navigate('KYCEiRequestMultiple');

            }else{
              props.navigation.navigate('CurrentSchoolinfo', { data: props.route.params.data, 're_verify': props.route.params.re_verify })
            }
          //  UserCourseDelete();

          }

          else if (result.status === false) {

            //Toast.show('User is verified as student', Toast.SHORT);

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

  /***************************User Auth  User Info *******************************/

  const getEidetail = async () => {

    var token = '';
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        token = value;
      }
    } catch (e) {
    }

    const data = {
      token: token,
    };

    dispatch(
      userActions.getEidetailforalreadystudents({
        data,
        callback: ({ result, error }) => {
          if (result) {
            setLoading(false);
            console.warn(
              'after result ',
              JSON.stringify(result, undefined, 2),

            );
            setMessage(result.data.message);
            setSchoolID(result.data.school_id);
          }
          if (!error) {
            console.warn(JSON.stringify(error, undefined, 2));
            setLoading(false);


          } else {
            setLoading(false);
            console.warn(JSON.stringify(error, undefined, 2));
          }
        },
      }),
    );
  };


   /***************************User Auth  User Info *******************************/

   const getEidetailMulti = async (school_id) => {

    var token = '';
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        token = value;
      }
    } catch (e) {
    }

    const data = {
      token: token,
      school_id:school_id

    };

    dispatch(
      userActions.getEidetailforalreadystudentsmulti({
        data,
        callback: ({ result, error }) => {
          if (result) {
            setLoading(false);
            console.warn(
              'after result ',
              JSON.stringify(result, undefined, 2),

            );
            setMessage(result.data.message);
            setSchoolID(result.data.school_id);
          }
          if (!error) {
            console.warn(JSON.stringify(error, undefined, 2));
            setLoading(false);


          } else {
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

      <CustomHeader Title={'Welcome to ZatchUp'} />


      {/*   <View style={styles.backbtnCss}><BackBtn navigation={this.props.navigation} /></View> */}

      <ScrollView>

        <View style={styles.inputContainer}>



          {/* <View style={styles.enterTextConatiner}>
                        <Text style={styles.enterText}>Welcome to ZatchUp</Text>
                    </View> */}

          <View style={styles.enterTextConatiner}>
            <Text style={styles.enterText_}>{message + '.' + ' ' + 'If it is true, please click Add This School to your profile, if is not you, please click Not My School' }</Text>
          </View>


          <View style={{ marginTop: '20%', marginRight: 50, marginLeft: 50, }}>
            <CustomButton backgroundColor={'green'} title={'Add This School to your profile'}  onPress={() => Changestatus()} />
          </View>


         {props.route.params.KYCEiRequestMultiple === true ? <View style={{ marginTop: 20, marginRight: 80, marginLeft: 80 }}>
            <CustomButton backgroundColor={'none'} textColor={'red'} title={'Not My School'} onPress={() => Changestatusmulti()} />
          </View>:<View style={{ marginTop: 20, marginRight: 80, marginLeft: 80 }}>
            <CustomButton backgroundColor={'none'} textColor={'red'} title={'Not My School'} onPress={() => { props.navigation.navigate('CurrentSchoolinfo', { data: props.route.params.data, 're_verify': props.route.params.re_verify }) }} />
          </View>}

          
        </View>


      </ScrollView>
    </View>
  );
};

export default KYCEiRequestSingle;