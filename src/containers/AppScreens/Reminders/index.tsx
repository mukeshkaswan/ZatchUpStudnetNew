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
  RefreshControl
} from 'react-native';
import styles from './style';
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
import CardView from 'react-native-cardview'
import moment from 'moment';
import 'moment-timezone';

interface ResetPasswordScreenProps {
  navigation: any;
}

const Reminders = (props: ResetPasswordScreenProps) => {
  const [isLoading, setLoading] = useState(false);
  const [reminder, setReminder] = useState([]);
  const [unreadnotificationcount, set_unread_notification_count] = useState('');
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [textShown, settextShown] = useState(-1);
  const [refreshing, setRefreshing] = useState(false);
  const [ID, setId] = useState(0);
  const [getview, setView] = useState(false);
  const [getdate, setDate] = useState('');
  const [getFlag, setFlag] = useState(false);




  const toggleNumberOfLines = index => {

    settextShown(textShown === index ? -1 : index);
  };
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




  useFocusEffect(


    React.useCallback(() => {
      getStepCountAPi();

      const dataSetTimeOut = setTimeout(() => {

        getRemindersApi();


        return () => {
          dataSetTimeOut.clear();
        }
      }, 1000);

      BackHandler.addEventListener('hardwareBackPress', handleBackBut);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', handleBackBut);
    }, [])
  );


  function handleBackBut() {
    props.navigation.goBack();
    return true;
  }



  const gotoNavigate = (id) => {
    setId(id);
    setView(true);
    // console.log('dateToFormat',dateToFormat)

    // if (getview === true) {
    //   setView(false);

    // } else if (getview === false) {
    //   setView(true);

    // }
  }


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

  const onRefresh = React.useCallback(() => {
    getStepCountAPi();
    getRemindersApi();
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);

  const wait = (timeout: any) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
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
    setId(0);
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
    setLoading(true);

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
            setFlag(true);

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
      {isLoading && renderIndicator()}

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
      {getFlag === true ? <View style={{flex:1}}>

      {reminder.length > 0 ? (
        <ScrollView style={{ flex: 1 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              // title="Pull to refresh" 
              // tintColor="#fff" 
              //  titleColor="#fff"
              colors={["rgb(70,50,103)"]}
            />

          }>
          <FlatList
            data={reminder}
            renderItem={({ item, index }) => (

              <View style={{ marginBottom: 10 }}>
                <View style={{}}>


                  <View style={{ marginTop: 16, marginHorizontal: 16, flex: 1, backgroundColor: '#F7F7F7', paddingVertical: 8, paddingHorizontal: 8 }}>
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                   
                      <View style={{ flex: 1 }}>
                        {item.attachment != null && (
                          <View style={styles.reminderarrowcontainer}>
                            <TouchableOpacity
                              onPress={() => gotoNavigate(item.id)}
                              style={styles.zatchupstarclassbtn}
                           

                            >
                              <View style={{ height: 18, width: 20 }}>
                                <Image
                                  style={{
                                    height: '100%',
                                    width: '100%',
                                    tintColor: '#000',

                                  }}
                                  source={Images.iattach}
                                />
                              </View>
                            </TouchableOpacity>
                          </View>
                        )}
                        {item.attachment == null ? <Text style={{ alignSelf: 'flex-end', marginRight: 16, fontSize: 12 }}>{moment(item.recieved_date).format("MMM DD , YYYY, hh:mm A")}</Text> : null}
                        {item.message.length > 100 ? <View>

                          <Text
                            numberOfLines={textShown === index ? undefined : 2}
                            style={{ marginTop: 20, fontSize: 15, fontWeight: '600' }}>
                            {item.message}
                          </Text>
                          <Text
                            onPress={() => toggleNumberOfLines(index)}
                            style={{ color: '#4B2A6A', marginTop: 5, fontSize: 16, fontWeight: '600' }}>
                            {textShown === index ? '[View Less]' : '[View More]'}
                          </Text>
                        </View> : <Text style={{ marginTop: 5, fontSize: 15, fontWeight: '600' }}>{item.message}</Text>}


                      </View>

                    </View>
                    <Text style={{ marginTop: 30, fontSize: 12, color: '#4B2A6A', alignSelf: 'flex-end', }}>{'-Sent By: ' + item.sender_name}</Text>

                  </View>
                
                </View>

                {getview === true ? <CardView
                  cardElevation={1}
                  cardMaxElevation={1}
                  // cornerRadius={1}
                  style={styles.Cardview}>

                  <View style={{}}>

                    {item.id === ID ? <Image
                      style={{ resizeMode: 'stretch', height: 200, width: '90%', marginTop: 15, marginHorizontal: 16, margin: 10 }}
                      source={{ uri: item.attachment }}
                    /> : null}
                  </View>

                  {item.id === ID ? <Text style={{ marginHorizontal: 16, marginRight: 16, fontSize: 13, marginTop: 5, marginBottom: 5, }}>{moment(item.recieved_date).format("MMM DD , YYYY, hh:mm A")}</Text> : null}


                </CardView> : null}


              </View>

            )}
          />
        </ScrollView>
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 15 }}>Records not available.</Text>
        </View>
      )}

      </View>:null}
    </View>
  );
};
export default Reminders;
