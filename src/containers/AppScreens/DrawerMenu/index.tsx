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

  // const [username, setUsername] = useState('');
  const isFocused = useIsFocused();

  React.useEffect(() => {
    getDataMenu();
  }, [isFocused]);

  const getDataMenu = async () => {
    var token = '';
    try {
      const user = await AsyncStorage.getItem('username');
      const profil = await AsyncStorage.getItem('profilepic');
      const kyckey = await AsyncStorage.getItem('kyckey');

      if (user !== null) {
        setUsername(user);
      }
      if (profil !== null) {
        setProfilePic(profil);
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
      //   await AsyncStorage.removeItem('token')
      await AsyncStorage.removeItem('username');
      await AsyncStorage.removeItem('profilepic');
      await AsyncStorage.removeItem('kyckey');
      await AsyncStorage.removeItem('tokenlogin')
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
              <Image
                source={{uri: profilepic}}
                style={{
                  height: '100%',
                  width: '100%',
                  resizeMode: 'cover',
                  borderRadius: 45,
                }}
              />
              {kycapprovedkey == '1' ? (
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
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                margin: 5,
                marginTop: 140,
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
                  source={Images.logoutsidemenu}
                  style={{tintColor: 'red', width: 25, height: 25}}
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
