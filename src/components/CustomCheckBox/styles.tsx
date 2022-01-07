import {Platform, Dimensions} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ScaledSheet} from 'react-native-size-matters';
import {Images, Colors, TextField, Font, CustomButton} from '../../components';

export default ScaledSheet.create({
  conatiner: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '2%',
  },
  checkbox: {
    //  width: Dimensions.get('window').width * 0.1,
    //  height: Dimensions.get('window').width * 0.1,
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});
