import { Platform, Dimensions } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const screenWidth = Dimensions.get('window').width;
import { Images, Colors, TextField, Font, CustomButton } from '../../../components';
const screenHeight = Math.round(Dimensions.get('window').height);
const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F1F1F1',

    },
    backbtnCss: {
        width: '12%', marginTop: '10%'
    },
    logoContainer: {
        alignItems: 'center',
        alignSelf: 'center',
        // marginTop:40,

        // borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        //width: Dimensions.get('window').width * 0.5,
        //height: Dimensions.get('window').width * 0.5,
        //borderColor: '#e0dee3', 
    },
    messagelogo: {
        width: Dimensions.get('window').width * 0.4,
        height: Dimensions.get('window').width * 0.4,
        resizeMode: 'contain',
        marginTop: '20%'
    },

    inputContainer: {
        padding: '5%',
        flex: 1,
    },
    enterTextConatiner: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: '3%',
        marginTop: '5%'
    },

    enterTextConatiner_copy: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: '3%',
       // marginTop: '2%'
    },
    enterText: {
        fontFamily: 'Roboto-Bold',
        fontSize: hp(2.8),
        textAlign: 'center',

    },

    enterText_copy: {
        fontFamily: 'Roboto-Bold',
        fontSize: hp(2.5),
        textAlign: 'center',
        color:'#453166'

    },
    otpContainer: {
        paddingHorizontal: '9%', marginVertical: '15%', justifyContent: 'center',
        alignItems: 'center',
    },
    OtpinputContainer: {
        backgroundColor: '#fff', borderRadius: 15, width: '22%', marginRight: '4%', height: 60, justifyContent: 'center',
        alignItems: 'center',
    },
    otpinput: {
        alignSelf: 'center', fontFamily: 'Lato-Regular', fontSize: 20, textAlign: 'center'
    },

    OtpResendContainer: {
        alignItems: 'center', marginTop: '10%'
    },
    resendText: {
        fontFamily: 'Lato-Regular', fontSize: hp(3.0), color: 'rgb(70,50,103)', textDecorationLine: 'underline', textDecorationColor: 'rgb(70,50,103)'
    },


});

export default styles;