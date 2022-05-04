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
import { ChatURL } from '../../../utilities/axiosInstance';

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

const { width, height } = Dimensions.get('window');

interface MessagesScreenProps {
  navigation: any;
}
const Messages = (props: MessagesScreenProps,) => {
  const [data, studentdata] = useState([]);
  //const webviewRef = useRef(null)
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const [userid, setUserid] = useState(false);
  const [unreadnotificationcount, set_unread_notification_count] = useState('');
  const [unreadremindercount, set_unread_reminder_count] = useState('');
  const isFocused = useIsFocused();
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);
  const ref = useRef(null);
  const [key, setURIcheck] = useState(1);

  const [uri, setURI] = useState('');



  useFocusEffect(


    React.useCallback(() => {

      getStepCountAPi();

      const dataSetTimeOut = setTimeout(() => {

        getAuthUserInfoApi();


        return () => {
          dataSetTimeOut.clear();
        }
      }, 1000);

      BackHandler.addEventListener('hardwareBackPress', navigateToGoBack);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', navigateToGoBack);
    }, [])
  );


  useEffect(() => {
    setURIcheck(Math.floor(Math.random() * 100) + 1);
    console.log(setURIcheck);
    setURI(
      ChatURL + 'user/messages-app?user_profile_id=' + userid + '&type=app',
    );
    // if (
    //   moduleAccess.length > 0 &&
    //   moduleAccess.some((item) => item.module_name.trim() == 'Messages')
    // ) {
    //   ref && ref.current.reload();
    // }
    ref && ref.current.reload();

    let unsubscribe = props.navigation.addListener('focus', () => {
      // const handler = BackHandler.addEventListener(
      //   'hardwareBackPress',
      //   navigateToGoBack,
      // );
    });
    /// return () => handler.remove();
  }, [props.navigation]);



  const navigateToGoBack = () => {
    console.log('ref.current==>>', ref.current);

    if (ref.current) {
      ref.current.goBack();
      return true; // PREVENT DEFAULT BEHAVIOUR (EXITING THE APP)
    }
    return false;

  }

  const navigateToGoBack_ = () => {
    console.log('canGoBack==>>', canGoBack);
    if (canGoBack) {
      ref.current.goBack();
    } else {
      props.navigation.goBack(null);
    }
    //return true;
  };



  const setTheNavigation = (navState) => {
    console.log('navState==>>>', navState);
    setCanGoBack(navState.canGoBack);
    setCanGoForward(navState.canGoForward);
    if (!navState.canGoBack && navState.canGoForward) {
      var newUrl = navState.url.split('/');
      var newUrl1 = newUrl[newUrl.length - 1].indexOf('personal-messages');
      if (newUrl1 > -1) {
        console.log('url by radhey', newUrl1);
        setURI(null);
        props.navigation.goBack(null);
      }
    }
    // setURI(navState.url);
  };
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
            setURI(ChatURL + 'user/messages-app?user_profile_id=' + result.user_id + '&type=app')
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

        <View style={{
          backgroundColor: '#4B2A6A',
          height: 60,
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
          justifyContent: 'center',
          paddingVertical: 15,
          alignItems: 'center',
          paddingHorizontal: 55,
        }}>
          <TouchableOpacity onPress={navigateToGoBack_} activeOpacity={0.8} style={{ position: 'absolute', height: 50, width: 55, justifyContent: 'center', alignItems: 'center', alignSelf: 'baseline' }}>
            <Icon name="arrow-left" size={28} color="white" />
          </TouchableOpacity>
          <Text allowFontScaling={false} numberOfLines={1} style={{
            color: '#FFFFFF',
            marginRight: 2,
            fontSize: hp(2.8),
            fontWeight: '400',
            // bottom: 5,
            textAlign: 'center',
          }}>{'Messages'}</Text>
        </View>

        {/* <View style={styles.child_view}>
          <TouchableOpacity onPress={onBurgerBarPress}>
            <Image source={Images.menu_dash} style={styles.image_menu} />
          </TouchableOpacity>

          <View style={styles.tv_view}>
            <Text style={styles.ZatchUp_tv}>Messages</Text>
          </View>


          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('Notifications');
            }}
            style={styles.dot_view}>
            <View>
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
        </View> */}



        <View style={{ flex: 1 }}>

          <WebView
            nativeConfig={{ props: { webContentsDebuggingEnabled: true } }}
            cacheEnabled={false}
            renderLoading={() => (
              <ActivityIndicator
                style={{
                  width,
                  height: height - 60,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                size="large"
                color="#4B2A6A"
              />
            )}
            style={{ flex: 1 }}
            ref={ref}
            source={{
              uri: uri,
            }}
            key={key}
            startInLoadingState={true}

            onNavigationStateChange={(navState) => setTheNavigation(navState)}
          />

        </View>
      </View>
    </SafeAreaView>
  );
};

export default Messages;