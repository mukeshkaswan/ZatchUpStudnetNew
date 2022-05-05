//import liraries
import React, { Component, FC, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, BackHandler, SafeAreaView } from 'react-native';
import styles from './style';
import { Picker } from '@react-native-picker/picker';
//import {CustomDropdown,Customtextinput2,Customheader} from '../../../components/textinput';
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
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { sub } from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import * as userActions from '../../../actions/user-actions-types';
import Toast from 'react-native-simple-toast';
import ProgressLoader from 'rn-progress-loader';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  NavigationContainer,
  useIsFocused,
  useFocusEffect,
} from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

interface CurrentSchoolinfoScreenProps {
  navigation: any;
  route: any;
}

interface StatusBarProps {
  //selectedSchool?: string;
}

const CurrentSchoolinfo = (props: CurrentSchoolinfoScreenProps, StatusBarProps: StatusBarProps) => {

  const [selectedState, setSelectedState] = useState([]);
  const [selectedCity, setselectedCity] = useState([]);
  const [selectedSchool, setselectedSchool] = useState([]);
  const [selectedBoard, setselectedBoard] = useState('');
  const [valuestate, setstatevalue] = useState('');
  const [opening_date, setopening_date] = useState('');
  const [is_onboarded, setis_onboarded] = useState('');
  const [address, setaddress] = useState('');
  const [addresssingle, setaddresssingle] = useState('');
  const [address_, setaddress2] = useState('');
  const [schoolname, setSchoolname] = useState('');
  const [ID, setID] = useState(''); //KERALA001630
  const [Board, setBoard] = useState('');
  const [statedatkey, setStateKey] = useState('');
  const [citydatkey, setCityKey] = useState('');
  const [schooldatkey, setSchoolKey] = useState('');
  const [isLoading, setLoading] = useState(false);
  const isFocused = useIsFocused();

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


    getState();
    getAuthUserInfoApi();

    // if (props.route.params.KYCEiRequestSingle == true) {
    //   Changestatus();

    // }

    Changestatus();

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





  const Data = async result => {
    console.log('result.data.address1', result.data.address1)
    var dsfdsf = result.data.state_id;

    setStateKey(result.data.state_id.toString());
    setCityKey(result.data.city_id.toString());
    setSchoolKey(result.data.school_id);
    setaddress(result.data.address1 + ' ' + result.data.address2);
    setBoard(result.data.university);
  };



  const Changestatus = async () => {

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
      school_id: props.route.params.schoolid,
    };


    // setLoading(true);

    dispatch(
      userActions.getSchooldetailschoolid({
        data,
        callback: ({ result, error }) => {
          if (result.status === true) {
            setLoading(false);

            console.warn(
              'after get School detail school id by user..',
              JSON.stringify(result, undefined, 2),
            );


            setStateKey(result.data.state_id.toString());
            setCityKey(result.data.city_id.toString());
            setSchoolKey(props.route.params.schoolid);
            setaddress(result.data.address1 + ' ' + result.data.address2 + ' ' + result.data.pincode);
            setBoard(result.data.university);
            setID(result.data.school_code);
          }

          else if (result.status === false) {

            //Toast.show('User is verified as student', Toast.SHORT);

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


  /***************************User Auth User Info*******************************/

  const getDetailZatchupID = async () => {
    if (ID !== '' || null || undefined) {
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
        zatchup_id: ID,
      };

      setLoading(true);

      dispatch(
        userActions.getSchoolZatchUpId({
          data,
          callback: ({ result, error }) => {
            if (result.status) {
              console.warn(
                'after result Zatch Up ID',
                JSON.stringify(result, undefined, 2),
                Data(result),
                // console.log('result.data.state_id',result.data.state_id),
                // setStateKey(result.data.state_id),
                //  setCityKey(result.data.city_id),
                //  setSchoolKey(result.data.city_id),

                //  props.navigation.navigate('OtpLogin', { 'firebase_id': result.firebase_username, 'username': email })
              );
              // setSpinnerStart(false);
              setLoading(false);
            }
            if (result.status === false) {
              console.warn(JSON.stringify(error, undefined, 2));
              Toast.show(result.error.message[0], Toast.SHORT);

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
            console.warn(
              'after result Auth User INfo',
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
  /***************************User get Step Count APi *******************************/

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

  const onPressSubmit = async () => {
    var schoolError = '';
    var schoolnameError = '';
    var BoardError = '';
    var zatchupidError = '';
    var addressError = '';

    const stateError = Validate('sta', statedatkey);
    const cityError = Validate('city', citydatkey);

    if (schooldatkey == '0') {
      schoolnameError = Validate('schoolname', schoolname);
      BoardError = Validate('boardname', Board);
    } else {
      schoolError = Validate('school', schooldatkey);
      BoardError = Validate('boardname', Board);
      zatchupidError = Validate('zatchupid', ID);
      addressError = Validate('address', address);
    }

    if (
      stateError ||
      cityError ||
      schoolError ||
      schoolnameError ||
      BoardError ||
      zatchupidError ||
      addressError
    ) {
      //this._scrollView.scrollTo(0);
      Toast.show(
        stateError ||
        cityError ||
        schoolError ||
        schoolnameError ||
        BoardError ||
        zatchupidError ||
        addressError,
        Toast.SHORT,
      );

      return false;
    } else {
      var data11 = '';
      var data_1 = '';

      //  console.log('selectedSchool',selectedSchool)
      // function getIndex(email) {
      //   return selectedSchool.findIndex(obj => obj.label === email);
      // }

      // console.log('sdfsd',getIndex("test4@test.com"));

      var stateKey = [];
      stateKey = selectedState.filter(x => x.value == statedatkey);

      var cityKey = [];
      cityKey = selectedCity.filter(x => x.value == citydatkey);

      var schoolKey = [];
      schoolKey = selectedSchool.filter(x => x.value == schooldatkey);

      var schoolid = [];
      schoolid = selectedSchool.filter(x => x.value == schooldatkey);
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

      var raw = JSON.stringify({
        address1: addresssingle,
        city: cityKey[0].label,
        full_address: address,
        name_of_school: schoolKey[0].label,
        state: stateKey[0].label,
        university: Board,
        school_id: schoolid
        // "school_data": {}
      });



      const data_update = {
        token: token,
        data: raw,
      };

      setLoading(true);

      dispatch(
        userActions.getAddEi({
          data_update,
          callback: ({ result, error }) => {
            if (result.status === true) {
              console.warn(
                'after AddEi result',
                JSON.stringify(result.status, undefined, 2),
                submit(result.data),
                // props.navigation.navigate('OtpLogin', { 'firebase_id': result.firebase_username, 'username': email })
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
  };

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
    // const city = result.results.map((element: any) => ({
    //   label: element.city,
    //   value: element.id,
    // }));
    //console.log('dsfsdfds',state)
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
        pincode: element.pincode,
        opening_date: element.opening_date,
        is_onboarded: element.is_onboarded,



      };
      school.unshift(obj);
      //  console.log('dsfsdfds', obj.university)
      //  if(obj.label != ''){
      //   school_code: element.school_code,

      //  }
    });

    //console.log('dsfsdfds',state)
    setselectedSchool(school);

    // const city = result.results.map((element: any) => ({
    //   label: element.city,
    //   value: element.id,

    // }));
    //console.log('dsfsdfds',state)
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

  /***************************User GET States*******************************/

  const submit = async data => {



    var stateKey = [];
    stateKey = selectedState.filter(x => x.value == statedatkey);

    var cityKey = [];
    cityKey = selectedCity.filter(x => x.value == citydatkey);

    var schoolKey = [];
    schoolKey = selectedSchool.filter(x => x.value == schooldatkey);
    console.log('schoolKey', schoolKey[0].value);

    {
      schooldatkey != '0' && is_onboarded != '0'
        ? props.navigation.navigate('Onboarded', {
          data: props.route.params.data,
          school_id: schoolKey[0].value,
          nameofschool: schoolKey[0].label,
          school_zatchup_id: ID,
          state: stateKey[0].label,
          city: cityKey[0].label,
          address: address,
          board: Board,
          opening_da: opening_date,
          're_verify': props.route.params.re_verify
        })
        : props.navigation.navigate('AddCourseDetailsOthers', {
          nameofschool: schoolname,
          board: Board,
          school_id: data.school_id,
          data: props.route.params.data,
          is_onboarded: is_onboarded,
          're_verify': props.route.params.re_verify
        });
    }

    // { selectedSchool != '2' ? props.navigation.navigate('Onboarded', { data: props.route.params.data }) : props.navigation.navigate('AddCourseDetailsOthers') }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>

      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={'always'}
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}>
        <View style={styles.maincontainer}>
          <CustomStatusBar />
          {isLoading && renderIndicator()}

          {props.route.params.data === true ? (
            // <CustomHeader Title={'Add Current School'} />
            <HeaderTitleWithBack
              navigation={props.navigation}
              headerTitle="Add Current School"
            />
          ) : (
            // <CustomHeader Title={'Add School'} />
            <HeaderTitleWithBack
              navigation={props.navigation}
              headerTitle="Add School"
            />
          )}

          {props.route.params.loginkey == 'loginkey' ? <View style={styles.fillTextContainer}>
            <Text style={styles.fillText}>Please Add your School:</Text>
          </View>:<View style={styles.fillTextContainer}>
            <Text style={styles.fillText}>Please Fill in the details below:</Text>
          </View>}

          <View style={{ marginBottom: '5%', marginLeft: 25, marginRight: 25 }}>
            <TextField
              placeholder={'Enter your ZatchUp ID'}
              onChangeText={val => setID(val)}
              value={ID}
              // onEndEditing={val => getDetailZatchupID(val)}
              //  onEndEditing={() => getDetailZatchupID}
              onEndEditing={value => getDetailZatchupID()}
            />
          </View>

          <View style={styles.underview} />

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
                  setSchoolKey('');
                  setCityKey('');
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

              {/* <Picker
            style={styles.pickerItem}
            selectedValue={selectedState}
            onValueChange={(selectedValue) => setSelectedState(selectedValue)}
          >
            <Picker.Item label="State" value="0" />
            <Picker.Item label="Bombay" value="1" />
            <Picker.Item label="Gujaret" value="2" />
          </Picker> */}
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

              {/* <Picker
            style={styles.pickerItem}
            selectedValue={selectedCity}
            onValueChange={(selectedValue) => setselectedCity(selectedValue)}
          >
            <Picker.Item label="City" value="0" />
            <Picker.Item label="Noida" value="1" />
            <Picker.Item label="Ghaziabad" value="2" />
          </Picker> */}
            </View>
          </View>

          <View style={{ marginLeft: 20, marginRight: 20, marginTop: 5 }}>
            <CustomDropdown
              placeholder={'Select School'}
              data={selectedSchool}
              selectedValue={schooldatkey}
              value={schooldatkey}
              //selectedValue={selectedSchool}
              SelectedLanguagedata={selectedValue => {

                setSchoolKey(selectedValue);
                console.log('selectedValue-selectedValue', selectedValue)
                var data = [];
                data = selectedSchool.filter(x => x.value == selectedValue);
                // console.log('school index address + {" "}+ address2 x',schooldatkey)
                if (data.length > 0 && selectedValue != 0) {
                  console.log('school name list data', data)

                  var str1 = data[0].address1;
                  var str2 = data[0].address2;
                  var str3 = data[0].pincode;

                  var str4 = str1 + ' ' + str2 + ' ' + str3;
                  // if (data[0].address1 === undefined && data[0].address2 === undefined && data[0].pincode) {
                  //   setaddress('');

                  // } else {
                  //   setaddress(str4);

                  // }
                  //console.log('str4',str4)

                  setaddress(str4);
                  setBoard(data[0].university);
                  setaddresssingle(data[0].address1);
                  setID(data[0].school_code);
                  setopening_date(data[0].opening_date);
                  setis_onboarded(data[0].is_onboarded);
                  setSchoolname(data[0].label);


                } else {
                  setaddress('');
                  setBoard('');
                  setID('');
                  setSchoolname('');
                }
                // if (selectedValue !== 0) {
                //   var data = [];
                //   data = selectedSchool.filter(x => x.value == selectedValue);
                //   //console.log('school index x',x.value)
                //   if (data.length > 0) {
                //     // console.log('school name list data',data[0].university)
                //     setBoard(data[0].university);
                //     setaddress(data[0].address1);
                //     setID(data[0].school_code);

                //   }
                // }
                // getAddress(selectedValue);
              }}
            />
          </View>

          {schooldatkey != '0' ? (
            <View style={{ marginLeft: 20, marginRight: 20, marginTop: 15 }}>
              <TextField
                placeholder={'Enter School Address'}
                onChangeText={val => setaddress(val)}
                value={address}
                editable={false}
              />
            </View>
          ) : (
            <View style={{ marginLeft: 20, marginRight: 20, marginTop: 15 }}>
              <TextField
                placeholder={'Enter School Name'}
                onChangeText={val => setSchoolname(val)}
                value={schoolname}
              />
            </View>
          )}

          {schooldatkey != '0' ? (
            <View style={{ marginLeft: 20, marginRight: 20, marginTop: 15 }}>
              <TextField
                placeholder={'Enter Board/University'}
                onChangeText={val => setBoard(val)}
                value={Board}
                editable={false}
              />
            </View>
          ) : (
            <View style={{ marginLeft: 20, marginRight: 20, marginTop: 15 }}>
              <TextField
                placeholder={'Enter Board/University'}
                onChangeText={val => setBoard(val)}
                value={Board}
              />
            </View>
          )}

          <View
            style={{
              flex: 1,
              marginTop: 30,
              marginLeft: 20,
              marginRight: 20,
              marginBottom: 30,
            }}>
            <CustomButton title={'Submit'} onPress={() => onPressSubmit()} />

            {/* {selectedSchool != '2' ? <CustomButton title={'Submit'} onPress={() => props.navigation.navigate('Onboarded')} /> : <CustomButton title={'Submit'} onPress={() => props.navigation.navigate('EducationProfile')} />} */}
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
export default CurrentSchoolinfo;
