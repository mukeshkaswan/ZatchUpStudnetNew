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

const data = [
  {
    id: 1,
    topics: 'Topics Covered',
    titleofcourse: 'Lecture2',

  },
  {
    id: 2,
    titleofcourse: 'Lecture2',
    topics: 'Topics Covered'
  },
];
const {
  width, height
} = Dimensions.get("screen")

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

  const ref = useRef();



  const dispatch = useDispatch();

  function handleBackBut() {
    props.navigation.goBack();
    return true;
  }

  useEffect(() => {

    // console.log('props.route.params.data',props.route.params)

    getCoursePreviewData(props.route.params.id);



  }, []);


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

            // console.warn(
            //   'after result',
            //   JSON.stringify(result.data, undefined, 2),

            //   //  getdataProfile(result),
            //   //  getdataCourse(result),
            // );
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
      <HeaderTitleWithBack
        navigation={props.navigation}
        headerTitle="Lecture Details"
      />
      <ScrollView>

        <View style={{ paddingHorizontal: 10, marginTop: 10, }}>

          <View style={styles.textcontainer}>
            <Text style={styles.coursetext}>Lecture Title : </Text>
            <Text style={styles.coursetext1}>{lecturetitle}</Text>
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
            <Text style={styles.coursetext1}>{uploaddate}</Text>
          </View>
          <View style={styles.textcontainer}>
            <Text style={styles.coursetext}>Play : </Text>
            <Text style={styles.coursetext1}>AAA003348</Text>
          </View>
            <Video
              ref={ref}

              // style={{ height: height / 4, marginTop: 15, paddingHorizontal: 20, alignSelf: 'center', borderRadius: 10 }}
              //video={{ uri: play }}
              url={{ uri: play }}
              resizeMode="contain"
              showDuration
              // url={'https://www.youtube.com/watch?v=EVb2icIl4hU'}

             // videoWidth={width - 10}
              rotateToFullScreen={true}
              lockRatio={16 / 9}
            // thumbnail={{ uri: 'https://i.picsum.photos/id/866/1600/900.jpg' }}
            />

        </View>
      </ScrollView>

    </View>



  );
}
export default LectureDetailsScreen;