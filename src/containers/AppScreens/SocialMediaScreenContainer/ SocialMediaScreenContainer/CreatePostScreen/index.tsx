import React, { Component, FC, useEffect, useState } from 'react';
import {
  Text,
  View,
  Dimensions,
  BackHandler,
  FlatList,
  Image,
  TextInput,
  Alert,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import styles from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Images, Colors } from '../../../../../components/index';
//import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-crop-picker';
import {
  TextField,
  CustomButton,
  CustomStatusBar,
  Validate,
  CustomHeader,
  BackBtn,
  HeaderTitleWithBack,
} from '../../../../../components';
import { CheckBox } from 'react-native-elements';
import Modal from 'react-native-modal';
import {
  NavigationContainer,
  useIsFocused,
  useFocusEffect,
} from '@react-navigation/native';
import CardView from 'react-native-cardview';
import { useDispatch, useSelector } from 'react-redux';
import * as userActions from '../../../../../actions/user-actions-types';
import Toast from 'react-native-simple-toast';
import ProgressLoader from 'rn-progress-loader';
import { Card } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
// import https from 'https';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { ScrollView } from 'react-native-gesture-handler';
const Data = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }];

interface NotificationsScreenProps {
  navigation: any;
}
const CreatePostScreen = (props: NotificationsScreenProps) => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);

  const [Caption, addCaption] = useState('');
  const isFocused = useIsFocused();

  const [frontimage, setImageFront] = useState();
  const [picdata, setpicdata] = useState([]);
  const [userid, setUserid] = useState('');
  const [username, setUsername] = useState('');
  const [userProfilePic, setUserProfilePic] = useState('');

  const [pic] = useState([]);

  useEffect(() => {
    // console.log('rtyuigfghj', props)
    getAuthUserInfoApi();
    addCaption('');

    // Clear();
    // storePhoto();
    // loadphoto();
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
        callback: ({ result, error }) => {
          if (result) {
            console.warn(
              'after result Auth User INfo++++++',
              JSON.stringify(result, undefined, 2),
              //  setuserName(result.full_name),
              //  props.navigation.navigate('OtpLogin', { 'firebase_id': result.firebase_username, 'username': email })
            );
            console.log('USER_ID' + result.user_id);
            setUserid(result.user_id);
            setUsername(result.full_name);
            setUserProfilePic(result.profile_pic);
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

  const onPressAddpost = async () => {
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
    console.log('tken------------------', token);
    console.log(picdata);
    //return;
    const data = {
      caption: Caption,
      post_gallery: picdata,
      token: token,
    };

    setLoading(true);

    dispatch(
      userActions.createPost({
        data,
        callback: ({ result, error }) => {
          if (result.status) {
            setLoading(false);
            console.log('post created');
            props.navigation.goBack();
          }
          if (result.status === false) {
            console.warn(JSON.stringify(error, undefined, 2));
            setLoading(false);
            Toast.show(result.error.message[0], Toast.SHORT);
          } else {
            setLoading(false);
            console.warn(JSON.stringify(error, undefined, 2));
          }
        },
      }),
    );
    // }
  };

  const getImageFrontGallery = async () => {
    if (picdata.length == 5) {
      Toast.show("You can't upload more than 5 images/videos");
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

    try {
      let image = await ImagePicker.openPicker({ cropping: true });
      image.type = image.mime;
      image.name = image.path.substr(image.path.lastIndexOf('/') + 1);
      image.uri = image.path;
      let formData = new FormData();
      formData.append('folder_name', 'lecture_upload');
      formData.append('myFile', {
        name: image.name,
        fileName: image.name,
        type: image.type,
        uri:
          Platform.OS === 'android'
            ? image.uri
            : image.uri.replace('file://', ''),
      });
      console.log(token);

      axios('https://apis.zatchup.com:2000/api/uploadFile', {
        method: 'POST',
        data: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => {
          console.log(
            `response received ${JSON.stringify(response.bodyString)}`,
          );
          let data = JSON.parse(response.bodyString);
          if (data.status) {
            console.log(data.message);
            let p = data.location;
            pic.push(p);

            setpicdata(pic);

            setImageFront({
              name: image.name,
              fileName: image.name,
              type: image.type,
              uri:
                Platform.OS === 'android'
                  ? image.uri
                  : image.uri.replace('file://', ''),
            });
          }
        })
        .catch(err => {
          console.log(`error: ${err}`);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const gototRemove = index => {
    let newObj = Object.assign([], picdata);

    newObj.splice(index, 1);

    pic.splice(index, 1);

    console.log('newDatat===>>>>', newObj);

    setpicdata(newObj);
  };

  const _renderItem = ({ item, index }) => {
    return (
      <View style={{}}>
        <Image
          source={{ uri: item }}
          style={{
            width: screenWidth / 3 - 21,
            height: screenWidth / 3 - 21,
            //backgroundColor: 'green',
            resizeMode: 'contain',
            borderRadius: 8,
            marginTop: 16,
            marginStart: 16,
          }}
        />
        <TouchableOpacity
          onPress={() => gototRemove(index)}
          style={{
            position: 'absolute',
            //backgroundColor: 'red',
            width: 30,
            height: 30,
            alignItems: 'center',
            justifyContent: 'center',
            right: 0,
            top: 0,
            marginTop: 16,
          }}>
          <Image
            source={Images.delete_icon}
            style={{ width: 20, height: 20, resizeMode: 'contain' }}
          />
        </TouchableOpacity>
      </View>
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
          style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
          color={'white'}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <CustomStatusBar />
      <CustomHeader
        Title={'Create Post'}
        Back={'true'}
        navigation={props.navigation}
      />
      <KeyboardAwareScrollView enableOnAndroid={true}>
        <CardView
          cardElevation={5}
          cardMaxElevation={5}
          //cornerRadius={20}
          style={styles.card}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={
                  userProfilePic != ''
                    ? { uri: userProfilePic }
                    : Images.profile_default
                }
                style={{
                  height: 50,
                  width: 50,
                  // tintColor: 'grey',
                  borderRadius: 25,
                }}
              />
              <Text style={styles.nametext}>{username}</Text>
            </View>
          </View>

          <View style={styles.textinputContainer}>
            <TextInput
              placeholder="Write a caption"
              multiline={true}
              numberOfLines={4}
              style={styles.textinput}
              onChangeText={val => addCaption(val)}
              value={Caption}
              maxLength={700}
            />
          </View>
          <Text style={{ alignSelf: 'flex-end' }}>{Caption.length}/700</Text>
        </CardView>

        {picdata.length > 0 && (
          <FlatList
            style={{ flex: 1 }}
            data={picdata}
            numColumns={3}
            renderItem={_renderItem}
            keyExtractor={(item, index) => item + 'Sap' + index}
          />
        )}

        {picdata.length == 0 && (
          <TouchableOpacity
            onPress={() => getImageFrontGallery()}
            style={{
              backgroundColor: '#4B2A6A',
              height: screenWidth / 3 - 21,
              width: screenWidth / 3 - 21,
              marginLeft: 16,
              borderRadius: 10,
              marginTop: 16,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon name="camera" size={25} color="white" style={{ margin: 5 }} />
            <Text style={styles.addphotoText}>Add Photo</Text>
          </TouchableOpacity>
        )}

        {picdata.length > 0 && (
          <TouchableOpacity
            onPress={() => getImageFrontGallery()}
            style={{
              backgroundColor: '#4B2A6A',
              height: screenWidth / 3 - 21,
              width: screenWidth / 3 - 21,
              marginLeft: 16,
              marginTop: 16,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon name="camera" size={25} color="white" style={{ margin: 5 }} />
            <Text style={styles.addphotoText}>Add Photo</Text>
          </TouchableOpacity>
        )}

        {(picdata.length > 0 || Caption != '') && (
          <View>
            <View style={{ paddingHorizontal: 16, marginVertical: 10 }}>
              <CustomButton title={'Post'} onPress={onPressAddpost} />
            </View>
          </View>
        )}
      </KeyboardAwareScrollView>
    </View>
  );
};

export default CreatePostScreen;
