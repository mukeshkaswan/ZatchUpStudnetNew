import React, { Component, FC, useState, useEffect } from 'react';
import { Text, View, FlatList, Image, TouchableOpacity, Platform, ImageBackground, ScrollView, Alert, BackHandler, TextInput } from 'react-native';
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


interface ResetPasswordScreenProps {
  navigation: any;
  route: any;
}

const CoursesListScreen = (props: ResetPasswordScreenProps) => {
  const [number, onChangeNumber] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [schoolid, setSchoolID] = useState('');
  const [coursedata, setCourseData] = useState([]);
  const [getFlag, setFlag] = useState(false);
  const dispatch = useDispatch();

  function handleBackBut() {
    props.navigation.goBack();
    return true;
  }


  useEffect(() => {

    getCourseList(props.route.params.id);



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

  const backPressed = () => {
    props.navigation.goBack(null);
    return true;
  }



  /***************************User GET School List*******************************/

  const getSchoolList = async () => {
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
      school_id: token,

    };
    setLoading(true);

    dispatch(
      userActions.getSchoollistforstarclass({
        data,

        callback: ({ results, error }) => {
          if (results && results.length > 0) {

            // setSpinnerStart(false);
            console.log('results Data', results[0].id);
            getCourseList(results[0].id);
            setSchoolID(results[0].id);
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


  /***************************User GET Course List*******************************/

  const getCourseList = async (id) => {
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
      school_id: id,

    };
    setLoading(true);

    dispatch(
      userActions.getStarclasscourselist({
        data,

        callback: ({ results, error }) => {
          if (results) {

            // setSpinnerStart(false);
            console.log('results', results)
            setFlag(true);
            setCourseData(results),

              setLoading(false);
          }
          else if (results && results.length == []) {
            setCourseData([])

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
        headerTitle="Course List"
      />
      <View style={styles.rowinputcontainer}>

        <View style={styles.textinputcontainer}>
          <TextInput
            style={{ paddingLeft: 10 }}
            onChangeText={onChangeNumber}
            value={number}
            placeholder="Search..."
            keyboardType='default'
          />
          <TouchableOpacity style={styles.applybtn}>
            <Text style={{ color: 'white' }}>Apply</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.playbtn} onPress={() => props.navigation.navigate('PlayHistoryScreen', { 'id': props.route.params.id })}>
          <Text style={{ color: 'white' }}>Play History</Text>
        </TouchableOpacity>

      </View>
      {getFlag === true ? <View style={{ flex: 1 }}>

        {coursedata.length > 0 ? <View style={[styles.coursestextcontainer, { backgroundColor: 'lightgrey' }]}>
          <Text style={styles.snotext}>S. No</Text>
          <Text style={styles.lecturetitletext}>Title of Course</Text>
          <Text style={styles.topictext}>Lecture Count</Text>
          <Text style={{ flex: 1, marginHorizontal: 2, textAlign: 'center' }}>Action</Text>
        </View> : null}

        {coursedata.length > 0 ? (<FlatList
          data={coursedata}
          renderItem={({ item, index }) =>

            <View style={[styles.coursestextcontainer, { backgroundColor: 'white' }]} >
              <Text style={styles.snotext}> {index + 1}</Text>
              <Text style={styles.lecturetitletext}>{item.course_name}</Text>
              <Text style={styles.topictext}>{item.number_of_lectures}</Text>
              <TouchableOpacity onPress={() => props.navigation.navigate('CoursePreviewScreen', { 'id': item.id })} style={{ flex: 1, alignItems: 'center' }}>
                <Image
                  style={styles.image}
                  source={Images.eye}
                />
              </TouchableOpacity>
            </View>
          }

        />
        ) : (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 15 }}>No ZatchUp Classroom Course in your gallery, Please contact your School for adding Courses</Text>
          </View>
        )}
      </View> : null}

    </View>



  );
}
export default CoursesListScreen;