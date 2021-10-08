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
    inputmarginBottom:{
        marginBottom:'5%',
      },
    backbtnCss: {
        width: '12%',

    },
    signupTextq: {
        width: '88%'

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
  

    inputContainer: {
        padding: '5%',
        flex: 1,
        marginTop:'20%'

        
    },

  
 
});

export default styles;