import React, {Component, FC, useState, useEffect} from 'react';
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
} from '@react-navigation/native';
import {Images} from '../../../components/index';
import Toast from 'react-native-simple-toast';
import {useDispatch, useSelector} from 'react-redux';
import * as userActions from '../../../actions/user-actions-types';
import ProgressLoader from 'rn-progress-loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import style from '../Messages/style';
import CardView from 'react-native-cardview';
import Modal from 'react-native-modal';
import {CheckBox} from 'react-native-elements';
import axios from 'axios';
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
  const [customgenderView, setcustomgenderView] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible2, setModalVisible2] = useState(false);

  const [number, onChangeNumber] = React.useState(null);

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
  };

  const checkedFemale = () => {
    setFemale(!Female);
    setCustom(false);
    setMale(false);
    setcustomgenderView(false);
    setGenderForModal('F');
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
  const toggleSwitch1 = () => {
    setIsEnabled(previousState => !previousState);
  };
  const toggleSwitch2 = () => {
    setIsEnabled2(previousState => !previousState);
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
          style={{justifyContent: 'center', alignItems: 'center', flex: 1}}
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
        {text: 'Yes', onPress: onDeleteBTN},
      ],
      {cancelable: false},
    );
    return true;
  }

  // useEffect(() => {
  //   BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
  //   getEducationProfile();
  //   return () => {
  //     BackHandler.removeEventListener(
  //       'hardwareBackPress',
  //       handleBackButtonClick,
  //     );
  //     getEducationProfile();
  //   };
  // }, []);
  useEffect(() => {
    getEducationProfile();
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, [isFocused]);

  const dispatch = useDispatch();

  //console.log("this.props",this.props);

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

  /***************************User GET Education Profile list *******************************/

  const getEducationProfile = async () => {
    //  Alert.alert('hey');
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
      .get('http://172.105.61.231:3000/api/user/student-education-profile/', {
        headers: {
          Authorization: `Bearer ${token}`,
          'content-type': 'multipart/form-data',
        },
      })
      .then(({data}) => {
        console.log('Data==>>', data);
        //   Alert.alert('hey...');
        if (data.status) {
          console.warn(
            'after setting call api',
            JSON.stringify(data, undefined, 2),

            getdataProfile(data),
            getdataCourse(data),
          );
          setLoading(false);
          // setSpinnerStart(false);
        }
      })
      .catch(error => {
        console.log(error);
      });

    dispatch(
      userActions.getStudentEducationProfile({
        data,
        callback: ({result, error}) => {
          console.log('hey.......kamal');
          if (result.status) {
            console.warn(
              'after setting call api',
              JSON.stringify(result, undefined, 2),

              getdataProfile(result),
              getdataCourse(result),
            );
            setLoading(false);
            // setSpinnerStart(false);
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
      KYC_type_doc_Selected == 0
        ? 'He'
        : KYC_type_doc_Selected == 1
        ? 'She'
        : 'They';
    const data = {
      token: token,
      father_name: newfathername,
      mother_name: newmothername,
      pronoun: GenderForModal == 'M' || GenderForModal == 'F' ? '' : key,
      gender:
        GenderForModal == 'M' || GenderForModal == 'F' ? GenderForModal : 'C',
      profile_pic: profilepic,
      custom_gender:
        GenderForModal == 'M' || GenderForModal == 'F' ? '' : CustomGender,
    };

    // console.log('data====>>>', data);
    // return;

    setLoading(true);

    dispatch(
      userActions.updatePersonalinfo({
        data,
        callback: ({result, error}) => {
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
    // }
  };

  const rednderItemList = (item, index) => {
    return (
      <>
        {item.educationdetail.length > 0 &&
          item.educationdetail.map(i => {
            return (
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
                    <TouchableOpacity onPress={toggleModal}>
                      <Image source={Images.edit_icon} style={styles.addicon} />
                    </TouchableOpacity>
                    {/* Modal */}
                  </View>

                  <View style={styles.border}></View>
                  <View style={{marginTop: 15}}>
                    <View style={styles.text_container}>
                      <Text style={styles.detail_text}>Name : </Text>
                      <Text>{username}</Text>
                    </View>
                    <View style={styles.text_container}>
                      <Text style={styles.detail_text}>DOB : </Text>
                      <Text>{dob}</Text>
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
                    ) : (
                      <View style={styles.text_container}>
                        <Text style={styles.detail_text}>Gender : </Text>
                        <Text>Custom</Text>
                      </View>
                    )}
                    <View style={styles.text_container}>
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
                    </View>
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
                  style={styles.card}>
                  <Text style={styles.title_text}>Privacy Setting</Text>

                  <View style={styles.border}></View>
                  <View style={styles.privacyrowcontainer}>
                    {phone == '' ? (
                      <>
                        <Text style={styles.detail_text}>Email : </Text>
                        <Text style={{textAlign: 'center'}}>{email}</Text>
                      </>
                    ) : (
                      <>
                        <Text style={styles.detail_text}>Mobile Number : </Text>
                        <Text style={{textAlign: 'center'}}>{phone}</Text>
                      </>
                    )}

                    <Switch
                      trackColor={{false: 'grey', true: 'lightgreen'}}
                      thumbColor={isEnabled ? 'limegreen' : 'lightgrey'}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={toggleSwitch1}
                      value={isEnabled}
                    />
                  </View>

                  <View style={styles.border1}></View>
                  <View style={styles.privacyrowcontainer}>
                    <Text style={styles.detail_text}>Date of Birth : </Text>
                    <Text style={{textAlign: 'center'}}>{dob}</Text>
                    <Switch
                      trackColor={{false: 'grey', true: 'lightgreen'}}
                      thumbColor={isEnabled2 ? 'limegreen' : 'lightgrey'}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={toggleSwitch2}
                      value={isEnabled2}
                    />
                  </View>
                  <View style={styles.border1}></View>
                  <View style={styles.privacyrowcontainer}>
                    {Gender == 'M' ? (
                      <>
                        <Text style={styles.detail_text}>Gender : </Text>
                        <Text style={{textAlign: 'center'}}>Male</Text>
                      </>
                    ) : Gender == 'F' ? (
                      <>
                        <Text style={styles.detail_text}>Gender : </Text>
                        <Text style={{textAlign: 'center'}}>Female</Text>
                      </>
                    ) : (
                      <>
                        <Text style={styles.detail_text}>Gender : </Text>
                        <Text style={{textAlign: 'center'}}>Custom</Text>
                      </>
                    )}

                    <Switch
                      trackColor={{false: 'grey', true: 'lightgreen'}}
                      thumbColor={isEnabled3 ? 'limegreen' : 'lightgrey'}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={toggleSwitch3}
                      value={isEnabled3}
                    />
                  </View>
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
                      style={{alignSelf: 'flex-end'}}>
                      <Image
                        source={Images.closeicon}
                        style={{height: 18, width: 18, marginRight: 10}}
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
                    <View style={styles.textinputcontainer}>
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
                    <View style={styles.textinputcontainer}>
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
                      <View style={{flex: 1}}>
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

                      <View style={{flex: 1}}>
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

                      <View style={{flex: 1}}>
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
                          textStyle={{color: '#33333380'}}
                          onPress={checkedCustom}
                        />
                      </View>
                    </View>
                    {customgenderView && (
                      <View style={{}}>
                        <View
                          style={{
                            marginBottom: '2%',
                          }}>
                          {/* label1="Select your pronoun" value1="0" label2="He" value2="1" label3="She" value3="2" selectedValue={pronoun} SelectedLanguagedata={(selectedValue) => setSelectpronoun(selectedValue)} */}

                          <CustomDropdown
                            placeholder={'Select your pronoun'}
                            data={KYC_type_doc}
                            selectedValue={KYC_type_doc}
                            SelectedLanguagedata={selectedValue =>
                              selectedValue
                            }
                          />
                        </View>

                        <View style={{marginBottom: '3%'}}>
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
                        height: hp('4.5'),
                        width: wp('40'),
                        backgroundColor: 'rgb(70,50,103)',
                        marginTop: 15,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 10,
                      }}>
                      <Text style={{color: 'white'}} onPress={onPressSubmit}>
                        Submit
                      </Text>
                    </TouchableOpacity>
                  </View>
                </Modal>
                {/* add mail and add number modal */}
                <Modal
                  isVisible={isModalVisible2}
                  onBackdropPress={toggleModal2}>
                  <View
                    style={{
                      height: hp('22'),
                      backgroundColor: Colors.$backgroundColor,
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingVertical: 20,
                      paddingHorizontal: 10,
                      borderRadius: 5,
                    }}>
                    <TouchableOpacity
                      onPress={toggleModal2}
                      style={{alignSelf: 'flex-end'}}>
                      <Image
                        source={Images.closeicon}
                        style={{height: 18, width: 18, marginRight: 10}}
                      />
                    </TouchableOpacity>

                    <Text style={styles.labeltext}>Email</Text>
                    <View style={styles.textinputcontainer}>
                      <TextInput
                        style={{paddingLeft: 10}}
                        onChangeText={onChangeNumber}
                        value={number}
                        placeholder="Add Email"
                        keyboardType="default"
                      />
                    </View>

                    <TouchableOpacity
                      style={{
                        height: hp('4.5'),
                        width: wp('40'),
                        backgroundColor: 'rgb(70,50,103)',
                        marginTop: 15,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 10,
                      }}>
                      <Text style={{color: 'white'}}>Submit</Text>
                    </TouchableOpacity>
                  </View>
                </Modal>
              </View>
            );
          })}
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

  return (
    <View style={styles.container}>
      <CustomStatusBar />
      <HeaderTitleWithBack
        navigation={props.navigation}
        headerTitle="Settings"
      />
      {isLoading && renderIndicator()}

      <FlatList
        data={setdatafromlist}
        // keyExtractor={item => item.id.toString()}
        ItemSeparatorComponent={ItemSeprator}
        //  ItemSeparatorComponent={this.SeparatorComponent}
        renderItem={({item, index}) => rednderItemList(item, index)}
      />
    </View>
  );
};
export default SettingScreen;
