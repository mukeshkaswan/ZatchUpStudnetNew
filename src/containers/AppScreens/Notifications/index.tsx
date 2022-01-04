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
import {Images, Colors} from '../../../components/index';
//import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import {CustomStatusBar, CustomHeader} from '../../../components';
import CardView from 'react-native-cardview';
import {
  NavigationContainer,
  useIsFocused,
  useFocusEffect,
} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import * as userActions from '../../../actions/user-actions-types';
import Toast from 'react-native-simple-toast';
import ProgressLoader from 'rn-progress-loader';
import {Card} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScrollView} from 'react-native-gesture-handler';
const screenWidth = Dimensions.get('window').width;
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
const Notifications = (props: NotificationsScreenProps) => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const [setdatafromlist, setData] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    getNotification();

    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, [isFocused]);

  function handleBackButtonClick() {
    props.navigation.goBack(null);
    return true;
  }

  /***************************User GET Notification list*******************************/

  const getNotification = async () => {
    var token = '';
    try {
      const value = await AsyncStorage.getItem('tokenlogin');
      if (value !== null) {
        // value previously stored
        token = value;
      }
    } catch (e) {
      // error reading value
    }

    const data = {
      token: token,
    };
    setLoading(true);

    dispatch(
      userActions.getNotificationFetch({
        data,

        callback: ({result, error}) => {
          if (result.status === true) {
            console.warn(
              'after result Notification',
              JSON.stringify(result, undefined, 2),

              setData(result.results),
              //   getdataCourse(result)
            );
            // setSpinnerStart(false);
            setLoading(false);
          }
          if (!error) {
            console.warn(JSON.stringify(error, undefined, 2));
            setLoading(false);
            // Toast.show('Invalid credentials', Toast.SHORT);
          } else {
            setLoading(false);
            console.warn(JSON.stringify(error, undefined, 2));
          }
        },
      }),
    );
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
        Title={'Notifications'}
        Back={'true'}
        navigation={props.navigation}
      />
     {setdatafromlist.length > 0 ? ( 
        <FlatList
        data={setdatafromlist}
        renderItem={({item}) => (
          <CardView
            cardElevation={5}
            cardMaxElevation={5}
            cornerRadius={1}
            style={styles.Cardview}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={Images.profile_img2}
                style={{
                  height: 50,
                  width: 50,
                  tintColor: 'grey',
                  borderRadius: 25,
                }}
              />

              <Text style={styles.Title_tv_}>{item.message}</Text>
            </View>
            <View style={styles.Title_view}>
              <Text style={styles.Title_view_child}>{item.recived_time}</Text>
            </View>
          </CardView>
        )}
        //  ItemSeparatorComponent={renderIndicator}
      />
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 15}}>No records found.</Text>
        </View>
      )}
    </View>
  );
};

export default Notifications;
