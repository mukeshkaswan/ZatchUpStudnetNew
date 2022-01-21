import React, { Component, FC, useState, useEffect, useRef } from 'react';
import { Text, View, FlatList, Image, TouchableOpacity, Platform, ImageBackground, ScrollView, Alert, BackHandler, TextInput, Dimensions } from 'react-native';
import styles from './style';
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

const {
  width, height
} = Dimensions.get("screen")

interface ResetPasswordScreenProps {
  navigation: any;
  route: any;
}

// const theme = {
//   title: "#FFF",
//   more: "#446984",
//   center: "#7B8F99",
//   fullscreen: "#446984",
//   volume: "#A5957B",
//   scrubberThumb: "#234458",
//   scrubberBar: "#DBD5C7",
//   seconds: "#DBD5C7",
//   duration: "#DBD5C7",
//   progress: "#446984",
//   loading: "#DBD5C7"
// };
const CoursesPreviewScreen = (props: ResetPasswordScreenProps) => {

  const [number, onChangeNumber] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [coursepreview, setCoursepreview] = useState('');
  const [coursename, setCoursename] = useState('');
  const [courseid, setCourseid] = useState('');
  const [level, setLevel] = useState('');
  const [field, setFiled] = useState('');
  const [standard, setStandard] = useState('');
  const [subject, setSubject] = useState('');
  const [nooflecture, setNooflecture] = useState('');
  const [des, setDes] = useState('');
  const [creatingcoursedate, setCreatingCourseDate] = useState('');
  const [topiccover, setTopiccover] = useState('');
  const [facultydetails, setFacultyDetails] = useState('');
  const [courseimage, setCourseImage] = useState('');
  const [lecturedata, setLectureData] = useState([]);
  const [isFullScreen, setFullscreen] = useState(false);
  //const [isFullScreen, setVideo] = useRef(false);
  const ref = useRef();




  const dispatch = useDispatch();

  function handleBackBut() {
    props.navigation.goBack();
    return true;
  }


  useEffect(() => {
    
    getCoursePreviewData(props.route.params.id);

    getCourseLectureData(props.route.params.id);
    
  }, []);




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
    // this.setState({isFullScreen: !this.state.isFullScreen});
  };
  const getData = async (results) => {
    results.map((element: any) => {
      setCoursepreview(element.course_preview);
      setCoursename(element.course_name);
      setCourseid(element.course_id);
      setLevel(element.level_of_education);
      setFiled(element.field);
      setStandard(element.standard);
      setSubject(element.subject);
      setNooflecture(element.number_of_lectures);
      setDes(element.description);
      setCreatingCourseDate(element.created_on);
      setTopiccover(element.topic_cover);
      setFacultyDetails(element.faculty_details);
      setCourseImage(element.course_image);

    });


  };



  /***************************User GET  Start Class Course Lecture Data*******************************/

  const getCourseLectureData = async (id) => {
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
      userActions.getStartClasslecturelist({
        data,
        callback: ({ results, error }) => {
          if (results && results.length > 0) {
            // setSpinnerStart(false);
            // console.log('results Data Lecture', results);
            setLectureData(results),
              setLoading(false);
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
      userActions.getCoursePreview({
        data,

        callback: ({ results, error }) => {
          if (results && results.length > 0) {

            // setSpinnerStart(false);
            console.log('results Data Preview', results);
            getData(results);
            setLoading(false);
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

  return (
    <View style={styles.container}>

      {isLoading && renderIndicator()}

      <CustomStatusBar />
      <HeaderTitleWithBack
        navigation={props.navigation}
        headerTitle="Course Preview"
      />

     <ScrollView >
        <Video
          ref={ref}
         // style={{ height: height / 4, paddingHorizontal: 20, alignSelf: 'center', }}
           url={{uri:coursepreview}}
         // video={{ uri: coursepreview }}
       //   videoWidth={width - 100}
          //thumbnail={{ uri: courseimage }}
          thumbnail={{ uri: 'https://i.picsum.photos/id/866/1600/900.jpg' }}
         // onFullScreen={onFullScreen}
          // theme={theme}
         // controls={true}
          resizeMode="contain"
          showDuration
          rotateToFullScreen={true}
          lockRatio={16 / 9}
        />

        <View style={{ paddingHorizontal: 10, marginTop: 10, }}>
          <Text style={styles.titletext}>View Course</Text>
          <View style={styles.textcontainer}>
            <Text style={styles.coursetext}>Course Name : </Text>
            <Text style={styles.coursetext1}>{coursename}</Text>
          </View>
          <View style={styles.textcontainer}>
            <Text style={styles.coursetext}>Course ID : </Text>
            <Text style={styles.coursetext1}>{courseid}</Text>
          </View>
          <View style={styles.textcontainer}>
            <Text style={styles.coursetext}>Level of Education : </Text>
            <Text style={styles.coursetext1}>{level}</Text>
          </View>
          <View style={styles.textcontainer}>
            <Text style={styles.coursetext}>Field : </Text>
            <Text style={styles.coursetext1}>{field}</Text>
          </View>
          <View style={styles.textcontainer}>
            <Text style={styles.coursetext}>Standard : </Text>
            <Text style={styles.coursetext1}>{standard}</Text>
          </View>
          <View style={styles.textcontainer}>
            <Text style={styles.coursetext}>Subject : </Text>
            <Text style={styles.coursetext1}>{subject}</Text>
          </View>
          <View style={styles.textcontainer}>
            <Text style={styles.coursetext}>No of Lectures : </Text>
            <Text style={styles.coursetext1}>{nooflecture}</Text>
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
            <Text style={styles.coursetext}>Date of Creating Course : </Text>
            <Text style={styles.coursetext1}>{creatingcoursedate}</Text>
          </View>
          <View style={{ marginTop: 15 }}>
            <Text style={styles.titletext}>Course Lecture</Text>
            <View style={[styles.coursestextcontainer, { backgroundColor: 'lightgrey', marginTop: 10 }]}>
              <Text style={styles.snotext}>S. No</Text>
              <Text style={styles.lecturetitletext}>Lecture Title</Text>
              <Text style={styles.topictext}>Topics Covered</Text>
              <Text style={{ flex: 1, marginHorizontal: 2, textAlign: 'center' }}>View Details</Text>
            </View>
            <FlatList
              data={lecturedata}
              renderItem={({ item, index }) =>
                <View style={[styles.coursestextcontainer, { backgroundColor: 'white' }]}>
                  <Text style={styles.snotext}> {index}</Text>
                  <Text style={styles.lecturetitletext}>{item.lecture_title}</Text>
                  <Text style={styles.topictext}>{item.topic_cover}</Text>
                  <TouchableOpacity onPress={() => props.navigation.navigate('LectureDetailsScreen', { 'id': item.id })} style={{ flex: 1, alignItems: 'center' }}>

                    <Image
                      style={styles.eyeimage}
                      source={Images.eye}
                    />
                  </TouchableOpacity>
                </View>
              }

            />
          </View>
        </View>
      </ScrollView>

    </View>



  );
}
export default CoursesPreviewScreen;