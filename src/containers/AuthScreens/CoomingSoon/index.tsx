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
  TextInput,
  Keyboard,
} from 'react-native';
import styles from './style';
import {CustomCheckbox} from '../../../components';
import {Images} from '../../../components/index';
import OtpInputs from 'react-native-otp-inputs';
import {
  TextField,
  CustomButton,
  CustomStatusBar,
  BackBtn,
  CustomHeader,
} from '../../../components';
const screenWidth = Dimensions.get('window').width;
import {CheckBox} from 'react-native-elements';
import {Dropdown} from 'react-native-material-dropdown-v2';
interface CoomingSoonScreenProps {
  navigation: any;
}
import {RadioButton} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import * as userActions from '../../../actions/user-actions-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import CardView from 'react-native-cardview';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  NavigationContainer,
  useIsFocused,
  DrawerActions,
  useFocusEffect,
} from '@react-navigation/native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';

const data1 = [
  {
    id: 1,
    name: 'Mukesh Sharma',
    src: require('../../../assets/images/college1.jpg'),
    message:
      'Lorem Ipsum is simply dummy text of the printing and type setting industry.',
    msg_read: false,
    comment: false,
  },
  {
    id: 2,
    name: 'Prashant Chaudhary',
    src: require('../../../assets/images/college3.jpg'),
    time: 'Yesterday',
    profileImage: Images.profile_img2,
    message:
      'Lorem Ipsum is simply dummy text of the printing and type setting industry.',
    msg_read: true,
    comment: false,
  },
  {
    id: 3,
    name: 'Mukesh Sharma',
    time: 'Yesterday',
    src: require('../../../assets/images/college2.jpg'),
    profileImage: Images.profile_img2,
    message:
      'Lorem Ipsum is simply dummy text of the printing and type setting industry.',
    msg_read: true,
    comment: false,
  },
];

