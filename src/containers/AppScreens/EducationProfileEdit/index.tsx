import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, Image, KeyboardAvoidingView, Dimensions, ScrollView, BackHandler } from 'react-native';
import styles from './style';
import { Images } from '../../../components/index';
import { TextField, CustomButton, CustomStatusBar, BackBtn, ModelComponent, CustomHeader, CustomDropdown, Validate } from '../../../components';
const screenWidth = Dimensions.get('window').width;
import { CheckBox } from 'react-native-elements'
import { RadioButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import * as userActions from '../../../actions/user-actions-types';
import Toast from 'react-native-simple-toast';
import ProgressLoader from 'rn-progress-loader';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

interface EducationProfileEditScreenProps { navigation: any, route: any }

const EducationProfileEdit = (props: EducationProfileEditScreenProps) => {
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
    const [KYC_type_doc_Selected, setKYCSelected] = useState('');
    const [data, dataSet] = useState<any>(null)
    const [setminimudate, setminimumDate] = useState('2015-01-01');
    const isFocused = useIsFocused();

    const [courseidparm, setCourseIDParm] = useState('');
    const [standardidparm, setStandardIDParm] = useState('');
    const [classidparm, setClassIDParm] = useState('');

    const [date, setDate] = useState(new Date());
    const [date_copy, setDate_Copy] = useState('');
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);


    const [selectedCourse, setselectedCourse] = useState([]);
    const [coursekey, setCourseKey] = useState('');
    const [courseedit, setCourseedit] = useState('');
    const [st_edit, setJoinStandardedit] = useState('');
    const [cu_edit, setCurrentStandardedit] = useState('');
    const [classedit, setClass] = useState('');




    const [selectedJoiningStandard, setJoiningStandard] = useState([]);
    
    const [standardidparmleft, setStandardIDParmLeft] = useState('');

    const [joiningstandardkey, setJoiningStandardKey] = useState('');
    const [joiningstandardkey1, setJoiningStandardKey1] = useState('');


    const [selectedsetStandardClass, setStandardClass] = useState([]);
    const [standardclasskey, setStandarClassdKey] = useState('');

    const [isLoading, setLoading] = useState(false);

    const dispatch = useDispatch();


    const [KYC_type_doc, setKYC_type_doc] = useState([
        {
            label: 'Aadhaar Card',
            value: '0',
        },
        {
            label: 'Driving Licence',
            value: '1',
        },
        {
            label: 'Passport Number',
            value: '2',
        },
    ]);

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



    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(Platform.OS === 'ios');

        if (event.type == "set") {   //ok button
            setDate(currentDate)
        } else {    //cancel Button
            return null
        }

        var MyDateString = (currentDate.getFullYear()) + '-'
            + ('0' + (currentDate.getMonth() + 1)).slice(-2) + '-'
            + ('0' + (currentDate.getDate())).slice(-2)
        setDate_Copy(MyDateString);

        // YYYY-MM-DD
    };

    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };


    // function handleBackButtonClick() {
    //     props.navigation.goBack();
    //     return true;
    // }

    function handleBackButtonClick() {
        props.navigation.goBack(null);
        return true;
    }

    React.useEffect(() => {

        console.log('this is the recived props--->', props.route.params)
        //   setCourseKey(props.route.params.course_name)

        getCourseListData(props.route.params.school_id, props.route.params.course_id)
        //   getStepCountAPi()
        getAddmissionNo(props.route.params.course_id, props.route.params.school_id)
        setCourseedit(props.route.params.course_id)

        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };

    }, [])


    /***************************User get Addmission No Data *******************************/


    const getAddmissionNo = async (course_id, school_id) => {
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

        let rawdata = {

            "class_id": "",
            "course_id": course_id,
            "existing_course_id": course_id,
            "school_id": school_id,

        };
        const data = {
            token: token,
            data: rawdata

        }
        setLoading(true);

        dispatch(
            userActions.getAddmissionNoBySchool({
                data,
                callback: ({ result, error }) => {

                    if (result) {
                        console.warn(
                            'after result',
                            JSON.stringify(result, undefined, 2),
                            setSchoolID(result.data.admission_no),
                            setRollNo(result.data.roll_no),
                            setDes(result.data.description),
                            setDate_Copy(result.data.join_start_year),
                            setJoinStandardedit(result.data.join_standard_id),
                            setCurrentStandardedit(result.data.current_standard_id),
                            setClass(result.data.class_id)

                            //  getdataCourseKey(result)
                            //   setSchooID(result.data.admission_no),
                            // setDes(result.data.description),
                            // setDes(result.data.description),
                            //  setDate_Course1(result.data.course_start_year),
                            //  setDate_Course2(result.data.course_end_year),
                            //  setjoin_standard_id(result.data.join_standard_id),
                            //  setleft_standard_id(result.data.left_standard_id)


                        );
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
    }

    /***************************User getStepCountAPi *******************************/


    const getStepCountAPi = async () => {

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
        }
        dispatch(
            userActions.getRegStepCount({
                data,
                callback: ({ result, error }) => {
                    if (result) {
                        console.warn(
                            'after result step count',
                            JSON.stringify(result, undefined, 2),

                            //  props.navigation.navigate('OtpLogin', { 'firebase_id': result.firebase_username, 'username': email })
                        );
                        // setSpinnerStart(false);
                        setLoading(false);
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
    }

    /***************************User User Add EI Data*******************************/

    const CourseAddeddfd = async () => {

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

        var myHeaders = new Headers();
        myHeaders.append("Authorization", ` Bearer ${token}`);
        myHeaders.append("Content-Type", "application/json");

        var rawwww = JSON.stringify({
            "admission_no": null,
            "class_id": classidparm,
            "comment": Des,
            "course_end_year": '',
            "course_id": courseidparm,
            "course_start_year": '',
            "current_standard_id": standardidparm,
            "date_joining": date_copy,
            "is_current_course": 1,
            "join_standard_id": standardidparmleft,
            "name_of_school": props.route.params.nameofschool,
            "roll_no": RollNo,
            "school_code": props.route.params.school_zatchup_id,
            "school_id": props.route.params.school_id,
            "standard_end_year": '',
            "standard_start_year": ''
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: rawwww,
            //redirect: 'follow'
        };

        fetch("http://172.105.61.231:3000/api/user/add-registered-ei-course/", requestOptions)
            .then(response => response.text())
            .then(result => console.log("fdsdfasf43243214343fsdfsddffdsfsdfsdfsdf2----------------->", result))
            .catch(error => console.log('error', error));
    }

    const CourseAdded = async () => {

        const courseError = Validate('coursekey', coursekey);
        const dobError = Validate("joiningdate", date_copy);
        const joiningstandardError = Validate("joiningstandard", joiningstandardkey1);
        const joiningcurrentError = Validate("joiningcurrentkey", joiningstandardkey);

        const classError = Validate("class", standardclasskey);

        const schoolidError = Validate("schoolid", SchoolID);
        const rollnoError = Validate("rollno", RollNo);
        const desError = Validate("Des", Des);


        if (
            courseError ||
            dobError || joiningstandardError ||joiningcurrentError|| classError || schoolidError || rollnoError || desError
        ) {
            //this._scrollView.scrollTo(0);
            Toast.show(courseError || dobError || joiningstandardError || joiningcurrentError || classError || schoolidError || rollnoError || desError, Toast.SHORT);

            return false;
        }
        else {


            // console.log('course id',courseidparm);
            // console.log('School code  id',props.route.params.school_zatchup_id);
            // console.log('school id',props.route.params.school_id);
            // console.log('standard  id',standardidparm);


            // var data = '';







            // console.log('postdata', post_data)

            // var myHeaders = new Headers();
            // myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxODEwLCJ1c2VybmFtZSI6InNkZnNkZGZAZ21haWwuY29tIiwiZXhwIjoxNjQ4MDMxNDAyLCJlbWFpbCI6InNkZnNkZGZAZ21haWwuY29tIiwib3JpZ19pYXQiOjE2MjIxMTE0MDJ9.IH-rLLNv1pyG1492fOVFzbPKUXxo8oL1shW1OvlLcDA");
            // myHeaders.append("Content-Type", "application/json");


            setLoading(true);


            //  console.log('postdata', requestOptions)
            // fetch('http://172.105.61.231:3000/api/user/add-registered-ei-course/', requestOptions)
            //     .then(response => response.json())
            //     .then(d => {
            //         console.log('------fd------43-45-54----f-gg-f-fgds--->', d)
            //     });





            // const data = {
            //     id: id,
            //     token: token,

            // }

            // var raw = JSON.stringify({
            //     "admission_no":  `${SchoolID}`,
            //       "class_id":  `${classidparm}` ,
            //       "comment": Des,
            //       "course_end_year": '',
            //       "course_id": `${courseidparm}`,
            //       "course_start_year": '',
            //       "current_standard_id":  `${standardidparm}`,
            //       "date_joining": date_copy,
            //       "is_current_course": 1,
            //       "join_standard_id":`${standardidparm}`,
            //       "name_of_school": props.route.params.nameofschool,
            //       "roll_no":  `${RollNo}`,
            //       "school_code":`${props.route.params.school_zatchup_id}`,
            //       "school_id":  `${props.route.params.school_id}`,
            //       "standard_end_year": '',
            //       "standard_start_year": ''
            //   });

            let rawdata = {
                // "name_of_school": "Kerala Junior Public School",
                // "school_code": "KERALA001630",
                // "admission_no": "4345546",
                // "join_standard_id": "502",
                // "current_standard_id": "502",
                // "comment": "Play house for children's of the age group 2-4 years",
                // "school_id": "653",
                // "course_id": "571",
                // "class_id": "690",
                // "date_joining": "2021-05-14",
                // "roll_no": 656546546,
                // "is_current_course": 1,
                // "course_start_year": null,
                // "course_end_year": null,
                // "standard_start_year": null,
                // "standard_end_year": null
                "admission_no": SchoolID,
                "class_id": classidparm,
                "comment": Des,
                "course_end_year": null,
                "course_id": courseidparm,
                "course_start_year": null,
                "current_standard_id": standardidparm,
                "date_joining": date_copy,
                "is_current_course": 1,
                "join_standard_id": standardidparmleft,
                "name_of_school": props.route.params.nameofschool,
                "roll_no": RollNo,
                "school_code": props.route.params.school_zatchup_id,
                "school_id": props.route.params.school_id,
                "standard_end_year": null,
                "standard_start_year": null,
                "existing_course_id": props.route.params.course_id,
                "description": Des,
                "join_start_year": date_copy
            }
            let raw = {
                "admission_no": "124123",
                "class_id": "690",
                "comment": "Play house for children's of the age group 2-4 years",
                "course_end_year": null,
                "course_id": "571",
                "course_start_year": null,
                "current_standard_id": "502",
                "date_joining": "2021-05-01",
                "is_current_course": 1,
                "join_standard_id": "502",
                "name_of_school": "Kerala Junior Public School",
                "roll_no": 1890,
                "school_code": "KERALA001630",
                "school_id": "547",
                "standard_end_year": null,
                "standard_start_year": null
            };
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

            let data_update = {
                token: token,
                data: rawdata,
            }
            // const requestOptions = {
            //     method: 'POST',
            //     headers: {
            //         'Authorization': ` Bearer ${token}`,
            //         "Content-Type": "application/json"
            //     },
            //     body: raw,
            //     url: 'http://172.105.61.231:3000/api/user/add-registered-ei-course/',
            // };

            dispatch(
                userActions.getAddRegisteredEiCourse({
                    data_update,
                    callback: ({ result, error }) => {

                        if (result.status === true) {
                            console.warn(
                                'after Add Course result',
                                JSON.stringify(result.status, undefined, 2),
                                //submit(result.data)
                                props.navigation.navigate('EIconfirmation', { 'school_zatchup_id': props.route.params.school_zatchup_id, 'nameofschool': props.route.params.nameofschool, })
                            );
                            // setSpinnerStart(false);
                            setLoading(false);
                        }
                        if (result.status === false) {
                            console.warn(JSON.stringify(error, undefined, 2));
                            // setLoginSuccess(result);
                            setLoading(false);
                            //console.log('dfdfdf--------', error)
                            Toast.show('This Course is already added by this user Please select other course', Toast.SHORT);

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
    }



    const getdataStandardClassKey = async (result) => {
        var school = [];
        // var school = [{
        //   label: 'Others',
        //   value: 0,
        // }];
        result.results.map((element: any) => {
            let obj = {
                label: element.class_name,
                value: element.id,

            }
            school.push(obj);
            //  console.log('dsfsdfds', obj.university)
            //  if(obj.label != ''){
            //   setBoard(obj.university)

            //  }
        });
        //console.log('dsfsdfds',state)
        setStandardClass(school)

        // const city = result.results.map((element: any) => ({
        //   label: element.city,
        //   value: element.id,


        // }));
        //console.log('dsfsdfds',state)

    }


    const getdataStandardKey = async (result) => {
        var school = [];
        // var school = [{
        //   label: 'Others',
        //   value: 0,
        // }];
        result.results.map((element: any) => {
            let obj = {
                label: element.standard_name,
                value: element.id,

            }
            school.push(obj);
            //  console.log('dsfsdfds', obj.university)
            //  if(obj.label != ''){
            //   setBoard(obj.university)

            //  }
        });
        // school.map(i=>{
        //     if(props.route.params.standard_id == i.value){
        //         getStandardClassData(i.value);
        //         setStandardIDParm(i.value);
        //     }
        // })
        //console.log('dsfsdfds',state)
        setJoiningStandard(school)

        // const city = result.results.map((element: any) => ({
        //   label: element.city,
        //   value: element.id,


        // }));
        //console.log('dsfsdfds',state)

    }


    const getdataCourseKey = async (result) => {

        var city = [];


        result.results.map((element: any) => {
            let obj = {
                label: element.course_name,
                value: element.id,
                description: element.description,
                start_date: element.start_date,

            }
            city.push(obj);

        });
        // city.map(i=>{
        //     if(props.route.params.course_id == i.value){
        //         getStandard(i.value);
        //         setCourseIDParm(i.value);
        //         setDes(i.description);
        //     }
        // })

        setselectedCourse(city)

        // const city = result.results.map((element: any) => ({
        //   label: element.city,
        //   value: element.id,


        // }));
        //console.log('dsfsdfds',state)

    }
    /***************************User getStandard Class *******************************/

    const getStandardClassData = async (id) => {

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
            id: id,
            token: token,

        }
        setLoading(true);
        dispatch(
            userActions.getStandardClass({
                data,
                callback: ({ result, error }) => {

                    if (result) {
                        console.warn(
                            'after result',
                            JSON.stringify(result, undefined, 2),

                            getdataStandardClassKey(result)

                            //  props.navigation.navigate('OtpLogin', { 'firebase_id': result.firebase_username, 'username': email })
                        );
                        // setSpinnerStart(false);
                        setLoading(false);
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
    }


    /***************************User getStandard *******************************/


    const getStandard = async (id) => {
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
            id: id,
            token: token,

        }
        setLoading(true);
        dispatch(
            userActions.getStandard({
                data,
                callback: ({ result, error }) => {

                    if (result) {
                        console.warn(
                            'after result',
                            JSON.stringify(result, undefined, 2),

                            getdataStandardKey(result)

                            //  props.navigation.navigate('OtpLogin', { 'firebase_id': result.firebase_username, 'username': email })
                        );
                        // setSpinnerStart(false);
                        setLoading(false);
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
    }
    /***************************User getCourseListData *******************************/


    const getCourseListData = async (id, edit_course_id) => {
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
            id: id,
            token: token,
            edit_course_id: edit_course_id,

        }
        setLoading(true);

        dispatch(
            userActions.getEditCourseList({
                data,
                callback: ({ result, error }) => {

                    if (result) {
                        console.warn(
                            'after result',
                            JSON.stringify(result, undefined, 2),

                            getdataCourseKey(result)

                            //  props.navigation.navigate('OtpLogin', { 'firebase_id': result.firebase_username, 'username': email })
                        );
                        // setSpinnerStart(false);
                        setLoading(false);
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
    }
    return (
        <KeyboardAwareScrollView keyboardShouldPersistTaps={'always'}
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}>
        <View style={styles.container}>

            <CustomStatusBar />

            {isLoading && renderIndicator()}


            <CustomHeader Title={'Add Course Details'} Back={'true'} navigation={props.navigation} />


            {/* <View style={styles.backbtnCss}><BackBtn navigation={props.navigation} /></View> */}

            <ScrollView>


                <View style={styles.inputContainer}>

                    <View>
                        <TouchableOpacity
                        // onPress={() => props.navigation.navigate('CurrentSchoolinfo')}
                        >
                            <View style={styles.view_Row_}>
                                <Text style={styles.view_Tv_1}>
                                    {props.route.params.nameofschool + '(' + props.route.params.school_zatchup_id + ')'} 
                                   
                                </Text>
                                {/* <Image
                                    style={{ marginLeft: 10, }}
                                    source={Images.verfied}
                                /> */}
                            </View>
                        </TouchableOpacity>


                        <View style={{}}>
                            <CustomDropdown placeholder={'Select Course'}
                                data={selectedCourse}
                                value={courseedit}
                                // value={{label: 'A', value: '0'}}
                                //valueitem={'red'}
                                // value={'ssddf'}
                                //  selectedValue={'ssddf'}
                                SelectedLanguagedata={(selectedValue) => {
                                    // getSchool(selectedValue);
                                    // setSchoolID('')
                                    // setRollNo('')
                                    // setDate_Copy('')
                                    // setStandarClassdKey('');
                                    // setClass('');
                                    setCourseKey(selectedValue);
                                    setCourseedit(selectedValue)
                                    var data = [];
                                    data = selectedCourse.filter(x => x.value == selectedValue);
                                    // console.log('school index x',data)

                                    if (data.length > 0) {
                                        // console.log('course list data id',data[0].value)
                                        getStandard(selectedValue);
                                        setCourseIDParm(data[0].value);
                                        setDes(data[0].description);
                                        setminimumDate(data[0].start_date);

                                    }

                                    // if (selectedValue !== null) {
                                    //     setCourseKey(selectedValue);

                                    //     getStandard(selectedValue);

                                    // }
                                }}

                            />
                        </View>
                        <TouchableOpacity onPress={showDatepicker}>
                            <View style={{ marginTop: '2%', marginLeft: 5, marginRight: 5 }}>
                                <TextField
                                    placeholder={'Course Joining Date'}
                                    imageIcon={Images.calendar_icon}
                                    editable={false}
                                    value={date_copy.toString()}
                                />
                            </View>
                        </TouchableOpacity>

                        {show && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                mode={mode}
                                // minimumDate={new Date(2015, 0, 1)}
                                minimumDate={new Date(setminimudate)}
                                //  minDate={new Date()}
                                maximumDate={new Date()}

                                is24Hour={true}
                                format="YYYY-MMM-DD"
                                display="default"
                                onChange={onChange}
                            />
                        )}


                        <View style={{ marginTop: '1%', }}>
                            <CustomDropdown placeholder={'Select Joining Standard'}
                                data={selectedJoiningStandard}
                                value={st_edit}
                                //  selectedValue={coursekey}
                                SelectedLanguagedata={(selectedValue) => {
                                    //  getSchool(selectedValue);
                                    setJoiningStandardKey1(selectedValue);
                                    setJoinStandardedit(selectedValue);

                                    var data = [];
                                    data = selectedJoiningStandard.filter(x => x.value == selectedValue);
                                    // console.log('school index x',data)

                                    if (data.length > 0) {
                                        setStandardIDParmLeft(data[0].value);

                                    }
                                    // if (selectedValue !== null) {
                                    //     setJoiningStandardKey(selectedValue);
                                    //     getStandardClassData(selectedValue);
                                    // }
                                }}
                            />
                        </View>

                        <View style={{ marginTop: '1%', }}>
                            <CustomDropdown placeholder={'Select Current Standard'}
                                data={selectedJoiningStandard}
                                value={cu_edit}
                                //  selectedValue={coursekey}
                                SelectedLanguagedata={(selectedValue) => {
                                    //  getSchool(selectedValue);
                                    setJoiningStandardKey(selectedValue);
                                    setCurrentStandardedit(selectedValue);

                                    var data = [];
                                    data = selectedJoiningStandard.filter(x => x.value == selectedValue);
                                    // console.log('school index x',data)

                                    if (data.length > 0) {
                                        //  console.log('setStandardIDParm', data[0].value)
                                        getStandardClassData(selectedValue);
                                        setStandardIDParm(data[0].value);

                                    }
                                    // if (selectedValue !== null) {
                                    //     setJoiningStandardKey(selectedValue);
                                    //     getStandardClassData(selectedValue);
                                    // }
                                }}
                            />
                        </View>

                        <View style={{ marginTop: '1%', }}>
                            <CustomDropdown placeholder={'Select Class'}
                                data={selectedsetStandardClass}
                                value={classedit}
                                //  selectedValue={coursekey}
                                SelectedLanguagedata={(selectedValue) => {
                                    //  getSchool(selectedValue);
                                    setStandarClassdKey(selectedValue);
                                    setClass(selectedValue);

                                    var data = [];
                                    data = selectedsetStandardClass.filter(x => x.value == selectedValue);
                                    // console.log('school index x',data)

                                    if (data.length > 0) {
                                        console.log('setClassIDParm', data[0].value)
                                        setClassIDParm(data[0].value);

                                    }
                                    // if (selectedValue !== null) {
                                    //     setStandarClassdKey(selectedValue);
                                    //     // getStandardClass(selectedValue);
                                    // }
                                }}

                            />
                        </View>


                        <View style={{ marginTop: '3%', marginLeft: 2, marginRight: 2, }}>

                            <TextField placeholder={'Enter School ID'} onChangeText={val => setSchoolID(val)} value={SchoolID}
                            />
                        </View>

                        <View style={{ marginTop: '3%', marginLeft: 2, marginRight: 2, }}>

                            <TextField placeholder={'Enter Roll Number'} keyboardType="numeric" onChangeText={val => setRollNo(val)} value={RollNo}
                            />
                        </View>

                        <View style={{ marginTop: '3%', marginLeft: 2, marginRight: 2, marginBottom: '3%' }}>

                            <TextField placeholder={'Enter Course Description'} multiline={true} onChangeText={val => setDes(val)} editable={false} value={Des}
                            />
                        </View>

                    </View>


                    <View>
                        <CustomButton title={'Submit'} onPress={() => CourseAdded()} />

                    </View>
                </View>


            </ScrollView>
        </View>
        </KeyboardAwareScrollView>
    );
};

export default EducationProfileEdit;
