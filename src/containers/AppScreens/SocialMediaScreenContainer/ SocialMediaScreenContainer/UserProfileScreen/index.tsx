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
  TextInput,
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
import {Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';
import images from '../../../../../components/images';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import {useDispatch} from 'react-redux';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import CardView from 'react-native-cardview';
import Modal from 'react-native-modal';
import RenderItem from './RenderItem';

const data = [
  {
    id: 1,
  },

  {
    id: 2,
  },
  {
    id: 3,
  },
];
const data2 = [
  {
    id: 1,
  },

  {
    id: 2,
  },
  {
    id: 3,
  },
];

export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);
const screenWidth = Dimensions.get('window').width;

const UserProfileScreen = (props: UserProfileProps) => {
  console.log('=====Self', props.route);
  const {
    item: {user_id},
  } = props.route.params;
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [data, active_data] = useState('thData');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState('');
  const [index, setIndex] = useState(0);
  const [comment, pressComment] = useState(false);
  const [commentValue, setComment] = useState('');
  const [sociaMedialPic, setSocialMediaPic] = useState('');
  const [isModalVisible3, setModalVisible3] = useState(false);
  const [customItem, setCustomItem] = useState('');
  const [tempUserId, setUserId] = useState('');

  useEffect(() => {
    // Alert.alert('Self');
    if (tempUserId == '') {
      console.log('=====Self 22', props.route);
      getUserProfile(user_id);
      getUserCoverMediaPic(user_id);
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

    // BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    // return () => {
    //   BackHandler.removeEventListener(
    //     'hardwareBackPress',
    //     handleBackButtonClick,
    //   );
    //   keyboardDidHideListener.remove();
    //   keyboardDidShowListener.remove();
    // };
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

  const getUserProfile = async user_id => {
    console.log('=====Self 23');
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
    // console.log('=====Self 25');
    dispatch(
      userActions.getUserProfile({
        data,
        callback: ({result, error}) => {
          if (result) {
            console.log('=====Self 24');
            console.warn(
              'after result user profile details',
              JSON.stringify(result, undefined, 2),
              //  props.navigation.navigate('OtpLogin', { 'firebase_id': result.firebase_username, 'username': email })
            );

            if (result.status) {
              setUserId('abc');
              // let newArr = [];
              // for (let i in result.data[0].social_post) {
              //   newArr.push({
              //     ...result.data[0].social_post[i],
              //     commentValue: '',
              //     commentToggle: false,
              //   });
              // }

              //let newObject = {...result.data[0], social_post: newArr};

              //console.log('+++++', newObject);

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

              console.log('NewArray==>> 111', newArrr);

              let newObject = {...result.data[0], social_post: newArrr};

              console.log('+++++', newObject);

              setUserProfile(newObject);
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
            console.warn(
              'after result user cover pic details',
              JSON.stringify(result, undefined, 2),
              //  props.navigation.navigate('OtpLogin', { 'firebase_id': result.firebase_username, 'username': email })
            );

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
            console.warn(
              'after result like or unlike',
              JSON.stringify(result, undefined, 2),
              //  props.navigation.navigate('OtpLogin', { 'firebase_id': result.firebase_username, 'username': email })
            );
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

  const gotoDeletePost = async () => {
    setModalVisible3(!isModalVisible3);
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
      id: customItem.id,
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
            setLoading(false);
            getUserProfile(user_id);
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
    console.log('newObj', newObj);
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

    console.log('After Change==>>', newObj);

    setUserProfile(newObj);
  };

  // const gotoSetComment = async (text, index) => {
  //   let newObj = Object.assign({}, userProfile);

  //   for (let i in userProfile.social_post) {
  //   }
  //   console.log('newObj', newObj);
  //   setUserProfile(newObj);
  // };

  const isCarousel = useRef(null);
  const isCarouselText = useRef(null);

  const gotoShowMore = (ind, index) => {
    console.log(ind, index);

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

    console.log('+++++', newObject);

    setUserProfile(newObject);
  };

  const toggleModal3 = item => {
    // console.log(item);
    setCustomItem(item);
    setModalVisible3(!isModalVisible3);
  };

  const goToNavigate = async (route, itemData) => {
    console.log(route + 'Sap' + JSON.stringify(itemData));
    let itemm = JSON.stringify(itemData);
    console.log(JSON.parse(itemm));
    const {
      item: {user_id},
    } = JSON.parse(itemm);
    console.log(user_id);
    await props.navigation.navigate(route, {item: {user_id}});
    // return true;
  };

  return (
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
                  : require('../../../../../assets/images/college2.jpg')
              }
              resizeMode="stretch"
              style={{width: '100%', height: 100}}>
              <View
                style={{
                  backgroundColor: 'black',
                  height: 30,
                  width: 30,
                  justifyContent: 'center',
                  margin: 10,
                }}>
                <Icon
                  name="camera"
                  size={18}
                  color="white"
                  style={{margin: 5}}
                />
              </View>
            </ImageBackground>

            <View style={styles.rowContainer}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View>
                  <Image
                    source={
                      sociaMedialPic.hasOwnProperty('profile_pic') &&
                      sociaMedialPic.profile_pic != null
                        ? {uri: sociaMedialPic.profile_pic}
                        : require('../../../../../assets/images/pic.jpeg')
                    }
                    style={{
                      marginLeft: 10,
                      width: 80,
                      height: 80,
                      borderRadius: 50,
                    }}
                  />
                  <Icon
                    name={'camera'}
                    size={15}
                    style={{
                      backgroundColor: '#ccc',
                      position: 'absolute',
                      right: 0,
                      bottom: 0,
                      marginRight: 8,
                    }}
                  />
                </View>

                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: 14,
                      marginTop: 30,
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        props.navigation.navigate('PostDetailScreen');
                      }}>
                      <Text style={styles.nametext}>{userProfile.name}</Text>
                    </TouchableOpacity>
                    <Icon
                      name="check-circle"
                      size={18}
                      color="#4E387E"
                      style={{margin: 5}}
                    />
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.likecontainer}>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate('FollowersScreen', {
                      item: {...userProfile, user_id, flag: 'self'},
                    });
                  }}>
                  <Text style={styles.boldText}>
                    {userProfile.social_user_followers}
                  </Text>
                  <Text>Followers</Text>
                </TouchableOpacity>

                <TouchableOpacity
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
            {/* <TouchableOpacity
              style={styles.addpostbtn}
              onPress={() => {
                props.navigation.navigate('CreatePostScreen');
              }}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>
                Add Posts
              </Text>
            </TouchableOpacity> */}
          </View>
          <Card style={styles.cardContent}>
            <View style={styles.cardtitlecontent}>
              <Text style={styles.cardtitletext}>Education</Text>
            </View>
            {userProfile.educationdetail != null &&
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
                                style={[styles.view_Tv_1, {fontWeight: '700'}]}>
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
              {/* <TouchableOpacity
                style={styles.changebtn}
                onPress={() => {
                  props.navigation.navigate('eKYC');
                }}>
                <Text style={{color: 'rgb(70,50,103)'}}>Change Name</Text>
              </TouchableOpacity> */}
              <View>
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate('SettingScreen');
                  }}>
                  <Image source={images.edit_icon} style={styles.editicon} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.borderstyle}></View>
            <View style={styles.textcontainer}>
              <View style={styles.view_Row}>
                <Text style={styles.view_Tv_1}>DOB :</Text>
                <Text style={styles.view_Tv_2}>{userProfile.dob}</Text>
              </View>
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

              {userProfile.email != '' && (
                <View style={styles.view_Row}>
                  <Text style={styles.view_Tv_1}>Email:</Text>
                  <Text style={styles.view_Tv_2}>{userProfile.email}</Text>
                </View>
              )}
              {userProfile.phone != '' && (
                <View style={styles.view_Row}>
                  <Text style={styles.view_Tv_1}>Phone :</Text>
                  <Text style={styles.view_Tv_2}>{userProfile.phone}</Text>
                </View>
              )}
              {/* <View style={styles.view_Row}>
                <Text style={styles.view_Tv_1}>Profession :</Text>
                <Text style={styles.view_Tv_2}>30/Oct/1997</Text>
              </View>
              <View style={styles.view_Row}>
                <Text style={styles.view_Tv_1}>City :</Text>
                <Text style={styles.view_Tv_2}>Noida</Text>
              </View> */}
            </View>
          </Card>
          {userProfile != '' && (
            <Card style={styles.cardContent}>
              <View style={styles.cardtitlecontent}>
                <Text style={styles.cardtitletext}>Posts</Text>
                <TouchableOpacity
                  style={styles.addpostbtn}
                  onPress={() => {
                    props.navigation.navigate('CreatePostScreen');
                  }}>
                  <Text style={{color: 'white'}}>Add Posts</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.borderstyle}></View>
              <View style={styles.tabrowContainer}>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => active_data('thData')}>
                    <Icon
                      name="th"
                      size={30}
                      color={data === 'thData' ? '#4B2A6A' : 'grey'}
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
          )}
          {userProfile != '' && !(data === 'Image') ? (
            <FlatList
              data={userProfile.social_post}
              renderItem={({item}) => {
                let newArrCap = [];
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
                    <>
                      <Carousel
                        // layout={'tinder'}
                        ref={isCarousel}
                        data={item.post_gallery}
                        renderItem={({item, index}) => (
                          <CrouselImages
                            item={item}
                            index={index}
                            length={len}
                            data={data}
                          />
                        )}
                        sliderWidth={screenWidth - 16}
                        itemWidth={screenWidth - 16}
                        layoutCardOffset={'0'}
                        onSnapToItem={index => setIndex(index)}
                      />
                    </>
                  );
                } else {
                  return (
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
                        />
                      )}
                      sliderWidth={screenWidth - 16}
                      itemWidth={screenWidth - 16}
                      layoutCardOffset={'0'}
                      onSnapToItem={index => setIndex(index)}
                    />
                  );
                }
              }}
              //  ItemSeparatorComponent={renderIndicator}
            />
          ) : userProfile != '' ? (
            <FlatList
              data={userProfile.social_post}
              renderItem={({item, index}) => {
                let ind = index;
                let len =
                  item.post_gallery != null ? item.post_gallery.length : 0;
                let items = item;
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
                    ind={ind}
                    len={len}
                    items={items}
                    item={item}
                    lenCap={lenCap}
                    index={index}
                    userProfile={userProfile}
                    isCarouselText={isCarouselText}
                    isCarousel={isCarousel}
                    parts={parts}
                    user_id={user_id}
                    data={data}
                    props={props}
                  />
                  // <CardView
                  //   cardElevation={5}
                  //   cardMaxElevation={5}
                  //   // cornerRadius={15}
                  //   style={{
                  //     // padding: 16,
                  //     backgroundColor: 'white',
                  //     marginHorizontal: 15,
                  //     marginTop: 10,
                  //     paddingBottom: 14,
                  //     paddingTop: 10,
                  //     marginBottom: 5,
                  //   }}>
                  //   <View style={styles.rowContainer1}>
                  //     <View
                  //       style={{
                  //         flexDirection: 'row',
                  //         alignItems: 'center',
                  //       }}>
                  //       <Image
                  //         source={
                  //           item.profile_pic != null
                  //             ? {uri: item.profile_pic}
                  //             : require('../../../../../assets/images/pic.jpeg')
                  //         }
                  //         style={styles.profilepic1}
                  //       />
                  //       <Text style={{marginLeft: 20, fontWeight: 'bold'}}>
                  //         {item.full_name}
                  //       </Text>
                  //     </View>
                  //     <TouchableOpacity onPress={() => toggleModal3(item)}>
                  //       <Image
                  //         source={require('../../../../../assets/images/dot.png')}
                  //         style={{height: 18, width: 18}}
                  //       />
                  //     </TouchableOpacity>
                  //   </View>
                  //   {/* <View style={{paddingHorizontal: 16, marginTop: 10}}>
                  //     <Image source={item.src} style={{width: '100%'}} />
                  //   </View> */}
                  //   {userProfile != '' && item.post_gallery != null ? (
                  //     <>
                  //       <Carousel
                  //         // layout={'tinder'}
                  //         ref={isCarousel}
                  //         data={item.post_gallery}
                  //         renderItem={({item, index}) => (
                  //           <CrouselImages
                  //             item={item}
                  //             index={index}
                  //             length={len}
                  //           />
                  //         )}
                  //         sliderWidth={SLIDER_WIDTH}
                  //         itemWidth={ITEM_WIDTH}
                  //         onSnapToItem={index => setIndex(index)}
                  //       />
                  //     </>
                  //   ) : (
                  //     <Carousel
                  //       // layout={'tinder'}
                  //       ref={isCarouselText}
                  //       data={parts}
                  //       renderItem={({item, index}) => (
                  //         <CrouselText
                  //           item={item}
                  //           index={index}
                  //           length={lenCap}
                  //         />
                  //       )}
                  //       sliderWidth={SLIDER_WIDTH}
                  //       itemWidth={ITEM_WIDTH}
                  //       onSnapToItem={index => setIndex(index)}
                  //     />
                  //   )}
                  //   <View style={styles.likecommentContainer}>
                  //     <TouchableOpacity onPress={() => gotoLikeUnLike(item)}>
                  //       <Icon
                  //         name="thumbs-up"
                  //         size={15}
                  //         color={item.like ? 'red' : 'grey'}
                  //         style={{marginLeft: 5}}
                  //       />
                  //     </TouchableOpacity>
                  //     <TouchableOpacity onPress={() => gotoChangeToggle(index)}>
                  //       <Icon
                  //         name="comment"
                  //         color="grey"
                  //         size={15}
                  //         style={{marginLeft: 5}}
                  //       />
                  //     </TouchableOpacity>
                  //   </View>

                  //   {/* reply comment Section */}
                  //   <View
                  //     style={{
                  //       marginLeft: 6,
                  //       paddingHorizontal: 16,
                  //       paddingVertical: 10,
                  //     }}>
                  //     {userProfile != '' &&
                  //     item.post_like != null &&
                  //     item.post_like.length == 1 &&
                  //     item.post_like[0].post_like_user_id == user_id &&
                  //     item.post_like_count > 0 ? (
                  //       <View>
                  //         <Text>
                  //           Liked by
                  //           <Text style={styles.boldText}> You</Text>
                  //         </Text>
                  //       </View>
                  //     ) : (
                  //       <TouchableOpacity
                  //         onPress={() => {
                  //           item.post_like[0].user_role == 'EIREPRESENTATIVE'
                  //             ? props.navigation.navigate('SchoolProfile', {
                  //                 item: {
                  //                   user_id:
                  //                     item.post_like[0].post_like_user_id,
                  //                 },
                  //               })
                  //             : item.post_like[0].post_like_user_id != user_id
                  //             ? props.navigation.navigate('UsersProfile', {
                  //                 item: {
                  //                   user_id:
                  //                     item.post_like[0].post_like_user_id,
                  //                 },
                  //               })
                  //             : {};
                  //         }}>
                  //         {item.post_like != null &&
                  //           item.post_like.length == 1 &&
                  //           item.post_like_count > 0 && (
                  //             <Text>
                  //               Liked by
                  //               <Text style={styles.boldText}>
                  //                 {' '}
                  //                 {item.post_like[0].post_like_username}
                  //               </Text>
                  //             </Text>
                  //           )}
                  //       </TouchableOpacity>
                  //     )}
                  //     {userProfile != '' &&
                  //       item.post_like != null &&
                  //       item.post_like.length >= 2 && (
                  //         <TouchableOpacity
                  //           onPress={() => {
                  //             item.post_like[0].user_role == 'EIREPRESENTATIVE'
                  //               ? props.navigation.navigate('SchoolProfile', {
                  //                   item: {
                  //                     user_id:
                  //                       item.post_like[0].post_like_user_id,
                  //                   },
                  //                 })
                  //               : item.post_like[0].post_like_user_id != user_id
                  //               ? props.navigation.navigate('UsersProfile', {
                  //                   item: {
                  //                     user_id:
                  //                       item.post_like[0].post_like_user_id,
                  //                   },
                  //                 })
                  //               : {};
                  //           }}>
                  //           <Text>
                  //             Liked by{' '}
                  //             <Text style={styles.boldText}>
                  //               {item.post_like[0].post_like_username}
                  //             </Text>{' '}
                  //             and{' '}
                  //             <Text style={styles.boldText}>
                  //               {item.post_like.length - 1 + ' '}Others
                  //             </Text>
                  //           </Text>
                  //         </TouchableOpacity>
                  //       )}

                  //     {item.full_name != null && item.post_gallery != null && (
                  //       <Text
                  //         style={{fontWeight: 'bold', flex: 1, marginTop: 4}}>
                  //         {item.full_name}
                  //       </Text>
                  //     )}
                  //     {item.caption != null && item.post_gallery != null && (
                  //       <Text>{item.caption}</Text>
                  //     )}
                  //     {userProfile != '' &&
                  //       item.comment_post != null &&
                  //       item.comment_post.map((item, index) => {
                  //         if (index <= 2) {
                  //           return (
                  //             <View key={item + 'sap' + index}>
                  //               <View style={styles.messageContainer}>
                  //                 <View style={{flexDirection: 'row', flex: 1}}>
                  //                   <TouchableOpacity
                  //                     disabled={
                  //                       user_id == item.user ? true : false
                  //                     }
                  //                     onPress={() => {
                  //                       item.user_role == 'EIREPRESENTATIVE'
                  //                         ? props.navigation.navigate(
                  //                             'SchoolProfile',
                  //                             {
                  //                               item: {user_id: item.user},
                  //                             },
                  //                           )
                  //                         : item.user_id != user_id
                  //                         ? props.navigation.navigate(
                  //                             'UsersProfile',
                  //                             {
                  //                               item: {user_id: item.user},
                  //                             },
                  //                           )
                  //                         : {};
                  //                     }}>
                  //                     <Text
                  //                       style={{fontWeight: 'bold', flex: 1}}>
                  //                       {item.comment_username}
                  //                     </Text>
                  //                   </TouchableOpacity>
                  //                   <Text
                  //                     style={{marginLeft: 5, flex: 2}}
                  //                     numberOfLines={item.showMore ? 0 : 1}>
                  //                     {item.comment}
                  //                   </Text>
                  //                 </View>
                  //                 <View
                  //                   style={{
                  //                     flexDirection: 'row',
                  //                   }}>
                  //                   <TouchableOpacity
                  //                     onPress={() => gotoCommentLike(item)}>
                  //                     <Icon
                  //                       name="thumbs-up"
                  //                       size={15}
                  //                       color={
                  //                         item.likes_status ? 'red' : 'grey'
                  //                       }
                  //                       style={{marginLeft: 5}}
                  //                     />
                  //                   </TouchableOpacity>
                  //                 </View>
                  //               </View>
                  //               {item.comment.length > 50 && (
                  //                 <TouchableOpacity
                  //                   onPress={() => gotoShowMore(ind, index)}>
                  //                   <Text>
                  //                     {item.showMore
                  //                       ? '[Show Less]'
                  //                       : '[Show More]'}
                  //                   </Text>
                  //                 </TouchableOpacity>
                  //               )}
                  //             </View>
                  //           );
                  //         }
                  //       })}
                  //     {/*end of reply comment Section */}
                  //     {item.total_comment >= 3 && (
                  //       <TouchableOpacity
                  //         onPress={() => {
                  //           props.navigation.navigate('PostDetailScreen', {
                  //             item,
                  //           });
                  //         }}>
                  //         <Text style={{fontSize: 12, marginTop: 10}}>
                  //           VIEW ALL {item.total_comment} COMMENTS
                  //         </Text>
                  //       </TouchableOpacity>
                  //     )}
                  //     <Text style={{fontSize: 12, marginTop: 10}}>
                  //       {item.post_created_on.toUpperCase()}
                  //     </Text>
                  //   </View>
                  //   {item.commentToggle == true ? (
                  //     <View>
                  //       <View style={styles.border}></View>
                  //       <View style={styles.rowContainer1}>
                  //         <TextInput
                  //           style={{
                  //             width: screenWidth - 120,
                  //           }}
                  //           placeholder="Add a comment"
                  //           value={commentValue}
                  //           onChangeText={setComment}
                  //           multiline={true}
                  //         />
                  //         <TouchableOpacity
                  //           style={styles.postbtn}
                  //           onPress={() => gotoComment(item)}>
                  //           <Text style={{color: 'white'}}>Post</Text>
                  //         </TouchableOpacity>
                  //       </View>
                  //     </View>
                  //   ) : (
                  //     <View></View>
                  //   )}
                  // </CardView>
                );
              }}
              //  ItemSeparatorComponent={renderIndicator}
            />
          ) : (
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
            <TouchableOpacity onPress={() => gotoDeletePost()}>
              <Text style={styles.btn}>Delete</Text>
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
              props.navigation.navigate('PostDetailScreen', {item: customItem});
            }}>
            <Text style={[styles.btn, {color: 'black'}]}>Go to Post</Text>
          </TouchableOpacity>
          <View style={styles.mborder}></View>
          <TouchableOpacity onPress={toggleModal3}>
            <Text style={[styles.btn, {color: 'rgb(70,50,103)'}]}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

function CrouselImages({item, index, length, data}) {
  return (
    <View
      style={{
        marginHorizontal: !(data === 'Image') ? 16 : 16,
        alignItems: 'center',
        marginTop: 16,
        backgroundColor: 'red',
        marginStart: !(data === 'Image') ? 64 : 56,
      }}>
      <Image
        source={{uri: item.post_image}}
        resizeMode="contain"
        style={{
          width: !(data === 'Image') ? screenWidth : screenWidth - 32,
          height: !(data === 'Image') ? screenWidth : screenWidth - 32,
          backgroundColor: '#d2d2d2',
        }}
      />
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

function CrouselText({item, index, length, data}) {
  return (
    <View
      style={{
        marginHorizontal: !(data === 'Image') ? 16 : 16,
        alignItems: 'center',
        marginTop: 16,
        // backgroundColor: 'red',
        marginStart: !(data === 'Image') ? 64 : 56,
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

export default UserProfileScreen;
