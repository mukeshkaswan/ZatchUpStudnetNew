import React, { Component, FC, useState, useEffect } from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Platform,
  ImageBackground,
  ScrollView,
  Alert,
  BackHandler,
  Switch,
  TextInput,
  SafeAreaView,
} from 'react-native';
import styles from './style.tsx';
import {
  TextField,
  CustomButton,
  CustomStatusBar,
  Validate,
  CustomHeader,
  BackBtn,
  HeaderTitleWithBack,
  Colors,
  CustomDropdown,
} from '../../../components';
import {
  NavigationContainer,
  useIsFocused,
  DrawerActions,
  useFocusEffect,
} from '@react-navigation/native';
import { Images } from '../../../components/index';
import Toast from 'react-native-simple-toast';
import { useDispatch, useSelector } from 'react-redux';
import * as userActions from '../../../actions/user-actions-types';
import ProgressLoader from 'rn-progress-loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import OtpInputs from 'react-native-otp-inputs';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import style from '../Messages/style';
import CardView from 'react-native-cardview';
import Modal from 'react-native-modal';
import { CheckBox } from 'react-native-elements';
import axios from 'axios';
import { BaseURL } from '../../../utilities/axiosInstance';

interface ResetPasswordScreenProps {
  navigation: any;
}

const SettingScreen = (props: ResetPasswordScreenProps) => {
  const [value, setValue] = React.useState('first');
  const [setting, setsetting] = useState(true);
  const [reminder, setReminder] = useState([]);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isEnabled2, setIsEnabled2] = useState(false);
  const [isEnabled3, setIsEnabled3] = useState(false);
  const [isEnabledTwoFactor, setIsEnabledTwoFactor] = useState(false);
  const [isEnabledEmail, setIsEnabledEmail] = useState(false);
  const [isEnabledDob, setIsEnabledDob] = useState(false);
  const [isEnabledGender, setIsEnabledGender] = useState(true);
  const [isEnabledProfession, setIsEnabledProfession] = useState(true);
  const [isEnabledCity, setIsEnabledCity] = useState(true);
  const [isEnabledPrivate, setIsEnabledPrivate] = useState(false);
  const [isDeactivateAccount, setIsDeactivateAccount] = useState(false);
  const [customgenderView, setcustomgenderView] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible2, setModalVisible2] = useState(false);
  const [isModalVisible3, setModalVisible3] = useState(false);
  const [Course_Selected, setCourseTypeSelected] = useState('');
  const [otp, setOtp] = useState('');
  const [otpemail, setOtpEmail] = useState('');
  const [number, onChangeNumber] = React.useState(null);
  const [changeemail, onChangeEmail] = React.useState(null);
  const [userid, setUserid] = useState('');
  const [Gender, setGender] = useState('');
  const [GenderForModal, setGenderForModal] = useState('');
  const [count, setCount] = useState(0);
  const [allSelected, setSelected] = useState(false);
  const [male, setMale] = useState(false);
  const [Female, setFemale] = useState(false);
  const [Custom, setCustom] = useState(false);
  const isFocused = useIsFocused();
  const [isLoading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [zatchupid, setZatchUpId] = useState('');
  const [profilepic, setProfilePic] = useState('');
  const [dob, setDob] = useState('');
  const [kyc_approved, setkyc_approved] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [fathername, setFathername] = useState('');
  const [mothername, setMothername] = useState('');
  const [newmothername, setnewnnewMothername] = useState('');
  const [newfathername, setnewnnewFathername] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [unreadnotificationcount, set_unread_notification_count] = useState('');
  const [unreadremindercount, set_unread_reminder_count] = useState('');
  const [setdatafromlist, setDataCourseInList] = useState([]);
  const [KYC_type_doc_Selected, setKYCSelected] = useState('');
  const [CustomGender, setCustomGender] = useState('');
  const [isotpVisiblemodal, setotpVisiblemodal] = useState(false);
  const [isotpVisiblemodalemail, setotpVisiblemodalemail] = useState(false);
  const [pronouncustom, setpronoun] = useState('');
  const [pronouncustomcustom_gender, setpronouncustom_gender] = useState('');

  const [isAge, setIsAge] = useState(false);


  const dispatch = useDispatch();
  const [KYC_type_doc, setKYC_type_doc] = useState([
    {
      label: 'He',
      value: '0',
    },
    {
      label: 'She',
      value: '1',
    },
    {
      label: 'They',
      value: '2',
    },
  ]);

  const checkedMale = () => {
    setMale(!male);
    setFemale(false);
    setCustom(false);
    setcustomgenderView(false);
    setGenderForModal('M');
    setCourseTypeSelected('');
    setCustomGender('');
  };

  const checkedFemale = () => {
    setFemale(!Female);
    setCustom(false);
    setMale(false);
    setcustomgenderView(false);
    setGenderForModal('F');
    setCourseTypeSelected('');
    setCustomGender('');
  };

  const checkedCustom = () => {
    setCustom(!Custom);
    setMale(false);
    setFemale(false);
    setcustomgenderView(true);
    setGenderForModal('C');
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);

  };
  const toggleModal2 = () => {
    setModalVisible2(!isModalVisible2);
  };

  const toggleModal3 = () => {
    setModalVisible3(!isModalVisible3);
  };
  const otptoggleModal = () => {
    // setaddmobilenumberVisiblemodal('');
    setotpVisiblemodal(!isotpVisiblemodal);
  };

  const otptoggleModalEmail = () => {
    // setaddmobilenumberVisiblemodal('');
    setotpVisiblemodalemail(!isotpVisiblemodalemail);
  };
  const toggleSwitch1 = () => {
    setIsEnabled(previousState => !previousState);
    onPressChangePhoneStatus(!isEnabled);

  };
  const toggleSwitch2 = () => {
    setIsEnabled2(previousState => !previousState);
    changeSocialMediaStatus();
  };

  const toggleSwitchDeactivateAccount = () => {
    setIsDeactivateAccount(!isDeactivateAccount);

    handleDeactivateButtonClick();
    changePrivateStatus();
  };

  const toggleSwitchTwoFactor = () => {
    setIsEnabledTwoFactor(!isEnabledTwoFactor);
    onPressChangeTwoFactorStaus(!isEnabledTwoFactor);
  };

  const toggleSwitchEmail = () => {
    setIsEnabledEmail(!isEnabledEmail);
    onPressChangeEmailStaus(!isEnabledEmail);
  };

  const toggleSwitchDob = () => {
    setIsEnabledDob(!isEnabledDob);
    onPressChangeDobStaus(!isEnabledDob);
  };

  const toggleSwitchGender = () => {
    setIsEnabledGender(!isEnabledGender);
    onPressChangeGenderStaus(!isEnabledGender);
  };

  const toggleSwitchProfession = () => {
    setIsEnabledProfession(!isEnabledProfession);
    onPressChangeProfessionStaus(!isEnabledProfession);
  };

  const toggleSwitchCity = () => {
    setIsEnabledCity(!isEnabledCity);
    onPressChangeCityStaus(!isEnabledCity);
  };

  const toggleSwitchPrivate = () => {
    setIsEnabledPrivate(!isEnabledPrivate);
    onPressChangePrivateStaus(!isEnabledPrivate);
  };

  const toggleSwitch3 = () => {
    setIsEnabled3(previousState => !previousState);
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
        { text: 'Yes', onPress: onDeleteBTN },
      ],
      { cancelable: false },
    );
    return true;
  }

  function handleBackBut() {
    props.navigation.goBack();
    return true;
  }
  function handleDeactivateButtonClick() {
    Alert.alert(
      'ZatchUp',
      'Are you sure you want to Deactivate your account? You can Reactive your account by login in again.',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'Yes', onPress: onPressChangeDeactivateAccountStaus },
      ],
      { cancelable: false },
    );
    return true;
  }



  useFocusEffect(
    React.useCallback(() => {
      const dataSetTimeOut = setTimeout(() => {
        getEducationProfile();
        getAuthUserInfoApi();
        getPrivacySettingApi();

        return () => {
          dataSetTimeOut.clear();
        };
      }, 500);

      BackHandler.addEventListener('hardwareBackPress', handleBackBut);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', handleBackBut);
    }, []),
  );

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

  const getdataCourse = async result => {
    setDataCourseInList(result.data);
  };

  const getdataProfile = async result => {
    var Profile = [];
    result.data.map((element: any) => {
      setUsername(element.name);
      setZatchUpId(element.zatchup_id);
      setProfilePic(element.profile_pic);
      setkyc_approved(element.kyc_approved);
      setDob(element.dob);
      setGender(element.gender);
      setEmail(element.email);
      setPhone(element.phone);
      setFathername(element.father_name);
      setMothername(element.mother_name);
      setState(element.location.state_name);
      setCity(element.location.city_name);
      setnewnnewFathername(element.father_name);
      setnewnnewMothername(element.mother_name);
      setMale(element.gender == 'M' ? true : false);
      setFemale(element.gender == 'F' ? true : false);
      setCustom(element.gender == 'C' ? true : false);
      setpronoun(element.pronoun);
      setpronouncustom_gender(element.custom_gender);
      setCustomGender(element.custom_gender);
      setcustomgenderView(element.gender == 'C' ? true : false);

      var key =
        element.pronoun == 'He'
          ? '0'
          : element.pronoun == 'She'
            ? '1'
            : element.pronoun == 'They'
              ? '2'
              : '';

      setCourseTypeSelected(key);
    });
    _storeData();
  };
  const _storeData = async () => {
    try {
      await AsyncStorage.setItem('username', username);
      await AsyncStorage.setItem('profilepic', profilepic);
      await AsyncStorage.setItem('kyckey', kyc_approved.toString());
      await AsyncStorage.setItem('dob', dob);
    } catch (e) {
      // saving error
    }
  };

  const getStatusType = async result => {
    for (let i in result.data) {
      if (result.data[i].status_type === 'OTP') {


        if (result.data[i].is_disabled == true) {
          setIsEnabledTwoFactor(true);

        }
        else {
          setIsEnabledTwoFactor(false);

        }

      }

      if (result.data[i].status_type === 'EMAIL_ID') {

        if (result.data[i].is_disabled == true) {
          setIsEnabledEmail(true);

        }
        else {
          setIsEnabledEmail(false);

        }

      }


      if (result.data[i].status_type === 'DOB') {

        if (result.data[i].is_disabled == true) {
          setIsEnabledDob(true);

        }
        else {
          setIsEnabledDob(false);

        }
      }



      if (result.data[i].status_type == 'GENDER') {

        if (result.data[i].is_disabled == true) {
          setIsEnabledGender(true);

        }
        else {
          setIsEnabledGender(false);


        }

      }




      if (result.data[i].status_type === 'PROFESSION') {

        if (result.data[i].is_disabled == true) {
          setIsEnabledProfession(true);

        }
        else {
          setIsEnabledProfession(false);

        }
      }


      if (result.data[i].status_type === 'MOB_NUM') {

        if (result.data[i].is_disabled == true) {
          setIsEnabled(true);

        }
        else {
          setIsEnabled(false);

        }
      }





      if (result.data[i].status_type === 'CITY') {

        if (result.data[i].is_disabled == true) {
          setIsEnabledCity(true);

        }
        else {
          setIsEnabledCity(false);

        }
      }

    }
  };

  /***************************User Auth Deactivate Account*******************************/

  const onPressChangeDeactivateAccountStaus = async () => {
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
      is_active: 'false',
    };

    setLoading(true);

    dispatch(
      userActions.getProfileDeleteZatchupAccount({
        data,
        callback: ({ result, error }) => {
          if (result.status === true) {

            onDeleteBTN();

            Toast.show(result.message, Toast.SHORT);
            // setSpinnerStart(false);
            setLoading(false);
          } else if (result.status === false) {
            Toast.show('User is verified as student', Toast.SHORT);
            setIsDeactivateAccount(false);
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
  };

  /***************************User Auth Private Profile Disable*******************************/

  const onPressChangePrivateStaus = async key => {
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
      privacy_status: key,
    };

    setLoading(true);

    dispatch(
      userActions.getSocialPrivacySetting({
        data,
        callback: ({ result, error }) => {
          setLoading(false);

          if (result.status === true) {

            getPrivacySettingApi();
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

  const changeSocialMediaStatus = async () => {
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
    //   Alert.alert(Gender);

    const data = {
      token: token,
      social_status: !isEnabled2,
    };

    setLoading(true);

    dispatch(
      userActions.changeSocialMediaStatus({
        data,
        callback: ({ result, error }) => {
          setLoading(false);
          if (result.status) {
            // getSettingStatus(userid);

          }
          if (result.status === false) {
            console.warn(JSON.stringify(error, undefined, 2));
            Toast.show(result.error.non_field_errors[0], Toast.SHORT);
          } else {
            console.warn(JSON.stringify(error, undefined, 2));
          }
        },
      }),
    );
  };

  const changePrivateStatus = async () => {
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
    //   Alert.alert(Gender);

    const data = {
      token: token,
      privacy_status: !isDeactivateAccount,
    };

    setLoading(true);

    dispatch(
      userActions.changePrivateStatus({
        data,
        callback: ({ result, error }) => {
          setLoading(false);
          if (result.status) {
          }
          if (result.status === false) {
            console.warn(JSON.stringify(error, undefined, 2));
            Toast.show(result.error.non_field_errors[0], Toast.SHORT);
          } else {
            console.warn(JSON.stringify(error, undefined, 2));
          }
        },
      }),
    );
  };

  /***************************User Auth City Disable*******************************/

  const onPressChangeCityStaus = async key => {
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
      is_disabled: key,
      status_type: 'CITY',
      user: userid,
    };

    setLoading(true);

    dispatch(
      userActions.getUserSettingStatusPost({
        data,
        callback: ({ result, error }) => {
          setLoading(false);

          if (result.status === true) {

            getSettingStatus(userid);
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

  /***************************User Auth Profession Disable*******************************/

  const onPressChangeProfessionStaus = async key => {
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
      is_disabled: key,
      status_type: 'PROFESSION',
      user: userid,
    };

    setLoading(true);

    dispatch(
      userActions.getUserSettingStatusPost({
        data,
        callback: ({ result, error }) => {
          setLoading(false);

          if (result.status === true) {

            getSettingStatus(userid);
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

  /***************************User Auth Gender Disable*******************************/

  const onPressChangeGenderStaus = async key => {
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
      is_disabled: key,
      status_type: 'GENDER',
      user: userid,
    };

    setLoading(true);

    dispatch(
      userActions.getUserSettingStatusPost({
        data,
        callback: ({ result, error }) => {
          setLoading(false);

          if (result.status === true) {

            getSettingStatus(userid);
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

  /***************************User Auth Dob Disable*******************************/

  const onPressChangeDobStaus = async key => {
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
      is_disabled: key,
      status_type: 'DOB',
      user: userid,
    };

    setLoading(true);

    dispatch(
      userActions.getUserSettingStatusPost({
        data,
        callback: ({ result, error }) => {
          if (result.status === true) {

            getSettingStatus(userid);
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

  


  /***************************User Auth Phone Disable*******************************/

  const onPressChangePhoneStatus = async key => {
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
      is_disabled: key,
      status_type: 'MOB_NUM',
      user: userid,
    };

    setLoading(true);

    dispatch(
      userActions.getUserSettingStatusPost({
        data,
        callback: ({ result, error }) => {
          if (result.status === true) {

            getSettingStatus(userid);
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
  /***************************User Auth Email Disable*******************************/

  const onPressChangeEmailStaus = async key => {
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
      is_disabled: key,
      status_type: 'EMAIL_ID',
      user: userid,
    };

    setLoading(true);

    dispatch(
      userActions.getUserSettingStatusPost({
        data,
        callback: ({ result, error }) => {
          if (result.status === true) {

            getSettingStatus(userid);
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

  /***************************User Auth Two Factor Status*******************************/

  const onPressChangeTwoFactorStaus = async key => {
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
      is_disabled: key,
      status_type: 'OTP',
      user: userid,
    };

    setLoading(true);

    dispatch(
      userActions.getUserSettingStatusPost({
        data,
        callback: ({ result, error }) => {
          if (result.status === true) {

            getSettingStatus(userid);
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

  /***************************User Auth User  Setting Status Info*******************************/

  const getSettingStatus = async user_id => {
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
      id: user_id,
    };

    dispatch(
      userActions.getUserSettingStatus({
        data,
        callback: ({ result, error }) => {
          if (result) {
            // console.warn(
            //   'after result get User Setting Status >',
            //   JSON.stringify(result, undefined, 2),
            // );
            getStatusType(result);
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

  /***************************User Privacy Setting Api Info*******************************/

  const getPrivacySettingApi = async () => {
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
      userActions.getPrivacySetting({
        data,
        callback: ({ result, error }) => {
          setLoading(false);

          if (result) {
            // console.warn(
            //   'after result abc',
            //   JSON.stringify(result, undefined, 2),
            // );
            setIsEnabledPrivate(result.data[0].profile_is_private);
            setIsEnabled2(result.data[0].socialmedia_user_status);
            setIsAge(result.data[0].age);

          }
          if (!error) {
            console.warn(JSON.stringify(error, undefined, 2));
            setLoading(false);
          } else {
            Toast.show('Request failed with status code 401', Toast.SHORT);
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
          setLoading(false);

          if (result) {
            // console.warn(
            //   'after result Auth User INfo',
            //   JSON.stringify(result, undefined, 2),
            // );
            setUserid(result.user_id);
            getSettingStatus(result.user_id);
          }
          if (!error) {
            console.warn(JSON.stringify(error, undefined, 2));
            setLoading(false);
          } else {
            Toast.show('Request failed with status code 401', Toast.SHORT);
            setLoading(false);
            console.warn(JSON.stringify(error, undefined, 2));
          }
        },
      }),
    );
  };

  /***************************User GET Education Profile list *******************************/

  const getEducationProfile = async () => {
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
    axios
      .get(BaseURL + 'user/student-education-profile/', {
        headers: {
          Authorization: `Bearer ${token}`,
          'content-type': 'multipart/form-data',
        },
      })
      .then(({ data }) => {
        //  console.log('Data==>>', data);
        if (data.status) {
          setLoading(false);

          // console.warn(
          //   'after setting call api',
          //   JSON.stringify(data, undefined, 2),
          // );
          getdataProfile(data);
          getdataCourse(data);
        }
      })
      .catch(error => {
        console.log(error);
      });

    dispatch(
      userActions.getStudentEducationProfile({
        data,
        callback: ({ result, error }) => {
          if (result.status) {
            getdataProfile(result), getdataCourse(result), setLoading(false);
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

  const onPressSubmit = async () => {
    const newError = Validate('newmothername', newmothername);

    const newfatherError = Validate('newfathername', newfathername);

    const genderError = Validate('gender', male || Female || Custom);

    if (Custom) {
      var courseError = Validate('pronoun_', Course_Selected);
    }

    if (newError || newfatherError || genderError || courseError) {
      //this._scrollView.scrollTo(0);
      Toast.show(
        newError || newfatherError || genderError || courseError,
        Toast.LONG,
      );

      return false;
    } else {
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
      //   Alert.alert(Gender);
      var key =
        Course_Selected == 0 ? 'He' : Course_Selected == 1 ? 'She' : 'They';
      const data = {
        token: token,
        father_name: newfathername,
        mother_name: newmothername,
        pronoun: GenderForModal == 'M' || GenderForModal == 'F' ? '' : key,
        gender:
          GenderForModal == 'M' || GenderForModal == 'F' ? GenderForModal : 'C',
        profile_pic: profilepic,
        // custom_gender:
        //   GenderForModal == 'M' || GenderForModal == 'F' ? '' : key,
        custom_gender: CustomGender,
      };

      // console.log('data====>>>', data);
      // return;

      setLoading(true);

      dispatch(
        userActions.updatePersonalinfo({
          data,
          callback: ({ result, error }) => {
            if (result.status) {
              setModalVisible(false);
              getEducationProfile();
              // console.warn(
              //   'after login result',
              //   JSON.stringify(result.status, undefined, 2),

              // );
              setLoading(false);
              //return;
              // props.navigation.navigate('OtpLogin', {
              //   firebase_id: result.firebase_username,
              //   username: email,
              // });
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
    }
  };

  const onPressSubmitNumber = async () => {
    const newError = Validate('numbers', number);

    if (newError) {
      Toast.show(newError, Toast.LONG);

      return false;
    } else {
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
      //   Alert.alert(Gender);

      const data = {
        token: token,
        class_id: '',
        key: 'phone',
        old_value: 0,
        value: number,
      };

      setLoading(true);

      dispatch(
        userActions.requestChangeUserDetail({
          data,
          callback: ({ result, error }) => {
            if (result.status) {

              setLoading(false);
              toggleModal2();
              otptoggleModal();

            }
            if (result.status === false) {
              console.warn(JSON.stringify(error, undefined, 2));
              setLoading(false);
              Toast.show(result.error.non_field_errors[0], Toast.SHORT);
            } else {
              setLoading(false);
              console.warn(JSON.stringify(error, undefined, 2));
            }
          },
        }),
      );
    }
  };

  const onPressSubmitEmail = async () => {
    const newError = Validate('email_', changeemail);

    if (newError) {
      Toast.show(newError, Toast.LONG);

      return false;
    } else {
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
      //   Alert.alert(Gender);

      const data = {
        token: token,
        class_id: '',
        key: 'email',
        old_value: 0,
        value: changeemail,
      };

      setLoading(true);

      dispatch(
        userActions.requestChangeUserDetailEmail({
          data,
          callback: ({ result, error }) => {
            setLoading(false);
            if (result.status) {
              setModalVisible3(false);

              setTimeout(() => {
                setotpVisiblemodalemail(true);
              }, 500);

              //return;
              // props.navigation.navigate('OtpLogin', {
              //   firebase_id: result.firebase_username,
              //   username: email,
              // });
            }
            if (result.status === false) {
              console.warn(JSON.stringify(error, undefined, 2));
              Toast.show(result.error.non_field_errors[0], Toast.SHORT);
            } else {
              console.warn(JSON.stringify(error, undefined, 2));
            }
          },
        }),
      );
    }
  };

  const onPressOtp = async () => {
    const otpError = Validate('otp', otp);

    if (otpError) {
      //this._scrollView.scrollTo(0);
      Toast.show(otpError, Toast.SHORT);

      return false;
    } else {
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
        key: 'phone',
        value: number,
        verify_otp_no: otp,
      };

      setLoading(true);

      dispatch(
        userActions.requestChangeUserDetailVerifyOtp({
          data,
          callback: ({ result, error }) => {
            setLoading(false);

            if (result.status === true) {

              LogoutALert();
            }
            if (result.status === false) {
              setTimeout(() => {
                Toast.show(result.error.message[0], Toast.SHORT);
              }, 500);

              // signOut();
            }

            // if (!error) {
            //   console.warn(JSON.stringify(error, undefined, 2));
            //   // setLoginSuccess(result);
            //   //Toast.show('Invalid Otp', Toast.SHORT);

            //   setLoading(false);

            //   // signOut();
            // }
            else {
              // setError(true);
              // signOut();
              //   Toast.show('Invalid Otp', Toast.SHORT);

              console.warn(JSON.stringify(error, undefined, 2));
            }
          },
        }),
      );
    }
  };

  const onPressOtpEmail = async () => {
    const otpError = Validate('otp', otpemail);

    if (otpError) {
      //this._scrollView.scrollTo(0);
      Toast.show(otpError, Toast.SHORT);

      return false;
    } else {
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
        key: 'email',
        value: changeemail,
        verify_otp_no: otpemail,
      };

      setLoading(true);

      dispatch(
        userActions.requestChangeUserDetailVerifyOtpEmail({
          data,
          callback: ({ result, error }) => {
            setLoading(false);

            if (result.status === true) {


              //  getData(result),

              //setSpinnerStart(false);

              LogoutALert();
            }
            if (result.status === false) {
              //console.warn(JSON.stringify(error, undefined, 2));
              // setLoginSuccess(result);
              setTimeout(() => {
                Toast.show(result.error.message[0], Toast.SHORT);
              }, 500);

              // signOut();
            }

            // if (!error) {
            //   console.warn(JSON.stringify(error, undefined, 2));
            //   // setLoginSuccess(result);
            //   //Toast.show('Invalid Otp', Toast.SHORT);

            //   setLoading(false);

            //   // signOut();
            // }
            else {
              // setError(true);
              // signOut();
              //   Toast.show('Invalid Otp', Toast.SHORT);

              console.warn(JSON.stringify(error, undefined, 2));
            }
          },
        }),
      );
    }
  };

  const onPressResendOtp = async () => {
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
      class_id: '',
      key: 'phone',
      old_value: 0,
      value: number,
    };

    setLoading(true);

    dispatch(
      userActions.getResendotpEiRequest({
        data,
        callback: ({ result, error }) => {
          setLoading(false);

          if (result.status === true) {

            setTimeout(() => {
              Toast.show(result.message, Toast.SHORT);
            }, 500);
            // setSpinnerStart(false);
          }

          if (!error) {
            console.warn(JSON.stringify(error, undefined, 2));
            // setLoginSuccess(result);

            // signOut();
          } else {
            // setError(true);
            // signOut();
            console.warn(JSON.stringify(error, undefined, 2));
          }
        },
      }),
    );
  };

  const onPressResendOtpEmail = async () => {
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
      class_id: '',
      key: 'email',
      old_value: 0,
      value: changeemail,
    };

    setLoading(true);

    dispatch(
      userActions.getResendotpEiRequestEmail({
        data,
        callback: ({ result, error }) => {
          setLoading(false);

          if (result.status === true) {

            setTimeout(() => {
              Toast.show(result.message, Toast.SHORT);
            }, 500);
            // setSpinnerStart(false);
          }

          if (!error) {
            console.warn(JSON.stringify(error, undefined, 2));
            // setLoginSuccess(result);

            // signOut();
          } else {
            // setError(true);
            // signOut();
            console.warn(JSON.stringify(error, undefined, 2));
          }
        },
      }),
    );
  };

  const LogoutALert = async () => {
    try {
      //   await AsyncStorage.removeItem('token')
      await AsyncStorage.removeItem('username');
      await AsyncStorage.removeItem('profilepic');
      await AsyncStorage.removeItem('kyckey');
      await AsyncStorage.removeItem('tokenlogin');
      Toast.show('Logout Successfully ', Toast.SHORT);

      props.navigation.navigate('LoginScreen');
      return true;
    } catch (exception) {
      return false;
    }
  };

  // const rednderItemList = (item, index) => {
  //   return (
  //     <>
  //       {item.educationdetail.length > 0 &&
  //         item.educationdetail.map(i => {
  //           return (
  //             <View>
  //               <CardView
  //                 cardElevation={5}
  //                 cardMaxElevation={5}
  //                 // cornerRadius={15}
  //                 style={{
  //                   // width: '95%',

  //                   backgroundColor: 'white',
  //                   marginHorizontal: 15,
  //                   marginTop: 20,
  //                   paddingBottom: 14,
  //                   paddingTop: 10,
  //                 }}>
  //                 <View style={styles.addcitycontainer}>
  //                   <Text style={styles.title_text}>Personal Setting</Text>
  //                   {kyc_approved != '0' ? <TouchableOpacity onPress={toggleModal}>
  //                     <Image source={Images.edit_icon} style={styles.addicon} />
  //                   </TouchableOpacity> : null}
  //                   {/* Modal */}
  //                 </View>

  //                 <View style={styles.border}></View>
  //                 <View style={{ marginTop: 10 }}>
  //                   <View style={styles.text_container}>
  //                     <Text style={styles.detail_text}>Name : </Text>
  //                     <Text>{username}</Text>
  //                     {kyc_approved != '0' ? <TouchableOpacity
  //                       onPress={() => props.navigation.navigate('eKYC', { 'Editusername': true })}>

  //                       <Image
  //                         style={{
  //                           height: 20,
  //                           width: 20,

  //                           //marginTop: 5,
  //                           marginLeft: 5,
  //                           // marginRight: 15,
  //                         }}
  //                         source={Images.edit_icon}
  //                       />
  //                     </TouchableOpacity> : null}

  //                   </View>
  //                   <View style={styles.text_container}>
  //                     <Text style={styles.detail_text}>DOB : </Text>
  //                     <Text>{dob}</Text>
  //                     {kyc_approved != '0' ? <TouchableOpacity
  //                       onPress={() => props.navigation.navigate('eKYC', { 'Editdob': true })}>

  //                       <Image
  //                         style={{
  //                           height: 20,
  //                           width: 20,

  //                           //marginTop: 5,
  //                           marginLeft: 5,
  //                           // marginRight: 15,
  //                         }}
  //                         source={Images.edit_icon}
  //                       />
  //                     </TouchableOpacity> : null}

  //                   </View>

  //                   {Gender == 'M' ? (
  //                     <View style={styles.text_container}>
  //                       <Text style={styles.detail_text}>Gender : </Text>
  //                       <Text>Male</Text>
  //                     </View>
  //                   ) : Gender == 'F' ? (
  //                     <View style={styles.text_container}>
  //                       <Text style={styles.detail_text}>Gender : </Text>
  //                       <Text>Female</Text>
  //                     </View>
  //                   ) : (
  //                     <View style={styles.text_container}>
  //                       <Text style={styles.detail_text}>Gender : </Text>
  //                       <Text>Custom</Text>
  //                     </View>
  //                   )}

  //                   {email != '' ? <View style={styles.text_container}>

  //                     {email != '' ? <View style={{ flexDirection: 'row' }}>

  //                       <Text style={styles.detail_text}>Email : </Text>
  //                       <Text>{email}</Text>
  //                     </View> : null}

  //                     {phone == '' ? <TouchableOpacity
  //                     // onPress={toggleModal2}
  //                     >
  //                       <Image
  //                         source={Images.phone_icon}
  //                         style={{
  //                           resizeMode: 'stretch',
  //                           tintColor: 'green',
  //                           marginLeft: 8,
  //                           width: 20,
  //                           height: 20,
  //                         }}
  //                       />
  //                     </TouchableOpacity> : null}

  //                   </View> : null}

  //                   {phone != '' ? <View style={styles.text_container}>

  //                     {phone != '' ? <View style={{ flexDirection: 'row' }}>
  //                       <Text style={styles.detail_text}>
  //                         Phone Number :
  //                       </Text>
  //                       <Text>{phone}</Text>

  //                     </View> : null}

  //                     {email == '' ? <TouchableOpacity
  //                     // onPress={toggleModal2}
  //                     >
  //                       <Image
  //                         source={Images.inbox}
  //                         style={{
  //                           resizeMode: 'stretch',
  //                           tintColor: 'green',
  //                           marginLeft: 8,
  //                           width: 20,
  //                           height: 20,
  //                         }}
  //                       />
  //                     </TouchableOpacity> : null}

  //                   </View> : null}
  //                   {/* <View style={styles.text_container}>
  //                     {phone == '' ? (
  //                       <>
  //                         <Text style={styles.detail_text}>Email : </Text>
  //                         <Text>{email}</Text>
  //                       </>
  //                     ) : (
  //                       <>
  //                         <Text style={styles.detail_text}>
  //                           Phone Number :{' '}
  //                         </Text>
  //                         <Text>{phone}</Text>
  //                       </>
  //                     )}
  //                     {phone == '' ? (
  //                       <TouchableOpacity
  //                       // onPress={toggleModal2}
  //                       >
  //                         <Image
  //                           source={Images.phone_icon}
  //                           style={{
  //                             resizeMode: 'stretch',
  //                             tintColor: 'green',
  //                             marginLeft: 8,
  //                             width: 20,
  //                             height: 20,
  //                           }}
  //                         />
  //                       </TouchableOpacity>
  //                     ) : (
  //                       <TouchableOpacity
  //                       // onPress={toggleModal2}
  //                       >
  //                         <Image
  //                           source={Images.inbox}
  //                           style={{
  //                             resizeMode: 'stretch',
  //                             tintColor: 'green',
  //                             marginLeft: 8,
  //                             width: 20,
  //                             height: 20,
  //                           }}
  //                         />
  //                       </TouchableOpacity>
  //                     )}
  //                   </View> */}
  //                   {fathername != '' && (
  //                     <View style={styles.text_container}>
  //                       <Text style={styles.detail_text}>Father's Name : </Text>
  //                       <Text>{fathername}</Text>
  //                     </View>
  //                   )}
  //                   {mothername != '' && (
  //                     <View style={styles.text_container}>
  //                       <Text style={styles.detail_text}>Mother's Name : </Text>
  //                       <Text>{mothername}</Text>
  //                     </View>
  //                   )}
  //                 </View>
  //               </CardView>
  //               <CardView
  //                 cardElevation={5}
  //                 cardMaxElevation={5}
  //                 //cornerRadius={20}
  //                 style={styles.card}>
  //                 <Text style={styles.title_text}>Privacy Setting</Text>

  //                 <View style={styles.border}></View>
  //                 <View style={styles.privacyrowcontainer}>
  //                   {phone == '' ? (
  //                     <>
  //                       <Text style={styles.detail_text}>Email : </Text>
  //                       <Text style={{ textAlign: 'center' }}>{email}</Text>
  //                     </>
  //                   ) : (
  //                     <>
  //                       <Text style={styles.detail_text}>Mobile Number : </Text>
  //                       <Text style={{ textAlign: 'center' }}>{phone}</Text>
  //                     </>
  //                   )}

  //                   <Switch
  //                     trackColor={{ false: 'grey', true: 'lightgreen' }}
  //                     thumbColor={isEnabled ? 'limegreen' : 'lightgrey'}
  //                     ios_backgroundColor="#3e3e3e"
  //                     onValueChange={toggleSwitch1}
  //                     value={isEnabled}
  //                   />
  //                 </View>

  //                 <View style={styles.border1}></View>
  //                 <View style={styles.privacyrowcontainer}>
  //                   <Text style={styles.detail_text}>Date of Birth : </Text>
  //                   <Text style={{ textAlign: 'center' }}>{dob}</Text>
  //                   <Switch
  //                     trackColor={{ false: 'grey', true: 'lightgreen' }}
  //                     thumbColor={isEnabled2 ? 'limegreen' : 'lightgrey'}
  //                     ios_backgroundColor="#3e3e3e"
  //                     onValueChange={toggleSwitch2}
  //                     value={isEnabled2}
  //                   />
  //                 </View>
  //                 <View style={styles.border1}></View>
  //                 <View style={styles.privacyrowcontainer}>
  //                   {Gender == 'M' ? (
  //                     <>
  //                       <Text style={styles.detail_text}>Gender : </Text>
  //                       <Text style={{ textAlign: 'center' }}>Male</Text>
  //                     </>
  //                   ) : Gender == 'F' ? (
  //                     <>
  //                       <Text style={styles.detail_text}>Gender : </Text>
  //                       <Text style={{ textAlign: 'center' }}>Female</Text>
  //                     </>
  //                   ) : (
  //                     <>
  //                       <Text style={styles.detail_text}>Gender : </Text>
  //                       <Text style={{ textAlign: 'center' }}>Custom</Text>
  //                     </>
  //                   )}

  //                   <Switch
  //                     trackColor={{ false: 'grey', true: 'lightgreen' }}
  //                     thumbColor={isEnabled3 ? 'limegreen' : 'lightgrey'}
  //                     ios_backgroundColor="#3e3e3e"
  //                     onValueChange={toggleSwitch3}
  //                     value={isEnabled3}
  //                   />
  //                 </View>
  //               </CardView>

  //               {/* edit personal information modal */}
  //               <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
  //                 <View
  //                   style={{
  //                     //height: hp('55'),
  //                     backgroundColor: Colors.$backgroundColor,
  //                     justifyContent: 'center',
  //                     alignItems: 'center',
  //                     paddingVertical: 20,
  //                     paddingHorizontal: 10,
  //                     borderRadius: 5,
  //                   }}>
  //                   <TouchableOpacity
  //                     onPress={toggleModal}
  //                     style={{ alignSelf: 'flex-end' }}>
  //                     <Image
  //                       source={Images.closeicon}
  //                       style={{ height: 18, width: 18, marginRight: 10 }}
  //                     />
  //                   </TouchableOpacity>
  //                   <Text
  //                     style={{
  //                       fontSize: 20,
  //                       marginVertical: 5,
  //                       fontWeight: 'bold',
  //                     }}>
  //                     Personal Information
  //                   </Text>
  //                   <Text style={styles.labeltext}>Mother's Name</Text>
  //                   <View style={styles.textinputcontainer}>
  //                     {/* <TextInput
  //                       style={{paddingLeft: 10}}
  //                       onChangeText={onChangeNumber}
  //                       value={number}
  //                       placeholder="Enter Your Mother's Name"
  //                       keyboardType="default"
  //                     /> */}
  //                     {/* <TextField
  //                       placeholder={'Enter Your Mother Name'}
  //                       //imageIcon={Images.calendar_icon}
  //                       onChangeText={val => setnewnnewMothername(val)}
  //                       value={newmothername}
  //                     /> */}
  //                   </View>
  //                   <Text style={styles.labeltext}>Father's Name</Text>
  //                   <View style={styles.textinputcontainer}>
  //                     <TextField
  //                       placeholder={'Enter Your Father Name'}
  //                       //imageIcon={Images.calendar_icon}
  //                       onChangeText={val => setnewnnewFathername(val)}
  //                       value={newfathername}
  //                     />
  //                   </View>
  //                   <Text style={styles.labeltext}>Gender</Text>

  //                   <View
  //                     style={[
  //                       styles.inputmarginBottom,
  //                       {
  //                         flexDirection: 'row',
  //                         // flex: 1,
  //                         marginLeft: 25,
  //                         marginRight: 25,
  //                       },
  //                     ]}>
  //                     <View style={{ flex: 1 }}>
  //                       <CheckBox
  //                         title=" Male"
  //                         checkedIcon="dot-circle-o"
  //                         uncheckedIcon="circle"
  //                         checked={male}
  //                         containerStyle={{
  //                           padding: 0,
  //                           margin: 0,
  //                           backgroundColor: 'transparent',
  //                           borderColor: 'transparent',
  //                         }}
  //                         titleProps={{
  //                           style: {
  //                             color: 'rgba(51,51,51,0.5)',
  //                             fontFamily: 'Lato-Regular',
  //                           },
  //                         }}
  //                         uncheckedColor={'#fff'}
  //                         checkedColor={'rgb(70,50,103)'}
  //                         textStyle={{
  //                           color: '#33333380',
  //                           fontFamily: 'Lato-Regular',
  //                         }}
  //                         onPress={checkedMale}
  //                       // fontFamily={'Lato-Regular'}
  //                       />
  //                     </View>

  //                     <View style={{ flex: 1 }}>
  //                       <CheckBox
  //                         title=" Female"
  //                         checkedIcon="dot-circle-o"
  //                         uncheckedIcon="circle"
  //                         checked={Female}
  //                         containerStyle={{
  //                           padding: 0,
  //                           margin: 0,
  //                           backgroundColor: 'transparent',
  //                           borderColor: 'transparent',
  //                         }}
  //                         titleProps={{
  //                           style: {
  //                             color: 'rgba(51,51,51,0.5)',
  //                             fontFamily: 'Lato-Regular',
  //                           },
  //                         }}
  //                         uncheckedColor={'#fff'}
  //                         checkedColor={'rgb(70,50,103)'}
  //                         onPress={checkedFemale}
  //                       // fontFamily={'Lato-Regular'}
  //                       />
  //                     </View>

  //                     <View style={{ flex: 1 }}>
  //                       <CheckBox
  //                         title=" Custom"
  //                         checkedIcon="dot-circle-o"
  //                         uncheckedIcon="circle"
  //                         checked={Custom}
  //                         containerStyle={{
  //                           padding: 0,
  //                           margin: 0,
  //                           backgroundColor: 'transparent',
  //                           borderColor: 'transparent',
  //                         }}
  //                         titleProps={{
  //                           style: {
  //                             color: 'rgba(51,51,51,0.5 )',
  //                             fontFamily: 'Lato-Regular',
  //                           },
  //                         }}
  //                         uncheckedColor={'lightgrey'}
  //                         checkedColor={'rgb(70,50,103)'}
  //                         textStyle={{ color: '#33333380' }}
  //                         onPress={checkedCustom}
  //                       />
  //                     </View>
  //                   </View>
  //                   {customgenderView && (
  //                     <View style={{}}>
  //                       <View
  //                         style={{
  //                           marginBottom: '2%',
  //                         }}>
  //                         {/* label1="Select your pronoun" value1="0" label2="He" value2="1" label3="She" value3="2" selectedValue={pronoun} SelectedLanguagedata={(selectedValue) => setSelectpronoun(selectedValue)} */}

  //                         <CustomDropdown
  //                           placeholder={'Select your pronoun'}
  //                           data={KYC_type_doc}
  //                           selectedValue={KYC_type_doc}
  //                           SelectedLanguagedata={selectedValue =>
  //                             selectedValue
  //                           }
  //                         />
  //                       </View>

  //                       <View style={{ marginBottom: '3%' }}>
  //                         <TextField
  //                           placeholder={'Gender (optional)'}
  //                           imageIcon={''}
  //                           onChangeText={val => setCustomGender(val)}
  //                           value={CustomGender}
  //                         />
  //                       </View>
  //                     </View>
  //                   )}
  //                   <TouchableOpacity
  //                     style={{
  //                       height: hp('4.5'),
  //                       width: wp('40'),
  //                       backgroundColor: 'rgb(70,50,103)',
  //                       marginTop: 15,
  //                       alignItems: 'center',
  //                       justifyContent: 'center',
  //                       borderRadius: 10,
  //                     }}>
  //                     <Text style={{ color: 'white' }}
  //                     onPress={onPressSubmit}>
  //                       Submit
  //                     </Text>
  //                   </TouchableOpacity>
  //                 </View>
  //               </Modal>
  //               {/* add mail and add number modal */}
  //               <Modal
  //                 isVisible={isModalVisible2}
  //                 onBackdropPress={toggleModal2}>
  //                 <View
  //                   style={{
  //                     height: hp('22'),
  //                     backgroundColor: Colors.$backgroundColor,
  //                     justifyContent: 'center',
  //                     alignItems: 'center',
  //                     paddingVertical: 20,
  //                     paddingHorizontal: 10,
  //                     borderRadius: 5,
  //                   }}>
  //                   <TouchableOpacity
  //                     onPress={toggleModal2}
  //                     style={{ alignSelf: 'flex-end' }}>
  //                     <Image
  //                       source={Images.closeicon}
  //                       style={{ height: 18, width: 18, marginRight: 10 }}
  //                     />
  //                   </TouchableOpacity>

  //                   <Text style={styles.labeltext}>Email</Text>
  //                   <View style={styles.textinputcontainer}>
  //                     <TextInput
  //                       style={{ paddingLeft: 10 }}
  //                       onChangeText={onChangeNumber}
  //                       value={number}
  //                       placeholder="Add Email"
  //                       keyboardType="default"
  //                     />
  //                   </View>

  //                   <TouchableOpacity
  //                     style={{
  //                       height: hp('4.5'),
  //                       width: wp('40'),
  //                       backgroundColor: 'rgb(70,50,103)',
  //                       marginTop: 15,
  //                       alignItems: 'center',
  //                       justifyContent: 'center',
  //                       borderRadius: 10,
  //                     }}>
  //                     <Text style={{ color: 'white' }}>Submit</Text>
  //                   </TouchableOpacity>
  //                 </View>
  //               </Modal>
  //             </View>
  //           );
  //         })}
  //     </>
  //   );
  // };

  const ItemSeprator = () => (
    <View
      style={{
        height: 5,
        width: '100%',
        backgroundColor: 'red',
      }}
    />
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <CustomStatusBar />
        <HeaderTitleWithBack
          navigation={props.navigation}
          headerTitle="Settings"
        />
        {isLoading && renderIndicator()}

        {/* <FlatList
        data={setdatafromlist}
        // keyExtractor={item => item.id.toString()}
        ItemSeparatorComponent={ItemSeprator}
        //  ItemSeparatorComponent={this.SeparatorComponent}
        renderItem={({ item, index }) => rednderItemList(item, index)}
      /> */}

        <ScrollView>
          <View>
            <CardView
              cardElevation={5}
              cardMaxElevation={5}
              // cornerRadius={15}
              style={{
                // width: '95%',

                backgroundColor: 'white',
                marginHorizontal: 15,
                marginTop: 20,
                paddingBottom: 14,
                paddingTop: 10,
              }}>
              <View style={styles.addcitycontainer}>
                <Text style={styles.title_text}>Personal Setting</Text>
                {kyc_approved != '0' ? (
                  <TouchableOpacity onPress={toggleModal}>
                    <Image source={Images.edit_icon} style={styles.addicon} />
                  </TouchableOpacity>
                ) : null}
              </View>

              <View style={styles.border}></View>
              <View style={{ marginTop: 10 }}>
                <View style={styles.text_container}>
                  <Text style={styles.detail_text}>Name : </Text>
                  <Text>{username}</Text>
                  {kyc_approved != '0' ? (
                    <TouchableOpacity
                      onPress={() =>
                        props.navigation.navigate('eKYC', { Editusername: true })
                      }>
                      <Image
                        style={{
                          height: 20,
                          width: 20,

                          //marginTop: 5,
                          marginLeft: 10,
                          // marginBottom: Platform.OS === 'ios' ? 5 : 0,
                          // marginRight: 15,
                        }}
                        source={Images.edit_icon}
                      />
                    </TouchableOpacity>
                  ) : null}
                </View>
                <View style={styles.text_container}>
                  <Text style={styles.detail_text}>DOB : </Text>
                  <Text>{dob}</Text>
                  {kyc_approved != '0' ? (
                    <TouchableOpacity
                      onPress={() =>
                        props.navigation.navigate('eKYC', { Editdob: true })
                      }>
                      <Image
                        style={{
                          height: 20,
                          width: 20,

                          //marginTop: 5,
                          marginLeft: 10,
                          // marginRight: 15,
                        }}
                        source={Images.edit_icon}
                      />
                    </TouchableOpacity>
                  ) : null}
                </View>

                {Gender == 'M' ? (
                  <View style={styles.text_container}>
                    <Text style={styles.detail_text}>Gender : </Text>
                    <Text>Male</Text>
                  </View>
                ) : Gender == 'F' ? (
                  <View style={styles.text_container}>
                    <Text style={styles.detail_text}>Gender : </Text>
                    <Text>Female</Text>
                  </View>
                ) : Gender == 'C' ? (
                  <View style={styles.text_container}>
                    <Text style={styles.detail_text}>Gender : </Text>
                    <Text>Custom</Text>
                  </View>
                ) : null}

                {pronouncustom != '' && pronouncustom != null ? (
                  <View style={styles.text_container}>
                    <Text style={styles.detail_text}>pronoun : </Text>
                    <Text>{pronouncustom + ' '}</Text>
                    {pronouncustomcustom_gender != '' &&
                      pronouncustomcustom_gender != null ? (
                      <Text>{'(' + pronouncustomcustom_gender + ')'}</Text>
                    ) : null}
                  </View>
                ) : null}

                {email != '' ? (
                  <View style={styles.text_container}>
                    {email != '' ? (
                      <View>
                        <TouchableOpacity
                          onPress={toggleModal3}
                          style={{ flexDirection: 'row' }}>
                          <Text style={styles.detail_text}>Email : </Text>
                          <Text>{email}</Text>
                        </TouchableOpacity>
                      </View>
                    ) : null}

                    {phone == '' || phone == null ? (
                      <TouchableOpacity onPress={toggleModal2}>
                        <Image
                          source={Images.phone_icon}
                          style={{
                            resizeMode: 'stretch',
                            tintColor: 'green',
                            marginLeft: 8,
                            width: 20,
                            height: 20,
                          }}
                        />
                      </TouchableOpacity>
                    ) : null}
                  </View>
                ) : null}

                {phone != '' && phone != null ? (
                  <View style={styles.text_container}>
                    {phone != '' && phone != null ? (
                      <View>
                        <TouchableOpacity
                          onPress={toggleModal2}
                          style={{ flexDirection: 'row' }}>
                          <Text style={styles.detail_text}>Phone Number :</Text>
                          <Text>{phone}</Text>
                        </TouchableOpacity>
                      </View>
                    ) : null}

                    {email == '' ? (
                      <TouchableOpacity onPress={toggleModal3}>
                        <Image
                          source={Images.inbox}
                          style={{
                            resizeMode: 'stretch',
                            tintColor: 'green',
                            marginLeft: 8,
                            width: 20,
                            height: 20,
                          }}
                        />
                      </TouchableOpacity>
                    ) : null}
                  </View>
                ) : null}
                {/* <View style={styles.text_container}>
                      {phone == '' ? (
                        <>
                          <Text style={styles.detail_text}>Email : </Text>
                          <Text>{email}</Text>
                        </>
                      ) : (
                        <>
                          <Text style={styles.detail_text}>
                            Phone Number :{' '}
                          </Text>
                          <Text>{phone}</Text>
                        </>
                      )}
                      {phone == '' ? (
                        <TouchableOpacity
                        // onPress={toggleModal2}
                        >
                          <Image
                            source={Images.phone_icon}
                            style={{
                              resizeMode: 'stretch',
                              tintColor: 'green',
                              marginLeft: 8,
                              width: 20,
                              height: 20,
                            }}
                          />
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                        // onPress={toggleModal2}
                        >
                          <Image
                            source={Images.inbox}
                            style={{
                              resizeMode: 'stretch',
                              tintColor: 'green',
                              marginLeft: 8,
                              width: 20,
                              height: 20,
                            }}
                          />
                        </TouchableOpacity>
                      )}
                    </View> */}
                {fathername != '' && (
                  <View style={styles.text_container}>
                    <Text style={styles.detail_text}>Father's Name : </Text>
                    <Text>{fathername}</Text>
                  </View>
                )}
                {mothername != '' && (
                  <View style={styles.text_container}>
                    <Text style={styles.detail_text}>Mother's Name : </Text>
                    <Text>{mothername}</Text>
                  </View>
                )}
              </View>
            </CardView>
            <CardView
              cardElevation={5}
              cardMaxElevation={5}
              //cornerRadius={20}
              style={styles.cardp}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.title_text}>Privacy Setting</Text>
                {isEnabled2 && (
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#4B2A6A',
                      padding: 8,
                      borderRadius: 4,
                    }}
                    onPress={() =>
                      props.navigation.navigate('BlockListScreen')
                    }>
                    <Text style={{ color: '#fff' }}>Block List</Text>
                  </TouchableOpacity>
                )}
              </View>

              {/* <View style={styles.border}></View> */}
              {/* <View style={styles.privacyrowcontainer}>
              {phone == '' ? (
                <>
                  <Text style={styles.detail_text}>Email</Text>
                  <Text style={{ textAlign: 'center' }}>{email}</Text>
                </>
              ) : (
                <>
                  <Text style={styles.detail_text}>Mobile Number</Text>
                  <Text style={{ textAlign: 'center' }}>{phone}</Text>
                </>
              )}

              <Switch
                trackColor={{ false: 'grey', true: 'lightgreen' }}
                thumbColor={isEnabled ? 'limegreen' : 'lightgrey'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch1}
                value={isEnabled}
              />
            </View> */}

              {phone != '' && phone != null ? (
                <View style={styles.border1}></View>
              ) : null}

              {phone != '' && phone != null ? (
                <View style={styles.privacyrowcontainer}>
                  <Text style={styles.detail_text}>Mobile Number</Text>
                  <Text style={{ textAlign: 'center' }}>{phone}</Text>
                  <Switch
                    trackColor={{ false: 'grey', true: 'lightgreen' }}
                    thumbColor={isEnabled ? 'limegreen' : 'lightgrey'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch1}
                    value={isEnabled}
                  />
                </View>
              ) : null}

              {email != '' && email != null ? (
                <View style={styles.border1}></View>
              ) : null}

              {email != '' && email != null ? (
                <View style={styles.privacyrowcontainer}>
                  <Text style={styles.detail_text}>Email ID</Text>
                  <Text style={{ textAlign: 'center' }}>{email}</Text>
                  <Switch
                    trackColor={{ false: 'grey', true: 'lightgreen' }}
                    thumbColor={isEnabledEmail ? 'limegreen' : 'lightgrey'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitchEmail}
                    value={isEnabledEmail}
                  />
                </View>
              ) : null}

              {dob != '' && dob != null ? (
                <View style={styles.border1}></View>
              ) : null}

              {dob != '' && dob != null ? (
                <View style={styles.privacyrowcontainer}>
                  <Text style={styles.detail_text}>Date of Birth</Text>
                  <Text style={{ textAlign: 'center' }}>{dob}</Text>
                  <Switch
                    trackColor={{ false: 'grey', true: 'lightgreen' }}
                    thumbColor={isEnabledDob ? 'limegreen' : 'lightgrey'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitchDob}
                    value={isEnabledDob}
                  />
                </View>
              ) : null}

              {Gender != '' ? <View style={styles.border1}></View> : null}
              <View style={styles.privacyrowcontainer}>
                {Gender == 'M' ? (
                  <>
                    <Text style={styles.detail_text}>Gender</Text>
                    <Text style={{ textAlign: 'center' }}>Male</Text>
                  </>
                ) : Gender == 'F' ? (
                  <>
                    <Text style={styles.detail_text}>Gender</Text>
                    <Text style={{ textAlign: 'center' }}>Female</Text>
                  </>
                ) : Gender == 'C' ? (
                  <>
                    <Text style={styles.detail_text}>Gender</Text>
                    <Text style={{ textAlign: 'center' }}>Custom</Text>
                  </>
                ) : null}

                {Gender != '' && Gender != null ? (
                  <Switch
                    trackColor={{ false: 'grey', true: 'lightgreen' }}
                    thumbColor={isEnabledGender ? 'limegreen' : 'lightgrey'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitchGender}
                    value={isEnabledGender}
                  />
                ) : null}
              </View>

              <View style={styles.border1}></View>
              <View style={styles.privacyrowcontainer}>
                <Text style={styles.detail_text}>Profession</Text>

                <Switch
                  trackColor={{ false: 'grey', true: 'lightgreen' }}
                  thumbColor={isEnabledProfession ? 'limegreen' : 'lightgrey'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitchProfession}
                  value={isEnabledProfession}
                />
              </View>


              <View style={styles.border1}></View>


              <View style={styles.privacyrowcontainer}>
                <Text style={styles.detail_text}>Current City</Text>

                <Switch
                  trackColor={{ false: 'grey', true: 'lightgreen' }}
                  thumbColor={isEnabledCity ? 'limegreen' : 'lightgrey'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitchCity}
                  value={isEnabledCity}
                />
              </View>


              {Gender != '' ? <View style={styles.border1}></View> : null}
              <View style={styles.privacyrowcontainer}>
                <Text style={styles.detail_text}>
                  Enable Two-Factor Authentication
                </Text>
                <Switch
                  trackColor={{ false: 'grey', true: 'lightgreen' }}
                  thumbColor={isEnabledTwoFactor ? 'limegreen' : 'lightgrey'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitchTwoFactor}
                  value={isEnabledTwoFactor}
                />
              </View>

              { isAge ? <View style={styles.border1}></View> : null}

              {isAge ? <View style={styles.privacyrowcontainer}>
                <Text style={styles.detail_text}>Private Profile</Text>
                <Switch
                  trackColor={{ false: 'grey', true: 'lightgreen' }}
                  thumbColor={isEnabledPrivate ? 'limegreen' : 'lightgrey'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitchPrivate}
                  value={isEnabledPrivate}
                />
              </View> : null}

              {isAge ?  <View style={styles.border1}></View>:null}
              {isAge   ?  <View style={styles.privacyrowcontainer}>
                <Text style={styles.detail_text}>Enable Social Media</Text>
                <Switch
                  trackColor={{ false: 'grey', true: 'lightgreen' }}
                  thumbColor={isEnabled2 ? 'limegreen' : 'lightgrey'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch2}
                  value={isEnabled2}
                />
              </View>:null}

              <View style={styles.border1}></View>
              <View style={styles.privacyrowcontainer}>
                <Text style={styles.detail_text}>Deactivate Account</Text>
                {/* <Text style={{ textAlign: 'center' }}>{dob}</Text> */}
                <Switch
                  trackColor={{ false: 'grey', true: 'lightgreen' }}
                  thumbColor={isDeactivateAccount ? 'limegreen' : 'lightgrey'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitchDeactivateAccount}
                  value={isDeactivateAccount}
                />
              </View>
              {/* <View style={styles.border1}></View> */}
            </CardView>

            {/* edit personal information modal */}
            <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
              <View
                style={{
                  //height: hp('55'),
                  backgroundColor: Colors.$backgroundColor,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 20,
                  paddingHorizontal: 10,
                  borderRadius: 5,
                }}>
                <TouchableOpacity
                  onPress={toggleModal}
                  style={{ alignSelf: 'flex-end' }}>
                  <Image
                    source={Images.closeicon}
                    style={{ height: 18, width: 18, marginRight: 10 }}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: 20,
                    marginVertical: 5,
                    fontWeight: 'bold',
                  }}>
                  Personal Information
                </Text>
                <Text style={styles.labeltext}>Mother's Name</Text>
                <View style={styles.textinputcontainers}>
                  {/* <TextInput
                        style={{paddingLeft: 10}}
                        onChangeText={onChangeNumber}
                        value={number}
                        placeholder="Enter Your Mother's Name"
                        keyboardType="default"
                      /> */}
                  <TextField
                    placeholder={'Enter Your Mother Name'}
                    //imageIcon={Images.calendar_icon}
                    onChangeText={val => setnewnnewMothername(val)}
                    value={newmothername}
                  />
                </View>
                <Text style={styles.labeltext}>Father's Name</Text>
                <View style={styles.textinputcontainers}>
                  <TextField
                    placeholder={'Enter Your Father Name'}
                    //imageIcon={Images.calendar_icon}
                    onChangeText={val => setnewnnewFathername(val)}
                    value={newfathername}
                  />
                </View>
                <Text style={styles.labeltext}>Gender</Text>

                <View
                  style={[
                    styles.inputmarginBottom,
                    {
                      flexDirection: 'row',
                      // flex: 1,
                      marginLeft: 25,
                      marginRight: 25,
                    },
                  ]}>
                  <View style={{ flex: 1 }}>
                    <CheckBox
                      title=" Male"
                      checkedIcon="dot-circle-o"
                      uncheckedIcon="circle"
                      checked={male}
                      containerStyle={{
                        padding: 0,
                        margin: 0,
                        backgroundColor: 'transparent',
                        borderColor: 'transparent',
                      }}
                      titleProps={{
                        style: {
                          color: 'rgba(51,51,51,0.5)',
                          fontFamily: 'Lato-Regular',
                        },
                      }}
                      uncheckedColor={'#fff'}
                      checkedColor={'rgb(70,50,103)'}
                      textStyle={{
                        color: '#33333380',
                        fontFamily: 'Lato-Regular',
                      }}
                      onPress={checkedMale}
                    // fontFamily={'Lato-Regular'}
                    />
                  </View>

                  <View style={{ flex: 1 }}>
                    <CheckBox
                      title=" Female"
                      checkedIcon="dot-circle-o"
                      uncheckedIcon="circle"
                      checked={Female}
                      containerStyle={{
                        padding: 0,
                        margin: 0,
                        backgroundColor: 'transparent',
                        borderColor: 'transparent',
                      }}
                      titleProps={{
                        style: {
                          color: 'rgba(51,51,51,0.5)',
                          fontFamily: 'Lato-Regular',
                        },
                      }}
                      uncheckedColor={'#fff'}
                      checkedColor={'rgb(70,50,103)'}
                      onPress={checkedFemale}
                    // fontFamily={'Lato-Regular'}
                    />
                  </View>

                  <View style={{ flex: 1 }}>
                    <CheckBox
                      title=" Custom"
                      checkedIcon="dot-circle-o"
                      uncheckedIcon="circle"
                      checked={Custom}
                      containerStyle={{
                        padding: 0,
                        margin: 0,
                        backgroundColor: 'transparent',
                        borderColor: 'transparent',
                      }}
                      titleProps={{
                        style: {
                          color: 'rgba(51,51,51,0.5 )',
                          fontFamily: 'Lato-Regular',
                        },
                      }}
                      uncheckedColor={'lightgrey'}
                      checkedColor={'rgb(70,50,103)'}
                      textStyle={{ color: '#33333380' }}
                      onPress={checkedCustom}
                    />
                  </View>
                </View>
                {customgenderView && (
                  <View style={{}}>
                    <View
                      style={{
                        marginBottom: '2%',
                        width: 300,
                      }}>
                      {/* label1="Select your pronoun" value1="0" label2="He" value2="1" label3="She" value3="2" selectedValue={pronoun} SelectedLanguagedata={(selectedValue) => setSelectpronoun(selectedValue)} */}

                      <CustomDropdown
                        placeholder={'Select your pronoun'}
                        data={KYC_type_doc}
                        value={Course_Selected}
                        SelectedLanguagedata={(selectedValue: any) => {
                          setCourseTypeSelected(selectedValue);
                        }}
                      />
                    </View>

                    <View
                      style={{ marginBottom: '3%', marginLeft: 5, width: 295 }}>
                      <TextField
                        placeholder={'Gender (optional)'}
                        imageIcon={''}
                        onChangeText={val => setCustomGender(val)}
                        value={CustomGender}
                      />
                    </View>
                  </View>
                )}
                <TouchableOpacity
                  style={{
                    height: hp('5.5'),
                    width: wp('60'),
                    backgroundColor: 'rgb(70,50,103)',
                    marginTop: 15,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 10,
                  }}
                  onPress={() => onPressSubmit()}>
                  <Text style={{ color: 'white' }}>Submit</Text>
                </TouchableOpacity>
              </View>
            </Modal>
            {/*  add number modal */}
            <Modal isVisible={isModalVisible2} onBackdropPress={toggleModal2}>
              <View
                style={{
                  height: hp('25'),
                  backgroundColor: Colors.$backgroundColor,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 20,
                  paddingHorizontal: 10,
                  borderRadius: 5,
                }}>
                <TouchableOpacity
                  onPress={toggleModal2}
                  style={{ alignSelf: 'flex-end' }}>
                  <Image
                    source={Images.closeicon}
                    style={{ height: 18, width: 18, marginRight: 10 }}
                  />
                </TouchableOpacity>

                <Text style={styles.labeltextemail}>Mobile Number</Text>
                <View style={styles.textinputcontainer}>
                  <TextInput
                    style={{
                      paddingLeft: 10,
                      padding: Platform.OS === 'ios' ? 10 : 10,
                    }}
                    onChangeText={onChangeNumber}
                    value={number}
                    placeholder="Enter Mobile Number"
                    keyboardType="number-pad"
                    maxLength={10}
                  />
                </View>

                <TouchableOpacity
                  onPress={() => onPressSubmitNumber()}
                  style={{
                    height: hp('4.5'),
                    width: wp('40'),
                    backgroundColor: 'rgb(70,50,103)',
                    marginTop: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 10,
                  }}>
                  <Text style={{ color: 'white' }}>Submit</Text>
                </TouchableOpacity>
              </View>
            </Modal>

            {/*  add email modal */}
            <Modal isVisible={isModalVisible3} onBackdropPress={toggleModal3}>
              <View
                style={{
                  height: hp('25'),
                  backgroundColor: Colors.$backgroundColor,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 20,
                  paddingHorizontal: 10,
                  borderRadius: 5,
                }}>
                <TouchableOpacity
                  onPress={toggleModal3}
                  style={{ alignSelf: 'flex-end' }}>
                  <Image
                    source={Images.closeicon}
                    style={{ height: 18, width: 18, marginRight: 10 }}
                  />
                </TouchableOpacity>

                <Text style={styles.labeltextemail}>Email</Text>
                <View style={styles.textinputcontainer}>
                  <TextInput
                    style={{
                      paddingLeft: 10,
                      padding: Platform.OS === 'ios' ? 10 : 10,
                    }}
                    onChangeText={onChangeEmail}
                    value={changeemail}
                    placeholder="Add Email"
                    keyboardType="email-address"
                  //maxLength={10}
                  />
                </View>

                <TouchableOpacity
                  onPress={() => onPressSubmitEmail()}
                  style={{
                    height: hp('4.5'),
                    width: wp('40'),
                    backgroundColor: 'rgb(70,50,103)',
                    marginTop: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 10,
                  }}>
                  <Text style={{ color: 'white' }}>Submit</Text>
                </TouchableOpacity>
              </View>
            </Modal>

            {/* modal for otp NO  */}
            <Modal
              isVisible={isotpVisiblemodal}
            // onBackdropPress={toggleModal2}
            >
              <View style={{ backgroundColor: '#F1F1F1', paddingVertical: 10 }}>
                <CustomStatusBar />
                {isLoading && renderIndicator()}
                <TouchableOpacity
                  onPress={otptoggleModal}
                  style={{ alignSelf: 'flex-end' }}>
                  <Image
                    source={Images.closeicon}
                    style={{ height: 18, width: 18, marginRight: 10 }}
                  />
                </TouchableOpacity>
                <View style={styles.logoContainer}>
                  <Image
                    source={Images.message_icon}
                    style={styles.messagelogo}
                  />
                </View>
                <View style={styles.enterTextConatiner}>
                  <Text style={styles.enterText}>
                    {'Enter OTP Send On Your' + ' ' + number}
                  </Text>
                </View>
                <View style={{ paddingHorizontal: '9%', marginVertical: '15%' }}>
                  <OtpInputs
                    inputContainerStyles={styles.OtpinputContainer}
                    inputStyles={styles.otpinput}
                    handleChange={val => setOtp(val)}
                    numberOfInputs={4}
                    focusStyles={{ borderWidth: 2, borderColor: '#4B2A6A' }}
                  />
                </View>

                <View style={{ width: 250, alignSelf: 'center' }}>
                  <CustomButton
                    title={'Submit'}
                    onPress={onPressOtp}
                  //onPress={() => onPressSubmitNumber()}
                  // onPress={() => props.navigation.navigate('eKYC')}
                  />
                </View>
                <View style={styles.OtpResendContainer}>
                  <Text style={styles.resendText} onPress={onPressResendOtp}>
                    Resend Code
                  </Text>
                </View>
              </View>
            </Modal>

            {/* modal for otp EMAIL  */}
            <Modal
              isVisible={isotpVisiblemodalemail}
            // onBackdropPress={toggleModal2}
            >
              <View style={{ backgroundColor: '#F1F1F1', paddingVertical: 10 }}>
                <CustomStatusBar />
                {isLoading && renderIndicator()}
                <TouchableOpacity
                  onPress={otptoggleModalEmail}
                  style={{ alignSelf: 'flex-end' }}>
                  <Image
                    source={Images.closeicon}
                    style={{ height: 18, width: 18, marginRight: 10 }}
                  />
                </TouchableOpacity>
                <View style={styles.logoContainer}>
                  <Image
                    source={Images.message_icon}
                    style={styles.messagelogo}
                  />
                </View>
                <View style={styles.enterTextConatiner}>
                  <Text style={styles.enterText}>
                    {'Enter OTP Send On Your' + ' ' + changeemail}
                  </Text>
                </View>
                <View style={{ paddingHorizontal: '9%', marginVertical: '15%' }}>
                  <OtpInputs
                    inputContainerStyles={styles.OtpinputContainer}
                    inputStyles={styles.otpinput}
                    handleChange={val => setOtpEmail(val)}
                    numberOfInputs={4}
                    focusStyles={{ borderWidth: 2, borderColor: '#4B2A6A' }}
                  />
                </View>

                <View style={{ width: 250, alignSelf: 'center' }}>
                  <CustomButton
                    title={'Submit'}
                    onPress={onPressOtpEmail}
                  //onPress={() => onPressSubmitNumber()}
                  // onPress={() => props.navigation.navigate('eKYC')}
                  />
                </View>
                <View style={styles.OtpResendContainer}>
                  <Text
                    style={styles.resendText}
                    onPress={onPressResendOtpEmail}>
                    Resend Code
                  </Text>
                </View>
              </View>
            </Modal>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
export default SettingScreen;
