import React, { Component, FC, useState, useEffect } from 'react';
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
} from 'react-native';
import styles from './style';
import {
  TextField,
  CustomButton,
  CustomStatusBar,
  Validate,
  CustomHeader,
  BackBtn,
  HeaderTitleWithBack,
} from '../../../components';
import { Images } from '../../../components/index';
import Toast from 'react-native-simple-toast';
import { useDispatch, useSelector } from 'react-redux';
import * as userActions from '../../../actions/user-actions-types';
import ProgressLoader from 'rn-progress-loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import style from '../Messages/style';
import CardView from 'react-native-cardview';
import images from '../../../components/images';
import {
  NavigationContainer,
  useIsFocused,
  DrawerActions,
  useFocusEffect
} from '@react-navigation/native';
const data = [
  {
    id: 1,
    titleofcourse: 'Science',
    courseid: 'SCHRFAR003132COURSE5004',

    levelofeducation: 'Post Graduate',
  },
  {
    id: 2,
    titleofcourse: 'Science',
    courseid: 'SCHRFAR003132COURSE5004',

    levelofeducation: 'Post Graduate',
  },

  {
    id: 3,
    titleofcourse: 'Science',
    courseid: 'SCHRFAR003132COURSE5004',

    levelofeducation: 'Post Graduate',
  },

  {
    id: 4,
    titleofcourse: 'Science',
    courseid: 'SCHRFAR003132COURSE5004',

    levelofeducation: 'Post Graduate',
  },
];

interface PendingRequestScreenProps {
  navigation: any;
}

