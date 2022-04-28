import * as React from 'react';
import { ScaledSheet } from 'react-native-size-matters';
import { Text, View, StyleSheet, Image, KeyboardAvoidingView, Dimensions, Platform } from 'react-native';
import { Images } from '../../../components/index';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import OtpInputs from 'react-native-otp-inputs';
import { TextField, CustomButton, CustomStatusBar, BackBtn, Colors } from '../../../components';
const screenWidth = Dimensions.get('window').width;
const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.$backgroundColor,
    },
    signupConatiner: {
        flexDirection: 'row', marginTop: '5%', width: '100%'
    },
    backbtnCss: {
        width: '12%',
        marginTop: Platform.OS === 'ios' ? '8%' : 0,


    },
    signupTextq: {
        width: '75%',
        marginTop: Platform.OS === 'ios' ? '12%' : 0,

        // justifyContent: 'center', alignContent: 'center', alignItems: 'center',


    },
    inputmarginBottom: {
        marginBottom: '5%',
    },
    signupText1: {
        textAlign: 'center',
        fontFamily: 'Lato-Semibold',
        fontSize: hp(3.5),
        color: 'rgb(51,51,51)'
    },
    logoContainer: {
        marginBottom: '5%',
        marginTop: '5%',
        alignItems: 'center',
        alignSelf: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        backgroundColor: '#fff',
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        width: Dimensions.get('window').width * 0.3,
        height: Dimensions.get('window').width * 0.3,
        borderColor: '#fff',
    },
    messagelogo: {
        //marginTop:Dimensions.get('window').width * 0.4,

    },

    inputContainer: {
        padding: '5%',
        flex: 1,
        marginTop: '1%',

    },
    firstnameContainer: {
        flexDirection: 'row',
        marginBottom: '1%',
    },
    ortextConatiner: {
        alignItems: 'center', alignSelf: 'center'
    },
    ortext: {
        fontFamily: 'Lato-Regular', color: 'rgba(51,51,51,0.35)', fontSize: hp(2.5)
    }, labelConatiner: {
        marginBottom: '3%',
        marginTop: '5%'

    },
    labelText: {
        fontFamily: 'Lato-Semibold', color: 'rgba(51,51,51,0.5)', fontSize: hp(2.5)
    },
    dontAccountText: {
        fontFamily: 'Lato-Medium',
        fontSize: hp(3.0),

    },
    bottomText: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 15,
        alignItems: 'center',
    },
    signupText: {
        fontFamily: 'Lato-Semibold',
        fontSize: hp(3.0),
        color: 'rgb(70,50,103)'

    },
    checkbox: {
        //  width: Dimensions.get('window').width * 0.1,
        //  height: Dimensions.get('window').width * 0.1,
        width: 20,
        height: 20,
        resizeMode: 'contain',
    },
    agreetext: {
        fontFamily: 'Lato-Regular', color: 'rgb(51,51,51)', fontSize: hp(1.8)
    },
    termText: {
        fontFamily: 'Lato-Semibold',
        fontSize: hp(1.8),
        color: 'rgb(70,50,103)',
        textDecorationLine: 'underline',
        textDecorationColor: 'rgb(70,50,103)',


    },
});

export default styles;