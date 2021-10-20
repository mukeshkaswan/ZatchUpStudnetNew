import React, { Component, FC, useState } from 'react';
import { Text, View, FlatList, Image, TouchableOpacity, Platform, ImageBackground, ScrollView, Alert, BackHandler,TextInput } from 'react-native';
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
const data = [
  {
    id: 1,
    titleofcourse: 'Science',
    courseid: 'SCHRFAR003132COURSE5004',
     
    levelofeducation:
      'Post Graduate',
      
    
  },
  {
    id: 2,
    titleofcourse: 'Science',
    courseid: 'SCHRFAR003132COURSE5004',
     
    levelofeducation:
      'Post Graduate',
    
  },
   
  {
    id: 3,
    titleofcourse: 'Science',
    courseid: 'SCHRFAR003132COURSE5004',
     
    levelofeducation:
      'Post Graduate',
    
  },
   
  {
    id: 4,
    titleofcourse: 'Science',
    courseid: 'SCHRFAR003132COURSE5004',
     
    levelofeducation:
      'Post Graduate',
    
  },
   
   
   
];

 
interface ResetPasswordScreenProps {
  navigation: any;
}

const CoursesListScreen= (props: ResetPasswordScreenProps) => {
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

  const backPressed = () => {
    props.navigation.goBack(null);
    return true;
  }


  return (
    <View style={styles.container}>
    <CustomStatusBar />
      <HeaderTitleWithBack
           navigation={props.navigation}
          headerTitle="Courses List"
        />
      <View style={styles.rowinputcontainer}> 
      
         <View style={styles.textinputcontainer}>
            <TextInput
             style={{paddingLeft:10}}
             onChangeText={onChangeNumber}
             value={number}
             placeholder="Search"
            keyboardType='default'
           />
       <TouchableOpacity style={styles.applybtn}>
              <Text style={{color:'white'}}>Apply</Text>
       </TouchableOpacity>
          
        
        
    </View>
    <TouchableOpacity style={styles.playbtn} onPress={() => props.navigation.navigate('PlayHistoryScreen')}>
              <Text style={{color:'white'}}>Play History</Text>
           </TouchableOpacity>
          
    </View>
    <View style={[styles.coursestextcontainer,{backgroundColor:'lightgrey'}]}>
      <Text style={styles.snotext}>S. No</Text>
      <Text  style={styles.lecturetitletext}>Title of Course</Text>
      <Text  style={styles.topictext}>Course ID</Text>
      <Text style={{flex:1,marginHorizontal:2,textAlign:'center'}}>Action</Text>
    </View>
     
    <FlatList
             data={data}
            renderItem={({ item }) => 
             
   <View style={[styles.coursestextcontainer,{backgroundColor:'white'}]} >
      <Text style={styles.snotext}> {item.id}</Text>
      <Text style={styles.lecturetitletext}>{item.titleofcourse}</Text>
      <Text style={styles.topictext}>{item.courseid}</Text>
      <TouchableOpacity onPress={() => props.navigation.navigate('CoursePreviewScreen')} style={{flex:1,alignItems:'center'}}>
      <Image               
                         style={styles.image}
                        source={Images.eye}
                    />
      </TouchableOpacity>
    </View>
            }
            
          />
</View>



  );
}
export default CoursesListScreen;