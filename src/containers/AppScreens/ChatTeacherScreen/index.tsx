import React, { Component, FC, useState, useEffect } from 'react';
import { Text, View, FlatList, SafeAreaView, Image, TouchableOpacity, Platform, ImageBackground, ScrollView, Alert, BackHandler } from 'react-native';
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
import {
  NavigationContainer,
  useIsFocused,
  DrawerActions,
  useFocusEffect
} from '@react-navigation/native';

interface ResetPasswordScreenProps {
  navigation: any;
  route: any;

}

const ChatTeacherScreen = (props: ResetPasswordScreenProps) => {

  const isFocused = useIsFocused();
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [lecturedata, setLectureData] = useState([]);


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

  useEffect(() => {

    getSchoolList();



  }, [isFocused]);



  /***************************User GET School List Data*******************************/

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

    };
    setLoading(true);

    dispatch(
      userActions.getSchoolListOnUser({
        data,

        callback: ({ results, error }) => {
          if (results && results.length > 0) {
            setLoading(false);

            // setSpinnerStart(false);
            //console.log('results ......school list', results[0].school_id);
            // getTeacherChatData(results[0].school_id);
            setLectureData(results);


            //  setLectureData(results);

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


  /***************************User GET Chat Teacher List Data*******************************/

  const getTeacherChatData = async (school_id) => {
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
      id: school_id,

    };
    setLoading(true);

    dispatch(
      userActions.getChatTeacherList({
        data,

        callback: ({ results, error }) => {
          if (results && results.length > 0) {
            setLoading(false);

            // setSpinnerStart(false);
            // console.log('results ......', results);

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
    <SafeAreaView style={{ flex: 1 }}>

      <View style={styles.container}>
        {isLoading && renderIndicator()}
        <CustomStatusBar />
        <HeaderTitleWithBack
          navigation={props.navigation}
          headerTitle="School List"
        />
        <FlatList
          data={lecturedata}
          renderItem={({ item }) =>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
              <View style={styles.listCardWrapper}>
                <View style={styles.userImageWrapper}>
                  <Image style={styles.userImageStyle} source={{ uri:item.profile_pic }} />
                </View>
                <View style={styles.msgCardRightWrapper}>
                  <View style={styles.msgCardHeaderWrapper}>
                    <View style={{ flex: 1 }}>
                      <Text
                        style={styles.userNameStyle}>
                        {item.school_name}
                      </Text>
                    </View>
                    <TouchableOpacity onPress={() => props.navigation.navigate('ChatWithTeachersScreen', { 'user_id': props.route.params.user_id, 'id': item.school_id })}>
                      <View style={{}}>
                        <Image
                          style={{ height: 25, width: 25, marginRight: 10 }}
                          source={Images.rightarrow}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View
                style={{
                  height: 2,
                  width: '90%',
                  marginLeft: 100,
                  // marginRight:10,
                  backgroundColor: '#E9E9E9',
                }}
              />
            </ScrollView>
          }

        />

      </View>
    </SafeAreaView>


  );
}
export default ChatTeacherScreen;