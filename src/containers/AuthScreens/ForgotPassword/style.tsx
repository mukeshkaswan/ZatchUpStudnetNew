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
    backbtnCss: {
        width: '12%', marginTop: Platform.OS === 'ios' ? '14%' : '10%',

    },
    inputmarginBottom: {
        marginBottom: '5%',

    },
    logoContainer: {
        marginTop: '10%',
        alignItems: 'center',
        alignSelf: 'center',

        // borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        //width: Dimensions.get('window').width * 0.5,
        //height: Dimensions.get('window').width * 0.5,

        //borderColor: '#e0dee3', 
    },
    messagelogo: {
        width: Dimensions.get('window').width * 0.5,
        height: Dimensions.get('window').width * 0.5,
        resizeMode: 'contain',
    },

    inputContainer: {
        padding: '5%',
        flex: 1,
    },
    enterTextConatiner: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: '5%',

    },
    enterText: {
        // fontFamily: 'Lato-Regular',
        fontSize: hp(2.5),
        textAlign: 'center',

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
});

export default styles;