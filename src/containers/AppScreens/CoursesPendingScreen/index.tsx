import React, { Component, FC, useState, useEffect } from 'react';
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
  SafeAreaView
} from 'react-native';
import styles from './style';
import {
  TextField,
  CustomButton,
  CustomStatusBar,
  Validate,
  CustomHeader,
  BackBtn,
  HeaderTitleWithBack,
} from '../../../components';
import { Images } from '../../../components/index';
import Toast from 'react-native-simple-toast';
import { useDispatch, useSelector } from 'react-redux';
import * as userActions from '../../../actions/user-actions-types';
import ProgressLoader from 'rn-progress-loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import style from '../Messages/style';
import CardView from 'react-native-cardview';
import images from '../../../components/images';
import {
  NavigationContainer,
  useIsFocused,
  DrawerActions,
  useFocusEffect
} from '@react-navigation/native';
interface CoursesPendingScreenProps {
  navigation: any;
  route: any;

}

const CoursesPendingScreen = (props: CoursesPendingScreenProps) => {

  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const [schoolname, setSchoolname] = useState('');
  const [zatchupid, setZatchUpId] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [admissonno, setAdmissonno] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [setdatafromlist, setDataCourseInList] = useState([]);
  const [getFlag, setFlag] = useState(false);



  function handleBackBut() {
    props.navigation.goBack();
    return true;
  }
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

  const backPressed = () => {
    props.navigation.goBack(null);
    return true;
  };

  useEffect(() => {

    getData();


  }, [isFocused]);


  const DeleteSchool = async id => {
    Alert.alert(
      'Delete',
      'Are you sure, You want to delete ?',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'Yes', onPress: () => Coursedelete(id) },
      ],
      { cancelable: false },
    );
    return true;
  };


  const getdataCourse = async result => {

    setDataCourseInList(result.data);

    result.data.map((element: any) => {

      if (element.course_detail.length > 0) {
        setDataCourseInList(result.data);


      } else {
        setDataCourseInList([])

      }

    });
  };



  const getdataProfile = async result => {
    result.data.map((element: any) => {

      setSchoolname(element.name_of_school);
      setZatchUpId(element.school_code);
      setState(element.state);
      setCity(element.city);
      setAdmissonno(element.admission_number);
      setAddress1(element.address1);
      setAddress2(element.address2);

    });

  };



  /***************************User get Delete Pending list *******************************/

  const Coursedelete = async id => {
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
      course_id: id,
    };
    setLoading(true);

    dispatch(
      userActions.getUserdeletependingcoursedetail({
        data,
        callback: ({ result, error }) => {
          if (result) {
            setLoading(false);
            // console.warn(
            //   'after result',
            //   JSON.stringify(result, undefined, 2),
            //   // getdataCourseKey(result)
            //   // getEicourseconfirmationlist(),


            //   // props.navigation.navigate('SelectStudent'),
            // );
            Toast.show('Course is Deleted successfully', Toast.SHORT),
              getData()
            // setSpinnerStart(false);
          }
          if (!error) {
            console.warn(JSON.stringify(error, undefined, 2));
            // setLoginSuccess(result);
            setLoading(false);
            //console.log('dfdfdf--------', error)
            // Toast.show('Invalid credentials', Toast.SHORT);
            // Alert.alert(error.message[0])
            // signOut();
          } else {
            // setError(true);
            // signOut();
            // Alert.alert(result.status)
            // Toast.show('Invalid credentials', Toast.SHORT);
            setLoading(false);
            console.warn(JSON.stringify(error, undefined, 2));
          }
        },
      }),
    );
  };

  /***************************User GET Pending Course list *******************************/

  const getData = async () => {
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
      school_id: props.route.params.school_id,

    };
    setLoading(true);

    dispatch(
      userActions.getPendingCourseListOfUser({
        data,

        callback: ({ result, error }) => {
          if (result.status === true) {

            setLoading(false);


            setFlag(true);
            getdataProfile(result),
              getdataCourse(result);
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


  const rednderItemList = (item, index) => {
    return (
      <>
        {item.course_detail.length > 0 &&
          item.course_detail.map(i => {
            console.log('resultss', item.course_detail)

            return (
              <CardView
                cardElevation={5}
                cardMaxElevation={5}
                // cornerRadius={15}
                style={{
                  backgroundColor: 'white',
                  marginHorizontal: 20,
                  // marginTop: 1,
                  paddingBottom: 18,
                  paddingTop: 1,
                }}>
                <View style={{ marginTop: 25, }}>
                  <View style={styles.rowcontainer}>
                    <Text style={styles.title_text}>Course Details</Text>
                    <TouchableOpacity
                      underlayColor="none"
                      onPress={() => DeleteSchool(i.course_id)}>

                      <Image
                        source={images.delete_icon}
                        style={{ height: 25, width: 25, marginRight: 15 }}
                      />
                    </TouchableOpacity>

                  </View>
                </View>

                <View style={styles.border}></View>
                <View style={{ marginTop: 15 }}>
                  <View style={styles.view_Row}>
                    <Text style={styles.view_Tv_1}>Name of Course :</Text>
                    <Text style={styles.view_Tv_2}>{i.course_name}</Text>
                  </View>
                  {/* <View style={styles.view_Row}>
                    <Text style={styles.view_Tv_1}>Course Duration :</Text>
                    <Text style={styles.view_Tv_2}>{i.start_year}</Text>

                  </View> */}

                  <View style={styles.view_Row}>
                    <Text style={styles.view_Tv_1}>Course Duration :</Text>
                    {i.is_current_course == true ? <Text style={styles.view_Tv_2}>
                      {i.start_year +
                        ' ' +
                        '-'
                        +
                        ' Current'}
                    </Text> : <Text style={styles.view_Tv_2}>
                      {i.start_year +
                        ' ' +
                        '-'
                        +
                        i.end_year}
                    </Text>}

                  </View>

                  <View style={styles.view_Row}>
                    <Text style={styles.view_Tv_1}>Course Tenure :</Text>
                    <Text style={styles.view_Tv_2}>{i.duration}</Text>
                  </View>
                </View>
                {i.standard_detail != null ? <View style={{ marginTop: 25 }}>
                  <View style={styles.rowcontainer}>
                    <Text style={styles.title_text}>Standard Details</Text>

                  </View>
                </View> : null}

                <View style={styles.border}></View>

                {
                  i.standard_detail &&
                  i.standard_detail.map(standard => {
                    return (
                      <View style={{ marginTop: 15 }}>
                        <View style={styles.view_Row}>
                          <Text style={styles.view_Tv_1}>Standard :</Text>
                          {standard.is_current_standard == true ? <Text style={styles.view_Tv_2}>
                            {standard.standard_name +
                              ' ' +
                              '(' +
                              standard.standard_start_year +
                              '-' +
                              'To Current' + ')'}
                          </Text> : <Text style={styles.view_Tv_2}>
                            {standard.standard_name +
                              ' ' +
                              '(' +
                              standard.standard_start_year +
                              '-' +
                              standard.standard_end_year + ')'}
                          </Text>}

                        </View>
                        {standard.roll_no != null ? <View style={styles.view_Row}>
                          <Text style={styles.view_Tv_1}>Roll Number :</Text>
                          <Text style={styles.view_Tv_2}>{standard.roll_no}</Text>
                        </View> : null}
                        {standard.class_detail != [] &&
                          standard.is_current_standard == true ? (
                          <View>
                            {standard.class_detail.map(class_i => {
                              return (
                                <View>
                                  <View style={styles.view_Row}>
                                    <Text style={styles.view_Tv_1}>Class (Sub-Section) :</Text>
                                    <Text style={styles.view_Tv_2}>{class_i.class_name}</Text>
                                  </View>
                                  <View style={styles.view_Row}>
                                    <Text style={styles.view_Tv_1}>Class Alias :</Text>
                                    <Text style={styles.view_Tv_2}>{class_i.alias_class}</Text>
                                  </View>


                                </View>
                              );
                            })}
                          </View>
                        ) : null}

                      </View>
                    );
                  })
                }

              </CardView>
            );
          })
        }
      </>
    );
  };

  const ItemSeprator = () => (
    <View
      style={{
        height: 5,
        width: '100%',
        backgroundColor: 'red',
      }}
    />
  );


  return (
    <SafeAreaView style={{ flex: 1 }}>

      <View style={styles.container}>
        {isLoading && renderIndicator()}

        <CustomStatusBar />
        <HeaderTitleWithBack
          navigation={props.navigation}
          headerTitle="Courses Pending"
        />
        {getFlag === true ? <View style={{ flex: 1 }}>

          {setdatafromlist.length > 0 ? <CardView
            cardElevation={5}
            cardMaxElevation={5}
            // cornerRadius={15}
            style={styles.card}>
            <View style={styles.rowcontainer}>
              <Text style={styles.title_text}>Requests for change in course details</Text>

            </View>

            <View style={styles.border}></View>
            <View style={{ marginTop: 15 }}>
              <View style={styles.view_Row}>
                <Text style={styles.view_Tv_1}>School Name :</Text>
                <Text style={styles.view_Tv_2}>{schoolname}</Text>
              </View>
              <View style={styles.view_Row}>
                <Text style={styles.view_Tv_1}>Zatchup ID :</Text>
                <Text style={styles.view_Tv_2}>{zatchupid}</Text>
              </View>

              <View style={styles.view_Row}>
                <Text style={styles.view_Tv_1}>State :</Text>
                <Text style={styles.view_Tv_2}>{state}</Text>
              </View>

              <View style={styles.view_Row}>
                <Text style={styles.view_Tv_1}>Address :</Text>
                <Text style={styles.view_Tv_2}>{address1}</Text>
              </View>
              <View style={styles.view_Row}>
                <Text style={styles.view_Tv_1}>School Admission Number :</Text>
                <Text style={styles.view_Tv_2}>{admissonno}</Text>
              </View>
              <View style={styles.view_Row}>
                <Text style={styles.view_Tv_1}>City :</Text>
                <Text style={styles.view_Tv_2}>{city}</Text>
              </View>
            </View>

          </CardView> : null}

          {setdatafromlist.length > 0 ? <FlatList
            data={setdatafromlist}
            // keyExtractor={item => item.id.toString()}
            ItemSeparatorComponent={ItemSeprator}
            //  ItemSeparatorComponent={this.SeparatorComponent}
            renderItem={({ item, index }) => rednderItemList(item, index)}
          /> : <View style={styles.boxcontainer}>
            <Text style={styles.pendingtext}>Requests for change in course details</Text>
            <View style={styles.mainbordercontainer}>
              <View style={styles.bordercontainer}>
                <Text style={{ fontSize: 16 }}>Records Not Available</Text>
              </View>
            </View>

          </View>}

        </View> : null}


      </View>
    </SafeAreaView>

  );
};
export default CoursesPendingScreen;