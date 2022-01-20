import React, {Component, FC, useState, useEffect} from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Platform,
  ImageBackground,
  ScrollView,
  Alert,
  BackHandler,
} from 'react-native';
import styles from './style.tsx';
import {
  TextField,
  CustomButton,
  CustomStatusBar,
  Validate,
  CustomHeader,
  BackBtn,
  HeaderTitleWithBack,
} from '../../../components';
import {Images} from '../../../components/index';
import Toast from 'react-native-simple-toast';
import {useDispatch, useSelector} from 'react-redux';
import * as userActions from '../../../actions/user-actions-types';
import ProgressLoader from 'rn-progress-loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import style from '../Messages/style';

const data = [
  {
    id: 1,
    Text: 'School Reminder 1',
  },
  {
    id: 2,
    Text: 'School Reminder 2',
  },
  {
    id: 3,
    Text: 'School Reminder 3',
  },
  {
    id: 4,
    Text: 'School Reminder 4',
  },
];
interface ResetPasswordScreenProps {
  navigation: any;
}

const Reminders = (props: ResetPasswordScreenProps) => {
  const [isLoading, setLoading] = useState(true);
  const [reminder, setReminder] = useState([]);

  const dispatch = useDispatch();

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
  useEffect(() => {
    //console.log('hey......');
    getRemindersApi();
  }, []);

  const backPressed = () => {
    props.navigation.goBack(null);
    return true;
  };

  const getRemindersApi = async () => {
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

    console.log('Token At reminders==>>', token);
    const data = {
      token: token,
    };

    dispatch(
      userActions.getReminders({
        data,
        callback: ({result, error}) => {
          if (result) {
            // console.log(
            //   'after result reminders',
            //   JSON.stringify(result, undefined, 2),
            // );

            setLoading(false);
            if (result.status) {
              setReminder(result.results);
            }
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

  return (
    <View style={styles.container}>
      <CustomStatusBar />
      <HeaderTitleWithBack
        navigation={props.navigation}
        headerTitle="Reminders"
      />

      {reminder.length > 0 ? (
        <FlatList
          data={reminder}
          renderItem={({item}) => (
            <View style={{paddingHorizontal: 16}}>
              <View style={styles.reminderrowcontainer}>
                <View
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    justifyContent: 'space-between',
                    paddingEnd: 12,
                  }}>
                  <Text style={styles.schoolremindertext}>{item.message}</Text>
                  <Text style={{marginTop:30,fontSize:12,color:'#4B2A6A'}}>{'-Send By: ' + item.sender_name}</Text>
                </View>
                {item.attachment != null && (
                  <View style={styles.reminderarrowcontainer}>
                    <TouchableOpacity
                      style={styles.zatchupstarclassbtn}
                      onPress={() => {
                        props.navigation.navigate('ReminderTitleScreen', {
                          item,
                        });
                      }}>
                      <View style={{height: 18, width: 20}}>
                        <Image
                          style={{
                            height: '100%',
                            width: '100%',
                            tintColor: 'white',
                          }}
                          source={Images.rightarrow}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          )}
        />
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 15}}>Records not available.</Text>
        </View>
      )}
    </View>
  );
};
export default Reminders;
