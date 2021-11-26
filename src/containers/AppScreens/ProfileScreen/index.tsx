import React, {Component, FC, useState} from 'react';
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
import {Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';
import images from '../../../components/images';
import {SafeAreaView} from 'react-native-safe-area-context';

//import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const ProfileScreen = (props: ResetPasswordScreenProps) => {
  const [data, active_data] = useState('Student');
  return (
    <View style={styles.container}>
      <HeaderTitleWithBack
        navigation={props.navigation}
        headerTitle="Profile"
      />

      <ScrollView>
        <View style={styles.profilecontainer}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={require('../../../assets/images/pic.jpeg')}
              style={styles.profilepic}
            />
            <View style={styles.profiletextcontainer}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.nametext}>Neha Sharma</Text>
                <Icon
                  name="check-circle"
                  size={18}
                  color="#4E387E"
                  style={{margin: 5}}
                />
              </View>
              <Text style={{color: 'grey', fontWeight: 'bold'}}>
                You were in same class in 2019
              </Text>
            </View>
          </View>
          <View style={styles.messageicon}>
            <Icon name="envelope" size={24} color="grey" />
          </View>
        </View>
        <View style={styles.likecontainer}>
          <View>
            <Text style={{fontWeight: 'bold', textAlign: 'center'}}>20K</Text>
            <Text>Followers</Text>
          </View>
          <View style={{marginLeft: 10}}>
            <Text style={{fontWeight: 'bold', textAlign: 'center'}}>205</Text>
            <Text style={{}}>Buddies</Text>
          </View>
          {/* <TouchableOpacity style={styles.followbutton}>
            <Text style={{color: 'white', fontSize: 12}}>Follow</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addbuddybutton}>
            <Text style={{color: 'grey', fontSize: 12}}>Add Buddy</Text>
          </TouchableOpacity> */}
        </View>
        <Card style={styles.cardContent}>
          <View style={styles.cardtitlecontent}>
            <Text style={styles.cardtitletext}>Education</Text>
            <Image
              source={images.edit_icon}
              style={{
                resizeMode: 'stretch',

                marginLeft: 8,
                width: 20,
                height: 20,
              }}
            />
          </View>
          <View style={styles.borderstyle}></View>
          <View style={styles.textcontainer}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.schooltext}>Delhi Public School</Text>
              <Icon
                name="check-circle"
                size={17}
                color="#4E387E"
                style={{marginLeft: 5, marginTop: 2}}
              />
            </View>
            <Text style={styles.textcontent}>
              <Text style={styles.boldtext}>6th</Text> (Batch 2016-2017)
            </Text>
            <Text style={styles.textcontent}>
              <Text style={styles.boldtext}>7th</Text> (Batch 2017-2018)
            </Text>
          </View>
          <View style={styles.borderstyle}></View>
          <View style={styles.textcontainer}>
            <Text style={styles.schooltext}>Army Public School</Text>
            <Text style={styles.textcontent}>
              <Text style={styles.boldtext}>8th</Text> (Batch 2010-2019)
            </Text>
            <Text style={styles.textcontent}>
              <Text style={styles.boldtext}>9th</Text> (Batch 2019-2020)
            </Text>
            <Text style={styles.currentschoolText}>Current School</Text>
          </View>
        </Card>
        <Card style={styles.cardContent}>
          <View style={styles.cardtitlecontent}>
            <View>
              <Text style={styles.cardtitletext}>Personal Information</Text>
            </View>
            <TouchableOpacity
              style={{borderWidth: 1, padding: 5, borderRadius: 5}}>
              <Text style={{color: 'rgb(70,50,103)'}}>Change Name</Text>
            </TouchableOpacity>
            <View>
              <Image
                source={images.edit_icon}
                style={{
                  resizeMode: 'stretch',

                  marginLeft: 8,
                  width: 20,
                  height: 20,
                }}
              />
            </View>
          </View>

          <View style={styles.borderstyle}></View>
          <View style={styles.textcontainer}>
            <Text style={styles.personalinfocontent}>
              <Text style={styles.boldtext}>DOB : </Text>30/Oct/1997
            </Text>
            <Text style={styles.personalinfocontent}>
              <Text style={styles.boldtext}>Gender : </Text>Male
            </Text>
            <Text style={styles.personalinfocontent}>
              <Text style={styles.boldtext}>Email : </Text>Simmi.sh@gmail.com
            </Text>
            <Text style={styles.personalinfocontent}>
              <Text style={styles.boldtext}>Phone : </Text>9869869579
            </Text>
            <Text style={styles.personalinfocontent}>
              <Text style={styles.boldtext}>Profession : </Text>Student
            </Text>
            <Text style={styles.personalinfocontent}>
              <Text style={styles.boldtext}>City : </Text>Noida
            </Text>
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
              <Text style={{color: 'white'}}>Add Posts</Text>
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
            <View style={{flexDirection: 'row'}}>
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
                  style={{marginLeft: 80}}
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
