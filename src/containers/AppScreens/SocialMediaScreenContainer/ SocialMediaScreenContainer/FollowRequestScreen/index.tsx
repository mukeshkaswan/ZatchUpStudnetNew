import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  Keyboard,
  BackHandler,
  Alert,
  Dimensions,
  SafeAreaView
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {HeaderTitleWithBack, Images} from '../../../../../components';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import {useDispatch} from 'react-redux';
import * as userActions from '../../../../../actions/user-actions-types';
import ProgressLoader from 'rn-progress-loader';

import {useIsFocused} from '@react-navigation/native';
interface NotificationsScreenProps {
  navigation: any;
}

const {height, width} = Dimensions.get('window');
const FollowRequestScreen = (props: NotificationsScreenProps) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [followReq, setFollowReq] = useState([]);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  useEffect(() => {
    getFollowRequest();
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

  const getFollowRequest = async () => {
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
    // setLoading(true);
    dispatch(
      userActions.getFollowRequest({
        data,
        callback: ({result, error}) => {
          if (result) {
            setLoading(false);
            console.warn(
              'after result follow request',
              JSON.stringify(result, undefined, 2),
              //  props.navigation.navigate('OtpLogin', { 'firebase_id': result.firebase_username, 'username': email })
            );

            if (result.status) {
              setFollowReq(result.data);
            } else {
              // setSchoolDetail('');
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

  const gotoChangeStatus = async (item, flag) => {
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
      follow_user_id: item.follow_user_id,
      accept_request_status: flag == 'confirm' ? true : false,
    };
    // setLoading(true);
    dispatch(
      userActions.changeFollowRequestStatus({
        data,
        callback: ({result, error}) => {
          if (result) {
            setLoading(false);
            console.warn(
              'after result follow request status changed',
              JSON.stringify(result, undefined, 2),
              //  props.navigation.navigate('OtpLogin', { 'firebase_id': result.firebase_username, 'username': email })
            );

            if (result.status) {
              getFollowRequest();
            } else {
              // setSchoolDetail('');
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

  const renderItem = ({item, index}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 16,
          marginTop: 12,
        }}>
        <Image
          source={
            item.follow_request_user_profile_pic != null
              ? {uri: item.follow_request_user_profile_pic}
              : Images.profile_default
          }
          style={styles.profileImg}
        />
        <View style={styles.childContainer}>
          <View>
            <Text style={styles.name}>{item.follow_username}</Text>
            <Text style={{fontSize: 13}}>Suggested for you</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={{
                padding: 12,
                backgroundColor: '#4B2A6A',
                borderRadius: 4,
                borderColor: 'grey',
                marginEnd: 8,
              }}
              onPress={() => gotoChangeStatus(item, 'confirm')}>
              <Text style={{color: '#fff'}}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                padding: 12,
                // backgroundColor: '#fff',
                borderRadius: 4,
                borderColor: 'grey',
                borderWidth: 1,
              }}
              onPress={() => gotoChangeStatus(item, 'delete')}>
              <Text style={{color: '#000'}}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex:1}}>
    <View style={styles.container}>
      <HeaderTitleWithBack
        navigation={props.navigation}
        headerTitle="Follow Requests"
        headerRightcontent={''}
      />
      <FlatList
        data={followReq}
        renderItem={renderItem}
        ListEmptyComponent={() => (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              height: height - 72,
              width,
            }}>
            <Text style={{fontWeight: '700'}}>
              No follow request is available
            </Text>
          </View>
        )}
        keyExtractor={(item, index) => item.name + 'Sap' + index}
      />
    </View>
    </SafeAreaView>
  );
};

export default FollowRequestScreen;
