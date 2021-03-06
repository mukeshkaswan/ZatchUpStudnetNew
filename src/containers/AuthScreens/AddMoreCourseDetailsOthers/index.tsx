import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, Image, KeyboardAvoidingView, Dimensions, ScrollView, FlatList, BackHandler } from 'react-native';
import styles from './style';
import { Images } from '../../../components/index';
import { TextField, CustomButton, CustomStatusBar, BackBtn, ModelComponent, CustomHeader, CustomDropdown, Validate, } from '../../../components';
const screenWidth = Dimensions.get('window').width;
import { CheckBox } from 'react-native-elements'
import { RadioButton } from 'react-native-paper';
import CardView from 'react-native-cardview'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import * as userActions from '../../../actions/user-actions-types';
import Toast from 'react-native-simple-toast';
import ProgressLoader from 'rn-progress-loader';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
interface AddMoreCourseDetailsOthers { navigation: any, route: any }

const AddMoreCourseDetailsOthers = (props: AddMoreCourseDetailsOthers) => {
    const [Aadhar, setAadhar] = useState('');
    const [Name, setName] = useState('');
    const [selectedSchool, setselectedSchool] = useState('');
    const [ID, setID] = useState('');
    const [RollNo, setRollNo] = useState('');
    const [Course, setCourse] = useState('');
    const [SchoolID, setSchoolID] = useState('');
    const [Des, setDes] = useState('');
    const [allSelected, setSelected] = useState(false)
    const [value, setValue] = React.useState('first');
    const [Duration, setDuration] = useState('');
    const [isLoading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const [setdatacourselist, setDataCourseList] = useState([]);

    const checkedterm = () => {
        setSelected(!allSelected)
    }
    const renderIndicator = () => {
        return (
            <View style={{}}>

                <ProgressLoader
                    visible={true}
                    isModal={true} isHUD={true}
                    //hudColor={"#ffffff00"}
                    hudColor={"#4B2A6A"}
                    style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
                    color={"white"} />
            </View>
        );
    }

    useEffect(() => {

        getCourseListData(props.route.params.school_id)
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };

    }, [])
    const getDataFromAPi = async (result) => {

        // console.log('dfssdfdsdsffff', result.results)

        setDataCourseList(result.results)


    }

    function handleBackButtonClick() {
        props.navigation.goBack();
        return true;
    }



    const getCourseListData = async (school_id) => {


        setLoading(true);

        let token = '';
        try {
            const value = await AsyncStorage.getItem('token');
            if (value !== null) {
                // value previously stored
                token = value;
            }
        } catch (e) {
            // error reading value
        }

        console.log('token', token)

        let data = {
            token: token,
            id: school_id,
        }


        dispatch(
            userActions.getCourselistOther({
                data,
                callback: ({ result, error }) => {

                    if (result) {
                        // console.warn(
                        //     'afte',
                        //     JSON.stringify(result.status, undefined, 2),
                        //     // props.navigation.navigate('AddMoreCourseDetailsOthers', { 'school_id': props.route.params.school_id })
                        // );
                        getDataFromAPi(result)

                        // setSpinnerStart(false);
                        setLoading(false);
                    }
                    if (result.status === false) {
                        console.warn(JSON.stringify(error, undefined, 2));
                        // setLoginSuccess(result);
                        setLoading(false);
                        //console.log('dfdfdf--------', error)
                        //  Toast.show('This Course is already added by this user Please select other course', Toast.SHORT);

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
    }

    const ItemSeprator = () => <View style={{
        height: 5,
        width: "100%",
        //  backgroundColor: "rgba(0,0,0,0.5)",
    }} />

    return (
        <View style={styles.container}>

            <CustomStatusBar />

            {isLoading && renderIndicator()}

            <CustomHeader Title={'Course Details'} />


            {/*   <View style={styles.backbtnCss}><BackBtn navigation={this.props.navigation} /></View> */}

            <ScrollView>

                <View style={styles.inputContainer}>



                    <View style={styles.view}>
                        <FlatList
                            data={setdatacourselist}
                            // keyExtractor={item => item.id.toString()}
                            ItemSeparatorComponent={ItemSeprator}

                            //  ItemSeparatorComponent={this.SeparatorComponent}
                            renderItem={({ item, index }) =>
                                <CardView
                                    cardElevation={1}
                                    cardMaxElevation={1}
                                    cornerRadius={10}
                                    style={styles.Cardview}>

                                    <View
                                        style={styles.underview}
                                    />
                                    {/* <Text style={{ marginTop: 2, fontSize: 22, marginLeft: 20, color: '#191C1F', marginBottom: 10 }}>Course Details</Text> */}


                                    <View style={styles.view_Row}>
                                        <Text style={styles.view_Tv_1}>Course Name :</Text>
                                        <Text style={styles.view_Tv_2}>{item.course_name}</Text>
                                        {/* <Image
                                            style={styles.editicon}
                                            source={Images.edit_icon}
                                        />
                                        <Image
                                            style={styles.editiconCopy}
                                            source={Images.delete_icon}
                                        /> */}
                                    </View>

                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={styles.view_Row_}>
                                            <Text style={styles.view_Tv_1}>Starting Year :</Text>
                                            <Text style={styles.view_Tv_2}>{item.start_date}</Text>
                                        </View>

                                        <View style={styles.view_Row_}>
                                            <Text style={styles.view_Tv_1}>Ending Year :</Text>
                                            <Text style={styles.view_Tv_2}>{item.end_date}</Text>
                                        </View>

                                    </View>
                                    <Text style={styles.view_Tv_3}>{item.description}</Text>

                                </CardView>} />

                        <TouchableOpacity onPress={() => props.navigation.navigate('AddCourseDetailsOthers')}  >
                            <View style={{ flexDirection: 'row', marginBottom: '3%', marginTop: '6%', }}>
                                <Image source={Images.addmore_school_icon} style={styles.checkbox}></Image>
                                <View style={{ marginLeft: 15, marginTop: 5 }}><Text style={styles.fillText_Add}>Add More Course</Text></View>

                            </View>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <CustomButton title={'Submit'} onPress={() => props.navigation.navigate('Approval')} />
                    </View>
                </View>


            </ScrollView>
        </View>
    );
};

export default AddMoreCourseDetailsOthers;
