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

    logoContainer: {
        alignItems: 'center',
        marginTop: '10%',
    },
    logo: {
        width: Dimensions.get('window').width * 0.4,
        height: Dimensions.get('window').width * 0.4,
        resizeMode: 'contain',
    },
    inputContainer: {
        padding: '5%',
    },
    inputmarginBottom: {
        marginBottom: '5%',

    },
    forgotPassword: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    forgotPasswordText: {
       // fontFamily: 'Lato-Medium',
        fontSize: hp(2.3),
        textAlign: 'center',
        fontStyle: 'italic',
        marginTop: '10%',
        width: '100%',

    },
    dontAccountText: {
       // fontFamily: 'Lato-Medium',
        fontSize: hp(2.3),
    },
    bottomText: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        position: 'absolute',
        bottom: 0,
      //  marginBottom: 30,
        top: screenHeight - 120,
    },
    signupText: {
      //  fontFamily: 'Lato-Semibold',
        fontSize: hp(2.3),
        color: 'rgb(70,50,103)',

    },

    container_Indi: {
        flex: 1,
        justifyContent: "center"
      },
      horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
       // padding: 10
      }
});

export default styles;