import React, { Component, FC, useState, useEffect } from 'react';
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
} from '../../../components';
import styles from './style';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import images from '../../../components/images';
import { useDispatch, useSelector } from 'react-redux';
import * as userActions from '../../../actions/user-actions-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProgressLoader from 'rn-progress-loader';

import {
    NavigationContainer,
    useIsFocused,
    DrawerActions,
    useFocusEffect
} from '@react-navigation/native';


const data = [
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

interface Searchschooldetailprops {
    navigation: any;
    route: any;
}
const SearchSchoolDetail = (props: Searchschooldetailprops) => {

    const [data, active_data] = useState('th');
    const [isLoading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    const [username, setUsername] = useState('');
    const [schoolname, setNameofschool] = useState('');
    const [zatchupid, setZatchUpId] = useState('');
    const [followers, setFollowers] = useState('');
    const [profilepic, setProfilePic] = useState('');
    const [coverpic, setCoverPic] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [overview, setOverview] = useState('');
    const [totalstudent, setTotalStudent] = useState('');
    const [totalalumni, setTotalAlumni] = useState('');


    useEffect(() => {

        getSchoolProfile(props.route.params.school_id);

    }, [isFocused]);

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


    const getdataProfile = async result => {
        var Profile = [];
        result.data.map((element: any) => {
            setNameofschool(element.name_of_school);

            //   setUsername(element.name);
            setZatchUpId(element.zatchup_id);
            setProfilePic(element.profile_pic);
            setFollowers(element.social_user_followers);
            setCoverPic(element.cover_pic);
            setAddress1(element.address1);
            setAddress2(element.address2);
            setOverview(element.overview);
            setTotalStudent(element.total_student);
            setTotalAlumni(element.total_alumni);





            //   setFollowing(element.social_user_followings);
            //   setDob(element.dob);
            //   setGender(element.gender);
            //   setEmail(element.email);
        });


    };



    /***************************User GET School Profile list *******************************/

    const getSchoolProfile = async (school_id) => {
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
            school_id: school_id,

        };
        setLoading(true);

        dispatch(
            userActions.getProfileDetailForSchool({
                data,

                callback: ({ result, error }) => {
                    if (result.status === true) {
                        console.warn(
                            'after School Data result------->',
                            JSON.stringify(result, undefined, 2),

                            getdataProfile(result),
                            // getdataCourse(result),

                            // getdataCourse(result),
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

    return (
        <View style={styles.container}>
            {isLoading && renderIndicator()}

            <HeaderTitleWithBack
                navigation={props.navigation}
                headerTitle="School Profile"
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
                        source={{ uri: coverpic }}
                        resizeMode="stretch"
                        style={{ width: '100%', height: 100 }}>

                    </ImageBackground>

                    <View style={styles.rowContainer}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View>
                                <Image
                                    source={{ uri: profilepic }}
                                    style={{
                                        // marginLeft: 10,
                                        width: 80,
                                        height: 80,
                                        borderRadius: 50,
                                    }}
                                />
                                {/* <Icon
                                    name={'camera'}
                                    size={15}
                                    style={{
                                        backgroundColor: '#ccc',
                                        position: 'absolute',
                                        right: 0,
                                        bottom: 0,
                                        marginRight: 8,
                                    }}
                                /> */}
                                <Icon
                                    name="check-circle"
                                    size={18}
                                    color="#4E387E"
                                    style={{
                                        margin: 12,
                                        position: 'absolute',
                                        right: 0,
                                        bottom: 0,
                                        marginRight: 1,
                                    }}
                                />
                            </View>

                            <View>
                                <View
                                    style={{ flexDirection: 'row', marginLeft: 10, marginTop: 30 }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            props.navigation.navigate('PostDetailScreen');
                                        }}>
                                        <View>
                                            <Text style={styles.nametext}>{schoolname}</Text>
                                            <Text style={{ marginLeft: 25 }}>{zatchupid}</Text>
                                        </View>
                                    </TouchableOpacity>
                                    {/* <Icon
                    name="check-circle"
                    size={18}
                    color="#4E387E"
                    style={{margin: 12}}
                  /> */}
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.likecontainer}>
                        <View
                            style={{
                                flexDirection: 'row',
                                marginTop: 10,
                                alignItems: 'center',
                            }}>
                            <TouchableOpacity
                                onPress={() => {
                                    props.navigation.navigate('FollowersScreen');
                                }}>
                                <Text style={styles.boldText}>{followers}</Text>
                                <Text>Followers</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => {
                                    props.navigation.navigate('FollowingScreen');
                                }}
                                style={{
                                    marginLeft: 20,
                                    backgroundColor: 'green',
                                    width: 85,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: 28,
                                    borderRadius: 5,
                                }}>
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>
                                    Following
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginTop: 10 }}>
                            <TouchableOpacity
                                style={{}}
                                onPress={() => {
                                    props.navigation.navigate('Messages');
                                }}>
                                <Icon name="envelope" size={24} color="grey" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.addresscontainer}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.addresstext}> School Address : </Text>
                        <Text style={{ color: 'black' }}>{address1 + ' ' + address2}</Text>
                    </View>
                </View>
                <View style={styles.paragraphcontainer}>
                    <Text style={{ color: 'black', textAlign: 'justify' }}>
                        {' '}
                        <Text style={styles.overviewtext}>School Overview : </Text>{overview}
                    </Text>
                </View>
                <View
                    style={[styles.totalstudentcontainer, { backgroundColor: 'honeydew' }]}>
                    <Text style={{ fontSize: 15 }}>Number of Students</Text>
                    <Text style={[styles.numbertext, { color: 'green' }]}>{totalstudent}</Text>
                </View>
                <View
                    style={[
                        styles.totalstudentcontainer,
                        { backgroundColor: 'lightgrey' },
                    ]}>
                    <Text style={{ fontSize: 15 }}>Number of alumni on ZatchUp</Text>
                    <Text style={[styles.numbertext, { color: '#4E387E' }]}>{totalalumni}</Text>
                </View>
            </ScrollView>
        </View>
    );
};
export default SearchSchoolDetail;