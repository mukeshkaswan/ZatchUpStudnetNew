import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Dimensions,
  ScrollView,
  BackHandler,

} from 'react-native';
import { RadioButton } from 'react-native-paper';

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
import { useDispatch, useSelector } from 'react-redux';
import * as userActions from '../../../actions/user-actions-types';
import Toast from 'react-native-simple-toast';
import ProgressLoader from 'rn-progress-loader';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  NavigationContainer,
  useIsFocused,
  useFocusEffect,
} from '@react-navigation/native';
interface AddCourseDetailsOthersScreenProps {
  navigation: any;
  route: any;
}

const AddCourseDetailsOthers = (props: AddCourseDetailsOthersScreenProps) => {
  const [selectedSchool, setselectedSchool] = useState('');
  const [Course, setCourse] = useState('');
  const [Des, setDes] = useState('');
  const [allSelected, setSelected] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [Course_Selected, setCourseTypeSelected] = useState('');
  const [min_date, setmin] = useState('2015-01-01');
  const isFocused = useIsFocused();

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
  const [date, setDate] = useState(new Date());
  const [date1, setDate1] = useState(new Date());

  const [date_copy, setDate_Copy] = useState('');
  const [date_copy1, setDate_Copy1] = useState('');

  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const [mode1, setMode1] = useState('date');
  const [show1, setShow1] = useState(false);
  const [value, setValue] = useState('');
  const [schoolid, setSchoolid] = useState('');


  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(Platform.OS === 'ios');
    if (event.type == 'set') {
      //ok button
      setDate(currentDate);
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
    setDate_Copy(MyDateString);
  };

  const onChange1 = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow1(Platform.OS === 'ios');

    if (event.type == 'set') {
      //ok button
      setDate1(currentDate);
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
    setDate_Copy1(MyDateString);
  };

  const showMode1 = currentMode => {
    setShow1(true);
    setMode1(currentMode);
  };
  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker1 = () => {
    showMode1('date');
  };
  const showDatepicker = () => {
    showMode('date');
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

    AddmissionNo();

    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, [isFocused]);

  function handleBackButtonClick() {
    props.navigation.goBack();
    return true;
  }

  const submit = async result => {

    if (props.route.params.confirmation === 'EIconfirmation') {
      props.navigation.navigate('EIconfirmation');
    }
    else {
      props.navigation.navigate('AddMoreCourseDetailsOthers', {
        school_id: props.route.params.school_id,
      });
    }
    setCourse(''),
      setDes(''),
      setDate_Copy(''),
      setDate_Copy1('')
  }


  const getDataforview = async result => {

    if (props.route.params.data == true) {
      setValue('Student');
      //setDate_Copy(props.route.params.start_date);
      setDate_Copy(result.data.course_start_year);

    } else {
      setValue('Alumni');
      // setDate_Copy1(props.route.params.end_date);
      // setDate_Copy(props.route.params.start_date);
      setDate_Copy1(result.data.course_end_year);
      setDate_Copy(result.data.course_start_year);
    }


    if (props.route.params.course_type == 'Regular') {
      setCourseTypeSelected('0');

    } else {
      setCourseTypeSelected('1');
    }

    // setCourse(props.route.params.course_name);
    // setDes(props.route.params.description);
    setSchoolid(props.route.params.school_id);
    setCourse(result.data.course_name);
    setDes(result.data.description);

  }



  const AddmissionNo = async () => {

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

    let data = {
      token: token,
      course_id: props.route.params.course_id,
      school_id: props.route.params.school_id,
    };

    dispatch(
      userActions.getGetAdmissionNumberDetailBySchool({
        data,
        callback: ({ result, error }) => {
          if (result) {
            console.warn(
              'Get Ad No....>',
              JSON.stringify(result, undefined, 2),

            );
            getDataforview(result)
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

  };


  const CourseAdded = async () => {
    var dobErrorend: any
    const coursenameError = Validate('coursename', Course);
    const courseError = Validate('coursekey_', Course_Selected);
    const dobError = Validate('startdate', date_copy);
    if (value == 'Alumni') {
      dobErrorend = Validate('enddate', date_copy1);
    }
    const desError = Validate('Des', Des);

    if (coursenameError || courseError || dobError || dobErrorend || desError) {
      //this._scrollView.scrollTo(0);
      Toast.show(
        coursenameError || courseError || dobError || dobErrorend || desError,
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
        admission_no: null,
        class_id: null,
        course_name: Course,
        course_type: key,
        description: Des,
        end_date: "2022-01-06",
        name_of_school: props.route.params.nameofschool,
        school_code: null,
        school_id: schoolid,
        start_date: date_copy,
        is_current: value == 'Student' ? true : false,
        is_already_register: "false",
        opening_date: "",
        course_end_year: "2022-01-06",
        course_id: props.route.params.course_id,
        course_in_school: false,
        course_start_year: date_copy,
        current_standard_id: null,
        date_joining: date_copy,
        join_standard_id: null,
        join_start_year: null,
        left_standard_id: null,
        roll_no: null,
        school_onboarded: false

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
                'after Add Course Edit result',
                JSON.stringify(result.status, undefined, 2),



              );
              submit(result);
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
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps={'always'}
      style={{ flex: 1 }}
      showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <CustomStatusBar />
        {isLoading && renderIndicator()}

        {/* <CustomHeader Title={'Update Course Details'} /> */}

        <HeaderTitleWithBack
          navigation={props.navigation}
          headerTitle="Update Course Details"
        />

        <ScrollView>
          <View style={styles.inputContainer}>
            <TouchableOpacity
            // onPress={() => props.navigation.navigate('CurrentSchoolinfo')}
            >
              <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                {/* <Image
                  style={{
                    marginLeft: 10,
                    width: 25,
                    height: 25,
                    resizeMode: 'contain',
                  }}
                  source={Images.edit_icon}
                /> */}
                <Text style={{ marginTop: 2, fontSize: 14, marginLeft: 10 }}>
                  {props.route.params.nameofschool}
                </Text>
              </View>
            </TouchableOpacity>

            <View style={{ marginTop: '1%', marginLeft: 2, marginRight: 2 }}>
              <TextField
                placeholder={'Enter Course Name'}
                onChangeText={val => setCourse(val)}
                value={Course}
              />
            </View>

            <View style={{ marginTop: '2%' }}>
              <CustomDropdown
                placeholder={'Select Type'}
                data={CourseTypeOther}
                // selectedValue={Course_Selected}
                value={Course_Selected}
                SelectedLanguagedata={(selectedValue: any) => {
                  setCourseTypeSelected(selectedValue);
                  // setID('')
                }}
              />
              {/* <CustomDropdown label1="Course Type" value1="0" label2="Regular" value2="1" label3="Distance" value3="2" selectedValue={selectedSchool} SelectedLanguagedata={(selectedValue) => setselectedSchool(selectedValue)} /> */}
            </View>



            <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
              <View style={{ flexDirection: 'row', marginTop: 20 }}>

                <View style={{ flexDirection: 'row', marginLeft: 10, alignItems: 'center' }}>
                  <Text style={{ fontSize: 16 }}>Student</Text>
                  <RadioButton value="Student" />
                </View>
                <View style={{ flexDirection: 'row', marginLeft: 20, alignItems: 'center' }}>
                  <Text style={{ fontSize: 16 }}>Alumni</Text>
                  <RadioButton value="Alumni" />
                </View>
              </View>

            </RadioButton.Group>
            {/* <RadioGroup
    size={24}
    thickness={2}
    color='#0A0A0A'
    selectedIndex={0}
    style={{ marginRight: '80%', marginBottom: 10 }}
   // onSelect = {(index, value) => this.onSelect(index, value)}
    >

    <RadioButton value={'cash'} >
      <Text style ={{ width: '100%' }}>COD</Text>
    </RadioButton>

    <RadioButton value={'online'}>
      <Text style ={{ width: '100%' }}>Online</Text>
    </RadioButton>

  </RadioGroup> */}

            <View style={{ marginTop: '5%' }}>
              <TouchableOpacity onPress={showDatepicker}>
                <View style={{}}>
                  <TextField
                    placeholder={'Course Up from'}
                    imageIcon={Images.calendar_icon}
                    value={date_copy.toString()}
                    editable={false}
                  />
                </View>
              </TouchableOpacity>
            </View>
            {value === 'Alumni' ? <TouchableOpacity onPress={showDatepicker1}>
              <View style={{ marginTop: '5%' }}>
                <TextField
                  placeholder={'Course Up to'}
                  imageIcon={Images.calendar_icon}
                  value={date_copy1.toString()}
                  editable={false}
                />
              </View>
            </TouchableOpacity> : <Text style={{ marginTop: 20, fontSize: 16, marginLeft: 10 }}>
              {'To Current'}
            </Text>}

            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                minimum={new Date()}
                maximumDate={new Date()}
                is24Hour={true}
                format="YYYY-MMM-DD"
                display="default"
                onChange={onChange}
              />
            )}

            {show1 && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date1}
                mode={mode1}
                minimumDate={new Date(date)}
                maximumDate={new Date()}
                is24Hour={true}
                format="YYYY-MMM-DD"
                display="default"
                onChange={onChange1}

              />
            )}

            <View
              style={{
                marginTop: '5%',
                marginLeft: 2,
                marginRight: 2,
                marginBottom: '5%',
              }}>
              <TextField
                placeholder={'Add Description of Study...'}
                multiline={true}
                onChangeText={val => setDes(val)}
                value={Des}
              />
            </View>

            <View>
              <CustomButton
                title={'Add'}
                onPress={() => CourseAdded()}
              //  onPress={() => props.navigation.navigate('AddMoreCourseDetailsOthers')}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default AddCourseDetailsOthers;
