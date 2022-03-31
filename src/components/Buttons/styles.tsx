import { Platform, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScaledSheet } from 'react-native-size-matters';
import { Images, Colors, TextField, Font, CustomButton } from '../../components';

export default ScaledSheet.create({
	conatiner: {
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: '2%',


	},
	buttonContainer: {
		backgroundColor: 'rgb(70,50,103)',
		borderRadius: 15,
		justifyContent: 'center',
		width: '100%',
		padding: '4%'

	},
	bg: {
		backgroundColor: 'rgb(63,168,63)',
		padding: '5%',


	},
	border: {
		backgroundColor: '#fff',
		padding: '10%',
		borderWidth: 1,
		borderColor: 'rgb(221,54,54)',


	},
	textcolor: {
		color: 'rgb(221,54,54)'
	},
	buttonTitle: {
		fontFamily: 'Lato-Medium',
		color: '#FFF',
		textAlign: 'center',
		fontSize: hp(2.3),


	}
});