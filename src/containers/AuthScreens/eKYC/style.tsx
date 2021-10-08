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
    signupText1: {
        textAlign: 'center',
        //  fontFamily: 'LatoSemibold',
        fontSize: hp(3.0),
        color: 'rgb(51,51,51)'
    },
    logoContainer: {
        marginBottom: '5%',
        marginTop: '5%',
       // flexDirection: 'row',
        alignItems: 'center',
        flexDirection: 'row', 
    },
    messagelogo: {
        // width: Dimensions.get('window').width * 0.2,
        // height: Dimensions.get('window').width * 0.2,
        width: 60,
        height: 60,
        marginRight: '3%',
    },

    inputContainer: {
        padding: '4%',
        flex: 1
    },

    uploadtext: {
        color: 'rgb(51,51,51)', fontSize: hp(2.2)
    },
    selectiontext: {
        color: 'rgba(51,51,51,0.5)', 
        fontSize: hp(2.0),
         marginTop: '1%',
          flexWrap: 'wrap',
          alignItems:'flex-start',
          marginRight:20,
          flexShrink:1
    },
    bottomText: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 15,
        alignItems: 'center',
    },
    signupText: {
        // fontFamily: 'LatoSemibold',
        fontSize: hp(3.0),
        color: 'rgb(70,50,103)'

    },
    checkbox: {
        width: Dimensions.get('window').width * 0.1,
        height: Dimensions.get('window').width * 0.1,
        resizeMode: 'contain',
    },
    agreetext: {
        color: 'rgb(51,51,51)', fontSize: hp(2.5)
    },
    termText: {
        fontSize: hp(2.5), color: 'rgb(70,50,103)', textDecorationLine: 'underline', textDecorationColor: 'rgb(70,50,103)'
    },
});

export default styles;