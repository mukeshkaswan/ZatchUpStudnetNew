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

interface PendingRequestScreenProps {
  navigation: any;
  route:any;
}

const KYCEiRequestMultiple = (props: PendingRequestScreenProps) => {

  const isFocused = useIsFocused();
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [datakey, setData] = useState([]);
  const [dataekyc, setDataeKYC] = useState([]);


  function handleBackBut() {
    props.navigation.goBack();
    return true;
  }

  useEffect(() => {

    getSentforapproval();



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



  /***************************User GET Sent for approval view status list Data*******************************/

  const getSentforapproval = async () => {
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
      // id: 1085,

    };
    setLoading(true);

    dispatch(
      userActions.getSentforapprovalviewstatus({
        data,

        callback: ({ results, error }) => {
          if (results && results.length > 0) {
            setLoading(false);

            // setSpinnerStart(false);
            console.log('results Data', results);
            setData(results);

          }
          else if (results && results.length == []) {
            setData([]);
          }
          if (!error) {
            console.warn('gg', JSON.stringify(error, undefined, 2));
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


  /***************************User GET Logout View Status *******************************/

  const getLogoutView = async (school_id) => {


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
      userActions.getLogoutViewStatus({
        data,
        callback: ({ result, error }) => {
          if (result) {
            setLoading(false);

            console.warn(
              'after result Logout View Status',
              JSON.stringify(result, undefined, 2),
              //  getData_is_kyc_rejected(result),

              //  props.navigation.navigate('OtpLogin', { 'firebase_id': result.firebase_username, 'username': email })
            );
            props.navigation.navigate('KYCEiRequestSingle', { data: props.route.params.data, 're_verify': props.route.params.re_verify ,'KYCEiRequestMultiple':true,'school_id':school_id,'length':datakey.length});

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


  return (
    <View style={styles.container}>
      {isLoading && renderIndicator()}

      <CustomStatusBar />
      <HeaderTitleWithBack
        navigation={props.navigation}
        headerTitle="Sign Up Request"
      />

      {datakey.length > 0 ? <View style={{ }}>


        {/* <Text style={styles.pendingtextt}>Requests</Text> */}

        <View

          style={[styles.coursestextcontainer, { backgroundColor: 'lightgrey' }]}>

          <Text style={styles.snotext_}>S.No</Text>

          <Text style={styles.snotext}>Zatchup ID</Text>
          <Text style={styles.lecturetitletext}>School Name</Text>
          <Text
            style={{
              flex: 1,
              marginHorizontal: 2,
              textAlign: 'center',
            }}>
            Add School
          </Text>

        </View>
        <FlatList
          data={datakey}
          renderItem={({ item, index }) => (
            <View
              style={[styles.coursestextcontainer, { backgroundColor: '#F6F2F2', }]}>
              <Text style={styles.snotext_}>{index+1}</Text>
              <Text style={styles.snotext}>{item.status}</Text>
              <Text style={styles.lecturetitletext}>{item.school_name}</Text>
              <TouchableOpacity
                underlayColor="none"
                onPress={() => getLogoutView(item.school_id)}
              >
                <View style={{ flex: 1, alignItems: 'center' }}>
                  <Image
                    source={images.add}
                    style={{ height: 23, width: 23 , marginRight:10,marginTop:5
                    }}
                  />
                </View>
              </TouchableOpacity>

            </View>
          )}
        />
      </View> : <View style={styles.boxcontainer}>
        <Text style={styles.pendingtext}>Requests</Text>
        <View style={styles.mainbordercontainer}>
          <View style={styles.bordercontainer}>
            <Text style={{ fontSize: 16 }}>Records Not Available</Text>
          </View>
        </View>
      </View>}



    </View>
  );
};
export default KYCEiRequestMultiple;