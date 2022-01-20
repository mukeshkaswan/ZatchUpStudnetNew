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
  Button,
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
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
const screenWidth = Dimensions.get('window').width;
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
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
const FollowersScreen = (props: NotificationsScreenProps) => {
  const {
    item: {user_id, flag},
  } = props.route.params;
  console.log('schoolDetail=====>>', props.route);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const [setdatafromlist, setData] = useState([]);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [followers, setFollowersList] = useState([]);
  const [userData, setuserdata] = useState('');

  useEffect(() => {
    getFollowers(user_id);
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

  const getFollowers = async user_id => {
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
      userActions.getFollowers({
        data,
        callback: ({result, error}) => {
          if (result) {
            console.warn(
              'after result followers list',
              JSON.stringify(result, undefined, 2),
              //  props.navigation.navigate('OtpLogin', { 'firebase_id': result.firebase_username, 'username': email })
            );

            if (result.status) {
              setFollowersList(result.data);
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
        item.social_account_status == 1
          ? 0
          : item.social_account_status == 0
          ? 2
          : 0,
      following_user_id: item.follow_user_id,
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
              getFollowers(user_id);
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

  const gotoRemoveItem = async item => {
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
      follow_status: 0,
      following_user_id: item.following_user_id,
      follow_user_id: item.follow_user_id,
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
              getFollowers(user_id);
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
    if (userData.flag != 'remove') {
      gotoFollow(userData);
    } else {
      console.log('hey');
      gotoRemoveItem(userData);
    }
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
    <View style={styles.container}>
      <CustomStatusBar />
      <CustomHeader
        Title={'Followers'}
        Back={'true'}
        navigation={props.navigation}
      />
      {followers.length > 0 && (
        <FlatList
          data={followers}
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
                    item.follow_request_user_profile_pic != null
                      ? {uri: item.follow_request_user_profile_pic}
                      : Images.profile_img2
                  }
                  style={{
                    height: 50,
                    width: 50,
                    tintColor: 'grey',
                    borderRadius: 25,
                  }}
                />
                <View style={{marginLeft: 10}}>
                  <Text style={{fontWeight: 'bold', fontSize: hp(2)}}>
                    {item.follow_username}
                  </Text>
                  {/* <Text style={{color: 'grey', fontWeight: 'bold'}}>
                    School Mates
                  </Text> */}
                </View>
              </View>
              {flag != 'self' ? (
                <View style={styles.Title_view}>
                  {item.social_account_status == 0 ? (
                    <TouchableOpacity
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
                      style={[styles.removebtn, {backgroundColor: '#dc3545'}]}
                      onPress={toggleModalItem({...item, flag: 'requested'})}>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: hp(1.8),
                          fontWeight: 'bold',
                        }}>
                        Requested
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={[styles.removebtn, {backgroundColor: '#28a745'}]}
                      onPress={toggleModalItem({...item, flag: 'following'})}>
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
              ) : (
                <View style={styles.Title_view}>
                  <TouchableOpacity
                    style={styles.removebtn}
                    onPress={toggleModalItem({...item, flag: 'remove'})}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: hp(1.8),
                        fontWeight: 'bold',
                      }}>
                      Remove
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </CardView>
          )}
          //  ItemSeparatorComponent={renderIndicator}
        />
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
              userData.follow_request_user_profile_pic != null
                ? {uri: userData.follow_request_user_profile_pic}
                : Images.profile_img2
            }
            style={{
              height: 50,
              width: 50,
              tintColor: 'grey',
              borderRadius: 25,
            }}
          />
          <View style={{paddingHorizontal: 16, alignItems: 'center'}}>
            <Text
              style={{fontWeight: 'bold', fontSize: hp(2.2), marginTop: 25}}>
              Remove Follower?
            </Text>
            <Text style={{textAlign: 'center', fontSize: hp(1.8)}}>
              Zatchup won't tell @{userData.follow_username} that they have been
              removed from the Followers.
            </Text>
          </View>
          <View
            style={{
              borderWidth: 0.5,
              borderColor: 'lightgrey',
              width: '100%',
              marginTop: 30,
            }}></View>
          <Button
            //color={Colors.$backgroundColor}
            title="Remove"
            onPress={gotoRemove}
          />
          <TouchableOpacity onPress={gotoRemove}>
            <Text style={{color: 'rgb(70,50,103)', marginTop: 10}}>Remove</Text>
          </TouchableOpacity>
          <View
            style={{
              borderWidth: 0.5,
              borderColor: 'lightgrey',
              width: '100%',
              marginTop: 12,
            }}></View>
          <Button
            //color={Colors.$backgroundColor}
            title="Cancel"
            onPress={toggleModal}
          />
          <TouchableOpacity onPress={toggleModal}>
            <Text style={{color: 'red', marginTop: 10}}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default FollowersScreen;
