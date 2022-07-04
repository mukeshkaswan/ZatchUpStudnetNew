import React, {Component, FC, useState, useEffect, useRef} from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  BackHandler,
  Keyboard,
  Alert,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import {
  TextField,
  CustomButton,
  CustomStatusBar,
  Validate,
  CustomHeader,
  BackBtn,
  HeaderTitleWithBack,
  Colors,
  Customcard,
} from '../../../../../components';
import {
  NavigationContainer,
  useIsFocused,
  DrawerActions,
  useFocusEffect,
} from '@react-navigation/native';
import * as userActions from '../../../../../actions/user-actions-types';
import styles from './style.tsx';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Avatar, Card, Title, Paragraph} from 'react-native-paper';
import images from '../../../../../components/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import {useDispatch} from 'react-redux';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import CardView from 'react-native-cardview';
import Popover from 'react-native-popover-view';
import {Images} from '../../../../../components/index';
import Modal from 'react-native-modal';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Menu, MenuItem, MenuDivider} from 'react-native-material-menu';
import RenderItem from './RenderItem';
import user from '../../../../../reducers/users';
import Video from 'react-native-video-player';

//import Icon from 'react-native-vector-icons/Ionicons'

const screenWidth = Dimensions.get('window').width;

export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);

const UsersProfile = (props: UserProfileProps) => {
  //console.log('=====UserOther', props.route);
  const {
    item: {user_id},
  } = props.route.params;
  const ref = useRef();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [data, active_data] = useState('thData');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState('');
  const [index, setIndex] = useState(0);
  const [commentValue, setComment] = useState('');
  const [username, setuserName] = useState('');
  const [userid, setUserid] = useState('');
  const [sociaMedialPic, setSocialMediaPic] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [threeDot, setthreeDot] = React.useState(false);
  const [reportId, setReportId] = useState('');
  const [isModalVisible3, setModalVisible3] = useState(false);
  const [isreportmodal, setreportmodal] = useState(false);
  const [customItem, setCustomItem] = useState('');
  const [isreportprofilemodal, setreportprofilemodal] = useState(false);

  const [isEnabledEmail, setIsEnabledEmail] = useState(false);
  const [isEnabledDob, setIsEnabledDob] = useState(false);
  const [isEnabledGender, setIsEnabledGender] = useState(false);
  const [isEnabledProfession, setIsEnabledProfession] = useState(false);
  const [isEnabledCity, setIsEnabledCity] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  const [checkboxValue, setCheckboxValue] = React.useState([
    {report_option: 'Was not my Batchmate', checked: false},

    {report_option: 'Was not my Classmate', checked: false},
    {report_option: 'Fake Profile', checked: false},
  ]);
  const [reportcheckboxValue, setreportCheckboxValue] = React.useState([
    {report_option: 'Suspicious or Fake', checked: false},

    {report_option: 'Harassment or hateful speech', checked: false},
    {report_option: 'Violence or physical harm', checked: false},
    {report_option: 'Adult Content', checked: false},
    {
      report_option: 'Intellectual property infringement or defamation',
      checked: false,
    },
  ]);

  const [tempUserId, setTempUserId] = useState('');
  const [videoPost, setVideoPost] = useState('');
  const [nonVideoPost, setNonVideoPost] = useState('');

  const reportprofilemodal = () => {
    setreportprofilemodal(!isreportprofilemodal);
    setreportmodal('');
    setthreeDot(false);
  };
  const reportmodal = () => {
    setreportmodal(!isreportmodal);
    setModalVisible3('');
    // reportprofilemodal('')
    //setthreeDot(false);
  };
  const toggleModal3 = item => {
    setCustomItem(item);
    setModalVisible3(!isModalVisible3);
    setthreeDot(false);
    setreportprofilemodal('');
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

  const reportcheckboxHandler = (value, index) => {
    console.log('value', value);
    setReportId(value.id);
    const newValue = reportcheckboxValue.map((checkbox, i) => {
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
    setreportCheckboxValue(newValue);
  };
  const blockprofile = async () => {
    setthreeDot(false);
    if (userProfile != '' && !userProfile.block_user_active) {
      Alert.alert(
        'ZatchUp',
        ' Are you sure you want to Block Profile?',
        [
          {
            text: 'No',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'Yes', onPress: () => gotoBlockProfile()},
        ],
        {cancelable: false},
      );
    } else {
      Alert.alert(
        'ZatchUp',
        ' Are you sure you want to Unblock Profile?',
        [
          {
            text: 'No',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'Yes', onPress: () => gotoBlockProfile()},
        ],
        {cancelable: false},
      );
    }
    return true;
  };

  const gotoBlockProfile = async () => {
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
      blocked_user_id: user_id,
      block_user_status: !userProfile.block_user_active,
    };

    // console.log('ReportPost==>>', data);

    dispatch(
      userActions.blockUser({
        data,
        callback: ({result, error}) => {
          if (result) {
            // console.warn(
            //   'after result block data',
            //   JSON.stringify(result, undefined, 2),
            //   //  props.navigation.navigate('OtpLogin', { 'firebase_id': result.firebase_username, 'username': email })
            // );
            if (result.status) {
              Toast.show(result.message, Toast.SHORT);
              getUserProfile(user_id);
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

    // console.log('ReportPost==>>', data);

    dispatch(
      userActions.reportPost({
        data,
        callback: ({result, error}) => {
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
        callback: ({result, error}) => {
          if (result) {
            // console.warn(
            //   'after result Auth User INfo',
            //   JSON.stringify(result, undefined, 2),

            //   //setTempUserId(result.user_id),
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

  const gotoReport = () => {
    // console.log(customItem, reportId);
    if (reportId == '') {
      Toast.show('Please select reason', Toast.SHORT);
      return;
    }
    setreportmodal(!isreportmodal);
    gotoReportPost();
  };

  useEffect(() => {
    //console.log('hey...' + tempUserId);
    if (tempUserId == '') {
      // console.log('Hello Hey........');

      getAuthUserInfoApi();
      getSettingStatus(user_id);
      getUserProfile(user_id);
      getUserCoverMediaPic(user_id);
      getReportData();
      getReportPostData();
    } else if (tempUserId == user_id) {
      return;
    } else {
      getAuthUserInfoApi();
      getSettingStatus(user_id);
      getUserProfile(user_id);
      getUserCoverMediaPic(user_id);
      getReportData();
      getReportPostData();
    }
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

  /***************************User Auth User  Setting Status Info*******************************/

  const getSettingStatus = async user_id => {
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
      id: user_id,
    };

    dispatch(
      userActions.getUserSettingStatus({
        data,
        callback: ({result, error}) => {
          if (result) {
            // console.warn(
            //   'after result get User Setting Status >',
            //   JSON.stringify(result, undefined, 2),
            // );
            getStatusType(result);
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

  const getStatusType = async result => {
    for (let i in result.data) {
      if (result.data[i].status_type === 'EMAIL_ID') {
        if (result.data[i].is_disabled == true) {
          setIsEnabledEmail(true);
        } else {
          setIsEnabledEmail(false);
        }
      }

      if (result.data[i].status_type === 'DOB') {
        if (result.data[i].is_disabled == true) {
          setIsEnabledDob(true);
        } else {
          setIsEnabledDob(false);
        }
      }

      if (result.data[i].status_type == 'GENDER') {
        if (result.data[i].is_disabled == true) {
          setIsEnabledGender(true);
        } else {
          setIsEnabledGender(false);
        }
      }

      if (result.data[i].status_type === 'PROFESSION') {
        if (result.data[i].is_disabled == true) {
          setIsEnabledProfession(true);
        } else {
          setIsEnabledProfession(false);
        }
      }

      if (result.data[i].status_type === 'MOB_NUM') {
        if (result.data[i].is_disabled == true) {
          setIsEnabled(true);
        } else {
          setIsEnabled(false);
        }
      }

      if (result.data[i].status_type === 'CITY') {
        if (result.data[i].is_disabled == true) {
          setIsEnabledCity(true);
        } else {
          setIsEnabledCity(false);
        }
      }
    }
  };

  const getUserProfile = async user_id => {
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
    //console.log('users data : ', data);

    dispatch(
      userActions.getUserProfile({
        data,
        callback: ({result, error}) => {
          if (result) {
            // console.warn(
            //   'after result user profile details',
            //   JSON.stringify(result, undefined, 2),
            //   //  props.navigation.navigate('OtpLogin', { 'firebase_id': result.firebase_username, 'username': email })
            // );

            if (result.status) {
              setTempUserId(user_id);
              // let newArr = [];
              // for (let i in result.data[0].social_post) {
              //   newArr.push({
              //     ...result.data[0].social_post[i],
              //     commentValue: '',
              //     commentToggle: false,
              //   });
              // }

              let newArrr = [];
              if (result.data[0].social_post != null) {
                for (let i in result.data[0].social_post) {
                  let newSubArr = [];
                  if (result.data[0].social_post[i].comment_post != null) {
                    for (let j in result.data[0].social_post[i].comment_post) {
                      newSubArr.push({
                        ...result.data[0].social_post[i].comment_post[j],
                        showMore: false,
                      });
                    }
                  } else {
                    newSubArr = result.data[0].social_post[i].comment_post;
                  }
                  newArrr.push({
                    ...result.data[0].social_post[i],
                    comment_post: newSubArr,
                    commentToggle: false,
                    commentValue: '',
                  });
                }

                // console.log('NewArray==>>12', newArrr);
              }

              let newObject = {
                ...result.data[0],
                social_post: result.data[0].social_post != null ? newArrr : [],
              };

              // console.log('+++++12', newObject);

              let newArrForNonVideo = [];
              let newArr = [];
              for (let i in newObject.social_post) {
                if (
                  newObject.social_post[i].post_gallery != null &&
                  newObject.social_post[i].post_gallery[0].post_extension !=
                    'mp4'
                ) {
                  newArrForNonVideo.push(newObject.social_post[i]);
                } else if (newObject.social_post[i].post_gallery == null) {
                  newArrForNonVideo.push(newObject.social_post[i]);
                }
                newArr.push(newObject.social_post[i]);
              }

              setNonVideoPost(newArrForNonVideo);
              setVideoPost(newArr);

              let newObj = {
                ...result.data[0],
                social_post: newArrForNonVideo,
              };

              setUserProfile(newObj);
            } else {
              setUserProfile('');
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

  const gotoChangeTab = async key => {
    let newObj = {
      ...userProfile,
      social_post: key == 'Image' ? videoPost : nonVideoPost,
    };
    setUserProfile(newObj);
    await active_data(key);
  };

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
      type: 'user',
      parameter: 'type_of_user',
    };

    dispatch(
      userActions.getReportDataUser({
        data,
        callback: ({result, error}) => {
          if (result) {
            // console.warn(
            //   'after result report data userr',
            //   JSON.stringify(result, undefined, 2),
            //   //  props.navigation.navigate('OtpLogin', { 'firebase_id': result.firebase_username, 'username': email })
            // );
            if (result.status) {
              let newData = [];
              for (let i in result.data) {
                newData.push({...result.data[i], checked: false});
              }

              //  console.log('newDataUser==>>', newData);
              setCheckboxValue(newData);
              //setCheckboxValue(newData);
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

  const getReportPostData = async () => {
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
        callback: ({result, error}) => {
          if (result) {
            // console.warn(
            //   'after result report data post',
            //   JSON.stringify(result, undefined, 2),
            //   //  props.navigation.navigate('OtpLogin', { 'firebase_id': result.firebase_username, 'username': email })
            // );
            if (result.status) {
              let newData = [];
              for (let i in result.data) {
                newData.push({...result.data[i], checked: false});
              }

              // console.log('newDataa==>>', newData);
              setreportCheckboxValue(newData);
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

  const getUserCoverMediaPic = async user_id => {
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
      userActions.getUserCoverMediaPic({
        data,
        callback: ({result, error}) => {
          if (result) {
            // console.warn(
            //   'after result user cover pic details',
            //   JSON.stringify(result, undefined, 2),
            //   //  props.navigation.navigate('OtpLogin', { 'firebase_id': result.firebase_username, 'username': email })
            // );

            let obj = {
              cover_pic: result.cover_pic.socialmedia_coverpic,
              profile_pic: result.profile_pic.socialmedia_profilepic,
            };
            setSocialMediaPic(obj);

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
        callback: ({result, error}) => {
          if (result) {
            // console.warn(
            //   'after result comment on post',
            //   JSON.stringify(result, undefined, 2),
            //   //  props.navigation.navigate('OtpLogin', { 'firebase_id': result.firebase_username, 'username': email })
            // );
            setLoading(false);
            getUserProfile(user_id);
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
            // console.warn(
            //   'after result like or unlike',
            //   JSON.stringify(result, undefined, 2),
            //   //  props.navigation.navigate('OtpLogin', { 'firebase_id': result.firebase_username, 'username': email })
            // );
            setLoading(false);
            getUserProfile(user_id);
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
        callback: ({result, error}) => {
          if (result) {
            // console.warn(
            //   'after result comment like or unlike',
            //   JSON.stringify(result, undefined, 2),
            //   //  props.navigation.navigate('OtpLogin', { 'firebase_id': result.firebase_username, 'username': email })
            // );
            setLoading(false);
            getUserProfile(user_id);
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

  const gotoChangeToggle = async index => {
    let newObj = Object.assign({}, userProfile);
    for (let i in userProfile.social_post) {
      if (!userProfile.social_post[i].commentToggle) {
        setComment('');
      }
      if (i == index) {
        newObj.social_post[i].commentToggle = true;
      } else {
        newObj.social_post[i].commentToggle = false;
      }
    }
    //console.log('newObj', newObj);
    setUserProfile(newObj);
  };

  const gotoChangeComment = (text, index) => {
    console.log(text, index);

    let newObj = Object.assign({}, userProfile);

    for (let i in userProfile.social_post) {
      if (i == index) {
        newObj.social_post[i].commentValue = text;
      } else {
        newObj.social_post[i].commentValue = '';
      }
    }

    //console.log('After Change==>>', newObj);

    setUserProfile(newObj);
  };

  const gotoFollow = async () => {
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

    let data = {
      token: token,
      following_user_id: user_id,
    };
    if (userProfile.follow_request_status == 0) {
      data.follow_status = !userProfile.social_account_status
        ? 2
        : userProfile.social_account_status
        ? 1
        : 0;
    } else {
      data.follow_status =
        userProfile.follow_request_status == 1
          ? 0
          : userProfile.follow_request_status == 0
          ? 1
          : 0;
    }

    dispatch(
      userActions.followUser({
        data,
        callback: ({result, error}) => {
          if (result) {
            // console.warn(
            //   'after result follow user',
            //   JSON.stringify(result, undefined, 2),
            //   //  props.navigation.navigate('OtpLogin', { 'firebase_id': result.firebase_username, 'username': email })
            // );

            if (result.status) {
              getUserProfile(user_id);
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

  const gotoReportProfile = async () => {
    if (reportId == '') {
      Toast.show('Please select reason', Toast.SHORT);
      return;
    }
    if (checkboxValue.every(item => item.checked == false)) {
      Toast.show('Please select reason', Toast.SHORT);
      return;
    }
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
      reported_user_id: user_id,
      report_id: reportId,
    };
    setreportprofilemodal(!isreportprofilemodal);

    // console.log('data==>>>', data);
    // return;

    dispatch(
      userActions.reportProfile({
        data,
        callback: ({result, error}) => {
          if (result) {
            // console.warn(
            //   'after result report profile',
            //   JSON.stringify(result, undefined, 2),
            //   //  props.navigation.navigate('OtpLogin', { 'firebase_id': result.firebase_username, 'username': email })
            // );
            if (result.status) {
              Toast.show(result.message, Toast.SHORT);
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

  const toggleModal = () => {
    //console.log('hey');
    setModalVisible(!isModalVisible);
    // gotoFollow();
  };

  const gotoRemove = () => {
    setModalVisible(!isModalVisible);
    gotoFollow();
  };
  const threedot = () => {
    setthreeDot(!threeDot);
    // setTimeout(() => {
    //   setthreeDot(false);
    // }, 3000);
  };

  const isCarousel = useRef(null);
  const isCarouselText = useRef(null);

  const gotoShowMore = (ind, index) => {
    //console.log(ind, index);

    let newArr = Object.assign([], userProfile.social_post);

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

    // console.log('After Change==>>', newArr);

    let newObject = {...userProfile, social_post: newArr};

    //console.log('+++++', newObject);

    setUserProfile(newObject);
  };

  const goToNavigate = async (route, itemData) => {
    //console.log(route + 'Sap' + JSON.stringify(itemData));
    let itemm = JSON.stringify(itemData);
    console.log(JSON.parse(itemm));
    const {
      item: {user_id},
    } = JSON.parse(itemm);
    console.log(user_id);
    await props.navigation.navigate(route, {item: {user_id}});
    // return true;
  };

  const GoToNavigate = items => {
    // console.log('item', items);
    props.navigation.navigate('PostDetailScreen', {item: items});
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <HeaderTitleWithBack
          navigation={props.navigation}
          headerTitle="Profile"
        />

        {userProfile != '' && (
          <ScrollView>
            <View
              style={{
                backgroundColor: 'white',
                marginTop: 10,
                marginHorizontal: 16,
                borderRadius: 5,
              }}>
              <ImageBackground
                source={
                  sociaMedialPic.hasOwnProperty('cover_pic') &&
                  sociaMedialPic.cover_pic != null
                    ? {uri: sociaMedialPic.cover_pic}
                    : Images.cover_pic_default
                }
                resizeMode="stretch"
                style={{width: '100%', height: 130}}>
                <View
                  style={{
                    backgroundColor: 'black',
                    height: 30,
                    width: 30,
                    justifyContent: 'center',
                    margin: 10,
                    alignSelf: 'flex-end',
                  }}>
                  <TouchableOpacity onPress={threedot}>
                    <Image
                      source={require('../../../../../assets/images/dot.png')}
                      style={{
                        tintColor: 'white',
                        resizeMode: 'stretch',
                        height: 20,
                      }}
                    />
                  </TouchableOpacity>
                </View>
                {threeDot == true && (
                  <View
                    style={{
                      backgroundColor: 'white',
                      width: 170,
                      alignSelf: 'flex-end',
                      marginTop: -8,
                      marginRight: 10,
                      borderRadius: 5,
                      padding: 10,
                      borderWidth: 1,
                      borderColor: 'lightgrey',
                    }}>
                    <TouchableOpacity onPress={reportprofilemodal}>
                      <Text style={{fontSize: hp(2)}}>Report Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => blockprofile()}>
                      <Text style={{fontSize: hp(2), marginTop: 10}}>
                        {userProfile != '' && userProfile.block_user_active
                          ? 'Unblock Profile'
                          : 'Block Profile'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </ImageBackground>

              <View style={styles.rowContainer}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View>
                    <Image
                      source={
                        sociaMedialPic.hasOwnProperty('profile_pic') &&
                        sociaMedialPic.profile_pic != null
                          ? {uri: sociaMedialPic.profile_pic}
                          : Images.profile_default
                      }
                      style={{
                        marginLeft: 10,
                        width: 80,
                        height: 80,
                        borderRadius: 50,
                      }}
                    />
                    {userProfile != '' && userProfile.kyc_approved != 0 && (
                      <View
                        style={{
                          position: 'absolute',
                          left: 0,
                          bottom: 0,
                          marginLeft: 16,
                        }}>
                        <Image
                          style={{
                            width: 20,
                            height: 20,
                          }}
                          source={Images.blue_tick}
                        />
                      </View>
                    )}
                  </View>

                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginLeft: 14,
                        marginTop: 30,
                      }}>
                      <View style={{marginTop: 16}}>
                        <Text style={styles.nametext}>{userProfile.name}</Text>
                        {userProfile.zatchup_id != null && (
                          <Text style={[styles.nametext, {fontSize: 12}]}>
                            {'(' + userProfile.zatchup_id + ')'}
                          </Text>
                        )}
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.likecontainer}>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    disabled={
                      userProfile.block_user_active
                        ? true
                        : userProfile.social_account_status &&
                          userProfile.follow_request_status != 2
                        ? true
                        : userProfile.social_account_status &&
                          userProfile.follow_request_status == 2
                        ? false
                        : userProfile.follow_request_status == 2 ||
                          userProfile.follow_request_status == 0
                        ? false
                        : true
                    }
                    onPress={() => {
                      props.navigation.navigate('FollowersScreen', {
                        item: {...userProfile, user_id, flag: 'user'},
                      });
                    }}>
                    <Text style={styles.boldText}>
                      {userProfile.social_user_followers}
                    </Text>
                    <Text>Followers</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    disabled={
                      userProfile.block_user_active
                        ? true
                        : userProfile.social_account_status &&
                          userProfile.follow_request_status != 2
                        ? true
                        : userProfile.social_account_status &&
                          userProfile.follow_request_status == 2
                        ? false
                        : userProfile.follow_request_status == 2 ||
                          userProfile.follow_request_status == 0
                        ? false
                        : true
                    }
                    onPress={() => {
                      props.navigation.navigate('FollowingScreen', {
                        item: {...userProfile, user_id},
                      });
                    }}
                    style={{marginLeft: 10}}>
                    <Text style={styles.boldText}>
                      {userProfile.social_user_followings}
                    </Text>
                    <Text style={{}}>Following</Text>
                  </TouchableOpacity>
                  {userProfile.follow_request_status == 0 ? (
                    <TouchableOpacity
                      disabled={userProfile.block_user_active ? true : false}
                      style={[
                        styles.removebtn,
                        {
                          opacity: userProfile.block_user_active ? 0.5 : 1,
                        },
                      ]}
                      onPress={() => gotoFollow()}>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: hp(1.8),
                          fontWeight: 'bold',
                        }}>
                        Follow
                      </Text>
                    </TouchableOpacity>
                  ) : userProfile.follow_request_status == 1 ? (
                    <TouchableOpacity
                      style={[styles.removebtn, {backgroundColor: '#dc3545'}]}
                      onPress={toggleModal}>
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
                      style={[
                        styles.removebtn,
                        {backgroundColor: '#28a745', width: 110},
                      ]}
                      onPress={toggleModal}>
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
                <View style={styles.messageicon}>
                  <TouchableOpacity
                    onPress={() => {
                      props.navigation.navigate('Messages');
                    }}>
                    <Icon name="envelope" size={24} color="grey" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <Card style={styles.cardContent}>
              <View style={styles.cardtitlecontent}>
                <Text style={styles.cardtitletext}>Education</Text>
              </View>
              {userProfile != '' &&
                (userProfile.educationdetail != null ||
                  userProfile.educationdetail.length > 0) &&
                userProfile.educationdetail.map((item, index) => {
                  if (
                    item.course_detail != null &&
                    item.course_detail.length > 0
                  ) {
                    return (
                      <>
                        <View style={styles.borderstyle}></View>
                        <View style={styles.textcontainer}>
                          <View style={{flexDirection: 'row'}}>
                            <Text
                              style={[
                                styles.Personal_Tv,
                                {fontWeight: '700', color: '#5790c2'},
                              ]}>
                              {item.name_of_school}
                            </Text>
                            {item.is_active_subscription && (
                              <Icon
                                name="check-circle"
                                size={17}
                                color="#4E387E"
                                style={{marginLeft: 5, marginTop: 2}}
                              />
                            )}
                          </View>
                          {item.course_detail.map((item, index) => {
                            return (
                              <View style={styles.view_Row}>
                                <Text
                                  style={[
                                    styles.view_Tv_1,
                                    {fontWeight: '700'},
                                  ]}>
                                  {item.course_name}
                                </Text>
                                <Text style={styles.view_Tv_2}>
                                  {'(' +
                                    item.start_year +
                                    ' - ' +
                                    item.end_year +
                                    ')'}
                                </Text>
                              </View>
                            );
                          })}
                        </View>
                      </>
                    );
                  }
                })}
            </Card>
            <Card style={styles.cardContent}>
              <View style={styles.cardtitlecontent}>
                <View>
                  <Text style={styles.cardtitletext}>Personal Information</Text>
                </View>
              </View>

              <View style={styles.borderstyle}></View>
              <View style={styles.textcontainer}>
                {isEnabledDob ? (
                  <View style={styles.view_Row}>
                    <Text style={styles.view_Tv_1}>DOB :</Text>
                    <Text style={styles.view_Tv_2}>{userProfile.dob}</Text>
                  </View>
                ) : null}
                {isEnabledGender ? (
                  <View style={styles.view_Row}>
                    <Text style={styles.view_Tv_1}>Gender :</Text>
                    <Text style={styles.view_Tv_2}>
                      {userProfile.gender == 'M'
                        ? 'Male'
                        : userProfile.gender == 'F'
                        ? 'Female'
                        : 'Custom'}
                    </Text>
                  </View>
                ) : null}

                {isEnabledEmail && userProfile.email != null && (
                  <View style={styles.view_Row}>
                    <Text style={styles.view_Tv_1}>Email:</Text>
                    <Text style={styles.view_Tv_2}>{userProfile.email}</Text>
                  </View>
                )}

                {isEnabled && userProfile.phone != null && (
                  <View style={styles.view_Row}>
                    <Text style={styles.view_Tv_1}>Phone :</Text>
                    <Text style={styles.view_Tv_2}>{userProfile.phone}</Text>
                  </View>
                )}

                {isEnabledCity && userProfile.location.city_name != null && (
                  <View style={styles.view_Row}>
                    <Text style={styles.view_Tv_1}>City :</Text>
                    <Text style={styles.view_Tv_2}>
                      {userProfile.location.city_name}
                    </Text>
                  </View>
                )}

                {isEnabledProfession && userProfile.work_detail.length > 0 && (
                  <View style={styles.view_Row}>
                    <Text style={styles.view_Tv_1}>Profession :</Text>
                    <Text style={styles.view_Tv_2}>
                      {userProfile.work_detail[0].job_title}
                    </Text>
                  </View>
                )}

                {isEnabledProfession && userProfile.work_detail.length > 0 && (
                  <View style={styles.view_Row}>
                    <Text style={styles.view_Tv_1}>
                      {userProfile.work_detail[0].company_name}
                    </Text>
                  </View>
                )}
                {isEnabledProfession && userProfile.work_detail.length > 0 && (
                  <View style={styles.view_Row}>
                    <Text style={styles.view_Tv_1}>
                      {userProfile.work_detail[0].start_date}
                    </Text>
                    <Text style={styles.view_Tvv_}>{'-'}</Text>
                    {userProfile.work_detail[0].is_currently_work ? (
                      <Text style={styles.view_Tvv_}>{'Present'}</Text>
                    ) : (
                      <Text style={styles.view_Tv_1}>
                        {userProfile.work_detail[0].end_date}
                      </Text>
                    )}
                  </View>
                )}

                {isEnabledProfession && userProfile.work_detail.length > 0 && (
                  <View style={styles.view_Row}>
                    <Text style={styles.view_Tv_1}>
                      {userProfile.work_detail[0].work_country}
                    </Text>
                    <Text style={styles.view_Tvv_}>
                      {userProfile.work_detail[0].work_state}
                    </Text>
                    <Text style={styles.view_Tvv_}>
                      {userProfile.work_detail[0].work_city}
                    </Text>
                  </View>
                )}
              </View>
            </Card>
            {userProfile != '' && (
              <Card style={styles.cardContent}>
                <View style={styles.cardtitlecontent}>
                  <Text style={styles.cardtitletext}>Posts</Text>
                </View>
                <View style={styles.borderstyle}></View>
                <View style={styles.tabrowContainer}>
                  <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => gotoChangeTab('thData')}>
                      <Icon
                        name="th"
                        size={30}
                        color={data === 'thData' ? '#4B2A6A' : 'grey'}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => gotoChangeTab('Image')}>
                      <Icon
                        name="image"
                        size={30}
                        color={data === 'Image' ? '#4B2A6A' : 'grey'}
                        style={{marginLeft: 80}}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </Card>
            )}
            {userProfile != '' &&
            userProfile.social_post.length > 0 &&
            (userProfile.follow_request_status == 2 ||
              !userProfile.social_account_status) &&
            !userProfile.block_user_active &&
            !(data === 'Image') ? (
              <FlatList
                key={'#'}
                numColumns={2}
                data={userProfile.social_post}
                renderItem={({item}) => {
                  let items = item;
                  let len =
                    item.post_gallery != null ? item.post_gallery.length : 0;
                  if (item.post_gallery == null) {
                    let s = item.caption;
                    var parts = s.match(/[\s\S]{1,140}/g) || [];
                    console.log(parts);
                    var lenCap = parts.length;
                  }
                  if (item.post_gallery != null) {
                    return (
                      // <>
                      //   <Carousel
                      //     // layout={'tinder'}
                      //     ref={isCarousel}
                      //     data={item.post_gallery}
                      //     renderItem={({item, index}) => (
                      //       <CrouselImages
                      //         item={item}
                      //         index={index}
                      //         length={len}
                      //         data={data}
                      //         goToNavigate={GoToNavigate}
                      //         items={items}
                      //         ref={ref}
                      //       />
                      //     )}
                      //     sliderWidth={screenWidth - 16}
                      //     itemWidth={screenWidth - 16}
                      //     layoutCardOffset={'0'}
                      //     onSnapToItem={index => setIndex(index)}
                      //   />
                      // </>
                      <>
                        <CrouselImages
                          item={item.post_gallery[0]}
                          index={index}
                          goToNavigate={GoToNavigate}
                          items={items}
                          ref={ref}
                        />
                      </>
                    );
                  } else {
                    return (
                      <View
                        style={{
                          width: screenWidth / 2,
                          height: screenWidth / 2,
                          // backgroundColor: 'red',
                        }}>
                        <Carousel
                          // layout={'tinder'}
                          ref={isCarouselText}
                          data={parts}
                          renderItem={({item, index}) => (
                            <CrouselText
                              item={item}
                              index={index}
                              length={lenCap}
                              data={data}
                              goToNavigate={GoToNavigate}
                              items={items}
                            />
                          )}
                          sliderWidth={screenWidth / 2 - 8}
                          itemWidth={screenWidth / 2 - 8}
                          layoutCardOffset={0}
                          onSnapToItem={index => setIndex(index)}
                        />
                      </View>
                    );
                  }
                }}
                //  ItemSeparatorComponent={renderIndicator}
              />
            ) : userProfile != '' &&
              userProfile.social_post.length > 0 &&
              (userProfile.follow_request_status == 2 ||
                !userProfile.social_account_status) &&
              !userProfile.block_user_active ? (
              <FlatList
                key={'_'}
                numColumns={1}
                data={userProfile.social_post}
                renderItem={({item, index}) => {
                  let ind = index;
                  let items = item;
                  let len =
                    item.post_gallery != null ? item.post_gallery.length : 0;
                  if (item.post_gallery == null) {
                    let s = item.caption;
                    var parts = s.match(/[\s\S]{1,140}/g) || [];
                    console.log(parts);
                    var lenCap = parts.length;
                  }
                  return (
                    <RenderItem
                      goToNavigate={goToNavigate}
                      gotoChangeComment={gotoChangeComment}
                      gotoComment={gotoComment}
                      gotoShowMore={gotoShowMore}
                      gotoCommentLike={gotoCommentLike}
                      gotoChangeToggle={gotoChangeToggle}
                      gotoLikeUnLike={gotoLikeUnLike}
                      toggleModal3={toggleModal3}
                      data={data}
                      user_id={user_id}
                      userid={userid}
                      username={username}
                      isCarouselText={isCarouselText}
                      isCarousel={isCarousel}
                      userProfile={userProfile}
                      props={props}
                      ind={ind}
                      len={len}
                      parts={parts}
                      lenCap={lenCap}
                      item={item}
                      index={index}
                      items={items}
                      goToNav={GoToNavigate}
                      ref={ref}
                    />
                  );
                }}
                //  ItemSeparatorComponent={renderIndicator}
              />
            ) : !userProfile.block_user_active &&
              userProfile.social_account_status &&
              userProfile.follow_request_status != 2 ? (
              <View
                style={{
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: '#000',
                  marginHorizontal: 16,
                  marginTop: 16,
                  paddingVertical: 32,
                }}>
                <Text style={{fontWeight: '700', fontSize: 18}}>
                  This Account Is Private
                </Text>
              </View>
            ) : (
              <View />
            )}

            {userProfile != '' &&
              userProfile.social_post.length == 0 &&
              (userProfile.follow_request_status == 2 ||
                !userProfile.social_account_status) &&
              !userProfile.block_user_active && (
                <View
                  style={{
                    margin: 16,
                    borderColor: '#000',
                    borderWidth: 1,
                    padding: 16,
                    alignItems: 'center',
                  }}>
                  <Text>No Post Uploaded</Text>
                </View>
              )}

            {userProfile != '' && userProfile.block_user_active && (
              <View
                style={{
                  margin: 16,
                  borderColor: '#000',
                  borderWidth: 1,
                  padding: 16,
                  alignItems: 'center',
                }}>
                <Text>User Blocked</Text>
              </View>
            )}
          </ScrollView>
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
            <View style={{paddingHorizontal: 16, alignItems: 'center'}}>
              <Text
                style={{fontWeight: 'bold', fontSize: hp(2.2), marginTop: 25}}>
                {!(userProfile.follow_request_status == 1)
                  ? 'Are you sure you want to unfollow'
                  : 'Are you sure you want to cancel the Request?'}
              </Text>
            </View>
            <View
              style={{
                borderWidth: 0.5,
                borderColor: 'lightgrey',
                width: '100%',
                marginTop: 30,
              }}></View>

            <TouchableOpacity onPress={gotoRemove}>
              <Text style={{color: 'rgb(70,50,103)', marginTop: 10}}>Yes</Text>
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
              <Text style={{color: 'red', marginTop: 10}}>No</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        {/* modal for report profile */}
        <Modal
          isVisible={isreportprofilemodal}
          onBackdropPress={reportprofilemodal}
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
                  Report Profile
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={reportprofilemodal}>
                <Image
                  source={Images.closeicon}
                  style={{height: 15, width: 15, marginRight: 10}}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.mborder}></View>
            <View style={{paddingHorizontal: 16}}>
              {checkboxValue.map((checkbox, i) => (
                <View key={i} style={styles.rowContent}>
                  <Text style={styles.reporttext}>
                    {checkbox.report_option}
                  </Text>

                  <TouchableOpacity
                    onPress={() => checkboxHandler(checkbox, i)}>
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
              style={{alignItems: 'flex-end', marginTop: 10, marginRight: 10}}>
              <TouchableOpacity
                style={styles.postbtn}
                onPress={gotoReportProfile}>
                <Text style={{color: 'white'}}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal
          isVisible={isModalVisible3}
          onBackdropPress={toggleModal3}
          backdropOpacity={0.4}>
          <View
            style={{
              alignItems: 'center',
              backgroundColor: 'white',
              paddingVertical: 20,
              borderRadius: 5,
              justifyContent: 'center',
            }}>
            <>
              <TouchableOpacity onPress={reportmodal}>
                <Text style={styles.btn}>Report</Text>
              </TouchableOpacity>
              <View style={styles.mborder}></View>
            </>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('PostDetailScreen', {
                  item: customItem,
                });
              }}>
              <Text style={[styles.btn, {color: 'black'}]}>Go to Post</Text>
            </TouchableOpacity>
            <View style={styles.mborder}></View>
            <TouchableOpacity onPress={toggleModal3}>
              <Text style={[styles.btn, {color: 'rgb(70,50,103)'}]}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
        {/* modal for report */}
        <Modal
          isVisible={isreportmodal}
          onBackdropPress={reportmodal}
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
              <TouchableOpacity onPress={reportmodal}>
                <Image
                  source={Images.closeicon}
                  style={{height: 15, width: 15, marginRight: 10}}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.mborder}></View>
            <View style={{paddingHorizontal: 16}}>
              <Text style={{fontSize: hp(2.4)}}>
                Why are you reporting this?
              </Text>
              {reportcheckboxValue.map((checkbox, i) => (
                <View key={i} style={styles.rowContent}>
                  <Text style={styles.reporttext}>
                    {checkbox.report_option}
                  </Text>
                  {/* <CustomCheckbox
                onPress={(value) => checkboxHandler(value, i)}
                 checked={checkbox.checked}
              /> */}
                  <TouchableOpacity
                    onPress={() => reportcheckboxHandler(checkbox, i)}>
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
              style={{alignItems: 'flex-end', marginTop: 10, marginRight: 10}}>
              <TouchableOpacity
                style={styles.postbtn}
                onPress={() => gotoReport()}>
                <Text style={{color: 'white'}}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

function CrouselImages({items, item, index, goToNavigate, ref}) {
  let _menu = null;

  const gotoNavigate = () => {
    goToNavigate && goToNavigate(items);
  };
  return (
    <TouchableOpacity
      style={{
        alignItems: 'center',
        marginTop: 16,
        //  backgroundColor: index % 2 == 0 ? 'red' : 'green',
        marginStart: index % 2 == 0 ? 16 : 8,
        width: screenWidth / 2 - 24,
        height: screenWidth / 2 - 24,
        marginEnd: index % 2 == 0 ? 8 : 16,
      }}
      onPress={gotoNavigate}>
      {item.post_extension != 'mp4' ? (
        <Image
          source={{uri: item.post_image}}
          resizeMode="contain"
          style={{
            width: screenWidth / 2 - 24,
            height: screenWidth / 2 - 24,
            backgroundColor: '#d2d2d2',
          }}
        />
      ) : (
        // <Video
        //   key={item + 'sap'}
        //   //ref={ref}
        //   videoWidth={!(data === 'Image') ? screenWidth : screenWidth - 32}
        //   videoHeight={!(data === 'Image') ? screenWidth : screenWidth - 32}
        //   style={{
        //     backgroundColor: '#d2d2d2',
        //     alignSelf: 'center',
        //     width: !(data === 'Image') ? screenWidth : screenWidth - 32,
        //     height: !(data === 'Image') ? screenWidth : screenWidth - 32,
        //   }}
        //   video={{
        //     uri: item.post_image,
        //   }}
        //   // video={{ uri: coursepreview }}
        //   thumbnail={{uri: 'https://i.picsum.photos/id/866/1600/900.jpg'}}
        //   //resizeMode="contain"
        //   //showDuration
        //   //lockRatio={16 / 9}
        // />
        <View
          style={{
            width: screenWidth / 2 - 24,
            height: screenWidth / 2 - 24,
            backgroundColor: 'red',
            justifyContent: 'center',
          }}>
          <Video
            ref={ref}
            style={{
              width: screenWidth / 2 - 24,
              height: screenWidth / 2 - 24,
            }}
            url={item.post_image}
            placeholder={'https://i.picsum.photos/id/866/1600/900.jpg'}
            // rotateToFullScreen={false}
            hideFullScreenControl={true}
            inlineOnly={true}
            lockRatio={1}
            resizeMode="cover"
            autoplay
            //  theme={theme}
            // onBackPress={() => this.props.navigation.goBack(null)}
            //  placeholderStyle={{width: width - 32, height: height / 4}}
            //on
            //FullScreen={this.onFullScreen}
          />
        </View>
      )}
      {/* {length > 1 && (
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
      )} */}
    </TouchableOpacity>
  );
}

function CrouselText({items, goToNavigate, item, index, length, data}) {
  const gotoNavigate = () => {
    goToNavigate && goToNavigate(items);
  };

  return (
    <TouchableOpacity
      style={{
        alignItems: 'center',
        marginTop: 16,
        //  backgroundColor: index % 2 == 0 ? 'red' : 'green',
        marginStart: index % 2 == 0 ? 16 : 8,
        width: screenWidth / 2 - 24,
        height: screenWidth / 2 - 24,
        marginEnd: index % 2 == 0 ? 8 : 16,
      }}
      onPress={gotoNavigate}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          width: screenWidth / 2 - 24,
          height: screenWidth / 2 - 24,
          //backgroundColor: 'red',
        }}>
        <View
          style={{
            backgroundColor: '#4B2A6A',
            height: 1,
            width: '84%',
            marginEnd: 32,
            alignSelf: 'center',
          }}></View>
        <Text
          style={{
            color: '#4B2A6A',
            fontSize: 40,
            textAlign: 'left',
            alignSelf: 'flex-start',
            marginStart: 16,
          }}>
          “
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '700',
            color: '#4B2A6A',
            marginHorizontal: 32,
            marginEnd: 64,
          }}>
          {item}
        </Text>
        <Text
          style={{
            color: '#4B2A6A',
            fontSize: 40,
            textAlign: 'right',
            alignSelf: 'flex-end',
            marginEnd: 48,
          }}>
          ”
        </Text>
        <View
          style={{
            backgroundColor: '#4B2A6A',
            height: 1,
            width: '84%',
            marginEnd: 32,
            alignSelf: 'center',
          }}></View>
      </View>
      {length > 1 && (
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
      )}
    </TouchableOpacity>
  );
}

export default UsersProfile;
