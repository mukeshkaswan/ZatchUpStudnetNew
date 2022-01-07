import {Dimensions} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const screenWidth = Dimensions.get('window').width;
import {Colors} from '../../../components/index';
const screenHeight = Math.round(Dimensions.get('window').height);
const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F1F1',
  },
  card: {
    paddingHorizontal: 16,
    marginTop: 10,

    paddingVertical: 16,
    marginHorizontal: 8,
  },

  btn: {
    borderWidth: 1,
    height: 35,
    width: 90,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: 'rgb(70,50,103)',
    marginRight: 10,
  },
});
export default styles;
