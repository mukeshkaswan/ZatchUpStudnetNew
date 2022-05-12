import { Platform, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Font} from '../image';
export default EStyleSheet.create({
    conatiner:{
		justifyContent: 'center',
    alignItems: 'center'
		
	},
    buttonContainer:{
      backgroundColor:'rgb(70,50,103)',
	  borderRadius: 12,
	 justifyContent: 'center',
	  width:'100%',
	  padding:'5%'
   
    },
	 bg:{
      backgroundColor:'rgb(63,168,63)',
		  padding:'10%',
		 
   
    },
	border:{
      backgroundColor:'#fff',
		  padding:'10%',
		  borderWidth:1,
		 borderColor:'rgb(221,54,54)',
		 
   
    },
	textcolor:{
		color:'rgb(221,54,54)'
	},
	buttonTitle:{
		fontFamily: Font.LatoMedium,
        color:'#FFF',
		textAlign:'center',
		fontSize:hp(2.8),
		
		
	}
});