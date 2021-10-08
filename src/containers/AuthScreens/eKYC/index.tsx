import React, { useState, useEffect, useRef } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Dimensions,
  ScrollView,
  Platform,
  TouchableOpacity,
  BackHandler,
  Alert,
} from 'react-native';
import styles from './style';
import { Images } from '../../../components/index';
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
import ImagePicker from 'react-native-image-crop-picker';
//import { TouchableOpacity } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useDispatch, useSelector } from 'react-redux';
import * as userActions from '../../../actions/user-actions-types';
import Toast from 'react-native-simple-toast';
import ProgressLoader from 'rn-progress-loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RBSheet from "react-native-raw-bottom-sheet";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const screenWidth = Dimensions.get('window').width;

interface eKycScreenProps {
  navigation: any;
}

const eKyc = (props: eKycScreenProps) => {
  const [Aadhar, setAadhar] = useState('');
  const [ID, setID] = useState('');
  const [Name, setName] = useState('');
  const [selectedSchool, setselectedSchool] = useState('');
  const [frontimage, setImageFront] = useState('');
  const [backimage, setImageBack] = useState('');
  const [frontimagename, setImageFrontName] = useState('');
  const [backimagename, setImageBackName] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [KYC_type_doc_Selected, setKYCSelected] = useState('');
  const [keyInput, setKYCTextInput] = useState('');
  const refRBSheet = useRef();
  const refRBSheetBack = useRef();


  const [KYC_type_doc, setKYC_type_doc] = useState([
    {
      label: 'Aadhaar Card',
      value: '0',
    },
    {
      label: 'Driving Licence',
      value: '1',
    },
    {
      label: 'Passport',
      value: '2',
    },
  ]);
  const [date, setDate] = useState(new Date());
  const [date_copy, setDate_Copy] = useState('');
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {

    getData();
    //getStepCountAPi()
    getUserKYC()
    getAuthUserInfoApi()

    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  }, []);


  function handleBackButtonClick() {
    Alert.alert(
      'ZatchUp',
      'Do you want to exit?',
      [
        { text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'Yes', onPress: () => BackHandler.exitApp() },
      ],
      { cancelable: false });
    return true;
  }
  const getData = async () => {
    try {
      const username = await AsyncStorage.getItem('username')
      const dob = await AsyncStorage.getItem('dob')

      if (username !== null) {
        // value previously stored
        setName(username)
      }
      if (dob !== null) {
        // value previously stored
        setDate_Copy(dob)
      }
    } catch (e) {
      // error reading value
    }
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
          style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
          color={'white'}
        />
      </View>
    );
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    if (event.type == "set") {   //ok button
      setDate(currentDate)
    } else {    //cancel Button
      return null
    }


    var MyDateString = (currentDate.getFullYear()) + '-'
      + ('0' + (currentDate.getMonth() + 1)).slice(-2) + '-'
      + ('0' + (currentDate.getDate())).slice(-2)
    setDate_Copy(MyDateString);

  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const getImageFrontGallery = () => {
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
      setImageFront(file);
      setImageFrontName(name)
      refRBSheet.current.close();

    });
  };

  const getImageFrontCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
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
      setImageFront(file);
      setImageFrontName(name)
      refRBSheet.current.close();

    });
  }



  const getImageBackGallery = () => {
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
      setImageBack(file);
      setImageBackName(name)
      refRBSheetBack.current.close();

    });
  };

  const getImageBackCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
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
      setImageBack(file);
      setImageBackName(name)
      refRBSheetBack.current.close();

    });
  }



  /***************************User Auth  User Info *******************************/

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
    }

    dispatch(
      userActions.getAuthUserInfo({
        data,
        callback: ({ result, error }) => {
          if (result) {
            console.warn(
              'after result Auth User Info',
              JSON.stringify(result, undefined, 2),

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
            // Toast.show('Invalid credentials', Toast.SHORT);
            setLoading(false);
            console.warn(JSON.stringify(error, undefined, 2));
          }
        },
      }),
    );
  }



  /***************************User get User KYC *******************************/


  const getUserKYC = async () => {

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
    }

    dispatch(
      userActions.getCheckUserKyc({
        data,
        callback: ({ result, error }) => {
          if (result) {
            console.warn(
              'after result check user kyc',
              JSON.stringify(result, undefined, 2),

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
            // Toast.show('Invalid credentials', Toast.SHORT);
            setLoading(false);
            console.warn(JSON.stringify(error, undefined, 2));
          }
        },
      }),
    );
  }



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
    }

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

  const onPressKycSuccess = async () => {

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

    const IDSelecterror = Validate('kycidselect', KYC_type_doc_Selected);

    console.log('KYC_type_doc_Selected', KYC_type_doc_Selected)

    if (KYC_type_doc_Selected == 0) {
      var IDError = Validate('AadharNumber', ID);

    } if (KYC_type_doc_Selected == 1) {
      var IDError = Validate('DrivingLicence', ID);

    } if (KYC_type_doc_Selected == 2) {
      var IDError = Validate('PassportNumber', ID);
    }

    const NameError = Validate("kycidname", Name);
    const DOBError = Validate("dob", date_copy);
    const FrontImageError = Validate("FrontImage", frontimagename);
    if (KYC_type_doc_Selected == 0) {
      var backimagenameError = Validate("BackImage", backimagename);
    }

    if (
      IDSelecterror || IDError ||
      NameError || DOBError || FrontImageError || backimagenameError
    ) {
      //this._scrollView.scrollTo(0);
      Toast.show(IDSelecterror || IDError || NameError || DOBError || FrontImageError || backimagenameError, Toast.SHORT);

      return false;
    }

    else {


      var key =
        KYC_type_doc_Selected == 0
          ? 'Aadhaar Card'
          : KYC_type_doc_Selected == 1
            ? 'Driving Licence'
            : 'Passport Number';
      // console.log('KYC_type_doc_Selected', key);
      const data = {
        token: token,
        kyc_type: key,
        kyc_id_no: ID,
        kyc_name: Name,
        kyc_dob: date_copy,
        kyc_document: frontimage,
        kyc_document_back: backimage,
      };

      setLoading(true);

      dispatch(
        userActions.KycSuccess({
          data,
          callback: ({ result, error }) => {
            if (result.status === true) {
              // setSpinnerStart(false);
              setLoading(false);
              console.warn(
                'after register result',
                JSON.stringify(result, undefined, 2)
              );
              props.navigation.navigate('eKycSuccess', { username: 'jfdsfsdlfjs' });
              // setSpinnerStart(false);
              // setLoading(false);
            }

            if (!error) {
              console.warn(JSON.stringify(error, undefined, 2));
              // setLoginSuccess(result);
              setLoading(false);
              // signOut();
            } else {

              // setError(true);
              // signOut();
              setLoading(false);

              console.warn(JSON.stringify(error, undefined, 2));
            }
          },
        }),
      );
    }
  };
  return (<KeyboardAwareScrollView keyboardShouldPersistTaps={'always'}
    style={{ flex: 1 }}
    showsVerticalScrollIndicator={false}>

    <View style={styles.container}>
      <CustomStatusBar />
      {isLoading && renderIndicator()}

      <CustomHeader Title={'eKYC'} />
      
      {/*   <View style={styles.backbtnCss}><BackBtn navigation={this.props.navigation} /></View> */}

      <ScrollView>
        <View style={styles.inputContainer}>
          <View style={{ marginBottom: '5%', flex: 1, zIndex: 1 }}>

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
                  backgroundColor: "transparent"
                },
                draggableIcon: {
                  backgroundColor: "#000"
                }
              }}
            >
              <View style={{
                flexDirection: 'column',
                alignContent: 'space-around',
                //alignItems: 'stretch',
                marginTop: 10
              }}>

                <TouchableOpacity
                  onPress={() => getImageFrontCamera()}
                  style={{ height: 50, padding: 15, backgroundColor: '#FFFFFF' }} >
                  <Text style={{ color: '#000', fontSize: 17 }}>{'Open Camera'}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => getImageFrontGallery()}
                  style={{ height: 50, padding: 15, backgroundColor: '#FFFFFF' }} >
                  <Text style={{ color: '#000', fontSize: 17 }}>{'Open Gallery'}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => refRBSheet.current.close()}
                  style={{ height: 50, padding: 15, backgroundColor: 'red' }} >
                  <Text style={{ color: '#FFFFFF', fontSize: 17 }}>{'Cancel'}</Text>
                </TouchableOpacity>

              </View>
            </RBSheet>



            <RBSheet
              ref={refRBSheetBack}
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
                  backgroundColor: "transparent"
                },
                draggableIcon: {
                  backgroundColor: "#000"
                }
              }}
            >
              <View style={{
                flexDirection: 'column',
                alignContent: 'space-around',
                //alignItems: 'stretch',
                marginTop: 10
              }}>

                <TouchableOpacity
                  onPress={() => getImageBackCamera()}
                  style={{ height: 50, padding: 15, backgroundColor: '#FFFFFF' }} >
                  <Text style={{ color: '#000', fontSize: 17 }}>{'Open Camera'}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => getImageBackGallery()}
                  style={{ height: 50, padding: 15, backgroundColor: '#FFFFFF' }} >
                  <Text style={{ color: '#000', fontSize: 17 }}>{'Open Gallery'}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => refRBSheetBack.current.close()}
                  style={{ height: 50, padding: 15, backgroundColor: 'red' }} >
                  <Text style={{ color: '#FFFFFF', fontSize: 17 }}>{'Cancel'}</Text>
                </TouchableOpacity>

              </View>
            </RBSheet>
            <CustomDropdown
              placeholder={'Select ID'}
              data={KYC_type_doc}
              selectedValue={KYC_type_doc_Selected}
              SelectedLanguagedata={(selectedValue: any) => {
                setKYCSelected(selectedValue)
                setID('')
                // setImageFront('')
                // setImageBack('')
                setImageFrontName('')
                setImageBackName('')



              }
              }
            // SelectedLanguagedata={(selectedValue) => {
            //   // getCity(selectedValue);
            //   //  console.log('selectedValue state test', selectedValue)
            //   if (selectedValue !== null) {
            //     setKYCTextInput(selectedValue);

            //   }
            // }}
            />
          </View>
          {/* <View style={{ marginBottom: '5%', flex: 1, marginTop: '5%', }}>
                        <TextField placeholder={'Enter Aadhar Number'} keyboardType={'numeric'} maxLength={10} onChangeText={val => setAadhar(val)} value={Aadhar} />
                    </View> */}
          {KYC_type_doc_Selected == 0 || KYC_type_doc_Selected == null ? <View style={{ marginBottom: '5%', flex: 1 }}>
            <TextField
              placeholder={'Enter ID'}
              maxLength={12}
              keyboardType="numeric"
              onChangeText={val => setID(val)}
              value={ID}
            />
          </View> : KYC_type_doc_Selected == 1 ? <View style={{ marginBottom: '5%', flex: 1 }}>
            <TextField
              placeholder={'Enter ID'}
              maxLength={16}
              autoCapitalize={"characters"}
              // keyboardType=""
              onChangeText={val => setID(val)}
              value={ID}
            />
          </View> : KYC_type_doc_Selected == 2 ? <View style={{ marginBottom: '5%', flex: 1 }}>
            <TextField
              placeholder={'Enter ID'}
              maxLength={8}
              //  keyboardType=""
              onChangeText={val => setID(val)}
              value={ID}
            />
          </View> : null}

          <View style={{ marginBottom: '5%', flex: 1 }}>
            <TextField
              placeholder={'Enter Your Name'}
              onChangeText={val => setName(val)}
              value={Name}
              imageIcon={Images.user_icon}
            />
          </View>

          <TouchableOpacity onPress={showDatepicker}>
            <View style={styles.inputmarginBottom}>
              <TextField
                placeholder={'Date of Birth'}
                imageIcon={Images.calendar_icon}
                editable={false}
                value={date_copy.toString()}
              />
            </View>
          </TouchableOpacity>
          {/* <View style={{ marginBottom: '5%', flex: 1 }}>
                        <TextField placeholder={'Enter Your Address'} imageIcon={Images.calendar_icon} />
                    </View> */}

          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              minDate={new Date()}
              maximumDate={new Date()}
              is24Hour={true}
              format="YYYY-MMM-DD"
              display="default"
              onChange={onChange}
            />
          )}

          <TouchableOpacity
            onPress={() => refRBSheet.current.open()}
          >
            <View style={styles.logoContainer}>
              <Image source={Images.upload} style={styles.messagelogo} />
              <View>
                <Text style={styles.uploadtext}>Upload Photo</Text>
                <Text style={styles.selectiontext}>{'As per selection above'}</Text>

                <Text numberOfLines={1} style={styles.selectiontext}>
                  {frontimagename.length < 20
                    ? `${frontimagename}`
                    : `${frontimagename.substring(0, 20)}...`}
                </Text>
                {/* <Text numberOfLines={2} style={styles.selectiontext}>{frontimagename}</Text> */}

              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => refRBSheetBack.current.open()}

          >
            <View style={styles.logoContainer}>
              <View>
                <Image source={Images.upload} style={styles.messagelogo} />
              </View>
              <View>
                {KYC_type_doc_Selected != 0 ? <Text style={styles.uploadtext}>Upload Back side Photo(optional)</Text> : <Text style={styles.uploadtext}>Upload Back side Photo</Text>}

                <Text style={styles.selectiontext}>{'As per selection above'}</Text>

                {/* <View style={{flexDirection: 'row'}}>
                                <Text  numberOfLines={10}  style={{marginTop: 2, fontSize: 17, marginRight: 20,}}>
                                    {'Hello this is my school of my data dafsdffdsf sdfsdfsdf sdfsdfsdf sdfsdfsdfsdf sdfsdfsdf sdfsdfsdfsdf sdfsdfsdf' + '(' + 'DCFMF0000223' + ')'} 
                                   
                                </Text>
                              
                            </View> */}

                <Text numberOfLines={1} style={styles.selectiontext}>
                  {backimagename.length < 20
                    ? `${backimagename}`
                    : `${backimagename.substring(0, 20)}...`}
                </Text>
                {/* <Text numberOfLines={2} style={styles.selectiontext}>{backimagename}</Text> */}
              </View>
            </View>
          </TouchableOpacity>

          <View>
            <CustomButton
              title={'Verify Your KYC'}
              onPress={onPressKycSuccess}
            // onPress={() => {
            //    // setKYC_type_doc()
            //     props.navigation.navigate('eKycSuccess')}
            // }
            />
          </View>
        </View>
      </ScrollView>
    </View>
  </KeyboardAwareScrollView>
  );
};

export default eKyc;
