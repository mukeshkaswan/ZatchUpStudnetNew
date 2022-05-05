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
  SafeAreaView
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
import moment from 'moment';


interface ResetPasswordScreenProps {
  navigation: any;
  route: any;
}

const PlayHistoryScreen = (props: ResetPasswordScreenProps) => {
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [lecturedata, setLectureData] = useState([]);
  const [getFlag, setFlag] = useState(false);


  function handleBackBut() {
    props.navigation.goBack();
    return true;
  }


  useEffect(() => {


    getCoursePreviewData(props.route.params.id);



  }, []);




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

  /***************************User GET  Start Class Course Lecture History Data*******************************/

  const getCoursePreviewData = async (id) => {
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
      id: id,

    };
    setLoading(true);

    dispatch(
      userActions.getLecturehistory({
        data,

        callback: ({ results, error }) => {
          if (results && results.length > 0) {
            setLoading(false);

            // setSpinnerStart(false);
            //  console.log('results Data Lecture history......', results);
            setFlag(true);
            setLectureData(results);

          }
          else if (results && results.length == []) {

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


  const backPressed = () => {
    props.navigation.goBack(null);
    return true;
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>

      <View style={styles.container}>
        {isLoading && renderIndicator()}

        <CustomStatusBar />
        <HeaderTitleWithBack
          navigation={props.navigation}
          headerTitle="Play History"
        />

        <View style={{ marginTop: 10 }}>
          {lecturedata.length > 0 ? <View
            style={[styles.coursestextcontainer, { backgroundColor: 'lightgrey' }]}>
            <Text style={styles.snotext}>S. No</Text>
            <Text style={styles.lecturetitletext}>Course Title</Text>
            <Text style={styles.topictext}>Lecture Title </Text>
            <Text
              style={{
                flex: 1.2,
                marginHorizontal: 2,
                textAlign: 'center',
              }}>
              Play Timing
            </Text>
          </View> : null}
          {lecturedata.length > 0 ? (<FlatList
            data={lecturedata}
            renderItem={({ item, index }) => (
              <View
                style={[styles.coursestextcontainer, { backgroundColor: 'white' }]}>
                <Text style={styles.snotext}> {index + 1}</Text>
                <Text style={styles.lecturetitletext}>
                  {item.course_name}
                </Text>
                <Text style={styles.topictext}>{item.lecture_title}</Text>
                <Text style={styles.topictext}>{moment(item.start_time).format("MMM DD , YYYY, hh:mm A")}</Text>
              </View>
            )}
            

          />
          ) : (
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '80%' }}>
              <Text style={{ fontSize: 15 }}>Records Not Available</Text>
            </View>
          )}
        </View>

      </View>
    </SafeAreaView>
  );
};
export default PlayHistoryScreen;
