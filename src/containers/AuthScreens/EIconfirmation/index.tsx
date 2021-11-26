import React, {useState, useEffect} from 'react';
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
} from 'react-native';
import styles from './style';
import {Images} from '../../../components/index';
import {
  TextField,
  CustomButton,
  CustomStatusBar,
  BackBtn,
  ModelComponent,
  CustomHeader,
  CustomDropdown,
} from '../../../components';
const screenWidth = Dimensions.get('window').width;
import {CheckBox} from 'react-native-elements';
import {RadioButton} from 'react-native-paper';
import CardView from 'react-native-cardview';
import {useDispatch, useSelector} from 'react-redux';
import * as userActions from '../../../actions/user-actions-types';
import Toast from 'react-native-simple-toast';
import ProgressLoader from 'rn-progress-loader';
import {NavigationContainer, useIsFocused} from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  const [KYC_type_doc_Selected, setKYCSelected] = useState('');

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

  const dispatch = useDispatch();

  {
    checked === 'first'
      ? props.navigation.navigate('CurrentSchoolinfo', {data: true})
      : checked === 'second'
      ? props.navigation.navigate('CurrentSchoolinfo', {data: false})
      : null;
  }

  const DATA = [
    {
      id: 547,
      school_code: 'KERALA001630',
      name_of_school: 'Kerala Junior Public School',
      state: 'KERALA',
      city: 'Alappuzha',
      address1: 'Kerala Road One',
      address2: 'Kerala Road Two',
      university: 'CBSE',
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
          style={{justifyContent: 'center', alignItems: 'center', flex: 1}}
          color={'white'}
        />
      </View>
    );
  };

  const [date, setDate] = useState(new Date());
  const [date_copy, setDate_Copy] = useState('');
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    if (event.type == 'set') {
      //ok button
      setDate(currentDate);
    } else {
      //cancel Button
      return null;
    }
    //  setDate(currentDate);
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();
    //  console.log('A date has been picked: ' + day + '-' + month + '-' + year);
    //setDate_Copy(year + '-' + month + '-'  + day);

    var MyDateString =
      currentDate.getFullYear() +
      '-' +
      ('0' + (currentDate.getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + currentDate.getDate()).slice(-2);
    //  console.log('A date has been picked: ' + day + '-' + month + '-' + year);
    setDate_Copy(MyDateString);

    // YYYY-MM-DD
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  useEffect(() => {
    getEicourseconfirmationlist();
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
    // getStepCountAPi()
  }, [isFocused]);

  // function handleBackButtonClick() {
  //     props.navigation.goBack();
  //     return true;
  // }

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
        {text: 'Yes', onPress: () => BackHandler.exitApp()},
      ],
      {cancelable: false},
    );
    return true;
  }

  const getdataCourseKey = async result => {
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
    setDataCourseInList(result.data);
    setKey(true);
    // console.log('dsfsdfds----------------------------->>>>>>>', state)
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
    };
    dispatch(
      userActions.getRegStepCount({
        data,
        callback: ({result, error}) => {
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
        callback: ({result, error}) => {
          if (result) {
            console.warn(
              'after result',
              JSON.stringify(result, undefined, 2),

              //  getdataCourseKey(result)
              getEicourseconfirmationlist(),

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

        callback: ({result, error}) => {
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

  const ItemSeprator = () => (
    <View
      style={{
        height: 2,
        width: '100%',
        //  backgroundColor: "rgba(0,0,0,0.5)",
      }}
    />
  );
  // const checkedterm = () => {
  //    // setSelected(!allSelected)
  //     setChecked('first')
  //    // setChecked('second')
  //    props.navigation.navigate('CurrentSchoolinfo') ;

  // }

  // const checkedtermsecond = () => {
  //   //  setSelected(!allSelected)
  //    // setChecked('first')
  //     setChecked('second')
  //     props.navigation.navigate('CurrentSchoolinfo');

  // }
  return (
    <View style={styles.container}>
      <CustomStatusBar />

      {isLoading && renderIndicator()}

      <CustomHeader Title={'School Confirmation'} />

      {/*   <View style={styles.backbtnCss}><BackBtn navigation={this.props.navigation} /></View> */}

      <View style={styles.inputContainer}>
        {setdatafromlist.length > 0 ? (
          <FlatList
            data={setdatafromlist}
            // keyExtractor={item => item.id.toString()}
            ItemSeparatorComponent={ItemSeprator}
            //  ItemSeparatorComponent={this.SeparatorComponent}
            renderItem={({item, index}) => (
              <CardView
                cardElevation={1}
                cardMaxElevation={1}
                cornerRadius={10}
                style={styles.Cardview}>
                <View style={styles.view_Rowbg}>
                  <Text style={styles.Personal_Tvheader}>School Details</Text>
                </View>
                <View style={styles.view_Rowzatchup}>
                  <Text style={styles.view_Tv_1}>ZatchUp ID :</Text>
                  <Text style={styles.view_Tv_2}>
                    {item.ei_detail.school_code}
                  </Text>

                  <TouchableOpacity
                    underlayColor="none"
                    onPress={() => Coursedelete(item.ei_detail.id)}>
                    <Image
                      style={{
                        height: 30,
                        width: 30,

                        marginLeft: 20,
                        marginRight: 5,
                      }}
                      source={Images.delete}
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.view_Row}>
                  <Text style={styles.view_Tv_1}>State :</Text>
                  <Text style={styles.view_Tv_2}>{item.ei_detail.state}</Text>
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
                                  })
                                : props.navigation.navigate(
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
                                    },
                                  );
                            }}>
                            <Image
                              style={styles.editicon}
                              source={Images.edit_icon}
                            />
                          </TouchableHighlight>
                        </View>
                        <View style={styles.view_Row_}>
                          <Text style={styles.view_Tv_1}>Course Name :</Text>
                          <Text style={styles.view_Tv_2}>{i.course_name}</Text>
                        </View>

                        <View style={styles.view_Row_}>
                          <Text style={styles.view_Tv_1}>
                            Course Duration :
                          </Text>
                          <Text style={styles.view_Tv_2}>{i.duration}</Text>
                        </View>

                        <View style={{flexDirection: 'row'}}>
                          <View style={styles.view_Row_}>
                            <Text style={styles.view_Tv_1}>
                              Starting Year :
                            </Text>
                            <Text style={styles.view_Tv_2}>{i.start_year}</Text>
                          </View>
                        </View>

                        {i.is_current_course == false ? (
                          <View
                            style={{
                              flexDirection: 'row',
                              marginTop: 5,
                              marginBottom: 7,
                            }}>
                            <Text style={styles.view_Tv_1}>Ending Year :</Text>
                            <Text style={styles.view_Tv_2}>{i.end_year}</Text>
                          </View>
                        ) : (
                          <View
                            style={{
                              flexDirection: 'row',
                              marginTop: 5,
                              marginBottom: 7,
                            }}>
                            <Text style={styles.view_Tv_1}>Ending Year :</Text>
                            <Text style={styles.view_Tv_2}>{'To Current'}</Text>
                          </View>
                        )}
                        {/* i.standard_detail != '' || 'null' || null || undefined   &&   */}

                        {i.standard_detail &&
                          i.standard_detail.map(standarad_i => {
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
                                    Standard Details
                                  </Text>

                                  <TouchableHighlight>
                                    {/* <Image
                                      style={styles.editicon}
                                      source={Images.edit_icon}
                                    /> */}
                                  </TouchableHighlight>
                                </View>

                                <View
                                  style={{
                                    flexDirection: 'column',
                                    marginRight: 10,
                                    marginTop: 5,
                                  }}>
                                  <View
                                    style={{
                                      flexDirection: 'row',
                                      marginVertical: 5,
                                      alignItems: 'center',
                                    }}>
                                    <Text style={styles.view_Tv_1_copy}>
                                      Standard :
                                    </Text>
                                    <Text style={styles.view_Tv_2}>
                                      {standarad_i.standard_name}
                                    </Text>
                                    <Image
                                      style={styles.editicon}
                                      source={Images.edit_icon}
                                    />
                                  </View>

                                  <View style={{}}>
                                    <View style={styles.view_Row_}>
                                      <Text style={styles.view_Tv_1_copy}>
                                        Starting Year :
                                      </Text>
                                      <Text style={styles.view_Tv_2}>
                                        {standarad_i.standard_start_year}
                                      </Text>
                                      <TouchableOpacity
                                        onPress={showDatepicker}>
                                        <View style={{width: 130}}>
                                          <TextField
                                            placeholder={
                                              standarad_i.standard_start_year
                                            }
                                            imageIcon={Images.calendar_icon}
                                            editable={false}
                                            value={date_copy.toString()}
                                          />
                                        </View>
                                      </TouchableOpacity>

                                      <View>
                                        {/* <View>
              <Button onPress={showDatepicker} title="Show date picker!" />
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
                                      </View>
                                    </View>
                                  </View>

                                  {standarad_i.is_current_standard == false ? (
                                    <View style={styles.view_Row_}>
                                      <Text style={styles.view_Tv_1_copy}>
                                        Ending Year :
                                      </Text>
                                      <Text style={styles.view_Tv_2}>
                                        {standarad_i.standard_end_year}
                                      </Text>
                                    </View>
                                  ) : (
                                    <View style={styles.view_Row_}>
                                      <Text style={styles.view_Tv_1_copy}>
                                        Ending Year :
                                      </Text>
                                      <Text style={styles.view_Tv_2}>
                                        {'To Current'}
                                      </Text>
                                      <TouchableOpacity
                                        onPress={showDatepicker}>
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
                                        {/* <View>
              <Button onPress={showDatepicker} title="Show date picker!" />
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
                                      </View>
                                    </View>
                                  )}
                                  {standarad_i.is_current_standard == true ? (
                                    <View>
                                      {standarad_i.class_detail.map(class_i => {
                                        return (
                                          <View style={styles.view_Row_}>
                                            <Text style={styles.view_Tv_1_copy}>
                                              Section :
                                            </Text>
                                            <Text style={styles.view_Tv_2}>
                                              {class_i.class_name}
                                            </Text>
                                            <View
                                              style={{
                                                width: 145,

                                                alignSelf: 'center',
                                                marginTop: -10,
                                              }}>
                                              <CustomDropdown
                                                placeholder={class_i.class_name}
                                                data={KYC_type_doc}
                                                selectedValue={
                                                  KYC_type_doc_Selected
                                                }
                                                SelectedLanguagedata={(
                                                  selectedValue: any,
                                                ) => {}}
                                              />
                                            </View>
                                          </View>
                                        );
                                      })}
                                    </View>
                                  ) : (
                                    <View style={styles.view_Row_Copy}>
                                      <Text style={styles.view_Tv_1_copy}>
                                        Section :
                                      </Text>
                                      <Text style={styles.view_Tv_2}>{''}</Text>
                                    </View>
                                  )}
                                </View>
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
              //  backgroundColor: '#979797'
            }}>
            <Text style={{color: '#7B7B7B', fontSize: 26, fontWeight: 'bold'}}>
              No School Available
            </Text>
          </View>
        )}

        {/* <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 1, width: '100%',marginLeft: 20, marginRight: 20, }}>
                    <View style={{ flexDirection: 'row', width: '50%',alignContent:'center' }}>
                        <RadioButton underlayColor='none' value="first"
                            status={checked === 'first' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('first')} />
                        <Text style={{ marginTop: 8, fontSize: 12 ,}}>Add Current education</Text>

                    </View>
                    <View style={{ flexDirection: 'row', width: '50%',alignContent:'center'  }}>
                        <RadioButton underlayColor='none' value="second"
                            status={checked === 'second' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('second')}
                        />
                        <Text style={{ marginTop: 8, fontSize: 12, flex:1,flexWrap:'wrap'}}>Add Past education</Text>

                    </View>
                </View> */}

        <View style={{marginLeft: 20, marginRight: 20, marginBottom: 30}}>
          {setdatafromlist.length > 0 ? (
            <CustomButton
              title={'Send for verification'}
              onPress={() => props.navigation.navigate('Personalinfo')}
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
