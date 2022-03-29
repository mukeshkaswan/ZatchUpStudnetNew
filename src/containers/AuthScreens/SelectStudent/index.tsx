import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, Image, KeyboardAvoidingView, Dimensions, TouchableOpacity, BackHandler, Alert } from 'react-native';
import styles from './style';
import { Images } from '../../../components/index';
import OtpInputs from 'react-native-otp-inputs';
import { TextField, CustomButton, CustomStatusBar, BackBtn, HeaderTitleWithBack } from '../../../components';
const screenWidth = Dimensions.get('window').width;
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    NavigationContainer,
    useIsFocused,
    useFocusEffect,
} from '@react-navigation/native';
interface SelectStudentScreenProps { navigation: any; route: any; }

const SelectStudent = (props: SelectStudentScreenProps) => {

    const [allSelected, setSelected] = useState(false);
    const [studentSelect, setStudentSelect] = useState(true);
    const isFocused = useIsFocused();

    function handleBackButtonClick() {
        //const value =  AsyncStorage.getItem('tokenlogin');

        // if(value != null ){
        //     props.navigation.goBack(null);
        // }else{
        Alert.alert(
            'ZatchUp',
            'Do you want to exit?',
            [
                { text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'Yes', onPress: () => BackHandler.exitApp() },
            ],
            { cancelable: false });
        return true;



    }


    useEffect(() => {

        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
    }, [isFocused]);


    return (
        <View style={styles.container}>
            <CustomStatusBar />
            {/* <View style={styles.backbtnCss}><BackBtn navigation={props.navigation} /></View> */}
            {props.route.params.loginkey === 'loginkey' ? <HeaderTitleWithBack
                navigation={props.navigation}
                headerTitle="Select Student"
            /> : null}

            <View style={styles.enterTextConatiner}>
                <Text style={styles.enterText}>Are you currently a student?</Text>
            </View>
            <View style={styles.logoContainer}>

                <Image source={Images.img3} style={styles.messagelogo} />
            </View>


            <View style={{
                flexDirection: 'row', justifyContent: 'center',
                alignItems: 'center', marginRight: '10%', marginLeft: '10%', marginTop: '10%'
            }}>

                <TouchableOpacity
                    onPress={() => setStudentSelect(false)}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: '#FFFFFF',
                        borderWidth: 1,
                        // borderColor: "#ffffff",
                        borderColor: studentSelect ? '#E6E5E8' : "red",
                        height: 60,
                        width: '50%',
                        borderRadius: 15,
                        margin: 5,
                    }}
                    activeOpacity={0.5}>

                    <Image source={Images.no_icon} style={{
                        padding: 10,
                        margin: 5,
                        height: 20,
                        width: 20,

                        tintColor: studentSelect ? '#E0E0E0' : "red",
                        marginLeft: '10%',
                        resizeMode: 'stretch',
                    }} />

                    {/* <View style={styles.buttonIconSeparatorStyle} /> */}
                    <Text style={{
                        color: '#F01F27',
                        marginBottom: 4,
                        marginLeft: 30,
                        fontSize: 16

                    }}>
                        NO
                    </Text>
                </TouchableOpacity>


                <TouchableOpacity
                    onPress={() => setStudentSelect(true)}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: '#FFFFFF',
                        borderWidth: 1,
                        // borderColor: "#ffffff",
                        borderColor: studentSelect ? '#3EA63E' : "#ffffff",

                        height: 60,
                        width: '50%',

                        borderRadius: 15,
                        margin: 5,
                    }}
                    activeOpacity={0.5}>

                    <Image source={Images.yes_icon} style={{
                        padding: 10,
                        margin: 5,
                        height: 20,
                        width: 20,
                        tintColor: studentSelect ? '#3EA63E' : "#E0E0E0",
                        marginLeft: '10%',
                        resizeMode: 'stretch',
                    }} />

                    {/* <View style={styles.buttonIconSeparatorStyle} /> */}
                    <Text style={{
                        color: '#3EA63E',
                        marginBottom: 4,
                        marginLeft: 30,
                        fontSize: 16
                    }}>
                        YES
                    </Text>
                </TouchableOpacity>
            </View>



            <View style={styles.inputContainer}>

                <View>
                    <CustomButton title={'Next'} onPress={() => { props.navigation.navigate('CurrentSchoolinfo', { data: studentSelect, 're_verify': props.route.params.re_verify }) }} />
                    {/* <CustomButton title={'Next'} onPress={() =>{studentSelect? props.navigation.navigate('CurrentSchoolinfo',{data:'name'}): props.navigation.goBack()}} /> */}

                </View>


            </View>


        </View>
    );
};

export default SelectStudent;

