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

import {
  NavigationContainer,
  useIsFocused,
  useFocusEffect,
} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styles from './style.tsx';

interface WorkDetailsProps {
  navigation: any;
}

const WorkDetailsScreen = (props: WorkDetailsProps) => {
  const [email, setEmail] = useState('');
  const [allSelected, setSelected] = useState(true);
  const [KYC_type_doc_Selected, setKYCSelected] = useState('');
  const [flag, setFlag] = useState('emp_status');
  const [other, setother] = useState('other_status');
  const [selectedState, setSelectedState] = useState([]);
  const [selectedCity, setselectedCity] = useState([]);
  const [setminimudate, setminimumDate] = useState('2015-01-01');

  const [statedatkey, setStateKey] = useState('');
  const [citydatkey, setCityKey] = useState('');

  const [isLoading, setLoading] = useState(true);
  const isFocused = useIsFocused();
  const [date1, setDate1] = useState(new Date());

  const [startDate1, setDate_Course1] = useState('');

  const [mode1, setMode1] = useState('date');
  const [show1, setShow1] = useState(false);

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
  const [dropdown, setdropdown] = useState([
    {
      label: 'Doctor',
      value: '0',
    },
    {
      label: 'Architech',
      value: '1',
    },
    {
      label: 'Scientist',
      value: '2',
    },
    {
      label: 'Chartered Accountant',
      value: '3',
    },
    {
      label: 'Actor/Entertainment Professional',
      value: '4',
    },
    {
      label: 'Journalist',
      value: '5',
    },
    {
      label: 'Chartered Finanacial Analyst',
      value: '6',
    },
    {
      label: 'IT Professional',
      value: '7',
    },
    {
      label: 'Lawyer',
      value: '8',
    },
    {
      label: 'Other',
      value: '9',
    },
  ]);

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
    if (value == 9) {
      setother('other');
    } else {
      setother('other_status');
    }
  };

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
      //cancel Button
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
  const showMode1 = currentMode => {
    setShow1(true);
    setMode1(currentMode);
  };
  const showDatepicker1 = () => {
    showMode1('date');
  };
  const dispatch = useDispatch();

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
    setStateKey('');

    setCityKey('');

    getState();
    // getStepCountAPi();

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

  /***************************User User Add EI Data*******************************/

  const getdataStateKey = async result => {
    var state = [];
    result.results.map((element: any) => {
      let obj = {
        label: element.state,
        value: element.id,
      };

      state.push(obj);
    });
    setSelectedState(state);
    //console.log('dsfsdfds',state)
  };

  const getdataCityKey = async result => {
    var city = [];

    result.results.map((element: any) => {
      let obj = {
        label: element.city,
        value: element.id,
      };
      city.push(obj);
    });

    setselectedCity(city);
  };

  const getdataSchoolKey = async result => {
    //  var school = [];
    var school = [
      {
        label: 'Others',
        value: 0,
      },
    ];

    result.results.map((element: any) => {
      let obj = {
        label: element.name_of_school,
        value: element.id,
        university: element.university,
        address1: element.address1,
        school_code: element.school_code,
        address2: element.address2,
      };
      school.unshift(obj);
    });

    //console.log('dsfsdfds',state)
    setselectedSchool(school);
  };
  /***************************User GET School*******************************/

  const getSchool = async id => {
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
      userActions.getSchool({
        data,
        callback: ({ result, error }) => {
          if (result) {
            console.warn(
              'after result',
              JSON.stringify(result, undefined, 2),

              getdataSchoolKey(result),
            );
            // setSpinnerStart(false);
            setLoading(false);
          }
          if (!error) {
            console.warn(JSON.stringify(error, undefined, 2));
            // setLoginSuccess(result);
            setLoading(false);
          } else {
            setLoading(false);
            console.warn(JSON.stringify(error, undefined, 2));
          }
        },
      }),
    );
  };

  /***************************User GET School*******************************/

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
      userActions.getCity({
        data,
        callback: ({ result, error }) => {
          if (result) {
            console.warn(
              'after result',
              JSON.stringify(result, undefined, 2),

              getdataCityKey(result),
            );
            // setSpinnerStart(false);
            setLoading(false);
          }
          if (!error) {
            console.warn(JSON.stringify(error, undefined, 2));
            // setLoginSuccess(result);
            setLoading(false);
          } else {
            setLoading(false);
            console.warn(JSON.stringify(error, undefined, 2));
          }
        },
      }),
    );
  };

  /***************************User GET City*******************************/

  /***************************User GET States*******************************/

  const getState = async () => {
    // var key = email.indexOf("@") != -1 ? 'email' : 'email'

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
      userActions.getStates({
        data,
        callback: ({ result, error }) => {
          if (result) {
            console.warn(
              'after State Api Data result',
              JSON.stringify(result, undefined, 2),

              getdataStateKey(result),
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

  return (
    <View style={styles.container}>
      <HeaderTitleWithBack
        navigation={props.navigation}
        headerTitle="Enter Your Work Details"
      />
      <ScrollView>
        <View style={{ paddingHorizontal: 16 }}>
          <View style={{}}>
            {/* <Text style={styles.fillText_Add}>Employment Type</Text> */}
            <CustomDropdown
              placeholder={'Employment Status'}
              data={KYC_type_doc}
              selectedValue={KYC_type_doc_Selected}
              SelectedLanguagedata={(selectedValue: any) =>
                gototChangeEmplyType(selectedValue)
              }
            />
          </View>
          <View style={{}}>
            {/* <Text style={styles.fillText_Add}>Employment Profile</Text> */}
            <CustomDropdown
              placeholder={'Select Your Job Title'}
              data={dropdown}
              selectedValue={setdropdown}
              SelectedLanguagedata={(selectedValue: any) =>
                gototfieldType(selectedValue)
              }
            />
          </View>
          {other == 'other' && (
            <View style={{ marginTop: 8, marginHorizontal: 4 }}>
              <TextField
                placeholder={'Enter Work Profile'}

              //onChangeText={val => setDess(val)} value={Dess}
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
                  onChangeText={val => setEmail(val)}
                  keyboardType={'email-address'}
                  value={email}
                />
              </View>
              <View style={{ marginTop: 8, marginHorizontal: 4 }}>
                {/* <Text style={styles.fillText_Add}>Job Title</Text> */}
                <View style={{ marginTop: 5 }}>
                  <TextField
                    placeholder={'What is your job title?'}
                    onChangeText={val => setEmail(val)}
                    keyboardType={'email-address'}
                    value={email}
                  />
                </View>
              </View>
              <View style={{ marginTop: 5 }}>
                {/* <Text style={styles.fillText_Add}>Location</Text> */}

                <CustomDropdown
                  placeholder={'Select Country'}
                  data={KYC_type_doc}
                  selectedValue={KYC_type_doc_Selected}
                  SelectedLanguagedata={(selectedValue: any) => { }}
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
                    selectedValue={citydatkey}
                    value={citydatkey}
                    //selectedValue={selectedSchool}
                    SelectedLanguagedata={selectedValue => {
                      //  getSchool(selectedValue);

                      if (selectedValue !== null) {
                        setCityKey(selectedValue);
                        getSchool(selectedValue);
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
                //onChangeText={val => setDess(val)} value={Dess}
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
                  //   minDate={new Date()}
                  minimumDate={new Date(setminimudate)}
                  maximumDate={new Date()}
                  is24Hour={true}
                  format="YYYY-MMM-DD"
                  display="default"
                  onChange={onChange1}
                />
              )}
              {allSelected == true ? (
                <View></View>
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
                        placeholder={'End Date'}
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
                      //   minDate={new Date()}
                      minimumDate={new Date(setminimudate)}
                      maximumDate={new Date()}
                      is24Hour={true}
                      format="YYYY-MMM-DD"
                      display="default"
                      onChange={onChange1}
                    />
                  )}
                </View>
              )}
            </View>
          )}
          <View style={{ marginTop: 10, marginBottom: 10 }}>
            <CustomButton
              title={'Submit'}

            //onPress={() => props.navigation.navigate('Home')}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default WorkDetailsScreen;