import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Alert,
  Button,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import styles from './style';
import {Images} from '../../../components/index';
import {
  TextField,
  CustomButton,
  CustomStatusBar,
  BackBtn,
  ModelComponent,
  CustomHeader,
  CustomDropdown,
  Validate,
} from '../../../components';
import {useDispatch, useSelector} from 'react-redux';
import * as userActions from '../../../actions/user-actions-types';
import Toast from 'react-native-simple-toast';
import ProgressLoader from 'rn-progress-loader';
//import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-crop-picker';
import {NavigationContainer, useIsFocused} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import RBSheet from 'react-native-raw-bottom-sheet';
import {ScrollView} from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const screenWidth = Dimensions.get('window').width;

interface PersonalinfoScreenProps {
  navigation: any;
  route: any;
}

const Personalinfo = (props: PersonalinfoScreenProps) => {
  const [Mother, setMother] = useState('');
  const [Father, setFather] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [frontimage, setImageURI] = useState('');
  const refRBSheet = useRef();
  const [imagename, setImagename] = useState('');

  const dispatch = useDispatch();

  const isFocused = useIsFocused();

  useEffect(() => {
    //  USERCOURSECONFIRMATION()
    getStepCountAPi();
    setMother('');
    setFather('');
    setImageURI('');
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
    //  setImagename('')
  }, [isFocused]);

  function handleBackButtonClick() {
    Alert.alert(
      'ZatchUp',
      'Do you want to exit?',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => BackHandler.exitApp()},
      ],
      {cancelable: false},
    );
    return true;
  }
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

  const OpenCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: true,
    }).then(image => {
      let parts = image.path.split('/');
      let uri = Platform.OS === 'ios' ? `file:///${image.path}` : image.path;
      let name = parts[parts.length - 1];
      let type = image.mime;

      const file = {
        uri,
        name,
        type,
      };
      // setImage(file);
      //   setImageFrontName(name)
      setImageURI(image.path);
      UploadFile(file);
      refRBSheet.current.close();
    });
  };

  const getImage = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
      //  cropperCircleOverlay: true,
      freeStyleCropEnabled: true,
      avoidEmptySpaceAroundImage: true,
    }).then(image => {
      let parts = image.path.split('/');
      let uri = Platform.OS === 'ios' ? `file:///${image.path}` : image.path;
      let name = parts[parts.length - 1];
      let type = image.mime;

      const file = {
        uri,
        name,
        type,
      };
      // setImage(file);
      //   setImageFrontName(name)
      setImageURI(image.path);
      UploadFile(file);
      refRBSheet.current.close();
    });
  };

  /***************************User getStepCountAPi *******************************/

  const USERCOURSECONFIRMATION = async () => {
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
      school_id: props.route.params.schoolidkey,
    };
    setLoading(true);

    dispatch(
      userActions.getusercourseconfirmation({
        data,
        callback: ({result, error}) => {
          if (result) {
            // console.warn(
            //   'after user confirmation result step',
            //   JSON.stringify(result, undefined, 2),

            // );
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

  /***************************User Upload File*******************************/

  const UploadFile = async file => {
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
      file_name: file,
    };
    dispatch(
      userActions.getUploadFile({
        data,
        callback: ({result, error}) => {
          if (result) {
            // console.warn(
            //     'after result upload file',
            //     JSON.stringify(result, undefined, 2),

            //     // props.navigation.navigate('Approval')
            // );
            setImagename(result.filename);

            Toast.show('Successfully Added ', Toast.SHORT);

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

  /***************************User getStepCountAPi *******************************/

  const getStepCountAPi = async () => {
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
      userActions.getRegStepCount({
        data,
        callback: ({result, error}) => {
          if (result) {
            // console.warn(
            //     'after result step count',
            //     JSON.stringify(result, undefined, 2),

            // );
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

  /***************************User Add Profile *******************************/

  const AddProfile = async () => {
    const frontimageError = Validate('image', frontimage);
    const motherError = Validate('Mother', Mother);
    const fatherError = Validate('Father', Father);

    if (frontimageError || motherError || fatherError) {
      //this._scrollView.scrollTo(0);
      Toast.show(frontimageError || motherError || fatherError, Toast.SHORT);

      return false;
    } else {
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
        mother_name: Mother,
        father_name: Father,
        profile_pic: imagename,
      };
      setLoading(true);

      dispatch(
        userActions.getAddProfilePicInfo({
          data,
          callback: ({result, error}) => {
            if (result) {
              // console.warn(
              //     'after result add profile',
              //     JSON.stringify(result, undefined, 2),

              // );
              Toast.show('Profile Successfully Added', Toast.SHORT),
                props.navigation.navigate('Approval');
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
    }
  };

  /***************************User Add Profile Skip *******************************/

  const AddProfileSkip = async () => {
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
      mother_name: '',
      father_name: '',
      profile_pic: '',
    };
    // setLoading(true);

    dispatch(
      userActions.getAddProfilePicInfoSkip({
        data,
        callback: ({result, error}) => {
          if (result) {
            // console.warn(
            //     'after result add profile skip',
            //     JSON.stringify(result, undefined, 2),

            // );
            props.navigation.navigate('Approval');
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

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={'always'}
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <CustomStatusBar />
          {isLoading && renderIndicator()}

          <View
            style={{
              height: Platform.OS === 'ios' ? '10%' : '10%',
              backgroundColor: 'rgb(70,50,103)',
              borderBottomLeftRadius: 15,
              borderBottomRightRadius: 15,
            }}>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                alignSelf: 'center',
              }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    textAlignVertical: 'center',
                    textAlign: 'center',
                    color: 'white',
                    fontSize: hp(2.8),
                    fontFamily: 'Lato-Regular',

                    marginTop: Platform.OS === 'ios' ? 10 : 0,
                  }}>
                  {'Personal Information'}
                </Text>
              </View>
            </View>
          </View>

          {/* <CustomHeader Title={'Personal Information'} Back={'false'} navigation={props.navigation} /> */}

          <RBSheet
            ref={refRBSheet}
            // closeOnDragDown={true}
            //closeOnPressMask={false}
            height={183}
            nabledGestureInteraction={true}
            enabledContentTapInteraction={false}
            closeOnDragDown={true}
            closeOnPressMask={false}
            //  openDuration={10}
            customStyles={{
              wrapper: {
                backgroundColor: 'transparent',
              },
              draggableIcon: {
                backgroundColor: '#000',
              },
            }}>
            <View
              style={{
                flexDirection: 'column',
                alignContent: 'space-around',
                //alignItems: 'stretch',
                //marginTop: 10
              }}>
              <TouchableOpacity
                onPress={() => OpenCamera()}
                style={{padding: 15, backgroundColor: '#FFFFFF'}}>
                <Text style={{color: '#000', fontSize: 17}}>
                  {'Open Camera'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => getImage()}
                style={{padding: 15, backgroundColor: '#FFFFFF'}}>
                <Text style={{color: '#000', fontSize: 17}}>
                  {'Open Gallery'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => refRBSheet.current.close()}
                style={{padding: 15, backgroundColor: '#4B2A6A'}}>
                <Text style={{color: '#FFFFFF', fontSize: 17}}>{'Cancel'}</Text>
              </TouchableOpacity>
            </View>
          </RBSheet>

          <View style={{flex: 1}}>
            <TouchableOpacity
              onPress={() => refRBSheet.current.open()}
              //onPress={getImage}
              style={styles.logoContainer}>
              <View>
                {frontimage == '' ? (
                  <Image
                    style={{
                      width: 140,
                      height: 140,
                      borderRadius: 150 / 2,
                      overflow: 'hidden',
                      borderWidth: 3,
                      //borderColor: ""
                    }}
                    //  source={{ uri: frontimage }}
                    source={Images.crete_camera}
                  />
                ) : (
                  <Image
                    style={{
                      width: 140,
                      height: 140,
                      borderRadius: 150 / 2,
                      overflow: 'hidden',
                      borderWidth: 3,
                      //borderColor: ""
                    }}
                    source={{uri: frontimage}}
                    // source={Images.crete_camera}
                  />
                )}

                <View
                  style={{
                    height: 25,
                    width: 25,
                    borderRadius: 15,
                    position: 'absolute',
                    right: 20,
                    top: 8,
                  }}>
                  <Image
                    source={Images.edit_icon}
                    style={{height: '80%', width: '80%', resizeMode: 'cover'}}
                  />
                </View>
              </View>
            </TouchableOpacity>

            <View style={styles.inputContainer}>
              <View style={styles.inputmarginBottom}>
                <TextField
                  placeholder={'Enter your Mother Name '}
                  onChangeText={val => setMother(val)}
                  value={Mother}
                />
              </View>

              <View style={styles.inputmarginBottom}>
                <TextField
                  placeholder={'Enter your Father Name'}
                  onChangeText={val => setFather(val)}
                  value={Father}
                />
              </View>
              <View>
                <CustomButton
                  title={'Submit'}
                  onPress={() => AddProfile()}
                  // onPress={() => props.navigation.navigate('Approval')}
                />
              </View>

              <View style={styles.OtpResendContainer}>
                <Text style={styles.resendText} onPress={AddProfileSkip}>
                  Skip
                </Text>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Personalinfo;
