import { Platform, Dimensions } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const screenWidth = Dimensions.get('window').width;
import { Images, Colors, TextField, Font, CustomButton } from '../../../components';
const screenHeight = Math.round(Dimensions.get('window').height);
const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.$backgroundColor,
    },
    enterTextConatiner: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: '3%',

    },
    enterText: {
        fontFamily: 'Lato-Regular',
        fontSize: hp(3.0),
        textAlign: 'center',

    },
    messagelogo: {
        width: Dimensions.get('window').width * 0.4,
        height: Dimensions.get('window').width * 0.4,
        resizeMode: 'contain',
    },


    signupConatiner: {
        flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginTop: '10%',
    },
    inputmarginBottom: {
        marginBottom: '5%',
    },
    backbtnCss: {
        width: '12%',

    },
    signupTextq: {
        width: '88%'

    },
    fillText_Add: {
        textAlign: 'center',
        fontFamily: 'Lato-Medium',
        fontSize: hp(2.3),
        color: '#453166'
    },
    forgotPasswordText: {
        // fontFamily: 'Lato-Medium',
        fontSize: hp(2.4),
        //  textAlign: 'center',
        // fontStyle: 'italic',
        padding: '3%',
        // width: '100%',

    },

    signupText1: {
        textAlign: 'center',
        fontFamily: 'LatoSemibold',
        fontSize: hp(3.0),
        color: 'rgb(51,51,51)'
    },
    logoContainer: {
        alignItems: 'center',
        alignSelf: 'center',



        // borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        //width: Dimensions.get('window').width * 0.5,
        //height: Dimensions.get('window').width * 0.5,

        //borderColor: '#e0dee3', 
    },
    view_Row_: {
        flexDirection: 'row',marginBottom:5
    },
    view_Tv_1: {
        marginTop: 2, fontSize: 18, marginLeft: 10,
    },
    inputContainer: {
        padding: '5%',
        flex: 1,
        // marginTop: '2%'


    },

    agreetext: {
        fontFamily: 'Lato-Regular', color: 'rgb(51,51,51)', fontSize: hp(2.5)
    },
    checkbox: {
        width: Dimensions.get('window').width * 0.080,
        height: Dimensions.get('window').width * 0.080,
        resizeMode: 'contain',
        marginLeft: 10, marginTop: 1
    },



});

export default styles;