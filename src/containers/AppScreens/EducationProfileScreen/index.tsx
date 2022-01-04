import React, { Component, FC, useState } from 'react';
import { Text, View, FlatList, Image, TouchableOpacity, Platform, ImageBackground, ScrollView, Alert, BackHandler, TextInput } from 'react-native';
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
import Modal from "react-native-modal";
import { Searchbar } from 'react-native-paper';

interface ResetPasswordScreenProps {
  navigation: any;
}

const EducationProfileScreen = (props: ResetPasswordScreenProps) => {
  function handleBackBut() {
    props.navigation.goBack();
    return true;
  }
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const [text, onChangeText] = React.useState("Useless Text");
  const [number, onChangeNumber] = React.useState(null);
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
        headerTitle="My Education Profile"
      />
      <ScrollView >
        {/* <View style={{marginTop:15}}>
        <Text style={{textAlign:'center',fontSize:20,fontStyle:'normal'}}>My Education Profile</Text>
     </View> */}
        <TouchableOpacity style={styles.zatchupstarclassbtn} onPress={() => {
          props.navigation.navigate('PendingRequestScreen');
        }}>

          <Image
            source={Images.footernormalicon}
            style={{
              height: 30,
              width: 30,
              marginTop: 15,
              alignSelf: 'flex-end',
              tintColor: 'green',
              marginRight: 25
            }}
          />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', marginLeft: 25, alignItems: 'center' }}>
          <Image
            source={Images.profile_img2}
            style={{
              height: 80,
              width: 80,
              borderRadius: 40,
              alignSelf: 'flex-end',
              marginRight: 25
            }}
          />
          <View>
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>testing TESTER</Text>
            <Text style={{ fontWeight: 'bold', color: 'black' }}>Unique Zatchup ID:{'\n'}3457658568</Text>

          </View>
        </View>
        <CardView
          cardElevation={1}
          cardMaxElevation={1}
          cornerRadius={15}
          style={{
            // width: '95%',

            backgroundColor: 'white',
            marginHorizontal: 15,
            marginTop: 20,
            paddingBottom: 14,
            paddingTop: 10

          }}>
          <Text style={styles.title_text}>Personal Information</Text>
          <View style={styles.border}></View>
          <View style={{ marginTop: 15 }}>
            <View style={styles.text_container}>
              <Text style={styles.detail_text}>DOB : </Text>
              <Text>ff</Text>
            </View>
            <View style={styles.text_container}>
              <Text style={styles.detail_text}>Gender : </Text>
              <Text>gen</Text>
            </View>

            <View style={styles.text_container}>
              <Text style={styles.detail_text}>Email : </Text>
              <Text>email</Text>
            </View>
            <View style={styles.text_container}>
              <Text style={styles.detail_text}>Phone Number : </Text>
              <Text>phone</Text>
            </View>
            <View style={styles.text_container}>
              <Text style={styles.detail_text}>Father's Name : </Text>
              <Text>Paa</Text>
            </View>
            <View style={styles.text_container}>
              <Text style={styles.detail_text}>Mother's Name : </Text>
              <Text>Maa</Text>
            </View>
          </View>


        </CardView>

        <CardView
          cardElevation={1}
          cardMaxElevation={1}
          cornerRadius={20}
          style={styles.card}>
          <View style={styles.addcitycontainer}>

            <Text style={styles.title_text}>Add Your City</Text>
            <TouchableOpacity onPress={toggleModal} >
              <Image
                source={Images.addmore_school_icon}
                style={styles.addicon}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.border}></View>
        </CardView>
        {/* modal for add your city */}
        <Modal isVisible={isModalVisible}
          onBackdropPress={toggleModal}
        >

          <View style={{ height: hp('20'), backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 22 }}>
            <TouchableOpacity onPress={toggleModal} style={{ alignSelf: 'flex-end', marginBottom: 20 }}>
              <Image
                source={Images.closeicon}
                style={{ height: 18, width: 18, marginRight: 10 }}
              />
            </TouchableOpacity>
            <View style={{ borderWidth: 1, height: hp('5'), borderColor: 'lightgrey', width: 300, flexDirection: 'row', alignItems: 'center', borderRadius: 5 }}>
              <Image
                source={Images.search}
                style={{ marginLeft: 10, tintColor: 'grey' }}
              />
              <TextInput
                onChangeText={onChangeNumber}
                value={number}
                placeholder="Search City"
                keyboardType='default'
              />
            </View>
            <TouchableOpacity style={{ height: hp('4.5'), width: wp('40'), backgroundColor: 'rgb(70,50,103)', marginTop: 15, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}><Text style={{ color: 'white' }}>Submit</Text></TouchableOpacity>
          </View>
        </Modal>
        <CardView
          cardElevation={1}
          cardMaxElevation={1}
          cornerRadius={20}

          style={styles.card}>
          <View style={styles.addcitycontainer}>

            <Text style={styles.title_text}>Work Details</Text>
            <TouchableOpacity onPress={() => props.navigation.navigate('WorkDetailsScreen')}>
              <Image
                source={Images.addmore_school_icon}
                style={styles.addicon}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.border}></View>
        </CardView>
        <CardView
          cardElevation={1}
          cardMaxElevation={1}
          cornerRadius={20}
          style={styles.card}>
          <View style={styles.addcitycontainer}>

            <Text style={styles.title_text}>Add School</Text>
            <TouchableOpacity onPress={() => props.navigation.navigate('AddSchoolScreen')}>
              <Image
                source={Images.addmore_school_icon}
                style={styles.addicon}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.border}></View>
        </CardView>
        <CardView
          cardElevation={1}
          cardMaxElevation={1}
          cornerRadius={15}
          style={{
            // width: '95%',

            backgroundColor: 'white',
            marginHorizontal: 15,
            marginTop: 20,

            paddingTop: 10,
            paddingBottom: 10

          }}>
          <View style={styles.addcitycontainer}>

            <Text style={styles.title_text}>School Details</Text>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity style={styles.zatchupstarclassbtn} onPress={() => {
                props.navigation.navigate('CoursesPendingScreen');
              }}>
                <Image
                  source={Images.footernormalicon}
                  style={{ tintColor: 'green', height: 25, width: 25, marginRight: 8 }}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => props.navigation.navigate('TeacherMessageChat')}>
                <Image
                  source={Images.comment}

                  style={{ tintColor: 'green', height: 25, width: 25, marginRight: 8, resizeMode: 'contain' }}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => props.navigation.navigate('StudentEducationScreen')}>
                <Image
                  source={Images.addmore_school_icon}
                  style={styles.addicon}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.border}></View>
          <View style={{ marginTop: 15 }}>
            <View style={styles.text_container}>
              <Text style={styles.detail_text}>School Name : </Text>
              <Text>abc</Text>
            </View>
            <View style={styles.text_container}>
              <Text style={styles.detail_text}>Zatchup ID : </Text>
              <Text>HRFAR53467</Text>
            </View>

            <View style={styles.text_container}>
              <Text style={styles.detail_text}>School Admission Number: </Text>
              <Text>327835626</Text>
            </View>
            <View style={styles.text_container}>
              <Text style={styles.detail_text}>State: </Text>
              <Text>Haryayna</Text>
            </View>
            <View style={styles.text_container}>
              <Text style={styles.detail_text}>City : </Text>
              <Text>Faridabad</Text>
            </View>
            <View style={styles.text_container}>
              <Text style={styles.detail_text}>Address : </Text>
              <Text>Faridabad</Text>
            </View>
            <View style={styles.text_container}>
              <Text style={styles.detail_text}>Pincode : </Text>
              <Text>20001</Text>
            </View>
          </View>
          <View style={styles.border}></View>
          <View style={{ marginTop: 10 }}>
            <View style={styles.addcitycontainer}>

              <Text style={styles.title_text}>Course Details</Text>
              <TouchableOpacity style={styles.zatchupstarclassbtn} 
              // onPress={() => {
              //   props.navigation.navigate('SchoolConfirmationScreen');
              // }}
              >
                <Image
                  source={Images.edit_icon}
                  style={styles.addicon}
                />
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: 10 }}>
              <View style={styles.text_container}>
                <Text style={styles.detail_text}>Name of Course : </Text>
                <Text>btech</Text>
              </View>
              <View style={styles.text_container}>
                <Text style={styles.detail_text}>Course Duration : </Text>
                <Text>OCT 2021</Text>
              </View>
              <View style={styles.text_container}>
                <Text style={styles.detail_text}>Course Tenure : </Text>
                <Text>0 month</Text>
              </View>
            </View>
          </View>
          <View style={styles.border}></View>
          <View style={{ marginTop: 10 }}>
            <Text style={styles.title_text}>Standard Details </Text>

            <View style={{ marginTop: 10 }}>
              <View style={styles.text_container}>
                <Text style={styles.detail_text}>Standard : </Text>
                <Text>BCCA (OCT-2021 to current)</Text>
              </View>
              <View style={styles.text_container}>
                <Text style={styles.detail_text}>Class(Sub-Section) : </Text>
                <Text>BCCA1</Text>
              </View>
              <View style={styles.text_container}>
                <Text style={styles.detail_text}>Class Alias: </Text>
                <Text>BCCA1</Text>
              </View>
              <View style={styles.text_container}>
                <Text style={styles.detail_text}>Roll Number: </Text>
                <Text>4564686899</Text>
              </View>
            </View>
          </View>
        </CardView>
      </ScrollView>
    </View>


  );
}
export default EducationProfileScreen;