const PendingRequestScreen = (props: PendingRequestScreenProps) => {

  const isFocused = useIsFocused();
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [dataekyc, setDataeKYC] = useState([]);


  function handleBackBut() {
    props.navigation.goBack();
    return true;
  }

  useEffect(() => {

    getPendingListData();
    geteKycListData();



  }, [isFocused]);



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

  const backPressed = () => {
    props.navigation.goBack(null);
    return true;
  };

  const Delete = async id => {
    Alert.alert(
      'Delete Request',
      'Are you sure you want to delete this request.',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'Yes', onPress: () => Deleterequest(id) },
      ],
      { cancelable: false },
    );
    return true;
  };


  const DeleteKYCRequest = async id => {
    Alert.alert(
      'Delete Request',
      'Are you sure you want to delete this request.',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'Yes', onPress: () => DeleterequesteKYC(id) },
      ],
      { cancelable: false },
    );
    return true;
  };


   /***************************User get Delete Request list*******************************/

   const DeleterequesteKYC = async id => {
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
      id: id,
      type: "kyc",

    };
    setLoading(true);

    dispatch(
      userActions.getDeletePendingUserRequest({
        data,
        callback: ({ result, error }) => {
          if (result) {
            setLoading(false);
            // console.warn(
            //   'after result',
            //   JSON.stringify(result, undefined, 2),
            //   // getdataCourseKey(result)
            //   // getEicourseconfirmationlist(),

            geteKycListData()

            //   // props.navigation.navigate('SelectStudent'),
            // );
            Toast.show('Request Deleted Successfully', Toast.SHORT)
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


  /***************************User get Delete Request list*******************************/

  const Deleterequest = async id => {
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
      id: id,
      type: "user",

    };
    setLoading(true);

    dispatch(
      userActions.getDeletePendingUserRequest({
        data,
        callback: ({ result, error }) => {
          if (result) {
            setLoading(false);
            // console.warn(
            //   'after result',
            //   JSON.stringify(result, undefined, 2),
            //   // getdataCourseKey(result)
            //   // getEicourseconfirmationlist(),

            getPendingListData()

            //   // props.navigation.navigate('SelectStudent'),
            // );
            Toast.show('Request Deleted Successfully', Toast.SHORT)
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

  /***************************User GET Pending user change detail list Data*******************************/

  const getPendingListData = async () => {
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
      // id: 1085,

    };
    setLoading(true);

    dispatch(
      userActions.getPendinguserchangedetaillist({
        data,

        callback: ({ results, error }) => {
          if (results && results.length > 0) {
            setLoading(false);

            // setSpinnerStart(false);
            console.log('results ......', results);
            setData(results);

          }
          else if (results && results.length == []) {
            setData([]);

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



  /***************************User GET eKYC user change detail list Data*******************************/

  const geteKycListData = async () => {
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
      // id: 1085,

    };
    setLoading(true);

    dispatch(
      userActions.getUploadekycfordetailchnage({
        data,

        callback: ({ results, error }) => {
          if (results && results.length > 0) {
            setLoading(false);

            // setSpinnerStart(false);
            console.log('results ......eKYC', results);
            setDataeKYC(results);

          }
          else if (results && results.length == []) {
            setDataeKYC([]);

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


  return (
    <View style={styles.container}>
      {isLoading && renderIndicator()}

      <CustomStatusBar />
      <HeaderTitleWithBack
        navigation={props.navigation}
        headerTitle="Pending Requests"
      />

      {data.length > 0 ? <View style={{ marginTop: 10 }}>


        <Text style={styles.pendingtextt}>Pending Requests</Text>

        <View
        
          style={[styles.coursestextcontainer, { backgroundColor: 'lightgrey' }]}>
           
            
          <Text style={styles.snotext}>Field Name</Text>
          <Text style={styles.lecturetitletext}>Field Value</Text>
          <Text style={styles.topictext}>Field New Value</Text>
          <Text
            style={{
              flex: 1,
              marginHorizontal: 2,
              textAlign: 'center',
            }}>
            Delete
          </Text>

        </View>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <View
              style={[styles.coursestextcontainer, { backgroundColor: 'white' }]}>
              <Text style={styles.snotext}>{item.field_name}</Text>
              <Text style={styles.lecturetitletext}>{item.old_value}</Text>
              <Text style={styles.topictext}>{item.new_value}</Text>
              <TouchableOpacity
                underlayColor="none"
                onPress={() => Delete(item.id)}>
                <View style={{ flex: 1, alignItems: 'center' }}>
                  <Image
                    source={images.delete_icon}
                    style={{ height: 25, width: 25 }}
                  />
                </View>
              </TouchableOpacity>

            </View>
          )}
        />
      </View> : <View style={styles.boxcontainer}>
        <Text style={styles.pendingtext}>Pending Requests</Text>
        <View style={styles.mainbordercontainer}>
          <View style={styles.bordercontainer}>
            <Text style={{ fontSize: 16 }}>Records Not Available</Text>
          </View>
        </View>
      </View>}


      {dataekyc.length > 0 ? <View style={{ marginTop: 10 }}>

        <Text style={styles.pendingtextt}>Kyc Pending Requests</Text>

        <View
          style={[styles.coursestextcontainer, { backgroundColor: 'lightgrey' }]}>
          <Text style={styles.snotext}>Field Name</Text>
          <Text style={styles.lecturetitletext}>Old Value</Text>
          <Text style={styles.topictext}>New Value</Text>
          <Text
            style={{
              flex: 1,
              marginHorizontal: 2,
              textAlign: 'center',
            }}>
            Delete
          </Text>
        </View>
        <FlatList
          data={dataekyc}
          renderItem={({ item }) => (
            <View
              style={[styles.coursestextcontainer, { backgroundColor: 'white' }]}>
              <Text style={styles.snotext}>{item.field_name}</Text>
              <Text style={styles.lecturetitletext}>{item.old_value}</Text>
              <Text style={styles.topictext}>{item.new_value}</Text>
              <TouchableOpacity
                underlayColor="none"
                onPress={() => DeleteKYCRequest(item.id)}>
                <View style={{ flex: 1, alignItems: 'center' }}>
                  <Image
                    source={images.delete_icon}
                    style={{ height: 25, width: 25 }}
                  />
                </View>
              </TouchableOpacity>

            </View>
          )}
        />
      </View> : <View style={styles.boxcontainer}>
        <Text style={styles.pendingtext}>Pending Requests</Text>
        <View style={styles.mainbordercontainer}>
          <View style={styles.bordercontainer}>
            <Text style={{ fontSize: 16 }}>Records Not Available</Text>
          </View>
        </View>
      </View>}
    </View>
  );
};
export default PendingRequestScreen;