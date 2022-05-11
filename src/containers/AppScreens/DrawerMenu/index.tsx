import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Dimensions,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import styles from './style';
import {Images} from '../../../components/index';
import {TextField, CustomButton, CustomStatusBar} from '../../../components';
import {useDispatch, useSelector} from 'react-redux';
import * as userActions from '../../../actions/user-actions-types';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  NavigationContainer,
  useIsFocused,
  DrawerActions,
} from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;

interface DrawerMenuScreenScreenProps {
  navigation: any;
}
const DrawerMenuScreen = (props: DrawerMenuScreenScreenProps) => {
  const [username, setUsername] = useState('');
  const [profilepic, setProfilePic] = useState('');
  const [kycapprovedkey, setKycapproved] = useState('');
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [is_kyc_approved, setIs_kyc_approved] = useState();

  const isFocused = useIsFocused();

  React.useEffect(() => {
    getDataMenu();
    getAuthUserInfoApi();
    getStepCountAPi();

  }, [isFocused]);



  /***************************User getStepCountAPi *******************************/

  const getStepCountAPi = async () => {
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

    dispatch(
      userActions.getRegStepCount({
        data,
        callback: ({ result, error }) => {
          if (result) {
            console.warn(
              'after result step count',
              JSON.stringify(result, undefined, 2),
              //  props.navigation.navigate('OtpLogin', { 'firebase_id': result.firebase_username, 'username': email })
            );
            setIs_kyc_approved(result.is_kyc_approved);

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


  /***************************User Auth User Info*******************************/

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
              'after result Auth User INfo',
              JSON.stringify(result, undefined, 2),
              setProfilePic(result.profile_pic),
              setUsername(result.user_first_name + ' ' + result.user_last_name )
              //  props.navigation.navigate('OtpLogin', { 'firebase_id': result.firebase_username, 'username': email })
            );
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
             Toast.show('Invalid credentials', Toast.SHORT);
            setLoading(false);
            console.warn(JSON.stringify(error, undefined, 2));
          }
        },
      }),
    );
  };

  const getDataMenu = async () => {
    var token = '';
    try {
      const user = await AsyncStorage.getItem('username');
      const profil = await AsyncStorage.getItem('profilepic');
      const kyckey = await AsyncStorage.getItem('kyckey');

      console.log('kyckey',kyckey)

      if (user !== null) {
        //setUsername(user);
      }
      if (profil !== null) {
        //setProfilePic(profil);
      }

      if (kyckey !== null) {
        console.log('kyckey', kyckey);

        setKycapproved(kyckey);
      }
    } catch (e) {
      // error reading value
    }
  };
  const Logout = async () => {
    props.navigation.dispatch(DrawerActions.closeDrawer());
    Alert.alert(
      'ZatchUp',
      'Do you want to Logout?',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => LogoutALert()},
      ],
      {cancelable: false},
    );
    return true;
  };

  const LogoutALert = async () => {
    try {
      await AsyncStorage.removeItem('username');
      await AsyncStorage.removeItem('profilepic');
      await AsyncStorage.removeItem('kyckey');
      await AsyncStorage.removeItem('tokenlogin')
      await AsyncStorage.removeItem('Loginflag')
      Toast.show('Logout Successfully ', Toast.SHORT);
      props.navigation.navigate('LoginScreen');
      return true;
    } catch (exception) {
      return false;
    }
  };
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#463267',
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#FFFFFF',
          }}>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-start',
              backgroundColor: 'rgb(70,50,103)',
              height: 80,
              borderBottomLeftRadius: 15,
              borderBottomRightRadius: 15,
            }}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.dispatch(DrawerActions.closeDrawer());
              }}
              style={{alignSelf: 'flex-end', marginRight: 10}}>
              <View>
                <Image
                  source={Images.home}
                  style={{tintColor: '#FFFFFF', width: 35, height: 35}}
                />
              </View>
            </TouchableOpacity>

            <View style={[styles.avatarStyle, {borderRadius: 45}]}>
            {profilepic != '' && profilepic != null ?  <Image
                source={{uri: profilepic}}
                style={{
                  height: 100,
                  width: 100,
                  resizeMode: 'cover',
                  borderRadius: 45,
                }}
              />:<Image
              source={Images.profile_default}
              style={{
                height: 100,
                width: 100,
                resizeMode: 'cover',
                borderRadius: 45,
              }}
            />}
              {is_kyc_approved === true ? (
                <View
                  style={{
                    height: 30,
                    width: 30,
                    borderRadius: 15,
                    position: 'absolute',
                    right: 0,
                  }}>
                  <Image
                    source={Images.blue_tick}
                    style={{height: '100%', width: '100%', resizeMode: 'cover'}}
                  />
                </View>
              ) : null}
            </View>
            {/* <Image source={{ uri: profilepic }} style={{ width: 100, height: 100, borderRadius: 150 / 2, marginTop: 5, alignItems: 'center' }} /> */}

            <View style={{flexDirection: 'column'}}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '500',
                  marginTop: 8,
                  marginLeft: 10,
                  color: '#000000',
                }}>
                {username}
              </Text>
            </View>
          </View>
          {/* <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('ProfileScreen');
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 140,
                margin: 5,
                marginLeft: 15,
              }}>
              <Image
                source={Images.changepassword}
                style={{tintColor: '#000000', width: 25, height: 25}}
              />
              <Text
                style={{
                  color: '#7F7F7F',
                  fontSize: 17,
                  fontWeight: '500',
                  marginLeft: 10,
                }}>
                Profile
              </Text>
            </View>
          </TouchableOpacity> */}

          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('ResetPassword');
            }}
            style={{
              flexDirection: 'row',
               marginTop: 140,
             
            }}
            >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                margin: 5,
               
                marginLeft: 15,
              }}>
              <Image
                source={Images.Passwords}
                style={{tintColor: '#000000', width: 21, height: 21}}
              />
              <Text
                style={{
                  color: '#7F7F7F',
                  fontSize: 17,
                  fontWeight: '500',
                  marginLeft: 10,
                }}>
                Change Password
              </Text>
            </View>
          </TouchableOpacity>

          <View style={{flexDirection: 'column'}}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('SettingScreen');
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 25,
                  margin: 5,
                  marginLeft: 15,
                  marginRight: 10,
                }}>
                <Image
                  source={Images.settings}
                  style={{tintColor: '#000000', width: 22, height: 22}}
                />
                <Text
                  style={{
                    color: '#7F7F7F',
                    fontSize: 17,
                    fontWeight: '500',
                    marginLeft: 10,
                  }}>
                  Settings
                </Text>
              </View>
            </TouchableOpacity>
            {/* <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 25, margin: 5, marginLeft: 15 }}>
                            <Image source={Images.search} style={{ tintColor: '#000000', width: 25, height: 25, }} />
                            <Text style={{ color: '#7F7F7F', fontSize: 17, fontWeight: '500', marginLeft: 10, }} >Settings</Text>
                        </View> */}
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('ContactUs');
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 25,
                  margin: 5,
                  marginLeft: 15,
                }}>
                <Image
                  source={Images.contactus}
                  style={{tintColor: '#000000', width: 22, height: 22}}
                />
                <Text
                  style={{
                    color: '#7F7F7F',
                    fontSize: 17,
                    fontWeight: '500',
                    marginLeft: 10,
                  }}>
                  Contact Us
                </Text>
              </View>
            </TouchableOpacity>
            {/* <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('AboutusScreen');
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 25,
                  margin: 5,
                  marginLeft: 15,
                }}>
                <Image
                  source={Images.ss}
                  style={{tintColor: '#000000', width: 25, height: 25}}
                />
                <Text
                  style={{
                    color: '#7F7F7F',
                    fontSize: 17,
                    fontWeight: '500',
                    marginLeft: 10,
                  }}>
                  About Us
                </Text>
              </View>
            </TouchableOpacity> */}
            {/* <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 25,
                margin: 5,
                marginLeft: 15,
              }}>
              <Image
                source={Images.ss}
                style={{tintColor: '#000000', width: 25, height: 25}}
              />
              <Text
                style={{
                  color: '#7F7F7F',
                  fontSize: 17,
                  fontWeight: '500',
                  marginLeft: 10,
                }}>
                Term & Condition
              </Text>
            </View> */}
            {/* <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('PrivacyPolicy');
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 25,
                  margin: 5,
                  marginLeft: 15,
                }}>
                <Image
                  source={Images.ss}
                  style={{tintColor: '#000000', width: 25, height: 25}}
                />
                <Text
                  style={{
                    color: '#7F7F7F',
                    fontSize: 17,
                    fontWeight: '500',
                    marginLeft: 10,
                  }}>
                  Privacy Policy
                </Text>
              </View>
            </TouchableOpacity> */}
            <TouchableOpacity onPress={() => Logout()}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 25,
                  margin: 5,
                  marginLeft: 15,
                }}>
                <Image
                  source={Images.logouts}
                  style={{tintColor: '#000', width: 22, height: 22}}
                />
                <Text
                  style={{
                    color: '#7F7F7F',
                    fontSize: 17,
                    fontWeight: '500',
                    marginLeft: 10,
                  }}>
                  Logout
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DrawerMenuScreen;
