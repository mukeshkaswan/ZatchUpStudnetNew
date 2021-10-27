import React, { Component, FC, useState } from 'react';
import { Text, View, FlatList, Image, TouchableOpacity, Platform, ImageBackground, ScrollView, Alert, BackHandler,TextInput,Dimensions} from 'react-native';
import styles from './style.tsx';  
import { TextField, CustomButton, CustomStatusBar, Validate, CustomHeader, BackBtn ,HeaderTitleWithBack} from '../../../components';
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
    topics:'Topics Covered'
   },
  ];
const {
  width,height
}=Dimensions.get("screen")
 
interface ResetPasswordScreenProps {
  navigation: any;
}

const CoursesPreviewScreen= (props: ResetPasswordScreenProps) => {
  const [number, onChangeNumber] = React.useState(null);
 function handleBackBut() {
    props.navigation.goBack();
    return true;
  }
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
    <CustomStatusBar />
      <HeaderTitleWithBack
           navigation={props.navigation}
          headerTitle="Course Preview"
        />
      <ScrollView>
   <View style={{paddingHorizontal:10,alignSelf:'center',width:'100%'}}> 
      <Video
          style={{height:height/4,marginTop:10,paddingHorizontal:20,alignSelf:'center',borderRadius:10}}
          video={{ uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }}
          videoWidth={width-10}
          thumbnail={{ uri: 'https://i.picsum.photos/id/866/1600/900.jpg' }}
       />
 </View>
        <View style={{paddingHorizontal:10,marginTop:10,}}>
            <Text style={styles.titletext}>View Course</Text>
             <View style={styles.textcontainer}>
                <Text style={styles.coursetext}>Course Name</Text>
                <Text style={styles.coursetext1}>:   Science</Text>
            </View>
            <View style={styles.textcontainer}>
                <Text style={styles.coursetext}>Course ID</Text>
                <Text style={styles.coursetext1}>:  SCHRFAR003132COURSE5004</Text>
            </View>
            <View style={styles.textcontainer}>
                <Text style={styles.coursetext}>Level of Education</Text>
                <Text style={styles.coursetext1}>:   PostGraduate</Text>
            </View>
            <View style={styles.textcontainer}>
                <Text style={styles.coursetext}>Field</Text>
                <Text style={styles.coursetext1}>:   Science</Text>
            </View>
            <View style={styles.textcontainer}>
                <Text style={styles.coursetext}>Standard</Text>
                <Text style={styles.coursetext1}>:   Standar1</Text>
            </View>
            <View style={styles.textcontainer}>
                <Text style={styles.coursetext}>Subject</Text>
                <Text style={styles.coursetext1}>:  Science</Text>
            </View>
            <View style={styles.textcontainer}>
                <Text style={styles.coursetext}>No of Lectures</Text>
                <Text style={styles.coursetext1}>:   2</Text>
            </View>
            <View style={styles.textcontainer}>
                <Text style={styles.coursetext}>Teaching Faculty Details</Text>
                <Text style={styles.coursetext1}>:   this is faculty details</Text>
            </View>
            <View style={styles.textcontainer}>
                <Text style={styles.coursetext}>Topic Cover</Text>
                <Text style={styles.coursetext1}>:   Earth</Text>
            </View>
            <View style={styles.textcontainer}>
                <Text style={styles.coursetext}>Description</Text>
                <Text style={styles.coursetext1}>:   jhwkjghjjkhkjh</Text>
            </View>
            <View style={styles.textcontainer}>
                <Text style={styles.coursetext}>Date of Creating Course</Text>
                <Text style={styles.coursetext1}>:   Sep 30, 2021</Text>
            </View>
    <View style={{marginTop:15}}> 
      <Text style={styles.titletext}>Course Lecture</Text>
       <View style={[styles.coursestextcontainer,{backgroundColor:'lightgrey',marginTop:10}]}>
          <Text style={styles.snotext}>S. No</Text>
           <Text  style={styles.lecturetitletext}>Lecture Title</Text>
           <Text style={styles.topictext}>Topics Covered</Text>
            <Text style={{flex:1,marginHorizontal:2,textAlign:'center'}}>View Details</Text>
        </View>
         <FlatList
             data={data}
            renderItem={({ item }) =>
     <View style={[styles.coursestextcontainer,{backgroundColor:'white'}]}>
      <Text style={styles.snotext}> {item.id}</Text>
      <Text style={styles.lecturetitletext}>{item.titleofcourse}</Text>
      <Text  style={styles.topictext}>{item.topics}</Text>
      <TouchableOpacity onPress={() => props.navigation.navigate('LectureDetailsScreen')} style={{flex:1,alignItems:'center'}}>
      
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