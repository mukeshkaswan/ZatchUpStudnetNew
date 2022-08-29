import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Dimensions,
  ScrollView,
  BackHandler,
  Platform,
  SafeAreaView,
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
const screenWidth = Dimensions.get('window').width;
import { CheckBox } from 'react-native-elements';
import { RadioButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import * as userActions from '../../../actions/user-actions-types';
import Toast from 'react-native-simple-toast';
import ProgressLoader from 'rn-progress-loader';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';

interface AlumniNoScreenProps {
  navigation: any;
  route: any;
}

const AlumniNo = (props: AlumniNoScreenProps) => {
  const [Aadhar, setAadhar] = useState('');
  const [Name, setName] = useState('');
  const [selectedSchool, setselectedSchool] = useState('');
  const [ID, setID] = useState('');
  const [RollNo, setRollNo] = useState('');
  const [Course, setCourse] = useState('');
  const [SchoolID, setSchoolID] = useState('');
  const [Des, setDes] = useState('');
  const [setminimudate, setminimumDate] = useState('2015-01-01');
  const [Dess, setDess] = useState('');
  const [allSelected, setSelected] = useState(false);
  const [value, setValue] = React.useState('first');
  const [Duration, setDuration] = useState('');
  const [S_id, setSchooID] = useState('');
  const [CourseType, setCourseType] = useState('');
  const isFocused = useIsFocused();
  const [flag, setFlag] = useState(false);
  const [selectedJoiningStandard, setJoiningStandard] = useState([]);
  const [joiningstandardkey, setJoiningStandardKey] = useState('');
  const [joiningstandardkey2, setJoiningStandardKey2] = useState('');

  const [standardidparm, setStandardIDParm] = useState('');
  const [standardidparmleft, setStandardIDParmLeft] = useState('');

  const [courseedit, setCourseedit] = useState('');
  const [st_edit, setJoinStandardedit] = useState('');
  const [cu_edit, setCurrentStandardedit] = useState('');
  const [classedit, setClass] = useState('');

  const [LeftStandard, setLeftStandard] = useState('');
  const [courseidparm, setCourseIDParm] = useState('');

  const [Course_Selected, setCourseTypeSelected] = useState('');

  const [date1, setDate1] = useState(new Date());
  const [date2, setDate2] = useState(new Date());
  const [date3, setDate3] = useState(new Date());
  const [date4, setDate4] = useState(new Date());

  const [join_standard_id, setjoin_standard_id] = useState('');
  const [left_standard_id, setleft_standard_id] = useState('');

  const [startDate1, setDate_Course1] = useState('');
  const [endDate2, setDate_Course2] = useState('');
  const [startDate3, setDate_Course3] = useState('');
  const [endDate4, setDate_Course4] = useState('');

  const [mode1, setMode1] = useState('date');
  const [show1, setShow1] = useState(false);
  const [mode2, setMode2] = useState('date');
  const [show2, setShow2] = useState(false);

  const [mode3, setMode3] = useState('date');
  const [show3, setShow3] = useState(false);

  const [mode4, setMode4] = useState('date');
  const [show4, setShow4] = useState(false);

  const [selectedCourse, setselectedCourse] = useState([]);
  const [coursekey, setCourseKey] = useState('');

  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [min_date, setmin] = useState('2014-01-01');

  const [dropflag, setDropflag] = useState(false);


  const [CourseTypeOther, setCourseTypeOther] = useState([
    {
      label: 'Regular',
      value: '0',
    },
    {
      label: 'Distance',
      value: '1',
    },
  ]);

  const checkedterm = () => {
    setSelected(!allSelected);
  };

  const onChange1 = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow1(Platform.OS === 'ios');
    if (event.type == 'set') {
      //ok button
      setDate1(currentDate);
    } else {
      return null;
    }

    var MyDateString =
      currentDate.getFullYear() +
      '-' +
      ('0' + (currentDate.getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + currentDate.getDate()).slice(-2);
    setDate_Course1(MyDateString);
  };

  const onChange1iOS = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow1(Platform.OS === 'ios');
    if (event.type == 'set') {
      //ok button
      setDate1(currentDate);
      setShow1(Platform.OS !== 'ios'); // to show time
    } else {
      setShow1(Platform.OS === 'ios'); // to hide back the picker
      setMode1('date'); // defaulting to date for next open
    }

    var MyDateString =
      currentDate.getFullYear() +
      '-' +
      ('0' + (currentDate.getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + currentDate.getDate()).slice(-2);
    setDate_Course1(MyDateString);
  };

  const onChange2 = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow2(Platform.OS === 'ios');
    if (event.type == 'set') {
      //ok button
      setDate2(currentDate);
    } else {
      return null;
    }

    var MyDateString =
      currentDate.getFullYear() +
      '-' +
      ('0' + (currentDate.getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + currentDate.getDate()).slice(-2);
    setDate_Course2(MyDateString);
  };

  const onChange2iOS = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow2(Platform.OS === 'ios');
    if (event.type == 'set') {
      //ok button
      setDate2(currentDate);
      setShow2(Platform.OS !== 'ios'); // to show time
    } else {
      setShow2(Platform.OS === 'ios'); // to hide back the picker
      setMode2('date'); // defaulting to date for next open
    }

    var MyDateString =
      currentDate.getFullYear() +
      '-' +
      ('0' + (currentDate.getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + currentDate.getDate()).slice(-2);
    setDate_Course2(MyDateString);
  };

  const onChange3 = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow3(Platform.OS === 'ios');
    if (event.type == 'set') {
      //ok button
      setDate3(currentDate);
    } else {
      //cancel Button
      return null;
    }
    var MyDateString =
      currentDate.getFullYear() +
      '-' +
      ('0' + (currentDate.getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + currentDate.getDate()).slice(-2);
    setDate_Course3(MyDateString);
  };

  const onChange3iOS = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow3(Platform.OS === 'ios');
    if (event.type == 'set') {
      //ok button
      setDate3(currentDate);
      setShow3(Platform.OS !== 'ios'); // to show time
    } else {
      setShow3(Platform.OS === 'ios'); // to hide back the picker
      setMode3('date'); // defaulting to date for next open
    }

    var MyDateString =
      currentDate.getFullYear() +
      '-' +
      ('0' + (currentDate.getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + currentDate.getDate()).slice(-2);
    setDate_Course3(MyDateString);
  };

  const onChange4 = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow4(Platform.OS === 'ios');
    if (event.type == 'set') {
      //ok button
      setDate4(currentDate);
    } else {
      //cancel Button
      return null;
    }

    var MyDateString =
      currentDate.getFullYear() +
      '-' +
      ('0' + (currentDate.getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + currentDate.getDate()).slice(-2);
    setDate_Course4(MyDateString);
  };

  const onChange4iOS = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow4(Platform.OS === 'ios');
    if (event.type == 'set') {
      //ok button
      setDate4(currentDate);
      setShow4(Platform.OS !== 'ios'); // to show time
    } else {
      setShow4(Platform.OS === 'ios'); // to hide back the picker
      setMode4('date'); // defaulting to date for next open
    }

    var MyDateString =
      currentDate.getFullYear() +
      '-' +
      ('0' + (currentDate.getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + currentDate.getDate()).slice(-2);
    setDate_Course4(MyDateString);
  };

  const showMode1 = currentMode => {
    setShow1(true);
    setMode1(currentMode);
  };

  const showMode2 = currentMode => {
    setShow2(true);
    setMode2(currentMode);
  };

  const showMode3 = currentMode => {
    setShow3(true);
    setMode3(currentMode);
  };

  const showMode4 = currentMode => {
    setShow4(true);
    setMode4(currentMode);
  };

  const showDatepicker1 = () => {
    showMode1('date');
  };
  const showDatepicker2 = () => {
    showMode2('date');
  };

  const showDatepicker3 = () => {
    showMode3('date');
  };

  const showDatepicker4 = () => {
    showMode4('date');
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

  useEffect(() => {
    getCourseListData(
      props.route.params.school_id,
      props.route.params.course_id,
    );

    getAddmissionNo();
    //console.log('course_type', props.route.params.course_type);

    if (props.route.params.coursekeyothersAlumni == '0') {
      setCourseedit(0);
      setCourse(props.route.params.course_name);
      setDess(props.route.params.description);
      //setDate3()
      //setDate4()
      if (props.route.params.course_type == 'Regular') {
        setCourseTypeSelected('0');
        getDataOtherEdit(
          props.route.params.school_id,
          props.route.params.course_id,
        );
      } else {
        setCourseTypeSelected('1');
        getDataOtherEdit(
          props.route.params.school_id,
          props.route.params.course_id,
        );
      }
      // setCourse(props.route.params.course_name);
    } else {
      setCourseedit(props.route.params.course_id);
    }


    const dataSetTimeOut = setTimeout(async () => {
      setDropflag(false);
      return () => {
        dataSetTimeOut.clear();
      };
    }, 3000);
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonC);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonC);
    };
  }, [isFocused]);

  const handleBackButtonC = () => {
    props.navigation.goBack();
    return true;
  };
  /***************************GET DATA*******************************/

  const getdataStandardKey = async result => {
    var school = [];
    result.results.map((element: any) => {
      let obj = {
        label: element.standard_name,
        value: element.id,
      };
      school.push(obj);
    });
    setJoiningStandard(school);
  };
  /***************************GET DATA*******************************/

  const getdataStartDateEndDate = async result => {
    result.map((element: any) => {
      setDate_Course3(element.start_date);
      setDate_Course4(element.end_date);
    });
  };

  /***************************GET DATA*******************************/

  const getdataCourseKey = async result => {
    var course = [
      {
        label: 'Others',
        value: 0,
      },
    ];
    result.results.map((element: any) => {
      let obj = {
        label: element.course_name,
        value: element.id,
        description: element.description,
        start_date: element.start_date,
        end_date: element.end_date,
      };
      course.unshift(obj);
    });
    setselectedCourse(course);
  };
  /***************************GET DATA*******************************/

  /***************************User get Addmission No Data *******************************/

  const getAddmissionNo = async () => {
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

    let rawdata = {
      class_id: '',
      course_id: props.route.params.course_id,
      existing_course_id: props.route.params.course_id,
      join_standard_id: '',
      left_standard_id: '',
      school_id: props.route.params.school_id,
      course_type: '',
    };
    const data = {
      token: token,
      data: rawdata,
    };
    setLoading(true);

    dispatch(
      userActions.getAddmissionNoBySchool({
        data,
        callback: ({ result, error }) => {
          if (result) {
            console.warn(
              'after result getAddmissionNoBySchool ',
              JSON.stringify(result, undefined, 2),
              //  getdataCourseKey(result)
              // setSchooID(result.data.admission_no),
              setDes(result.data.description),
              // setDes(result.data.description),
              setDate_Course1(result.data.course_start_year),
              setDate_Course2(result.data.course_end_year),
              setjoin_standard_id(result.data.join_standard_id),
              setleft_standard_id(result.data.left_standard_id),
              setJoinStandardedit(result.data.join_standard_id),
              setCurrentStandardedit(result.data.left_standard_id),
              setDropflag(true)
              //setClass(result.data.class_id)
            );
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

  /***************************User get Standard *******************************/

  const getStandard = async id => {
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
      id: id,
      token: token,
    };
    setLoading(true);
    dispatch(
      userActions.getStandard({
        data,
        callback: ({ result, error }) => {
          if (result) {
            console.warn(
              'after result',
              JSON.stringify(result, undefined, 2),

              getdataStandardKey(result),

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
  };

  /***************************User get Course List Data *******************************/

  const getCourseListData = async (id, courseid) => {
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
      id: id,
      token: token,
      edit_course_id: courseid,
    };
    setLoading(true);

    dispatch(
      userActions.getEditCourseList({
        data,
        callback: ({ result, error }) => {
          if (result) {
            console.warn(
              'after result',
              JSON.stringify(result, undefined, 2),
              getdataCourseKey(result),
            );
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

  /***************************User get Course List Data *******************************/

  const getDataOtherEdit = async (id, courseid) => {
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
      school_id: id,
      token: token,
      course_id: courseid,
    };
    setLoading(true);

    dispatch(
      userActions.getUpdateschoolcoursedetailbyuser({
        data,
        callback: ({ result, error }) => {
          if (result.status === true) {
            console.warn(
              'after result .....>',
              JSON.stringify(result, undefined, 2),
              // getdataCourseKey(result),
              getdataStartDateEndDate(result.data),
            );
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

  /***************************User Course Added Past*******************************/

  const CourseAdded = async () => {
    const coursenameError = Validate('coursekey', coursekey);
    const dobstartError = Validate('startdate', startDate1);
    const dobendError = Validate('enddate', endDate2);
    const standardError = Validate('joiningstandardkey', joiningstandardkey);
    const standardError1 = Validate('joiningstandardkey2', joiningstandardkey2);
    const desError = Validate('Des', Des);
    //const schoolidError = Validate('schoolid', S_id);

    if (
      coursenameError ||
      dobstartError ||
      dobendError ||
      standardError ||
      standardError1 ||
      desError
    ) {
      //this._scrollView.scrollTo(0);
      Toast.show(
        coursenameError ||
        dobstartError ||
        dobendError ||
        standardError ||
        standardError1 ||
        desError,
        Toast.SHORT,
      );

      return false;
    } else {
      setLoading(true);

      let rawdata = {
        // admission_no: S_id,
        class_id: '',
        comment: Des,
        course_end_year: endDate2,
        course_id: courseidparm,
        course_start_year: startDate1,
        date_joining: null,
        is_current_course: '0',
        existing_course_id: props.route.params.course_id,
        join_standard_id: standardidparm,
        left_standard_id: standardidparmleft,
        name_of_school: props.route.params.nameofschool,
        school_code: props.route.params.school_zatchup_id,
        school_id: props.route.params.school_id,
        standard_end_year: null,
        standard_start_year: null,
      };

      let token = '';
      try {
        const value = await AsyncStorage.getItem('token');
        if (value !== null) {
          // value previously stored
          token = value;
        }
      } catch (e) {
        // error reading value
      }

      //console.log('token', token)

      let data_update = {
        token: token,
        data: rawdata,
      };

      dispatch(
        userActions.getAddPastEiCourse({
          data_update,
          callback: ({ result, error }) => {
            if (result.status === true) {
              console.warn(
                'after Add Past courseresult',
                JSON.stringify(result.status, undefined, 2),
                //submit(result.data)
                props.navigation.navigate('EIconfirmation', {
                  school_zatchup_id: props.route.params.school_zatchup_id,
                  nameofschool: props.route.params.nameofschool,
                  AlumniNo: 'AlumniNo',
                  re_verify: props.route.params.re_verify,
                }),
              );
              // setSpinnerStart(false);
              setLoading(false);
            }
            if (result.status === false) {
              console.warn(JSON.stringify(error, undefined, 2));
              // setLoginSuccess(result);
              setLoading(false);
              //console.log('dfdfdf--------', error)
              Toast.show(
                'Admission Number already available on this School',
                Toast.SHORT,
              );

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

  /***************************User Course Added Other*******************************/

  const CourseAddedOther = async () => {
    const coursenameError = Validate('coursename', Course);
    const courseError = Validate('coursekey', Course_Selected);
    const dobstartError = Validate('startdate', startDate3);
    const dobendError = Validate('enddate', endDate4);
    const desError = Validate('Des', Dess);
    if (
      coursenameError ||
      courseError ||
      dobstartError ||
      dobendError ||
      desError
    ) {
      //this._scrollView.scrollTo(0);
      Toast.show(
        coursenameError ||
        courseError ||
        dobstartError ||
        dobendError ||
        desError,
        Toast.SHORT,
      );

      return false;
    } else {
      setLoading(true);

      var key =
        Course_Selected == 0
          ? 'Regular'
          : Course_Selected == 1
            ? 'Distance'
            : null;

      let rawdata = {
        //admission_no: S_id,
        class_id: '',
        comment: Des,
        course_end_year: endDate2,
        course_start_year: startDate1,
        course_id: props.route.params.course_id,
        course_name: Course,
        course_type: key,
        description: Dess,
        end_date: endDate4,
        name_of_school: props.route.params.nameofschool,
        school_code: props.route.params.school_zatchup_id,
        school_id: props.route.params.school_id,
        start_date: startDate3,
        join_standard_id: join_standard_id,
        left_standard_id: left_standard_id,
        existing_course_id: props.route.params.course_id,
        is_already_register: 'false',
        is_current: false,
        join_start_year: null,
        current_standard_id: null,
        date_joining: startDate1,
        roll_no: null,
      };

      let token = '';
      try {
        const value = await AsyncStorage.getItem('token');
        if (value !== null) {
          // value previously stored
          token = value;
        }
      } catch (e) {
        // error reading value
      }

      //console.log('token', token)

      let data_update = {
        token: token,
        data: rawdata,
      };

      dispatch(
        userActions.getAddCourseByUser({
          data_update,
          callback: ({ result, error }) => {
            if (result.status === true) {
              console.warn(
                'after Add Course other result',
                JSON.stringify(result.status, undefined, 2),
                //submit(result.data)
                props.navigation.navigate('EIconfirmation', {
                  school_zatchup_id: props.route.params.school_zatchup_id,
                  nameofschool: props.route.params.nameofschool,
                  AlumniNo: 'AlumniNo',
                  re_verify: props.route.params.re_verify,
                  change_course_id: courseidparm,
                  login: false,
                }),

                //   props.navigation.navigate('EIconfirmation', { 'school_zatchup_id': props.route.params.school_zatchup_id, 'nameofschool': props.route.params.nameofschool, 'state': props.route.params.state, 'city': props.route.params.city, 'address': props.route.params.address, 'board': props.route.params.board })
              );
              // setSpinnerStart(false);
              setLoading(false);
            }
            if (result.status === false) {
              console.warn(JSON.stringify(error, undefined, 2));
              // setLoginSuccess(result);
              setLoading(false);
              //console.log('dfdfdf--------', error)
              //  Toast.show('This Course is already added by this user Please select other course', Toast.SHORT);

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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={'always'}
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <CustomStatusBar />

          {isLoading && renderIndicator()}

          <CustomHeader
            Title={'Add Course Details'}
            Back={'true'}
            navigation={props.navigation}
          />

          {/* <View style={styles.backbtnCss}><BackBtn navigation={props.navigation} /></View> */}

          <ScrollView>
            <View style={styles.inputContainer}>
              <View>
                <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                  <Text style={{ marginTop: 2, fontSize: 12, marginLeft: 5 }}>
                    {props.route.params.nameofschool +
                      '(' +
                      props.route.params.school_zatchup_id +
                      ')'}
                  </Text>
                </View>

                {props.route.params.LoginfromEducationProfile == true ? (
                  <View style={{}}>
                    <CustomDropdown
                      placeholder={'Select Course'}
                      data={selectedCourse}
                      value={courseedit}
                      disabled={
                        props.route.params.LoginfromEducationProfile == true
                          ? true
                          : false
                      }
                      SelectedLanguagedata={selectedValue => {
                        setCourseKey(selectedValue);
                        setCourseedit(selectedValue);

                        var data = [];
                        data = selectedCourse.filter(
                          x => x.value == selectedValue,
                        );

                        if (data.length > 0) {
                          setDes(data[0].description);
                          getStandard(selectedValue);
                          setCourseIDParm(data[0].value);
                          setminimumDate(data[0].start_date);
                        }
                      }}
                    />
                    {/* <CustomDropdown label1="Select Course" value1="0" label2="ABC" value2="1" label3="Others" value3="2" selectedValue={selectedSchool} SelectedLanguagedata={(item) => setselectedSchool(item)} /> */}
                  </View>
                ) : (
                  <View style={{}}>
                    <CustomDropdown
                      placeholder={'Select Course'}
                      data={selectedCourse}
                      value={courseedit}
                      // disabled={coursekey == 0 ? true : false}
                      disabled={
                        props.route.params.LoginfromEducationProfile == true
                          ? true
                          : false
                      }
                      SelectedLanguagedata={selectedValue => {
                        // setJoiningStandardKey('');
                        // setSchooID('');
                        // setJoiningStandardKey2('');

                        if (dropflag) {

                        }
                        else {
                          setDate_Course1('');
                          setDate_Course2('');
                        }

                        //setDate_Course3('');
                        // setDate_Course4('');
                        // setCourse('');
                        // setDess('');

                        setCourseKey(selectedValue);
                        setCourseedit(selectedValue);

                        var data = [];
                        data = selectedCourse.filter(
                          x => x.value == selectedValue,
                        );

                        if (data.length > 0) {
                          setDes(data[0].description);
                          getStandard(selectedValue);
                          setCourseIDParm(data[0].value);
                          setminimumDate(data[0].start_date);
                          // setDropflag(false)
                        }
                      }

                      }
                    />

                    {/* <CustomDropdown label1="Select Course" value1="0" label2="ABC" value2="1" label3="Others" value3="2" selectedValue={selectedSchool} SelectedLanguagedata={(item) => setselectedSchool(item)} /> */}
                  </View>
                )}
                {coursekey == 0 ? (
                  <View>
                    <View
                      style={{ marginTop: '3%', marginLeft: 2, marginRight: 2 }}>
                      <TextField
                        placeholder={'Enter Course Name'}
                        onChangeText={val => setCourse(val)}
                        value={Course}
                      />
                    </View>

                    <View style={{ marginTop: '1%' }}>
                      <CustomDropdown
                        placeholder={'Select Type'}
                        data={CourseTypeOther}
                        value={Course_Selected}
                        SelectedLanguagedata={(selectedValue: any) => {
                          setCourseTypeSelected(selectedValue);
                          // setID('')
                        }}
                      />
                    </View>

                    {show3 && (
                      <DateTimePicker
                        testID="dateTimePicker"
                        value={date3}
                        mode={mode3}
                        minimumDate={new Date(min_date)}
                        maximumDate={new Date()}
                        is24Hour={true}
                        format="YYYY-MMM-DD"
                        display="default"
                        onChange={
                          Platform.OS === 'ios' ? onChange3iOS : onChange3
                        }
                      />
                    )}

                    {show4 && (
                      <DateTimePicker
                        testID="dateTimePicker"
                        value={date4}
                        mode={mode4}
                        minimumDate={new Date(date3)}
                        maximumDate={new Date()}
                        is24Hour={true}
                        format="YYYY-MMM-DD"
                        display="default"
                        onChange={
                          Platform.OS === 'ios' ? onChange4iOS : onChange4
                        }
                      />
                    )}
                    <TouchableOpacity onPress={showDatepicker3}>
                      <View
                        style={{
                          marginTop: '3%',
                          marginLeft: 2,
                          marginRight: 2,
                        }}>
                        <TextField
                          placeholder={'Start Date'}
                          imageIcon={Images.calendar_icon}
                          editable={false}
                          value={startDate3.toString()}
                        />
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={showDatepicker4}>
                      <View
                        style={{
                          marginTop: '4%',
                          marginLeft: 2,
                          marginRight: 2,
                        }}>
                        <TextField
                          placeholder={'End Date'}
                          imageIcon={Images.calendar_icon}
                          editable={false}
                          value={endDate4.toString()}
                        />
                      </View>
                    </TouchableOpacity>

                    <View
                      style={{
                        marginTop: '3%',
                        marginBottom: '4%',
                        marginLeft: 2,
                        marginRight: 2,
                      }}>
                      <TextField
                        placeholder={'Enter Description'}
                        multiline={true}
                        onChangeText={val => setDess(val)}
                        value={Dess}
                      />
                    </View>
                  </View>
                ) : (
                  <View>
                    <TouchableOpacity onPress={showDatepicker1}>
                      <View
                        style={{
                          marginTop: '3%',
                          marginLeft: 2,
                          marginRight: 2,
                        }}>
                        <TextField
                          placeholder={'Start Year'}
                          imageIcon={Images.calendar_icon}
                          editable={false}
                          value={startDate1.toString()}
                        />
                      </View>
                    </TouchableOpacity>

                    {show1 && (
                      <DateTimePicker
                        testID="dateTimePicker"
                        value={date1}
                        mode={mode1}
                        // minDate={new Date()}
                        minimumDate={new Date(setminimudate)}
                        maximumDate={new Date()}
                        is24Hour={true}
                        format="YYYY-MMM-DD"
                        display="default"
                        onChange={
                          Platform.OS === 'ios' ? onChange1iOS : onChange1
                        }
                      />
                    )}

                    {show2 && (
                      <DateTimePicker
                        testID="dateTimePicker"
                        value={date2}
                        mode={mode2}
                        //  minDate={new Date()}
                        minimumDate={new Date(date1)}
                        maximumDate={new Date()}
                        is24Hour={true}
                        format="YYYY-MMM-DD"
                        display="default"
                        onChange={
                          Platform.OS === 'ios' ? onChange2iOS : onChange2
                        }
                      />
                    )}

                    <TouchableOpacity onPress={showDatepicker2}>
                      <View
                        style={{
                          marginTop: '4%',
                          marginLeft: 2,
                          marginRight: 2,
                        }}>
                        <TextField
                          placeholder={'End Year'}
                          imageIcon={Images.calendar_icon}
                          editable={false}
                          value={endDate2.toString()}
                        />
                      </View>
                    </TouchableOpacity>

                    <View style={{ marginTop: '1%' }}>
                      <CustomDropdown
                        placeholder={'Select Joining Standard'}
                        data={selectedJoiningStandard}
                        value={st_edit}
                        //  selectedValue={coursekey}
                        SelectedLanguagedata={selectedValue => {
                          //  getSchool(selectedValue);
                          setJoiningStandardKey(selectedValue);
                          setJoinStandardedit(selectedValue);

                          var data = [];
                          data = selectedJoiningStandard.filter(
                            x => x.value == selectedValue,
                          );

                          if (data.length > 0) {
                            setStandardIDParm(data[0].value);
                          }
                        }}
                      />

                      {/* <CustomDropdown label1="Joining Standard" value1="0" label2="ABC" value2="1" label3="ABC" value3="2" selectedValue={JoiningStandard} SelectedLanguagedata={(item) => setJoiningStandard(item)} /> */}
                    </View>

                    <View style={{ marginTop: '1%' }}>
                      <CustomDropdown
                        placeholder={'Select Left Standard'}
                        data={selectedJoiningStandard}
                        value={cu_edit}
                        SelectedLanguagedata={selectedValue => {
                          setJoiningStandardKey2(selectedValue);
                          setCurrentStandardedit(selectedValue);

                          var data = [];
                          data = selectedJoiningStandard.filter(
                            x => x.value == selectedValue,
                          );

                          if (data.length > 0) {
                            setStandardIDParmLeft(data[0].value);
                          }
                        }}
                      />
                      {/* <CustomDropdown label1="Left Standard" value1="0" label2="ABC" value2="1" label3="ABC" value3="2" selectedValue={LeftStandard} SelectedLanguagedata={(item) => setLeftStandard(item)} /> */}
                    </View>

                    {/* <View
                    style={{ marginTop: '3%', marginLeft: 2, marginRight: 2 }}>
                    <TextField
                      placeholder={'Enter School ID'}
                      keyboardType="numeric"
                      onChangeText={val => setSchooID(val)}
                      value={S_id}
                    />
                  </View> */}

                    <View
                      style={{
                        marginTop: '4%',
                        marginLeft: 2,
                        marginRight: 2,
                        marginBottom: '5%',
                      }}>
                      <TextField
                        placeholder={'Add Description of Study...'}
                        multiline={true}
                        onChangeText={val => setDes(val)}
                        editable={false}
                        value={Des}
                      />
                    </View>
                  </View>
                )}
              </View>

              <View>
                {coursekey == 0 ? (
                  <CustomButton
                    title={'Save'}
                    disabled={flag}
                    onPress={() => CourseAddedOther()}
                  />
                ) : (
                  <CustomButton
                    title={'Submit'}
                    disabled={flag}
                    onPress={() => CourseAdded()}
                  />
                )}
              </View>
            </View>
          </ScrollView>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default AlumniNo;
