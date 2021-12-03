import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, Image, KeyboardAvoidingView, Dimensions, Alert, BackHandler } from 'react-native';
import styles from './style';
import { Images } from '../../../components/index';
import OtpInputs from 'react-native-otp-inputs';
import { TextField, CustomButton, CustomStatusBar, BackBtn, CustomHeader, ModelComponent } from '../../../components';
import Toast from 'react-native-simple-toast';
import ProgressLoader from 'rn-progress-loader';
import * as userActions from '../../../actions/user-actions-types';
import { useDispatch, useSelector } from 'react-redux';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
const screenWidth = Dimensions.get('window').width;
interface ApprovalScreenProps { navigation: any }


const Approval = (props: ApprovalScreenProps) => {

    const [allSelected, setSelected] = useState(false)
    const [isLoading, setLoading] = useState(false);

    const dispatch = useDispatch();


    // const close = () => {

    //     // props.navigation.navigate('LoginScreen')
    //     // <ModelComponent isvisible={true} modeltype={'add_info'}  onPress={close}/>
    //     setSelected(!allSelected)



    // };
    const submit = async () => {

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
            userActions.getadduserstepseven({
                data,
                callback: ({ result, error }) => {
                    if (result) {
                        console.warn(
                            'after result step count seven',
                            JSON.stringify(result, undefined, 2),

                            //  props.navigation.navigate('OtpLogin', { 'firebase_id': result.firebase_username, 'username': email })
                        );
                        // setSpinnerStart(false);
                        setLoading(false);
                        props.navigation.navigate('LoginScreen')

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


    useEffect(() => {
        // console.log('rtyuigfghj', props) 
        //getEicourseconfirmationlist()
        //  getStepCountAPi()
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
        //  setImagename('')
    }, [])

    function handleBackButtonClick() {
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


    return (
        <View style={styles.container}>
            <CustomStatusBar />
            <CustomHeader Title={'Approval'} />
            <ModelComponent isvisible={allSelected} modeltype={'loginagain'} navigation={props.navigation} />

            <View style={styles.logoContainer}>

                <Image source={Images.profile_img2} style={styles.messagelogo} />
            </View>



            <View style={styles.enterTextConatiner}>
                <Text style={styles.enterText}>Profile Created Successfully</Text>
            </View>
            <View style={styles.enterTextConatiner_copy}>
                <Text style={styles.enterText_copy}>Your profile is sent to your educational institutions for approval...</Text>
            </View>

            <View style={styles.inputContainer}>

                <View>
                    <CustomButton title={'Continue'}
                        onPress={() => submit()}
                    //  onPress={() => props.navigation.navigate('LoginScreen')}

                    />
                </View>

            </View>


        </View>
    );
};

export default Approval;

