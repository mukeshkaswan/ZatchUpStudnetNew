import {Dimensions} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const screenWidth = Dimensions.get('window').width;
import {Colors} from '../../../components/index';
const screenHeight = Math.round(Dimensions.get('window').height);
import {
  Platform,
} from 'react-native';
const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F1F1',
  },
  card: {
    marginHorizontal: 16,
    marginTop: 10,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  checkbox: {
    //  width: Dimensions.get('window').width * 0.1,
    //  height: Dimensions.get('window').width * 0.1,
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  addtoalumnitext: {
    //fontFamily: 'Lato-Regular',
    color: 'rgb(51,51,51)',
    fontSize: hp(1.5),
    marginLeft: 10,
  },
  nametext: {
    fontWeight: 'bold',
    marginLeft: 10,
  },
  textinputContainer: {
    borderWidth: 0.5,
    marginTop: 15,
  },
  textinput: {
    textAlignVertical: 'top',
    paddingHorizontal: 16,
    height:Platform.OS == 'ios' ? 150 : 0
  },
  rowContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: 10,
  },
  deleteicon: {
    resizeMode: 'cover',

    marginTop: 10,
    width: 20,
    height: 20,
    // alignSelf: 'flex-end',
    marginRight: 10,
  },
  addphotoText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
export default styles;
