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
  console.log(props.route);
  const {
    item: {id},
  } = props.route.params;
  console.log('+++++++', id);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
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
  const pressReply = (item, index) => {
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

  const gotoChangeComment = (text, item, index) => {
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

  const gotoReplyComment = async (item, index) => {
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
      reply_comment: item.commentReplyValue,
      user_id: postDetails.user_id,
    };
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
    getPostDetails(id);

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
  /**********get post details api */
  const getPostDetails = async id => {
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

    dispatch(
      userActions.getPostDetails({
        data,
        callback: ({result, error}) => {
          if (result) {
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
                  });
                }
              }
              newArrrr.push({
                ...result.data[0].comment_post[i],
                reply_comment: newArrr,
                commentReplyValue: '',
                isComment: false,
                parent: 0,
              });
              newArrr = [];
            }

            console.log('=======++++', newArrrr);

            let newObjectInnner = {...result.data[0], comment_post: newArrrr};
            console.log('======', newObjectInnner);

            setPostDetails(newObjectInnner);
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

  const gotoLikeUnlike = async item => {
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

  const renderItem = ({item}) => (
    <View
      style={{
        borderRadius: 10,
        backgroundColor: 'white',
        margin: 5,
        padding: 8,
        alignItems: 'center',
      }}>
      <Image
        source={
          item.post_image != null
            ? {uri: item.post_image}
            : require('../../../../../assets/images/college2.jpg')
        }
        style={{height: screenWidth / 2 - 40, width: screenWidth / 2 - 40}}
      />
    </View>
  );

  return (
    <View style={styles.container}>
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
              {/* <Image
              source={require('../../../../../assets/images/college4.jpg')}
              style={styles.image}
            /> */}
              {postDetails != '' && (
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
                    sliderWidth={SLIDER_WIDTH}
                    itemWidth={ITEM_WIDTH}
                    onSnapToItem={index => setIndex(index)}
                  />
                  <Pagination
                    dotsLength={postDetails.post_gallery.length}
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
                  />
                </>
              )}
            </View>
            <View style={styles.rowContainer}>
              <TouchableOpacity
                style={{flexDirection: 'row', alignItems: 'center'}}
                onPress={() => {
                  props.navigation.navigate('ProfileScreen');
                }}>
                <Image
                  source={
                    postDetails.profile_pic != null
                      ? {uri: postDetails.profile_pic}
                      : Images.profile_img2
                  }
                  style={styles.profileImage}
                />
                <Text style={styles.nametext}>{postDetails.full_name}</Text>
              </TouchableOpacity>
              {/* <Text style={{fontWeight: 'bold', marginLeft: 30}}>
                Following
              </Text> */}

              <Icon name="ellipsis-v" color="grey" size={20} />
            </View>
            <View
              style={{
                borderWidth: 0.2,
                borderColor: 'grey',
                marginVertical: 5,
              }}></View>

            <View style={styles.rowContainer}>
              <TouchableOpacity
                style={{flexDirection: 'row', alignItems: 'center'}}
                onPress={() => {
                  props.navigation.navigate('ProfileScreen');
                }}>
                <Image
                  source={
                    postDetails.profile_pic != null
                      ? {uri: postDetails.profile_pic}
                      : Images.profile_img2
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

            <FlatList
              data={postDetails.comment_post}
              renderItem={({item, index}) => (
                <View>
                  <View style={styles.rowContainer}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        flex: 1,
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          props.navigation.navigate('ProfileScreen');
                        }}>
                        <Image
                          source={
                            item.comment_user_profile_pic != null
                              ? {uri: item.comment_user_profile_pic}
                              : Images.profile_img2
                          }
                          style={{
                            height: 40,
                            width: 40,
                            borderRadius: 50,
                            tintColor: 'grey',
                          }}
                        />
                      </TouchableOpacity>
                      <View style={{marginLeft: 10, flex: 2}}>
                        <TouchableOpacity
                          onPress={() => {
                            props.navigation.navigate('ProfileScreen');
                          }}>
                          <Text style={styles.nametext}>
                            {item.comment_username}
                          </Text>
                        </TouchableOpacity>
                        <Text style={{marginLeft: 10}}>{item.comment}</Text>
                      </View>
                    </View>
                    {/* <Icon name="ellipsis-v" color="grey" size={20} /> */}
                    <TouchableOpacity onPress={() => gotoLikeUnlike(item)}>
                      <Icon
                        name="thumbs-up"
                        size={15}
                        color={item.likes_status ? 'red' : 'grey'}
                        style={{marginLeft: 5}}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={{flexDirection: 'row', marginLeft: 78}}>
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
                  </View>
                  {item.isComment ? (
                    <View>
                      <View style={styles.border}></View>
                      <View style={styles.rowContainer}>
                        <TextInput
                          placeholder="Reply Comment"
                          value={item.commentReplyValue}
                          onChangeText={text =>
                            gotoChangeComment(text, item, index)
                          }
                        />
                        <TouchableOpacity
                          style={styles.postbtn}
                          onPress={() => gotoReplyComment(item, index)}>
                          <Text style={{color: 'white'}}>Reply</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ) : (
                    <View></View>
                  )}
                  {item.reply_comment != null && item.reply_comment.length > 0 && (
                    <FlatList
                      style={{marginStart: 16}}
                      data={item.reply_comment}
                      renderItem={({item, index}) => (
                        <View>
                          <View style={styles.rowContainer}>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                flex: 1,
                              }}>
                              <TouchableOpacity
                                onPress={() => {
                                  props.navigation.navigate('ProfileScreen');
                                }}>
                                <Image
                                  source={
                                    item.comment_user_profile_pic != null
                                      ? {uri: item.comment_user_profile_pic}
                                      : Images.profile_img2
                                  }
                                  style={{
                                    height: 40,
                                    width: 40,
                                    borderRadius: 50,
                                    tintColor: 'grey',
                                  }}
                                />
                              </TouchableOpacity>
                              <View style={{marginLeft: 10, flex: 2}}>
                                <TouchableOpacity
                                  onPress={() => {
                                    props.navigation.navigate('ProfileScreen');
                                  }}>
                                  <Text style={styles.nametext}>
                                    {item.reply_username}
                                  </Text>
                                </TouchableOpacity>
                                <Text style={{marginLeft: 10}}>
                                  {item.reply_comment}
                                </Text>
                              </View>
                            </View>
                            {/* <Icon name="ellipsis-v" color="grey" size={20} /> */}
                            <TouchableOpacity
                              onPress={() => gotoLikeUnlike(item)}>
                              <Icon
                                name="thumbs-up"
                                size={15}
                                color={
                                  item.reply_comment_likes ? 'red' : 'grey'
                                }
                                style={{marginLeft: 5}}
                              />
                            </TouchableOpacity>
                          </View>
                          <View style={{flexDirection: 'row', marginLeft: 78}}>
                            <Text style={{fontSize: 12}}>
                              {item.reply_comment_time}
                            </Text>
                            {item.reply_comment_like_count > 0 && (
                              <Text style={[styles.liketext, {fontSize: 12}]}>
                                {item.reply_comment_like_count + ' Like'}
                              </Text>
                            )}
                            <Text
                              style={[styles.liketext, {fontSize: 12}]}
                              onPress={() => pressReply(item, index)}>
                              Reply
                            </Text>
                          </View>
                          {item.hasOwnProperty('isComment') &&
                          item.isComment ? (
                            <View>
                              <View style={styles.border}></View>
                              <View style={styles.rowContainer}>
                                <TextInput
                                  placeholder="Reply Comment"
                                  value={item.commentReplyValue}
                                  onChangeText={text =>
                                    gotoChangeComment(text, item, index)
                                  }
                                />
                                <TouchableOpacity
                                  style={styles.postbtn}
                                  onPress={() => gotoReplyComment(item, index)}>
                                  <Text style={{color: 'white'}}>Reply</Text>
                                </TouchableOpacity>
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
              )}
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
                  name="thumbs-up"
                  size={15}
                  color={postDetails.like ? 'red' : 'grey'}
                  style={{marginLeft: 5}}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={gotoSetToggle}>
                <Icon
                  name="comment"
                  color="grey"
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
              {postDetails.post_like.length > 0 &&
                postDetails.post_like.map((item, index) => {
                  return (
                    <Text>
                      Liked by{' '}
                      <Text style={styles.boldtext}>
                        {item.post_like_username}
                      </Text>
                      {index > 0 && (
                        <Text style={styles.boldtext}>
                          {'and' + postDetails.post_like.length - 1 + ' Others'}
                        </Text>
                      )}
                    </Text>
                  );
                })}
              <Text style={{fontSize: 12, marginTop: 10}}>
                {postDetails.post_created_on}
              </Text>
            </View>
            {postCommentToggle && (
              <>
                <View style={styles.border}></View>
                <View style={styles.rowContainer}>
                  <TextInput
                    placeholder="Add a comment"
                    value={comment}
                    onChangeText={setComment}
                  />
                  <TouchableOpacity
                    style={styles.postbtn}
                    onPress={gotoComment}>
                    <Text style={{color: 'white'}}>Post</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </CardView>
          <View style={{paddingHorizontal: 16}}>
            <Text>
              More Post from{' '}
              <Text style={{fontWeight: 'bold'}}>{postDetails.full_name}</Text>
            </Text>
            <FlatList
              data={postDetails.post_gallery}
              // horizontal={true}
              numColumns={2}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              //style={{alignSelf: 'center'}}
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default PostDetailScreen;
