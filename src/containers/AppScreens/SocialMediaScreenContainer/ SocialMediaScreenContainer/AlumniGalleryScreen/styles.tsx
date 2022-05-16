import {Dimensions} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const screenWidth = Dimensions.get('window').width;
import {Colors} from '../../../../../components/index';
const screenHeight = Math.round(Dimensions.get('window').height);
const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F1F1',
  },

  boxcontainer: {
    marginTop: 15,
    paddingHorizontal: 16,
  },

  mainbordercontainer: {
    backgroundColor: 'white',
    height: hp('12'),
    marginTop: 10,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  bordercontainer: {
    height: hp('8'),
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'lightgrey',
  },
});
export default styles;
