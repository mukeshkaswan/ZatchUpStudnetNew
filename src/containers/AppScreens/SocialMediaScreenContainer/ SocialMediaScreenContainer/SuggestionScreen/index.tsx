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
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {HeaderTitleWithBack, Images} from '../../../../../components';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import {useDispatch} from 'react-redux';
import * as userActions from '../../../../../actions/user-actions-types';

import {useIsFocused} from '@react-navigation/native';
interface NotificationsScreenProps {
  navigation: any;
}

const {height, width} = Dimensions.get('window');
const SuggestionScreen = (props: NotificationsScreenProps) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  useEffect(() => {
    getSuggestions();
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

  const getSuggestions = async () => {
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
      userActions.getSuggestions({
        data,
        callback: ({result, error}) => {
          if (result) {
            console.warn(
              'after result suggestions details',
              JSON.stringify(result, undefined, 2),
              //  props.navigation.navigate('OtpLogin', { 'firebase_id': result.firebase_username, 'username': email })
            );

            if (result.status) {
              setSuggestions(result.data);
            } else {
              // setSchoolDetail('');
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

  const gotoFollow = async item => {
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
      follow_status: 1,
      following_user_id: item.id,
    };

    dispatch(
      userActions.followUser({
        data,
        callback: ({result, error}) => {
          if (result) {
            console.warn(
              'after result follow user',
              JSON.stringify(result, undefined, 2),
              //  props.navigation.navigate('OtpLogin', { 'firebase_id': result.firebase_username, 'username': email })
            );

            if (result.status) {
              getSuggestions();
            } else {
              // setSchoolDetail('');
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
            item.profile_image != null
              ? {uri: item.profile_image}
              : Images.profile_default
          }
          style={styles.profileImg}
        />
        <View style={styles.childContainer}>
          <View>
            <Text style={styles.name}>
              {item.first_name + ' ' + item.last_name}
            </Text>
            <Text style={{fontSize: 13}}>Suggested for you</Text>
          </View>
          <TouchableOpacity
            style={{
              paddingHorizontal: 16,
              paddingVertical: 8,
              backgroundColor: '#4B2A6A',
              borderRadius: 4,
              borderColor: 'grey',
              marginEnd: 8,
            }}
            onPress={() => gotoFollow(item)}>
            <Text style={{color: '#fff'}}>Follow</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <HeaderTitleWithBack
        navigation={props.navigation}
        headerTitle="Suggestions"
        headerRightcontent={''}
      />
      {suggestions.length > 0 && (
        <FlatList
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
          data={suggestions}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.name + 'Sap' + index}
        />
      )}
    </View>
  );
};

export default SuggestionScreen;