import { Platform, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScaledSheet } from 'react-native-size-matters';
import { Images,Colors,TextField,Font,CustomButton } from '../../components';
export default ScaledSheet.create({
    buttonContainer:{
      backgroundColor:Colors.$BtnBackgroundColor,
	  borderTopRightRadius: 12,
	  borderBottomRightRadius: 12,
	  height:30,
	  alignItems: 'flex-start',
	  alignSelf: 'center',
	  width:'100%',
	
    },
	
});