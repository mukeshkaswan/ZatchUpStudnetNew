import {ScaledSheet} from 'react-native-size-matters';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  fillText_Add: {
    fontFamily: 'Lato-Medium',
    fontSize: hp(2.1),

    paddingLeft: 14,
  },
  picker: {
    width: '170@ms',
    // marginTop: '1@ms',
    // marginLeft:'20@ms',
    // marginRight:'20@ms',
    //   height: '50@ms',
    //   margin: '5@ms',
    //  // borderRadius: '10@ms',
    //   backgroundColor: 'white',
    //   justifyContent: 'center',
    //   borderWidth: '1@ms',
    // //  borderColor: 'lightgray',
    //   color: 'lightgray'
  },
  checkbox: {
    //  width: Dimensions.get('window').width * 0.1,
    //  height: Dimensions.get('window').width * 0.1,
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  agreetext: {
    fontFamily: 'Lato-Regular',
    color: 'rgb(51,51,51)',
    fontSize: hp(2.2),
    marginLeft: 10,
  },
  termText: {
    fontFamily: 'Lato-Semibold',
    fontSize: hp(2.4),
    color: 'rgb(70,50,103)',
    textDecorationLine: 'underline',
    textDecorationColor: 'rgb(70,50,103)',
  },
  headingtext: {
    color: 'grey',
    marginLeft: 10,
    marginTop: 8,
    fontSize: 18,
  },
});
export default styles;