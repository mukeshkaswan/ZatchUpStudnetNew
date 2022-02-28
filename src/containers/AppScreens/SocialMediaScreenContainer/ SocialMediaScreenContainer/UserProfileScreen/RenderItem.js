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

export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);
const screenWidth = Dimensions.get('window').width;
function RenderItem({
  goToNavigate,
  gotoChangeComment,
  gotoComment,
  gotoShowMore,
  gotoCommentLike,
  gotoChangeToggle,
  gotoLikeUnLike,
  toggleModal3,
  ind,
  len,
  items,
  item,
  lenCap,
  index,
  userProfile,
  isCarouselText,
  isCarousel,
  parts,
  user_id,
  data,
  props,
  goToNav,
}) {
  const [indexx, setIndex] = useState(0);

  const gotoNavigate = item => () => {
    item.user_role == 'EIREPRESENTATIVE'
      ? goToNavigate('SchoolProfile', {
          item: {user_id: item.user},
        })
      : item.user_id != user_id
      ? goToNavigate('UsersProfile', {
          item: {user_id: item.user},
        })
      : {};
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
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
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
      {userProfile != '' && item.post_gallery != null ? (
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
              />
            )}
            sliderWidth={screenWidth - 44}
            itemWidth={screenWidth - 44}
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
              item={item}
              gotoNav={gotoNav}
            />
          )}
          sliderWidth={screenWidth - 44}
          itemWidth={screenWidth - 44}
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
            color="#fff"
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
        {userProfile != '' &&
        item.post_like != null &&
        item.post_like.length == 1 &&
        item.post_like[0].post_like_user_id == user_id &&
        item.post_like_count > 0 ? (
          <View>
            <Text>
              Liked by
              <Text style={styles.boldText}> You</Text>
            </Text>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => {
              item.post_like[0].user_role == 'EIREPRESENTATIVE'
                ? props.navigation.navigate('SchoolProfile', {
                    item: {
                      user_id: item.post_like[0].post_like_user_id,
                    },
                  })
                : item.post_like[0].post_like_user_id != user_id
                ? props.navigation.navigate('UsersProfile', {
                    item: {
                      user_id: item.post_like[0].post_like_user_id,
                    },
                  })
                : {};
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
        {userProfile != '' &&
          item.post_like != null &&
          item.post_like.length >= 2 && (
            <TouchableOpacity
              onPress={() => {
                item.post_like[0].user_role == 'EIREPRESENTATIVE'
                  ? props.navigation.navigate('SchoolProfile', {
                      item: {
                        user_id: item.post_like[0].post_like_user_id,
                      },
                    })
                  : item.post_like[0].post_like_user_id != user_id
                  ? props.navigation.navigate('UsersProfile', {
                      item: {
                        user_id: item.post_like[0].post_like_user_id,
                      },
                    })
                  : {};
              }}>
              <Text>
                Liked by{' '}
                <Text style={styles.boldText}>
                  {item.post_like[0].post_like_username}
                </Text>{' '}
                and{' '}
                <Text style={styles.boldText}>
                  {item.post_like.length - 1 + ' '}Others
                </Text>
              </Text>
            </TouchableOpacity>
          )}

        {item.full_name != null && item.post_gallery != null && (
          <Text style={{fontWeight: 'bold', flex: 1, marginTop: 4}}>
            {item.full_name}
          </Text>
        )}
        {item.caption != null && item.post_gallery != null && (
          <Text>{item.caption}</Text>
        )}
        {userProfile != '' &&
          item.comment_post != null &&
          item.comment_post.map((item, index) => {
            if (index <= 2) {
              return (
                <View key={item + 'sap' + index}>
                  <View style={styles.messageContainer}>
                    <View style={{flexDirection: 'row', flex: 1}}>
                      <TouchableOpacity
                        disabled={user_id == item.user ? true : false}
                        onPress={gotoNavigate(item)}>
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
          <View style={styles.rowContainer1}>
            <TextInput
              style={{
                width: screenWidth - 120,
              }}
              placeholder="Add a comment"
              value={item.commentValue}
              onChangeText={text => gotoChangeComment(text, index)}
              multiline={true}
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
}

function CrouselImages({items, gotoNav, item, index, length, data}) {
  let _menu = null;

  const gotoNavigate = () => {
    gotoNav && gotoNav(items);
  };

  return (
    <TouchableOpacity
      style={{
        marginHorizontal: !(data === 'Image') ? 16 : 16,
        alignItems: 'center',
        marginTop: 16,
        backgroundColor: 'red',
        marginStart: !(data === 'Image') ? 64 : 56,
      }}
      onPress={gotoNavigate}>
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
    </TouchableOpacity>
  );
}

function CrouselText({items, gotoNav, item, index, length, data}) {
  const gotoNavigate = () => {
    gotoNav && gotoNav(items);
  };

  return (
    <TouchableOpacity
      style={{
        marginHorizontal: !(data === 'Image') ? 16 : 16,
        alignItems: 'center',
        marginTop: 16,
        // backgroundColor: 'red',
        marginStart: !(data === 'Image') ? 64 : 56,
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
