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
import Video from 'react-native-video-player';
import Ionicons from 'react-native-vector-icons/Ionicons';

const screenWidth = Dimensions.get('window').width - 32;
export const SLIDER_WIDTH = Dimensions.get('window').width - 32;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);

function RenderItem({
  userid,
  gotoChangeComment,
  gotoComment,
  gotoShowMore,
  gotoCommentLike,
  gotoChangeToggle,
  gotoLikeUnLike,
  toggleModal3,
  len,
  items,
  item,
  index,
  parts,
  lenCap,
  props,
  schoolDetail,
  isCarouselText,
  isCarousel,
  data,
  goToNav,
  ref,
}) {
  const [indexx, setIndex] = useState(0);
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModalClose = () => {
    setModalVisible(!isModalVisible);
  };
  const [DATA, setData] = useState([
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
      post_id: item.id,
    };
    setLoading(true);

    dispatch(
      userActions.gotoCallPostLikeApi({
        data,
        callback: ({result, error}) => {
          console.log('hey.......kamal1', result);
          setLoading(false);
          if (result.status) {
            setData(result.data);
            setModalVisible(!isModalVisible);
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

  const renderItem = ({item}) => {
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

  const gotoNav = () => {
    console.log('item', items);
    goToNav && goToNav(items);
  };

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
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={
                item.profile_pic != null
                  ? {uri: item.profile_pic}
                  : Images.profile_default
              }
              style={styles.profilepic1}
            />
            <Text style={{marginLeft: 20, fontWeight: 'bold', width:Platform.OS == 'ios' ? hp(28) : null}}>
              {item.full_name}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleModal3(item)}>
          <Image
            source={require('../../../../../assets/images/dot.png')}
            style={{height: 18, width: 18}}
          />
        </TouchableOpacity>
      </View>
      {/* <View style={{paddingHorizontal: 16, marginTop: 10}}>
      <Image source={item.src} style={{width: '100%'}} />
    </View> */}
      {schoolDetail != '' && item.post_gallery != null ? (
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
                items={items}
                gotoNav={gotoNav}
                ref={ref}
              />
            )}
            sliderWidth={screenWidth}
            itemWidth={screenWidth}
            layoutCardOffset={'0'}
            onSnapToItem={index => setIndex(index)}
          />
        </>
      ) : (
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
              items={items}
              gotoNav={gotoNav}
            />
          )}
          sliderWidth={screenWidth + 16}
          itemWidth={screenWidth + 16}
          layoutCardOffset={'0'}
          onSnapToItem={index => setIndex(index)}
        />
      )}
      <View style={styles.likecommentContainer}>
        <TouchableOpacity onPress={() => gotoLikeUnLike(item)}>
          <Icon
            name={item.like ? 'star' : 'star-o'}
            size={15}
            color={'#000'}
            style={{marginLeft: 5}}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => gotoChangeToggle(index)}>
          <Icon
            name="comment-o"
            color={'#000'}
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
        item.post_like[0].post_like_user_id == userid &&
        item.post_like_count > 0 ? (
          <TouchableOpacity
            onPress={() => {
              item.post_like[0].user_role == 'EIREPRESENTATIVE'
                ? props.navigation.navigate('SchoolProfile', {
                    item: item.post_like[0].school_id,
                  })
                : item.post_like[0].post_like_user_id != userid
                ? props.navigation.navigate('UsersProfile', {
                    item: {user_id: item.post_like[0].post_like_user_id},
                  })
                : props.navigation.navigate('UserProfileScreen', {
                    item: {user_id: item.post_like[0].post_like_user_id},
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
              item.post_like[0].user_role == 'EIREPRESENTATIVE'
                ? props.navigation.navigate('SchoolProfile', {
                    item: item.post_like[0].school_id,
                  })
                : item.post_like_user_id != userid
                ? props.navigation.navigate('UsersProfile', {
                    item: {user_id: item.post_like[0].post_like_user_id},
                  })
                : props.navigation.navigate('UserProfileScreen', {
                    item: {user_id: item.post_like[0].post_like_user_id},
                  });
            }}>
            {item.post_like != null &&
              item.post_like.length == 1 &&
              item.post_like_count > 0 && (
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
            // <TouchableOpacity
            //   onPress={() => {
            //     item.post_like[0].user_role == 'EIREPRESENTATIVE'
            //       ? props.navigation.navigate('SchoolProfile', {
            //           item: item.post_like[0].school_id,
            //         })
            //       : item.post_like[0].post_like_user_id != userid
            //       ? props.navigation.navigate('UsersProfile', {
            //           item: {user_id: item.post_like[0].post_like_user_id},
            //         })
            //       : props.navigation.navigate('UserProfileScreen', {
            //           item: {user_id: item.post_like[0].post_like_user_id},
            //         });
            //   }}>
            //   <Text>
            //     Liked by
            //     <Text style={styles.boldText}>
            //       {' ' + item.post_like[0].post_like_user_id == userid
            //         ? ' you '
            //         : ' ' + item.post_like[0].post_like_username + ' '}
            //     </Text>
            //     and{' '}
            //     <Text style={styles.boldText}>
            //       {item.post_like.length - 1 + ' Others'}
            //     </Text>
            //   </Text>
            // </TouchableOpacity>
            <View>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  onPress={() => {
                    item.post_like[0].user_role == 'EIREPRESENTATIVE'
                      ? props.navigation.navigate('SchoolProfile', {
                          item: {
                            user_id: item.post_like[0].post_like_user_id,
                            school_id: item.post_like[0].school_id,
                          },
                        })
                      : item.post_like[0].post_like_user_id != userid
                      ? props.navigation.navigate('UsersProfile', {
                          item: {
                            user_id: item.post_like[0].post_like_user_id,
                          },
                        })
                      : props.navigation.navigate('UserProfileScreen', {
                          item: {
                            user_id: item.post_like[0].post_like_user_id,
                          },
                        });
                  }}>
                  <Text>
                    Liked by{' '}
                    <Text style={styles.boldText}>
                      {item.post_like[0].post_like_user_id == userid
                        ? 'You '
                        : item.post_like[0].post_like_username + ' '}
                    </Text>
                  </Text>
                </TouchableOpacity>
                <Text>and </Text>
                <TouchableOpacity onPress={toggleModal}>
                  {item.post_like != null && (
                    <Text style={styles.boldText}>
                      {item.post_like.length - 1 + ' Others'}
                    </Text>
                  )}
                </TouchableOpacity>
              </View>

              <Modal
                isVisible={isModalVisible}
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
                    <Text style={{fontSize: 18, fontWeight: '700'}}>Likes</Text>
                    <TouchableOpacity onPress={toggleModalClose} style={{}}>
                      <Image
                        source={Images.closeicon}
                        style={{height: 18, width: 18}}
                      />
                    </TouchableOpacity>
                  </View>
                  <FlatList
                    data={DATA}
                    style={{marginBottom: 16}}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                  />
                </View>
              </Modal>
            </View>
          )}

        {/* {item.full_name != null && item.post_gallery != null && (
          <Text style={{fontWeight: 'bold', flex: 1, marginTop: 4}}>
            {item.full_name}
          </Text>
        )} */}
        {item.caption != null && item.post_gallery != null && (
          <Text>{item.caption}</Text>
        )}
        {schoolDetail != '' &&
          item.comment_post != null &&
          item.comment_post.map((item, index) => {
            if (index <= 2 && item.comment != null && item.comment != '') {
              return (
                <View key={item + 'sap' + index}>
                  <View style={styles.messageContainer}>
                    <View style={{flexDirection: 'row', flex: 1}}>
                      <TouchableOpacity
                        onPress={() => {
                          item.user_role == 'EIREPRESENTATIVE'
                            ? props.navigation.navigate('SchoolProfile', {
                                item: item.school_id,
                              })
                            : item.user != userid
                            ? props.navigation.navigate('UsersProfile', {
                                item: {user_id: item.user},
                              })
                            : props.navigation.navigate('UserProfileScreen', {
                                item: {user_id: item.user},
                              });
                        }}>
                        <Text style={{fontWeight: 'bold', flex: 1}}>
                          {item.comment_username}
                        </Text>
                      </TouchableOpacity>
                      <Text
                        style={{marginLeft: 5, flex: 2}}
                        numberOfLines={item.showMore ? 0 : 1}>
                        {item.comment}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                      }}>
                      <TouchableOpacity onPress={() => gotoCommentLike(item)}>
                        <Icon
                          name={item.likes_status ? 'star' : 'star-o'}
                          size={15}
                          color={'#000'}
                          style={{marginLeft: 5}}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  {item.comment.length > 50 && (
                    <TouchableOpacity onPress={() => gotoShowMore(ind, index)}>
                      <Text>
                        {item.showMore ? '[Show Less]' : '[Show More]'}
                      </Text>
                    </TouchableOpacity>
                  )}
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
          {item.post_created_on.toUpperCase()}
        </Text>
      </View>
      {item.commentToggle == true ? (
        <View>
          <View style={styles.border}></View>
          <View style={styles.rowContainer2}>
            <TextInput
              style={{
                width: screenWidth - 120,
              }}
              placeholder="Add a comment"
              value={item.commentValue}
              onChangeText={text => gotoChangeComment(text, index)}
              multiline={true}
            />
            <View
              style={{
                alignSelf: 'flex-end',
                marginBottom: 5,
                marginLeft: 5,
              }}>
              <TouchableOpacity
                style={styles.postbtn}
                onPress={() => gotoComment(item)}>
                <Text style={{color: 'white'}}>Post</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : (
        <View></View>
      )}
    </CardView>
  );
}

function CrouselImages({items, gotoNav, item, index, length, data, ref}) {
  const gotoNavigate = () => {
    gotoNav && gotoNav(items);
  };

  const [show, setShow] = useState(false);

  const gotoChange = () => {
    setShow(prev => !prev);
  };

  return (
    <>
      <TouchableOpacity
        style={{
          alignItems: 'center',
          marginTop: 16,
          marginStart: 16,
          width: !(data === 'Image') ? screenWidth : screenWidth - 32,
          height: !(data === 'Image') ? screenWidth : screenWidth - 32,
        }}
        onPress={gotoNavigate}>
        {item.post_extension != 'mp4' ? (
          <Image
            source={{uri: item.post_image}}
            resizeMode="contain"
            style={{
              width: !(data === 'Image') ? screenWidth : screenWidth - 32,
              height: !(data === 'Image') ? screenWidth : screenWidth - 32,
              backgroundColor: '#d2d2d2',
            }}
          />
        ) : (
          <TouchableOpacity
            style={{
              width: !(data === 'Image') ? screenWidth : screenWidth - 32,
              height: !(data === 'Image') ? screenWidth : screenWidth - 32,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={gotoChange}>
            <Image
              style={{
                width: !(data === 'Image') ? screenWidth : screenWidth - 32,
                height: !(data === 'Image') ? screenWidth : screenWidth - 32,
              }}
              source={{uri: item.thumbnails}}
            />
            {/* <Video
            ref={ref}
            style={{}}
            url={item.post_image}
            placeholder={'https://i.picsum.photos/id/866/1600/900.jpg'}
            // rotateToFullScreen={false}
            hideFullScreenControl={true}
            inlineOnly={true}
            lockRatio={16 / 12}
            resizeMode="contain"
            autoplay
          /> */}
            <Ionicons
              name={'play-circle-outline'}
              size={64}
              color={'#4B2A6A'}
              style={{
                marginLeft: 5,
                position: 'absolute',
              }}
            />
          </TouchableOpacity>
        )}
        {length > 1 && (
          <Text
            style={{
              margin: 10,
              marginEnd: 24,
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
      <Modal
        style={{padding: 0, margin: 0, backgroundColor: '#fff'}}
        isVisible={show}>
        <View style={{backgroundColor: '#fff'}}>
          <Video
            ref={ref}
            style={{}}
            autoPlay={true}
            url={item.post_image}
            placeholder={'https://i.picsum.photos/id/866/1600/900.jpg'}
            rotateToFullScreen={true}
            lockRatio={16 / 16}
            onBackPress={gotoChange}
          />
        </View>
      </Modal>
    </>
  );
}

function CrouselText({items, gotoNav, item, index, length, data}) {
  const gotoNavigate = () => {
    gotoNav && gotoNav(items);
  };

  return (
    <TouchableOpacity
      style={{
        // marginHorizontal: !(data === 'Image') ? 16 : 16,
        alignItems: 'center',
        marginTop: 16,
        //backgroundColor: 'red',
        marginStart: 3,
        // marginStart: !(data === 'Image') ? 16 : 56,
      }}
      onPress={gotoNavigate}>
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
    </TouchableOpacity>
  );
}

export default RenderItem;
