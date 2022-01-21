import React, { useState, useEffect } from 'react';
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
  ImageBackground,
  FlatList,
  Platform,
  TextInput,
  RefreshControl,
  ScrollView
} from 'react-native';
import styles from './style';
import { Images } from '../../../components/index';
import { TextField, CustomButton, CustomStatusBar, Validate } from '../../../components';
import { useDispatch, useSelector } from 'react-redux';
import * as userActions from '../../../actions/user-actions-types';
import Toast from 'react-native-simple-toast';
import CardView from 'react-native-cardview';
import ProgressLoader from 'rn-progress-loader';
import {
  NavigationContainer,
  useIsFocused,
  DrawerActions,
  useFocusEffect
} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Card } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const screenWidth = Dimensions.get('window').width;

interface HomeScreenProps {
  navigation: any;
  route: any;
}
const HomeScreen = (props: HomeScreenProps) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [zatchupid, setZatchUpId] = useState('');
  const [profilepic, setProfilePic] = useState('');
  const [dob, setDob] = useState('');
  const [kyc_approved, setkyc_approved] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [fathername, setFathername] = useState('');
  const [mothername, setMothername] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [schoolid, setSchoolid] = useState('');
  const [addmissionnumber, setAddmissionnumber] = useState('');
  const [rollno, setRollNo] = useState('');
  const [class_id, setclass_id] = useState('');
  const [course_id, setcourse_id] = useState('');
  const [oldrollno, setOldRollNo] = useState('');


  const [oldvalue, setoldvalue] = useState('');
  const [unreadnotificationcount, set_unread_notification_count] = useState('');
  const [unreadremindercount, set_unread_reminder_count] = useState('');
  const [setdatafromlist, setDataCourseInList] = useState([]);
  const [citydata, setCityData] = useState([]);

  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisibleno, setModalVisibleNo] = useState(false);
  const [isModalVisiblerollno, setModalVisibleRollNo] = useState(false);


  const [cityname, onChangecityname] = useState('');
  const [cityid, onSetCityid] = useState('');
  const [stateid, onSetStateid] = useState('');
  const [countryid, onSetCountryid] = useState('');
  const [refreshing, setRefreshing] = useState(false);



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

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleModalNo = async (id, admission_number) => {

    //console.log('school_id', admission_number)
    setModalVisibleNo(!isModalVisibleno);
    setSchoolid(id);

    if (admission_number != null) {
      setAddmissionnumber(admission_number);
      setoldvalue(admission_number);


    }
    else {
      setAddmissionnumber('');
      setoldvalue('');
    }
  };

  const toggleModalRollNo = async (class_id, course_id, roll_no) => {


    setModalVisibleRollNo(!isModalVisiblerollno);

    setRollNo(roll_no);
    setOldRollNo(roll_no);
    setclass_id(class_id);
    setcourse_id(course_id);
  };

  const wait = (timeout: any) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const onRefresh = React.useCallback(() => {
    getEducationProfile();
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);


  useEffect(() => {


    getEducationProfile();

    //  getStepCountAPi();

    //getAuthUserInfoApi();

    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, [isFocused]);


  // useFocusEffect(
  //   React.useCallback(() => {
  //     getEducationProfile();
  //     getStepCountAPi();
  //     getAuthUserInfoApi();
  //     BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);

  //     return () =>
  //       BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
  //   }, [])
  // );
  //console.log("this.props",this.props);

  // function handleBackButtonClick() {
  //   props.navigation.goBack();
  //   return true;
  // }
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

  const onBurgerBarPress = () => {
    props.navigation.dispatch(DrawerActions.toggleDrawer());
  };

  const getdataCourse = async result => {
    setDataCourseInList(result.data);
  };

  const DeleteSchool = async id => {
    Alert.alert(
      'Delete School',
      'Are you sure you want delete this School ?',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'Yes', onPress: () => Coursedelete(id) },
      ],
      { cancelable: false },
    );
    return true;
  };

  const DeleteCourse = async id => {
    Alert.alert(
      'Delete Course',
      'Are you sure you want delete this course ?',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'Yes', onPress: () => Coursedeletestandard(id) },
      ],
      { cancelable: false },
    );
    return true;
  };




  /***************************User get Delete course list *******************************/

  const Coursedeletestandard = async id => {
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
      course_id: id,
    };
    setLoading(true);

    dispatch(
      userActions.getDeleteCourseStandard({
        data,
        callback: ({ result, error }) => {
          if (result) {
            setLoading(false);

            // console.warn(
            //   'after result',
            //   JSON.stringify(result, undefined, 2),
            //   // getdataCourseKey(result)
            //   // getEicourseconfirmationlist(),


            //   // props.navigation.navigate('SelectStudent'),
            // );
            Toast.show('Course deleted successfully', Toast.SHORT),
              getEducationProfile()
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


  /***************************User get Delete course list *******************************/

  const Coursedelete = async id => {
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
      school_id: id,
    };
    setLoading(true);

    dispatch(
      userActions.getDeleteCourseData({
        data,
        callback: ({ result, error }) => {
          if (result) {
            setLoading(false);
            // console.warn(
            //   'after result',
            //   JSON.stringify(result, undefined, 2),
            //   // getdataCourseKey(result)
            //   // getEicourseconfirmationlist(),


            //   // props.navigation.navigate('SelectStudent'),
            // );
            Toast.show('School deleted successfully', Toast.SHORT),
              getEducationProfile()
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
            // console.warn(
            //   'after result Auth User INfo',
            //   JSON.stringify(result, undefined, 2),
            //   //  props.navigation.navigate('OtpLogin', { 'firebase_id': result.firebase_username, 'username': email })
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
            // console.warn(
            //   'after result step count',
            //   JSON.stringify(result, undefined, 2),
            //   //  props.navigation.navigate('OtpLogin', { 'firebase_id': result.firebase_username, 'username': email })
            // );
            // setSpinnerStart(false);
            set_unread_notification_count(result.unread_notification_count);
            set_unread_reminder_count(result.unread_reminder_count);
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
      setCountry(element.location.country_name);

      // var obj = {
      //   id: element.first_name,
      // }
      // Profile.push(obj);
    });
    _storeData();

    // console.log(',.....................>data',Profile.length)

    //  setDataCourseInList(result.data);
    // setKey(true)
  };
  const _storeData = async () => {
    try {
      await AsyncStorage.setItem('username', username);
      await AsyncStorage.setItem('profilepic', profilepic);
      await AsyncStorage.setItem('kyckey', kyc_approved.toString());
    } catch (e) {
      // saving error
    }
  };

  // var state = [];
  // result.data.map((element: any) => {
  //     const { }  = element;
  //     access values from this.state.items
  //     var obj = {
  //         id: element.ei_detail.id,
  //         school_code: element.ei_detail.school_code,
  //         name_of_school: element.ei_detail.name_of_school,
  //         state: element.ei_detail.state,
  //         city: element.ei_detail.city,
  //         address1: element.ei_detail.address1,
  //         address2: element.ei_detail.address2,
  //         university: element.ei_detail.university,
  //         is_current_course:  element.ei_detail.course_detail[0].is_current_course ,
  //         course_name: (element.ei_detail.course_detail.length > 0) ? element.ei_detail.course_detail[0].course_name : '',
  //         description: (element.ei_detail.course_detail.length > 0) ? element.ei_detail.course_detail[0].description : '',
  //         course_id: (element.ei_detail.course_detail.length > 0) ? element.ei_detail.course_detail[0].course_id : '',
  //         duration: (element.ei_detail.course_detail.length > 0) ? element.ei_detail.course_detail[0].duration : '',
  //         start_year: (element.ei_detail.course_detail.length > 0) ? element.ei_detail.course_detail[0].start_year : '',
  //         end_year: (element.ei_detail.course_detail.length > 0) ? element.ei_detail.course_detail[0].end_year : '',
  //         standard_name:  element.ei_detail.course_detail[0].standard_detail[0].standard_name ,
  //         roll_no: (element.ei_detail.course_detail[0].standard_detail.length > 0) ? element.ei_detail.course_detail[0].standard_detail[0].roll_no : '',
  //         org_start_date: (element.ei_detail.course_detail[0].standard_detail.length > 0) ? element.ei_detail.course_detail[0].standard_detail[0].org_start_date : '',
  //         section: (element.ei_detail.course_detail[0].standard_detail[0].class_detail.length > 0) ? element.ei_detail.course_detail[0].standard_detail[0].class_detail[0].class_name : '',
  //         section:element.ei_detail.course_detail[0].class_detail[0].class_name,
  //          standard_name:element.ei_detail.course_detail[0].standard_detail[0].standard_name,

  //     }

  //     state.push(obj);

  // });

  // console.log('dsfsdfds----------------------------->>>>>>>', state)

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

    dispatch(
      userActions.getStudentEducationProfile({
        data,

        callback: ({ result, error }) => {
          if (result.status === true) {
            // console.warn(
            //   'after result',
            //   JSON.stringify(result, undefined, 2),


            // );
            getdataProfile(result),
              getdataCourse(result),
              // setSpinnerStart(false);
              setLoading(false);
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



  /***************************User GET City Search Name list *******************************/

  const getCity_Model_Search = async (value) => {


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
      key: value,

    };
    setLoading(true);

    dispatch(
      userActions.getCitySearch({
        data,

        callback: ({ results, error }) => {
          // console.warn(
          //   'after city result data',
          //   results
          //   //  getdataProfile(result),
          // );
          if (results && results.length > 0) {

            // setSpinnerStart(false);
            setCityData(results),

              setLoading(false);
          }
          else if (results && results.length == []) {
            setCityData([])

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



  /***************************User GET City State Model Submit *******************************/

  const onPressModalSubmit = async () => {

    if (cityname == '') {

      setModalVisible(!isModalVisible);

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
        city_id: cityid,
        country_id: countryid,
        state_id: stateid,

      };
      setLoading(true);

      dispatch(
        userActions.getAddcitystateofuser({
          data,

          callback: ({ result, error }) => {
            if (result.status === true) {
              setLoading(false);

              // console.warn(
              //   'after result',
              //   JSON.stringify(result, undefined, 2),

              //   //  getdataProfile(result),
              //   //  getdataCourse(result),
              // );
              setModalVisible(!isModalVisible);

              Toast.show('Location updated successfully', Toast.SHORT);

              getEducationProfile();

              // setSpinnerStart(false);
            }
            if (result.status === false) {
              console.warn(JSON.stringify(error, undefined, 2));
              setLoading(false);
              Toast.show('No City found', Toast.SHORT);
            } else {
              setLoading(false);
              console.warn(JSON.stringify(error, undefined, 2));
            }
          },
        }),
      );
    };
  }


  /***************************User GET Admission Number Model Submit *******************************/

  const onPressModalSubmitRollNo = async () => {

    const schoolidError = Validate('rollno_', rollno);

    if (
      schoolidError

    ) {
      //this._scrollView.scrollTo(0);
      Toast.show(
        schoolidError,
        Toast.SHORT,
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

      const data = {
        token: token,
        old_value: oldrollno,
        course_id: course_id,
        class_id: class_id,
        value: rollno,
        key: "roll_no",
      };


      setLoading(true);

      dispatch(
        userActions.getUsereditadmissionrollnotwo({
          data,

          callback: ({ result, error }) => {
            if (result.status === true) {

              setLoading(false);

              // console.warn(
              //   'after result',
              //   JSON.stringify(result, undefined, 2),
              // );

              setModalVisibleRollNo(!isModalVisiblerollno);

              Toast.show('Successfully Added', Toast.SHORT);

              getEducationProfile();

              // setSpinnerStart(false);
            }
            if (result.status === false) {
              console.warn(JSON.stringify(error, undefined, 2));
              setLoading(false);
              Toast.show('You are not Approved By School', Toast.SHORT);
            } else {
              setLoading(false);
              console.warn(JSON.stringify(error, undefined, 2));
            }
          },
        }),
      );
    };
  }

  /***************************User GET Admission Number Model Submit *******************************/

  const onPressModalSubmitAdmissionNo = async () => {

    const schoolidError = Validate('addmissionno', addmissionnumber);

    if (
      schoolidError

    ) {
      //this._scrollView.scrollTo(0);
      Toast.show(
        schoolidError,
        Toast.SHORT,
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

      const data = {
        token: token,
        old_value: oldvalue,
        school_id: schoolid,
        value: addmissionnumber,
        class_id: "",
        key: "admission_number",
      };
      setLoading(true);

      dispatch(
        userActions.getUsereditadmissionrollno({
          data,

          callback: ({ result, error }) => {
            if (result.status === true) {

              setLoading(false);

              // console.warn(
              //   'after result',
              //   JSON.stringify(result, undefined, 2),
              // );

              setModalVisibleNo(!isModalVisibleno);

              Toast.show('Successfully Added', Toast.SHORT);

              getEducationProfile();

              // setSpinnerStart(false);
            }
            if (result.status === false) {
              console.warn(JSON.stringify(error, undefined, 2));
              setLoading(false);
              Toast.show('You are not Approved By School', Toast.SHORT);
            } else {
              setLoading(false);
              console.warn(JSON.stringify(error, undefined, 2));
            }
          },
        }),
      );
    };
  }



  const getSearchcitydata = async (value) => {

    onChangecityname(value);

    if (value.length > 2) {
      getCity_Model_Search(value);

    } else if (value.length < 3) {
      setCityData([]);
    }
  }

  const Setcitynametext = async item => {

    onChangecityname(item.display);

    onSetCityid(item.id);

    onSetStateid(item.state_id);

    onSetCountryid(item.country_id);


    setCityData([]);

  }


  const rednderItemListcitydata = (item, index) => {

    return (
      <CardView
        cardElevation={2}
        cardMaxElevation={2}
        cornerRadius={5}
        style={styles.Cardview_city}>
        <TouchableOpacity
          underlayColor="none"
          onPress={() => Setcitynametext(item)}>


          <View>
            <Text style={{ color: '#000', fontSize: 16, padding: 5 }}>{item.display}</Text>
          </View>
        </TouchableOpacity>
      </CardView>
    )
  }


  const rednderItemList = (item, index) => {
    return (
      <>
        {item.educationdetail.length > 0 &&
          item.educationdetail.map(i => {
            return (
              <CardView
                cardElevation={1}
                cardMaxElevation={1}
                cornerRadius={10}
                style={styles.Cardviewcopy1}>
                {i.school_name_display == true ? <View>

                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.Personal_Tvheader}>School Details</Text>
                    {kyc_approved == '1' && i.approved == 0 && i.is_onboard == true && i.is_students_verified == true && i.is_active_subscription == true ? <TouchableOpacity style={{
                      backgroundColor: '#333A41',
                      width: 58,
                      height: 27,
                      marginTop: 16,
                      justifyContent: 'center',
                      alignItems: 'center',
                      //  borderRadius: 20,
                      // marginLeft: 20,
                    }}
                      onPress={() => props.navigation.navigate('GetVerifyWebView', { 'user_id': props.route.params.user_id })}>
                      <Text style={{ color: 'white', fontSize: 11 }}>Get Verify</Text>
                    </TouchableOpacity> : null}


                    <View style={{ flexDirection: 'row' }}>

                      {i.approved == 1 ? <TouchableOpacity
                        underlayColor="none"
                        onPress={() => props.navigation.navigate('CoursesPendingScreen', { 'school_id': i.school_id })}>

                        <Image
                          style={{
                            height: 28,
                            width: 28,
                            marginTop: 15,
                            //  marginLeft: 20,
                            marginRight: 15,
                          }}
                          source={Images.pending}
                        />

                      </TouchableOpacity> : null}

                      {kyc_approved == '1' && i.firebase_id != null ? <TouchableOpacity
                        underlayColor="none"
                        onPress={() => props.navigation.navigate('SingleChatWebView', { 'user_id': props.route.params.user_id })}>

                        {/* <Image
                          style={{
                            height: 28,
                            width: 28,
                            marginTop: 15,
                            //  marginLeft: 20,
                            marginRight: 15,
                          }}
                          source={Images.delete_icon}
                        /> */}
                        <Icon name="chat" size={32} color="#00B031" style={{

                          marginTop: 12,
                          //  marginLeft: 20,
                          marginRight: 15,
                        }} />
                      </TouchableOpacity> : null}

                      {i.approved != '1' ? (<TouchableOpacity
                        underlayColor="none"
                        onPress={() => DeleteSchool(i.school_id)}>

                        <Image
                          style={{
                            height: 28,
                            width: 28,
                            marginTop: 15,
                            //  marginLeft: 20,
                            marginRight: 15,
                          }}
                          source={Images.delete_icon}
                        />
                      </TouchableOpacity>) : null}

                      {i.is_onboard == true ? <TouchableOpacity
                        underlayColor="none"
                        onPress={() => props.navigation.navigate('SelectStudentFromLogin', { 'nameofschool': i.name_of_school, 'school_zatchup_id': i.school_code, 'school_id': i.school_id, 'true': true })}
                      >
                        <Image
                          style={{
                            height: 28,
                            width: 28,
                            marginTop: 15,
                            //  marginLeft: 20,
                            marginRight: 15,
                          }}
                          source={Images.add_more}
                        />
                      </TouchableOpacity> : <TouchableOpacity
                        underlayColor="none"
                        onPress={() => props.navigation.navigate('AddCourseDetailsOthers', { 'nameofschool': i.name_of_school, 'school_zatchup_id': i.school_code, 'school_id': i.school_id, 'true': true })}
                      >
                        <Image
                          style={{
                            height: 28,
                            width: 28,
                            marginTop: 15,
                            //  marginLeft: 20,
                            marginRight: 15,
                          }}
                          source={Images.add_more}
                        />
                      </TouchableOpacity>}
                    </View>

                    {/* <Image
                  style={styles.editicon1}
                  source={Images.delete}
                /> */}
                  </View>
                  <View
                    style={{
                      height: 1,
                      width: '78%',
                      marginLeft: 20,
                      // marginTop:10,
                      backgroundColor: '#E5E5E5',
                    }}
                  />


                  <View style={styles.underview} />
                  <View>
                    <View style={styles.view_Row}>
                      <Text style={styles.view_Tv_1}>School Name :</Text>
                      {i.approved == '1' ? (
                        <Image
                          style={styles.editicon2}
                          source={Images.blue_tick}
                        />
                      ) : null}
                      <Text
                        style={{
                          marginTop: 5,
                          fontSize: 18,
                          marginLeft: 10,
                          color: '#565656',
                          flex: 1,
                          flexWrap: 'wrap',
                        }}>
                        {i.name_of_school}
                      </Text>
                    </View>
                    {i.school_code != null ? <View style={styles.view_Row}>
                      <Text style={styles.view_Tv_1}>ZatchUp ID :</Text>
                      <Text style={styles.view_Tv_2}>{i.school_code}</Text>
                    </View> : null}

                    <View style={styles.view_Row}>
                      <Text style={styles.view_Tv_1}>State :</Text>
                      <Text style={styles.view_Tv_2}>{i.state}</Text>
                    </View>
                    <View style={styles.view_Row}>
                      <Text style={styles.view_Tv_1}>City :</Text>
                      <Text style={styles.view_Tv_2}>{i.city}</Text>
                    </View>

                    {i.is_onboard == true ? <View style={styles.view_Row}>
                      <Text style={styles.view_Tv_1}>School Address :</Text>
                      <Text style={styles.view_Tv_2}>
                        {i.address1 + ' ' + i.address2}
                      </Text>
                    </View> : null}

                    {i.admission_number != null && i.is_onboard == true ? <View style={styles.view_Row}>
                      <Text style={styles.view_Tv_1}>
                        School Admission Number :
                      </Text>
                      <TouchableOpacity
                        underlayColor="none"
                        onPress={() => toggleModalNo(i.school_id, i.admission_number)}
                      >
                        <Text style={styles.view_Tv_2}>{i.admission_number}</Text>
                      </TouchableOpacity>


                    </View> : i.admission_number == null && i.is_onboard == true ? <View style={styles.view_Row}>
                      <Text style={styles.view_Tv_1}>
                        School Admission Number :
                      </Text>
                      <TouchableOpacity
                        underlayColor="none"
                        onPress={() => toggleModalNo(i.school_id)}
                      >
                        <Image
                          style={{
                            height: 28,
                            width: 28,
                            marginTop: 5,
                            marginLeft: 15,
                            marginRight: 15,
                          }}
                          source={Images.add_more}
                        />
                      </TouchableOpacity>
                    </View> : null}
                  </View>
                  <View
                    style={{
                      height: 1,
                      width: '80%',
                      marginLeft: 20,
                      marginTop: 10,
                      backgroundColor: '#E5E5E5',
                    }}
                  />

                  <View style={styles.underview} />

                  {i.course_detail &&
                    i.course_detail.map(course => {
                      return (
                        <View>
                          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.Personal_Tv}>Course Details</Text>

                            <View style={{ flexDirection: 'row' }}>

                              <TouchableOpacity
                                underlayColor="none"
                                onPress={() => props.navigation.navigate('EIconfirmation', { 'course_id': course.course_id,'login':true})}
                              >

                                <Image
                                  style={{
                                    height: 28,
                                    width: 28,
                                    marginTop: 10,
                                    // marginLeft: 20,
                                    marginRight: 15,
                                  }}
                                  source={Images.edit_icon}
                                />
                              </TouchableOpacity>

                              <TouchableOpacity
                                underlayColor="none"
                                onPress={() => DeleteCourse(course.course_id)}
                              >
                                <Image
                                  style={{
                                    height: 28,
                                    width: 28,
                                    marginTop: 10,
                                    //  marginLeft: 20,
                                    marginRight: 15,
                                  }}
                                  source={Images.delete_icon}
                                />
                              </TouchableOpacity>
                            </View>
                            {/* <TouchableOpacity>
                              <Image
                                style={styles.editicon1}
                                source={Images.edit_icon}
                              />
                            </TouchableOpacity> */}
                          </View>
                          <View style={styles.underview} />
                          <View style={styles.view_Row}>
                            <Text style={styles.view_Tv_1}>Name of Course :</Text>
                            <Text style={styles.view_Tv_2}>
                              {course.course_name}
                            </Text>
                          </View>

                          {
                            course.is_current_course == true ? (
                              <View style={styles.view_Row}>
                                <Text style={styles.view_Tv_1}>
                                  Course Duration :
                                </Text>
                                <Text style={styles.view_Tv_2}>
                                  {course.start_year + '-' + 'Current'}
                                </Text>
                              </View>
                            ) : (
                              <View style={styles.view_Row}>
                                <Text style={styles.view_Tv_1}>
                                  Course Duration :
                                </Text>
                                <Text style={styles.view_Tv_2}>
                                  {course.start_year + i.end_year}
                                </Text>
                              </View>
                            )
                          }

                          <View style={styles.view_Row}>
                            <Text style={styles.view_Tv_1}>Course Tenure :</Text>
                            <Text style={styles.view_Tv_2}>
                              {course.duration}
                            </Text>
                          </View>
                          <View
                            style={{
                              height: 1,
                              width: '80%',
                              marginLeft: 20,
                              marginTop: 10,
                              backgroundColor: '#E5E5E5',
                            }}
                          />

                          <View style={styles.underview} />

                          {
                            course.standard_detail &&
                            course.standard_detail.map(standard => {
                              return (
                                <View>
                                  <Text style={styles.Personal_Tv}>
                                    Standard Details
                                  </Text>
                                  <View style={styles.underview} />

                                  {standard.is_current_standard == true ? (
                                    <View style={styles.view_Row}>
                                      <Text style={styles.view_Tv_1}>
                                        Standard :
                                      </Text>
                                      <Text style={styles.view_Tv_2}>
                                        {standard.standard_name +
                                          ' ' +
                                          '(' +
                                          standard.standard_start_year +
                                          '-' +
                                          'To Current'}
                                      </Text>
                                    </View>
                                  ) : (
                                    <View style={styles.view_Row}>
                                      <Text style={styles.view_Tv_1}>
                                        Standard :
                                      </Text>
                                      <Text style={styles.view_Tv_2}>
                                        {standard.standard_name +
                                          '-' +
                                          standard.standard_end_year}
                                      </Text>
                                    </View>
                                  )}

                                  {standard.class_detail != [] &&
                                    standard.is_current_standard == true ? (
                                    <View>
                                      {standard.class_detail.map(class_i => {
                                        return (
                                          <View>
                                            <View style={styles.view_Row}>
                                              <Text style={styles.view_Tv_1}>
                                                Class (Sub-Section) :
                                              </Text>
                                              <Text style={styles.view_Tv_2}>
                                                {class_i.class_name}
                                              </Text>
                                            </View>
                                            <View style={styles.view_Row}>
                                              <Text style={styles.view_Tv_1}>
                                                Roll Number :
                                              </Text>
                                              <TouchableOpacity
                                                underlayColor="none"
                                                onPress={() => toggleModalRollNo(class_i.class_id, course.course_id, class_i.roll_no)}
                                              >
                                                <Text style={styles.view_Tv_2}>
                                                  {class_i.roll_no}
                                                </Text>
                                              </TouchableOpacity>

                                            </View>
                                          </View>
                                        );
                                      })}
                                    </View>
                                  ) : null}

                                  <View style={styles.underview} />
                                  <View
                                    style={{
                                      height: 1,
                                      width: '80%',
                                      marginLeft: 20,
                                      marginTop: 10,
                                      backgroundColor: '#E5E5E5',
                                    }}
                                  />

                                </View>
                              );
                            })
                          }
                        </View>
                      );
                    })}
                </View> : null}
              </CardView>
            );
          })
        }
      </>
    );
  };

  const ItemSeprator = () => (
    <View
      style={{
        height: 5,
        width: '100%',
        backgroundColor: 'red',
      }}
    />
  );


  const ItemSepratorcity = () => (
    <View
      style={{
        height: 1,
        width: '100%',
        backgroundColor: 'red',
      }}
    />
  );

  const backPressed = () => {
    props.navigation.goBack(null);
    return true;
  };
  return (
    <View style={styles.container}>
      {/* <CustomStatusBar /> */}
      {isLoading && renderIndicator()}
      <View
        style={{
          height: Platform.OS === 'ios' ? '10%' : '7%',
          backgroundColor: 'rgb(70,50,103)',
          //   borderBottomLeftRadius: 15,
          //   borderBottomRightRadius: 15,
        }}>
        <View
          style={{ flexDirection: 'row', width: '100%', alignSelf: 'center' }}>
          <TouchableOpacity
            onPress={backPressed}
            style={{
              marginTop: Platform.OS === 'ios' ? 30 : 10,
              marginLeft: 10,
            }}>
            <Icon name="arrow-left" size={25} color="white" />
          </TouchableOpacity>

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
                marginRight: 20,
                fontFamily: 'Lato-Regular',
                marginTop: Platform.OS === 'ios' ? 30 : 5,
              }}>
              {'My Education Profile'}
            </Text>
          </View>
        </View>
      </View>
      {/* <View style={styles.child_view}>
        <TouchableOpacity onPress={onBurgerBarPress}>
          <Image source={Images.menu_dash} style={styles.image_menu} />
        </TouchableOpacity>

        <View style={styles.tv_view}>
          <Text style={styles.ZatchUp_tv}>ZatchUp</Text>
          <Text style={styles.TM_tv}>TM</Text>
        </View>

        <View style={styles.Notification_view}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('Reminders');
            }}>
            <Image source={Images.search} style={styles.inbox_iconreminder} />
          </TouchableOpacity>
          <View
            style={{
              position: 'absolute',
              marginTop: Platform.OS == 'ios' ? 2 : 5,
              right: 5,
              alignSelf: 'flex-end',
              borderRadius: 15,
              backgroundColor: '#00B200',
              width: Platform.OS == 'ios' ? 20 : 18,
              height: Platform.OS == 'ios' ? 20 : 18,
            }}>
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 12,
                textAlign: 'center',
                fontWeight: 'bold',
                marginTop: Platform.OS == 'ios' ? 2 : 0,
              }}>
              {' '}
              {unreadremindercount}{' '}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Notifications');
          }}
          style={styles.dot_view}>
          <View>
            <Image source={Images.inbox_icon} style={styles.dot_image} />
            <View
              style={{
                position: 'absolute',
                marginTop: Platform.OS == 'ios' ? 2 : 5,
                right: 5,
                alignSelf: 'flex-end',
                borderRadius: 15,
                backgroundColor: '#00B200',
                width: Platform.OS == 'ios' ? 20 : 18,
                height: Platform.OS == 'ios' ? 20 : 18,
              }}>
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 12,
                  textAlign: 'center',
                  fontWeight: 'bold',
                  marginTop: Platform.OS == 'ios' ? 2 : 0,
                }}>
                {' '}
                {unreadnotificationcount}{' '}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View> */}
      <ScrollView style={{ flex: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            // title="Pull to refresh" 
            // tintColor="#fff" 
            //  titleColor="#fff"
            colors={["rgb(70,50,103)"]}
          />
        }>



        <View >

          {kyc_approved == '1' ? (<TouchableOpacity onPress={() => props.navigation.navigate('PendingRequestScreen')} >
            <Image
              style={{
                height: 32,
                width: 32,
                marginTop: 10,
                marginRight: 18,
                alignSelf: 'flex-end'
              }}
              source={Images.pending}
            />
          </TouchableOpacity>
          ) : null}
          <View style={styles.avatarStyle}>


            <Image
              source={{ uri: profilepic }}
              style={{
                height: 100,
                width: 100,
                resizeMode: 'cover',
                borderRadius: 50,
              }}
            />
            {kyc_approved == '1' ? (
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
                  style={{ height: '100%', width: '100%', resizeMode: 'cover' }}
                />
              </View>
            ) : null}





          </View>


        </View>
        <Text style={styles.textStyle}>{username}</Text>
        {/* <Text style={styles.textStyle_}>
            {'Unique ZatchUp ID' + ':' + zatchupid}
          </Text> */}
        {zatchupid != null ? <Text style={styles.textStyle_}>
          {'Unique ZatchUp ID' + ':' + zatchupid}
        </Text> : <Text style={styles.textStyle_}>
          {'Unique ZatchUp ID' + ':' + 'XXXXXXXX'}
        </Text>}

        {/* <ImageBackground
          source={{ uri: 'http://staging.zatchup.com/zatchup/assets/images/cover-pic-default.png' }}
          style={styles.containers}>
          <View style={styles.overlay}>
            <Image source={{uri :profilepic}}
              style={styles.avatarStyle} />
            <Text style={styles.textStyle} >{username}</Text>
            <Text style={styles.textStyle_} >{zatchupid}</Text>
          </View>
        </ImageBackground> */}

        {/* <View style={{ flexDirection: 'column' }}>
          <Card>
            <Card.Cover source={{ uri: 'http://staging.zatchup.com/zatchup/assets/images/cover-pic-default.png' }} />
          </Card>

        
        </View> */}

        <View style={styles.view}>
          <CardView
            cardElevation={5}
            cardMaxElevation={5}
            cornerRadius={10}
            style={styles.Cardview}>
            <View style={styles.view_Rowbg}>
              <Text style={styles.Personal_Tvheader}>Personal Information</Text>
            </View>

            <View
              style={{
                height: 1,
                width: '88%',
                marginLeft: 20,
                backgroundColor: '#E5E5E5',
              }}
            />

            <View style={styles.underview} />
            <View style={styles.view_Row}>
              <Text style={styles.view_Tv_1}>DOB :</Text>
              <Text style={styles.view_Tv_2}>{dob}</Text>
            </View>

            {gender == 'M' ? (
              <View style={styles.view_Row_}>
                <Text style={styles.view_Tv_1}>Gender :</Text>
                <Text style={styles.view_Tv_2}>Male</Text>
              </View>
            ) : gender == 'F' ? (
              <View style={styles.view_Row_}>
                <Text style={styles.view_Tv_1}>Gender :</Text>
                <Text style={styles.view_Tv_2}>Female</Text>
              </View>
            ) : (
              <View style={styles.view_Row_}>
                <Text style={styles.view_Tv_1}>Gender :</Text>
                <Text style={styles.view_Tv_2}>Custom</Text>
              </View>
            )}

            {phone == '' ? (
              <View style={styles.view_Row_}>
                <Text style={styles.view_Tv_1}>Email :</Text>
                <Text style={styles.view_Tv_2}>{email}</Text>
              </View>
            ) : (
              <View style={styles.view_Row_}>
                <Text style={styles.view_Tv_1}>Phone :</Text>
                <Text style={styles.view_Tv_2}>{phone}</Text>
              </View>
            )}

            <View style={styles.view_Row_}>
              <Text style={styles.view_Tv_1}>Father's Name :</Text>
              <Text style={styles.view_Tv_2}>{fathername}</Text>
            </View>

            <View style={styles.view_Row_Child}>
              <Text style={styles.view_Tv_1}>Mother's Name :</Text>
              <Text style={styles.view_Tv_2}>{mothername}</Text>
            </View>


          </CardView>


          <CardView
            cardElevation={5}
            cardMaxElevation={5}
            cornerRadius={10}
            style={styles.Cardview}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
              <Text style={styles.Personal_Tv}>Add Your City</Text>

              {country == null ? <TouchableOpacity
                underlayColor="none"
                onPress={toggleModal}
              >
                <Image
                  style={{
                    height: 28,
                    width: 28,

                    marginTop: 10,
                    // marginLeft: 20,
                    marginRight: 15,
                  }}
                  source={Images.add_more}
                />
              </TouchableOpacity> : <TouchableOpacity
                underlayColor="none"
                onPress={toggleModal}
              >
                <Image
                  style={{
                    height: 28,
                    width: 28,

                    marginTop: 10,
                    // marginLeft: 20,
                    marginRight: 15,
                  }}
                  source={Images.edit_icon}
                />
              </TouchableOpacity>}



            </View>

            <View
              style={{
                height: 1,
                width: '82%',
                marginLeft: 20,
                marginTop: 10,
                backgroundColor: '#E5E5E5',
              }}
            />


            {country != '' && country != null ? <View>
              <View style={styles.view_Row}>
                <Text style={styles.view_Tv_1}>City :</Text>
                <Text style={styles.view_Tv_2}>{city}</Text>
              </View>

              <View style={styles.view_Row}>
                <Text style={styles.view_Tv_1}>State :</Text>
                <Text style={styles.view_Tv_2}>{state}</Text>
              </View>

              <View style={styles.view_Row}>
                <Text style={styles.view_Tv_1}>Country :</Text>
                <Text style={styles.view_Tv_2}>{country}</Text>
              </View>

            </View> : null}







            <View
              style={styles.underview}
            />
            {/* <View style={styles.view_Row_}>
              <Text style={styles.view_Tv_1}>Delhi Public School</Text>
              <Image
                style={{ marginLeft: 10, marginTop: 5 }}
                source={Images.verfied}
              />
            </View> */}
          </CardView>


          <CardView
            cardElevation={5}
            cardMaxElevation={5}
            cornerRadius={10}
            style={styles.Cardview}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.Personal_Tv}>Work Details</Text>

              <TouchableOpacity
                underlayColor="none"
                onPress={() => props.navigation.navigate('WorkDetailsScreen', { 'data': false })}>
                <Image
                  style={{
                    height: 28,
                    width: 28,
                    marginTop: 10,
                    marginLeft: 20,
                    marginRight: 15,
                  }}
                  source={Images.add_more}
                />
              </TouchableOpacity>

            </View>

            <View
              style={{
                height: 1,
                width: '82%',
                marginLeft: 20,
                marginTop: 10,
                backgroundColor: '#E5E5E5',
              }}
            />


            <View
              style={styles.underview}
            />
            {/* <View style={styles.view_Row_}>
              <Text style={styles.view_Tv_1}>Delhi Public School</Text>
              <Image
                style={{ marginLeft: 10, marginTop: 5 }}
                source={Images.verfied}
              />
            </View> */}
          </CardView>

          <CardView
            cardElevation={5}
            cardMaxElevation={5}
            cornerRadius={10}
            style={styles.Cardview}>


            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.Personal_Tv}>Add School</Text>

              <TouchableOpacity
                onPress={() => props.navigation.navigate('SelectStudent', { 'data': false })}>
                <Image
                  style={{
                    height: 28,
                    width: 28,
                    marginTop: 10,
                    marginLeft: 20,
                    marginRight: 15,
                  }}
                  source={Images.add_more}
                />
              </TouchableOpacity>

              {/* <TouchableOpacity
               onPress={() => props.navigation.navigate('CurrentSchoolinfo',{'data':false})}>
              <Image
                style={styles.editicon1}
                source={Images.edit_icon}
              />
              </TouchableOpacity> */}

            </View>


            <View
              style={{
                height: 1,
                width: '82%',
                marginLeft: 20,
                marginTop: 10,
                backgroundColor: '#E5E5E5',
              }}
            />


            <View
              style={styles.underview}
            />
          </CardView>

          <FlatList
            data={setdatafromlist}
            // keyExtractor={item => item.id.toString()}
            ItemSeparatorComponent={ItemSeprator}
            //  ItemSeparatorComponent={this.SeparatorComponent}
            renderItem={({ item, index }) => rednderItemList(item, index)}
          />
        </View>

        {/* add your city modal */}
        <Modal style={{ margin: 0, padding: 0 }} isVisible={isModalVisible} onBackdropPress={toggleModal}>

          <View style={styles.modalContainer}>

            <TouchableOpacity
              onPress={toggleModal}
              style={{ alignSelf: 'flex-end', marginBottom: 10, marginTop: 10 }}>
              <Image
                source={Images.closeicon}
                style={{ height: 18, width: 18, marginRight: 10 }}
              />
            </TouchableOpacity>
            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: '10%' }}>
              <View style={styles.textinputContainer}>
                <Image
                  source={Images.search}
                  style={{ marginLeft: 10, tintColor: 'grey' }}
                />

                <TextInput
                  //onChangeText={onChangeNumber}
                  onChangeText={value => getSearchcitydata(value)}
                  value={cityname}
                  placeholder="Search City"
                  keyboardType="default"
                />

              </View>

              {citydata.length > 0 ? <FlatList
                data={citydata}
                style={{ height: '45%' }}
                // keyExtractor={item => item.id.toString()}
                // ItemSeparatorComponent={ItemSepratorcity}
                //  ItemSeparatorComponent={this.SeparatorComponent}
                renderItem={({ item, index }) => rednderItemListcitydata(item, index)}
              /> : null}


              <TouchableOpacity
                onPress={() => onPressModalSubmit()}
                style={styles.submitbtn}>
                <Text style={{ color: 'white', fontSize: 16 }}>Submit</Text>
              </TouchableOpacity>
            </View>


          </View>
        </Modal>


        {/* add your admission no modal */}
        <Modal style={{ margin: 0, padding: 0 }} isVisible={isModalVisibleno} onBackdropPress={toggleModalNo}>

          <View style={styles.modalContainer}>

            <TouchableOpacity
              onPress={toggleModalNo}
              style={{ alignSelf: 'flex-end', marginBottom: 10, marginTop: 10 }}>
              <Image
                source={Images.closeicon}
                style={{ height: 18, width: 18, marginRight: 10 }}
              />
            </TouchableOpacity>
            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: '10%' }}>
              <View style={styles.textinputContainer}>
                <Image
                  source={Images.search}
                  style={{ marginLeft: 10, tintColor: 'grey' }}
                />

                <TextInput
                  placeholder="Enter admission number"
                  keyboardType='number-pad'
                  onChangeText={val => setAddmissionnumber(val)}
                  value={addmissionnumber}
                />

              </View>


              <TouchableOpacity
                onPress={() => onPressModalSubmitAdmissionNo()}
                style={styles.submitbtn}>
                <Text style={{ color: 'white', fontSize: 16 }}>Submit</Text>
              </TouchableOpacity>
            </View>


          </View>
        </Modal>

        {/* add your roll no modal */}
        <Modal style={{ margin: 0, padding: 0 }} isVisible={isModalVisiblerollno} onBackdropPress={toggleModalRollNo}>

          <View style={styles.modalContainer}>

            <TouchableOpacity
              onPress={toggleModalRollNo}
              style={{ alignSelf: 'flex-end', marginBottom: 10, marginTop: 10 }}>
              <Image
                source={Images.closeicon}
                style={{ height: 18, width: 18, marginRight: 10 }}
              />
            </TouchableOpacity>
            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: '10%' }}>
              <View style={styles.textinputContainer}>
                <Image
                  source={Images.search}
                  style={{ marginLeft: 10, tintColor: 'grey' }}
                />

                <TextInput
                  placeholder="Enter roll number"
                  keyboardType='number-pad'
                  onChangeText={val => setRollNo(val)}
                  value={rollno}
                />

              </View>


              <TouchableOpacity
                onPress={() => onPressModalSubmitRollNo()}
                style={styles.submitbtn}>
                <Text style={{ color: 'white', fontSize: 16 }}>Submit</Text>
              </TouchableOpacity>
            </View>


          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
