import { Dimensions } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const screenWidth = Dimensions.get('window').width;
import {Colors } from '../../../components/index';
 const screenHeight = Math.round(Dimensions.get('window').height);
const styles = ScaledSheet.create({
    container: {
        flex: 1,
         backgroundColor: '#F1F1F1',

    },
    contactContainer:{
        height:180,
        width:300,
        backgroundColor:'white',
        alignSelf:'center',
        justifyContent:'center', 
        marginTop:'20%',
        borderRadius:20,
        alignItems:'center',
        elevation:10
        
      },
    text:{
        
        fontSize: hp(2.1),
        marginTop:'5%',
        fontWeight:'bold',
        color:Colors.$BtnBackgroundColor,
       // fontStyle:'lato'

    }
    
});
export default styles;