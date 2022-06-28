import React, {Component, FC, useEffect, useState} from 'react';
import {
  Text,
  View,
  Dimensions,
  BackHandler,
  FlatList,
  Image,
  Alert,
  Keyboard,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import styles from './styles';
import {Images, Colors} from '../../../../../components/index';
//import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import {CustomStatusBar, CustomHeader} from '../../../../../components';
import CardView from 'react-native-cardview';
import Modal from 'react-native-modal';
import {
  NavigationContainer,
  useIsFocused,
  useFocusEffect,
} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import * as userActions from '../../../../../actions/user-actions-types';
import Toast from 'react-native-simple-toast';
import ProgressLoader from 'rn-progress-loader';
import {Card} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const {height, width} = Dimensions.get('window');

const data = [
  {
    id: 1,
    name: 'Mukesh Sharma',
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

interface NotificationsScreenProps {
  navigation: any;
}
const FollowingScreen = (props: NotificationsScreenProps) => {
  const {
    item: {user_id},
  } = props.route.params;
  console.log('schoolDetail=====>>', props.route);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const [setdatafromlist, setData] = useState([]);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [following, setFollowingList] = useState([]);
  const [userData, setuserdata] = useState('');
  const [userid, setUserid] = useState('');
  useEffect(() => {
    getAuthUserInfoApi();
    getFollowing(user_id);
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, [isFocused]);

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
        callback: ({result, error}) => {
          if (result) {
            console.warn(
              'after result Auth User INfo',
              JSON.stringify(result, undefined, 2),
              setUserid(result.user_id),
              //setTempUserId(result.user_id),
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

  const getFollowing = async user_id => {
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
      user_id: user_id,
    };

    dispatch(
      userActions.getFollowing({
        data,
        callback: ({result, error}) => {
          if (result) {
            console.warn(
              'after result following list',
              JSON.stringify(result, undefined, 2),
              //  props.navigation.navigate('OtpLogin', { 'firebase_id': result.firebase_username, 'username': email })
            );

            if (result.status) {
              setFollowingList(result.data);
            } else {
              // setSchoolDetail('');
            }

            setLoading(false);
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
        {text: 'Yes', onPress: onDeleteBTN},
      ],
      {cancelable: false},
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

  const gotoFollow = async item => {
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
      follow_status:
        item.is_account_private && item.social_account_status == 1
          ? 0
          : item.is_account_private
          ? 1
          : item.social_account_status == 1
          ? 0
          : item.social_account_status == 0
          ? 2
          : 0,
      following_user_id: item.following_user_id,
    };

    dispatch(
      userActions.followUser({
        data,
        callback: ({result, error}) => {
          if (result) {
            console.warn(
              'after result follow user',
              JSON.stringify(result, undefined, 2),
              //  props.navigation.navigate('OtpLogin', { 'firebase_id': result.firebase_username, 'username': email })
            );

            if (result.status) {
              getFollowing(user_id);
            } else {
              // setSchoolDetail('');
            }

            setLoading(false);
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

  const toggleModal = () => {
    console.log('hey');
    setModalVisible(!isModalVisible);
  };

  const toggleModalItem = item => () => {
    console.log('hey', item);
    setuserdata(item);
    setModalVisible(!isModalVisible);
  };

  const gotoRemove = () => {
    console.log(userData);
    setModalVisible(!isModalVisible);
    gotoFollow(userData);
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
          style={{justifyContent: 'center', alignItems: 'center', flex: 1}}
          color={'white'}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <CustomStatusBar />
        <CustomHeader
          Title={'Following'}
          Back={'true'}
          navigation={props.navigation}
        />
        {following.length > 0 ? (
          <FlatList
            data={following}
            renderItem={({item}) => (
              <CardView
                cardElevation={5}
                cardMaxElevation={5}
                cornerRadius={1}
                style={styles.Cardview}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={
                      item.following_request_user_profile_pic != null
                        ? {uri: item.following_request_user_profile_pic}
                        : Images.profile_default
                    }
                    style={{
                      height: 50,
                      width: 50,
                      borderRadius: 25,
                    }}
                  />
                  <View style={{marginLeft: 10}}>
                    <TouchableOpacity
                      onPress={() => {
                        item.following_user_role == 'EIREPRESENTATIVE'
                          ? props.navigation.navigate('SchoolProfile', {
                              item: {
                                user_id: item.following_user_id,
                                school_id: item.following_school_id,
                              },
                            })
                          : item.following_user_id != userid
                          ? props.navigation.navigate('UsersProfile', {
                              item: {user_id: item.following_user_id},
                            })
                          : props.navigation.navigate('UserProfileScreen', {
                              item: {user_id: item.following_user_id},
                            });
                      }}>
                      <Text style={{fontWeight: 'bold', fontSize: hp(2)}}>
                        {item.following_username}
                      </Text>
                    </TouchableOpacity>
                    {userid == item.following_user_id ? (
                      <Text style={{color: 'grey', fontWeight: 'bold'}}>
                        Self
                      </Text>
                    ) : item.is_school_mates == true ? (
                      <Text style={{color: 'grey', fontWeight: 'bold'}}>
                        Schoolmates
                      </Text>
                    ) : (
                      <View></View>
                    )}
                  </View>
                </View>

                <View style={[styles.Title_view]}>
                  {userid == item.following_user_id ? (
                    <View></View>
                  ) : item.social_account_status == 0 ? (
                    <TouchableOpacity
                      disabled={item.student_verified ? true : false}
                      style={styles.removebtn}
                      onPress={() => gotoFollow(item)}>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: hp(1.8),
                          fontWeight: 'bold',
                        }}>
                        Follow
                      </Text>
                    </TouchableOpacity>
                  ) : item.social_account_status == 1 ? (
                    <TouchableOpacity
                      disabled={item.student_verified ? true : false}
                      style={[styles.removebtn, {backgroundColor: '#dc3545'}]}
                      onPress={toggleModalItem(item)}>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: hp(1.6),
                          fontWeight: 'bold',
                        }}>
                        Requested
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      disabled={item.student_verified ? true : false}
                      style={[styles.removebtn, {backgroundColor: '#28a745'}]}
                      onPress={toggleModalItem(item)}>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: hp(1.8),
                          fontWeight: 'bold',
                        }}>
                        Following
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </CardView>
            )}
            //  ItemSeparatorComponent={renderIndicator}
          />
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              height: height - 72,
              width,
            }}>
            <Text style={{fontWeight: '700'}}>Records Not Available</Text>
          </View>
        )}
        <Modal
          isVisible={isModalVisible}
          onBackdropPress={toggleModal}
          backdropOpacity={0.4}>
          <View
            style={{
              //height: hp('55'),
              backgroundColor: Colors.$backgroundColor,
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 20,

              borderRadius: 5,
            }}>
            <Image
              source={
                userData.following_request_user_profile_pic != null
                  ? {uri: userData.following_request_user_profile_pic}
                  : Images.profile_default
              }
              style={{
                height: 50,
                width: 50,
                borderRadius: 25,
              }}
            />
            <View style={{paddingHorizontal: 16, alignItems: 'center'}}>
              {userData.social_account_status == 2 ? (
                <Text style={{textAlign: 'center', fontSize: hp(1.8)}}>
                  If you change your mind, you'll have to request to follow{' '}
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: hp(2.2),
                      marginTop: 25,
                    }}>
                    {userData.following_username}
                  </Text>{' '}
                  again
                </Text>
              ) : (
                <Text style={{textAlign: 'center', fontSize: hp(1.8)}}>
                  Are you sure you want to cancel the Request?
                  {/* If you change your mind, you'll have to request to follow{' '}
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: hp(2.2),
                    marginTop: 25,
                  }}>
                  {userData.following_username}
                </Text>{' '}
                again */}
                </Text>
              )}
            </View>
            <View
              style={{
                borderWidth: 0.5,
                borderColor: 'lightgrey',
                width: '100%',
                marginTop: 30,
              }}></View>
            {/* <Button
            //color={Colors.$backgroundColor}
            title="Remove"
            onPress={gotoRemove}
          /> */}
            <TouchableOpacity onPress={gotoRemove}>
              <Text style={{color: 'rgb(70,50,103)', marginTop: 10}}>
                {userData.social_account_status != 2 ? 'Yes' : 'Unfollow'}
              </Text>
            </TouchableOpacity>
            <View
              style={{
                borderWidth: 0.5,
                borderColor: 'lightgrey',
                width: '100%',
                marginTop: 12,
              }}></View>
            {/* <Button
            //color={Colors.$backgroundColor}
            title="Cancel"
            onPress={toggleModal}
          /> */}
            <TouchableOpacity onPress={toggleModal}>
              <Text style={{color: 'red', marginTop: 10}}>
                {userData.social_account_status != 2 ? 'No' : 'Cancel'}
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default FollowingScreen;
