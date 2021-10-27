import {Platform, Dimensions} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
 
import { ScaledSheet } from 'react-native-size-matters';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Math.round(Dimensions.get('window').height);
import {Font} from '../../image';
const styles = ScaledSheet.create({
  container: {
    backgroundColor: '#4B2A6A',
    height: 60,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    justifyContent: 'center',
    paddingVertical:15,
    alignItems: 'center',
    paddingHorizontal: 55,
   
   
  },
  titleText: {
    color: '#FFFFFF',
    marginRight: 2,
    fontSize: hp(2.8),
    fontWeight:'400',
    // bottom: 5,
    textAlign: 'center',
  },
});

export default styles;