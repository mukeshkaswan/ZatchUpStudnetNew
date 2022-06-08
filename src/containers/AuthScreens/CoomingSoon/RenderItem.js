import React, {useState, useEffect, useRef} from 'react';
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
} from 'react-native';
import styles from './style';
import {Images} from '../../../components/index';
const screenWidth = Dimensions.get('window').width;
import {useDispatch, useSelector} from 'react-redux';
import * as userActions from '../../../actions/user-actions-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import CardView from 'react-native-cardview';
import Video from 'react-native-video-player';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useIsFocused, DrawerActions} from '@react-navigation/native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import Carousel, {Pagination} from 'react-native-snap-carousel';

function RenderItem({
  toggleModalCustom,
  gotoChangeComment,
  gotoShowMore,
  gotoCommentLike,
  gotoChangeToggle,
  gotoLikeUnLike,
  gotoComment,
  username,
  isCarousel,
  isCarouselText,
  userid,
  posts,
  parts,
  lenCap,
  len,
  items,
  ind,
  item,
  index,
  props,
  reff,
}) {
  const [indexx, setIndex] = useState(0);
  const [commentValue, setComment] = useState('');

  const [isModalVisible, setModalVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);
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

  const dispatch = useDispatch();

  const toggleModal = () => {
    gotoCallPostLikeApi();
  };

  const toggleModalClose = () => {
    setModalVisible(!isModalVisible);
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
              : item.user_id != userid
              ? props.navigation.navigate('UsersProfile', {
                  item: items,
                })
              : props.navigation.navigate('UserProfileScreen', {
                  item: items,
                });
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={
                item.profile_pic != null
                  ? {uri: item.profile_pic}
                  : Images.profile_default
              }
              style={styles.profilepic}
            />
            <Text style={{marginLeft: 20, fontWeight: 'bold'}}>
              {item.full_name}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleModalCustom(item)}>
          <Image
            source={require('../../../assets/images/dot.png')}
            style={{height: 18, width: 18}}
          />
        </TouchableOpacity>
      </View>
      <View style={{paddingHorizontal: 16, marginTop: 10}}>
        <Image source={item.src} style={{width: '100%'}} />
      </View>
      {posts != [] && item.post_gallery != null ? (
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
                refff={reff}
              />
            )}
            sliderWidth={screenWidth - 32}
            itemWidth={screenWidth - 32}
            layoutCardOffset={0}
            onSnapToItem={index => setIndex(index)}
          />
        </>
      ) : parts != null && parts.length > 0 ? (
        <Carousel
          // layout={'tinder'}
          ref={isCarouselText}
          data={parts}
          renderItem={({item, index}) => (
            <CrouselText item={item} index={index} length={lenCap} />
          )}
          sliderWidth={screenWidth - 32}
          itemWidth={screenWidth - 64}
          layoutCardOffset={0}
          onSnapToItem={index => setIndex(index)}
        />
      ) : (
        <View></View>
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
            color="#000"
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
        item.post_like[0].post_like_user_id == userid &&
        item.post_like_count > 0 ? (
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
              Liked by
              <Text style={styles.boldText}> You</Text>
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              item.post_like[0].user_role == 'EIREPRESENTATIVE'
                ? props.navigation.navigate('SchoolProfile', {
                    item: {
                      user_id: item.post_like[0].post_like_user_id,
                      school_id: item.post_like[0].school_id,
                    },
                  })
                : item.post_like[0].user_id != userid
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
        {posts != [] && item.post_like != null && item.post_like.length >= 2 && (
          <View>
            {/* <TouchableOpacity
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
                      ? 'you '
                      : item.post_like[0].post_like_username + ' '}
                  </Text>
                  and{' '}
                  <Text style={styles.boldText}>
                    {item.post_like.length - 1 + ' Others'}
                  </Text>
                </Text>
              </TouchableOpacity> */}
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
                      ? 'you '
                      : item.post_like[0].post_like_username + ' '}
                  </Text>
                </Text>
              </TouchableOpacity>
              <Text>and </Text>
              <TouchableOpacity onPress={toggleModal}>
                <Text style={styles.boldText}>
                  {item.post_like.length - 1 + ' Others'}
                </Text>
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
        {posts != [] &&
          item.comment_post != null &&
          item.comment_post.map((item, index) => {
            if (index <= 2) {
              return (
                <View key={item + 'sap' + index}>
                  <View style={styles.messageContainer}>
                    <View style={{flexDirection: 'row', flex: 1}}>
                      <TouchableOpacity
                        onPress={() => {
                          item.user_role == 'EIREPRESENTATIVE'
                            ? props.navigation.navigate('SchoolProfile', {
                                item: {
                                  user_id: item.user,
                                  school_id: item.school_id,
                                },
                              })
                            : item.user_id != userid
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
                  {item.comment != null && item.comment.length > 50 && (
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
              props.navigation.navigate('PostDetailScreen', {item});
            }}>
            <Text style={{fontSize: 12, marginTop: 10}}>
              VIEW ALL {item.total_comment} COMMENTS
            </Text>
          </TouchableOpacity>
        )}
        <Text
          style={{
            fontSize: 12,
            marginTop: 10,
          }}>
          {item.post_created_on.toUpperCase()}
        </Text>
      </View>
      {item.commentToggle == true ? (
        <View>
          <View style={styles.border}></View>
          <View style={styles.rowContainer}>
            <TextInput
              style={{width: screenWidth - 120}}
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

function CrouselImages({item, index, length, refff}) {
  return (
    <View
      style={{
        marginHorizontal: 8,
        alignItems: 'center',
        width: screenWidth - 64,
        height: screenWidth - 64,
        // backgroundColor: 'red',
        marginStart: 16,
      }}>
      {item.post_extension != 'mp4' ? (
        <Image
          source={{
            uri:
              item.post_image != null
                ? item.post_image
                : 'https://i.picsum.photos/id/866/1600/900.jpg',
          }}
          resizeMode="contain"
          style={{
            width: screenWidth - 64,
            height: screenWidth - 64,
            backgroundColor: '#d2d2d2',
          }}
        />
      ) : (
        // <Text>kamal</Text>
        <View style={{width: screenWidth - 64, height: screenWidth - 64}}>
          {/* <Video
            key={item + 'sap'}
            ref={ref}
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
            // customStyles={{
            //   seekBar: {
            //     opacity: 0,
            //   },
            // }}
            disableSeek={false}
          /> */}
          <Video
            ref={refff}
            style={{}}
            url={item.post_image}
            placeholder={'https://i.picsum.photos/id/866/1600/900.jpg'}
            // rotateToFullScreen={false}
            hideFullScreenControl={true}
            inlineOnly={true}
            lockRatio={16 / 12}
            resizeMode="contain"
            autoplay
            //  theme={theme}
            // onBackPress={() => this.props.navigation.goBack(null)}
            //  placeholderStyle={{width: width - 32, height: height / 4}}
            //onFullScreen={this.onFullScreen}
          />
        </View>
      )}
      {length > 1 && (
        <Text
          style={{
            margin: 10,
            marginEnd: 20,
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
        // marginHorizontal:10 ,
        //borderRadius: 20,
        alignItems: 'center',
        marginTop: 16,
        // backgroundColor: 'lightgrey',
        //  borderColor: 'grey',
        width: '100%',
        borderWidth: 1,
        //height:screenWidth-55,
        borderColor: 'lightgrey',
      }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          width: screenWidth - 180,
          height: screenWidth - 32,
          //backgroundColor: 'red',
        }}>
        <View
          style={{
            backgroundColor: '#4B2A6A',
            // backgroundColor: 'pink',
            height: 1,
            width: '95%',
            //marginEnd: 32,
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
            // marginHorizontal: 32,
            // marginEnd: 64,
          }}>
          {item}
        </Text>
        <Text
          style={{
            color: '#4B2A6A',
            fontSize: 40,
            textAlign: 'right',
            alignSelf: 'flex-end',
            marginEnd: 20,
          }}>
          ”
        </Text>
        <View
          style={{
            backgroundColor: '#4B2A6A',
            height: 1,
            width: '95%',
            // marginEnd: 32,
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
            paddingHorizontal: 8,
            marginRight: 5,
          }}>
          {index + 1}/{length}
        </Text>
      )}
    </View>
  );
}

export default RenderItem;
