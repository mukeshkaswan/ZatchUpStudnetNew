import React, { useState, useEffect } from 'react';
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
  BackHandler,
  ImageBackground,
  FlatList,
  Platform,
} from 'react-native';
import styles from './style';
import { Images } from '../../../components/index';
import { TextField, CustomButton, CustomStatusBar } from '../../../components';
import { useDispatch, useSelector } from 'react-redux';
import * as userActions from '../../../actions/user-actions-types';
import Toast from 'react-native-simple-toast';
import {
  NavigationContainer,
  useIsFocused,
  DrawerActions,
  useFocusEffect
} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const screenWidth = Dimensions.get('window').width;

interface HomeScreenProps {
  navigation: any;
}
const MySchool = (props: HomeScreenProps) => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const [unreadnotificationcount, set_unread_notification_count] = useState('');
  const [unreadremindercount, set_unread_reminder_count] = useState('');
  const [roletype, setRole] = useState('');
  const [is_kyc_approved, setIs_kyc_approved] = useState();
  const [is_approved, setis_approved] = useState();
  const isFocused = useIsFocused();
  const [userid, setUserid] = useState(false);

  const backPressed = () => {
    props.navigation.goBack(null);
    return true;
  };


  const onBurgerBarPress = () => {
    props.navigation.dispatch(DrawerActions.toggleDrawer());
  };


  // useEffect(() => {


  //   const dataSetTimeOut = setTimeout(() => {

  //     getStepCountAPi();

  //     return () => {
  //       dataSetTimeOut.clear();
  //     }
  //   }, 500);


  // }, [isFocused]);


  useFocusEffect(

    
    React.useCallback(() => {
      const dataSetTimeOut = setTimeout(() => {

        getAuthUserInfoApi();
  
        getStepCountAPi();
  
        UserCourseDelete();
  
  
        return () => {
          dataSetTimeOut.clear();
        }
      }, 1000);

      BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    }, [])
  );
  // useEffect(() => {


  //   const dataSetTimeOut = setTimeout(() => {

  //     getAuthUserInfoApi();

  //     getStepCountAPi();

  //     UserCourseDelete();


  //     return () => {
  //       dataSetTimeOut.clear();
  //     }
  //   }, 1000);

  //   BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
  //   return () => {
  //     BackHandler.removeEventListener(
  //       'hardwareBackPress',
  //       handleBackButtonClick,

  //     );
  //   };


  // }, [isFocused]);

  function handleBackButtonClick() {
    Alert.alert(
      'Exit App',
      'Do you want to exit?',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'Yes', onPress: onDeleteBTN },
      ],
      { cancelable: false },
    );
    return true;
  }

  const onDeleteBTN = async () => {
    try {
      await AsyncStorage.removeItem('tokenlogin');
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('Loginflag')

    } catch (e) {
      // save error
    }
    Toast.show('Logout Successfully ', Toast.SHORT);

    props.navigation.navigate('LoginScreen');
    //  BackHandler.exitApp()
  };

  // useFocusEffect(
  //   React.useCallback(() => {

  //     getStepCountAPi();
  //   }, [isFocused])
  // );



  const UserCourseDelete = async () => {
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
    };

    setLoading(true);

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
  /***************************User Auth User Info*******************************/

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
    };

    dispatch(
      userActions.getAuthUserInfo({
        data,
        callback: ({ result, error }) => {
          if (result) {
            setLoading(false);
            console.warn(
              'after result Auth User sdfsdf INfo',
              JSON.stringify(result, undefined, 2),

              //  props.navigation.navigate('OtpLogin', { 'firebase_id': result.firebase_username, 'username': email })
            );
            setUserid(result.user_id)
            console.log('result.user_id', result.user_id)
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
             Toast.show('Invalid credentials', Toast.SHORT);
            setLoading(false);
            console.warn(JSON.stringify(error, undefined, 2));
          }
        },
      }),
    );
  };
  /***************************User getStepCountAPi *******************************/

  const getStepCountAPi = async () => {
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
    };

    dispatch(
      userActions.getRegStepCount({
        data,
        callback: ({ result, error }) => {
          if (result) {
            setLoading(false);
            console.warn(
              'after result step count',
              JSON.stringify(result, undefined, 2),
              //  props.navigation.navigate('OtpLogin', { 'firebase_id': result.firebase_username, 'username': email })
            );
            // setSpinnerStart(false);
            set_unread_notification_count(result.unread_notification_count);
            set_unread_reminder_count(result.unread_reminder_count);
            setRole(result.role);
            setIs_kyc_approved(result.is_kyc_approved);
            setis_approved(result.is_approved);
            getAuthUserInfoApi();

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

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.child_view}>
        <TouchableOpacity onPress={onBurgerBarPress}>
          <Image source={Images.menu_dash} style={styles.image_menu} />
        </TouchableOpacity>

        <View style={styles.tv_view}>
          <Text style={styles.ZatchUp_tv}>My School</Text>
          <Text style={styles.TM_tv}>TM</Text>
        </View>

        {/* <View style={styles.Notification_view}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('Reminders');
            }}>
            <Icon name="clock-outline" size={28} color="#FFFFFF" style={{


              marginRight: 5, marginTop: 11, height: 30, width: 30
            }} />
          </TouchableOpacity>

          <View
            style={{
              position: 'absolute',
              marginTop: Platform.OS == 'ios' ? 2 : 5,
              right: 5,
              alignSelf: 'flex-end',
              borderRadius: 15,
              backgroundColor: '#00B200',
              width: Platform.OS == 'ios' ? 20 : 18,
              height: Platform.OS == 'ios' ? 20 : 18,
            }}>
            <Text style={{ color: '#FFFFFF', fontSize: 12, textAlign: 'center', fontWeight: 'bold', marginTop: Platform.OS == 'ios' ? 2 : 0 }}> {unreadremindercount} </Text>
          </View>
        </View> */}
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Notifications');
          }}
          style={styles.dot_view}>
          <View>
            {/* <Image source={Images.inbox_icon} style={styles.dot_image} /> */}

            <Icon name="bell-outline" size={28} color="#FFFFFF" style={{


              marginRight: 0, marginTop: 15, height: 26, width: 26, right: 10,
            }} />
            <View
              style={{
                position: 'absolute',
                marginTop: Platform.OS == 'ios' ? 2 : 5,
                right: 5,
                alignSelf: 'flex-end',
                borderRadius: 15,
                backgroundColor: '#00B200',
                width: Platform.OS == 'ios' ? 20 : 18,
                height: Platform.OS == 'ios' ? 20 : 18,
              }}>
              <Text style={{ color: '#FFFFFF', fontSize: 12, textAlign: 'center', fontWeight: 'bold', marginTop: Platform.OS == 'ios' ? 2 : 0 }}> {unreadnotificationcount} </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>


      {roletype == 'STUDENTS' ? <ScrollView style={{ flexGrow: 1 }}>
        <View style={styles.mainBoxesContainer}>
          {/* <View style={styles.boxcontainer}>
            <Image
              style={{resizeMode: 'contain', width: 70, height: 70}}
              source={Images.ecertificate}
            />
            <View style={{marginTop: 12}}>
              <Text style={styles.text}>
                E-certificates{'\n'}&{'\n'}E-reports
              </Text>
            </View>
          </View> */}


          <TouchableOpacity
            onPress={() => props.navigation.navigate('Home', { 'user_id': userid })}>
            <View style={styles.boxcontainer}>
              <Image
                style={{ width: 70, height: 70, resizeMode: 'contain' }}
                source={Images.profilebookicon}
              />
              <View style={{ marginTop: 12 }}>
                <Text style={styles.text}>My Education Profile</Text>
              </View>
            </View>
          </TouchableOpacity>


          {is_kyc_approved === true && is_approved == true ? <TouchableOpacity
            onPress={() => props.navigation.navigate('SchoolListScreen')}>
            <View style={styles.boxcontainer}>
              <Image
                style={{ height: 100, width: 100, resizeMode: 'contain' }}
                source={Images.laptop_icon}
              />
              <View style={{ marginTop: 12 }}>
                <Text style={styles.text}>My{'\n'}Classroom</Text>
              </View>
            </View>
          </TouchableOpacity>
            : null}

        </View>
        {/* <View
          style={{
            paddingHorizontal: 15,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
        
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Reminders')}>
            <View style={styles.boxcontainer}>
              <Image
                style={{width: 70, height: 70}}
                source={Images.reminders}
              />
              <View style={{marginTop: 12}}>
                <Text style={styles.text}>Reminders</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View> */}
        {is_kyc_approved === true && is_approved == true ? <TouchableOpacity
          onPress={() => props.navigation.navigate('ChatTeacherScreen', { 'user_id': userid })}>
          <View
            style={{
              paddingHorizontal: 16,
              marginTop: 8,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                width: '100%',
                backgroundColor: 'white',
                height: 150,
                borderRadius: 15,
                alignSelf: 'center',
                justifyContent: 'center',
                marginBottom: 16,
              }}>
              <Image
                style={{
                  width: 70,
                  height: 70,
                  alignSelf: 'center',
                  resizeMode: 'contain',
                }}
                source={Images.chatwithteacher}
              />
              <View style={{ marginTop: 12 }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 15,
                    fontWeight: 'bold',
                  }}>
                  Chat with Teachers
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity> : null}
      </ScrollView> : <ScrollView style={{ flexGrow: 1 }}>
        <View style={styles.mainBoxesContainer}>

          <TouchableOpacity
            onPress={() => props.navigation.navigate('Home', { 'user_id': userid })}>
            <View style={styles.boxcontainer}>
              <Image
                style={{ width: 70, height: 70, resizeMode: 'contain' }}
                source={Images.profilebookicon}
              />
              <View style={{ marginTop: 12 }}>
                <Text style={styles.text}>My Education Profile</Text>
              </View>
            </View>
          </TouchableOpacity>

        </View>

      </ScrollView>}
    </View>
  );
};

export default MySchool;
