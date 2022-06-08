import React, { Component, FC, useEffect, useState } from 'react';
import {
  Text,
  View,
  Dimensions,
  BackHandler,
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  SafeAreaView,
  TextInput,
  TouchableOpacity
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styles from './styles';
import { Images, Colors } from '../../../components/index';
//import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CustomStatusBar, CustomHeader, HeaderTitleWithBack } from '../../../components';
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
import { Value } from 'react-native-reanimated';
const screenWidth = Dimensions.get('window').width;

interface SeeAllResultsScreenProps {
  navigation: any;
  route: any;
}
const SeeAllResults = (props: SeeAllResultsScreenProps) => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const [setdatafromlist, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [getFlag, setFlag] = useState(false);
  const [studentSelect, setStudentSelect] = useState(true);
  const [citydata, setCityData] = useState([]);


  const isFocused = useIsFocused();

  // useEffect(() => {
  //   getPeopleSearch(props.route.params.tvname);
  //   BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
  //   return () => {
  //     BackHandler.removeEventListener(
  //       'hardwareBackPress',
  //       handleBackButtonClick,
  //     );
  //   };
  // }, [isFocused]);


  useFocusEffect(
    React.useCallback(() => {
      setStudentSelect(true);

      getPeopleSearch(props.route.params.tvname);


      BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
      return () => {
        BackHandler.removeEventListener(
          'hardwareBackPress',
          handleBackButtonClick,
        );
      };
    }, []),
  );

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



  /***************************User GET User list*******************************/

  const getPeopleSearch = async value => {
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
      search: value,
    };
    // setLoading(true);

    dispatch(
      userActions.getSearchSchoolStudentSearchListFilterbyUser({
        data,

        callback: ({ results, error }) => {
          // console.warn(
          //   'after Search School Student result data',
          //   results,
          //   //  getdataProfile(result),
          // );
          if (results && results.length > 0) {
            // setSpinnerStart(false);
            setFlag(true);
            setCityData(results),
              setLoading(false);
          } else if (results && results.length == []) {
            setCityData([]);
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
  /***************************User GET School list*******************************/


  const getSchoolSearch = async value => {
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
      search: value,
    };
    // setLoading(true);

    dispatch(
      userActions.getSearchSchoolStudentSearchListFilterbySchool({
        data,

        callback: ({ results, error }) => {
          // console.warn(
          //   'after Search School Student result data',
          //   results,
          //   //  getdataProfile(result),
          // );
          if (results && results.length > 0) {
            // setSpinnerStart(false);
            setFlag(true);
            setCityData(results),
              setLoading(false);
          } else if (results && results.length == []) {
            setCityData([]);
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


  const SelectPeople = async () => {
    setStudentSelect(true);
    getPeopleSearch(props.route.params.tvname)
  };

  const SelectSchool = async () => {
    setStudentSelect(false);
    getSchoolSearch(props.route.params.tvname);

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
    <SafeAreaView style={{ flex: 1 }}>

      <View style={styles.container}>
        <CustomStatusBar />
        {isLoading && renderIndicator()}
        <HeaderTitleWithBack
          navigation={props.navigation}
          headerTitle="All Results"
        />
        {/* <CustomHeader
        Title={'Notifications'}
        Back={'true'}
        navigation={props.navigation}
      /> */}
        {getFlag === true ? <View style={{ flex: 1 }}>

          <View style={{
            flexDirection: 'row', justifyContent: 'center',
            alignItems: 'center', marginRight: '10%', marginLeft: '10%', marginTop: '2%'
          }}>

            <TouchableOpacity
              //  onPress={() => setStudentSelect(true)}
              onPress={() => SelectPeople()}

              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: studentSelect ? '#4B2A6A' : "#FFFFFF",
                borderColor: studentSelect ? '#C6CBD2' : '',
                borderWidth: 1,
                height: 50,
                width: '50%',
                borderRadius: 5,
                margin: 5,
              }}
              activeOpacity={0.5}>

              {/* <Image source={Images.yes_icon} style={{
                padding: 10,
                margin: 5,
                height: 20,
                width: 20,
                tintColor: studentSelect ? '#3EA63E' : "#E0E0E0",
                marginLeft: '10%',
                resizeMode: 'stretch',
              }} /> */}

              {/* <View style={styles.buttonIconSeparatorStyle} /> */}
              <Text style={{
                color: studentSelect ? '#FFFFFF' : "#B4B4B4",
                marginBottom: 4,
                marginLeft: 40,
                fontSize: 18,

              }}>
                People
              </Text>
            </TouchableOpacity>


            <TouchableOpacity
              // onPress={() => setStudentSelect(false)}
              // onPress={() => DeleteSchool()}
              onPress={() => SelectSchool()}

              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: studentSelect ? '#FFFFFF' : "#4B2A6A",
                borderColor: studentSelect ? '#C6CBD2' : '',
                borderWidth: 1,
                height: 50,
                width: '50%',
                borderRadius: 5,
                margin: 5,
              }}
              activeOpacity={0.5}>

              {/* <Image source={Images.no_icon} style={{
                padding: 10,
                margin: 5,
                height: 20,
                width: 20,

                tintColor: studentSelect ? '#E0E0E0' : "#4B2A6A",
                marginLeft: '10%',
                resizeMode: 'stretch',
              }} /> */}

              {/* <View style={styles.buttonIconSeparatorStyle} /> */}
              <Text style={{
                color: studentSelect ? '#B4B4B4' : "#FFFFFF",
                marginBottom: 4,
                marginLeft: 40,
                fontSize: 18
              }}>
                School
              </Text>
            </TouchableOpacity>



          </View>



          <View style={{
            // flex: 1,
            flexDirection: 'column',
          }}>
            <View
              style={{
                borderWidth: 1,
                height: hp('6'),
                marginVertical: hp('1'),
                borderColor: 'lightgrey',
                width: '90%',
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 20,
                borderRadius: 5,
                backgroundColor: '#FFFFFF',
              }}>
              <Image
                source={Images.search}
                style={{ marginLeft: 10, tintColor: '#000' }}
              />
              <TextInput
                // onChangeText={value => getSearchcitydata(value)}
                // value={'Current City'}
                style={{ color: '#000' }}
                placeholderTextColor="#000"
                placeholder="Current City"
                keyboardType="default"
              />
            </View>
          </View>


          <View style={{
            flexDirection: 'column',
          }}>
            <View
              style={{
                borderWidth: 1,
                height: hp('6'),
                marginVertical: hp('1'),
                borderColor: 'lightgrey',
                width: '90%',
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 20,
                borderRadius: 5,
                backgroundColor: '#FFFFFF',
              }}>
              <Image
                source={Images.search}
                style={{ marginLeft: 10, tintColor: '#000' }}
              />
              <TextInput
                // onChangeText={value => getSearchcitydata(value)}
                // value={'Current City'}
                style={{ color: '#000' }}
                placeholderTextColor="#000"
                placeholder="Current School"
                keyboardType="default"
              />
            </View>
          </View>


          <View style={{
            flexDirection: 'column',
          }}>
            <View
              style={{
                borderWidth: 1,
                height: hp('6'),
                marginVertical: hp('1'),
                borderColor: 'lightgrey',
                width: '90%',
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 20,
                borderRadius: 5,
                backgroundColor: '#FFFFFF',
              }}>
              <Image
                source={Images.search}
                style={{ marginLeft: 10, tintColor: '#000' }}
              />
              <TextInput
                // onChangeText={value => getSearchcitydata(value)}
                // value={'Current City'}
                style={{ color: '#000' }}
                placeholderTextColor="#000"
                placeholder="Past School"
                keyboardType="default"
              />
            </View>
          </View>
          {citydata.length > 0 ? (
            <ScrollView style={{ flex: 1, marginTop: 10 }}
            // refreshControl={
            //   <RefreshControl
            //     refreshing={refreshing}
            //     onRefresh={onRefresh}
            //     // title="Pull to refresh" 
            //     // tintColor="#fff" 
            //     //  titleColor="#fff"
            //     colors={["rgb(70,50,103)"]}
            //   />

            // }
            >


              <FlatList
                data={citydata}
                renderItem={({ item }) => (
                  <CardView
                    cardElevation={5}
                    cardMaxElevation={5}
                    cornerRadius={1}
                    style={styles.Cardview}>
                    <View
                      style={{
                        paddingHorizontal: 16,
                        paddingVertical: 10,
                        backgroundColor: 'white',
                        alignItems: 'center',
                        flex: 1,
                        width: '90%',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      {item.user_type == 'SCHOOL' ? <TouchableOpacity
                        underlayColor="none"

                        onPress={() =>
                          props.navigation.navigate('SchoolProfile', {
                            item: { school_id: item.school_id, user_id: item.id },
                          })
                        }
                      >
                        <View style={{ flexDirection: 'row' }}>
                          <Image


                            source={
                              item.profile_pic != null
                                ? { uri: item.profile_pic }
                                : Images.profile_default
                            }
                            // source={require('../../../assets/images/pic.jpeg')}
                            style={{
                              // marginLeft: 10,
                              width: 50,
                              height: 50,
                              borderRadius: 50,
                            }}
                          />
                          <View style={{ flexDirection: 'column' }}>

                            <View style={{ marginLeft: 10, justifyContent: 'center' }}>
                              <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}>
                                {item.display}
                              </Text>
                            </View>

                            {item.is_school_mate ? <View style={{ marginLeft: 8, justifyContent: 'center' }}>
                              <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 14, color: '#B4B4B4' }}>
                                {'School Mate'}
                              </Text>
                            </View> : null}

                            {studentSelect === false ? <View style={{ marginLeft: 10, justifyContent: 'center' }}>
                              <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#B4B4B4' }}>
                                {item.city}
                              </Text>
                            </View> : null}


                          </View>
                        </View>


                      </TouchableOpacity> : <TouchableOpacity
                        underlayColor="none"

                        onPress={() =>
                          props.navigation.navigate('UsersProfile', {
                            item: { user_id: item.id },
                          })
                        }
                      >
                        <View style={{ flexDirection: 'row' }}>
                          <Image


                            source={
                              item.profile_pic != null
                                ? { uri: item.profile_pic }
                                : Images.profile_default
                            }
                            // source={require('../../../assets/images/pic.jpeg')}
                            style={{
                              // marginLeft: 10,
                              width: 50,
                              height: 50,
                              borderRadius: 50,
                            }}
                          />
                          <View style={{ flexDirection: 'column' }}>

                            <View style={{ marginLeft: 10, justifyContent: 'center' }}>
                              <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}>
                                {item.display}
                              </Text>
                            </View>

                            {item.is_school_mate ? <View style={{ marginLeft: 8, justifyContent: 'center' }}>
                              <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 14, color: '#B4B4B4' }}>
                                {'School Mate'}
                              </Text>
                            </View> : null}

                            {studentSelect === false ? <View style={{ marginLeft: 10, justifyContent: 'center' }}>
                              <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#B4B4B4' }}>
                                {item.city}
                              </Text>
                            </View> : null}


                          </View>
                        </View>


                      </TouchableOpacity>}
                    </View>
                  </CardView>
                )}
              //  ItemSeparatorComponent={renderIndicator}
              />
            </ScrollView>

          ) :
            <ScrollView style={{ flex: 1 }}
            // refreshControl={
            //   <RefreshControl
            //     refreshing={refreshing}
            //     onRefresh={onRefresh}
            //     // title="Pull to refresh" 
            //     // tintColor="#fff" 
            //     //  titleColor="#fff"
            //     colors={["rgb(70,50,103)"]}
            //   />

            // }
            >
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: '80%' }}>
                <Text style={{ fontSize: 15 }}>No records found.</Text>
              </View>

            </ScrollView>

          }
        </View> : null}


      </View>
    </SafeAreaView>

  );
};

export default SeeAllResults;
