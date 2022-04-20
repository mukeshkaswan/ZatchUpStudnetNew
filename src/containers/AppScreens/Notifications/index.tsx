import React, { Component, FC, useEffect, useState } from 'react';
import {
  Text,
  View,
  Dimensions,
  BackHandler,
  FlatList,
  Image,
  RefreshControl,
  ScrollView
} from 'react-native';
import styles from './styles';
import { Images, Colors } from '../../../components/index';
//import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CustomStatusBar, CustomHeader } from '../../../components';
import CardView from 'react-native-cardview';
import {
  NavigationContainer,
  useIsFocused,
  useFocusEffect,
} from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import * as userActions from '../../../actions/user-actions-types';
import Toast from 'react-native-simple-toast';
import ProgressLoader from 'rn-progress-loader';
import { Card } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
const screenWidth = Dimensions.get('window').width;

interface NotificationsScreenProps {
  navigation: any;
}
const Notifications = (props: NotificationsScreenProps) => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const [setdatafromlist, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [getFlag, setFlag] = useState(false);


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

  const onRefresh = React.useCallback(() => {
    getNotification();
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);

  const wait = (timeout: any) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
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

        callback: ({ result, error }) => {
          if (result.status === true) {
            setLoading(false);
            setFlag(true);

            setData(result.results)
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

  const renderIndicator = () => {
    return (
      <View style={{}}>
        <ProgressLoader
          visible={true}
          isModal={true}
          isHUD={true}
          //hudColor={"#ffffff00"}
          hudColor={'#4B2A6A'}
          style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
          color={'white'}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <CustomStatusBar />
      {isLoading && renderIndicator()}

      <CustomHeader
        Title={'Notifications'}
        Back={'true'}
        navigation={props.navigation}
      />
      {getFlag === true ? <View style={{ flex: 1 }}>

        {setdatafromlist.length > 0 ? (
          <ScrollView style={{ flex: 1 }}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                // title="Pull to refresh" 
                // tintColor="#fff" 
                //  titleColor="#fff"
                colors={["rgb(70,50,103)"]}
              />

            }>
            <FlatList
              data={setdatafromlist}
              renderItem={({ item }) => (
                <CardView
                  cardElevation={5}
                  cardMaxElevation={5}
                  cornerRadius={1}
                  style={styles.Cardview}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {/* <Image
                source={Images.profile_img2}
                style={{
                  height: 50,
                  width: 50,
                  tintColor: 'grey',
                  borderRadius: 25,
                }}
              /> */}

                    <Text style={styles.Title_tv_}>{item.message}</Text>
                  </View>
                  <View style={styles.Title_view}>
                    <Text style={styles.Title_view_child}>{item.recived_time}</Text>
                  </View>
                </CardView>
              )}
            //  ItemSeparatorComponent={renderIndicator}
            />
          </ScrollView>

        ) :
          <ScrollView style={{ flex: 1 }}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                // title="Pull to refresh" 
                // tintColor="#fff" 
                //  titleColor="#fff"
                colors={["rgb(70,50,103)"]}
              />

            }>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: '80%' }}>
              <Text style={{ fontSize: 15 }}>No records found.</Text>
            </View>

          </ScrollView>

        }
      </View> : null}


    </View>

  );
};

export default Notifications;
