import React, {Component, FC, useEffect, useState} from 'react';
import {
  Text,
  View,
  Dimensions,
  BackHandler,
  FlatList,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import {Images, Colors} from '../../../../components/index';
//import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  TextField,
  CustomButton,
  CustomStatusBar,
  Validate,
  CustomHeader,
  BackBtn,
  HeaderTitleWithBack,
} from '../../../../components';
import {CheckBox} from 'react-native-elements';
import Modal from 'react-native-modal';
import {
  NavigationContainer,
  useIsFocused,
  useFocusEffect,
} from '@react-navigation/native';
import CardView from 'react-native-cardview';
import {useDispatch, useSelector} from 'react-redux';
import * as userActions from '../../../../actions/user-actions-types';
import Toast from 'react-native-simple-toast';
import ProgressLoader from 'rn-progress-loader';
import {Card} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenWidth = Dimensions.get('window').width;
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const data = [
  {
    id: 1,
    name: 'Mukesh Sharma',
    time: '2:26PM',
    profileImage: Images.profile_img2,
    message:
      'Lorem Ipsum is simply dummy text of the printing and type setting industry.',
    msg_read: false,
  },
  {
    id: 2,
    name: 'Prashant Chaudhary',
    time: 'Yesterday',
    profileImage: Images.profile_img2,
    message:
      'Lorem Ipsum is simply dummy text of the printing and type setting industry.',
    msg_read: true,
  },
  {
    id: 3,
    name: 'Mukesh Sharma',
    time: 'Yesterday',
    profileImage: Images.profile_img2,
    message:
      'Lorem Ipsum is simply dummy text of the printing and type setting industry.',
    msg_read: true,
  },
];

interface PostDetailsScreenProps {
  navigation: any;
}
const PostDetailScreen = (props: NotificationsScreenProps) => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const [setdatafromlist, setData] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [allSelected, setSelected] = useState(false);
  const [reply, showReply] = useState(false);
  const pressReply = () => {
    showReply(true);
  };
  const checkedterm = () => {
    setSelected(!allSelected);
  };

  const renderIndicator = () => {
    return (
      <View style={{}}>
        <ProgressLoader
          visible={true}
          isModal={true}
          isHUD={true}
          //hudColor={"#ffffff00"}
          hudColor={'#4B2A6A'}
          style={{justifyContent: 'center', alignItems: 'center', flex: 1}}
          color={'white'}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <CustomStatusBar />
      <CustomHeader
        Title={'Post Details'}
        Back={'true'}
        navigation={props.navigation}
      />
      <ScrollView>
        <CardView
          cardElevation={5}
          cardMaxElevation={5}
          // cornerRadius={20}
          style={styles.card}>
          <View style={{paddingHorizontal: 16, paddingVertical: 10}}>
            <Image
              source={require('../../../../assets/images/college4.jpg')}
              style={styles.image}
            />
          </View>
          <View style={styles.rowContainer}>
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={() => {
                props.navigation.navigate('ProfileScreen');
              }}>
              <Image source={Images.profile_img2} style={styles.profileImage} />
              <Text style={styles.nametext}>Simmi Sharma</Text>
            </TouchableOpacity>
            {/* <Text style={{fontWeight: 'bold', marginLeft: 30}}>
                Following
              </Text> */}

            <Icon name="ellipsis-v" color="grey" size={20} />
          </View>
          <View
            style={{
              borderWidth: 0.2,
              borderColor: 'grey',
              marginVertical: 5,
            }}></View>

          <FlatList
            data={data}
            renderItem={({item}) => (
              <View>
                <View style={styles.rowContainer}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      flex: 1,
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        props.navigation.navigate('ProfileScreen');
                      }}>
                      <Image
                        source={Images.profile_img2}
                        style={{
                          height: 40,
                          width: 40,
                          borderRadius: 50,
                          tintColor: 'grey',
                        }}
                      />
                    </TouchableOpacity>
                    <View style={{marginLeft: 10, flex: 2}}>
                      <TouchableOpacity
                        onPress={() => {
                          props.navigation.navigate('ProfileScreen');
                        }}>
                        <Text style={styles.nametext}>{item.name}</Text>
                      </TouchableOpacity>
                      <Text style={{marginLeft: 10}}>
                        Lorem Ipsum is simply{' '}
                      </Text>
                    </View>
                  </View>
                  {/* <Icon name="ellipsis-v" color="grey" size={20} /> */}
                  <Icon
                    name="thumbs-up"
                    size={15}
                    color="grey"
                    style={{marginLeft: 5}}
                  />
                </View>
                <View style={{flexDirection: 'row', marginLeft: 78}}>
                  <Text>Now</Text>
                  <Text style={styles.liketext}>1 Like</Text>
                  <Text style={styles.liketext} onPress={pressReply}>
                    Reply
                  </Text>
                </View>
                {reply == true ? (
                  <View>
                    <View style={styles.border}></View>
                    <View style={styles.rowContainer}>
                      <TextInput placeholder="Reply Comment" />
                      <TouchableOpacity style={styles.postbtn}>
                        <Text style={{color: 'white'}}>Reply</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  <View></View>
                )}
              </View>
            )}
            //  ItemSeparatorComponent={renderIndicator}
          />

          <View style={styles.border}></View>
          <View
            style={{flexDirection: 'row', marginTop: 5, paddingHorizontal: 16}}>
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
          <View
            style={{marginLeft: 6, paddingHorizontal: 16, paddingVertical: 10}}>
            <Text>
              Liked by <Text style={styles.boldtext}>Harshit</Text> and
              <Text style={styles.boldtext}> Others</Text>
            </Text>
            <Text style={{fontSize: 12, marginTop: 10}}>1 Hour ago</Text>
          </View>
          <View style={styles.border}></View>
          <View style={styles.rowContainer}>
            <TextInput placeholder="Add a comment" />
            <TouchableOpacity style={styles.postbtn}>
              <Text style={{color: 'white'}}>Post</Text>
            </TouchableOpacity>
          </View>
        </CardView>
        <View style={{paddingHorizontal: 16}}>
          <Text>
            More Post from{' '}
            <Text style={{fontWeight: 'bold'}}>Simmi Sharma</Text>
          </Text>
          <View style={styles.picContainer}>
            <Image
              source={require('../../../../assets/images/college1.jpg')}
              style={styles.image1}
            />
            <Image
              source={require('../../../../assets/images/college2.jpg')}
              style={styles.image1}
            />
          </View>
          <View style={styles.picContainer}>
            <Image
              source={require('../../../../assets/images/college3.jpg')}
              style={styles.image1}
            />
            <Image
              source={require('../../../../assets/images/college4.jpg')}
              style={styles.image1}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default PostDetailScreen;
