import { Platform, Dimensions } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const screenWidth = Dimensions.get('window').width;
import { Images, Colors, TextField, Font, CustomButton } from '../../../components';
const screenHeight = Math.round(Dimensions.get('window').height);
const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.$backgroundColor,
  },
  passwordText: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingLeft: 25
  },
  changepasswordText: {
    fontSize: 20,
    fontWeight: 'bold'

  },
  inputContainer: {
    padding: '4%',
    flex: 1,
  },
  backbtnCss: {
    width: '12%',
    marginTop:20

},



})
export default styles;