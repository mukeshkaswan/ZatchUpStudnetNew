import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  Keyboard,
  BackHandler,
  Alert,
  Dimensions,
  SectionList,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {HeaderTitleWithBack, Images} from '../../../../../components';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import {useDispatch} from 'react-redux';
import * as userActions from '../../../../../actions/user-actions-types';
import ProgressLoader from 'rn-progress-loader';
import {useIsFocused} from '@react-navigation/native';
interface NotificationsScreenProps {
  navigation: any;
}

const DATA = [
  {
    title: 'Main dishes',
    data: ['Pizza', 'Burger', 'Risotto'],
  },
  {
    title: 'Sides',
    data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
  },
  {
    title: 'Drinks',
    data: ['Water', 'Coke', 'Beer'],
  },
  {
    title: 'Desserts',
    data: ['Cheese Cake', 'Ice Cream'],
  },
];

const {height, width} = Dimensions.get('window');
const UserNotificationScreen = (props: NotificationsScreenProps) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  useEffect(() => {
    getUserNotification();
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, [isFocused]);

  function handleBackButtonClick() {
    Alert.alert(
      'Exit App',
      'Do you want to exit?',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Yes', onPress: onDeleteBTN},
      ],
      {cancelable: false},
    );
    return true;
  }

  const onDeleteBTN = async () => {
    try {
      await AsyncStorage.removeItem('tokenlogin');
      await AsyncStorage.removeItem('token');
    } catch (e) {
      // save error
    }
    Toast.show('Logout Successfully ', Toast.SHORT);

    props.navigation.navigate('LoginScreen');
    //  BackHandler.exitApp()
  };

  const getUserNotification = async () => {
    var token = '';
    try {
      const value = await AsyncStorage.getItem('token');
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
      userActions.getUserNotification({
        data,
        callback: ({result, error}) => {
          if (result) {
            setLoading(false);
            console.warn(
              'after result notification details',
              JSON.stringify(result, undefined, 2),
              //  props.navigation.navigate('OtpLogin', { 'firebase_id': result.firebase_username, 'username': email })
            );

            if (result.status) {
              //  setSuggestions(result.data);
              let newArr = [];

              if (result.today[0].notification_msg != null) {
                newArr.push({
                  title: 'Today',
                  data: result.today[0].notification_msg,
                });
              }
              if (result.yesterday[0].notification_msg != null) {
                newArr.push({
                  title: 'Yesterday',
                  data: result.yesterday[0].notification_msg,
                });
              }
              if (result.week[0].notification_msg != null) {
                newArr.push({
                  title: 'Week',
                  data: result.week[0].notification_msg,
                });
              }

              console.log('NEWARR', newArr);
              setNotifications(newArr);
            } else {
              // setSchoolDetail('');
            }

            setLoading(false);
          }
          if (!error) {
            console.warn(JSON.stringify(error, undefined, 2));
            setLoading(false);
          } else {
            setLoading(false);
            console.warn(JSON.stringify(error, undefined, 2));
          }
        },
      }),
    );
  };

  const Item = ({item}) => (
    <TouchableOpacity
      style={styles.item}
      disabled={
        item.notification_type == 'request'
          ? false
          : item.profile_block ||
            item.notification_type == 'delete' ||
            item.user_post_id == null
          ? true
          : false
      }
      onPress={() => {
        item.notification_type == 'request'
          ? item.user_role == 'EIREPRESENTATIVE'
            ? props.navigation.navigate('SchoolProfile', {
                item: {school_id: item.school_id, user_id: item.user_id},
              })
            : props.navigation.navigate('UsersProfile', {
                item: {user_id: item.user_id},
              })
          : props.navigation.navigate('PostDetailScreen', {
              item: {id: item.user_post_id},
            });
      }}>
      <Image
        source={
          item.following_user_profile_image != null
            ? {uri: item.following_user_profile_image}
            : Images.profile_default
        }
        style={styles.profileImg}
      />
      <View style={{flex: 1, marginStart: 12}}>
        <Text
          style={styles.title}
          numberOfLines={item.message.length > 100 ? 1 : 0}>
          {item.message}
        </Text>
        <Text style={{fontSize: 12}}>{item.notification_time}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <HeaderTitleWithBack
        navigation={props.navigation}
        headerTitle="Notification"
        headerRightcontent={''}
      />

      {isLoading && (
        <ProgressLoader
          visible={true}
          isModal={true}
          isHUD={true}
          //hudColor={"#ffffff00"}
          hudColor={'#4B2A6A'}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}
          color={'white'}
        />
      )}

      {!isLoading && notifications.length > 0 ? (
        <SectionList
          // ListEmptyComponent={() => (
          //   <View
          //     style={{
          //       flex: 1,
          //       justifyContent: 'center',
          //       alignItems: 'center',
          //       height: height - 72,
          //       width,
          //     }}>
          //     <Text style={{fontWeight: '700'}}>
          //       No Notification is available
          //     </Text>
          //   </View>
          // )}
          sections={notifications}
          keyExtractor={(item, index) => item + index}
          renderItem={({item}) => <Item item={item} />}
          renderSectionHeader={({section: {title}}) => (
            <Text style={styles.header}>{title}</Text>
          )}
        />
      ) : !isLoading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            height: height - 72,
            width,
          }}>
          <Text style={{fontWeight: '700'}}>No Notification is available</Text>
        </View>
      ) : (
        <View />
      )}
    </View>
  );
};

export default UserNotificationScreen;
