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
  FlatList,
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
const student_chat_data = [
  {
    id: 1,
    name: 'Mukesh ',
    time: '2:26PM',
    profileImage: Images.profile_img2,
    message:
      'Lorem Ipsum is simply dummy text of the printing and type setting industry.',
    msg_read: false,
  },
  {
    id: 2,
    name: 'Prashant Chaudhary',
    time: 'Yesterday',
    profileImage: Images.profile_img2,
    message:
      'Lorem Ipsum is simply dummy text of the printing and type setting industry.',
    msg_read: true,
  },
  {
    id: 3,
    name: 'Mukesh Sharma',
    time: 'Yesterday',
    profileImage: Images.profile_img2,
    message:
      'Lorem Ipsum is simply dummy text of the printing and type setting industry.',
    msg_read: true,
  },
  {
    id: 4,
    name: 'Prashant Sharma',
    time: 'Yesterday',
    profileImage: Images.profile_img2,
    message:
      'Lorem Ipsum is simply dummy text of the printing and type setting industry.',
    msg_read: true,
  },
  {
    id: 5,
    name: 'Prashant Chaudhary',
    time: 'Yesterday',
    profileImage: Images.profile_img2,
    message:
      'Lorem Ipsum is simply dummy text of the printing and type setting industry.',
    msg_read: true,
  },
  {
    id: 6,
    name: 'Prashant Chaudhary',
    time: 'Yesterday',
    profileImage: Images.profile_img2,
    message:
      'Lorem Ipsum is simply dummy text of the printing and type setting industry.',
    msg_read: true,
  },
  {
    id: 7,
    name: 'Mukesh Sharma',
    time: 'Yesterday',
    profileImage: Images.profile_img2,
    message:
      'Lorem Ipsum is simply dummy text of the printing and type setting industry.',
    msg_read: true,
  },
  {
    id: 8,
    name: 'Prashant Sharma',
    time: 'Yesterday',
    profileImage: Images.profile_img2,
    message:
      'Lorem Ipsum is simply dummy text of the printing and type setting industry.',
    msg_read: true,
  },
  {
    id: 9,
    name: 'Prashant Chaudhary',
    time: 'Yesterday',
    profileImage: Images.profile_img2,
    message:
      'Lorem Ipsum is simply dummy text of the printing and type setting industry.',
    msg_read: true,
  },
];

interface MessagesScreenProps {
  navigation: any;
}
const Messages = (props: MessagesScreenProps) => {
  const [data, studentdata] = useState([student_chat_data]);
  const webviewRef = useRef(null)
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const [userid, setUserid] = useState(false);
  const [unreadnotificationcount, set_unread_notification_count] = useState('');
  const [unreadremindercount, set_unread_reminder_count] = useState('');
  const isFocused = useIsFocused();

  useEffect(() => {


    const dataSetTimeOut = setTimeout(() => {
      getAuthUserInfoApi();

      getStepCountAPi();

      return () => {
        dataSetTimeOut.clear();
      }
    }, 1000);


  }, [isFocused]);

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
            console.warn(
              'after result step count',
              JSON.stringify(result, undefined, 2),
              //  props.navigation.navigate('OtpLogin', { 'firebase_id': result.firebase_username, 'username': email })
            );
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
            console.warn(
              'after result Auth User INfo',
              JSON.stringify(result, undefined, 2),
              setUserid(result.user_id)
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


  return (
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

        <View style={styles.Notification_view}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('Reminders');
            }}>
            <Image source={Images.search} style={styles.inbox_iconreminder} />
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
        </View>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Notifications');
          }}
          style={styles.dot_view}>
          <View>
            <Image source={Images.inbox_icon} style={styles.dot_image} />
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

      {/* <View
        style={{
          height: Platform.OS === 'ios' ? '10%' : '7%',
          backgroundColor: 'rgb(70,50,103)',
          //   borderBottomLeftRadius: 15,
          //   borderBottomRightRadius: 15,
        }}>
        <View
          style={{ flexDirection: 'row', width: '100%', alignSelf: 'center' }}>
          <TouchableOpacity
            onPress={backPressed}
            style={{
              marginTop: Platform.OS === 'ios' ? 30 : 10,
              marginLeft: 10,
            }}>
            <Icon name="arrow-left" size={25} color="white" />
          </TouchableOpacity>

          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                textAlignVertical: 'center',
                textAlign: 'center',
                color: 'white',
                fontSize: hp(2.8),
                marginRight: 20,
                fontFamily: 'Lato-Regular',
                marginTop: Platform.OS === 'ios' ? 30 : 5,
              }}>
              {'Messages'}
            </Text>
          </View>
        </View>
      </View> */}

      {/* <HeaderTitleWithBack
          navigation={this.props.navigation}
          headerTitle="Messages"
        /> */}
      {/* <HeaderWithTitle headerTitle="Messages" /> */}

      <View style={{ flex: 1 }}>

        <WebView
          source={{ uri: 'http://staging.zatchup.com/zatchup/#/user/messages-app?user_profile_id=' + userid + '&type=app' }}

          startInLoadingState={true}
          // renderLoading={() => (
          //   <ActivityIndicator
          //     color='#F8CA00'
          //     size='large'
          //     style={{ flex: 1 }}
          //   />
          // )}
          ref={webviewRef}

          onNavigationStateChange={navState => {
            console.log('weburl', navState.url);

            //  setCanGoBack(navState.canGoBack)
            //setCanGoForward(navState.canGoForward)
            // setCurrentUrl(navState.url)
          }}
        />

        {/* <FlatList
          data={student_chat_data}
          renderItem={({item}) => (
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('TeacherMessageChat')}>
                <View style={styles.listCardWrapper}>
                  <View style={styles.userImageWrapper}>
                    <Image
                      style={styles.userImageStyle}
                      source={item.profileImage}
                    />
                  </View>
                  <View style={styles.msgCardRightWrapper}>
                    <View style={styles.msgCardHeaderWrapper}>
                      <View style={{flex: 1}}>
                        <Text
                          style={[
                            styles.userNameStyle,
                            {color: item.msg_read ? '#111111' : '#4B2A6A'},
                          ]}>
                          {item.name}
                        </Text>
                      </View>
                      <View style={{alignSelf: 'center'}}>
                        <Text
                          style={[
                            styles.timeTextStyle,
                            {color: item.msg_read ? '#111111' : '#4B2A6A'},
                          ]}>
                          {item.time}
                        </Text>
                      </View>
                    </View>
                    <View style={{flexDirection: 'row', paddingTop: 5}}>
                      <View style={{flex: 1}}>
                        <Text
                          numberOfLines={2}
                          style={{
                            fontSize: 15,
                            color: '#8F8F8F',
                          }}>
                          {item.message}
                        </Text>
                      </View>
                      <View style={{paddingTop: 5}}>
                        <View style={{height: 15, width: 15}}>
                          <Image
                            style={{height: '100%', width: '100%'}}
                            source={Images.rightarrow}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    height: 2,
                    width: '90%',
                    marginLeft: 100,
                    backgroundColor: '#E9E9E9',
                  }}
                />
              </TouchableOpacity>
            </ScrollView>
          )}
        /> */}
      </View>
    </View>
  );
};

export default Messages;
