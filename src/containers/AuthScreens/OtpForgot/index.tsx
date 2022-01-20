import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, Image, KeyboardAvoidingView, Dimensions, } from 'react-native';
import styles from './style';
import { Images } from '../../../components/index';
import OtpInputs from 'react-native-otp-inputs';
import { TextField, CustomButton, CustomStatusBar, BackBtn, ModelComponent, Validate } from '../../../components';
const screenWidth = Dimensions.get('window').width;
import { useDispatch, useSelector } from 'react-redux';
import * as userActions from '../../../actions/user-actions-types';
import Toast from 'react-native-simple-toast';
import ProgressLoader from 'rn-progress-loader';

interface OtpForgotScreenProps { navigation: any, route: any, }

const OtpForgot = (props: OtpForgotScreenProps) => {

    const [allSelected, setSelected] = useState(false)
    const [otp, setOtp] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [isvisible, setisvisible] = useState(false);
    const [modeltype, setmodeltype] = useState('bottom');
    const [uid, setuid] = useState('');
    const [key, setkey] = useState('');
    const [firebaseusername, setfirebaseusername] = useState('');
    const [firebasepassword, setfirebasepassword] = useState('');


    const dispatch = useDispatch();

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


    React.useEffect(() => {
        // console.log('rtyuigfghj', props)
    }, []);

    const close = () => {
        // props.navigation.navigate('LoginScreen')
        // <ModelComponent isvisible={true} modeltype={'add_info'}  onPress={close}/>
        setSelected(!allSelected)
    };
    const submit = () => {
        //Alert.alert('please select state');
        // props.navigation.navigate('LoginScreen')
        setSelected(!allSelected)
    };



    const onPressResendOtp = () => {
        //Validate();

        const data = {
            email_or_phone: props.route.params.mobile,
        };

        setLoading(true);

        dispatch(
            userActions.getAdminForgotPassword({
                data,
                callback: ({ result, error }) => {
                    if (result.status === true) {
                        // console.warn(
                        //     'after otp Re Send result',
                        //     JSON.stringify(result, undefined, 2),
                           

                        //     // props.navigation.navigate('eKYC')
                        //     // props.navigation.navigate('eKYC'),
                        // );
                        Toast.show(result.message, Toast.SHORT)
                        // setSpinnerStart(false);
                        setLoading(false);
                    }

                    if (!error) {
                        console.warn(JSON.stringify(error, undefined, 2));
                        // setLoginSuccess(result);
                        setLoading(false);

                        // signOut();
                    } else {
                        // setError(true);
                        // signOut();
                        setLoading(false);
                        console.warn(JSON.stringify(error, undefined, 2));
                    }
                },
            }),
        );

    };


    const onPressOtp = () => {
        //Validate();

        const otpError = Validate("otp", otp);

        if (
            otpError
        ) {
            //this._scrollView.scrollTo(0);
            Toast.show(otpError, Toast.SHORT);

            return false;
        }

        else {
            const data = {
                email_or_phone: props.route.params.mobile,
                code: otp,
            };

            setLoading(true);

            dispatch(
                userActions.getAdminVerifyResetPassword({
                    data,
                    callback: ({ result, error }) => {
                        if (result.status === true) {
                            console.warn(
                                'after otp forgot result',
                                JSON.stringify(result, undefined, 2),
                                setOtp(''),
                                setuid(result.data.uid),
                                setkey(result.data.key),
                                setSelected(!allSelected),
                                setfirebaseusername(result.data.firebase_username),
                                setfirebasepassword(result.data.firebase_password)
                              //  console.log('key',result.data.key),
                              //  console.log('uid',result.data.uid)

                                // props.navigation.navigate('eKYC')

                                // props.navigation.navigate('eKYC'),
                            );
                            // setSpinnerStart(false);
                            //  _storeData(result);

                            setLoading(false);
                        }

                        if (result.status === false) {
                            //console.warn(JSON.stringify(error, undefined, 2));
                            // setLoginSuccess(result);
                            Toast.show('OTP is Not Valid', Toast.SHORT)
                            setLoading(false);
                            // signOut();
                        } else {

                            // setError(true);
                            // signOut();
                            setLoading(false);
                            console.warn(JSON.stringify(error, undefined, 2));
                        }
                    },
                }),
            );
        }
    };


    return (
        <View style={styles.container}>
            <CustomStatusBar />
            {isLoading && renderIndicator()}

            <View style={styles.backbtnCss}><BackBtn navigation={props.navigation} /></View>

            <View style={styles.logoContainer}>

                <Image source={Images.message_icon} style={styles.messagelogo} />
            </View>
            <ModelComponent f_username={firebaseusername} f_password={firebasepassword}   keyy={key} uidd={uid} onPress={submit} isvisible={allSelected} modeltype={modeltype} navigationss={props.navigation} />

            {/* <View style={styles.enterTextConatiner}>
        <Text style={styles.enterText}>Two Step Log-In</Text>
      </View> */}
            <View style={styles.enterTextConatiner}>
                <Text style={styles.enterText}> {'Enter OTP Send On Your' + " " + props.route.params.mobile + "."}</Text>

                {/* <Text style={styles.enterText}>Enter OTP that recieved on your phone number/email id.</Text> */}
            </View>
            <View style={{ paddingHorizontal: '9%', marginVertical: '15%' }}>
                <OtpInputs
                    inputContainerStyles={styles.OtpinputContainer}
                    inputStyles={styles.otpinput}
                    handleChange={val => setOtp(val)}
                    focusStyles={{borderWidth: 2, borderColor: '#4B2A6A'}}

                />
            </View>
            <View style={styles.inputContainer}>

                <View>
                    <CustomButton title={'Submit'}
                        // onPress={() => submit()} 
                        onPress={onPressOtp}
                    />
                </View>
                <View style={styles.OtpResendContainer}>
                    <Text style={styles.resendText}
                        onPress={onPressResendOtp}
                    >Resend Code</Text>
                </View>

            </View>


        </View>
    );
};

export default OtpForgot;