const CoomingSoon = (props: CoomingSoonScreenProps) => {
  const [password, setPassword] = useState('');
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const [unreadnotificationcount, set_unread_notification_count] = useState('');
  const [unreadremindercount, set_unread_reminder_count] = useState('');
  const [cityname, onChangecityname] = useState('');
  const [citydata, setCityData] = useState([]);
  const [userid, setUserid] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [is_kyc_approved, setIs_kyc_approved] = useState();
  const [is_approved, setis_approved] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible2, setModalVisible2] = useState(false);
  const [allSelected, setSelected] = useState(false);
  const [comment, showComment] = useState(false);
  useEffect(() => {
    //getEducationProfile();
    onChangecityname('');
    setCityData([]);

    getStepCountAPi();
    getAuthUserInfoApi();

    // getAuthUserInfoApi();
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, [isFocused]);

  const pressComment = () => {
    showComment(true);
  };
  const checkedterm = () => {
    setSelected(!allSelected);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleModal2 = () => {
    setModalVisible2(!isModalVisible2);
    setModalVisible('');
  };

  const Logout = async () => {
    setModalVisible('');
    setModalVisible('');
    Alert.alert(
      'ZatchUp',
      'Are you sure you want to unfollow?',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Yes'},
      ],
      {cancelable: false},
    );
    return true;
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
  // function handleBackButtonClick() {
  //   props.navigation.goBack();
  //   return true;
  // }

  const onBurgerBarPress = () => {
    props.navigation.dispatch(DrawerActions.toggleDrawer());
  };

  const getSearchcitydata = async value => {
    onChangecityname(value);

    if (value.length > 2) {
      getCity_Model_Search(value);
    } else if (value.length < 3) {
      setCityData([]);
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
        callback: ({result, error}) => {
          if (result) {
            console.warn(
              'after result Auth User INfo',
              JSON.stringify(result, undefined, 2),
              setUserid(result.user_id),
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

  /***************************User GET City Search Name list *******************************/

  const getCity_Model_Search = async value => {
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
      search: value,
    };
    setLoading(true);

    dispatch(
      userActions.getSearchSchoolStudentSearchList({
        data,

        callback: ({results, error}) => {
          console.warn(
            'after Search School Student result data',
            results,
            //  getdataProfile(result),
          );
          if (results && results.length > 0) {
            // setSpinnerStart(false);
            setCityData(results), setLoading(false);
          } else if (results && results.length == []) {
            setCityData([]);
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
            setIs_kyc_approved(result.is_kyc_approved);
            setis_approved(result.is_approved);
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

  const rednderItemListcitydata = (item, index) => {
    return (
      <CardView
        cardElevation={2}
        cardMaxElevation={2}
        cornerRadius={5}
        style={styles.Cardview_city}>
        {item.user_type == 'SCHOOL' ? (
          <View
            style={{
              paddingHorizontal: 14,
              paddingVertical: 10,
              backgroundColor: 'white',
              alignItems: 'center',
              flex: 1,
              width: '100%',

              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              underlayColor="none"
              onPress={() =>
                props.navigation.navigate('SearchSchoolDetail', {
                  school_id: item.school_id,
                })
              }>
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={{uri: item.profile_pic}}
                  // source={require('../../../assets/images/pic.jpeg')}
                  style={{
                    // marginLeft: 10,
                    width: 35,
                    height: 35,
                    borderRadius: 50,
                  }}
                />
                <View style={{marginLeft: 10, justifyContent: 'center'}}>
                  <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
                    {item.display}
                  </Text>
                  <Text style={{textAlign: 'center'}}>{item.zatchupId}</Text>
                </View>
              </View>
            </TouchableOpacity>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Text style={{}}>{item.city}</Text>
              <Image
                //source={{ uri: item.profile_pic }}
                source={Images.school}
                style={{
                  marginLeft: 15,
                  width: 20,
                  height: 20,
                  // borderRadius: 50,
                }}
              />
            </View>
          </View>
        ) : userid == item.id ? (
          <View
            style={{
              paddingHorizontal: 16,
              paddingVertical: 10,
              backgroundColor: 'white',
              alignItems: 'center',
              flex: 1,
              width: '90%',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              underlayColor="none"
              onPress={() =>
                props.navigation.navigate('ProfileScreen', {user_id: item.id})
              }>
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={Images.profile_default}
                  // source={require('../../../assets/images/pic.jpeg')}
                  style={{
                    // marginLeft: 10,
                    width: 35,
                    height: 35,
                    borderRadius: 50,
                  }}
                />
                <View style={{marginLeft: 10, justifyContent: 'center'}}>
                  <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
                    {item.display}
                  </Text>
                  <Text>You</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={{
              paddingHorizontal: 16,
              paddingVertical: 10,
              backgroundColor: 'white',
              alignItems: 'center',
              flex: 1,
              width: '90%',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              underlayColor="none"
              onPress={() =>
                props.navigation.navigate('ProfileScreen', {user_id: item.id})
              }>
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={Images.profile_default}
                  // source={require('../../../assets/images/pic.jpeg')}
                  style={{
                    // marginLeft: 10,
                    width: 35,
                    height: 35,
                    borderRadius: 50,
                  }}
                />
                <View style={{marginLeft: 10, justifyContent: 'center'}}>
                  <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
                    {item.display}
                  </Text>
                  <Text>School Mate</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </CardView>
    );
  };
  return (
    <View style={styles.container}>
      {/* <CustomStatusBar /> */}

      {/* <CustomHeader Title={'School Information'} /> */}

      <View style={styles.child_view}>
        {is_kyc_approved == true && is_approved == true ? (
          <TouchableOpacity onPress={onBurgerBarPress}>
            <Image source={Images.menu_dash} style={styles.image_menu} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={onBurgerBarPress}>
            <Image
              source={Images.menu_dash}
              style={{marginLeft: 15, marginTop: 10, tintColor: '#FFFFFF'}}
            />
          </TouchableOpacity>
        )}

        {is_kyc_approved == true && is_approved == true ? (
          <View style={styles.tv_view}>
            {/* <Text style={styles.ZatchUp_tv}>Home</Text> */}
            {/* <Text style={styles.TM_tv}>TM</Text> */}
            <View
              style={{
                borderWidth: 1,
                //  height: hp('5'),
                marginVertical: hp('1'),
                borderColor: 'lightgrey',
                width: 215,
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 20,
                borderRadius: 5,
                backgroundColor: '#FFFFFF',
              }}>
              <Image
                source={Images.search}
                style={{marginLeft: 10, tintColor: '#000'}}
              />
              <TextInput
                //onChangeText={onChangeNumber}
                onChangeText={value => getSearchcitydata(value)}
                value={cityname}
                style={{color: '#000'}}
                placeholderTextColor="#000"
                placeholder="Search City"
                keyboardType="default"
              />
            </View>
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#FFFFFF',
                marginRight: 50,
                fontSize: 28,
                fontWeight: 'bold',
                bottom: 5,
              }}>
              {'Home'}
            </Text>
          </View>
        )}

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

      <View
        style={{
          position: 'absolute',
          top: isKeyboardVisible == true ? '14%' : '8%',
          bottom: 0,
        }}>
        {citydata.length > 0 ? (
          <FlatList
            data={citydata}
            // style={{ position:'absolute' }}
            // keyExtractor={item => item.id.toString()}
            // ItemSeparatorComponent={ItemSepratorcity}
            //  ItemSeparatorComponent={this.SeparatorComponent}
            renderItem={({item, index}) => rednderItemListcitydata(item, index)}
          />
        ) : null}
      </View>

      <View
        style={{
          flex: 1,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <FlatList
          style={{flex: 1, width: '100%'}}
          data={data1}
          renderItem={({item}) => (
            <CardView
              cardElevation={5}
              cardMaxElevation={5}
              // cornerRadius={15}
              style={{
                // padding: 16,
                backgroundColor: 'white',
                marginHorizontal: 15,
                marginTop: 10,
                paddingBottom: 14,
                paddingTop: 10,
                marginBottom: 5,
              }}>
              <View style={styles.rowContainer}>
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate('UsersProfile');
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      source={require('../../../assets/images/pic.jpeg')}
                      style={styles.profilepic}
                    />
                    <Text style={{marginLeft: 20, fontWeight: 'bold'}}>
                      {item.name}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleModal}>
                  <Image
                    source={require('../../../assets/images/dot.png')}
                    style={{height: 18, width: 18}}
                  />
                </TouchableOpacity>
              </View>
              <View style={{paddingHorizontal: 16, marginTop: 10}}>
                <Image source={item.src} style={{width: '100%'}} />
              </View>
              <View style={styles.likecommentContainer}>
                <TouchableOpacity>
                  <Icon
                    name="thumbs-up"
                    size={15}
                    color="grey"
                    style={{marginLeft: 5}}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate('PostDetailScreen');
                  }}>
                  <Icon
                    name="comment"
                    color="grey"
                    size={15}
                    style={{marginLeft: 5}}
                    onPress={pressComment}
                  />
                </TouchableOpacity>
              </View>
              {/* reply comment Section */}
              <View
                style={{
                  marginLeft: 6,
                  paddingHorizontal: 16,
                  paddingVertical: 10,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate('ProfileScreen');
                  }}>
                  <Text>
                    Liked by <Text style={styles.boldText}>Harshit</Text> and
                    <Text style={styles.boldText}> Others</Text>
                  </Text>
                </TouchableOpacity>
                <View style={styles.messageContainer}>
                  <View style={{flexDirection: 'row', flex: 1}}>
                    <Text style={{fontWeight: 'bold', flex: 1}}>
                      Kunal Pandya
                    </Text>
                    <Text style={{marginLeft: 5, flex: 2}}>Hii</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        props.navigation.navigate('PostDetailScreen');
                      }}>
                      <Icon
                        name="thumbs-up"
                        size={15}
                        color="grey"
                        style={{marginLeft: 5}}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                {/*end of reply comment Section */}
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate('PostDetailScreen');
                  }}>
                  <Text style={{fontSize: 12, marginTop: 10}}>
                    VIEW ALL 4 COMMENTS
                  </Text>
                </TouchableOpacity>
                <Text style={{fontSize: 12, marginTop: 10}}>1 Hour ago</Text>
              </View>
              {comment == true ? (
                <View>
                  <View style={styles.border}></View>
                  <View style={styles.rowContainer}>
                    <TextInput placeholder="Add a comment" />
                    <TouchableOpacity style={styles.postbtn}>
                      <Text style={{color: 'white'}}>Post</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View></View>
              )}
            </CardView>
          )}
          //  ItemSeparatorComponent={renderIndicator}
        />
        {/* modal1 */}
      </View>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        backdropOpacity={0.4}>
        <View
          style={{
            alignItems: 'center',
            backgroundColor: 'white',
            paddingVertical: 20,
            borderRadius: 5,
            justifyContent: 'center',
          }}>
          <TouchableOpacity onPress={toggleModal2}>
            <Text style={styles.btn}>Report</Text>
          </TouchableOpacity>
          <View style={styles.mborder}></View>
          <TouchableOpacity onPress={() => Logout()}>
            <Text style={styles.btn}>Unfollow</Text>
          </TouchableOpacity>
          <View style={styles.mborder}></View>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('PostDetailScreen');
            }}>
            <Text style={[styles.btn, {color: 'black'}]}>Go to Post</Text>
          </TouchableOpacity>
          <View style={styles.mborder}></View>
          <TouchableOpacity onPress={toggleModal}>
            <Text style={[styles.btn, {color: 'rgb(70,50,103)'}]}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      {/* modal2 */}
      <Modal
        isVisible={isModalVisible2}
        onBackdropPress={toggleModal2}
        backdropOpacity={0.4}>
        <View style={styles.modalContainer}>
          <View style={[styles.rowContent, {paddingHorizontal: 16}]}>
            <TouchableOpacity>
              <Text
                style={{
                  color: 'black',
                  fontWeight: 'bold',
                  fontSize: hp(2.4),
                }}>
                Report
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleModal2}>
              <Image
                source={Images.closeicon}
                style={{height: 15, width: 15, marginRight: 10}}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.mborder}></View>
          <View style={{paddingHorizontal: 16}}>
            <Text style={{fontSize: hp(2.4)}}>Why are you reporting this?</Text>
            <View style={styles.rowContent}>
              <Text style={styles.reporttext}>Suspicious or Fake</Text>
              <CustomCheckbox onPress={checkedterm} checked={allSelected} />
            </View>
            <View style={styles.rowContent}>
              <Text style={styles.reporttext}>
                Harassment or hateful speech
              </Text>
              <CustomCheckbox
                onPress={checkedterm}
                // checked={allSelected}
              />
            </View>
            <View style={styles.rowContent}>
              <Text style={styles.reporttext}>Violence or physical harm</Text>
              <CustomCheckbox
                onPress={checkedterm}
                // checked={allSelected}
              />
            </View>
            <View style={styles.rowContent}>
              <Text style={styles.reporttext}>Adult Content</Text>
              <CustomCheckbox
                onPress={checkedterm}
                //  checked={allSelected}
              />
            </View>
            <View style={styles.rowContent}>
              <Text style={styles.reporttext}>
                Intellectual property infringement or defamation
              </Text>
              <CustomCheckbox
                onPress={checkedterm}
                // checked={allSelected}
              />
            </View>
          </View>
          <View style={styles.mborder}></View>
          <View
            style={{alignItems: 'flex-end', marginTop: 10, marginRight: 10}}>
            <TouchableOpacity style={styles.postbtn}>
              <Text style={{color: 'white'}}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CoomingSoon;
