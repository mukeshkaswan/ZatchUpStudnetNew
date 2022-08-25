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
  SafeAreaView,
  PermissionsAndroid,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {HeaderTitleWithBack, Images} from '../../../../../components';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import {useDispatch} from 'react-redux';
import * as userActions from '../../../../../actions/user-actions-types';
import Contacts from 'react-native-contacts';

import {useIsFocused} from '@react-navigation/native';

interface NotificationsScreenProps {
  navigation: any;
}

const {height, width} = Dimensions.get('window');
const SuggestionScreen = (props: NotificationsScreenProps) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [DATA, setData] = useState([]);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [tab, setTab] = useState('list1');

  const onpresstab1 = () => {
    setTab('list1');
    //this.ApiCall('STUDENTS');
  };
  const onpresstab2 = () => {
    setTab('list2');
    getContacts();
  };

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

  const getContacts = () => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS)
      .then(res => {
        console.log('res===>>>', res);
        Contacts.checkPermission()
          .then(permission => {
            // Contacts.PERMISSION_AUTHORIZED || Contacts.PERMISSION_UNDEFINED || Contacts.PERMISSION_DENIED
            if (permission === 'undefined') {
              Contacts.requestPermission().then(permission => {
                // ...
              });
            }
            if (permission === 'authorized') {
              //Alert.alert('kk');
              Contacts.getAll()
                .then(contacts => {
                  // work with contacts
                  console.log('contacts==>>>', JSON.stringify(contacts));
                  let newArr = [];
                  for (let i = 0; i < contacts.length; i++) {
                    newArr.push({
                      email:
                        contacts[i].emailAddresses.length > 0
                          ? contacts[i].emailAddresses[0].email
                          : '',
                      phone:
                        contacts[i].phoneNumbers.length > 0
                          ? contacts[i].phoneNumbers[0].number
                          : '',
                    });
                  }
                  console.log('NewArr==>>', newArr);
                  CallGetContactSuggestion(newArr);
                })
                .catch(e => {
                  console.log('Error==>>', e);
                });
            }
            if (permission === 'denied') {
              // x.x
            }
          })
          .catch(error => {
            console.log('Err=>', error);
          });
      })
      .catch(error => {
        console.log('Err=>>>', error);
      });
  };

  const CallGetContactSuggestion = async arr => {
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
      contact: arr,
    };

    dispatch(
      userActions.CallGetContactSuggestion({
        data,
        callback: ({result, error}) => {
          if (result) {
            console.warn(
              'after result suggestions conatcts details',
              JSON.stringify(result, undefined, 2),
              //  props.navigation.navigate('OtpLogin', { 'firebase_id': result.firebase_username, 'username': email })
            );

            if (result.status) {
              let newArr = [];
              for (let i in result.data) {
                if (!result.data[i].user_follow_status) {
                  newArr.push(result.data[i]);
                }
              }
              setData(newArr);
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
  //       {text: 'Yes', onPress: onDeleteBTN},
  //     ],
  //     {cancelable: false},
  //   );
  //   return true;
  // }

  function handleBackButtonClick() {
    props.navigation.goBack();
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
      follow_status: item.profile_is_private == true ? 1 : 2,
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
              getContacts();
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
      <View>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 16,
            marginTop: 12,
          }}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('UsersProfile', {
                item: {user_id: item.id},
              });
            }}>
            <Image
              source={
                item.profile_image != null
                  ? {uri: item.profile_image}
                  : Images.profile_default
              }
              style={styles.profileImg}
            />
          </TouchableOpacity>
          <View style={styles.childContainer}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('UsersProfile', {
                  item: {user_id: item.id},
                });
              }}>
              <Text style={styles.name}>
                {item.first_name + ' ' + item.last_name}
              </Text>
              <Text style={{fontSize: 13}}>Suggested for you</Text>
            </TouchableOpacity>
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
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <HeaderTitleWithBack
          navigation={props.navigation}
          headerTitle="Suggestions"
          headerRightcontent={''}
        />
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            paddingVertical: 16,
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: tab == 'list1' ? '#4B2A6A' : 'white',
              height: 50,
              width: 120,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
            }}
            onPress={onpresstab1}>
            <Text
              style={{
                color: tab == 'list1' ? 'white' : 'black',
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              Education
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: tab == 'list2' ? '#4B2A6A' : 'white',
              height: 50,
              width: 120,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              marginLeft: 8,
            }}
            onPress={onpresstab2}>
            <Text
              style={{
                color: tab == 'list2' ? 'white' : 'black',
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              Contact
            </Text>
          </TouchableOpacity>
        </View>
        {suggestions.length > 0 && (
          <FlatList
            ListEmptyComponent={() => (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: height - 180,
                  width,
                }}>
                <Text style={{fontWeight: '700'}}>
                  No suggestion are available
                </Text>
              </View>
            )}
            data={tab == 'list1' ? suggestions : DATA}
            renderItem={renderItem}
            keyExtractor={(item, index) => item.name + 'Sap' + index}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default SuggestionScreen;
