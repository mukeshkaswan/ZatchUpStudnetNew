import React, {useState, useEffect, useRef} from 'react';
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
  TextInput,
  Keyboard,
} from 'react-native';
import styles from './style';
import {CustomCheckbox} from '../../../components';
import {Images} from '../../../components/index';
import OtpInputs from 'react-native-otp-inputs';
import {
  TextField,
  CustomButton,
  CustomStatusBar,
  BackBtn,
  CustomHeader,
} from '../../../components';
const screenWidth = Dimensions.get('window').width;
import {CheckBox} from 'react-native-elements';
import {Dropdown} from 'react-native-material-dropdown-v2';
interface CoomingSoonScreenProps {
  navigation: any;
}
import {RadioButton} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import * as userActions from '../../../actions/user-actions-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import CardView from 'react-native-cardview';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  NavigationContainer,
  useIsFocused,
  DrawerActions,
  useFocusEffect,
} from '@react-navigation/native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import Carousel, {Pagination} from 'react-native-snap-carousel';

const data1 = [
  {
    id: 1,
    full_name: 'Mukesh Sharma',
    src: require('../../../assets/images/college1.jpg'),
    message:
      'Lorem Ipsum is simply dummy text of the printing and type setting industry.',
    msg_read: false,
    comment: false,
    comment_post: [],
  },
  {
    id: 2,
    full_name: 'Prashant Chaudhary',
    src: require('../../../assets/images/college3.jpg'),
    time: 'Yesterday',
    profileImage: Images.profile_img2,
    message:
      'Lorem Ipsum is simply dummy text of the printing and type setting industry.',
    msg_read: true,
    comment: false,
    comment_post: [],
  },
  {
    id: 3,
    full_name: 'Mukesh Sharma',
    time: 'Yesterday',
    src: require('../../../assets/images/college2.jpg'),
    profileImage: Images.profile_img2,
    message:
      'Lorem Ipsum is simply dummy text of the printing and type setting industry.',
    msg_read: true,
    comment: false,
    comment_post: [],
  },
];

export const SLIDER_WIDTH = Dimensions.get('window').width - 32;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);

const data = [
  {
    id: 1,
    name: 'React JS',
    url: 'https://icon-library.com/images/react-icon/react-icon-29.jpg',
  },
  {
    id: 2,
    name: 'JavaScript',
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/3b/Javascript_Logo.png',
  },
  {
    id: 3,
    name: 'Node JS',
    url: 'https://upload.wikimedia.org/wikipedia/commons/6/67/NodeJS.png',
  },
  {
    id: 4,
    name: 'Node JS',
    url: 'https://upload.wikimedia.org/wikipedia/commons/6/67/NodeJS.png',
  },
  {
    id: 5,
    name: 'Node JS',
    url: 'https://upload.wikimedia.org/wikipedia/commons/6/67/NodeJS.png',
  },
  {
    id: 6,
    name: 'Node JS',
    url: 'https://upload.wikimedia.org/wikipedia/commons/6/67/NodeJS.png',
  },
];

