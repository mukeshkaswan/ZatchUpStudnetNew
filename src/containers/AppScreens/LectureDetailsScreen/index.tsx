import React, { Component, FC, useState, useEffect, useRef } from 'react';
import { Text, View, FlatList, Image, TouchableOpacity, Platform, ImageBackground, ScrollView, Alert, BackHandler, TextInput, Dimensions } from 'react-native';
import styles from './style.tsx';
import { TextField, CustomButton, CustomStatusBar, Validate, CustomHeader, BackBtn, HeaderTitleWithBack } from '../../../components';
import { Images } from '../../../components/index';
import Toast from 'react-native-simple-toast';
import { useDispatch, useSelector } from 'react-redux';
import * as userActions from '../../../actions/user-actions-types';
import ProgressLoader from 'rn-progress-loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import style from '../Messages/style';
import CardView from 'react-native-cardview';
import Video from 'react-native-video-player';
import Orientation from 'react-native-orientation-locker';
import moment from 'moment';


const {
  width, height
} = Dimensions.get("screen")

const placeholder =
  'http://staging.zatchup.com/zatchupapi/zatchup/media/starclass_courses/anime_view_pRcFg4X.jpg';

interface ResetPasswordScreenProps {
  navigation: any;
  route: any;
}


const LectureDetailsScreen = (props: ResetPasswordScreenProps) => {
  const [number, onChangeNumber] = React.useState(null);
  const [isLoading, setLoading] = useState(false);
  const [lecturetitle, setLecturetitle] = useState('');
  const [level, setLevel] = useState('');
  const [field, setField] = useState('');
  const [subject, setSubject] = useState('');
  const [facultydetails, setFacultyDetails] = useState('');
  const [topiccover, setTopiccover] = useState('');
  const [des, setdes] = useState('');
  const [uploaddate, setUploaddate] = useState('');
  const [play, setPlay] = useState('');
  const [standard, setStandard] = useState('');
  const [zatchupid, setZatchupID] = useState('');
  const [isFullScreen, setFullscreen] = useState(false);
  const ref = useRef();



  const dispatch = useDispatch();

  function handleBackBut() {
    props.navigation.goBack();
    return true;
  }

  useEffect(() => {

    // console.log('props.route.params.data',props.route.params)

    getCoursePreviewData(props.route.params.id);
    getAuthUserInfoApi();



  }, []);


  const onFullScreen = () => {
    if (!isFullScreen) {
      Orientation.lockToLandscape();
    } else {
      if (Platform.OS === 'ios') {
        Orientation.lockToPortrait();
      }
      Orientation.lockToPortrait();
    }
    setFullscreen(!isFullScreen);
  };
  const getData = async (results) => {


    setLecturetitle(results.lecture_title);
    setLevel(results.level_of_education);
    setField(results.field);
    setSubject(results.subject);
    setFacultyDetails(results.teaching_faculty_details);
    setTopiccover(results.topic_cover);
    setdes(results.lecture_description);
    setUploaddate(results.upload_date);
    setStandard(results.standard);
    setPlay(results.lecture);




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
            setLoading(false);

            console.warn(
              'after result Auth User INfo',
              JSON.stringify(result, undefined, 2),

            );
            setZatchupID(result.zatchupId);

          }
          if (!error) {
            console.warn(JSON.stringify(error, undefined, 2));
            // setLoginSuccess(result);
            //console.log('dfdfdf--------', error)
            // Toast.show('Request failed with status code 401', Toast.SHORT);
            setLoading(false);

            // Alert.alert(error.message[0])

            // signOut();
          } else {
            // setError(true);
            // signOut();
            // Alert.alert(result.status)
            Toast.show('Request failed with status code 401', Toast.SHORT);
            setLoading(false);
            console.warn(JSON.stringify(error, undefined, 2));
          }
        },
      }),
    );
  };

  /***************************User GET Course Preview*******************************/

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
      userActions.getStartClasslecturelistcoursepreview({
        data,

        callback: ({ result, error }) => {


          if (result) {

            console.warn(
              'after result',
              JSON.stringify(result.data, undefined, 2),

              //  getdataProfile(result),
              //  getdataCourse(result),
            );
            setLoading(false);



            getData(result.data);

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

  const renderIndicator = () => {
    return (
      <View style={{}}>

        <ProgressLoader
          visible={true}
          isModal={true} isHUD={true}
          //hudColor={"#ffffff00"}
          hudColor={"#4B2A6A"}
          style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
          color={"white"} />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {isLoading && renderIndicator()}

      <CustomStatusBar />
      {isFullScreen != true ? <HeaderTitleWithBack
        navigation={props.navigation}
        headerTitle="Lecture Details"
      /> : null}

      {isFullScreen != true ? <View style={{ paddingHorizontal: 10, marginTop: 10, }}>

        <View style={styles.textcontainer}>
          <Text style={styles.coursetext}>Lecture Title : </Text>
          <Text style={styles.coursetext1}>{lecturetitle}</Text>
        </View>

        <View style={styles.textcontainer}>
          <Text style={styles.coursetext}>Standard</Text>
          <Text style={styles.coursetext1}>{standard}</Text>
        </View>
        <View style={styles.textcontainer}>
          <Text style={styles.coursetext}>Subject : </Text>
          <Text style={styles.coursetext1}>{subject}</Text>
        </View>

        <View style={styles.textcontainer}>
          <Text style={styles.coursetext}>Teaching Faculty Details : </Text>
          <Text style={styles.coursetext1}>{facultydetails}</Text>
        </View>
        <View style={styles.textcontainer}>
          <Text style={styles.coursetext}>Topic Cover : </Text>
          <Text style={styles.coursetext1}>{topiccover}</Text>
        </View>
        <View style={styles.textcontainer}>
          <Text style={styles.coursetext}>Description : </Text>
          <Text style={styles.coursetext1}>{des}</Text>
        </View>
        <View style={styles.textcontainer}>
          <Text style={styles.coursetext}>Uploaded date : </Text>
          {uploaddate != '' ? <Text style={styles.coursetext1}>{moment(uploaddate).format("MMM DD, YYYY")}</Text> : null}
        </View>
        <View style={styles.textcontainer}>
          <Text style={styles.coursetext}>Play : </Text>
          <Text style={styles.coursetext_}>{zatchupid}</Text>
        </View>
      </View> : null}



      {/* <Video
        ref={ref}
        url={play}
        //  resizeMode="cover"
        showDuration
        //  rotateToFullScreen={true}
        lockRatio={16 / 9}
        onFullScreen={onFullScreen}
        style={{}}
        autoPlay={true}
        placeholder={'https://i.picsum.photos/id/866/1600/900.jpg'}
        inlineOnly={true}
      // placeholder={placeholder}

      /> */}


      <Video
        ref={ref}
        url={{ uri: play }}
        onFullScreen={onFullScreen}
        resizeMode='cover'
        showDuration
        lockRatio={16 / 9}
        onBackPress={() => props.navigation.goBack(null)}
      />


    </View>



  );
}
export default LectureDetailsScreen;