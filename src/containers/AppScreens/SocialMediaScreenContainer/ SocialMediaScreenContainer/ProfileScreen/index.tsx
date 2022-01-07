import React, {Component, FC, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  TextInput,
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

const data = [
  {
    id: 1,
    image1: 2,
    image2: 3,
    Video: 4,
    message1: 'hii how are you',
    message2: 'hii how are you',
  },

  {
    id: 2,
    image1: 2,
    Video: 4,
    message: 'hii how are you',
  },
  {
    id: 3,
    image1: 2,
    image2: 3,
  },
  {
    id: 2,
    image1: 2,
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

const ProfileScreen = (props: ProfileScreenProps) => {
  const [data, active_data] = useState('th');
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
                    // marginLeft: 10,
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
                  style={{flexDirection: 'row', marginLeft: 10, marginTop: 30}}>
                  <TouchableOpacity
                    onPress={() => {
                      props.navigation.navigate('PostDetailScreen');
                    }}>
                    <Text style={styles.nametext}>Rahul Yadav</Text>
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
            <View style={{flexDirection: 'row', marginTop: 10}}>
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
            <View style={{marginTop: 10}}>
              <TouchableOpacity
                style={{}}
                onPress={() => {
                  props.navigation.navigate('Messages');
                }}>
                <Icon name="envelope" size={24} color="grey" />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={styles.postbtn}
            onPress={() => {
              props.navigation.navigate('CreatePostScreen');
            }}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>Add Posts</Text>
          </TouchableOpacity>
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
              <Text style={{color: 'rgb(70,50,103)', fontWeight: 'bold'}}>
                Change Name
              </Text>
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
          </View>
          <View style={styles.borderstyle}></View>
          <View style={styles.tabrowContainer}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => active_data('th')}>
                <Icon
                  name="th"
                  size={30}
                  color={data === 'th' ? '#4B2A6A' : 'grey'}
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
              <Card style={styles.cardcontent}>
                <View style={{padding: 16}}>
                  <View style={styles.cardcontent1}>
                    <View style={{flexDirection: 'row'}}>
                      <Image
                        source={require('../../../../assets/images/pic.jpeg')}
                        style={styles.profilepic}
                      />
                      <Text style={styles.nametext}>Rahul Yadav</Text>
                    </View>
                    <Icon name="ellipsis-v" color="grey" size={20} />
                  </View>

                  <Image
                    source={require('../../../../assets/images/video.jpg')}
                    style={{width: '100%', height: 150, borderRadius: 15}}
                  />
                  <View style={{flexDirection: 'row', marginTop: 5}}>
                    <TouchableOpacity
                      onPress={() => {
                        props.navigation.navigate('PostDetailScreen');
                      }}>
                      <Icon
                        name="thumbs-up"
                        size={15}
                        color="grey"
                        style={{marginLeft: 5}}
                      />
                    </TouchableOpacity>
                    <Icon
                      name="comment"
                      color="grey"
                      size={15}
                      style={{marginLeft: 5}}
                    />
                  </View>

                  <FlatList
                    data={data2}
                    renderItem={({item}) => (
                      <View
                        style={{
                          flex: 1,

                          justifyContent: 'space-between',
                          flexDirection: 'row',
                          marginTop: 10,
                        }}>
                        <Text style={{flex: 2.1, fontWeight: 'bold'}}>
                          Rahul Yadav
                        </Text>
                        <Text style={{flex: 5.2}}>
                          Lorem ipsum is simply dummy{''}
                        </Text>

                        <Icon
                          name="thumbs-up"
                          size={15}
                          color="grey"
                          style={{marginLeft: 5, alignSelf: 'flex-end'}}
                        />
                      </View>
                    )}
                    //  ItemSeparatorComponent={renderIndicator}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      props.navigation.navigate('PostDetailScreen');
                    }}>
                    <Text style={{fontSize: 12, marginTop: 10}}>
                      VIEW ALL 3 COMMENT
                    </Text>
                  </TouchableOpacity>

                  <Text style={{fontSize: 12, marginTop: 8}}>1 Hour ago</Text>
                </View>
                <View
                  style={{borderWidth: 0.5, borderColor: 'lightgrey'}}></View>
                <View style={styles.cardrowContainer}>
                  <TextInput placeholder="Add a comment" />
                  <TouchableOpacity style={styles.postbtn}>
                    <Text style={{color: 'white'}}>Post</Text>
                  </TouchableOpacity>
                </View>
              </Card>
            )}
            //ItemSeparatorComponent={renderIndicator}
          />
        )}
      </ScrollView>
    </View>
  );
};
export default ProfileScreen;
