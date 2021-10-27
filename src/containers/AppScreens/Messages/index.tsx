import React, {Component, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Dimensions,
  Alert,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Platform,
  FlatList,
} from 'react-native';
import styles from './style';
import {Images} from '../../../components/index';
import {
  TextField,
  CustomButton,
  CustomStatusBar,
  Validate,
} from '../../../components';
import {useDispatch, useSelector} from 'react-redux';
import * as userActions from '../../../actions/user-actions-types';
import Toast from 'react-native-simple-toast';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const screenWidth = Dimensions.get('window').width;
const student_chat_data = [
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

interface MessagesScreenProps {
  navigation: any;
}
const Messages = (props: MessagesScreenProps) => {
  const [data, studentdata] = useState([student_chat_data]);

  React.useEffect(() => {
    // console.log('rtyuigfghj', props)
  }, []);
  const backPressed = () => {
    props.navigation.goBack(null);
    return true;
  };

  return (
    <View style={styles.container}>
      <CustomStatusBar />

      <View
        style={{
          height: Platform.OS === 'ios' ? '10%' : '7%',
          backgroundColor: 'rgb(70,50,103)',
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
        }}>
        <View
          style={{flexDirection: 'row', width: '100%', alignSelf: 'center'}}>
          <TouchableOpacity
            onPress={backPressed}
            style={{
              marginTop: Platform.OS === 'ios' ? 30 : 10,
              marginLeft: 10,
            }}>
            <Icon name="arrow-left" size={25} color="white" />
          </TouchableOpacity>

          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                textAlignVertical: 'center',
                textAlign: 'center',
                color: 'white',
                fontSize: hp(2.8),
                marginRight: 20,
                fontFamily: 'Lato-Regular',
                marginTop: Platform.OS === 'ios' ? 30 : 5,
              }}>
              {'Messages'}
            </Text>
          </View>
        </View>
      </View>

      {/* <HeaderTitleWithBack
          navigation={this.props.navigation}
          headerTitle="Messages"
        /> */}
      {/* <HeaderWithTitle headerTitle="Messages" /> */}

      <View style={{width: '100%'}}>
        <FlatList
          data={student_chat_data}
          renderItem={({item}) => (
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('TeacherMessageChat')}>
                <View style={styles.listCardWrapper}>
                  <View style={styles.userImageWrapper}>
                    <Image
                      style={styles.userImageStyle}
                      source={item.profileImage}
                    />
                  </View>
                  <View style={styles.msgCardRightWrapper}>
                    <View style={styles.msgCardHeaderWrapper}>
                      <View style={{flex: 1}}>
                        <Text
                          style={[
                            styles.userNameStyle,
                            {color: item.msg_read ? '#111111' : '#4B2A6A'},
                          ]}>
                          {item.name}
                        </Text>
                      </View>
                      <View style={{alignSelf: 'center'}}>
                        <Text
                          style={[
                            styles.timeTextStyle,
                            {color: item.msg_read ? '#111111' : '#4B2A6A'},
                          ]}>
                          {item.time}
                        </Text>
                      </View>
                    </View>
                    <View style={{flexDirection: 'row', paddingTop: 5}}>
                      <View style={{flex: 1}}>
                        <Text
                          numberOfLines={2}
                          style={{
                            fontSize: 15,
                            color: '#8F8F8F',
                          }}>
                          {item.message}
                        </Text>
                      </View>
                      <View style={{paddingTop: 5}}>
                        {/* <TouchableOpacity onPress={() => props.navigation.navigate('TeacherMessageChat')}> */}
                        <View style={{height: 15, width: 15}}>
                          <Image
                            style={{height: '100%', width: '100%'}}
                            source={Images.rightarrow}
                          />
                        </View>
                        {/* </TouchableOpacity> */}
                      </View>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    height: 2,
                    width: '90%',
                    marginLeft: 100,
                    // marginRight:10,
                    backgroundColor: '#E9E9E9',
                  }}
                />
              </TouchableOpacity>
            </ScrollView>
          )}
        />
      </View>
    </View>
  );
};

export default Messages;
