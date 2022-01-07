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
} from '../../../../components';
import styles from './style.tsx';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';
import images from '../../../../components/images';
import {SafeAreaView} from 'react-native-safe-area-context';
const data = [
  {
    id: 1,
  },

  {
    id: 2,
  },
  {
    id: 3,
  },
];
const data2 = [
  {
    id: 1,
  },

  {
    id: 2,
  },
  {
    id: 3,
  },
];

const SchoolProfile = (props: UserProfileProps) => {
  const [data, active_data] = useState('thData');
  return (
    <View style={styles.container}>
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
            source={require('../../../../assets/images/college2.jpg')}
            resizeMode="stretch"
            style={{width: '100%', height: 100}}>
            <View
              style={{
                backgroundColor: 'black',
                height: 30,
                width: 30,
                justifyContent: 'center',
                margin: 10,
              }}>
              <Icon name="camera" size={18} color="white" style={{margin: 5}} />
            </View>
          </ImageBackground>

          <View style={styles.rowContainer}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View>
                <Image
                  source={require('../../../../assets/images/pic.jpeg')}
                  style={{
                    marginLeft: 10,
                    width: 80,
                    height: 80,
                    borderRadius: 50,
                  }}
                />
                <Icon
                  name={'camera'}
                  size={15}
                  style={{
                    backgroundColor: '#ccc',
                    position: 'absolute',
                    right: 0,
                    bottom: 0,
                    marginRight: 8,
                  }}
                />
              </View>

              <View>
                <View
                  style={{flexDirection: 'row', marginLeft: 14, marginTop: 30}}>
                  <TouchableOpacity
                    onPress={() => {
                      props.navigation.navigate('PostDetailScreen');
                    }}>
                    <Text style={styles.nametext}>Rohit Yadav</Text>
                  </TouchableOpacity>
                  <Icon
                    name="check-circle"
                    size={18}
                    color="#4E387E"
                    style={{margin: 5}}
                  />
                </View>
              </View>
            </View>
          </View>
          <View style={styles.likecontainer}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('FollowersScreen');
                }}>
                <Text style={styles.boldText}>20K</Text>
                <Text>Followers</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('FollowingScreen');
                }}
                style={{marginLeft: 10}}>
                <Text style={styles.boldText}>21k</Text>
                <Text style={{}}>Following</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.messageicon}>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('Messages');
                }}>
                <Icon name="envelope" size={24} color="grey" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Card style={styles.cardContent}>
          <View style={styles.cardtitlecontent}>
            <Text style={styles.cardtitletext}>Education</Text>
          </View>
          <View style={styles.borderstyle}></View>
          <View style={styles.textcontainer}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.Personal_Tv}>Delhi Public School</Text>
              <Icon
                name="check-circle"
                size={17}
                color="#4E387E"
                style={{marginLeft: 5, marginTop: 2}}
              />
            </View>

            <View style={styles.view_Row}>
              <Text style={styles.view_Tv_1}>6th :</Text>
              <Text style={styles.view_Tv_2}>(Batch 2016-2017)</Text>
            </View>
            <View style={styles.view_Row}>
              <Text style={styles.view_Tv_1}>7th :</Text>
              <Text style={styles.view_Tv_2}>(Batch 2017-2018)</Text>
            </View>
          </View>
          <View style={styles.borderstyle}></View>
          <View style={styles.textcontainer}>
            <Text style={styles.Personal_Tv}>Army Public School</Text>
            <View style={styles.view_Row}>
              <Text style={styles.view_Tv_1}>8th :</Text>
              <Text style={styles.view_Tv_2}>(Batch 2019-2020)</Text>
            </View>
            <View style={styles.view_Row}>
              <Text style={styles.view_Tv_1}>9th :</Text>
              <Text style={styles.view_Tv_2}>(Batch 2019-2020)</Text>
            </View>
            <Text style={styles.currentschoolText}>Current School</Text>
          </View>
        </Card>
        <Card style={styles.cardContent}>
          <View style={styles.cardtitlecontent}>
            <View>
              <Text style={styles.cardtitletext}>Personal Information</Text>
            </View>
            <TouchableOpacity
              style={styles.changebtn}
              onPress={() => {
                props.navigation.navigate('eKYC');
              }}>
              <Text style={{color: 'rgb(70,50,103)'}}>Change Name</Text>
            </TouchableOpacity>
            <View>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('SettingScreen');
                }}>
                <Image source={images.edit_icon} style={styles.editicon} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.borderstyle}></View>
          <View style={styles.textcontainer}>
            <View style={styles.view_Row}>
              <Text style={styles.view_Tv_1}>DOB :</Text>
              <Text style={styles.view_Tv_2}>30/Oct/1997</Text>
            </View>
            <View style={styles.view_Row}>
              <Text style={styles.view_Tv_1}>Gender :</Text>
              <Text style={styles.view_Tv_2}>Male</Text>
            </View>

            <View style={styles.view_Row}>
              <Text style={styles.view_Tv_1}>Email:</Text>
              <Text style={styles.view_Tv_2}>testuser@gmail.com</Text>
            </View>
            <View style={styles.view_Row}>
              <Text style={styles.view_Tv_1}>Phone :</Text>
              <Text style={styles.view_Tv_2}>76876890909090</Text>
            </View>
            <View style={styles.view_Row}>
              <Text style={styles.view_Tv_1}>Profession :</Text>
              <Text style={styles.view_Tv_2}>30/Oct/1997</Text>
            </View>
            <View style={styles.view_Row}>
              <Text style={styles.view_Tv_1}>City :</Text>
              <Text style={styles.view_Tv_2}>Noida</Text>
            </View>
          </View>
        </Card>
        <Card style={styles.cardContent}>
          <View style={styles.cardtitlecontent}>
            <Text style={styles.cardtitletext}>Posts</Text>
            <TouchableOpacity
              style={styles.postbtn}
              onPress={() => {
                props.navigation.navigate('CreatePostScreen');
              }}>
              <Text style={{color: 'white'}}>Add Posts</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.borderstyle}></View>
          <View style={styles.tabrowContainer}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => active_data('thData')}>
                <Icon
                  name="th"
                  size={30}
                  color={data === 'thData' ? '#4B2A6A' : 'grey'}
                />
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => active_data('Image')}>
                <Icon
                  name="image"
                  size={30}
                  color={data === 'Image' ? '#4B2A6A' : 'grey'}
                  style={{marginLeft: 80}}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Card>
        {!(data === 'Image') ? (
          <FlatList
            data={data2}
            renderItem={({item}) => (
              <View
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 5,
                  borderRadius: 5,
                }}>
                <Image
                  source={require('../../../../assets/images/college1.jpg')}
                  style={{width: '100%', borderRadius: 5}}
                />
              </View>
            )}
            //  ItemSeparatorComponent={renderIndicator}
          />
        ) : (
          <FlatList
            data={data2}
            renderItem={({item}) => (
              <View>
                <Customcard />
              </View>
            )}
            //  ItemSeparatorComponent={renderIndicator}
          />
        )}
      </ScrollView>
    </View>
  );
};
export default SchoolProfile;
