import React, {Component, FC, useState, useEffect, useRef} from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  TextInput,
  Keyboard,
  BackHandler,
  Alert,
  Dimensions,
} from 'react-native';
import Modal from 'react-native-modal';
import {Images} from '../../../../../components/index';
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
import styles from './style.tsx';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {
  NavigationContainer,
  useIsFocused,
  DrawerActions,
  useFocusEffect,
} from '@react-navigation/native';
import images from '../../../../../components/images';
import {SafeAreaView} from 'react-native-safe-area-context';
import * as userActions from '../../../../../actions/user-actions-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import CardView from 'react-native-cardview';
import ProgressLoader from 'rn-progress-loader';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import RenderItem from './RenderItem';
import Video from 'react-native-video-player';
const screenWidth = Dimensions.get('window').width - 32;
export const SLIDER_WIDTH = Dimensions.get('window').width - 32;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);

const SchoolProfile = (props: SchoolProfileProps) => {
  const {
    item: {school_id, user_id},
  } = props.route.params;
  console.log('school_id=====>>user_id', school_id);
  const ref = useRef();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [data, active_data] = useState('th');
  const [isLoading, setLoading] = useState(false);
  const [schoolDetail, setSchoolDetail] = useState('');
  const [index, setIndex] = useState(0);
  const [commentValue, setComment] = useState('');
  const [reportId, setReportId] = useState('');
  const [customItem, setCustomItem] = useState('');
  const [reason, addreason] = useState('');
  const [threeDot, setthreeDot] = useState(false);
  const [checkboxValue, setCheckboxValue] = useState([]);
  const [isreportprofilemodal, setreportprofilemodal] = useState(false);
  const [isreportmodal, setreportmodal] = useState(false);
  const [isModalVisible3, setModalVisible3] = useState(false);
  const [tempSchoolId, setSchoolId] = useState('');
  const [username, setuserName] = useState('');
  const [firebaseid, setUserFirebaseId] = useState('');

  const [userid, setUserid] = useState('');
  const [alumni, setAlumni] = useState(false);
  const threedot = () => {
    setthreeDot(true);
  };

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

  const reportcheckboxHandler = (value, index) => {
    console.log('value==>>>>>>>>>', value);
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
    console.log('NewValue', newValue);
    setreportCheckboxValue(newValue);
  };

  const checkboxHandler = (value, index) => {
    // setshowtextinput(true)
    console.log('value==>>', value);
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

  const reportprofilemodal = () => {
    setreportprofilemodal(!isreportprofilemodal);
    // setreportmodal('');
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

  const blockprofile = async () => {
    setthreeDot(false);
    Alert.alert(
      'ZatchUp',
      ' Are you sure you want to Block Profile?',
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
      type: 'school',
      parameter: 'type_of_user',
    };

    dispatch(
      userActions.getReportDataUser({
        data,
        callback: ({result, error}) => {
          if (result) {
            console.warn(
              'after result report data school',
              JSON.stringify(result, undefined, 2),
              //  props.navigation.navigate('OtpLogin', { 'firebase_id': result.firebase_username, 'username': email })
            );
            if (result.status) {
              let newData = [];
              for (let i in result.data) {
                newData.push({...result.data[i], checked: false});
              }

              console.log('newDataUser==>>', newData);
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
            console.warn(
              'after result report data post',
              JSON.stringify(result, undefined, 2),
              //  props.navigation.navigate('OtpLogin', { 'firebase_id': result.firebase_username, 'username': email })
            );
            if (result.status) {
              let newData = [];
              for (let i in result.data) {
                newData.push({...result.data[i], checked: false});
              }

              console.log('newDataa==>>', newData);
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
      profile_report_comment: reason,
    };
    setreportprofilemodal(!isreportprofilemodal);

    // console.log('data==>>>', data);
    // return;

    dispatch(
      userActions.reportProfile({
        data,
        callback: ({result, error}) => {
          if (result) {
            console.warn(
              'after result report profile',
              JSON.stringify(result, undefined, 2),
              //  props.navigation.navigate('OtpLogin', { 'firebase_id': result.firebase_username, 'username': email })
            );
            if (result.status) {
              addreason('');
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

    console.log('ReportPost==>>', data);

    dispatch(
      userActions.reportPost({
        data,
        callback: ({result, error}) => {
          if (result) {
            console.warn(
              'after result report data',
              JSON.stringify(result, undefined, 2),
              //  props.navigation.navigate('OtpLogin', { 'firebase_id': result.firebase_username, 'username': email })
            );
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
    if (tempSchoolId == '') {
      console.log('hey School');
      getAuthUserInfoApi();
      getSchoolProfile(school_id, false);
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
              setUserFirebaseId(result.user_firebase_id),
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

  const getSchoolProfile = async (school_id, status) => {
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
      school_id: school_id,
      alumni_gallery: status,
    };
    //setLoading(true);
    dispatch(
      userActions.getSchoolProfile({
        data,
        callback: ({result, error}) => {
          if (result) {
            setLoading(false);
            console.warn(
              'after result school profile details',
              JSON.stringify(result, undefined, 2),
              //  props.navigation.navigate('OtpLogin', { 'firebase_id': result.firebase_username, 'username': email })
            );

            if (result.status) {
              setSchoolId(school_id);
              // let newArr = [];
              // for (let i in result.data[0].social_post) {
              //   newArr.push({
              //     ...result.data[0].social_post[i],
              //     //commentValue: '',
              //     commentToggle: false,
              //   });
              // }

              let newArrr = [];

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

              console.log('NewArray==>>', newArrr);

              let newObject = {...result.data[0], social_post: newArrr};

              console.log('+++++', newObject);

              setSchoolDetail(newObject);
            } else {
              setSchoolDetail('');
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
            console.warn(
              'after result comment on post',
              JSON.stringify(result, undefined, 2),
              //  props.navigation.navigate('OtpLogin', { 'firebase_id': result.firebase_username, 'username': email })
            );
            setLoading(false);
            getSchoolProfile(school_id, false);
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
            getSchoolProfile(school_id, false);
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
    let newObj = Object.assign({}, schoolDetail);
    for (let i in schoolDetail.social_post) {
      if (!schoolDetail.social_post[i].commentToggle) {
        setComment('');
      }
      if (i == index) {
        newObj.social_post[i].commentToggle = true;
      } else {
        newObj.social_post[i].commentToggle = false;
      }
    }
    console.log('newObj', newObj);
    setSchoolDetail(newObj);
  };

  const gotoChangeComment = (text, index) => {
    console.log(text, index);

    let newObj = Object.assign({}, schoolDetail);

    for (let i in schoolDetail.social_post) {
      if (i == index) {
        newObj.social_post[i].commentValue = text;
      } else {
        newObj.social_post[i].commentValue = '';
      }
    }

    console.log('After Change==>>', newObj);

    setSchoolDetail(newObj);
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
            console.warn(
              'after result like or unlike',
              JSON.stringify(result, undefined, 2),
              //  props.navigation.navigate('OtpLogin', { 'firebase_id': result.firebase_username, 'username': email })
            );
            setLoading(false);
            getSchoolProfile(school_id, false);
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

  const gotoShowMore = (ind, index) => {
    console.log(ind, index);

    let newArr = Object.assign([], schoolDetail.social_post);

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

    let newObject = {...schoolDetail, social_post: newArr};

    console.log('+++++', newObject);

    setSchoolDetail(newObject);
  };

  const isCarousel = useRef(null);
  const isCarouselText = useRef(null);

  const GoToNavigate = items => {
    console.log('item', items);
    props.navigation.navigate('PostDetailScreen', {item: items});
  };

  const gotoCallAlumni = () => {
    getSchoolProfile(school_id, !alumni);
    setAlumni(prev => !prev);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        {isLoading && renderIndicator()}
        <HeaderTitleWithBack
          navigation={props.navigation}
          headerTitle="School Profile"
        />

        {schoolDetail != '' && (
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
                  schoolDetail.cover_pic != null
                    ? {uri: schoolDetail.cover_pic}
                    : Images.cover_pic_default
                }
                resizeMode="stretch"
                style={{width: '100%', height: 100}}>
                {/* <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View></View>
                <View
                  style={{
                  //  backgroundColor: 'black',
                    height: 30,
                    width: 30,
                    justifyContent: 'center',
                    margin: 10,
                    alignItems: 'center',
                  }}>
                  <Icon name="ellipsis-v" color="white" size={20} />
                </View>
                
              </View> */}
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
                      {/* <Text style={{fontSize: hp(2), marginTop: 10}}>
                      Block Profile
                    </Text> */}
                    </TouchableOpacity>
                  </View>
                )}
              </ImageBackground>

              <View style={styles.rowContainer}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View>
                    <Image
                      source={
                        schoolDetail.profile_pic != null
                          ? {uri: schoolDetail.profile_pic}
                          : Images.profile_default
                      }
                      style={{
                        // marginLeft: 10,
                        width: 80,
                        height: 80,
                        borderRadius: 50,
                      }}
                    />
                    {/* <Icon
                                    name={'camera'}
                                    size={15}
                                    style={{
                                        backgroundColor: '#ccc',
                                        position: 'absolute',
                                        right: 0,
                                        bottom: 0,
                                        marginRight: 8,
                                    }}
                                /> */}
                    {schoolDetail.user_school_active && (
                      <Image
                        style={{
                          position: 'absolute',
                          right: 0,
                          bottom: 0,
                          marginLeft: 16,
                          width: 25,
                          height: 25,
                        }}
                        source={Images.blue_tick}
                      />
                    )}
                  </View>

                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginLeft: 10,
                        marginTop: 30,
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          props.navigation.navigate('PostDetailScreen');
                        }}>
                        <View style={{alignItems: 'center', marginTop: 10}}>
                          <Text style={styles.nametext}>
                            {schoolDetail.name_of_school}
                          </Text>
                          <Text style={{marginLeft: 20, fontSize: 15}}>
                            {schoolDetail.school_code}
                          </Text>
                        </View>
                      </TouchableOpacity>
                      {/* <Icon
                    name="check-circle"
                    size={18}
                    color="#4E387E"
                    style={{margin: 12}}
                  /> */}
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.likecontainer}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 10,
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      props.navigation.navigate('FollowersScreen', {
                        item: {...schoolDetail, flag: 'school'},
                      });
                    }}>
                    <Text style={styles.boldText}>
                      {schoolDetail.social_user_followers}
                    </Text>
                    <Text>Followers</Text>
                  </TouchableOpacity>

                  <View
                    style={{
                      marginLeft: 20,
                      backgroundColor: 'green',
                      width: 85,
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: 28,
                      borderRadius: 5,
                    }}>
                    <Text style={{color: 'white', fontWeight: 'bold'}}>
                      Following
                    </Text>
                  </View>
                </View>
                <View style={{marginTop: 10}}>
                  <TouchableOpacity
                    style={{}}
                    // onPress={() => {
                    //   props.navigation.navigate('Messages');
                    // }}>

                    onPress={() =>
                      props.navigation.navigate('GetVerifyWebView', {
                        user_id: user_id,
                        school_id: school_id,
                        id: firebaseid,
                        getVerify: 0,
                      })
                    }>
                    <Icon name="envelope" size={24} color="grey" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.addresscontainer}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.addresstext}> School Address : </Text>
                <Text style={{color: 'black'}}>
                  {schoolDetail.address1 + '' + schoolDetail.address2}
                </Text>
              </View>
            </View>
            <View style={styles.paragraphcontainer}>
              <Text style={{color: 'black', textAlign: 'justify'}}>
                <Text style={styles.overviewtext}>School Overview : </Text>
                {schoolDetail.overview}
              </Text>
            </View>
            <View
              style={[
                styles.totalstudentcontainer,
                {backgroundColor: 'honeydew'},
              ]}>
              <Text style={{fontSize: 15}}>Number of Students</Text>
              <Text style={[styles.numbertext, {color: 'green'}]}>
                {schoolDetail.total_student}
              </Text>
            </View>
            <View
              style={[
                styles.totalstudentcontainer,
                {backgroundColor: 'lightgrey'},
              ]}>
              <Text style={{fontSize: 15}}>Number of alumni on ZatchUp</Text>
              <Text style={[styles.numbertext, {color: '#4E387E'}]}>
                {schoolDetail.total_alumni}
              </Text>
            </View>
            <Card style={styles.cardContent}>
              <View style={styles.cardtitlecontent}>
                <Text style={styles.cardtitletext}>Posts</Text>
                <TouchableOpacity
                  style={styles.postbtn}
                  // onPress={() => {
                  //   props.navigation.navigate('AlumniGalleryScreen', {
                  //     item: schoolDetail,
                  //   });
                  // }}
                  onPress={() => gotoCallAlumni()}>
                  <Text style={{color: 'white', fontWeight: 'bold'}}>
                    Alumni Gallery
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.borderstyle}></View>
              <View style={styles.tabrowContainer}>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => active_data('th')}>
                    <Icon
                      name="th"
                      size={30}
                      color={data === 'th' ? '#4B2A6A' : 'grey'}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => active_data('Image')}>
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
            {schoolDetail != '' && !(data === 'Image') ? (
              <FlatList
                key={'#'}
                numColumns={2}
                data={schoolDetail.social_post}
                contentContainerStyle={{alignItems: 'center'}}
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
                      // <Carousel
                      //   // layout={'tinder'}
                      //   ref={isCarousel}
                      //   data={item.post_gallery}
                      //   renderItem={({item, index}) => (
                      //     <CrouselImages
                      //       item={item}
                      //       index={index}
                      //       length={len}
                      //       data={data}
                      //       goToNavigate={GoToNavigate}
                      //       items={items}
                      //       ref={ref}
                      //     />
                      //   )}
                      //   sliderWidth={screenWidth + 16}
                      //   itemWidth={screenWidth + 16}
                      //   layoutCardOffset={'0'}
                      //   onSnapToItem={index => setIndex(index)}
                      // />
                      <CrouselImages
                        item={item.post_gallery[0]}
                        index={index}
                        goToNavigate={GoToNavigate}
                        items={items}
                        ref={ref}
                      />
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
                //  keyExtractor={item => item.id}
                //style={{alignSelf: 'center'}}
              />
            ) : (
              <FlatList
                key={'_'}
                numColumns={1}
                data={schoolDetail.social_post}
                renderItem={({item, index}) => {
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
                      userid={userid}
                      gotoChangeComment={gotoChangeComment}
                      gotoComment={gotoComment}
                      gotoShowMore={gotoShowMore}
                      gotoCommentLike={gotoCommentLike}
                      gotoChangeToggle={gotoChangeToggle}
                      gotoLikeUnLike={gotoLikeUnLike}
                      toggleModal3={toggleModal3}
                      data={data}
                      isCarouselText={isCarouselText}
                      isCarousel={isCarousel}
                      props={props}
                      schoolDetail={schoolDetail}
                      len={len}
                      items={items}
                      item={item}
                      index={index}
                      parts={parts}
                      lenCap={lenCap}
                      goToNav={GoToNavigate}
                      ref={ref}
                    />
                  );
                }}
                //  ItemSeparatorComponent={renderIndicator}
              />
            )}

            {schoolDetail != '' && schoolDetail.social_post.length == 0 && (
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
          </ScrollView>
        )}
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
                <View>
                  <View key={i} style={styles.rowContent}>
                    <Text style={styles.reporttext}>
                      {checkbox.report_option}
                    </Text>
                    {/* <CustomCheckbox
                onPress={(value) => checkboxHandler(value, i)}
                 checked={checkbox.checked}
              /> */}
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
                  {checkbox.checked && (
                    <View>
                      {checkbox.report_option == 'Other' && (
                        <View style={styles.textinputContainer}>
                          <TextInput
                            placeholder="Reason"
                            multiline={true}
                            numberOfLines={4}
                            style={styles.textinput}
                            onChangeText={val => addreason(val)}
                            value={reason}
                            maxLength={700}
                          />
                        </View>
                      )}
                    </View>
                  )}
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
            {/* {customItem.user_id != userid && ( */}
            <>
              <TouchableOpacity onPress={reportmodal}>
                <Text style={styles.btn}>Report</Text>
              </TouchableOpacity>
              <View style={styles.mborder}></View>
              {/* <TouchableOpacity
               onPress={() => blockprofile()}
               >
                <Text style={styles.btn}>Unfollow</Text>
              </TouchableOpacity> */}
              {/* <View style={styles.mborder}></View> */}
            </>
            {/* )} */}
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
        //   videoWidth={!(data === 'Image') ? screenWidth : screenWidth}
        //   videoHeight={!(data === 'Image') ? screenWidth : screenWidth}
        //   style={{
        //     backgroundColor: '#d2d2d2',
        //     alignSelf: 'center',
        //     width: !(data === 'Image') ? screenWidth : screenWidth,
        //     height: !(data === 'Image') ? screenWidth : screenWidth,
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
            margin: 10,
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

export default SchoolProfile;
