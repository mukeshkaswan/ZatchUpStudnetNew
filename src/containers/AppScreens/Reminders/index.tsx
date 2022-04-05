import React, { Component, FC, useState, useEffect } from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Platform,
  ImageBackground,
  ScrollView,
  Alert,
  BackHandler,
} from 'react-native';
import styles from './style.tsx';
import {
  TextField,
  CustomButton,
  CustomStatusBar,
  Validate,
  CustomHeader,
  BackBtn,
  HeaderTitleWithBack,
} from '../../../components';
import { Images } from '../../../components/index';
import Toast from 'react-native-simple-toast';
import { useDispatch, useSelector } from 'react-redux';
import * as userActions from '../../../actions/user-actions-types';
import ProgressLoader from 'rn-progress-loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import style from '../Messages/style';
import {
  NavigationContainer,
  useIsFocused,
  DrawerActions,
  useFocusEffect
} from '@react-navigation/native';


interface ResetPasswordScreenProps {
  navigation: any;
}

const Reminders = (props: ResetPasswordScreenProps) => {
  const [isLoading, setLoading] = useState(true);
  const [reminder, setReminder] = useState([]);
  const [unreadnotificationcount, set_unread_notification_count] = useState('');
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const onBurgerBarPress = () => {
    props.navigation.dispatch(DrawerActions.toggleDrawer());
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


  // useEffect(() => {
  //   getStepCountAPi();


  //   const dataSetTimeOut = setTimeout(() => {

  //     getRemindersApi();

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

        getRemindersApi();


        return () => {
          dataSetTimeOut.clear();
        }
      }, 1000);

      BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    }, [])
  );




  const backPressed = () => {
    props.navigation.goBack(null);
    return true;
  };

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

  const getRemindersApi = async () => {
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

  //  console.log('Token At reminders==>>', token);
    const data = {
      token: token,
    };

    dispatch(
      userActions.getReminders({
        data,
        callback: ({ result, error }) => {
          if (result) {
            // console.log(
            //   'after result reminders',
            //   JSON.stringify(result, undefined, 2),
            // );

            setLoading(false);
            if (result.status) {
              setReminder(result.results);
            }
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

            set_unread_notification_count(result.unread_notification_count);
            setLoading(false);
          }
          if (!error) {
            console.warn(JSON.stringify(error, undefined, 2));
            // setLoginSuccess(result);
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

      {/* <HeaderTitleWithBack
        navigation={props.navigation}
        headerTitle="Reminders"
      /> */}

      <View style={styles.child_view}>
        <TouchableOpacity onPress={onBurgerBarPress}>
          <Image source={Images.menu_dash} style={styles.image_menu} />
        </TouchableOpacity>

        <View style={styles.tv_view}>
          <Text style={styles.ZatchUp_tv}>Reminders</Text>
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

      {reminder.length > 0 ? (
        <FlatList
          data={reminder}
          renderItem={({ item }) => (
            <View style={{ marginBottom:10}}>
              <View style={{}}>

                <View style={{ marginTop: 16, marginHorizontal: 16, flex: 1, backgroundColor: '#F7F7F7', paddingVertical: 8, paddingHorizontal: 8 }}>
                  <View style={{ flexDirection: 'row', flex: 1 }}>
                    <Image
                      style={{ resizeMode: 'stretch', height: 20, width: 30, marginTop: 5 }}
                      source={Images.logo}
                    />
                    <View style={{ flex: 1 }}>
                      {item.attachment != null && (
                        <View style={styles.reminderarrowcontainer}>
                          <TouchableOpacity
                            style={styles.zatchupstarclassbtn}
                            onPress={() => {
                              props.navigation.navigate('ReminderTitleScreen', {
                                item,
                              });
                            }}>
                            <View style={{ height: 18, width: 20 }}>
                              <Image
                                style={{
                                  height: '100%',
                                  width: '100%',
                                 tintColor: '#000',
                                //  tin

                                }}
                                source={Images.iattach}
                              />
                            </View>
                          </TouchableOpacity>
                        </View>
                      )}
                      {item.attachment == null ? <Text style={{ alignSelf: 'flex-end', marginRight: 16, fontSize: 12 }}>{item.recieved_date}</Text> : null}
                      {item.attachment != null ? <Text style={{ marginTop: 5, fontSize: 15, fontWeight: '600' }}>{item.message}</Text> : <Text style={{ marginTop: 20, fontSize: 15, fontWeight: '600' }}>{item.message}</Text>}
                    </View>

                  </View>
                  <Text style={{ marginTop: 30, fontSize: 12, color: '#4B2A6A', alignSelf: 'flex-end', }}>{'-Sent By: ' + item.sender_name}</Text>

                </View>
                {/* <View
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    justifyContent: 'space-between',
                    paddingEnd: 12,
                  }}>
                  <Text style={styles.schoolremindertext}>{item.message}</Text>
                  <Text style={{fontSize:12,alignItems:'flex-end'}}>{item.recieved_date}</Text>

                  <Text style={{ marginTop: 30, fontSize: 12, color: '#4B2A6A' }}>{'-Sent By: ' + item.sender_name}</Text>
                </View> */}

              </View>
            </View>
          )}
        />
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 15 }}>Records not available.</Text>
        </View>
      )}
    </View>
  );
};
export default Reminders;
