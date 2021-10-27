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

const LectureDetailsScreen= (props: ResetPasswordScreenProps) => {
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
          headerTitle="Lecture Details"
        />
      <ScrollView>
    
        <View style={{paddingHorizontal:10,marginTop:10,}}>
            
             <View style={styles.textcontainer}>
                <Text style={styles.coursetext}>Lecture Title</Text>
                <Text style={styles.coursetext1}>:   Lecture2</Text>
            </View>
            <View style={styles.textcontainer}>
                <Text style={styles.coursetext}>Level of Education</Text>
                <Text style={styles.coursetext1}>:  Post Graduate</Text>
            </View>
            <View style={styles.textcontainer}>
                <Text style={styles.coursetext}>Field</Text>
                <Text style={styles.coursetext1}>:   Computer Science</Text>
            </View>
            <View style={styles.textcontainer}>
                <Text style={styles.coursetext}>Standard</Text>
                <Text style={styles.coursetext1}>:   Standar1</Text>
            </View>
            <View style={styles.textcontainer}>
                <Text style={styles.coursetext}>Subject</Text>
                <Text style={styles.coursetext1}>:   Math</Text>
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
                <Text style={styles.coursetext}>Uploaded date</Text>
                <Text style={styles.coursetext1}>:   Sep 30, 2021</Text>
            </View>
            <View style={styles.textcontainer}>
                <Text style={styles.coursetext}>Play  </Text>
                <Text style={styles.coursetext1}>:   AAA003348</Text>
            </View>
            <View style={{paddingHorizontal:10,alignSelf:'center',width:'100%'}}> 
      <Video
          style={{height:height/4,marginTop:15,paddingHorizontal:20,alignSelf:'center',borderRadius:10}}
          video={{ uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }}
          videoWidth={width-10}
          thumbnail={{ uri: 'https://i.picsum.photos/id/866/1600/900.jpg' }}
       />
 </View>
            
   </View>
      </ScrollView> 
      
</View>



  );
}
export default LectureDetailsScreen;