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

const data3 = [
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

const screenWidth = Dimensions.get('window').width - 32;
export const SLIDER_WIDTH = Dimensions.get('window').width - 32;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);

const SchoolProfile = (props: SchoolProfileProps) => {
  const {
    item: {school_id},
  } = props.route.params;
  console.log('user_id=====>>', school_id);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [data, active_data] = useState('th');
  const [isLoading, setLoading] = useState(false);
  const [schoolDetail, setSchoolDetail] = useState('');
  const [index, setIndex] = useState(0);
  const [commentValue, setComment] = useState('');
  useEffect(() => {
    getSchoolProfile(school_id);
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

  const getSchoolProfile = async school_id => {
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
    };

    dispatch(
      userActions.getSchoolProfile({
        data,
        callback: ({result, error}) => {
          if (result) {
            console.warn(
              'after result school profile details',
              JSON.stringify(result, undefined, 2),
              //  props.navigation.navigate('OtpLogin', { 'firebase_id': result.firebase_username, 'username': email })
            );

            if (result.status) {
              let newArr = [];
              for (let i in result.data[0].social_post) {
                newArr.push({
                  ...result.data[0].social_post[i],
                  //commentValue: '',
                  commentToggle: false,
                });
              }

              let newObject = {...result.data[0], social_post: newArr};

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
            getSchoolProfile(school_id);
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
            getSchoolProfile(school_id);
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
            getSchoolProfile(school_id);
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

  const renderItem1 = ({item}) => (
    <View
      style={{
        borderRadius: 10,
        backgroundColor: 'white',
        margin: 5,
        padding: 8,
        alignItems: 'center',
        width: 380,
      }}>
      <Image
        source={require('../../../../../assets/images/college2.jpg')}
        style={styles.image1}
      />
    </View>
  );
  const renderItem2 = ({item}) => (
    <Card style={styles.cardcontent}>
      <View style={{padding: 16}}>
        <View style={styles.cardcontent1}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={require('../../../../../assets/images/pic.jpeg')}
              style={styles.profilepic}
            />
            <Text style={styles.nametext}>Rahul Yadav</Text>
          </View>
          <Icon name="ellipsis-v" color="grey" size={20} />
        </View>

        <Image
          source={require('../../../../../assets/images/video.jpg')}
          style={{width: '100%', height: 150, borderRadius: 15}}
        />
        <View style={{flexDirection: 'row', marginTop: 5}}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('PostDetailScreen');
            }}>
            <Icon
              name="thumbs-up"
              size={15}
              color="grey"
              style={{marginLeft: 5}}
            />
          </TouchableOpacity>
          <Icon name="comment" color="grey" size={15} style={{marginLeft: 5}} />
        </View>

        <FlatList
          data={data2}
          renderItem={({item}) => (
            <View
              style={{
                flex: 1,

                justifyContent: 'space-between',
                flexDirection: 'row',
                marginTop: 10,
              }}>
              <Text style={{flex: 2.1, fontWeight: 'bold'}}>Rahul Yadav</Text>
              <Text style={{flex: 5.2}}>
                Lorem ipsum is simply dummy jlke{''}
              </Text>

              <Icon
                name="thumbs-up"
                size={15}
                color="grey"
                style={{marginLeft: 5, alignSelf: 'flex-end'}}
              />
            </View>
          )}
          //  ItemSeparatorComponent={renderIndicator}
        />
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('PostDetailScreen');
          }}>
          <Text style={{fontSize: 12, marginTop: 10}}>VIEW ALL 3 COMMENT</Text>
        </TouchableOpacity>

        <Text style={{fontSize: 12, marginTop: 8}}>1 Hour ago</Text>
      </View>
      <View style={{borderWidth: 0.5, borderColor: 'lightgrey'}}></View>
      <View style={styles.cardrowContainer}>
        <TextInput placeholder="Add a comment" />
        <TouchableOpacity style={styles.postbtn}>
          <Text style={{color: 'white'}}>Post</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );

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
          marginTop: 16,
          // backgroundColor: 'red',
          //  borderColor: 'grey',
        }}>
        <Image
          source={{uri: item.post_image}}
          resizeMode="contain"
          style={{
            width: screenWidth - 32,
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

  return (
    <View style={styles.container}>
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
                  : require('../../../../../assets/images/college2.jpg')
              }
              resizeMode="stretch"
              style={{width: '100%', height: 100}}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View></View>
                <View
                  style={{
                    backgroundColor: 'black',
                    height: 30,
                    width: 30,
                    justifyContent: 'center',
                    margin: 10,
                    alignItems: 'center',
                  }}>
                  <Icon name="ellipsis-v" color="white" size={20} />
                </View>
              </View>
            </ImageBackground>

            <View style={styles.rowContainer}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View>
                  <Image
                    source={
                      schoolDetail.profile_pic != null
                        ? {uri: schoolDetail.profile_pic}
                        : require('../../../../../assets/images/pic.jpeg')
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
                    <Icon
                      name="check-circle"
                      size={18}
                      color="#4E387E"
                      style={{
                        margin: 12,
                        position: 'absolute',
                        right: 0,
                        bottom: 0,
                        marginRight: 1,
                      }}
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
                    props.navigation.navigate('FollowersScreen');
                  }}>
                  <Text style={styles.boldText}>
                    {schoolDetail.social_user_followers}
                  </Text>
                  <Text>Followers</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate('FollowingScreen');
                  }}
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
                </TouchableOpacity>
              </View>
              <View style={{marginTop: 10}}>
                <TouchableOpacity
                  style={{}}
                  onPress={() => {
                    props.navigation.navigate('Messages');
                  }}>
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
                onPress={() => {
                  props.navigation.navigate('CreatePostScreen');
                }}>
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
          {!(data === 'Image') ? (
            <FlatList
              data={schoolDetail.social_post}
              // horizontal={true}
              // numColumns={2}
              renderItem={({item}) => {
                let len = item.post_gallery.length;
                return (
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
                      dotsLength={len}
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
                );
              }}
              //  keyExtractor={item => item.id}
              //style={{alignSelf: 'center'}}
            />
          ) : (
            <FlatList
              data={schoolDetail.social_post}
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
                    <View style={styles.rowContainer1}>
                      <TouchableOpacity
                      // onPress={() => {
                      //   props.navigation.navigate('UsersProfile', {item});
                      // }}
                      >
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Image
                            source={
                              item.profile_pic != null
                                ? {uri: item.profile_pic}
                                : require('../../../../../assets/images/pic.jpeg')
                            }
                            style={styles.profilepic1}
                          />
                          <Text style={{marginLeft: 20, fontWeight: 'bold'}}>
                            {item.full_name}
                          </Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                      // onPress={toggleModal}
                      >
                        <Image
                          source={require('../../../../../assets/images/dot.png')}
                          style={{height: 18, width: 18}}
                        />
                      </TouchableOpacity>
                    </View>
                    {/* <View style={{paddingHorizontal: 16, marginTop: 10}}>
                      <Image source={item.src} style={{width: '100%'}} />
                    </View> */}
                    {schoolDetail != '' && (
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
                            />
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
                      {schoolDetail != '' &&
                      item.post_like != null &&
                      item.post_like.length == 1 &&
                      item.post_like[0].post_like_username == 'username' ? (
                        <TouchableOpacity
                          onPress={() => {
                            props.navigation.navigate('ProfileScreen');
                          }}>
                          <Text>
                            Liked by
                            <Text style={styles.boldText}> You</Text>
                          </Text>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          onPress={() => {
                            item.user_role == 'STUDENTS' &&
                              props.navigation.navigate('UsersProfile', {
                                item: items,
                              });
                          }}>
                          {item.post_like != null && (
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
                      {schoolDetail != '' &&
                        item.post_like != null &&
                        item.post_like.length >= 2 && (
                          <TouchableOpacity
                            onPress={() => {
                              item.user_role == 'STUDENTS' &&
                                props.navigation.navigate('UsersProfile', {
                                  item: items,
                                });
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
                        <Text
                          style={{fontWeight: 'bold', flex: 1, marginTop: 4}}>
                          {item.full_name}
                        </Text>
                      )}
                      {item.caption != null && <Text>{item.caption}</Text>}
                      {schoolDetail != '' &&
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
                                      item.user_role == 'STUDENTS' &&
                                        props.navigation.navigate(
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
                            props.navigation.navigate('PostDetailScreen', {
                              item,
                            });
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
                      <View style={{marginTop: 32}}>
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
          )}
        </ScrollView>
      )}
    </View>
  );
};
export default SchoolProfile;
