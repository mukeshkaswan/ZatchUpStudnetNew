import React, { Component, FC, useState, useEffect } from 'react';
import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Switch,
  Platform,
  Alert,
  BackHandler,
  Text,
  SafeAreaView
} from 'react-native';
import { Images } from '../../../components/index';
import DateTimePicker from '@react-native-community/datetimepicker';
import { CheckBox } from 'react-native-elements';
import {
  TextField,
  CustomButton,
  CustomStatusBar,
  Validate,
  CustomHeader,
  BackBtn,
  HeaderTitleWithBack,
  CustomDropdown,
} from '../../../components';
import { useDispatch, useSelector } from 'react-redux';
import ProgressLoader from 'rn-progress-loader';
import {
  NavigationContainer,
  useIsFocused,
  useFocusEffect,
} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styles from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as userActions from '../../../actions/user-actions-types';
import Toast from 'react-native-simple-toast';

interface WorkDetailsProps {
  navigation: any;
}

const WorkDetailsScreen = (props: WorkDetailsProps) => {
  const [email, setEmail] = useState('');
  const [companyname, setCompanyname] = useState('');
  const [des, setDess] = useState('');
  const [workprofile, setWorkProfile] = useState('');

  const [jobtitle, setJobTitle] = useState('');
  const [allSelected, setSelected] = useState(true);
  const [KYC_type_doc_Selected, setKYCSelected] = useState('');
  const [flag, setFlag] = useState('emp_status');
  const [other, setother] = useState('other_status');
  const [othervalue, setothervalue] = useState('');

  const [selectedState, setSelectedState] = useState([]);
  const [selectedCity, setselectedCity] = useState([]);
  const [setminimudate, setminimumDate] = useState('2015-01-01');

  const [statedatkey, setStateKey] = useState('');
  const [countrydatkey, setCountryKey] = useState('');
  const [workdatkey, setWorkKey] = useState('');

  const [citydatkey, setCityKey] = useState('');

  const [isLoading, setLoading] = useState(true);
  const isFocused = useIsFocused();


  const [date1, setDate1] = useState(new Date());
  const [date2, setDate2] = useState(new Date());

  const [startDate1, setDate_Course1] = useState('');

  const [startDate2, setDate_Course2] = useState('');

  const [mode1, setMode1] = useState('date');
  const [show1, setShow1] = useState(false);

  const [mode2, setMode2] = useState('date');
  const [show2, setShow2] = useState(false);


  const dispatch = useDispatch();


  const [KYC_type_doc, setKYC_type_doc] = useState([
    {
      label: 'Employed ',
      value: '0',
    },
    {
      label: 'Self Employed',
      value: '1',
    },
  ]);
  const [workdropdown, setWorkdropdown] = useState([]);
  const [countrydropdown, setCountry] = useState([]);


  const gototChangeEmplyType = value => {
    if (value == 0) {
      setFlag('emp');
    } else if (value == 1) {
      setFlag('selfEmp');
    } else {
      setFlag('emp_status');
    }
  };
  const gototfieldType = value => {
    console.log('value', value);
    if (value == 13) {
      setother('other');
      setothervalue('13');
    } else {
      setother('other_status');
      setothervalue('');
    }
  };

  const checkedterm = () => {
    setSelected(!allSelected);
  };

  const onChange1 = (event, selectedDate) => {


    const currentDate = selectedDate || date;

    setShow1(Platform.OS === 'ios');
    if (event.type == 'set') {
      //ok button
      setDate1(currentDate);
      // setShow1(Platform.OS !== 'ios'); // to show time

    } else {
      return false;
      //setShow1(Platform.OS === 'ios'); // to hide back the picker
      //setMode1('date'); // defaulting to date for next open
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


    const currentDate = selectedDate || date;

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

    const currentDate = selectedDate || date;

    setShow2(Platform.OS === 'ios');
    if (event.type == 'set') {
      //ok button
      setDate2(currentDate);
      //setShow2(Platform.OS !== 'ios'); // to show time

    } else {
      return false;
      //setShow2(Platform.OS === 'ios'); // to hide back the picker
      //setMode2('date'); // defaulting to date for next open
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
    const currentDate = selectedDate || date;
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


  const showMode1 = currentMode => {
    setShow1(true);
    setMode1(currentMode);
  };

  const showMode2 = currentMode => {
    setShow2(true);
    setMode2(currentMode);
  };


  const showDatepicker1 = () => {
    showMode1('date');
  };

  const showDatepicker2 = () => {
    showMode2('date');
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

    WorkDepartments();

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



  const getdata = async result => {

    var other: any = [];

    result.results.map((element: any) => {
      let obj = {
        label: element.name,
        value: element.id,

      };
      other.push(obj);
    });

    //console.log('dsfsdfds',state)
    setWorkdropdown(other);
  };


  const getdataCountry = async result => {

    var country: any = [];

    result.data.map((element: any) => {
      let obj = {
        label: element.name,
        value: element.id,

      };
      country.push(obj);
    });

    //console.log('dsfsdfds',state)
    setCountry(country);
  };




  const getdataState = async result => {
    var state: any = [];

    result.data.map((element: any) => {
      let obj = {
        label: element.state,
        value: element.id,
      };
      state.push(obj);
    });

    setSelectedState(state);
    // const city = result.results.map((element: any) => ({
    //   label: element.city,
    //   value: element.id,
    // }));
    //console.log('dsfsdfds',state)
  };



  const getdataCity = async result => {
    var city: any = [];

    result.data.map((element: any) => {
      let obj = {
        label: element.city,
        value: element.id,
      };
      city.push(obj);
    });

    setselectedCity(city);
    // const city = result.results.map((element: any) => ({
    //   label: element.city,
    //   value: element.id,
    // }));
    //console.log('dsfsdfds',state)
  };


  /***************************User GET Work Departments*******************************/

  const WorkDepartments = async () => {

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
    setLoading(true);

    dispatch(
      userActions.getAllWorkDepartments({
        data,
        callback: ({ result, error }) => {
          if (result) {
            console.warn(
              'after Work Departments Api Data result',
              JSON.stringify(result, undefined, 2),

              // getdataStateKey(result),
            );

            getdata(result);
            Country();

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



  /***************************User GET Country*******************************/

  const Country = async () => {

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
    setLoading(true);

    dispatch(
      userActions.getCountry({
        data,
        callback: ({ result, error }) => {
          if (result) {
            console.warn(
              'after Country Api Data result',
              JSON.stringify(result, undefined, 2),

            );

            getdataCountry(result);

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


  /***************************User GET State*******************************/

  const getState = async id => {
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
      userActions.getUserGetState({
        data,
        callback: ({ result, error }) => {
          if (result) {
            console.warn(
              'after result',
              JSON.stringify(result, undefined, 2),

              getdataState(result),



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



  /***************************User GET City*******************************/

  const getCity = async id => {
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
      userActions.getUserGetCity({
        data,
        callback: ({ result, error }) => {
          if (result) {
            console.warn(
              'after result',
              JSON.stringify(result, undefined, 2),

              getdataCity(result),


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



  /***************************User User Add Work Details Data*******************************/

  const onPressSubmit = async () => {

    var otherworkError = '';

    var des_Error = '';

    var desError = '';

    var startdateError = '';

    var endateError = '';


    const StatusError = Validate('Status', KYC_type_doc_Selected);
    const DepartmentError = Validate('Department', workdatkey);
    const companynameError = Validate('companyname', companyname);
    const jobtitleError = Validate('jobtitle', jobtitle);

    const countryError = Validate('countrydatkey', countrydatkey);
    const stateError = Validate('statedatkey', statedatkey);
    const cityError = Validate('citydatkey', citydatkey);




    if (othervalue == '13') {
      otherworkError = Validate('otherworkdepartment', workprofile);
      des_Error = Validate('des_', des);

    } else {
      desError = Validate('des', des);

    }


    if (allSelected == true) {
      startdateError = Validate('startdate', startDate1);
    } else {

      startdateError = Validate('startdate', startDate1);
      endateError = Validate('enddate', startDate2);

    }

    if (
      StatusError ||
      DepartmentError ||
      otherworkError ||
      companynameError ||
      jobtitleError ||
      countryError ||
      stateError ||
      cityError ||
      desError ||
      des_Error ||
      startdateError ||
      endateError
    ) {
      //this._scrollView.scrollTo(0);
      Toast.show(
        StatusError ||
        DepartmentError ||
        otherworkError ||
        companynameError ||
        jobtitleError ||
        countryError ||
        stateError ||
        cityError ||
        desError ||
        des_Error ||
        startdateError ||
        endateError,
        Toast.SHORT,
      );

      return false;
    } else {
      var key =
        KYC_type_doc_Selected == 0
          ? 'Employed'
          : KYC_type_doc_Selected == 1
            ? 'Self Employed'
            : null;


      var countryKey = [];
      countryKey = countrydropdown.filter(x => x.value == countrydatkey);

      var stateKey = [];
      stateKey = selectedState.filter(x => x.value == statedatkey);

      var cityKey = [];
      cityKey = selectedCity.filter(x => x.value == citydatkey);

      var workKey = [];
      workKey = workdropdown.filter(x => x.value == workdatkey);


      // console.log('sdfsd', schoolKey[0].label);
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

      if (allSelected) {
        var raw = JSON.stringify({
          company_name: companyname,
          end_year: 0,
          is_currently_work: allSelected == true ? true : false,
          job_title: jobtitle,
          start_date: startDate1,
          work_city: cityKey[0].label,
          work_country: countryKey[0].label,
          work_department: workKey[0].label,
          work_description: des,
          work_state: stateKey[0].label,
          work_type: key,
        });
      }
      else {
        var raw = JSON.stringify({
          company_name: companyname,
          end_year: 0,
          is_currently_work: allSelected == true ? true : false,
          job_title: jobtitle,
          start_date: startDate1,
          work_city: cityKey[0].label,
          work_country: countryKey[0].label,
          work_department: workKey[0].label,
          work_description: des,
          work_state: stateKey[0].label,
          work_type: key,
          end_date: startDate2
        });
      }





      const data_update = {
        token: token,
        data: raw,
      };

      setLoading(true);

      dispatch(
        userActions.getUserWorkDetail({
          data_update,
          callback: ({ result, error }) => {
            if (result.status === true) {
              console.warn(
                'after Add Work Details result',
                JSON.stringify(result.status, undefined, 2),
                // submit(result.data),
                // props.navigation.navigate('OtpLogin', { 'firebase_id': result.firebase_username, 'username': email })
              );
              Toast.show('Successfully Work Added', Toast.SHORT);
              props.navigation.navigate('Home');

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


  return (
    <SafeAreaView style={{ flex: 1 }}>

      <View style={styles.container}>
        {isLoading && renderIndicator()}

        <HeaderTitleWithBack
          navigation={props.navigation}
          headerTitle="Add Profession"
        />
        <ScrollView>
          <View style={{ paddingHorizontal: 16 }}>
            <View style={{}}>
              {/* <Text style={styles.fillText_Add}>Employment Type</Text> */}
              <CustomDropdown
                placeholder={'Employment Status'}
                data={KYC_type_doc}
                value={KYC_type_doc_Selected}
                SelectedLanguagedata={(selectedValue: any) => {
                  setKYCSelected(selectedValue);
                  gototChangeEmplyType(selectedValue)

                }}
              />
            </View>
            <View style={{}}>
              {/* <Text style={styles.fillText_Add}>Employment Profile</Text> */}
              <CustomDropdown
                placeholder={'Select your Profession'}
                data={workdropdown}
                // selectedValue={workdropdown}
                value={workdatkey}
                SelectedLanguagedata={selectedValue => {

                  setWorkKey(selectedValue);

                  if (selectedValue !== null) {
                    setWorkKey(selectedValue);
                    gototfieldType(selectedValue);
                  }
                }}
              />
            </View>
            {other == 'other' && (
              <View style={{ marginTop: 8, marginHorizontal: 4 }}>
                <TextField
                  placeholder={'Enter Work Profile'}
                  onChangeText={val => setWorkProfile(val)}
                  value={workprofile}
                />
              </View>
            )}
            {flag != 'emp_status' && (
              <View>
                <Text style={styles.headingtext}>
                  {flag == 'emp' ? 'Work' : 'Work Place'}
                </Text>
                <View style={{ marginTop: 8, marginHorizontal: 4 }}>
                  {/* <Text style={styles.fillText_Add}>Company</Text> */}

                  <TextField
                    placeholder={'Enter Company Name'}
                    onChangeText={val => setCompanyname(val)}
                    //  keyboardType={'email-address'}
                    value={companyname}
                  />
                </View>
                <View style={{ marginTop: 8, marginHorizontal: 4 }}>
                  {/* <Text style={styles.fillText_Add}>Job Title</Text> */}
                  <View style={{ marginTop: 5 }}>
                    <TextField
                      placeholder={'What is your job title?'}
                      onChangeText={val => setJobTitle(val)}
                      //  keyboardType={'email-address'}
                      value={jobtitle}
                    />
                  </View>
                </View>
                <View style={{ marginTop: 5 }}>
                  {/* <Text style={styles.fillText_Add}>Location</Text> */}

                  <CustomDropdown
                    placeholder={'Select Country'}
                    data={countrydropdown}
                    value={countrydatkey}
                    // selectedValue={selectedSchool}
                    SelectedLanguagedata={selectedValue => {
                      // getCity(selectedValue);
                      // console.log('selectedValue state test', selectedValue)
                      //  setSelectedState
                      setCountryKey(selectedValue);

                      if (selectedValue !== null) {
                        setCountryKey(selectedValue);
                        getState(selectedValue);
                      }
                    }}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <View style={styles.picker}>
                    <CustomDropdown
                      placeholder={'Select State'}
                      data={selectedState}
                      //selectedValue={statedatkey}
                      value={statedatkey}
                      // selectedValue={selectedSchool}
                      SelectedLanguagedata={selectedValue => {
                        // getCity(selectedValue);
                        // console.log('selectedValue state test', selectedValue)
                        //  setSelectedState
                        setStateKey(selectedValue);

                        if (selectedValue !== null) {
                          setStateKey(selectedValue);
                          getCity(selectedValue);
                        }
                      }}
                    />
                  </View>
                  <View style={styles.picker}>
                    <CustomDropdown
                      placeholder={'Select City'}
                      data={selectedCity}
                      //   selectedValue={citydatkey}
                      value={citydatkey}
                      //selectedValue={selectedSchool}
                      SelectedLanguagedata={selectedValue => {
                        //  getSchool(selectedValue);

                        if (selectedValue !== null) {
                          setCityKey(selectedValue);
                          // getSchool(selectedValue);
                        }
                      }}
                    />
                  </View>
                </View>
                <Text style={styles.headingtext}>
                  {flag == 'emp' ? 'Description' : 'Work Bio'}
                </Text>
                <View style={{ marginTop: 5, marginBottom: 10 }}>
                  <TextField
                    placeholder={
                      flag == 'emp'
                        ? 'Write Description Here...'
                        : 'Write Work Bio Here...'
                    }
                    multiline={true}
                    onChangeText={val => setDess(val)}
                    value={des}

                  />
                </View>
                <Text style={styles.headingtext}>Time Period</Text>
                <View style={{ marginTop: 10 }}>
                  <CheckBox
                    title={
                      <Text style={styles.agreetext}>
                        I am currently working in this role
                      </Text>
                    }
                    checkedIcon={
                      <Image
                        source={Images.checkbox_select}
                        style={styles.checkbox}
                      />
                    }
                    uncheckedIcon={
                      <Image
                        source={Images.checkbox_unselect}
                        style={styles.checkbox}
                      />
                    }
                    checked={allSelected}
                    containerStyle={{
                      padding: 0,
                      margin: 0,
                      backgroundColor: 'transparent',
                      borderColor: 'transparent',
                    }}
                    onPress={checkedterm}
                  // onPress={() => setCount(count + 1)}
                  />
                </View>
                <TouchableOpacity onPress={showDatepicker1}>
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
                      value={startDate1.toString()}
                    />
                  </View>
                </TouchableOpacity>

                {show1 && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date1}
                    mode={mode1}
                    minDate={new Date()}
                    //minimumDate={new Date()}
                    maximumDate={new Date()}
                    is24Hour={true}
                    format="YYYY-MMM-DD"
                    display="default"
                    onChange={Platform.OS === 'ios' ? onChange1iOS : onChange1}

                  />
                )}
                {allSelected == true ? (
                  <View></View>
                ) : (
                  <View>
                    <TouchableOpacity onPress={showDatepicker2}>
                      <View
                        style={{
                          marginTop: '3%',
                          marginLeft: 2,
                          marginRight: 2,
                        }}>
                        <TextField
                          placeholder={'End Date'}
                          imageIcon={Images.calendar_icon}
                          editable={false}
                          value={startDate2.toString()}
                        />
                      </View>
                    </TouchableOpacity>

                    {show2 && (
                      <DateTimePicker
                        testID="dateTimePicker"
                        value={date2}
                        mode={mode2}
                        //   minDate={new Date()}
                        minimumDate={new Date(date1)}
                        maximumDate={new Date()}
                        is24Hour={true}
                        format="YYYY-MMM-DD"
                        display="default"
                        onChange={Platform.OS === 'ios' ? onChange2iOS : onChange2}

                      />
                    )}
                  </View>
                )}
              </View>
            )}
            <View style={{ marginTop: 10, marginBottom: 10 }}>
              <CustomButton
                title={'Submit'}
                onPress={() => onPressSubmit()}
              //onPress={() => props.navigation.navigate('Home')}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
export default WorkDetailsScreen;