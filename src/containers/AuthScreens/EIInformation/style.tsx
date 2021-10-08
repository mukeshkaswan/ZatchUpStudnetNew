import * as React from 'react';
import { ScaledSheet } from 'react-native-size-matters';
import { Text, View, StyleSheet, Image, KeyboardAvoidingView, Dimensions } from 'react-native';
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
        flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginTop: '10%',
    },
    firstnameContainer: {
        flexDirection: 'row',
        // marginBottom: '1%',
        marginTop: '5%',
    },
    inputmarginBottom: {
        marginBottom: '5%',
    },
    stateInnerWrapper: { flex: 1, marginRight: '2%' },
    paddingDividerWrapper: { marginBottom: '5%', flex: 1 },
    paddingDividerWrapper_: { marginBottom: '2%', flex: 1 },
    paddingDividerWrappers: { marginBottom: '8%', flex: 1 },
    paddingDividerWrapperss: { marginBottom: '1%', flex: 1 },
    
    stateWrapper: {
        marginTop: '5%',
        marginBottom: '3%',
        flex: 1,
        flexDirection: 'row',
    },

    stateWrapper_cop: {
        marginTop: '2%',
       // marginBottom: '1%',
        flex: 1,
        flexDirection: 'row',
    },
    stateWrapper_copy: {
       // marginTop: '2%',
        marginBottom: '3%',
        flex: 1,
        flexDirection: 'row',
    },
    fillTextContainer: {
        paddingVertical: '5%',
    },
    fillText: {
        textAlign: 'center',
        fontFamily: 'Lato-Medium',
        fontSize: hp(2.5),
        color: 'rgb(48,48,48)'
    },

    fillText_Add: {
        textAlign: 'center',
        fontFamily: 'Lato-Medium',
        fontSize: hp(2.5),
        color: '#453166'
    },
    logoContainer: {
        marginBottom: '5%',
        marginTop: '5%',
        flexDirection: 'row',
        alignItems: 'center',

    },
    messagelogo: {
        width: Dimensions.get('window').width * 0.2,
        height: Dimensions.get('window').width * 0.2,
        marginRight: '5%',
    },

    inputContainer: {
        padding: '5%',
        flex: 1
    },

    uploadtext: {
        fontFamily: 'Lato-Regular', color: 'rgb(51,51,51)', fontSize: hp(2.5)
    },
    selectiontext: {
        fontFamily: 'Lato-Regular', color: 'rgba(51,51,51,0.5)', fontSize: hp(2.0)
    },
    bottomText: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 15,
        alignItems: 'center',
    },
    signupText: {
        fontFamily: 'LatoSemibold',
        fontSize: hp(3.0),
        color: 'rgb(70,50,103)'

    },
    checkbox: {
        width: Dimensions.get('window').width * 0.1,
        height: Dimensions.get('window').width * 0.1,
        resizeMode: 'contain',
    },
    agreetext: {
        fontFamily: 'Lato-Regular', color: 'rgb(51,51,51)', fontSize: hp(2.5)
    },
    termText: {
        fontFamily: 'LatoSemibold', fontSize: hp(2.5), color: 'rgb(70,50,103)', textDecorationLine: 'underline', textDecorationColor: 'rgb(70,50,103)'
    },
});

export default styles;