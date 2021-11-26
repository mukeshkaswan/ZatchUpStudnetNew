import { Platform, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScaledSheet } from 'react-native-size-matters';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Math.round(Dimensions.get('window').height);
//import {Font} from '../index';
import { Images, Colors, TextField, Font, CustomButton } from '../../components';

export default ScaledSheet.create({

	inputContainer: {
		backgroundColor: '#FFFFFF',
		//borderRadius: 12,
		//marginBottom:'5%',
		borderWidth: 1,
		borderColor: '#C6C6C6',

		//borderColor: 'rgba(51,51,51,0.5)',

	},
	flexdirection: {
		flexDirection: 'row',

	},
	textboxwidth: {
		width: '100%',

	},
	textboxfieldd: {
		fontFamily: 'Lato-Regular',
		height: 28,
		width: '80%',
		fontSize: hp(1.5),
		fontWeight: 'normal',
		paddingLeft: '5%',
		paddingTop:'2%',
		marginTop:1,
		color: '#000'
	},
	textAreaCss: {
		fontFamily: 'Lato-Regular',
		height: 100,
		width: '100%',
		fontWeight: 'normal',
		fontSize: hp(2.3),
		paddingLeft: '5%',
		textAlignVertical: 'top'
	},
	imageiconConatiner: {
		justifyContent: 'flex-end',
		alignItems: 'flex-end',
		alignSelf: 'center',
		width: '17%',
		marginRight: '3%',

	},
	imageicon: {
		width: Dimensions.get('window').width * 0.05,
		height: Dimensions.get('window').width * 0.05,
		resizeMode: 'contain',
		//tintColor:'#ACAEAB'

	}
});