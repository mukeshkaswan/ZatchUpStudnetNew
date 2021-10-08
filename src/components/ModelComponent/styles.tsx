import { Platform, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScaledSheet } from 'react-native-size-matters';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Math.round(Dimensions.get('window').height);
export default ScaledSheet.create({

    bottomModel: {
        justifyContent: 'flex-end',
        margin: 0,
    }, bottomModelContainer: {
        backgroundColor: 'white',
        /*  justifyContent: 'center',
         alignItems: 'center', */
        paddingBottom: '8%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderColor: 'rgba(0, 0, 0, 0.1)'
    },
    inputmarginBottom:{
        marginBottom:'5%',
      },

      inputmarginTop:{
        marginTop:'5%',
      },
    centerModelContainer: {
        backgroundColor: 'white',
        padding: 22,
        width: '100%',
        borderRadius: 20,
        borderColor: 'rgba(0, 0, 0, 0.1)'
    },
    centerModelContainercopy: {
        backgroundColor: 'white',
        padding: 22,
        width: '100%',
       // borderRadius: 20,
        borderColor: 'rgba(0, 0, 0, 0.1)'
    },
    logoContainer: {
        alignItems: 'center',
        alignSelf: 'center',

    },
    logo: {
        width: Dimensions.get('window').width * 0.4,
        height: Dimensions.get('window').width * 0.4,
        resizeMode: 'contain',
    },
    inputContainer: {
        paddingHorizontal: '8%',

    }, textEmployee: {
        fontFamily: 'Lato-Regular',
        fontSize: hp(2.5),
        alignSelf: 'center',
        marginTop:'5%',



    }, modelcontent: {
        fontFamily: 'Lato-Regular',
        fontSize: hp(2.5),
        alignSelf: 'center',
        lineHeight: 30,
        color: 'rgb(51,51,51)',
        textAlign: 'center'
    },

    modelcontentcopy: {
        fontFamily: 'Lato-Regular',
        fontSize: hp(2.3),
        alignSelf: 'center',
        lineHeight: 30,
        color: '#43484B',
        textAlign: 'center'
    },
    modelcontentAuth: {
        fontFamily: 'Lato-Regular',
        fontSize: hp(2.5),
        alignSelf: 'center',
        lineHeight: 30,
        color: '#A1A1A1',
        textAlign: 'center',
        paddingBottom: '8%',

    }, welcomeText: {
        fontFamily: 'Lato-Medium',
        fontSize: hp(2.8),
        alignSelf: 'center',
        color: 'rgb(51,51,51)',
        marginVertical: '5%',


    },
});