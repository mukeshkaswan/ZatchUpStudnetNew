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
  SafeAreaView
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
  HeaderTitleWithBack
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

interface EducationProfileScreenProps {
  navigation: any;
  route: any;
}

const EducationProfile = (props: EducationProfileScreenProps) => {
  const [Aadhar, setAadhar] = useState('');
  const [Name, setName] = useState('');
  const [selectedSchool, setselectedSchool] = useState('');
  const [ID, setID] = useState('');
  const [RollNo, setRollNo] = useState('');
  const [Course, setCourse] = useState('');
  const [SchoolID, setSchoolID] = useState('');
  const [Des, setDes] = useState('');
  const [setminimudate, setminimumDate] = useState('2015-01-01');
  const [allSelected, setSelected] = useState(false);
  const [value, setValue] = React.useState('first');
  const [Duration, setDuration] = useState('');
  const [KYC_type_doc_Selected, setKYCSelected] = useState('');
  const [data, dataSet] = useState<any>(null);

  const [courseidparm, setCourseIDParm] = useState('');
  const [standardidparm, setStandardIDParm] = useState('');
  const [standardidparmleft, setStandardIDParmLeft] = useState('');

  const [classidparm, setClassIDParm] = useState('');

  const [date, setDate] = useState(new Date());
  const [date_copy, setDate_Copy] = useState('');
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const [selectedCourse, setselectedCourse] = useState([]);
  const [coursekey, setCourseKey] = useState('');

  const [selectedJoiningStandard, setJoiningStandard] = useState([]);
  const [joiningstandardkey, setJoiningStandardKey] = useState('');
  const [joiningstandardkey1, setJoiningStandardKey1] = useState('');

  const [selectedsetStandardClass, setStandardClass] = useState([]);
  const [standardclasskey, setStandarClassdKey] = useState('');

  const [isLoading, setLoading] = useState(false);

  const dispatch = useDispatch();

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
      label: 'Passport Number',
      value: '2',
    },
  ]);

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
    const currentDate = selectedDate;
    setShow(Platform.OS === 'ios');

    if (event.type == 'set') {
      //ok button
      setDate(currentDate);

    } else {
      return null;
    }
    // setDate(currentDate);
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();
    //  console.log('A date has been picked: ' + day + '-' + month + '-' + year);
    //  setDate_Copy(year + '-' + month + '-' + day);
    var MyDateString =
      currentDate.getFullYear() +
      '-' +
      ('0' + (currentDate.getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + currentDate.getDate()).slice(-2);
    setDate_Copy(MyDateString);

    // YYYY-MM-DD
  };


  const onChangeiOS = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(Platform.OS === 'ios');

    if (event.type == 'set') {
      //ok button
      setDate(currentDate);
      setShow(Platform.OS !== 'ios'); // to show time

    } else {
      setShow(Platform.OS === 'ios'); // to hide back the picker
      setMode('date'); // defaulting to date for next open
    }
    // setDate(currentDate);
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();
    //  console.log('A date has been picked: ' + day + '-' + month + '-' + year);
    //  setDate_Copy(year + '-' + month + '-' + day);
    var MyDateString =
      currentDate.getFullYear() +
      '-' +
      ('0' + (currentDate.getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + currentDate.getDate()).slice(-2);
    setDate_Copy(MyDateString);

  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  useEffect(() => {
    console.log('props.route.params educ', props.route.params)

    //   const school_id =  props.route.params.school_id ;
    // const fetchProducts = async () => {
    //     const school_id = await AsyncStorage.getItem('school_id')
    //     getCourseListData(school_id)
    // }
    // fetchProducts()
    // console.log('nameofschool', props.route.params.nameofschool)
    //  console.log('schoolidedit', props.route.params.schoolidedit)
    //  console.log('courseidedit', props.route.params.courseidedit)

    getCourseListData(props.route.params.school_id);
    //  getStepCountAPi()

    //  const school_id =  props.route.params.school_id ;getCourseListData(438)

    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);

  function handleBackButtonClick() {
    props.navigation.goBack();
    return true;
  }

  // useEffect(() => {
  //     getCourseListData(547)
  //     //getCity();

  //   }, []);
  // useEffect(() => {

  //     async function fetchMyAPI() {
  //         const school_id = await AsyncStorage.getItem('school_id')

  //         dataSet(school_id)
  //     }
  //  console.log('fetchMyAPI',fetchMyAPI())

  // }, []);

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
  };

  /***************************User User Add EI Data*******************************/

  const CourseAddeddfd = async () => {
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

    var myHeaders = new Headers();
    myHeaders.append('Authorization', ` Bearer ${token}`);
    myHeaders.append('Content-Type', 'application/json');

    var rawwww = JSON.stringify({
      admission_no: null,
      class_id: classidparm,
      comment: Des,
      course_end_year: '',
      course_id: courseidparm,
      course_start_year: '',
      current_standard_id: standardidparm,
      date_joining: date_copy,
      is_current_course: 1,
      join_standard_id: standardidparmleft,
      name_of_school: props.route.params.nameofschool,
      roll_no: RollNo,
      school_code: props.route.params.school_zatchup_id,
      school_id: props.route.params.school_id,
      standard_end_year: '',
      standard_start_year: '',
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: rawwww,
      //redirect: 'follow'
    };

    fetch(
      'http://172.105.61.231:3000/api/user/add-registered-ei-course/',
      requestOptions,
    )
      .then(response => response.text())
      .then(result =>
        console.log(
          'fdsdfasf43243214343fsdfsddffdsfsdfsdfsdf2----------------->',
          result,
        ),
      )
      .catch(error => console.log('error', error));
  };

  const CourseAdded = async () => {
    const courseError = Validate('coursekey', coursekey);
    const dobError = Validate('joiningdate', date_copy);
    const joiningstandardError = Validate(
      'joiningstandard',
      joiningstandardkey1,
    );
    const joiningcurrentError = Validate(
      'joiningcurrentkey',
      joiningstandardkey,
    );

    const classError = Validate('class', standardclasskey);

    // const schoolidError = Validate('schoolid', SchoolID);
    const rollnoError = Validate('rollno', RollNo);
    const desError = Validate('Des', Des);

    if (
      courseError ||
      dobError ||
      joiningstandardError ||
      joiningcurrentError ||
      classError ||
      //  schoolidError ||
      rollnoError ||
      desError
    ) {
      //this._scrollView.scrollTo(0);
      Toast.show(
        courseError ||
        dobError ||
        joiningstandardError ||
        joiningcurrentError ||
        classError ||
        // schoolidError ||
        rollnoError ||
        desError,
        Toast.SHORT,
      );

      return false;
    } else {

      setLoading(true);




      let rawdata = {

        class_id: classidparm,
        comment: Des,
        course_end_year: null,
        course_id: courseidparm,
        course_start_year: null,
        current_standard_id: standardidparm,
        date_joining: date_copy,
        is_current_course: 1,
        join_standard_id: standardidparmleft,
        name_of_school: props.route.params.nameofschool,
        roll_no: RollNo,
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

      console.log('token', token);

      let data_update = {
        token: token,
        data: rawdata,
      };


      dispatch(
        userActions.getAddRegisteredEiCourse({
          data_update,
          callback: ({ result, error }) => {
            if (result.status === true) {
              console.warn(
                'after Add Course result',
                JSON.stringify(result.status, undefined, 2),
                //submit(result.data)
                props.navigation.navigate('EIconfirmation', {
                  school_zatchup_id: props.route.params.school_zatchup_id,
                  nameofschool: props.route.params.nameofschool,
                  state: props.route.params.state,
                  city: props.route.params.city,
                  address: props.route.params.address,
                  board: props.route.params.board,
                  're_verify': props.route.params.re_verify,
                  'login': false
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
                'This Course is already added by this user Please select other course',
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

  const getdataStandardClassKey = async result => {
    var school = [];
    // var school = [{
    //   label: 'Others',
    //   value: 0,
    // }];
    result.results.map((element: any) => {
      let obj = {
        label: element.class_name,
        value: element.id,
      };
      school.push(obj);
      //  console.log('dsfsdfds', obj.university)
      //  if(obj.label != ''){
      //   setBoard(obj.university)

      //  }
    });
    //console.log('dsfsdfds',state)
    setStandardClass(school);

    // const city = result.results.map((element: any) => ({
    //   label: element.city,
    //   value: element.id,

    // }));
    //console.log('dsfsdfds',state)
  };

  const getdataStandardKey = async result => {
    var school = [];
    // var school = [{
    //   label: 'Others',
    //   value: 0,
    // }];
    result.results.map((element: any) => {
      let obj = {
        label: element.standard_name,
        value: element.id,
      };
      school.push(obj);
      //  console.log('dsfsdfds', obj.university)
      //  if(obj.label != ''){
      //   setBoard(obj.university)

      //  }
    });
    //console.log('dsfsdfds',state)
    setJoiningStandard(school);

    // const city = result.results.map((element: any) => ({
    //   label: element.city,
    //   value: element.id,

    // }));
    //console.log('dsfsdfds',state)
  };

  const getdataCourseKey = async result => {

    if (result.results.length > 0) {
      var city = [];

      result.results.map((element: any) => {

        if (element.view_for == 'STUDENT') {
          let obj = {
            label: element.course_name,
            value: element.id,
            description: element.description,
            start_date: element.start_date,
          };
          city.push(obj);
        }

      });

      setselectedCourse(city);

    }
    else {

      Toast.show('No course available', Toast.SHORT);


    }

    // const city = result.results.map((element: any) => ({
    //   label: element.city,
    //   value: element.id,

    // }));
    //console.log('dsfsdfds',state)
  };
  /***************************User getStandard Class *******************************/

  const getStandardClassData = async id => {
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
      userActions.getStandardClass({
        data,
        callback: ({ result, error }) => {
          if (result) {
            console.warn(
              'after result',
              JSON.stringify(result, undefined, 2),

              getdataStandardClassKey(result),

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

  /***************************User getStandard *******************************/

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
  /***************************User getCourseListData *******************************/

  const getCourseListData = async id => {
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
      userActions.getCourselist({
        data,
        callback: ({ result, error }) => {
          if (result) {
            console.warn(
              'after result',
              JSON.stringify(result, undefined, 2),

              getdataCourseKey(result),

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
  return (
    <SafeAreaView style={{ flex: 1 }}>

      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={'always'}
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <CustomStatusBar />

          {isLoading && renderIndicator()}


          <HeaderTitleWithBack
            navigation={props.navigation}
            headerTitle="Add Course Details"
          />
          {/*   <View style={styles.backbtnCss}><BackBtn navigation={this.props.navigation} /></View> */}

          <ScrollView>
            <View style={styles.inputContainer}>
              <View>
                {props.route.params.true != true ? <TouchableOpacity
                //onPress={() => props.navigation.navigate('CurrentSchoolinfo',{'re_verify':props.route.params.re_verify})}
                >
                  <View
                    style={{
                      marginBottom: 1,
                      alignItems: 'center',
                      flexDirection: 'row',
                      paddingHorizontal: 8,
                    }}>
                    <Text
                      style={{
                        marginTop: 2,
                        fontSize: 15,
                        marginLeft: 5,
                        flex: 1,
                        flexWrap: 'wrap',
                      }}>
                      {props.route.params.nameofschool +
                        '(' +
                        props.route.params.school_zatchup_id +
                        ')'}
                    </Text>
                    {/* <Image
                    style={{
                      width: 25,
                      height: 25,
                      resizeMode: 'contain',
                    }}
                    source={Images.edit_icon}
                  /> */}

                  </View>
                </TouchableOpacity> :
                  <View
                    style={{
                      marginBottom: 1,
                      alignItems: 'center',
                      flexDirection: 'row',
                      paddingHorizontal: 8,
                    }}>
                    <Text
                      style={{
                        marginTop: 2,
                        fontSize: 15,
                        marginLeft: 5,
                        flex: 1,
                        flexWrap: 'wrap',
                      }}>
                      {props.route.params.nameofschool +
                        '(' +
                        props.route.params.school_zatchup_id +
                        ')'}
                    </Text>


                  </View>
                }

                <View style={{}}>
                  <CustomDropdown
                    placeholder={'Select Course'}
                    data={selectedCourse}
                    value={coursekey}
                    //  selectedValue={coursekey}
                    SelectedLanguagedata={selectedValue => {
                      setDate_Copy('');
                      setSchoolID('');
                      setRollNo('');
                      setStandarClassdKey('');
                      // getSchool(selectedValue);
                      setCourseKey(selectedValue);
                      var data = [];
                      data = selectedCourse.filter(x => x.value == selectedValue);
                      // console.log('school index x',data)

                      if (data.length > 0) {
                        // console.log('course list data id',data[0].value)
                        getStandard(selectedValue);
                        setCourseIDParm(data[0].value);
                        setDes(data[0].description);
                        setminimumDate(data[0].start_date);
                        // console.log('date sdfsdfsd',data[0].start_date)
                      }

                      // if (selectedValue !== null) {
                      //     setCourseKey(selectedValue);

                      //     getStandard(selectedValue);

                      // }
                    }}
                  />
                </View>
                <TouchableOpacity
                  style={{ marginTop: '2%', marginLeft: 5, marginRight: 5 }}
                  onPress={showDatepicker}>
                  <View >
                    <TextField
                      // pointerEvents="none"
                      placeholder={'Course Joining Date'}
                      imageIcon={Images.calendar_icon}
                      editable={false}
                      underlineColorAndroid="transparent"
                      value={date_copy.toString()}
                    />
                  </View>
                </TouchableOpacity>

                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    // minDate={new Date()}
                    minDate={new Date(setminimudate)}

                  //  minimumDate={new Date(setminimudate)}
                    maximumDate={new Date()}
                    is24Hour={true}
                    format="YYYY-MMM-DD"
                    display="default"
                    onChange={Platform.OS === 'ios' ? onChangeiOS : onChange}

                  />
                )}

                <View style={{ marginTop: '1%' }}>
                  <CustomDropdown
                    placeholder={'Select Joining Standard'}
                    data={selectedJoiningStandard}
                    value={joiningstandardkey1}
                    //  selectedValue={coursekey}

                    SelectedLanguagedata={selectedValue => {
                      //  getSchool(selectedValue);
                      setJoiningStandardKey1(selectedValue);

                      var data = [];
                      data = selectedJoiningStandard.filter(
                        x => x.value == selectedValue,
                      );
                      // console.log('school index x',data)

                      if (data.length > 0) {
                        setStandardIDParmLeft(data[0].value);
                      }
                      // if (selectedValue !== null) {
                      //     setJoiningStandardKey(selectedValue);
                      //     getStandardClassData(selectedValue);
                      // }
                    }}
                  />
                </View>

                <View style={{ marginTop: '1%' }}>
                  <CustomDropdown
                    placeholder={'Select Current Standard'}
                    data={selectedJoiningStandard}
                    value={joiningstandardkey}
                    //  selectedValue={coursekey}
                    SelectedLanguagedata={selectedValue => {
                      //  getSchool(selectedValue);
                      setJoiningStandardKey(selectedValue);

                      var data = [];
                      data = selectedJoiningStandard.filter(
                        x => x.value == selectedValue,
                      );
                      // console.log('school index x',data)

                      if (data.length > 0) {
                        console.log('setStandardIDParm', data[0].value);
                        getStandardClassData(selectedValue);
                        setStandardIDParm(data[0].value);
                      }
                      // if (selectedValue !== null) {
                      //     setJoiningStandardKey(selectedValue);
                      //     getStandardClassData(selectedValue);
                      // }
                    }}
                  />
                </View>

                <View style={{ marginTop: '1%' }}>
                  <CustomDropdown
                    placeholder={'Select Class'}
                    data={selectedsetStandardClass}
                    value={standardclasskey}
                    SelectedLanguagedata={selectedValue => {
                      //  getSchool(selectedValue);
                      setStandarClassdKey(selectedValue);

                      var data = [];
                      data = selectedsetStandardClass.filter(
                        x => x.value == selectedValue,
                      );
                      // console.log('school index x',data)

                      if (data.length > 0) {
                        console.log('setClassIDParm', data[0].value);
                        setClassIDParm(data[0].value);
                      }
                      // if (selectedValue !== null) {
                      //     setStandarClassdKey(selectedValue);
                      //     // getStandardClass(selectedValue);
                      // }
                    }}
                  />
                </View>

                {/* <View style={{marginTop: '3%', marginLeft: 2, marginRight: 2}}>
                <TextField
                  placeholder={'Enter School ID'}
                  onChangeText={val => setSchoolID(val)}
                  value={SchoolID}
                />
              </View> */}

                <View style={{ marginTop: '3%', marginLeft: 2, marginRight: 2 }}>
                  <TextField
                    placeholder={'Enter Roll Number'}
                    keyboardType="numeric"
                    onChangeText={val => setRollNo(val)}
                    value={RollNo}
                  />
                </View>

                <View
                  style={{
                    marginTop: '3%',
                    marginLeft: 2,
                    marginRight: 2,
                    marginBottom: '3%',
                  }}>
                  <TextField
                    placeholder={'Enter Course Description'}
                    multiline={true}
                    onChangeText={val => setDes(val)}
                    editable={false}
                    value={Des}
                  />
                </View>
              </View>

              <View>
                <CustomButton title={'Submit'} onPress={() => CourseAdded()} />
              </View>
            </View>
          </ScrollView>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default EducationProfile;
