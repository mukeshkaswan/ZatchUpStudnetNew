import React, {Component, FC, useEffect, useState} from 'react';
import {
  Text,
  View,
  Dimensions,
  BackHandler,
  FlatList,
  Image,
  Alert,
  TextInput,
  Keyboard,
  SafeAreaView,
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
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

interface NotificationsScreenProps {
  navigation: any;
}

const {width, height} = Dimensions.get('screen');
const BlockListScreen = (props: NotificationsScreenProps) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [isLoading, setLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [allSelected, setSelected] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [data2, setData] = useState([]);
  const checkedterm = () => {
    setSelected(!allSelected);
  };

  useEffect(() => {
    getBlockListApi();

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

  // function handleBackButtonClick() {
  //   Alert.alert(
  //     'Exit App',
  //     'Do you want to exit?',
  //     [
  //       {
  //         text: 'No',
  //         onPress: () => console.log('Cancel Pressed'),
  //         style: 'cancel',
  //       },
  //       {text: 'Yes'},
  //     ],
  //     {cancelable: false},
  //   );
  //   return true;
  // }

  function handleBackButtonClick() {
    props.navigation.goBack();
    return true;
  }

  const getBlockListApi = async () => {
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
    };
    setLoading(true);

    dispatch(
      userActions.getBlockList({
        data,
        callback: ({result, error}) => {
          console.log('hey.......kamal1', result);
          setLoading(false);
          if (result.status) {
            setData(result.results);
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

  const blockprofile = async item => {
    Alert.alert(
      'ZatchUp',
      ' Are you sure you want to Unblock Profile?',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => gotoBlockProfile(item)},
      ],
      {cancelable: false},
    );
    return true;
  };

  const gotoBlockProfile = async item => {
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
      blocked_user_id: item.profile_reported_user_id,
      block_user_status: false,
    };

   // console.log('ReportPost==>>', data);

    dispatch(
      userActions.blockUser({
        data,
        callback: ({result, error}) => {
          if (result) {
            console.warn(
              'after result block data',
              JSON.stringify(result, undefined, 2),
              //  props.navigation.navigate('OtpLogin', { 'firebase_id': result.firebase_username, 'username': email })
            );
            if (result.status) {
              Toast.show(result.message, Toast.SHORT);
              getBlockListApi();
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

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <CustomStatusBar />
        <CustomHeader
          Title={'Block List'}
          Back={'true'}
          navigation={props.navigation}
        />

        <FlatList
          data={data2}
          renderItem={({item}) => (
            <CardView
              cardElevation={5}
              cardMaxElevation={5}
              //cornerRadius={20}
              style={styles.card}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={
                      item.blocked_user_profile_pic != null
                        ? {uri: item.blocked_user_profile_pic}
                        : Images.profile_default
                    }
                    style={{width: 50, height: 50, borderRadius: 50}}
                  />
                  <Text style={{fontWeight: 'bold', marginLeft: 10}}>
                    {item.blocked_username}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => blockprofile(item)}>
                  <Text style={{color: 'white', fontWeight: 'bold'}}>
                    Unblock
                  </Text>
                </TouchableOpacity>
              </View>
            </CardView>
          )}
          ListEmptyComponent={() => (
            <View
              style={{
                height: height - 80,
                width: width,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{fontSize: 20}}>Records Not Available</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default BlockListScreen;
