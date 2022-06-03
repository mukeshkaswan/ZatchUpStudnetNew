import React, {Component, FC, useEffect, useState, useRef} from 'react';
import {
  Text,
  View,
  Dimensions,
  BackHandler,
  FlatList,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  Keyboard,
} from 'react-native';
import styles from './styles';
import {Images, Colors} from '../../../../../components/index';
//import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  TextField,
  CustomButton,
  CustomStatusBar,
  Validate,
  CustomHeader,
  BackBtn,
  HeaderTitleWithBack,
} from '../../../../../components';
import {CheckBox} from 'react-native-elements';
import Modal from 'react-native-modal';
import {
  NavigationContainer,
  useIsFocused,
  useFocusEffect,
} from '@react-navigation/native';
import CardView from 'react-native-cardview';
import {useDispatch, useSelector} from 'react-redux';
import * as userActions from '../../../../../actions/user-actions-types';
import Toast from 'react-native-simple-toast';
import ProgressLoader from 'rn-progress-loader';
import {Card} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import Video from 'react-native-video-player';
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
];

const data1 = [
  {
    id: 1,
    Text: 'School Reminder 1',
  },
  {
    id: 2,
    Text: 'School Reminder 2',
  },
  {
    id: 3,
    Text: 'School Reminder 3',
  },
  {
    id: 4,
    Text: 'School Reminder 4',
  },
];

interface PostDetailsScreenProps {
  navigation: any;
}

export const SLIDER_WIDTH = Dimensions.get('window').width - 32;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);

