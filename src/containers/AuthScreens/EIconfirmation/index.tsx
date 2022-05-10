import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Dimensions,
  ScrollView,
  FlatList,
  BackHandler,
  Alert,
  Platform,
} from 'react-native';
import styles from './style';
import { Images } from '../../../components/index';
import {
  TextField,
  TextFieldCopy,
  CustomButton,
  CustomStatusBar,
  BackBtn,
  ModelComponent,
  CustomHeader,
  CustomDropdown,
  CustomDropdownCopy,
} from '../../../components';
const screenWidth = Dimensions.get('window').width;
import { CheckBox } from 'react-native-elements';
import { RadioButton } from 'react-native-paper';
import CardView from 'react-native-cardview';
import { useDispatch, useSelector } from 'react-redux';
import * as userActions from '../../../actions/user-actions-types';
import Toast from 'react-native-simple-toast';
import ProgressLoader from 'rn-progress-loader';
import {
  NavigationContainer,
  useIsFocused,
  useFocusEffect,
} from '@react-navigation/native';
import {
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
interface EIconfirmationScreenProps {
  navigation: any;
  route: any;
}

const EIconfirmation = (props: EIconfirmationScreenProps) => {
  const [Aadhar, setAadhar] = useState('');
  const [Name, setName] = useState('');
  const [selectedSchool, setselectedSchool] = useState('');
  const [ID, setID] = useState('');
  const [RollNo, setRollNo] = useState('');
  const [Course, setCourse] = useState('');
  const [SchoolID, setSchoolID] = useState('');
  const [stepcount, setStepCount] = useState('');

  const [Des, setDes] = useState('');
  const [allSelected, setSelected] = useState(false);
  // const [value, setValue] = React.useState('first');
  const [Duration, setDuration] = useState('');
  const [checked, setChecked] = React.useState('');

  const [setdatafromlist, setDataCourseInList] = useState([]);
  const [key, setKey] = useState(false);

  const [isStatus, setStatus] = useState(true);
  const isFocused = useIsFocused();

  const [isLoading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const [date, setDate] = useState(new Date());
  const [dateenddate, setDateEndDate] = useState(new Date());

  const [date_copy, setDate_Copy] = useState('');
  const [date_copy_end_date, setDate_CopyEndDate] = useState('');

  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const [modeenddate, setModeEndDate] = useState('date');
  const [showendate, setShowEndDate] = useState(false);

  const [KYC_type_doc_Selected, setKYCSelected] = useState('');
  const [standardid, setIDStandardid] = useState('');
  const [org_start_date, set_org_start_date] = useState('');
  const [org_end_date, set_org_end_date] = useState('');

  const [dropdwonplaceholder, setDropDownPlaceholder] = useState('A');
  const [classlist, setDataClassList] = useState([]);
  const [schoolidkey, setSchoolIDKey] = useState('');

  const [KYC_type_doc, setKYC_type_doc] = useState([
    {
      label: 'value1',
      value: '0',
    },
    {
      label: 'value2',
      value: '1',
    },
    {
      label: 'value3',
      value: '2',
    },
  ]);

  {
    checked === 'first'
      ? props.navigation.navigate('CurrentSchoolinfo', { data: true })
      : checked === 'second'
        ? props.navigation.navigate('CurrentSchoolinfo', { data: false })
        : null;
  }

  const DATA = [
    {
      text: 'No',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
  ];

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

  // useFocusEffect(() => {
  //   BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
  //   return () => {
  //     BackHandler.removeEventListener(
  //       'hardwareBackPress',
  //       handleBackButtonClick,
  //     );
  //   };
  //   // getStepCountAPi()
  // }, []);

  useFocusEffect(
    React.useCallback(() => {

      if (props.route.params.login == true) {
        Coursechangecoursestandarddetail(props.route.params.course_id);
       // CourseDeleteBeforeConformation(props.route.params.course_id);
        getEicourseconfirmationlist();
        getStepCountAPi()
        BackHandler.addEventListener('hardwareBackPress', handleBackBut);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackBut);
        };
      } else if (props.route.params.login == false) {
        getEicourseconfirmationlist();
        getStepCountAPi()
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () =>
          BackHandler.removeEventListener(
            'hardwareBackPress',
            handleBackButtonClick,
          );
      }
      
    }, []),
  );



  function handleBackBut() {
  props.navigation.goBack();
  return true;
  }

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
        { text: 'Yes', onPress: () => BackHandler.exitApp() },
      ],
      { cancelable: false },
    );
    return true;
  }



  const SetSchoolid = async result => {

    console.log('result9211', result);

    result.data.map((element: any) => {
      setSchoolIDKey(element.ei_detail.id);
      console.log('school id', element.ei_detail.id);
    });
  };
  const getdataCourseKey = async result => {
    // var state = [];
    // result.data.map((element: any) => {
    // const { } = element;
    // access values from this.state.items
    // var obj = {
    // id: element.ei_detail.id,
    // school_code: element.ei_detail.school_code,
    // name_of_school: element.ei_detail.name_of_school,
    // state: element.ei_detail.state,
    // city: element.ei_detail.city,
    // address1: element.ei_detail.address1,
    // address2: element.ei_detail.address2,
    // university: element.ei_detail.university,
    // is_current_course: element.ei_detail.course_detail[0].is_current_course ,
    // course_name: (element.ei_detail.course_detail.length > 0) ? element.ei_detail.course_detail[0].course_name : '',
    // description: (element.ei_detail.course_detail.length > 0) ? element.ei_detail.course_detail[0].description : '',
    // course_id: (element.ei_detail.course_detail.length > 0) ? element.ei_detail.course_detail[0].course_id : '',
    // duration: (element.ei_detail.course_detail.length > 0) ? element.ei_detail.course_detail[0].duration : '',
    // start_year: (element.ei_detail.course_detail.length > 0) ? element.ei_detail.course_detail[0].start_year : '',
    // end_year: (element.ei_detail.course_detail.length > 0) ? element.ei_detail.course_detail[0].end_year : '',
    // standard_name: element.ei_detail.course_detail[0].standard_detail[0].standard_name ,
    // roll_no: (element.ei_detail.course_detail[0].standard_detail.length > 0) ? element.ei_detail.course_detail[0].standard_detail[0].roll_no : '',
    // org_start_date: (element.ei_detail.course_detail[0].standard_detail.length > 0) ? element.ei_detail.course_detail[0].standard_detail[0].org_start_date : '',
    // section: (element.ei_detail.course_detail[0].standard_detail[0].class_detail.length > 0) ? element.ei_detail.course_detail[0].standard_detail[0].class_detail[0].class_name : '',
    // section:element.ei_detail.course_detail[0].class_detail[0].class_name,
    // standard_name:element.ei_detail.course_detail[0].standard_detail[0].standard_name,
    // }
    // state.push(obj);

    // });
    setDataCourseInList(result.data);
    setKey(true);
    console.log('dsfsdfds----------------------------->>>>>>>1', result)
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
    }
    dispatch(
      userActions.getRegStepCount({
        data,
        callback: ({ result, error }) => {
          if (result) {
            setLoading(false);

            console.warn(
              'after result step count EI Confrimation page',
              JSON.stringify(result, undefined, 2),

              //  props.navigation.navigate('OtpLogin', { 'firebase_id': result.firebase_username, 'username': email })
            );
            console.log('result.reg_step', result.reg_step)
            setStepCount(result.reg_step);
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
  }




  /***************************User get Course change course standard detail *******************************/

  const Coursechangecoursestandarddetail = async id => {
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
      userActions.getUserchangecoursestandarddetailbystudentbyid({
        data,
        callback: ({ result, error }) => {
          if (result) {
            setLoading(false);
            console.warn(
              'after result.....1',
              JSON.stringify(result, undefined, 2),
              // getdataCourseKey(result)
              // getEicourseconfirmationlist(),


              // props.navigation.navigate('SelectStudent'),
            );


            // Toast.show('Course is Deleted successfully', Toast.SHORT),
            // getData()
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


  /***************************User get Course Delete Before Conformation *******************************/

  const CourseDeleteBeforeConformation = async id => {
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
      userActions.getUserCourseDeleteBeforConformation({
        data,
        callback: ({ result, error }) => {
          if (result) {
            setLoading(false);
            console.warn(
              'after result.....2',
              JSON.stringify(result, undefined, 2),
            );

            // Toast.show('Course is Deleted successfully', Toast.SHORT),
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




  /***************************User get Edit standard drop down class list *******************************/

  const CallApiEditDropDown = async (id, index) => {
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
      standard_id: standardid,
      standard_start_year: org_start_date,
      standard_end_year: org_end_date,
      class_id: id,
    };
    setLoading(true);

    dispatch(
      userActions.geteditcoursestandarddropdown({
        data,
        callback: ({ result, error }) => {
          if (result) {
            console.warn(
              'after result drop ',
              JSON.stringify(result, undefined, 2),
              Toast.show('Section edit Successfully', Toast.SHORT),
              getEicourseconfirmationlist(),
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

  /***************************User get Edit standard course list *******************************/

  const CallApiEditEndDate = async (id, standarad_i) => {
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
      standard_id: standarad_i.standard_id,
      standard_start_year: standarad_i.org_start_date,
      standard_end_year: id,
    };
    setLoading(true);

    dispatch(
      userActions.geteditcoursestandard({
        data,
        callback: ({ result, error }) => {
          if (result) {
            console.warn(
              'after result',
              JSON.stringify(result, undefined, 2),
              Toast.show('Successfully Updated', Toast.SHORT),
              getEicourseconfirmationlist(),
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

  /***************************User get Edit standard course list *******************************/

  const CallApiEditStartDate = async (id, standarad_i) => {
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
      standard_id: standarad_i.standard_id,
      standard_start_year: id,
      standard_end_year: standarad_i.org_end_date,
    };

    console.log('ApiData==>>>', data);

    setLoading(true);

    dispatch(
      userActions.geteditcoursestandard({
        data,
        callback: ({ result, error }) => {
          if (result) {
            console.warn(
              'after result',
              JSON.stringify(result, undefined, 2),
              Toast.show('Successfully Updated', Toast.SHORT),
              getEicourseconfirmationlist(),
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
            console.warn(
              'after result',
              JSON.stringify(result, undefined, 2),
              // getdataCourseKey(result)
              // getEicourseconfirmationlist(),
              Toast.show('School deleted successfully', Toast.SHORT),

            );
            if (stepcount != '7') {
              props.navigation.navigate('SelectStudent', { 're_verify': props.route.params.re_verify });

            }
            else {
              props.navigation.navigate('MySchoolScreen');
            }
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

  /***************************User get Skipped standard *******************************/

  const CourseSkippedstandard = async id => {
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
      standard_id: id,
    };
    setLoading(true);

    dispatch(
      userActions.getskipped({
        data,
        callback: ({ result, error }) => {
          if (result) {
            console.warn(
              'after result',
              JSON.stringify(result, undefined, 2),
              // getdataCourseKey(result)
              Toast.show(result.message, Toast.SHORT),
              getEicourseconfirmationlist(),
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

  // const data = {
  // token: token,
  // };
  // setLoading(true);

  // dispatch(
  // userActions.getEiCourseConfirmationList({
  // data,

  // callback: ({result, error}) => {
  // if (result) {
  // console.warn(
  // 'after result',
  // JSON.stringify(result, undefined, 2),

  // getdataCourseKey(result),

  // // props.navigation.navigate('OtpLogin', { 'firebase_id': result.firebase_username, 'username': email })
  // );
  // // setSpinnerStart(false);
  // setLoading(false);
  // }
  // if (!error) {
  // console.warn(JSON.stringify(error, undefined, 2));
  // // setLoginSuccess(result);
  // setLoading(false);
  // //console.log('dfdfdf--------', error)
  // // Toast.show('Invalid credentials', Toast.SHORT);

  // // Alert.alert(error.message[0])

  // // signOut();
  // } else {
  // // setError(true);
  // // signOut();
  // // Alert.alert(result.status)
  // // Toast.show('Invalid credentials', Toast.SHORT);
  // setLoading(false);
  // console.warn(JSON.stringify(error, undefined, 2));
  // }
  // },
  // }),
  // );
  // };

  /***************************User get Ei course confirmation list *******************************/

  const getEicourseconfirmationlist = async () => {
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
      userActions.getEiCourseConfirmationList({
        data,
        callback: ({ result, error }) => {
          if (result) {

            console.log(
              'after result naveen ',
              JSON.stringify(result) ,
            );



            if (result.data.length > 0) {

              var newAr:any = [];
              var newApiArr:any = [];
              for (let i in result.data) {
                if (result.data[i].ei_detail.course_detail.length > 0) {

                  newApiArr.push(result.data[i]);
                  console.log('newApiArray.log',newApiArr);
                }
              }

              console.log('newApiArray....1>', newApiArr);
              // return


              if(newApiArr.length > 0){

              
                if (newApiArr[0].ei_detail.course_detail.length > 0) {
                  console.log('newApiArray 1', newApiArr[0].ei_detail.id);

                  setSchoolIDKey(newApiArr[0].ei_detail.id);

                  if (
                    newApiArr[0].ei_detail.course_detail[0].standard_detail !=
                    null

                  ) {

                    console.log('newApiArray 2', 'huy 2');

                    for (let i in newApiArr[0].ei_detail.course_detail[0]
                      .standard_detail) {
                      let flag = '';
                      if (
                        newApiArr[0].ei_detail.course_detail[0].standard_detail[i]
                          .class_detail.length > 0
                      ) {
                        flag =
                          newApiArr[0].ei_detail.course_detail[0].standard_detail[
                            i
                          ].class_detail[0].class_name;
                      }
                      let item = {
                        ...newApiArr[0].ei_detail.course_detail[0]
                          .standard_detail[i],
                        className: flag,
                      };
                      newAr.push(item);
                    }
                  }
                }

              }               
              console.log('--------', newAr);

              let newObject = Object.assign([], newApiArr);
              let arrr = [];
              for (let i in newObject) {
                for (let j in newObject[i].ei_detail.course_detail) {
                  let item = {
                    ...newObject[i].ei_detail.course_detail[j],
                    standard_detail: newAr,
                  };
                  arrr.push(item);
                }
              }

              console.log('=======', arrr);

              let newD = [];
              for (let i in newApiArr[0]) {
                let item = { ...newApiArr[0].ei_detail, course_detail: arrr };
                newD.push({ ei_detail: item });
              }

              console.log('AddFlag===>>', newD);

              let newArr = [];
              for (let i in newD[0].ei_detail.course_detail[0]
                .standard_detail) {
                let item = {
                  ...newD[0].ei_detail.course_detail[0].standard_detail[i],
                  showStart: false,
                  showEnd: false,
                  minDate:
                    newD[0].ei_detail.course_detail[0].standard_detail[i]
                      .org_start_date,
                  maxDate:
                    newD[0].ei_detail.course_detail[0].standard_detail[i]
                      .org_end_date,
                };
                newArr.push(item);
              }
              console.log('NewArrr==>>', newArr);

              let ar = [];
              for (let i in newD[0].ei_detail.course_detail) {
                let item = {
                  ...newD[0].ei_detail.course_detail[i],
                  standard_detail: newArr,
                };
                ar.push(item);
              }

              let newData = [];
              for (let i in newD[0]) {
                let item = { ...newD[0].ei_detail, course_detail: ar };
                newData.push(item);
              }

              let obj = { ...newData[0] };

              let newCourseList = [];
              newCourseList.push({ ei_detail: obj });

              let newObj = { ...result, data: newCourseList };

              console.log('newData==>>>>>>>>>>>>Api Changes', newObj);

              getdataCourseKey(newObj);
              setLoading(false);

            } else {
              setLoading(false);

              getdataCourseKey(result);
            }
            // getdataCourseKey(result);

            // setSpinnerStart(false);
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

  const getdataStateKey = async result => {
    var state = [];
    result.results.map((element: any) => {
      let obj = {
        label: element.class_name,
        value: element.id,
      };

      state.push(obj);
    });
    setDataClassList(state);
  };

  /***************************User get Class List By Standard iD*******************************/

  const getClassListByStandardid = async id => {
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
      standard_id: id,
    };
    setLoading(true);

    dispatch(
      userActions.getClassListByStandard({
        data,

        callback: ({ result, error }) => {
          if (result) {
            console.warn(
              'after result class data',
              JSON.stringify(result, undefined, 2),
              // Toast.show(result.message, Toast.SHORT),
              getdataStateKey(result),
              // getEicourseconfirmationlist(),
              // getdataCourseKey(result)

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
  };
  const ItemSeprator = () => (
    <View
      style={{
        height: 2,
        width: '100%',
        // backgroundColor: "rgba(0,0,0,0.5)",
      }}
    />
  );
  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showModeEndDate = currentMode => {
    setShowEndDate(true);
    setModeEndDate(currentMode);
  };

  const showDatepicker = index => () => {
    // showMode('date');

    //console.log('index', index, setdatafromlist);

    let newAr = Object.assign([], setdatafromlist);

    // let newArr = [];
    for (let i in newAr[0].ei_detail.course_detail[0].standard_detail) {
      if (i == index) {
        newAr[0].ei_detail.course_detail[0].standard_detail[i].showStart = true;
      } else {
        newAr[0].ei_detail.course_detail[0].standard_detail[i].showStart =
          false;
      }
    }

    // console.log('After Click', newAr);

    setDataCourseInList(newAr);

    //setShow(true);
  };

  const showDatepickerEndDate = index => () => {
    // console.log('index', index, setdatafromlist);

    let newAr = Object.assign([], setdatafromlist);

    // let newArr = [];
    for (let i in newAr[0].ei_detail.course_detail[0].standard_detail) {
      if (i == index) {
        newAr[0].ei_detail.course_detail[0].standard_detail[i].showEnd = true;
      } else {
        newAr[0].ei_detail.course_detail[0].standard_detail[i].showEnd = false;
      }
    }

    // console.log('After Click', newAr);

    setDataCourseInList(newAr);
    //showModeEndDate('date');
  };

  const onChangeEndDate = (event, selectedDate, standarad_i, index) => {
    const currentDate = selectedDate || date;
    setShowEndDate(Platform.OS === 'ios');
    if (event.type == 'set') {
      //ok button
      //setDateEndDate(currentDate);

      let newAr = Object.assign([], setdatafromlist);

      // let newArr = [];
      for (let i in newAr[0].ei_detail.course_detail[0].standard_detail) {
        newAr[0].ei_detail.course_detail[0].standard_detail[i].showEnd = false;
      }
      // console.log('newArrrDismiss==>>', newAr);
      setDataCourseInList(newAr);
    } else {
      let newAr = Object.assign([], setdatafromlist);

      // let newArr = [];
      for (let i in newAr[0].ei_detail.course_detail[0].standard_detail) {
        newAr[0].ei_detail.course_detail[0].standard_detail[i].showEnd = false;
      }
      // console.log('newArrrDismiss==>>', newAr);
      setDataCourseInList(newAr);
      return;
    }
    // setDate(currentDate);
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();
    // console.log('A date has been picked: ' + day + '-' + month + '-' + year);
    //setDate_Copy(year + '-' + month + '-' + day);

    var MyDateString =
      currentDate.getFullYear() +
      '-' +
      ('0' + (currentDate.getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + currentDate.getDate()).slice(-2);
    // console.log('A date has been picked: ' + day + '-' + month + '-' + year);
    // setDate_CopyEndDate(MyDateString);
    CallApiEditEndDate(MyDateString, standarad_i);

    // YYYY-MM-DD
  };
  const onChange = (event, selectedDate, standarad_i, index) => {
    // console.log('SelectedEvent===>>', event);
    // console.log('SelectedDate===>>', selectedDate);
    // console.log('SelectedDate===>>', standarad_i, index);
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');

    if (event.type == 'set') {
      //ok button
      //  console.log('Current Date Select', selectedDate);

      let newAr = Object.assign([], setdatafromlist);

      // let newArr = [];
      for (let i in newAr[0].ei_detail.course_detail[0].standard_detail) {
        newAr[0].ei_detail.course_detail[0].standard_detail[i].showStart =
          false;
      }
      // console.log('newArrrSet==>>', newAr);
      setDataCourseInList(newAr);

      //setDate(currentDate);
    } else {
      //cancel Button
      let newAr = Object.assign([], setdatafromlist);

      // let newArr = [];
      for (let i in newAr[0].ei_detail.course_detail[0].standard_detail) {
        newAr[0].ei_detail.course_detail[0].standard_detail[i].showStart =
          false;
      }
      console.log('newArrrDismiss==>>', newAr);
      setDataCourseInList(newAr);
      return;
    }
    // setDate(currentDate);
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();
    // console.log('A date has been picked: ' + day + '-' + month + '-' + year);
    //setDate_Copy(year + '-' + month + '-' + day);

    var MyDateString =
      currentDate.getFullYear() +
      '-' +
      ('0' + (currentDate.getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + currentDate.getDate()).slice(-2);
    // console.log('A date has been picked: ' + day + '-' + month + '-' + year);
    //setDate_Copy(MyDateString);
    //console.log(MyDateString);
    CallApiEditStartDate(MyDateString, standarad_i);

    // YYYY-MM-DD
  };
  // const checkedterm = () => {
  // // setSelected(!allSelected)
  // setChecked('first')
  // // setChecked('second')
  // props.navigation.navigate('CurrentSchoolinfo') ;

  // }

  // const checkedtermsecond = () => {
  // // setSelected(!allSelected)
  // // setChecked('first')
  // setChecked('second')
  // props.navigation.navigate('CurrentSchoolinfo');

  // }
  const DeleteSchool = async id => {
    Alert.alert(
      'Delete',
      'Are you sure you want delete this School.',
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

  const onPressEdit = (id, org_start_date, org_end_date, index) => {
    getClassListByStandardid(id);
    setIDStandardid(id);
    set_org_start_date(org_start_date);
    set_org_end_date(org_end_date);
    // setDate(org_start_date);
    // setDateEndDate(org_end_date);

    let newArr = Object.assign([], setdatafromlist);

    for (let i in newArr) {
      for (let j in newArr[i].ei_detail.course_detail) {
        for (let k in newArr[i].ei_detail.course_detail[j].standard_detail) {
          if (
            k == index &&
            !newArr[i].ei_detail.course_detail[j].standard_detail[k]
              .is_current_standard
          ) {
            newArr[i].ei_detail.course_detail[j].standard_detail[k].className =
              '';
          }
        }
      }
    }
    // console.log('newArr', newArr);
  };

  const Skippedstandard = id => {
    Alert.alert(
      'Skip',
      'Are you sure you want to skip this standard ?',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'Yes', onPress: () => CourseSkippedstandard(id) },
      ],
      { cancelable: false },
    );
    return true;
  };

  const gotoNavigate = async () => {
    Alert.alert(
      'ZatchUp',
      'Are you sure you want to Submit?',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'Yes', onPress: () => gotoNavigatee() },
      ],
      { cancelable: false },
    );
    return true;
  };

  const gotoNavigatee = async () => {

    //  console.log('props.route.params.re_verify',props.route.params.re_verify);


    // return
   // if (props.route.params.login == true) {


    if (stepcount == '7') {

      USERCOURSECONFIRMATION_2();

    }
    else if (props.route.params.re_verify == true) {

      USERCOURSECONFIRMATIONREVERIFY();

    }
    else {
      USERCOURSECONFIRMATION();

    }

    const value = await AsyncStorage.getItem('tokenlogin');

    // console.log('value', value);

    if (value == '' || value == null || stepcount != '7') {
      props.navigation.navigate('Personalinfo', {
        schoolidkey: schoolidkey,
      });
    } else {
      props.navigation.navigate('MySchoolScreen');
    }


  };

  /***************************User Course Confirm-1*******************************/

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
      school_id: schoolidkey,
    };
    setLoading(true);

    dispatch(
      userActions.getusercourseconfirmation({
        data,
        callback: ({ result, error }) => {
          if (result) {
            console.warn(
              'after user confirmation result step 1',
              JSON.stringify(result, undefined, 2),
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


  /***************************User Course Confirm-2*******************************/

  const USERCOURSECONFIRMATION_2 = async () => {
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
      school_id: schoolidkey,
      existing_course: props.route.params.course_id,
      change_course_id:props.route.params.change_course_id,
      //   course_id: props.route.params.course_id,
      // before_exist: props.route.params.course_id,

    };
    setLoading(true);

    dispatch(
      userActions.getUserCourseConfirm({
        data,
        callback: ({ result, error }) => {
          if (result) {
            console.warn(
              'after user confirmation result step 2',
              JSON.stringify(result, undefined, 2),
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



  /***************************User Course Confirm Re-verify*******************************/

  const USERCOURSECONFIRMATIONREVERIFY = async () => {
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
      school_id: schoolidkey,
    };
    setLoading(true);

    dispatch(
      userActions.getusercourseconfirmationreverify({
        data,
        callback: ({ result, error }) => {
          if (result) {
            console.warn(
              'after user confirmation Re-verify',
              JSON.stringify(result, undefined, 2),
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
    <View style={styles.container}>
      <CustomStatusBar />

      {isLoading && renderIndicator()}

      <CustomHeader Title={'School Confirmation'} />

      <View style={styles.inputContainer}>
        {setdatafromlist.length > 0 ? (
          <FlatList
            data={setdatafromlist}
            // keyExtractor={item => item.id.toString()}
            ItemSeparatorComponent={ItemSeprator}
            // ItemSeparatorComponent={this.SeparatorComponent}
            renderItem={({ item, index }) => (
              <CardView
                cardElevation={1}
                cardMaxElevation={1}
                cornerRadius={10}
                style={styles.Cardview}>
                <View style={styles.view_Row_}>
                  <Text style={styles.view_Tv_1}>ZatchUp ID :</Text>
                  <Text style={styles.view_Tv_2}>
                    {item.ei_detail.school_code}
                  </Text>

                  {stepcount != '7'  ? <TouchableOpacity
                    underlayColor="none"
                    onPress={() => DeleteSchool(item.ei_detail.id)}>
                    <Image
                      style={{
                        height: 30,
                        width: 30,
                        marginTop: 2,
                        marginLeft: 20,
                        marginRight: 10,
                      }}
                      source={Images.delete}
                    />
                  </TouchableOpacity> : null}
                </View>
                <View
                  style={[styles.view_Row, { justifyContent: 'space-between' }]}>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 5,
                    }}>
                    <Text style={styles.view_Tv_1}>State :</Text>
                    <Text style={styles.view_Tv_2}>{item.ei_detail.state}</Text>
                  </View>
                </View>

                <View style={styles.view_Row_}>
                  <Text style={styles.view_Tv_1}>City :</Text>
                  <Text style={styles.view_Tv_2}>{item.ei_detail.city}</Text>
                </View>

                <View style={styles.view_Row_}>
                  <Text style={styles.view_Tv_1}>School Name :</Text>
                  <Text
                    style={{
                      marginTop: 5,
                      fontSize: 17,
                      color: '#565656',
                      flexWrap: 'wrap',
                      flex: 1,
                      marginLeft: 5,
                    }}>
                    {item.ei_detail.name_of_school}
                  </Text>
                </View>

                {props.route.params.otherscourse != 'otherscourse' ? (
                  <View style={styles.view_Row_}>
                    <Text style={styles.view_Tv_1}>School Address :</Text>
                    <Text
                      style={{
                        marginTop: 5,
                        fontSize: 17,
                        color: '#565656',
                        flexWrap: 'wrap',
                        flex: 1,
                        marginLeft: 5,
                      }}>
                      {item.ei_detail.address1 + ' ' + item.ei_detail.address2}
                    </Text>
                  </View>
                ) : null}

                {props.route.params.otherscourse != 'otherscourse' ? (
                  <View style={styles.view_Row_}>
                    <Text style={styles.view_Tv_1}>Pincode :</Text>
                    <Text style={styles.view_Tv_2}>
                      {item.ei_detail.pincode}
                    </Text>
                  </View>
                ) : null}

                <View style={styles.view_Row_}>
                  <Text style={styles.view_Tv_1}>University/Board :</Text>
                  <Text style={styles.view_Tv_2}>
                    {item.ei_detail.university}
                  </Text>
                </View>

                {item.ei_detail.course_detail.length > 0 &&
                  item.ei_detail.course_detail.map(i => {
                    return (
                      <View>
                        <View
                          style={{
                            flexDirection: 'row',
                            marginTop: 20,
                            marginBottom: 5,
                          }}>
                          <Text
                            style={{
                              fontSize: 22,
                              marginLeft: 10,
                              color: '#191C1F',
                            }}>
                            Course Details
                          </Text>
                          {/* i.is_current_course == false && props.route.params.AlumniNo == 'AlumniNo' */}

                          <TouchableHighlight
                            underlayColor="none"
                            onPress={() => {
                              i.is_current_course == false 
                                ? props.navigation.navigate('AlumniNoEdit', {
                                  school_id: item.ei_detail.id,
                                  course_id: i.course_id,
                                  nameofschool: item.ei_detail.name_of_school,
                                  school_zatchup_id:
                                    item.ei_detail.school_code,
                                  course_name: i.course_name,
                                  description: i.description,
                                  roll_no: i.roll_no,
                                  coursekeyothersAlumni:
                                    props.route.params.coursekeyothersAlumni,
                                  course_type: i.course_type,
                                  're_verify': props.route.params.re_verify,
                                  'login': props.route.params.login,
                                  'LoginfromEducationProfile':props.route.params.LoginfromEducationProfile

                                })
                                : i.standard_detail != null && i.standard_detail.length > 0 && i.is_current_course == true
                                  ? props.navigation.navigate(
                                    'EducationProfileEdit',
                                    {
                                      school_id: item.ei_detail.id,
                                      course_id: i.course_id,
                                      nameofschool:
                                        item.ei_detail.name_of_school,
                                      school_zatchup_id:
                                        item.ei_detail.school_code,
                                      course_name: i.course_name,
                                      description: i.description,
                                      roll_no: i.roll_no,
                                      're_verify': props.route.params.re_verify,
                                      'login': props.route.params.login,
                                      'key':true,
                                      'LoginfromEducationProfile':props.route.params.LoginfromEducationProfile
                                    },
                                  )
                                  : props.navigation.navigate(
                                    'AddCourseDetailsOthersEdit',
                                    {
                                      data: i.is_current_course == true ? true : false,
                                      nameofschool:
                                        item.ei_detail.name_of_school,
                                      course_name: i.course_name,
                                      start_date: '2018-01-06',
                                      end_date: '2022-01-06',
                                      description: i.description,
                                      course_type: i.course_type,
                                      course_id: i.course_id,
                                      school_id: item.ei_detail.id,
                                      confirmation: 'EIconfirmation',
                                      're_verify': props.route.params.re_verify,
                                      'login': props.route.params.login,
                                    },
                                  )
                            }}>
                            <Image
                              style={styles.editicon}
                              source={Images.edit_icon}
                            />
                          </TouchableHighlight>
                        </View>

                        <View style={styles.view_Row_}>
                          <Text style={styles.view_Tv_1_copy}>
                            Course Name :
                          </Text>
                          <Text style={styles.view_Tv_2}>{i.course_name}</Text>
                        </View>

                        <View style={styles.view_Row_}>
                          <Text style={styles.view_Tv_1_copy}>
                            Course Description :
                          </Text>
                          <Text style={styles.view_Tv_2_}>{i.description}</Text>
                        </View>

                        <View style={styles.view_Row_}>
                          <Text style={styles.view_Tv_1_copy}>
                            Starting Year :
                          </Text>
                          <Text style={styles.view_Tv_2}>{i.start_year}</Text>
                        </View>

                        {/* {i.is_current_standard == false ? (
 <View style={styles.view_Row_}>
 <Text style={styles.view_Tv_1_copy}>
 Ending Year :
 </Text>
 <Text style={styles.view_Tv_2}>
 {i.standard_end_year}
 </Text>
 </View>
 ) : (
 <View style={styles.view_Row_}>
 <Text style={styles.view_Tv_1_copy}>
 Ending Year :
 </Text>
 <Text style={styles.view_Tv_2}>{'To Current'}</Text>
 <TouchableOpacity onPress={showDatepicker}>
 <View style={{width: 130}}>
 <TextField
 placeholder={'To Current'}
 imageIcon={Images.calendar_icon}
 editable={false}
 value={date_copy.toString()}
 />
 </View>
 </TouchableOpacity>
 <View>
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
 </View>
 </View>
 )} */}

                        {i.is_current_course ? 
                          <View
                            style={{
                              flexDirection: 'row',
                              marginTop: 5,
                              // marginBottom: 2,
                            }}>
                            <Text style={styles.view_Tv_1}>Ending Year :</Text>
                            <Text style={styles.view_Tv_2}>{'To Current'}</Text>
                          </View>
                         :
                         i.is_current_course === false ? <View
                            style={{
                              flexDirection: 'row',
                              marginTop: 5,
                              //marginBottom: 2,
                            }}>
                            <Text style={styles.view_Tv_1}>Ending Year :</Text>
                            <Text style={styles.view_Tv_2}>{i.end_year}</Text>

                          </View>:null
                        }

                        <View style={styles.view_Row_}>
                          <Text style={styles.view_Tv_1_copy}>Duration :</Text>
                          <Text style={styles.view_Tv_2}>{i.duration}</Text>
                        </View>

                        {i.standard_detail &&
                          i.standard_detail.map((standarad_i, index) => {
                            return (
                              <View>
                                <CardView
                                  cardElevation={10}
                                  cardMaxElevation={10}
                                  cornerRadius={5}
                                  style={styles.Cardview}>
                                  <View
                                    style={{
                                      flexDirection: 'column',
                                      // marginRight: 10,
                                      marginTop: 5,
                                    }}>
                                    <View style={styles.view_Row_}>
                                      <Text
                                        style={{
                                          marginTop: 5,
                                          fontSize: 15,
                                          marginLeft: 10,
                                          color: '#CCCCCC',
                                        }}>
                                        Standard :
                                      </Text>
                                      <Text
                                        style={{
                                          marginTop: 5,
                                          fontSize: 14,
                                          marginLeft: 5,
                                          color: '#565656',
                                        }}>
                                        {standarad_i.standard_name}
                                      </Text>

                                      {standarad_i.is_current_standard ==
                                        false ? (
                                        <TouchableOpacity
                                          // style={{}}
                                          style={[
                                            styles.button_,
                                            {
                                              height: hp(2.7),
                                              borderColor: '#000',
                                              width: wp(16),
                                              alignItems: 'center',
                                              alignSelf: 'flex-end',
                                              marginTop: 5,
                                              marginLeft: 15,
                                            },
                                          ]}
                                          // onPress={onPressSave}
                                          onPress={() =>
                                            Skippedstandard(
                                              standarad_i.standard_id,
                                            )
                                          }>
                                          <Text
                                            style={{
                                              color: '#000',
                                              fontSize: hp(1.3),
                                              fontFamily: 'SFUIDisplay-Heavy',
                                            }}>
                                            SKIP
                                          </Text>
                                        </TouchableOpacity>
                                      ) : null}
                                      <TouchableOpacity
                                        // onPress={onPressSave}
                                        onPress={() =>
                                          onPressEdit(
                                            standarad_i.standard_id,
                                            standarad_i.org_start_date,
                                            standarad_i.org_end_date,
                                            index,
                                          )
                                        }>
                                        <Image
                                          style={{
                                            height: 28,
                                            width: 28,
                                            // marginTop: 2,
                                            // marginRight: 5,
                                            marginLeft: 20,
                                          }}
                                          source={Images.edit_icon}
                                        />
                                      </TouchableOpacity>
                                    </View>
                                    <View style={styles.view_Row_}>
                                      <Text
                                        style={{
                                          marginTop: 5,
                                          fontSize: 15,
                                          marginLeft: 10,
                                          color: '#CCCCCC',
                                        }}>
                                        Duration :
                                      </Text>
                                      <Text
                                        style={{
                                          marginTop: 5,
                                          fontSize: 14,
                                          marginLeft: 5,
                                          color: '#565656',
                                        }}>
                                        {standarad_i.duration}
                                      </Text>
                                    </View>
                                    <View
                                      style={{
                                        flexDirection: 'row',
                                        marginTop: 10,
                                      }}>
                                      <Text
                                        style={{
                                          marginTop: 5,
                                          fontSize: 15,
                                          marginLeft: 10,
                                          color: '#CCCCCC',
                                        }}>
                                        Starting Year :
                                      </Text>
                                      <TouchableOpacity
                                        onPress={showDatepicker(index)}>
                                        <Text
                                          style={{
                                            marginTop: 5,
                                            fontSize: 14,
                                            marginLeft: 5,
                                            color: '#565656',
                                            textDecorationLine: 'underline',
                                          }}>
                                          {standarad_i.standard_start_year}
                                        </Text>
                                      </TouchableOpacity>
                                      {/* {standarad_i.standard_id == standardid &&
 standarad_i.is_current_standard ==
 false ? (
 <TouchableOpacity
 onPress={showDatepicker}>
 <View
 style={{
 width: 130,
 marginLeft: 13,
 }}>
 <TextFieldCopy
 placeholder={
 standarad_i.org_start_date
 }
 imageIcon={Images.calendar_icon}
 editable={false}
 value={date_copy.toString()}
 />
 </View>
 </TouchableOpacity>
 ) : null} */}
                                    </View>
                                  </View>

                                  {standarad_i.showStart && (
                                    <DateTimePicker
                                      testID="dateTimePicker"
                                      value={moment(
                                        standarad_i.org_start_date,
                                        'YYYY-MM-DD',
                                      ).toDate()}
                                      mode={'date'}
                                      minimumDate={
                                        index == 0
                                          ? new Date(
                                            i.org_start_year + '-01-01',
                                          )
                                          : i.standard_detail.length - 1 ==
                                            index
                                            ? new Date(standarad_i.maxDate)
                                            : new Date(
                                              i.standard_detail[
                                                index - 1
                                              ].org_end_date,
                                            )
                                      }
                                      maximumDate={
                                        new Date(standarad_i.maxDate)
                                      }
                                      is24Hour={true}
                                      // format="YYYY-MMM-DD"
                                      display="default"
                                      onChange={(event, value) =>
                                        onChange(
                                          event,
                                          value,
                                          standarad_i,
                                          index,
                                        )
                                      }
                                    />
                                  )}

                                  {standarad_i.showEnd && (
                                    <DateTimePicker
                                      testID="dateTimePicker"
                                      value={moment(
                                        standarad_i.org_end_date,
                                        'YYYY-MM-DD',
                                      ).toDate()}
                                      mode={'date'}
                                      minimumDate={
                                        new Date(standarad_i.minDate)
                                      }
                                      maximumDate={new Date()}
                                      // maximumDate={new Date('2021-01-01')}
                                      is24Hour={true}
                                      //format="YYYY-MMM-DD"
                                      display="default"
                                      onChange={(event, value) =>
                                        onChangeEndDate(
                                          event,
                                          value,
                                          standarad_i,
                                          index,
                                        )
                                      }
                                    />
                                  )}

                                  {standarad_i.is_current_standard == false ? (
                                    <View style={styles.view_Row_}>
                                      <Text
                                        style={{
                                          marginTop: 5,
                                          fontSize: 15,
                                          marginLeft: 10,
                                          color: '#CCCCCC',
                                        }}>
                                        Ending Year :
                                      </Text>
                                      <TouchableOpacity
                                        onPress={showDatepickerEndDate(index)}>
                                        <Text
                                          style={{
                                            marginTop: 5,
                                            fontSize: 14,
                                            marginLeft: 5,
                                            color: '#565656',
                                            textDecorationLine: 'underline',
                                          }}>
                                          {standarad_i.standard_end_year}
                                        </Text>
                                      </TouchableOpacity>
                                      {/* {standarad_i.standard_id == standardid &&
 standarad_i.is_current_standard ==
 false ? (
 <TouchableOpacity
 onPress={showDatepickerEndDate}>
 <View
 style={{
 width: 130,
 marginLeft: 20,
 marginTop: 5,
 }}>
 <TextFieldCopy
 placeholder={
 standarad_i.org_end_date
 }
 imageIcon={Images.calendar_icon}
 editable={false}
 value={date_copy_end_date.toString()}
 />
 </View>
 </TouchableOpacity>
 ) : null} */}
                                    </View>
                                  ) : (
                                    <View style={styles.view_Row_}>
                                      <Text
                                        style={{
                                          marginTop: 5,
                                          fontSize: 15,
                                          marginLeft: 10,
                                          color: '#CCCCCC',
                                        }}>
                                        Ending Year :
                                      </Text>
                                      <Text
                                        style={{
                                          marginTop: 5,
                                          fontSize: 14,
                                          marginLeft: 5,
                                          color: '#565656',
                                        }}>
                                        {'To Current'}
                                      </Text>
                                    </View>
                                  )}

                                  {standarad_i.hasOwnProperty('className') &&
                                    standarad_i.className != '' &&
                                    standarad_i.is_current_standard ==
                                    false && (
                                      <View style={{ flexDirection: 'row' }}>
                                        <Text
                                          style={{
                                            marginTop: 5,
                                            fontSize: 15,
                                            marginLeft: 10,
                                            color: '#CCCCCC',
                                          }}>
                                          Section
                                        </Text>

                                        <Text
                                          style={{
                                            marginTop: 5,
                                            fontSize: 15,
                                            marginLeft: 10,
                                            color: '#000',
                                          }}>
                                          {standarad_i.className}
                                        </Text>
                                      </View>
                                    )}

                                  {standarad_i.is_current_standard == true ? (
                                    <View>
                                      {standarad_i.class_detail.map(class_i => {
                                        return (
                                          <View style={styles.view_Row_Copy}>
                                            <Text
                                              style={{
                                                marginTop: 5,
                                                fontSize: 15,
                                                marginLeft: 10,
                                                color: '#CCCCCC',
                                              }}>
                                              Section :
                                            </Text>
                                            <Text
                                              style={{
                                                marginTop: 5,
                                                fontSize: 14,
                                                marginLeft: 5,
                                                color: '#565656',
                                              }}>
                                              {class_i.class_name}
                                            </Text>
                                          </View>
                                        );
                                      })}
                                    </View>
                                  ) : (
                                    <View>
                                      <View style={styles.view_Row_Copy}>
                                        {standarad_i.className == '' && (
                                          <>
                                            <Text
                                              style={{
                                                marginTop: 5,
                                                fontSize: 15,
                                                marginLeft: 10,
                                                color: '#CCCCCC',
                                              }}>
                                              Section :
                                            </Text>
                                            <Text
                                              style={{
                                                marginTop: 5,
                                                fontSize: 14,
                                                marginLeft: 5,
                                                color: '#565656',
                                              }}>
                                              {''}
                                            </Text>
                                          </>
                                        )}
                                        {standarad_i.standard_id ==
                                          standardid &&
                                          standarad_i.className == '' &&
                                          standarad_i.is_current_standard ==
                                          false ? (
                                          <View
                                            style={{
                                              width: 130,
                                              alignSelf: 'center',
                                              marginTop: -7,
                                              marginLeft: 20,
                                            }}>
                                            <CustomDropdownCopy
                                              placeholder={'Select Section'}
                                              data={classlist}
                                              selectedValue={
                                                KYC_type_doc_Selected
                                              }
                                              SelectedLanguagedata={selectedValue => {
                                                if (selectedValue !== null) {
                                                  CallApiEditDropDown(
                                                    selectedValue,
                                                    index,
                                                  );
                                                }
                                              }}
                                            />
                                          </View>
                                        ) : null}
                                      </View>
                                    </View>
                                  )}
                                </CardView>
                              </View>
                            );
                          })}
                      </View>
                    );
                  })}
              </CardView>
            )}
          />
        ) : (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              // backgroundColor: '#979797'
            }}>
            {/* <Text style={{ color: '#7B7B7B', fontSize: 26, fontWeight: 'bold' }}>
              No School Available
            </Text> */}
          </View>
        )}

        <View style={{ marginLeft: 20, marginRight: 20, marginBottom: 30 }}>
          {setdatafromlist.length > 0 ? (
            <CustomButton
              title={'Send for verification'}
              onPress={gotoNavigate}
            //onPress={() => gotoNavigate}
            />
          ) : (
            <CustomButton title={'Send for verification'} />
          )}
          {/* <CustomButton title={'Confirm & Send for EI Verification'} onPress={() => props.navigation.navigate('Personalinfo')} /> */}
        </View>
      </View>
    </View>
  );
};
export default EIconfirmation;