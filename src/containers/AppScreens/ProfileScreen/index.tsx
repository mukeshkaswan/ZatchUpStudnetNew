import React, { Component, FC, useState, useEffect } from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {
  TextField,
  CustomButton,
  CustomStatusBar,
  Validate,
  CustomHeader,
  BackBtn,
  HeaderTitleWithBack,
  Colors,
  Customcard,
} from '../../../components';

import styles from './style.tsx';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import images from '../../../components/images';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import * as userActions from '../../../actions/user-actions-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  NavigationContainer,
  useIsFocused,
  DrawerActions,
  useFocusEffect
} from '@react-navigation/native';
import ProgressLoader from 'rn-progress-loader';



interface CoomingSoonScreenProps {
  navigation: any;
  route: any;
}

const ProfileScreen = (props: CoomingSoonScreenProps) => {

  const [data, active_data] = useState('Student');
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [profilepic, setProfilePic] = useState('');
  const [zatchupid, setZatchUpId] = useState('');
  const [followers, setFollowers] = useState('');
  const [following, setFollowing] = useState('');
  const [schoolname, setNameofschool] = useState('');




  useEffect(() => {

    console.log('props.route.params.user_id', props.route.params.user_id);
    getUserProfile(props.route.params.user_id);

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


  const getdataProfile = async result => {
    var Profile = [];
    result.data.map((element: any) => {
      setUsername(element.name);
      setZatchUpId(element.zatchup_id);
      setProfilePic(element.profile_pic);
      setFollowers(element.social_user_followers);
      setFollowing(element.social_user_followings);
      setDob(element.dob);
      setGender(element.gender);
      setEmail(element.email);
    });


  };

  const getdataCourse = async result => {

    result.data.map((element: any) => {

      getDataEducation(element.educationdetail);


    });
  };

  const getDataEducation = async (educationdetail) => {


    educationdetail.map((element: any) => {

      console.log('name_of_school', element.name_of_school)
      setNameofschool(element.name_of_school);

    });

  }



  /***************************User GET User Profile list *******************************/

  const getUserProfile = async (user_id) => {
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
      user_id: user_id,

    };
    setLoading(true);

    dispatch(
      userActions.getProfileDetailForUser({
        data,

        callback: ({ result, error }) => {
          if (result.status === true) {
            console.warn(
              'after User Data result------->',
              JSON.stringify(result, undefined, 2),

              getdataProfile(result),
              getdataCourse(result),

              // getdataCourse(result),
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

  return (
    <View style={styles.container}>
      {isLoading && renderIndicator()}

      <HeaderTitleWithBack
        navigation={props.navigation}
        headerTitle="Profile"
      />

      <ScrollView>
        <View
          style={{
            backgroundColor: 'white',
            marginTop: 10,
            marginHorizontal: 16,
            borderRadius: 5,
          }}>
          <ImageBackground
            source={{uri:'http://staging.zatchup.com/zatchupapi/zatchup/media/cover/mcu-1-iron-man_nW7yEAt.jpg'}}
            resizeMode="stretch"
            style={{ width: '100%', height: 100 }}>

          </ImageBackground>

          <View style={styles.profilecontainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                // source={require('../../../assets/images/pic.jpeg')}
                source={{ uri: profilepic }}
                style={styles.profilepic}
              />
              <View style={styles.profiletextcontainer}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.nametext}>{username}</Text>
                  <Icon
                    name="check-circle"
                    size={18}
                    color="#4E387E"
                    style={{ margin: 5 }}
                  />
                </View>
                <Text style={{ color: 'grey', fontWeight: 'bold' }}>
                  {zatchupid}
                </Text>
              </View>
            </View>
          
          </View>

        <View style={styles.likecontainer}>
          <View>
            <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>{followers}</Text>
            <Text>Followers</Text>
          </View>
          <View style={{ marginLeft: 10 }}>
            <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>{following}</Text>
            <Text style={{}}>Following</Text>
          </View>
          <TouchableOpacity style={styles.followbutton}>
            <Text style={{color: 'white', fontSize: 12}}>Follow</Text>
          </TouchableOpacity>

            <View style={styles.messageicon}>
              <Icon name="envelope" size={24} color="grey" />
            </View>
          {/* <TouchableOpacity style={styles.addbuddybutton}>
            <Text style={{color: 'grey', fontSize: 12}}>Add Buddy</Text>
          </TouchableOpacity> */}
        </View>
        </View>

        <Card style={styles.cardContent}>
          <View style={styles.cardtitlecontent}>
            <Text style={styles.cardtitletext}>Education</Text>
            {/* <Image
              source={images.edit_icon}
              style={{
                resizeMode: 'stretch',

                marginLeft: 8,
                width: 20,
                height: 20,
              }}
            /> */}
          </View>
          <View style={styles.borderstyle}></View>
          <View style={styles.textcontainer}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.schooltext}>{schoolname}</Text>
              <Icon
                name="check-circle"
                size={17}
                color="#4E387E"
                style={{ marginLeft: 5, marginTop: 2 }}
              />
            </View>
            {/* <Text style={styles.textcontent}>
              <Text style={styles.boldtext}>6th</Text> (Batch 2016-2017)
            </Text>
            <Text style={styles.textcontent}>
              <Text style={styles.boldtext}>7th</Text> (Batch 2017-2018)
            </Text> */}
          </View>
          {/* <View style={styles.borderstyle}></View>
          <View style={styles.textcontainer}>
            <Text style={styles.schooltext}>Army Public School</Text>
            <Text style={styles.textcontent}>
              <Text style={styles.boldtext}>8th</Text> (Batch 2010-2019)
            </Text>
            <Text style={styles.textcontent}>
              <Text style={styles.boldtext}>9th</Text> (Batch 2019-2020)
            </Text>
            <Text style={styles.currentschoolText}>Current School</Text>
          </View> */}
        </Card>
        <Card style={styles.cardContent}>
          <View style={styles.cardtitlecontent}>
            <View>
              <Text style={styles.cardtitletext}>Personal Information</Text>
            </View>
            {/* <TouchableOpacity
              style={{ borderWidth: 1, padding: 5, borderRadius: 5 }}>
              <Text style={{ color: 'rgb(70,50,103)' }}>Change Name</Text>
            </TouchableOpacity> */}
            {/* <View>
              <Image
                source={images.edit_icon}
                style={{
                  resizeMode: 'stretch',

                  marginLeft: 8,
                  width: 20,
                  height: 20,
                }}
              />
            </View> */}
          </View>

          <View style={styles.borderstyle}></View>
          <View style={styles.textcontainer}>
            <Text style={styles.personalinfocontent}>
              <Text style={styles.boldtext}>DOB : </Text>{dob}
            </Text>
            {gender == 'M' ? <Text style={styles.personalinfocontent}>
              <Text style={styles.boldtext}>Gender : </Text>Male
            </Text> :
              <Text style={styles.personalinfocontent}>
                <Text style={styles.boldtext}>Gender : </Text>Female
              </Text>}
            <Text style={styles.personalinfocontent}>
              <Text style={styles.boldtext}>Email : </Text>{email}
            </Text>
            {/* <Text style={styles.personalinfocontent}>
              <Text style={styles.boldtext}>Phone : </Text>9869869579
            </Text>
            <Text style={styles.personalinfocontent}>
              <Text style={styles.boldtext}>Profession : </Text>Student
            </Text>
            <Text style={styles.personalinfocontent}>
              <Text style={styles.boldtext}>City : </Text>Noida
            </Text> */}
          </View>
        </Card>
        <Card style={styles.cardContent}>
          <View style={styles.cardtitlecontent}>
            <Text style={styles.cardtitletext}>Posts</Text>
            <TouchableOpacity
              style={{
                borderWidth: 1,
                height: 30,
                width: 80,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
                backgroundColor: 'rgb(70,50,103)',
              }}>
              <Text style={{ color: 'white' }}>Add Posts</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.borderstyle}></View>
          <View
            style={{
              flexDirection: 'row',

              width: 300,

              justifyContent: 'center',

              alignSelf: 'center',
              marginTop: 10,
            }}>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => active_data('Student')}>
                <Icon
                  name="th"
                  size={30}
                  color={data === 'Student' ? '#4B2A6A' : 'grey'}
                />
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => active_data('Teacher')}>
                <Icon
                  name="image"
                  size={30}
                  color={data === 'Teacher' ? '#4B2A6A' : 'grey'}
                  style={{ marginLeft: 80 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Card>
        {!(data === 'Teacher') ? (
          <View>
            <View style={styles.picContainer}>
              <Image
                source={require('../../../assets/images/college1.jpg')}
                style={styles.image}
              />
              <Image
                source={require('../../../assets/images/college2.jpg')}
                style={styles.image}
              />
            </View>
            <View style={styles.picContainer}>
              <Image
                source={require('../../../assets/images/college3.jpg')}
                style={styles.image}
              />
              <Image
                source={require('../../../assets/images/college4.jpg')}
                style={styles.image}
              />
            </View>
          </View>
        ) : (
          <Customcard />
        )}
      </ScrollView>
    </View>
  );
};
export default ProfileScreen;