const CoomingSoon = (props: CoomingSoonScreenProps) => {
  const [password, setPassword] = useState('');
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const [unreadnotificationcount, set_unread_notification_count] = useState('');
  const [unreadremindercount, set_unread_reminder_count] = useState('');
  const [cityname, onChangecityname] = useState('');
  const [citydata, setCityData] = useState([]);
  const [userid, setUserid] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [is_kyc_approved, setIs_kyc_approved] = useState();
  const [is_approved, setis_approved] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible2, setModalVisible2] = useState(false);
  const [allSelected, setSelected] = useState(false);
  const [comment, showComment] = useState(false);
  const [posts, setPosts] = useState([]);
  const [username, setuserName] = useState('');
  const [commentValue, setComment] = useState('');
  useEffect(() => {
    //getEducationProfile();
    onChangecityname('');
    setCityData([]);

    getStepCountAPi();
    getAuthUserInfoApi();
    getPostDataApi();

    // getAuthUserInfoApi();
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

  const pressComment = () => {
    showComment(true);
  };
  const checkedterm = () => {
    setSelected(!allSelected);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleModal2 = () => {
    setModalVisible2(!isModalVisible2);
    setModalVisible('');
  };

  const Logout = async () => {
    setModalVisible('');
    setModalVisible('');
    Alert.alert(
      'ZatchUp',
      'Are you sure you want to unfollow?',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Yes'},
      ],
      {cancelable: false},
    );
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
  // function handleBackButtonClick() {
  //   props.navigation.goBack();
  //   return true;
  // }

  const onBurgerBarPress = () => {
    props.navigation.dispatch(DrawerActions.toggleDrawer());
  };

  const getSearchcitydata = async value => {
    onChangecityname(value);

    if (value.length > 2) {
      getCity_Model_Search(value);
    } else if (value.length < 3) {
      setCityData([]);
    }
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
        callback: ({result, error}) => {
          if (result) {
            console.warn(
              'after result Auth User INfo',
              JSON.stringify(result, undefined, 2),
              setUserid(result.user_id),
              setuserName(result.full_name),
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

  /**************GET POST API CALL ***********/

  const getPostDataApi = async () => {
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
      userActions.getPostOfUser({
        data,
        callback: ({result, error}) => {
          if (result) {
            console.warn(
              'after result Auth User INfo',
              JSON.stringify(result, undefined, 2),
              //  props.navigation.navigate('OtpLogin', { 'firebase_id': result.firebase_username, 'username': email })
            );
            let newArr = [];
            for (let i in result.data) {
              newArr.push({...result.data[i], commentToggle: false});
            }
            setPosts(newArr);
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

  /***************************User GET City Search Name list *******************************/

  const getCity_Model_Search = async value => {
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
      search: value,
    };
    setLoading(true);

    dispatch(
      userActions.getSearchSchoolStudentSearchList({
        data,

        callback: ({results, error}) => {
          console.warn(
            'after Search School Student result data',
            results,
            //  getdataProfile(result),
          );
          if (results && results.length > 0) {
            // setSpinnerStart(false);
            setCityData(results), setLoading(false);
          } else if (results && results.length == []) {
            setCityData([]);
          }
          if (!error) {
            console.warn(JSON.stringify(error, undefined, 2));
            setLoading(false);
            // Toast.show('Invalid credentials', Toast.SHORT);
          } else {
            setLoading(false);
            console.warn(JSON.stringify(error, undefined, 2));
          }
        },
      }),
    );
  };

  const gotoChangeToggle = async index => {
    let newObj = Object.assign([], posts);
    for (let i in posts) {
      if (!posts[i].commentToggle) {
        setComment('');
      }
      if (i == index) {
        newObj[i].commentToggle = true;
      } else {
        newObj[i].commentToggle = false;
      }
    }
    console.log('newObj', newObj);
    setPosts(newObj);
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
        callback: ({result, error}) => {
          if (result) {
            console.warn(
              'after result step count',
              JSON.stringify(result, undefined, 2),
              //  props.navigation.navigate('OtpLogin', { 'firebase_id': result.firebase_username, 'username': email })
            );
            // setSpinnerStart(false);
            set_unread_notification_count(result.unread_notification_count);
            set_unread_reminder_count(result.unread_reminder_count);
            setIs_kyc_approved(result.is_kyc_approved);
            setis_approved(result.is_approved);
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

  const rednderItemListcitydata = (item, index) => {
    return (
      <CardView
        cardElevation={2}
        cardMaxElevation={2}
        cornerRadius={5}
        style={styles.Cardview_city}>
        {item.user_type == 'SCHOOL' ? (
          <View
            style={{
              paddingHorizontal: 14,
              paddingVertical: 10,
              backgroundColor: 'white',
              alignItems: 'center',
              flex: 1,
              width: '100%',

              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              underlayColor="none"
              onPress={() =>
                props.navigation.navigate('SearchSchoolDetail', {
                  school_id: item.school_id,
                })
              }>
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={{uri: item.profile_pic}}
                  // source={require('../../../assets/images/pic.jpeg')}
                  style={{
                    // marginLeft: 10,
                    width: 35,
                    height: 35,
                    borderRadius: 50,
                  }}
                />
                <View style={{marginLeft: 10, justifyContent: 'center'}}>
                  <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
                    {item.display}
                  </Text>
                  <Text style={{textAlign: 'center'}}>{item.zatchupId}</Text>
                </View>
              </View>
            </TouchableOpacity>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Text style={{}}>{item.city}</Text>
              <Image
                //source={{ uri: item.profile_pic }}
                source={Images.school}
                style={{
                  marginLeft: 15,
                  width: 20,
                  height: 20,
                  // borderRadius: 50,
                }}
              />
            </View>
          </View>
        ) : userid == item.id ? (
          <View
            style={{
              paddingHorizontal: 16,
              paddingVertical: 10,
              backgroundColor: 'white',
              alignItems: 'center',
              flex: 1,
              width: '90%',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              underlayColor="none"
              onPress={() =>
                props.navigation.navigate('ProfileScreen', {user_id: item.id})
              }>
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={Images.profile_default}
                  // source={require('../../../assets/images/pic.jpeg')}
                  style={{
                    // marginLeft: 10,
                    width: 35,
                    height: 35,
                    borderRadius: 50,
                  }}
                />
                <View style={{marginLeft: 10, justifyContent: 'center'}}>
                  <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
                    {item.display}
                  </Text>
                  <Text>You</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={{
              paddingHorizontal: 16,
              paddingVertical: 10,
              backgroundColor: 'white',
              alignItems: 'center',
              flex: 1,
              width: '90%',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              underlayColor="none"
              onPress={() =>
                props.navigation.navigate('ProfileScreen', {user_id: item.id})
              }>
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={Images.profile_default}
                  // source={require('../../../assets/images/pic.jpeg')}
                  style={{
                    // marginLeft: 10,
                    width: 35,
                    height: 35,
                    borderRadius: 50,
                  }}
                />
                <View style={{marginLeft: 10, justifyContent: 'center'}}>
                  <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
                    {item.display}
                  </Text>
                  <Text>School Mate</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </CardView>
    );
  };

  const [index, setIndex] = useState(0);
  const isCarousel = useRef(null);

  function CrouselImages({item, index, length}) {
    return (
      <View
        style={{
          //borderWidth: 0.5,
          // padding: 20,
          marginHorizontal: 8,
          //borderRadius: 20,
          alignItems: 'center',
          // backgroundColor: 'red',
          //  borderColor: 'grey',
        }}>
        <Image
          source={{uri: item.post_image}}
          resizeMode="contain"
          style={{
            width: screenWidth - 64,
            height: 200,
            backgroundColor: '#d2d2d2',
          }}
        />
        <Text
          style={{
            marginVertical: 10,
            fontSize: 12,
            position: 'absolute',
            color: '#fff',
            right: 0,
            backgroundColor: '#4B2A6A',
            opacity: 0.7,
            borderRadius: 12,
            padding: 2,
            paddingHorizontal: 6,
          }}>
          {index + 1}/{length}
        </Text>
      </View>
    );
  }

  const gotoLikeUnLike = async item => {
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
      post_id: item.id,
      like: !item.like,
    };

    dispatch(
      userActions.likeUnlikePost({
        data,
        callback: ({result, error}) => {
          if (result) {
            console.warn(
              'after result like or unlike',
              JSON.stringify(result, undefined, 2),
              //  props.navigation.navigate('OtpLogin', { 'firebase_id': result.firebase_username, 'username': email })
            );
            setLoading(false);
            getPostDataApi();
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

  const gotoComment = async item => {
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
      post_id: item.id,
      comment: commentValue,
    };

    dispatch(
      userActions.commentPost({
        data,
        callback: ({result, error}) => {
          if (result) {
            console.warn(
              'after result comment on post',
              JSON.stringify(result, undefined, 2),
              //  props.navigation.navigate('OtpLogin', { 'firebase_id': result.firebase_username, 'username': email })
            );
            setLoading(false);
            getPostDataApi();
            setComment('');
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

  const gotoCommentLike = async item => {
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
      comment_id: item.id,
      like: !item.likes_status,
    };
    console.log(data);

    dispatch(
      userActions.commentlikeUnlike({
        data,
        callback: ({result, error}) => {
          if (result) {
            console.warn(
              'after result comment like or unlike',
              JSON.stringify(result, undefined, 2),
              //  props.navigation.navigate('OtpLogin', { 'firebase_id': result.firebase_username, 'username': email })
            );
            setLoading(false);
            getPostDataApi();
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
      {/* <CustomStatusBar /> */}

      {/* <CustomHeader Title={'School Information'} /> */}

      <View style={styles.child_view}>
        {is_kyc_approved == true && is_approved == true ? (
          <TouchableOpacity onPress={onBurgerBarPress}>
            <Image source={Images.menu_dash} style={styles.image_menu} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={onBurgerBarPress}>
            <Image
              source={Images.menu_dash}
              style={{marginLeft: 15, marginTop: 10, tintColor: '#FFFFFF'}}
            />
          </TouchableOpacity>
        )}

        {is_kyc_approved == true && is_approved == true ? (
          <View style={styles.tv_view}>
            {/* <Text style={styles.ZatchUp_tv}>Home</Text> */}
            {/* <Text style={styles.TM_tv}>TM</Text> */}
            <View
              style={{
                borderWidth: 1,
                //  height: hp('5'),
                marginVertical: hp('1'),
                borderColor: 'lightgrey',
                width: 215,
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 20,
                borderRadius: 5,
                backgroundColor: '#FFFFFF',
              }}>
              <Image
                source={Images.search}
                style={{marginLeft: 10, tintColor: '#000'}}
              />
              <TextInput
                //onChangeText={onChangeNumber}
                onChangeText={value => getSearchcitydata(value)}
                value={cityname}
                style={{color: '#000'}}
                placeholderTextColor="#000"
                placeholder="Search City"
                keyboardType="default"
              />
            </View>
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#FFFFFF',
                marginRight: 50,
                fontSize: 28,
                fontWeight: 'bold',
                bottom: 5,
              }}>
              {'Home'}
            </Text>
          </View>
        )}

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

      <View
        style={{
          position: 'absolute',
          top: isKeyboardVisible == true ? '14%' : '8%',
          bottom: 0,
        }}>
        {citydata.length > 0 ? (
          <FlatList
            data={citydata}
            // style={{ position:'absolute' }}
            // keyExtractor={item => item.id.toString()}
            // ItemSeparatorComponent={ItemSepratorcity}
            //  ItemSeparatorComponent={this.SeparatorComponent}
            renderItem={({item, index}) => rednderItemListcitydata(item, index)}
          />
        ) : null}
      </View>

      <View
        style={{
          flex: 1,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <FlatList
          ListHeaderComponent={() => (
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginHorizontal: 16,
                  marginTop: 8,
                }}>
                <Text style={{fontWeight: '700'}}>Notification</Text>
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate('UserNotificationScreen')
                  }>
                  <Text style={{fontWeight: '700', fontSize: 12}}>View</Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginHorizontal: 16,
                  marginTop: 8,
                }}>
                <Text style={{fontWeight: '700'}}>Suggestion for you</Text>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('SuggestionScreen')}>
                  <Text style={{fontWeight: '700', fontSize: 12}}>View</Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginHorizontal: 16,
                  marginTop: 8,
                }}>
                <Text style={{fontWeight: '700'}}>Follow Request</Text>
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate('FollowRequestScreen')
                  }>
                  <Text style={{fontWeight: '700', fontSize: 12}}>View</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          style={{flex: 1, width: '100%'}}
          data={posts}
          renderItem={({item, index}) => {
            let len = item.post_gallery.length;
            let items = item;
            return (
              <CardView
                cardElevation={5}
                cardMaxElevation={5}
                // cornerRadius={15}
                style={{
                  // padding: 16,
                  backgroundColor: 'white',
                  marginHorizontal: 15,
                  marginTop: 10,
                  paddingBottom: 14,
                  paddingTop: 10,
                  marginBottom: 5,
                }}>
                <View style={styles.rowContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      item.user_role == 'EIREPRESENTATIVE'
                        ? props.navigation.navigate('SchoolProfile', {
                            item: items,
                          })
                        : props.navigation.navigate('UsersProfile', {
                            item: items,
                          });
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Image
                        source={
                          item.profile_pic != null
                            ? {uri: item.profile_pic}
                            : require('../../../assets/images/pic.jpeg')
                        }
                        style={styles.profilepic}
                      />
                      <Text style={{marginLeft: 20, fontWeight: 'bold'}}>
                        {item.full_name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={toggleModal}>
                    <Image
                      source={require('../../../assets/images/dot.png')}
                      style={{height: 18, width: 18}}
                    />
                  </TouchableOpacity>
                </View>
                <View style={{paddingHorizontal: 16, marginTop: 10}}>
                  <Image source={item.src} style={{width: '100%'}} />
                </View>
                {posts != [] && (
                  <>
                    <Carousel
                      // layout={'tinder'}
                      ref={isCarousel}
                      data={item.post_gallery}
                      renderItem={({item, index}) => (
                        <CrouselImages item={item} index={index} length={len} />
                      )}
                      sliderWidth={SLIDER_WIDTH}
                      itemWidth={ITEM_WIDTH}
                      onSnapToItem={index => setIndex(index)}
                    />
                    {/* <Pagination
                      dotsLength={item.post_gallery.length}
                      activeDotIndex={index}
                      carouselRef={isCarousel}
                      dotStyle={{
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        marginHorizontal: 8,
                        backgroundColor: '#F4BB41',
                      }}
                      tappableDots={true}
                      inactiveDotStyle={{
                        backgroundColor: 'black',
                        // Define styles for inactive dots here
                      }}
                      inactiveDotOpacity={0.4}
                      inactiveDotScale={0.6}
                    /> */}
                  </>
                )}
                <View style={styles.likecommentContainer}>
                  <TouchableOpacity onPress={() => gotoLikeUnLike(item)}>
                    <Icon
                      name="thumbs-up"
                      size={15}
                      color={item.like ? 'red' : 'grey'}
                      style={{marginLeft: 5}}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => gotoChangeToggle(index)}>
                    <Icon
                      name="comment"
                      color="grey"
                      size={15}
                      style={{marginLeft: 5}}
                    />
                  </TouchableOpacity>
                </View>

                {/* reply comment Section */}
                <View
                  style={{
                    marginLeft: 6,
                    paddingHorizontal: 16,
                    paddingVertical: 10,
                  }}>
                  {posts != [] &&
                  item.post_like != null &&
                  item.post_like.length == 1 &&
                  item.post_like[0].post_like_username == username &&
                  item.post_like_count > 0 ? (
                    <TouchableOpacity
                      onPress={() => {
                        item.user_role == 'EIREPRESENTATIVE'
                          ? props.navigation.navigate('SchoolProfile', {
                              item: items,
                            })
                          : props.navigation.navigate('UsersProfile', {
                              item: items,
                            });
                      }}>
                      <Text>
                        Liked by
                        <Text style={styles.boldText}> You</Text>
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        item.user_role == 'EIREPRESENTATIVE'
                          ? props.navigation.navigate('SchoolProfile', {
                              item: items,
                            })
                          : props.navigation.navigate('UsersProfile', {
                              item: items,
                            });
                      }}>
                      {item.post_like != null && item.post_like_count > 0 && (
                        <Text>
                          Liked by
                          <Text style={styles.boldText}>
                            {' '}
                            {item.post_like[0].post_like_username}
                          </Text>
                        </Text>
                      )}
                    </TouchableOpacity>
                  )}
                  {posts != [] &&
                    item.post_like != null &&
                    item.post_like.length >= 2 && (
                      <TouchableOpacity
                        onPress={() => {
                          props.navigation.navigate('ProfileScreen');
                        }}>
                        <Text>
                          Liked by{' '}
                          <Text style={styles.boldText}>
                            {item.post_like[0].post_like_username}
                          </Text>{' '}
                          and
                          <Text style={styles.boldText}>
                            {item.post_like.length - 1}Others
                          </Text>
                        </Text>
                      </TouchableOpacity>
                    )}

                  {item.full_name != null && (
                    <Text style={{fontWeight: 'bold', flex: 1, marginTop: 4}}>
                      {item.full_name}
                    </Text>
                  )}
                  {item.caption != null && <Text>{item.caption}</Text>}
                  {posts != [] &&
                    item.comment_post != null &&
                    item.comment_post.map((item, index) => {
                      if (index <= 2) {
                        return (
                          <View
                            style={styles.messageContainer}
                            key={item + 'sap' + index}>
                            <View style={{flexDirection: 'row', flex: 1}}>
                              <TouchableOpacity
                                onPress={() => {
                                  item.user_role == 'EIREPRESENTATIVE'
                                    ? props.navigation.navigate(
                                        'SchoolProfile',
                                        {
                                          item: items,
                                        },
                                      )
                                    : props.navigation.navigate(
                                        'UsersProfile',
                                        {
                                          item: items,
                                        },
                                      );
                                }}>
                                <Text style={{fontWeight: 'bold', flex: 1}}>
                                  {item.comment_username}
                                </Text>
                              </TouchableOpacity>
                              <Text style={{marginLeft: 5, flex: 2}}>
                                {item.comment}
                              </Text>
                            </View>
                            <View
                              style={{
                                flexDirection: 'row',
                              }}>
                              <TouchableOpacity
                                onPress={() => gotoCommentLike(item)}>
                                <Icon
                                  name="thumbs-up"
                                  size={15}
                                  color={item.likes_status ? 'red' : 'grey'}
                                  style={{marginLeft: 5}}
                                />
                              </TouchableOpacity>
                            </View>
                          </View>
                        );
                      }
                    })}
                  {/*end of reply comment Section */}
                  {item.total_comment >= 3 && (
                    <TouchableOpacity
                      onPress={() => {
                        props.navigation.navigate('PostDetailScreen', {item});
                      }}>
                      <Text style={{fontSize: 12, marginTop: 10}}>
                        VIEW ALL {item.total_comment} COMMENTS
                      </Text>
                    </TouchableOpacity>
                  )}
                  <Text style={{fontSize: 12, marginTop: 10}}>
                    {item.post_created_on}
                  </Text>
                </View>
                {item.commentToggle == true ? (
                  <View>
                    <View style={styles.border}></View>
                    <View style={styles.rowContainer}>
                      <TextInput
                        placeholder="Add a comment"
                        value={commentValue}
                        onChangeText={setComment}
                      />
                      <TouchableOpacity
                        style={styles.postbtn}
                        onPress={() => gotoComment(item)}>
                        <Text style={{color: 'white'}}>Post</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  <View></View>
                )}
              </CardView>
            );
          }}
          //  ItemSeparatorComponent={renderIndicator}
        />
        {/* modal1 */}
      </View>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        backdropOpacity={0.4}>
        <View
          style={{
            alignItems: 'center',
            backgroundColor: 'white',
            paddingVertical: 20,
            borderRadius: 5,
            justifyContent: 'center',
          }}>
          <TouchableOpacity onPress={toggleModal2}>
            <Text style={styles.btn}>Report</Text>
          </TouchableOpacity>
          <View style={styles.mborder}></View>
          <TouchableOpacity onPress={() => Logout()}>
            <Text style={styles.btn}>Unfollow</Text>
          </TouchableOpacity>
          <View style={styles.mborder}></View>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('PostDetailScreen');
            }}>
            <Text style={[styles.btn, {color: 'black'}]}>Go to Post</Text>
          </TouchableOpacity>
          <View style={styles.mborder}></View>
          <TouchableOpacity onPress={toggleModal}>
            <Text style={[styles.btn, {color: 'rgb(70,50,103)'}]}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      {/* modal2 */}
      <Modal
        isVisible={isModalVisible2}
        onBackdropPress={toggleModal2}
        backdropOpacity={0.4}>
        <View style={styles.modalContainer}>
          <View style={[styles.rowContent, {paddingHorizontal: 16}]}>
            <TouchableOpacity>
              <Text
                style={{
                  color: 'black',
                  fontWeight: 'bold',
                  fontSize: hp(2.4),
                }}>
                Report
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleModal2}>
              <Image
                source={Images.closeicon}
                style={{height: 15, width: 15, marginRight: 10}}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.mborder}></View>
          <View style={{paddingHorizontal: 16}}>
            <Text style={{fontSize: hp(2.4)}}>Why are you reporting this?</Text>
            <View style={styles.rowContent}>
              <Text style={styles.reporttext}>Suspicious or Fake</Text>
              <CustomCheckbox onPress={checkedterm} checked={allSelected} />
            </View>
            <View style={styles.rowContent}>
              <Text style={styles.reporttext}>
                Harassment or hateful speech
              </Text>
              <CustomCheckbox
                onPress={checkedterm}
                // checked={allSelected}
              />
            </View>
            <View style={styles.rowContent}>
              <Text style={styles.reporttext}>Violence or physical harm</Text>
              <CustomCheckbox
                onPress={checkedterm}
                // checked={allSelected}
              />
            </View>
            <View style={styles.rowContent}>
              <Text style={styles.reporttext}>Adult Content</Text>
              <CustomCheckbox
                onPress={checkedterm}
                //  checked={allSelected}
              />
            </View>
            <View style={styles.rowContent}>
              <Text style={styles.reporttext}>
                Intellectual property infringement or defamation
              </Text>
              <CustomCheckbox
                onPress={checkedterm}
                // checked={allSelected}
              />
            </View>
          </View>
          <View style={styles.mborder}></View>
          <View
            style={{alignItems: 'flex-end', marginTop: 10, marginRight: 10}}>
            <TouchableOpacity style={styles.postbtn}>
              <Text style={{color: 'white'}}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CoomingSoon;
