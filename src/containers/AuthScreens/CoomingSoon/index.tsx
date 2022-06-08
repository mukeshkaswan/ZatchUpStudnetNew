import React, { useState, useEffect, useRef } from 'react';
import {
  Text,
  View,
  Image,
  Dimensions,
  Alert,
  TouchableOpacity,
  BackHandler,
  FlatList,
  Platform,
  TextInput,
  Keyboard,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
import {
  TextField,
  CustomButton,
  CustomStatusBar,
  BackBtn,
  ModelComponent,
  CustomHeader,
  CustomDropdown,
  Validate,
} from '../../../components';
import styles from './style';
import { Images } from '../../../components/index';
const screenWidth = Dimensions.get('window').width;
interface CoomingSoonScreenProps {
  navigation: any;
}
import {
  NavigationContainer,
  useIsFocused,
  DrawerActions,
  useFocusEffect,
} from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import * as userActions from '../../../actions/user-actions-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import CardView from 'react-native-cardview';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import ProgressLoader from 'rn-progress-loader';
import RenderItem from './RenderItem';
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

const { width, height } = Dimensions.get('screen');

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
  const ref = useRef();
  const [password, setPassword] = useState('');
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const [unreadnotificationcount, set_unread_notification_count] = useState('');
  const [unreadremindercount, set_unread_reminder_count] = useState('');
  const [cityname, onChangecityname] = useState('');
  const [citydata, setCityData] = useState([]);
  const [userid, setUserid] = useState('');
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
  const [customItem, setCustomItem] = useState('');
  const [reportId, setReportId] = useState('');
  const [loading, setLoadingg] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [socialMedia, setIsEnabled2] = useState(false);
  const [checkboxValue, setCheckboxValue] = React.useState([
    { report_option: 'Suspicious or Fake', checked: false },

    { report_option: 'Harassment or hateful speech', checked: false },
    { report_option: 'Violence or physical harm', checked: false },
    { report_option: 'Adult Content', checked: false },
    {
      report_option: 'Intellectual property infringement or defamation',
      checked: false,
    },
  ]);
  // useEffect(() => {
  //   //getEducationProfile();
  //   setPage(1);
  //   onChangecityname('');
  //   setCityData([]);

  //   getStepCountAPi();
  //   getAuthUserInfoApi();
  //   getPostDataApi(1);
  //   getReportData();
  //   // getAuthUserInfoApi();
  //   const keyboardDidShowListener = Keyboard.addListener(
  //     'keyboardDidShow',
  //     () => {
  //       setKeyboardVisible(true); // or some other action
  //     },
  //   );
  //   const keyboardDidHideListener = Keyboard.addListener(
  //     'keyboardDidHide',
  //     () => {
  //       setKeyboardVisible(false); // or some other action
  //     },
  //   );

  //   BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
  //   return () => {
  //     BackHandler.removeEventListener(
  //       'hardwareBackPress',
  //       handleBackButtonClick,
  //     );
  //     keyboardDidHideListener.remove();
  //     keyboardDidShowListener.remove();
  //   };
  // }, []);

  useFocusEffect(
    React.useCallback(() => {
      const dataSetTimeOut = setTimeout(() => {
        getPrivacySettingApi();
        setPage(1);
        onChangecityname('');
        setCityData([]);

        getStepCountAPi();
        getAuthUserInfoApi();
        getPostDataApi(1);
        getReportData();
        return () => {
          dataSetTimeOut.clear();
        };
      }, 200);

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
    }, []),
  );

  const pressComment = () => {
    showComment(true);
  };
  const checkedterm = () => {
    setSelected(!allSelected);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleModalCustom = item => {
    setCustomItem(item);
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
        { text: 'Yes' },
      ],
      { cancelable: false },
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
        { text: 'Yes', onPress: onDeleteBTN },
      ],
      { cancelable: false },
    );
    return true;
  }

  const onDeleteBTN = async () => {
    try {
      await AsyncStorage.removeItem('username');
      await AsyncStorage.removeItem('profilepic');
      await AsyncStorage.removeItem('kyckey');
      await AsyncStorage.removeItem('tokenlogin');
      await AsyncStorage.removeItem('Loginflag');
      Toast.show('Logout Successfully ', Toast.SHORT);
      props.navigation.navigate('LoginScreen');
      return true;
    } catch (exception) {
      return false;
    }
  };

  // const onDeleteBTN = async () => {
  //   try {
  //     await AsyncStorage.removeItem('tokenlogin');
  //     await AsyncStorage.removeItem('token');
  //   } catch (e) {
  //     // save error
  //   }
  //   Toast.show('Logout Successfully ', Toast.SHORT);

  //   props.navigation.navigate('LoginScreen');
  //   //  BackHandler.exitApp()
  // };
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

  const getPrivacySettingApi = async () => {
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
      userActions.getPrivacySetting({
        data,
        callback: ({ result, error }) => {
          setLoading(false);

          if (result) {
            console.warn(
              'after result abc',
              JSON.stringify(result, undefined, 2),
            );
            setIsEnabled2(result.data[0].socialmedia_user_status);
          }
          if (!error) {
            console.warn(JSON.stringify(error, undefined, 2));
            setLoading(false);
          } else {
            Toast.show('Request failed with status code 401', Toast.SHORT);
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
            // console.warn(
            //   'after result Auth User INfo',
            //   JSON.stringify(result, undefined, 2),

            //   //  props.navigation.navigate('OtpLogin', { 'firebase_id': result.firebase_username, 'username': email })
            // );
            setUserid(result.user_id),
              setuserName(result.full_name),
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

  /**************************get report data  ********************/

  const getReportData = async () => {
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
      type: 'post',
      parameter: 'type_of_report',
    };

    dispatch(
      userActions.getReportData({
        data,
        callback: ({ result, error }) => {
          if (result) {
            // console.warn(
            //   'after result report data',
            //   JSON.stringify(result, undefined, 2),
            //   //  props.navigation.navigate('OtpLogin', { 'firebase_id': result.firebase_username, 'username': email })
            // );
            if (result.status) {
              let newData = [];
              for (let i in result.data) {
                newData.push({ ...result.data[i], checked: false });
              }

              console.log('newData==>>', newData);

              setCheckboxValue(newData);
            }
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

  const gotoReportPost = async () => {
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
      post_id: customItem.id,
      report_id: reportId,
    };

    dispatch(
      userActions.reportPost({
        data,
        callback: ({ result, error }) => {
          if (result) {
            // console.warn(
            //   'after result report data',
            //   JSON.stringify(result, undefined, 2),
            //   //  props.navigation.navigate('OtpLogin', { 'firebase_id': result.firebase_username, 'username': email })
            // );
            if (result.status) {
              Toast.show(result.message, Toast.SHORT);
            }
            // setSpinnerStart(false);
            setLoading(false);
            setCheckboxValue([
              { report_option: 'Suspicious or Fake', checked: false },

              { report_option: 'Harassment or hateful speech', checked: false },
              { report_option: 'Violence or physical harm', checked: false },
              { report_option: 'Adult Content', checked: false },
              {
                report_option:
                  'Intellectual property infringement or defamation',
                checked: false,
              },
            ]);
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

  /*************Unfollow *************/

  const gotoUnfollow = async () => {
    // console.log('customItem', customItem);
    // return;
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
      following_user_id: customItem.user_id,
    };

    dispatch(
      userActions.followUser({
        data,
        callback: ({ result, error }) => {
          if (result) {
            // console.warn(
            //   'after result unfollow user',
            //   JSON.stringify(result, undefined, 2),
            //   //  props.navigation.navigate('OtpLogin', { 'firebase_id': result.firebase_username, 'username': email })
            // );

            if (result.status) {
              Toast.show(result.message, Toast.SHORT);
              getPostDataApi(1);
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
  /**************GET POST API CALL ***********/

  const getPostDataApi = async p => {
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
      page: p,
    };

    //console.log('page==>>', data);
    setLoading(true);
    dispatch(
      userActions.getPostOfUser({
        data,
        callback: ({ result, error }) => {
          if (result) {
            setLoadingg(false);
            setLoading(false);

            // console.warn(
            //   'after result Auth User INfo',
            //   JSON.stringify(result, undefined, 2),
            //   //  props.navigation.navigate('OtpLogin', { 'firebase_id': result.firebase_username, 'username': email })
            // );
            // let newArr = [];
            // for (let i in result.data) {
            //   newArr.push({...result.data[i], commentToggle: false});
            // }

            let newArrr = [];
            for (let i in result.data) {
              let newSubArr = [];
              if (result.data[i].comment_post != null) {
                for (let j in result.data[i].comment_post) {
                  newSubArr.push({
                    ...result.data[i].comment_post[j],
                    showMore: false,
                  });
                }
              } else {
                newSubArr = result.data[i].comment_post;
              }
              newArrr.push({
                ...result.data[i],
                comment_post: newSubArr,
                commentToggle: false,
                commentValue: '',
              });
            }

            // console.log('NewArray==>>', newArrr);

            // setSpinnerStart(false);
            let array = p == 1 ? newArrr : posts.concat(newArrr);

            // console.log('arrray', array);
            setPosts(array);
            setHasMore(newArrr.length == 9 ? true : false);
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

  const onEndReached = async () => {
    setPage(page + 1);
    setLoadingg(true);
    await getPostDataApi(page + 1);
    // this.setState({page: page + 1, loading: true}, this.CallApi);
  };

  const _handleRefresh = async () => {
    setPage(1);
    setPosts([]);
    await getPostDataApi(1);
    //  this.setState({page: 1, Data: []}, this.CallApi);
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

        callback: ({ results, error }) => {
          // console.warn(
          //   'after Search School Student result data',
          //   results,
          //   //  getdataProfile(result),
          // );
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
    // console.log('newObj', newObj);
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
        cornerRadius={10}
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
                props.navigation.navigate('SchoolProfile', {
                  item: { school_id: item.school_id, user_id: item.id },
                })
              }>
              <View style={{ flexDirection: 'row' }}>
                <Image
                  source={{ uri: item.profile_pic }}
                  // source={require('../../../assets/images/pic.jpeg')}
                  style={{
                    // marginLeft: 10,
                    width: 35,
                    height: 35,
                    borderRadius: 50,
                  }}
                />
                <View style={{ marginLeft: 10, justifyContent: 'center' }}>
                  <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
                    {item.display}
                  </Text>
                  <Text style={{ textAlign: 'center' }}>{item.zatchupId}</Text>
                </View>
              </View>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
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
                props.navigation.navigate('UserProfileScreen', {
                  item: { user_id: item.id },
                })
              }>
              <View style={{ flexDirection: 'row' }}>
                <Image
                  source={
                    item.profile_pic != null
                      ? { uri: item.profile_pic }
                      : Images.profile_default
                  }
                  // source={require('../../../assets/images/pic.jpeg')}
                  style={{
                    // marginLeft: 10,
                    width: 35,
                    height: 35,
                    borderRadius: 50,
                  }}
                />
                <View style={{ marginLeft: 10, justifyContent: 'center' }}>
                  <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
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
                props.navigation.navigate('UsersProfile', {
                  item: { user_id: item.id },
                })
              }>
              <View style={{ flexDirection: 'row' }}>
                <Image
                  source={
                    item.profile_pic != null
                      ? { uri: item.profile_pic }
                      : Images.profile_default
                  }
                  // source={require('../../../assets/images/pic.jpeg')}
                  style={{
                    // marginLeft: 10,
                    width: 35,
                    height: 35,
                    borderRadius: 50,
                  }}
                />
                <View style={{ marginLeft: 10, justifyContent: 'center' }}>
                  <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
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

  const isCarousel = useRef(null);
  const isCarouselText = useRef(null);

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
        callback: ({ result, error }) => {
          if (result) {
            // console.warn(
            //   'after result like or unlike',
            //   JSON.stringify(result, undefined, 2),
            //   //  props.navigation.navigate('OtpLogin', { 'firebase_id': result.firebase_username, 'username': email })
            // );
            setLoading(false);
            getPostDataApi(1);
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

    if (item.commentValue.trim() == '') {
      Toast.show('Please enter the comment', Toast.SHORT);
      return;
    }

    const data = {
      token: token,
      post_id: item.id,
      comment: item.commentValue,
    };

    dispatch(
      userActions.commentPost({
        data,
        callback: ({ result, error }) => {
          if (result) {
            // console.warn(
            //   'after result comment on post',
            //   JSON.stringify(result, undefined, 2),
            //   //  props.navigation.navigate('OtpLogin', { 'firebase_id': result.firebase_username, 'username': email })
            // );
            setLoading(false);
            getPostDataApi(1);
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
    //console.log(data);

    dispatch(
      userActions.commentlikeUnlike({
        data,
        callback: ({ result, error }) => {
          if (result) {
            // console.warn(
            //   'after result comment like or unlike',
            //   JSON.stringify(result, undefined, 2),
            //   //  props.navigation.navigate('OtpLogin', { 'firebase_id': result.firebase_username, 'username': email })
            // );
            setLoading(false);
            getPostDataApi(1);
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

  const checkboxHandler = (value, index) => {
    //console.log('value', value);
    setReportId(value.id);
    const newValue = checkboxValue.map((checkbox, i) => {
      if (i !== index)
        return {
          ...checkbox,
          checked: false,
        };
      if (i === index) {
        const item = {
          ...checkbox,
          checked: !checkbox.checked,
        };
        return item;
      }
      return checkbox;
    });
    setCheckboxValue(newValue);
  };

  const gotoReport = () => {
    //console.log(customItem, reportId);
    if (reportId == '') {
      Toast.show('Please select reason', Toast.SHORT);
      return;
    }
    if (checkboxValue.every(item => item.checked == false)) {
      Toast.show('Please select reason', Toast.SHORT);
      return;
    }

    setModalVisible2(!isModalVisible2);

    gotoReportPost();
  };

  const gotoShowMore = (ind, index) => {
    //  console.log(ind, index);

    let newArr = Object.assign([], posts);

    for (let i in newArr) {
      if (i == ind) {
        for (let j in newArr[i].comment_post) {
          if (j == index && !newArr[i].comment_post[j].showMore) {
            newArr[i].comment_post[j].showMore = true;
          } else if (j == index && newArr[i].comment_post[j].showMore) {
            newArr[i].comment_post[j].showMore = false;
          } else {
            newArr[i].comment_post[j].showMore = false;
          }
        }
      }
    }

    //console.log('After Change==>>', newArr);

    setPosts(newArr);
  };

  const gotoChangeComment = (text, index) => {
    // console.log(text, index);

    let newArr = Object.assign([], posts);

    for (let i in newArr) {
      if (i == index) {
        newArr[i].commentValue = text;
      } else {
        newArr[i].commentValue = '';
      }
    }

    //console.log('After Change==>>', newArr);

    setPosts(newArr);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* <CustomStatusBar /> */}
        <CustomStatusBar />

        {/* <CustomHeader Title={'School Information'} /> */}

        <View style={styles.child_view}>
          {is_kyc_approved == true && socialMedia && is_approved == true ? (
            <TouchableOpacity onPress={onBurgerBarPress}>
              <Image source={Images.menu_dash} style={styles.image_menu} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={onBurgerBarPress}>
              <Image
                source={Images.menu_dash}
                style={{ marginLeft: 15, marginTop: 10, tintColor: '#FFFFFF' }}
              />
            </TouchableOpacity>
          )}

          {is_kyc_approved == true && socialMedia && is_approved == true ? (
            <View style={styles.tv_view}>
              <View
                style={{
                  borderWidth: 1,
                  height: hp('6'),
                  marginVertical: hp('1'),
                  borderColor: 'lightgrey',
                  width: 215,
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: 20,
                  borderRadius: 5,
                  backgroundColor: '#FFFFFF',
                  marginTop: Platform.OS == 'ios' ? 18 : 3
                }}>
                <Image
                  source={Images.search}
                  style={{ marginLeft: 10, tintColor: '#000' }}
                />
                <TextInput
                  onChangeText={value => getSearchcitydata(value)}
                  value={cityname}
                  style={{ color: '#000' }}
                  placeholderTextColor="#000"
                  placeholder="Search..."
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
            top: isKeyboardVisible == true ? '12%' : '8%',
            marginLeft: '10%',
            // flex: 1,
            // justifyContent: 'center',
            //alignItems: 'center',
            zIndex: 1,
            //  height: 230,
          }}>
          {citydata.length > 0 ? (
            <FlatList
              data={citydata}
              showsVerticalScrollIndicator={false}
              // ListFooterComponent={() => (
              //   <Text style={{textAlign: 'center'}}>See All Results</Text>
              // )}
              style={{
                height: 290,
              }}
              // keyExtractor={item => item.id.toString()}
              // ItemSeparatorComponent={ItemSepratorcity}
              //  ItemSeparatorComponent={this.SeparatorComponent}
              renderItem={({ item, index }) => rednderItemListcitydata(item, index)}
            />
          ) : null}

          {/* {citydata.length > 0 ? (<Text>{'test'}</Text>) : null} */}

          {citydata.length > 5 ? (<TouchableOpacity
            style={{
              backgroundColor: '#E7E7E7',
              alignItems: 'center',
              paddingBottom: 15,
              marginRight: 20,
              width: '90%',
              shadowColor: 'black',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.26,
              borderColor: 'lightgrey',
            }}
            onPress={() =>
              props.navigation.navigate('SeeAllResults', { 'tvname': cityname })
            }

          >
            <Text
              style={{
                fontWeight: '600',
                color: '#4B2A6A',
                marginTop: 10
                //textDecorationLine: 'underline',
              }}>
              See All Results
            </Text>
          </TouchableOpacity>) : null}
        </View>

        {socialMedia ? (
          <View
            style={{
              flex: 1,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <FlatList
              ListHeaderComponent={() =>
                posts.length > 0 ? (
                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginHorizontal: 16,
                        marginTop: 8,
                      }}>
                      <Text style={{ fontWeight: '700' }}>Notification</Text>
                      <TouchableOpacity
                        onPress={() =>
                          props.navigation.navigate('UserNotificationScreen')
                        }>
                        <Text style={{ fontWeight: '700', fontSize: 12 }}>
                          View
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginHorizontal: 16,
                        marginTop: 8,
                      }}>
                      <Text style={{ fontWeight: '700' }}>Suggestion for you</Text>
                      <TouchableOpacity
                        onPress={() =>
                          props.navigation.navigate('SuggestionScreen')
                        }>
                        <Text style={{ fontWeight: '700', fontSize: 12 }}>
                          View
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginHorizontal: 16,
                        marginTop: 8,
                      }}>
                      <Text style={{ fontWeight: '700' }}>Follow Request</Text>
                      <TouchableOpacity
                        onPress={() =>
                          props.navigation.navigate('FollowRequestScreen')
                        }>
                        <Text style={{ fontWeight: '700', fontSize: 12 }}>
                          View
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  <View></View>
                )
              }
              style={{ flex: 1, width: '100%' }}
              data={posts}
              refreshControl={
                <RefreshControl
                  colors={['#4B2A6A']}
                  refreshing={refreshing}
                  onRefresh={_handleRefresh}
                />
              }
              ListEmptyComponent={() =>
                loading ? (
                  <View
                    style={{
                      height: height - 56,
                      width,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text style={{ fontSize: 18 }}>
                      No Notifications are available
                    </Text>
                  </View>
                ) : (
                  <View></View>
                )
              }
              ListFooterComponent={() =>
                hasMore && posts != null && posts.length > 0 && !loading ? (
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#fff',
                      alignItems: 'center',
                      paddingBottom: 8,
                    }}
                    onPress={() => onEndReached()}>
                    <Text
                      style={{
                        fontWeight: '700',
                        textDecorationLine: 'underline',
                      }}>
                      Load More
                    </Text>
                  </TouchableOpacity>
                ) : loading || isLoading ? (
                  <ProgressLoader
                    visible={true}
                    isModal={true}
                    isHUD={true}
                    //hudColor={"#ffffff00"}
                    hudColor={'#4B2A6A'}
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      flex: 1,
                    }}
                    color={'white'}
                  />
                ) : (
                  <View></View>
                )
              }
              renderItem={({ item, index }) => {
                let len =
                  item.post_gallery != null ? item.post_gallery.length : 0;
                let items = item;
                let ind = index;
                if (item.post_gallery == null) {
                  let s = item.caption;
                  var parts = s.match(/[\s\S]{1,140}/g) || [];
                  console.log(parts);
                  var lenCap = parts.length;
                }
                return (
                  <RenderItem
                    toggleModalCustom={toggleModalCustom}
                    gotoChangeComment={gotoChangeComment}
                    gotoShowMore={gotoShowMore}
                    gotoCommentLike={gotoCommentLike}
                    gotoComment={gotoComment}
                    gotoChangeToggle={gotoChangeToggle}
                    gotoLikeUnLike={gotoLikeUnLike}
                    username={username}
                    isCarousel={isCarousel}
                    isCarouselText={isCarouselText}
                    userid={userid}
                    posts={posts}
                    parts={parts}
                    lenCap={lenCap}
                    len={len}
                    items={items}
                    ind={ind}
                    item={item}
                    index={index}
                    props={props}
                    ref={ref}
                  />
                );
              }}
            />
          </View>
        ) : isLoading && !socialMedia ? (
          <ProgressLoader
            visible={true}
            isModal={true}
            isHUD={true}
            //hudColor={"#ffffff00"}
            hudColor={'#4B2A6A'}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
            }}
            color={'white'}
          />
        ) : posts.length > 0 ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 22, textAlign: 'center' }}>
              Please enable social media from setting page
            </Text>
          </View>
        ) : (
          <View />
        )}
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
            {customItem.user_id != userid && (
              <>
                <TouchableOpacity onPress={toggleModal2}>
                  <Text style={styles.btn}>Report</Text>
                </TouchableOpacity>

                {!customItem.student_verified && (
                  <>
                    <View style={styles.mborder}></View>
                    <TouchableOpacity onPress={gotoUnfollow}>
                      <Text style={styles.btn}>Unfollow</Text>
                    </TouchableOpacity>
                  </>
                )}
                <View style={styles.mborder}></View>
              </>
            )}
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('PostDetailScreen', {
                  item: customItem,
                });
              }}>
              <Text style={[styles.btn, { color: 'black' }]}>Go to Post</Text>
            </TouchableOpacity>
            <View style={styles.mborder}></View>
            <TouchableOpacity onPress={toggleModal}>
              <Text style={[styles.btn, { color: 'rgb(70,50,103)' }]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Modal
          isVisible={isModalVisible2}
          onBackdropPress={toggleModal2}
          backdropOpacity={0.4}>
          <View style={styles.modalContainer}>
            <View style={[styles.rowContent, { paddingHorizontal: 16 }]}>
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
                  style={{ height: 15, width: 15, marginRight: 10 }}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.mborder}></View>
            <View style={{ paddingHorizontal: 16 }}>
              <Text style={{ fontSize: hp(2.4) }}>Why are you reporting this?</Text>
              {checkboxValue.map((checkbox, i) => (
                <View key={i} style={styles.rowContent}>
                  <Text style={styles.reporttext}>{checkbox.report_option}</Text>
                  <TouchableOpacity onPress={() => checkboxHandler(checkbox, i)}>
                    <View
                      style={{
                        // backgroundColor: '#4B2A6A',
                        height: 22,
                        width: 22,
                        borderRadius: 11,
                        borderColor: '#4B2A6A',
                        borderWidth: 2,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      {checkbox.checked && (
                        <View
                          style={{
                            backgroundColor: '#4B2A6A',
                            height: 12,
                            width: 12,
                            borderRadius: 6,
                          }}></View>
                      )}
                    </View>
                    <View></View>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
            <View style={styles.mborder}></View>
            <View
              style={{
                alignItems: 'flex-end',
                marginTop: 10,
                marginRight: 10,
              }}>
              <TouchableOpacity
                style={styles.postbtn}
                onPress={() => gotoReport()}>
                <Text style={{ color: 'white' }}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default CoomingSoon;