const PostDetailScreen = (props: NotificationsScreenProps) => {
  // console.log('props', props.route);
  const {
    item: {id, user_id},
  } = props.route.params;
  // console.log('+++++++', id);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [flagId, setFlagId] = useState(id);
  const [pId, setPId] = useState(id);
  const [isLoading, setLoading] = useState(false);
  const [setdatafromlist, setData] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [allSelected, setSelected] = useState(false);
  const [reply, showReply] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [postDetails, setPostDetails] = useState('');
  const [index, setIndex] = useState(0);
  const [postCommentToggle, setPostCommentToggle] = useState(false);
  const [comment, setComment] = useState('');
  const [isModalVisible3, setModalVisible3] = useState(false);
  const [captionPart, setCaptionPart] = useState([]);
  const [captionLength, setCaptionLength] = useState(0);
  const [reportId, setReportId] = useState('');
  const [allPost, setAllPost] = useState([]);
  const [userid, setUserid] = useState('');
  const [replyShowModal, setReplyShowModal] = useState(false);
  const [replyItem, setReplyItem] = useState('');
  const [key, setKey] = useState('');
  const [isModalVisibleLike, setModalVisibleLike] = useState(false);
  const toggleModalClose = () => {
    setModalVisibleLike(!isModalVisibleLike);
  };
  const [DATA, setDataLike] = useState([
    {
      id: '1',
      title: 'First Item',
    },
    {
      id: '2',
      title: 'Second Item',
    },
    {
      id: '3',
      title: 'Third Item',
    },
    {
      id: '4',
      title: 'Third Item',
    },
    {
      id: '5',
      title: 'Third Item',
    },
    {
      id: '7',
      title: 'Third Item',
    },
    {
      id: '8',
      title: 'Third Item',
    },
    {
      id: '9',
      title: 'Third Item',
    },
    {
      id: '10',
      title: 'Third Item',
    },
    {
      id: '11',
      title: 'Third Item',
    },
    {
      id: '12',
      title: 'Third Item',
    },
    {
      id: '13',
      title: 'Third Item',
    },
    {
      id: '14',
      title: 'Third Item',
    },
    {
      id: '15',
      title: 'Third Item',
    },
    {
      id: '16',
      title: 'Third Item',
    },
    {
      id: '17',
      title: 'Third Item',
    },
    {
      id: '18',
      title: 'Third Item',
    },
    {
      id: '19',
      title: 'Third Item',
    },
    {
      id: '20',
      title: 'Third Item',
    },
  ]);

  const toggleModal = () => {
    //Alert.alert('hello');
    gotoCallPostLikeApi();
  };

  const gotoCallPostLikeApi = async () => {
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
      post_id: postDetails.id,
    };
    setLoading(true);

    dispatch(
      userActions.gotoCallPostLikeApi({
        data,
        callback: ({result, error}) => {
          console.log('hey.......kamal1', result);
          setLoading(false);
          if (result.status) {
            setDataLike(result.data);
            setModalVisibleLike(!isModalVisibleLike);
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

  const renderItemLike = ({item}) => {
    return (
      <TouchableOpacity
        style={{
          paddingHorizontal: 16,
          paddingVertical: 8,
          flexDirection: 'row',
          alignItems: 'center',
        }}
        disabled={false}
        onPress={() => {
          item.user_role == 'EIREPRESENTATIVE'
            ? props.navigation.navigate('SchoolProfile', {
                item: {
                  user_id: item.post_like_user_id,
                  school_id: item.school_id,
                },
              })
            : item.post_like_user_id != userid
            ? props.navigation.navigate('UsersProfile', {
                item: {user_id: item.post_like_user_id},
              })
            : props.navigation.navigate('UserProfileScreen', {
                item: {user_id: item.post_like_user_id},
              });
        }}>
        <Image
          source={
            item.profile_pic != null
              ? {uri: item.profile_pic}
              : Images.profile_default
          }
          style={{height: 40, width: 40, borderRadius: 20}}
        />
        <Text style={{marginLeft: 10, fontWeight: '700'}}>
          {item.post_like_username}
        </Text>
      </TouchableOpacity>
    );
  };

  const toggleModal3 = (item: any) => {
    //setCustomItem(item);
    setModalVisible3(!isModalVisible3);
  };

  const setshowReplyModal = (item: any) => {
    //setCustomItem(item);
    setReplyShowModal(!replyShowModal);
  };
  const [isreportmodal, setreportmodal] = useState(false);
  const reportmodal = () => {
    setreportmodal(!isreportmodal);
    setModalVisible3('');
  };

  const reportmodalWithKey = key => {
    // setreportmodal(!isreportmodal);
    setModalVisible3('');

    setKey(key);

    if (key == 'delete') {
      gotoDeletePost();
    } else {
      setreportmodal(!isreportmodal);
    }
  };

  const gotoDeletePost = async () => {
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
      id: postDetails.id,
    };
    console.log(data);

    dispatch(
      userActions.deletePost({
        data,
        callback: ({result, error}) => {
          if (result) {
            console.warn(
              'after delete the post',
              JSON.stringify(result, undefined, 2),
              //  props.navigation.navigate('OtpLogin', { 'firebase_id': result.firebase_username, 'username': email })
            );
            props.navigation.goBack(null);
            //  setLoading(false);
            // getUserProfile(user_id);
            if (result.status) {
              Toast.show(result.message, Toast.SHORT);
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

  const gotoSetShowReplyModal = item => {
    setReplyItem(item);
    setReplyShowModal(true);
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

  const reportcheckboxHandler = (
    value: {report_option?: string; checked?: boolean; id?: any},
    index: number,
  ) => {
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

  const pressReply = (
    item: {
      parent: number;
      isComment: any;
      hasOwnProperty: (arg0: string) => any;
      reply_comment: string | any[] | null;
    },
    index: string | number,
  ) => {
    setPostCommentToggle(false);
    console.log(item);
    let newObj = Object.assign({}, postDetails);
    let newOb = Object.assign({}, postDetails);
    if (item.parent == 0) {
      for (let i in postDetails.comment_post) {
        if (i == index && !item.isComment) {
          newObj.comment_post[i].isComment = true;
        } else if (i == index && item.isComment) {
          console.log('hey...');
          newObj.comment_post[i].isComment = false;
        } else {
          newObj.comment_post[i].isComment = false;
        }
      }
      if (
        item.hasOwnProperty('reply_comment') &&
        item.reply_comment != null &&
        item.reply_comment.length > 0
      ) {
        for (let i in postDetails.comment_post) {
          for (let j in postDetails.comment_post[i].reply_comment) {
            newObj.comment_post[i].reply_comment[j].isComment = false;
          }
        }
      }
    } else {
      for (let i in postDetails.comment_post) {
        for (let j in postDetails.comment_post[i].reply_comment) {
          if (j == index && !item.isComment) {
            newOb.comment_post[i].reply_comment[j].isComment = true;
          } else if (j == index && item.isComment) {
            // console.log('hey...');
            newOb.comment_post[i].reply_comment[j].isComment = false;
          } else {
            newOb.comment_post[i].reply_comment[j].isComment = false;
          }
        }
      }
      for (let i in postDetails.comment_post) {
        newOb.comment_post[i].isComment = false;
      }

      console.log('NewObjInner', newOb);
    }
    setPostDetails(item.parent == 0 ? newObj : newOb);
    // showReply(true);
  };

  const gotoSetToggle = () => {
    setPostCommentToggle(true);
    let newObj = Object.assign({}, postDetails);
    for (let i in postDetails.comment_post) {
      newObj.comment_post[i].isComment = false;
    }
    for (let i in postDetails.comment_post) {
      if (
        newObj.comment_post[i].hasOwnProperty('reply_comment') &&
        newObj.comment_post[i].reply_comment != null &&
        newObj.comment_post[i].reply_comment.length > 0
      ) {
        for (let i in postDetails.comment_post) {
          for (let j in postDetails.comment_post[i].reply_comment) {
            newObj.comment_post[i].reply_comment[j].isComment = false;
          }
        }
      }
    }
    setPostDetails(newObj);
  };

  const gotoChangeComment = (
    text: string,
    item: {
      parent: number;
      hasOwnProperty: (arg0: string) => any;
      reply_comment: string | any[] | null;
      isComment: any;
    },
    index: string | number,
  ) => {
    console.log(item);
    let newObj = Object.assign({}, postDetails);
    let newOb = Object.assign({}, postDetails);
    if (item.parent == 0) {
      for (let i in postDetails.comment_post) {
        if (i == index && postDetails.comment_post[i].isComment) {
          newObj.comment_post[i].commentReplyValue = text;
        } else {
          newObj.comment_post[i].commentReplyValue = '';
        }
      }
      if (
        item.hasOwnProperty('reply_comment') &&
        item.reply_comment != null &&
        item.reply_comment.length > 0
      ) {
        for (let i in postDetails.comment_post) {
          for (let j in postDetails.comment_post[i].reply_comment) {
            newObj.comment_post[i].reply_comment[j].commentReplyValue = '';
          }
        }
      }
    } else {
      for (let i in postDetails.comment_post) {
        for (let j in postDetails.comment_post[i].reply_comment) {
          if (j == index && !item.isComment) {
            newOb.comment_post[i].reply_comment[j].commentReplyValue = text;
          } else if (j == index && item.isComment) {
            // console.log('hey...');
            newOb.comment_post[i].reply_comment[j].commentReplyValue = text;
          } else {
            newOb.comment_post[i].reply_comment[j].commentReplyValue = text;
          }
        }
      }
      for (let i in postDetails.comment_post) {
        newOb.comment_post[i].commentReplyValue = '';
      }
      console.log('NewObjInnerComment', newOb);
    }
    setPostDetails(item.parent == 0 ? newObj : newOb);
  };

  const gotoReplyComment = async (item, index, key) => {
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
    console.log(item, index, key);

    if (item.commentReplyValue.trim() == '') {
      Toast.show('Please enter the comment', Toast.SHORT);
      return;
    }

    const data = {
      token: token,
      comment_id: key == 'notReply' ? item.id : item.comment_on_post,
      reply_comment:
        key == 'reply'
          ? item.reply_username + ' - ' + item.commentReplyValue
          : item.commentReplyValue,
    };
    if (key != 'notReply') {
      data.user_id = postDetails.user_id;
    }
    console.log('-----++---', data);

    dispatch(
      userActions.replyComment({
        data,
        callback: ({result, error}) => {
          if (result) {
            console.warn(
              'after result reply the comment',
              JSON.stringify(result, undefined, 2),
              //  props.navigation.navigate('OtpLogin', { 'firebase_id': result.firebase_username, 'username': email })
            );
            setLoading(false);
            getPostDetails(id);
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

  const checkedterm = () => {
    setSelected(!allSelected);
  };

  useEffect(() => {
    getAuthUserInfoApi();
    getPostDetails(pId);
    // getAuthUserInfoApi();
    getReportPostData();
    getPostOfUser(user_id);
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
            setLoading(false);

            // console.warn(
            //   'after result Auth User INfo++++++',
            //   JSON.stringify(result, undefined, 2),
            //   //  setuserName(result.full_name),
            //   //  props.navigation.navigate('OtpLogin', { 'firebase_id': result.firebase_username, 'username': email })
            // );
            // console.log('USER_ID' + result.user_id),
            setUserid(result.user_id);
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
            // Toast.show('Invalid credentials', Toast.SHORT);
            setLoading(false);
            console.warn(JSON.stringify(error, undefined, 2));
          }
        },
      }),
    );
  };

  const gotoDeleteComment = async () => {
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
      id: replyItem.id,
      type: replyItem.type,
    };

    // console.log('DataCommetnDelete==>>', data);
    // return;

    dispatch(
      userActions.deleteComment({
        data,
        callback: ({result, error}) => {
          if (result) {
            console.warn(
              'delete the comment of user',
              JSON.stringify(result, undefined, 2),
              //  props.navigation.navigate('OtpLogin', { 'firebase_id': result.firebase_username, 'username': email })
            );
            if (result.status) {
              setReplyShowModal(!replyShowModal);
              getPostDetails(id);
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

  const getPostOfUser = async (id: any) => {
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
      user_id: id,
      count_type: false,
    };

    dispatch(
      userActions.getUserAllPost({
        data,
        callback: ({result, error}) => {
          if (result) {
            console.warn(
              'get all the post of user',
              JSON.stringify(result, undefined, 2),
              //  props.navigation.navigate('OtpLogin', { 'firebase_id': result.firebase_username, 'username': email })
            );
            if (result.status) {
              let newData = [];
              for (let i in result.data) {
                if (result.data[i].post_gallery != null) {
                  newData.push(result.data[i]);
                }
              }
              console.log('newDataOfAllPost', newData);
              setAllPost(newData);
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

  /**********get post details api */
  const getPostDetails = async (id: any) => {
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
      id: id,
    };
    //setLoading(true);
    dispatch(
      userActions.getPostDetails({
        data,
        callback: ({result, error}) => {
          if (result) {
            setLoading(false);
            if (result.data.length > 0) {
              getAuthUserInfoApi();
              console.warn(
                'after result post details',
                JSON.stringify(result, undefined, 2),
                //  props.navigation.navigate('OtpLogin', { 'firebase_id': result.firebase_username, 'username': email })
              );

              let newArr = [];
              for (let i in result.data[0].comment_post) {
                newArr.push({
                  ...result.data[0].comment_post[i],
                  commentReplyValue: '',
                  isComment: false,
                });
              }
              let newObject = {...result.data[0], comment_post: newArr};
              console.log('======', newObject);

              let newArrrr = [];
              for (let i in result.data[0].comment_post) {
                if (result.data[0].comment_post[i].reply_comment != null) {
                  var newArrr = [];
                  for (let j in result.data[0].comment_post[i].reply_comment) {
                    newArrr.push({
                      ...result.data[0].comment_post[i].reply_comment[j],
                      commentReplyValue: '',
                      isComment: false,
                      parent: 1,
                      showMore: false,
                    });
                  }
                }
                let params = {
                  ...result.data[0].comment_post[i],
                  reply_comment: newArrr,
                  commentReplyValue: '',
                  isComment: false,
                  parent: 0,
                  showMore: false,
                };
                if (
                  result.data[0].comment_post[i].reply_comment != null &&
                  result.data[0].comment_post[i].reply_comment.length > 0
                ) {
                  params.showReply = false;
                }
                newArrrr.push(params);
                newArrr = [];
              }

              console.log('=======++++', newArrrr);

              let newObjectInnner = {...result.data[0], comment_post: newArrrr};
              console.log('======', newObjectInnner);

              setPostDetails(newObjectInnner);
              // setSpinnerStart(false);

              if (result.data[0].post_gallery == null) {
                let s = result.data[0].caption;
                var parts = s.match(/[\s\S]{1,140}/g) || [];
                console.log(parts);
                setCaptionPart(parts);
                setCaptionLength(parts.length);
                //var lenCap = parts.length;
              }
              setLoading(false);
            }
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

  const gotoLikeUnlike = async (item: {
    parent: number;
    likes_status: any;
    reply_comment_likes: any;
    id: any;
  }) => {
    console.log(item);
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
      like: item.parent == 0 ? !item.likes_status : !item.reply_comment_likes,
    };
    if (item.parent == 0) {
      data.comment_id = item.id;
    } else {
      data.reply_comment_id = item.id;
    }
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
            getPostDetails(id);
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

  const gotoLikeUnLikePost = async () => {
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
      post_id: postDetails.id,
      like: !postDetails.like,
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
            getPostDetails(id);
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

  const gotoComment = async () => {
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

    if (comment.trim() == '') {
      Toast.show('Please enter the comment', Toast.SHORT);
      return;
    }

    const data = {
      token: token,
      post_id: postDetails.id,
      comment: comment,
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
            getPostDetails(id);
            setComment('');
            setPostCommentToggle(false);
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

  const isCarousel = useRef(null);
  const isCarouselText = useRef(null);

  function CrouselImages({item, index, length}) {
    return (
      <View
        style={{
          marginHorizontal: 16,
          alignItems: 'center',
        }}>
        {item.post_extension != 'mp4' ? (
          <Image
            source={{uri: item.post_image}}
            resizeMode="contain"
            style={{
              width: screenWidth - 64,
              height: screenWidth - 64,
              backgroundColor: '#d2d2d2',
            }}
          />
        ) : (
          <View style={{width: screenWidth - 64, height: screenWidth - 64}}>
            <Video
              key={item + 'sap'}
              //ref={ref}
              videoWidth={screenWidth - 64}
              videoHeight={screenWidth - 64}
              style={{
                backgroundColor: '#d2d2d2',
                alignSelf: 'center',
              }}
              video={{
                uri: item.post_image,
              }}
              // video={{ uri: coursepreview }}
              thumbnail={{uri: 'https://i.picsum.photos/id/866/1600/900.jpg'}}
              //resizeMode="contain"
              //showDuration
              //lockRatio={16 / 9}
            />
          </View>
        )}
        {length > 1 && (
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
        )}
      </View>
    );
  }

  function CrouselText({item, index, length}) {
    return (
      <View
        style={{
          //borderWidth: 0.5,
          // padding: 20,
          marginHorizontal: 8,
          //borderRadius: 20,
          alignItems: 'center',
          marginTop: 16,
          // backgroundColor: 'red',
          //  borderColor: 'grey',
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            width: screenWidth,
            height: screenWidth - 32,
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
      </View>
    );
  }

  const gotoNavigate = item => {
    setPId(item.id);
    props.navigation.push('PostDetailScreen', {item});
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={{
        borderRadius: 10,
        backgroundColor: 'white',
        margin: 5,
        padding: 8,
        alignItems: 'center',
      }}
      disabled={postDetails != '' && postDetails.id == item.id ? true : false}
      onPress={() =>
        postDetails != '' && postDetails.id == item.id ? {} : gotoNavigate(item)
      }>
      {item.post_gallery[0].post_extension != 'mp4' ? (
        <Image
          source={
            item.post_gallery[0].post_image != null
              ? {uri: item.post_gallery[0].post_image}
              : require('../../../../../assets/images/college2.jpg')
          }
          style={{height: screenWidth / 2 - 40, width: screenWidth / 2 - 40}}
        />
      ) : (
        <Video
          key={item + 'sap'}
          //ref={ref}
          videoWidth={screenWidth / 2 - 40}
          videoHeight={screenWidth / 2 - 40}
          style={{
            backgroundColor: '#d2d2d2',
            alignSelf: 'center',
            height: screenWidth / 2 - 40,
            width: screenWidth / 2 - 40,
          }}
          video={{
            uri: item.post_gallery[0].post_image,
          }}
          // video={{ uri: coursepreview }}
          thumbnail={{uri: 'https://i.picsum.photos/id/866/1600/900.jpg'}}
          //resizeMode="contain"
          //showDuration
          //lockRatio={16 / 9}
        />
      )}
    </TouchableOpacity>
  );

  const gotoShowReply = (index: string | number) => {
    console.log(index);

    let newArr = Object.assign({}, postDetails);

    for (let i in postDetails.comment_post) {
      if (i == index) {
        if (i == index && !newArr.comment_post[i].showReply) {
          newArr.comment_post[i].showReply = true;
        } else if (i == index && newArr.comment_post[i].showReply) {
          newArr.comment_post[i].showReply = false;
        } else {
          newArr.comment_post[i].showReply = false;
        }
      }
    }

    console.log('After Change==>>', newArr);

    setPostDetails(newArr);
  };

  const gotoShowMore = (index: string | number) => {
    console.log(index);

    let newArr = Object.assign({}, postDetails);

    for (let i in postDetails.comment_post) {
      if (i == index) {
        if (i == index && !newArr.comment_post[i].showMore) {
          newArr.comment_post[i].showMore = true;
        } else if (i == index && newArr.comment_post[i].showMore) {
          newArr.comment_post[i].showMore = false;
        } else {
          newArr.comment_post[i].showMore = false;
        }
      }
    }

    console.log('After Change==>>', newArr);

    setPostDetails(newArr);
  };

  const gotoShowMoreReplyComment = (
    ind: string | number,
    index: string | number,
  ) => {
    console.log(ind, index);

    let newArr = Object.assign({}, postDetails);

    for (let i in postDetails.comment_post) {
      if (i == ind) {
        for (let j in postDetails.comment_post[i].reply_comment) {
          if (
            j == index &&
            !postDetails.comment_post[i].reply_comment[j].showMore
          ) {
            newArr.comment_post[i].reply_comment[j].showMore = true;
          } else if (
            j == index &&
            postDetails.comment_post[i].reply_comment[j].showMore
          ) {
            newArr.comment_post[i].reply_comment[j].showMore = false;
          } else {
            newArr.comment_post[i].reply_comment[j].showMore = false;
          }
        }
      }
    }

    console.log('After Change==>>', newArr);

    //  let newObject = {...userProfile, social_post: newArr};

    //  console.log('+++++', newObject);

    setPostDetails(newArr);
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
      post_id: postDetails.id,
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

  return (
    <View style={styles.container}>
      {isLoading && renderIndicator()}
      <CustomStatusBar />
      <CustomHeader
        Title={'Post Details'}
        Back={'true'}
        navigation={props.navigation}
      />
      {postDetails != '' && (
        <ScrollView>
          <CardView
            cardElevation={5}
            cardMaxElevation={5}
            // cornerRadius={20}
            style={styles.card}>
            <View style={{marginTop: 16}}>
              {postDetails != '' && postDetails.post_gallery != null ? (
                <>
                  <Carousel
                    // layout={'tinder'}
                    ref={isCarousel}
                    data={postDetails.post_gallery}
                    renderItem={({item, index}) => (
                      <CrouselImages
                        item={item}
                        index={index}
                        length={postDetails.post_gallery.length}
                      />
                    )}
                    sliderWidth={screenWidth - 32}
                    itemWidth={screenWidth - 32}
                    layoutCardOffset={'0'}
                    autoplay={false}
                    onSnapToItem={(index: React.SetStateAction<number>) =>
                      setIndex(index)
                    }
                  />
                </>
              ) : (
                <Carousel
                  // layout={'tinder'}
                  ref={isCarouselText}
                  data={captionPart}
                  renderItem={({item, index}) => (
                    <CrouselText
                      item={item}
                      index={index}
                      length={captionLength}
                    />
                  )}
                  sliderWidth={SLIDER_WIDTH}
                  itemWidth={ITEM_WIDTH}
                  onSnapToItem={(index: React.SetStateAction<number>) =>
                    setIndex(index)
                  }
                />
              )}
            </View>
            <View style={styles.rowContainer}>
              <TouchableOpacity
                style={{flexDirection: 'row', alignItems: 'center'}}
                onPress={() => {
                  postDetails.user_role == 'EIREPRESENTATIVE'
                    ? props.navigation.navigate('SchoolProfile', {
                        item: {
                          user_id: postDetails.user_id,
                          school_id: postDetails.school_id,
                        },
                      })
                    : postDetails.user_id != userid
                    ? props.navigation.navigate('UsersProfile', {
                        item: {user_id: postDetails.user_id},
                      })
                    : props.navigation.navigate('UserProfileScreen', {
                        item: {user_id: postDetails.user_id},
                      });
                }}>
                <Image
                  source={
                    postDetails.profile_pic != null
                      ? {uri: postDetails.profile_pic}
                      : Images.profile_default
                  }
                  style={styles.profileImage}
                />
                <Text style={styles.nametext}>{postDetails.full_name}</Text>
              </TouchableOpacity>
              {/* <Text style={{fontWeight: 'bold', marginLeft: 30}}>
                Following
              </Text> */}
              <TouchableOpacity onPress={toggleModal3}>
                <Icon name="ellipsis-v" color="grey" size={20} />
              </TouchableOpacity>
            </View>
            {postDetails.post_gallery != null &&
              postDetails.comment_post != null &&
              postDetails.comment_post.length > 0 &&
              postDetails.comment_post.every(item => item.comment != '') &&
              postDetails.post_gallery.length > 0 && (
                <View
                  style={{
                    borderWidth: 0.2,
                    borderColor: 'grey',
                    marginVertical: 5,
                  }}></View>
              )}

            {postDetails.post_gallery != null && postDetails.length > 0 && (
              <View style={styles.rowContainer}>
                <TouchableOpacity
                  style={{flexDirection: 'row', alignItems: 'center'}}
                  onPress={() => {
                    postDetails.user_role == 'EIREPRESENTATIVE'
                      ? props.navigation.navigate('SchoolProfile', {
                          item: {
                            user_id: postDetails.user_id,
                            school_id: postDetails.school_id,
                          },
                        })
                      : postDetails.user_id != userid
                      ? props.navigation.navigate('UsersProfile', {
                          item: {user_id: postDetails.user_id},
                        })
                      : props.navigation.navigate('UserProfileScreen', {
                          item: {user_id: postDetails.user_id},
                        });
                  }}>
                  <Image
                    source={
                      postDetails.profile_pic != null
                        ? {uri: postDetails.profile_pic}
                        : Images.profile_default
                    }
                    style={styles.profileImage}
                  />
                  <View>
                    <Text style={styles.nametext}>{postDetails.full_name}</Text>
                    <Text style={styles.nametext}>{postDetails.caption}</Text>
                    <Text style={[styles.nametext, {fontWeight: '300'}]}>
                      {postDetails.post_created_on}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}

            <FlatList
              data={postDetails.comment_post}
              renderItem={({item, index}) => {
                let ind = index;
                if (item.comment != '' && item.comment != null) {
                  return (
                    <View>
                      <View style={styles.rowContainer}>
                        <View style={{flex: 1}}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              flex: 1,
                            }}>
                            <TouchableOpacity
                              onPress={() => {
                                item.user_role == 'EIREPRESENTATIVE'
                                  ? props.navigation.navigate('SchoolProfile', {
                                      item: {
                                        user_id: item.user,
                                        school_id: item.school_id,
                                      },
                                    })
                                  : item.user != userid
                                  ? props.navigation.navigate('UsersProfile', {
                                      item: {user_id: item.user},
                                    })
                                  : props.navigation.navigate(
                                      'UserProfileScreen',
                                      {
                                        item: {user_id: item.user},
                                      },
                                    );
                              }}>
                              <Image
                                source={
                                  item.comment_user_profile_pic != null
                                    ? {uri: item.comment_user_profile_pic}
                                    : Images.profile_default
                                }
                                style={{
                                  height: 40,
                                  width: 40,
                                  borderRadius: 50,
                                  //tintColor: 'grey',
                                }}
                              />
                            </TouchableOpacity>
                            <View style={{marginLeft: 10, flex: 2}}>
                              <TouchableOpacity
                                onPress={() => {
                                  item.user_role == 'EIREPRESENTATIVE'
                                    ? props.navigation.navigate(
                                        'SchoolProfile',
                                        {
                                          item: {
                                            user_id: item.user,
                                            school_id: item.school_id,
                                          },
                                        },
                                      )
                                    : item.user != userid
                                    ? props.navigation.navigate(
                                        'UsersProfile',
                                        {
                                          item: {user_id: item.user},
                                        },
                                      )
                                    : props.navigation.navigate(
                                        'UserProfileScreen',
                                        {
                                          item: {user_id: item.user},
                                        },
                                      );
                                }}>
                                <Text style={styles.nametext}>
                                  {item.comment_username}
                                </Text>
                              </TouchableOpacity>
                              <Text
                                style={{marginLeft: 10}}
                                numberOfLines={item.showMore ? 0 : 1}>
                                {item.comment}
                              </Text>
                            </View>
                          </View>
                          {item.comment.length > 40 && (
                            <TouchableOpacity
                              style={{marginStart: 60}}
                              onPress={() => gotoShowMore(index)}>
                              <Text>
                                {item.showMore ? '[Show Less]' : '[Show More]'}
                              </Text>
                            </TouchableOpacity>
                          )}
                        </View>
                        {/* <Icon name="ellipsis-v" color="grey" size={20} /> */}
                        <TouchableOpacity onPress={() => gotoLikeUnlike(item)}>
                          <Icon
                            name={item.likes_status ? 'star' : 'star-o'}
                            size={15}
                            color={'#000'}
                            style={{marginLeft: 5}}
                          />
                        </TouchableOpacity>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          marginLeft: 78,
                          alignItems: 'center',
                        }}>
                        <Text style={{fontSize: 12}}>
                          {item.comment_created_on}
                        </Text>
                        {item.likes > 0 && (
                          <Text style={[styles.liketext, {fontSize: 12}]}>
                            {item.likes + ' Like'}
                          </Text>
                        )}
                        <Text
                          style={[styles.liketext, {fontSize: 12}]}
                          onPress={() => pressReply(item, index)}>
                          Reply
                        </Text>
                        {userid == postDetails.user_id ? (
                          <TouchableOpacity
                            onPress={() =>
                              gotoSetShowReplyModal({...item, type: 'comment'})
                            }>
                            <Text style={[styles.liketext, {fontSize: 12}]}>
                              ...
                            </Text>
                          </TouchableOpacity>
                        ) : userid == item.user ? (
                          <TouchableOpacity
                            onPress={() =>
                              gotoSetShowReplyModal({...item, type: 'comment'})
                            }>
                            <Text style={[styles.liketext, {fontSize: 12}]}>
                              ...
                            </Text>
                          </TouchableOpacity>
                        ) : (
                          <View></View>
                        )}
                      </View>
                      {item.isComment ? (
                        <View>
                          <View style={styles.border}></View>
                          <View style={styles.rowContainer}>
                            <TextInput
                              multiline={true}
                              style={{
                                width: screenWidth - 120,
                              }}
                              placeholder="Reply Comment"
                              value={item.commentReplyValue}
                              onChangeText={text =>
                                gotoChangeComment(text, item, index)
                              }
                            />
                            <View
                              style={{
                                alignSelf: 'flex-end',
                                marginBottom: 5,
                                marginLeft: 5,
                              }}>
                              <TouchableOpacity
                                style={styles.postbtn}
                                onPress={() =>
                                  gotoReplyComment(item, index, 'notReply')
                                }>
                                <Text style={{color: 'white'}}>Reply</Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      ) : (
                        <View></View>
                      )}

                      {item.hasOwnProperty('showReply') && (
                        <View
                          style={{
                            marginStart: 80,
                            marginTop: 4,
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <View
                            style={{
                              backgroundColor: '#000',
                              height: 1,
                              width: 20,
                              marginEnd: 8,
                            }}></View>
                          <TouchableOpacity
                            onPress={() => gotoShowReply(index)}>
                            <Text style={{fontWeight: '700'}}>
                              {item.showReply
                                ? 'Hide reply(' +
                                  item.reply_comment.length +
                                  ')'
                                : 'View reply(' +
                                  item.reply_comment.length +
                                  ')'}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      )}
                      {item.reply_comment != null &&
                        item.hasOwnProperty('showReply') &&
                        item.showReply &&
                        item.reply_comment.length > 0 && (
                          <FlatList
                            style={{marginStart: 16}}
                            data={item.reply_comment}
                            renderItem={({item, index}) => (
                              <View>
                                <View style={styles.rowContainer}>
                                  <View style={{flex: 1}}>
                                    <View
                                      style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        flex: 1,
                                      }}>
                                      <TouchableOpacity
                                        onPress={() => {
                                          item.user_role == 'EIREPRESENTATIVE'
                                            ? props.navigation.navigate(
                                                'SchoolProfile',
                                                {
                                                  item: {
                                                    user_id: item.user,
                                                    school_id: item.school_id,
                                                  },
                                                },
                                              )
                                            : item.user != userid
                                            ? props.navigation.navigate(
                                                'UsersProfile',
                                                {
                                                  item: {user_id: item.user},
                                                },
                                              )
                                            : props.navigation.navigate(
                                                'UserProfileScreen',
                                                {
                                                  item: {user_id: item.user},
                                                },
                                              );
                                        }}>
                                        <Image
                                          source={
                                            item.comment_user_profile_pic !=
                                            null
                                              ? {
                                                  uri: item.comment_user_profile_pic,
                                                }
                                              : Images.profile_default
                                          }
                                          style={{
                                            height: 40,
                                            width: 40,
                                            borderRadius: 50,
                                            //tintColor: 'grey',
                                          }}
                                        />
                                      </TouchableOpacity>
                                      <View style={{marginLeft: 10, flex: 2}}>
                                        <TouchableOpacity
                                          onPress={() => {
                                            item.user_role == 'EIREPRESENTATIVE'
                                              ? props.navigation.navigate(
                                                  'SchoolProfile',
                                                  {
                                                    item: {
                                                      user_id: item.user,
                                                      school_id: item.school_id,
                                                    },
                                                  },
                                                )
                                              : item.user_id != userid
                                              ? props.navigation.navigate(
                                                  'UsersProfile',
                                                  {
                                                    item: {user_id: item.user},
                                                  },
                                                )
                                              : props.navigation.navigate(
                                                  'UserProfileScreen',
                                                  {
                                                    item: {user_id: item.user},
                                                  },
                                                );
                                          }}>
                                          <Text style={styles.nametext}>
                                            {item.reply_username}
                                          </Text>
                                        </TouchableOpacity>
                                        <Text
                                          style={{marginLeft: 10}}
                                          numberOfLines={item.showMore ? 0 : 1}>
                                          {item.reply_comment}
                                        </Text>
                                      </View>
                                    </View>
                                    {item.reply_comment.length > 32 && (
                                      <TouchableOpacity
                                        style={{marginStart: 60}}
                                        onPress={() =>
                                          gotoShowMoreReplyComment(ind, index)
                                        }>
                                        <Text>
                                          {item.showMore
                                            ? '[Show Less]'
                                            : '[Show More]'}
                                        </Text>
                                      </TouchableOpacity>
                                    )}
                                  </View>
                                  {/* <Icon name="ellipsis-v" color="grey" size={20} /> */}
                                  <TouchableOpacity
                                    onPress={() => gotoLikeUnlike(item)}>
                                    <Icon
                                      name={
                                        item.reply_comment_likes
                                          ? 'star'
                                          : 'star-o'
                                      }
                                      size={15}
                                      color={'#000'}
                                      style={{marginLeft: 5}}
                                    />
                                  </TouchableOpacity>
                                </View>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    marginLeft: 78,
                                  }}>
                                  <Text style={{fontSize: 12}}>
                                    {item.reply_comment_time}
                                  </Text>
                                  {item.reply_comment_like_count > 0 && (
                                    <Text
                                      style={[styles.liketext, {fontSize: 12}]}>
                                      {item.reply_comment_like_count + ' Like'}
                                    </Text>
                                  )}
                                  <Text
                                    style={[styles.liketext, {fontSize: 12}]}
                                    onPress={() => pressReply(item, index)}>
                                    Reply
                                  </Text>
                                  {userid == postDetails.user_id ? (
                                    <TouchableOpacity
                                      onPress={() =>
                                        gotoSetShowReplyModal({
                                          ...item,
                                          type: 'ReplyComment',
                                        })
                                      }>
                                      <Text
                                        style={[
                                          styles.liketext,
                                          {fontSize: 12},
                                        ]}>
                                        ...
                                      </Text>
                                    </TouchableOpacity>
                                  ) : userid == item.reply_user ? (
                                    <TouchableOpacity
                                      onPress={() =>
                                        gotoSetShowReplyModal({
                                          ...item,
                                          type: 'ReplyComment',
                                        })
                                      }>
                                      <Text
                                        style={[
                                          styles.liketext,
                                          {fontSize: 12},
                                        ]}>
                                        ...
                                      </Text>
                                    </TouchableOpacity>
                                  ) : (
                                    <View></View>
                                  )}
                                </View>
                                {item.hasOwnProperty('isComment') &&
                                item.isComment ? (
                                  <View>
                                    <View style={styles.border}></View>
                                    <View
                                      style={[
                                        styles.rowContainer,
                                        {marginRight: 16},
                                      ]}>
                                      <TextInput
                                        multiline={true}
                                        style={{
                                          width: screenWidth - 150,
                                        }}
                                        placeholder={'Reply Comment'}
                                        value={item.commentReplyValue}
                                        onChangeText={text =>
                                          gotoChangeComment(text, item, index)
                                        }
                                      />
                                      <View
                                        style={{
                                          alignSelf: 'flex-end',
                                          marginBottom: 5,
                                          marginLeft: 5,
                                        }}>
                                        <TouchableOpacity
                                          style={styles.postbtn}
                                          onPress={() =>
                                            gotoReplyComment(
                                              item,
                                              index,
                                              'reply',
                                            )
                                          }>
                                          <Text style={{color: 'white'}}>
                                            Reply
                                          </Text>
                                        </TouchableOpacity>
                                      </View>
                                    </View>
                                  </View>
                                ) : (
                                  <View></View>
                                )}
                              </View>
                            )}
                          />
                        )}
                    </View>
                  );
                }
              }}
            />

            <View style={styles.border}></View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
                paddingHorizontal: 16,
              }}>
              <TouchableOpacity onPress={gotoLikeUnLikePost}>
                <Icon
                  name={postDetails.like ? 'star' : 'star-o'}
                  size={15}
                  color={'#000'}
                  style={{marginLeft: 5}}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={gotoSetToggle}>
                <Icon
                  name="comment-o"
                  color="#000"
                  size={15}
                  style={{marginLeft: 5}}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                marginLeft: 6,
                paddingHorizontal: 16,
                paddingVertical: 10,
              }}>
              {postDetails.post_like != null &&
                postDetails.post_like.length == 1 &&
                postDetails.post_like_count > 0 && (
                  <TouchableOpacity
                    onPress={() => {
                      postDetails.post_like[0].user_role == 'EIREPRESENTATIVE'
                        ? props.navigation.navigate('SchoolProfile', {
                            item: {
                              user_id:
                                postDetails.post_like[0].post_like_user_id,
                              school_id: postDetails.post_like[0].school_id,
                            },
                          })
                        : postDetails.post_like[0].post_like_user_id != userid
                        ? props.navigation.navigate('UsersProfile', {
                            item: {
                              user_id:
                                postDetails.post_like[0].post_like_user_id,
                            },
                          })
                        : props.navigation.navigate('UserProfileScreen', {
                            item: {
                              user_id:
                                postDetails.post_like[0].post_like_user_id,
                            },
                          });
                    }}>
                    <Text>
                      Liked by{' '}
                      <Text style={styles.boldtext}>
                        {postDetails.post_like[0].post_like_user_id == userid
                          ? 'you'
                          : postDetails.post_like[0].post_like_username}
                      </Text>
                    </Text>
                  </TouchableOpacity>
                )}
              {postDetails.post_like != null &&
                postDetails.post_like.length > 1 &&
                postDetails.post_like_count > 0 && (
                  // <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  //   <Text>Liked by </Text>
                  //   <TouchableOpacity
                  //     onPress={() => {
                  //       postDetails.post_like[0].user_role == 'EIREPRESENTATIVE'
                  //         ? props.navigation.navigate('SchoolProfile', {
                  //             item: {
                  //               user_id:
                  //                 postDetails.post_like[0].post_like_user_id,
                  //               school_id: postDetails.post_like[0].school_id,
                  //             },
                  //           })
                  //         : postDetails.post_like[0].post_like_user_id != userid
                  //         ? props.navigation.navigate('UsersProfile', {
                  //             item: {
                  //               user_id:
                  //                 postDetails.post_like[0].post_like_user_id,
                  //             },
                  //           })
                  //         : props.navigation.navigate('UserProfileScreen', {
                  //             item: {
                  //               user_id:
                  //                 postDetails.post_like[0].post_like_user_id,
                  //             },
                  //           });
                  //     }}>
                  //     <Text style={styles.boldtext}>
                  //       {postDetails.post_like[0].post_like_user_id == userid
                  //         ? 'you'
                  //         : postDetails.post_like[0].post_like_username}
                  //     </Text>
                  //   </TouchableOpacity>
                  //   <Text style={styles.boldtext}>
                  //     {' and ' + (postDetails.post_like.length - 1) + ' Others'}
                  //   </Text>
                  // </View>
                  <View>
                    <View style={{flexDirection: 'row'}}>
                      <TouchableOpacity
                        onPress={() => {
                          postDetails.post_like[0].user_role ==
                          'EIREPRESENTATIVE'
                            ? props.navigation.navigate('SchoolProfile', {
                                item: {
                                  user_id:
                                    postDetails.post_like[0].post_like_user_id,
                                  school_id: postDetails.post_like[0].school_id,
                                },
                              })
                            : postDetails.post_like[0].post_like_user_id !=
                              userid
                            ? props.navigation.navigate('UsersProfile', {
                                item: {
                                  user_id:
                                    postDetails.post_like[0].post_like_user_id,
                                },
                              })
                            : props.navigation.navigate('UserProfileScreen', {
                                item: {
                                  user_id:
                                    postDetails.post_like[0].post_like_user_id,
                                },
                              });
                        }}>
                        <Text>
                          Liked by{' '}
                          <Text style={styles.boldtext}>
                            {postDetails.post_like[0].post_like_user_id ==
                            userid
                              ? 'you '
                              : postDetails.post_like[0].post_like_username +
                                ' '}
                          </Text>
                        </Text>
                      </TouchableOpacity>
                      <Text>and </Text>
                      <TouchableOpacity onPress={toggleModal}>
                        <Text style={styles.boldText}>
                          {postDetails.post_like.length - 1 + ' Others'}
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <Modal
                      isVisible={isModalVisibleLike}
                      onBackdropPress={toggleModalClose}>
                      <View
                        style={{
                          backgroundColor: 'white',
                          maxHeight: 350,
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            margin: 16,
                          }}>
                          <Text style={{fontSize: 18, fontWeight: '700'}}>
                            Likes
                          </Text>
                          <TouchableOpacity
                            onPress={toggleModalClose}
                            style={{}}>
                            <Image
                              source={Images.closeicon}
                              style={{height: 18, width: 18}}
                            />
                          </TouchableOpacity>
                        </View>
                        <FlatList
                          data={DATA}
                          style={{marginBottom: 16}}
                          renderItem={renderItemLike}
                          keyExtractor={item => item.id}
                        />
                      </View>
                    </Modal>
                  </View>
                )}
              <Text style={{fontSize: 12, marginTop: 10}}>
                {postDetails.post_created_on.toUpperCase()}
              </Text>
            </View>
            {postCommentToggle && (
              <>
                <View style={styles.border}></View>
                <View style={styles.rowContainer}>
                  <TextInput
                    style={{width: screenWidth - 120}}
                    multiline={true}
                    placeholder="Add a comment"
                    value={comment}
                    onChangeText={setComment}
                  />
                  <View
                    style={{
                      alignSelf: 'flex-end',
                      marginBottom: 5,
                      marginLeft: 5,
                    }}>
                    <TouchableOpacity
                      style={styles.postbtn}
                      onPress={gotoComment}>
                      <Text style={{color: 'white'}}>Post</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
          </CardView>
          {allPost.length > 0 && (
            <View style={{paddingHorizontal: 16}}>
              <TouchableOpacity
                onPress={() => {
                  postDetails.user_role == 'EIREPRESENTATIVE'
                    ? props.navigation.navigate('SchoolProfile', {
                        item: postDetails,
                      })
                    : postDetails.user_id != userid
                    ? props.navigation.navigate('UsersProfile', {
                        item: postDetails,
                      })
                    : props.navigation.navigate('UserProfileScreen', {
                        item: postDetails,
                      });
                }}>
                <Text>
                  More Post from{' '}
                  <Text style={{fontWeight: 'bold'}}>
                    {postDetails.full_name}
                  </Text>
                </Text>
              </TouchableOpacity>
              <FlatList
                data={allPost}
                // horizontal={true}
                numColumns={2}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                //style={{alignSelf: 'center'}}
              />
            </View>
          )}
        </ScrollView>
      )}
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
            <TouchableOpacity
              onPress={() =>
                postDetails.user_id == userid
                  ? reportmodalWithKey('delete')
                  : reportmodalWithKey('report')
              }>
              <Text style={styles.btn}>
                {postDetails.user_id == userid ? 'Delete' : 'Report'}
              </Text>
            </TouchableOpacity>

            {/* <TouchableOpacity
               onPress={() => blockprofile()}
               >
                <Text style={styles.btn}>Unfollow</Text>
              </TouchableOpacity> */}
            {/* <View style={styles.mborder}></View> */}
          </>
          {/* )} */}

          <View style={styles.mborder}></View>
          <TouchableOpacity onPress={toggleModal3}>
            <Text style={[styles.btn, {color: 'rgb(70,50,103)'}]}>Cancel</Text>
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
            <Text style={{fontSize: hp(2.4)}}>Why are you reporting this?</Text>
            {reportcheckboxValue.map((checkbox, i) => (
              <View key={i} style={styles.rowContent}>
                <Text style={styles.reporttext}>{checkbox.report_option}</Text>
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

      {/********* Modal for Delete comment **********/}
      <Modal
        isVisible={replyShowModal}
        onBackdropPress={setshowReplyModal}
        backdropOpacity={0.4}>
        <View
          style={{
            alignItems: 'center',
            backgroundColor: 'white',
            paddingVertical: 20,
            borderRadius: 5,
            justifyContent: 'center',
          }}>
          <TouchableOpacity onPress={gotoDeleteComment}>
            <Text style={styles.btn}>Delete</Text>
          </TouchableOpacity>
          <View style={styles.mborder}></View>
          <TouchableOpacity onPress={setshowReplyModal}>
            <Text style={[styles.btn, {color: 'rgb(70,50,103)'}]}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default PostDetailScreen;
