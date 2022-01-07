import React, {Component, FC, useEffect, useState} from 'react';
import {
  Text,
  View,
  Dimensions,
  BackHandler,
  FlatList,
  Image,
} from 'react-native';
import styles from './styles';
import {Images, Colors} from '../../../../components/index';
//import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import {CustomStatusBar, CustomHeader} from '../../../../components';
import CardView from 'react-native-cardview';
import Modal from 'react-native-modal';
import {
  NavigationContainer,
  useIsFocused,
  useFocusEffect,
} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import * as userActions from '../../../../actions/user-actions-types';
import Toast from 'react-native-simple-toast';
import ProgressLoader from 'rn-progress-loader';
import {Card} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
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
  {
    id: 4,
    name: 'Prashant Sharma',
    time: 'Yesterday',
    profileImage: Images.profile_img2,
    message:
      'Lorem Ipsum is simply dummy text of the printing and type setting industry.',
    msg_read: true,
  },
  {
    id: 5,
    name: 'Prashant Chaudhary',
    time: 'Yesterday',
    profileImage: Images.profile_img2,
    message:
      'Lorem Ipsum is simply dummy text of the printing and type setting industry.',
    msg_read: true,
  },
  {
    id: 6,
    name: 'Prashant Chaudhary',
    time: 'Yesterday',
    profileImage: Images.profile_img2,
    message:
      'Lorem Ipsum is simply dummy text of the printing and type setting industry.',
    msg_read: true,
  },
  {
    id: 7,
    name: 'Mukesh Sharma',
    time: 'Yesterday',
    profileImage: Images.profile_img2,
    message:
      'Lorem Ipsum is simply dummy text of the printing and type setting industry.',
    msg_read: true,
  },
  {
    id: 8,
    name: 'Prashant Sharma',
    time: 'Yesterday',
    profileImage: Images.profile_img2,
    message:
      'Lorem Ipsum is simply dummy text of the printing and type setting industry.',
    msg_read: true,
  },
  {
    id: 9,
    name: 'Prashant Chaudhary',
    time: 'Yesterday',
    profileImage: Images.profile_img2,
    message:
      'Lorem Ipsum is simply dummy text of the printing and type setting industry.',
    msg_read: true,
  },
];

interface NotificationsScreenProps {
  navigation: any;
}
const FollowersScreen = (props: NotificationsScreenProps) => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const [setdatafromlist, setData] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
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
        Title={'Followers'}
        Back={'true'}
        navigation={props.navigation}
      />
      <FlatList
        data={data}
        renderItem={({item}) => (
          <CardView
            cardElevation={5}
            cardMaxElevation={5}
            cornerRadius={1}
            style={styles.Cardview}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                source={Images.profile_img2}
                style={{
                  height: 50,
                  width: 50,
                  tintColor: 'grey',
                  borderRadius: 25,
                }}
              />
              <View style={{marginLeft: 10}}>
                <Text style={{fontWeight: 'bold', fontSize: hp(2)}}>
                  Ankit Sharma
                </Text>
                <Text style={{color: 'grey', fontWeight: 'bold'}}>
                  School Mates
                </Text>
              </View>
            </View>
            <View style={styles.Title_view}>
              <TouchableOpacity style={styles.removebtn} onPress={toggleModal}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: hp(1.8),
                    fontWeight: 'bold',
                  }}>
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          </CardView>
        )}
        //  ItemSeparatorComponent={renderIndicator}
      />
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        backdropOpacity={0.4}>
        <View
          style={{
            //height: hp('55'),
            backgroundColor: Colors.$backgroundColor,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 20,

            borderRadius: 5,
          }}>
          <Image
            source={Images.profile_img2}
            style={{
              height: 50,
              width: 50,
              tintColor: 'grey',
              borderRadius: 25,
            }}
          />
          <View style={{paddingHorizontal: 16, alignItems: 'center'}}>
            <Text
              style={{fontWeight: 'bold', fontSize: hp(2.2), marginTop: 25}}>
              Remove Follower?
            </Text>
            <Text style={{textAlign: 'center', fontSize: hp(1.8)}}>
              Zatchup won't tell @ankitsharma that they have been removed from
              the Followers.
            </Text>
          </View>
          <View
            style={{
              borderWidth: 0.5,
              borderColor: 'lightgrey',
              width: '100%',
              marginTop: 30,
            }}></View>
          <TouchableOpacity>
            <Text style={{color: 'rgb(70,50,103)', marginTop: 10}}>Remove</Text>
          </TouchableOpacity>
          <View
            style={{
              borderWidth: 0.5,
              borderColor: 'lightgrey',
              width: '100%',
              marginTop: 12,
            }}></View>
          <TouchableOpacity onPress={toggleModal}>
            <Text style={{color: 'red', marginTop: 10}}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default FollowersScreen;
