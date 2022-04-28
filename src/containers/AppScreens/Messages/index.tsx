import React, { Component, useState, useRef, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Dimensions,
  Alert,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Platform,
  BackHandler,
  FlatList,
  SafeAreaView
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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const screenWidth = Dimensions.get('window').width;
import { WebView } from 'react-native-webview';
import ProgressLoader from 'rn-progress-loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  NavigationContainer,
  useIsFocused,
  DrawerActions,
  useFocusEffect
} from '@react-navigation/native';


interface MessagesScreenProps {
  navigation: any;
}
const Messages = (props: MessagesScreenProps) => {
  const [data, studentdata] = useState([]);
  const webviewRef = useRef(null)
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const [userid, setUserid] = useState(false);
  const [unreadnotificationcount, set_unread_notification_count] = useState('');
  const [unreadremindercount, set_unread_reminder_count] = useState('');
  const isFocused = useIsFocused();

  // useEffect(() => {

  //   getStepCountAPi();

  //   const dataSetTimeOut = setTimeout(() => {

  //     getAuthUserInfoApi();


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

  useFocusEffect(


    React.useCallback(() => {
      getStepCountAPi();

      const dataSetTimeOut = setTimeout(() => {

        getAuthUserInfoApi();


        return () => {
          dataSetTimeOut.clear();
        }
      }, 1000);

      BackHandler.addEventListener('hardwareBackPress', handleBackBut);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', handleBackBut);
    }, [])
  );



  // useFocusEffect(
  //   React.useCallback(() => {
  //     getAuthUserInfoApi();

  //     getStepCountAPi();
  //   }, [isFocused])
  // );
  const backPressed = () => {
    props.navigation.goBack(null);
    return true;
  };

  const onBurgerBarPress = () => {
    props.navigation.dispatch(DrawerActions.toggleDrawer());
  };


  function handleBackBut() {
    props.navigation.goBack();
    return true;
  }

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
    } catch (e) {
      // save error
    }
    Toast.show('Logout Successfully ', Toast.SHORT);

    props.navigation.navigate('LoginScreen');
    //  BackHandler.exitApp()
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
            // console.warn(
            //   'after result step count',
            //   JSON.stringify(result, undefined, 2),
            //   //  props.navigation.navigate('OtpLogin', { 'firebase_id': result.firebase_username, 'username': email })
            // );
            // setSpinnerStart(false);
            set_unread_notification_count(result.unread_notification_count);
            set_unread_reminder_count(result.unread_reminder_count);
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

            // console.warn(
            //   'after result Auth User INfo',
            //   JSON.stringify(result, undefined, 2),

            //   //  props.navigation.navigate('OtpLogin', { 'firebase_id': result.firebase_username, 'username': email })
            // );
            setUserid(result.user_id)
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


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <CustomStatusBar />

        <View style={styles.child_view}>
          <TouchableOpacity onPress={onBurgerBarPress}>
            <Image source={Images.menu_dash} style={styles.image_menu} />
          </TouchableOpacity>

          <View style={styles.tv_view}>
            <Text style={styles.ZatchUp_tv}>Messages</Text>
            {/* <Text style={styles.TM_tv}>TM</Text> */}
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
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 12,
                textAlign: 'center',
                fontWeight: 'bold',
                marginTop: Platform.OS == 'ios' ? 2 : 0,
              }}>
              {' '}
              {unreadremindercount}{' '}
            </Text>
          </View>
        </View> */}
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('Notifications');
            }}
            style={styles.dot_view}>
            <View>
              <Icon name="bell-outline" size={28} color="#FFFFFF" style={{


                marginRight: 0, marginTop: 15, height: 26, width: 26, right: 10,
              }} />
              {/* <Image source={Images.inbox_icon} style={styles.dot_image} /> */}
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
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontSize: 12,
                    textAlign: 'center',
                    fontWeight: 'bold',
                    marginTop: Platform.OS == 'ios' ? 2 : 0,
                  }}>
                  {' '}
                  {unreadnotificationcount}{' '}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>



        <View style={{ flex: 1 }}>

          <WebView
            // source={{ uri: 'https://zatchup.com/#/user/messages-app?user_profile_id=' + userid + '&type=app' }}
            source={{ uri: 'https://zatchup.com/preprod/#/user/messages-app?user_profile_id=' + userid + '&type=app' }}

            startInLoadingState={true}
            renderLoading={() => (
              <ActivityIndicator
                color='#F8CA00'
                size='large'
                style={{ flex: 1 }}
              />
            )}
            ref={webviewRef}

            onNavigationStateChange={navState => {

              console.log('weburl', navState.url);

              //  setCanGoBack(navState.canGoBack)
              //  setCanGoForward(navState.canGoForward)
              //  setCurrentUrl(navState.url)
            }}
          />


        </View>
      </View>
    </SafeAreaView>
  );
};

export default Messages;
