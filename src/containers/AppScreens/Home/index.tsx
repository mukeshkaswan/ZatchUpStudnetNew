import React, {useState, useEffect} from 'react';
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
} from 'react-native';
import styles from './style';
import {Images} from '../../../components/index';
import {TextField, CustomButton, CustomStatusBar} from '../../../components';
import {useDispatch, useSelector} from 'react-redux';
import * as userActions from '../../../actions/user-actions-types';
import Toast from 'react-native-simple-toast';
import CardView from 'react-native-cardview';
import ProgressLoader from 'rn-progress-loader';
import {
  NavigationContainer,
  useIsFocused,
  DrawerActions,
} from '@react-navigation/native';
import {Card} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScrollView} from 'react-native-gesture-handler';
import {Icon} from 'react-native-elements';

const screenWidth = Dimensions.get('window').width;

interface HomeScreenProps {
  navigation: any;
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
  const [unreadnotificationcount, set_unread_notification_count] = useState('');
  const [unreadremindercount, set_unread_reminder_count] = useState('');
  const [setdatafromlist, setDataCourseInList] = useState([]);

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

  useEffect(() => {
    getEducationProfile();
    getStepCountAPi();

    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, [isFocused]);

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

  const onBurgerBarPress = () => {
    props.navigation.dispatch(DrawerActions.toggleDrawer());
  };

  const getdataCourse = async result => {
    setDataCourseInList(result.data);
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
        callback: ({result, error}) => {
          if (result) {
            console.warn(
              'after result step count',
              JSON.stringify(result, undefined, 2),
              //  props.navigation.navigate('OtpLogin', { 'firebase_id': result.firebase_username, 'username': email })
            );
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

        callback: ({result, error}) => {
          if (result.status === true) {
            console.warn(
              'after result',
              JSON.stringify(result, undefined, 2),

              getdataProfile(result),
              getdataCourse(result),
            );
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
                <View style={styles.view_Rowbg}>
                  <Text style={styles.Personal_Tvheader}>School Details</Text>
                  {/* <Image
                  style={styles.editicon1}
                  source={Images.delete}
                /> */}
                </View>
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
                  <View style={styles.view_Row}>
                    <Text style={styles.view_Tv_1}>ZatchUp ID :</Text>
                    <Text style={styles.view_Tv_2}>{i.school_code}</Text>
                  </View>

                  <View style={styles.view_Row}>
                    <Text style={styles.view_Tv_1}>State :</Text>
                    <Text style={styles.view_Tv_2}>{i.state}</Text>
                  </View>
                  <View style={styles.view_Row}>
                    <Text style={styles.view_Tv_1}>City :</Text>
                    <Text style={styles.view_Tv_2}>{i.city}</Text>
                  </View>

                  <View style={styles.view_Row}>
                    <Text style={styles.view_Tv_1}>School Address :</Text>
                    <Text style={styles.view_Tv_2}>
                      {i.address1 + ' ' + i.address2}
                    </Text>
                  </View>

                  <View style={styles.view_Row}>
                    <Text style={styles.view_Tv_1}>
                      School Admission Number :
                    </Text>
                    <Text style={styles.view_Tv_2}>{i.admission_number}</Text>
                  </View>
                </View>

                <View style={styles.underview} />

                {i.course_detail &&
                  i.course_detail.map(course => {
                    return (
                      <View>
                        <View style={styles.view_Row}>
                          <Text style={styles.Personal_Tv}>Course Details</Text>
                          <TouchableOpacity>
                            <Image
                              style={styles.editicon1}
                              source={Images.edit_icon}
                            />
                          </TouchableOpacity>
                        </View>
                        <View style={styles.underview} />
                        <View style={styles.view_Row}>
                          <Text style={styles.view_Tv_1}>Name of Course :</Text>
                          <Text style={styles.view_Tv_2}>
                            {course.course_name}
                          </Text>
                        </View>

                        {course.is_current_course == true ? (
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
                        )}

                        <View style={styles.view_Row}>
                          <Text style={styles.view_Tv_1}>Course Tenure :</Text>
                          <Text style={styles.view_Tv_2}>
                            {course.duration}
                          </Text>
                        </View>

                        <View style={styles.underview} />

                        {course.standard_detail &&
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

                                {standard.class_detail &&
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
                                            <Text style={styles.view_Tv_2}>
                                              {class_i.roll_no}
                                            </Text>
                                          </View>
                                        </View>
                                      );
                                    })}
                                  </View>
                                ) : (
                                  <View>
                                    <View style={styles.view_Row}>
                                      <Text style={styles.view_Tv_1}>
                                        Class (Sub-Section) :
                                      </Text>
                                      <Text style={styles.view_Tv_2}>{''}</Text>
                                    </View>

                                    <View style={styles.view_Row}>
                                      <Text style={styles.view_Tv_1}>
                                        Roll Number :
                                      </Text>
                                      <Text style={styles.view_Tv_2}>{''}</Text>
                                    </View>
                                  </View>
                                )}

                                <View style={styles.underview} />
                              </View>
                            );
                          })}
                      </View>
                    );
                  })}
              </CardView>
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
      {/* <CustomStatusBar /> */}
      {isLoading && renderIndicator()}

      <View style={styles.child_view}>
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
      </View>
      <ScrollView>
        <View style={styles.overlay}>
          <View>
            <View style={styles.avatarStyle}>
              <Image
                source={{uri: profilepic}}
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
                    style={{height: '100%', width: '100%', resizeMode: 'cover'}}
                  />
                </View>
              ) : null}
            </View>
          </View>
          <Text style={styles.textStyle}>{username}</Text>
          <Text style={styles.textStyle_}>
            {'Unique ZatchUp ID' + ':' + zatchupid}
          </Text>
        </View>

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

          {/* <CardView
          cardElevation={5}
          cardMaxElevation={5}
          cornerRadius={10}
          style={styles.Cardview}>

          <Text style={styles.Personal_Tv}>Add Your Location</Text>
          <View
            style={styles.underview}
          />
          <View style={styles.view_Row_}>
            <Text style={styles.view_Tv_1}>Delhi Public School</Text>
            <Image
              style={{ marginLeft: 10, marginTop: 5 }}
              source={Images.verfied}
            />
          </View> */}

          {/* <CardView
            cardElevation={5}
            cardMaxElevation={5}
            cornerRadius={10}
            style={styles.Cardview}>


            <View style={styles.view_Row}>
              <Text style={styles.Personal_Tv}>Add Your Location</Text>
              <Image
                style={styles.editicon1}
                source={Images.edit_icon}
              />
            </View>
            <View
              style={styles.underview}
            />
            <View style={styles.view_Row_}>
              <Text style={styles.view_Tv_1}>City :</Text>
              <Text style={styles.view_Tv_2}>{city}</Text>
            </View>

            <View style={styles.view_Row_Child}>
              <Text style={styles.view_Tv_1}>State :</Text>
              <Text style={styles.view_Tv_2}>{state}</Text>
            </View>


            <View
              style={styles.underview}
            />
          </CardView> */}

          <FlatList
            data={setdatafromlist}
            // keyExtractor={item => item.id.toString()}
            ItemSeparatorComponent={ItemSeprator}
            //  ItemSeparatorComponent={this.SeparatorComponent}
            renderItem={({item, index}) => rednderItemList(item, index)}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
