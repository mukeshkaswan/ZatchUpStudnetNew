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
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    resizeMode: 'stretch',
    alignSelf: 'center',
  },
  nametext: {
    fontSize: hp(1.8),
    fontWeight: 'bold',
    marginLeft: 8,
    //marginVertical: 10,
  },
  rowContainer: {
    marginVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  profileImage: {
    height: 50,
    width: 50,
    tintColor: 'grey',
    borderRadius: 25,
  },
  liketext: {
    marginLeft: 5,
    fontWeight: 'bold',
  },
  postbtn: {
    backgroundColor: '#4B2A6A',
    height: 30,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  boldtext: {
    fontWeight: 'bold',
  },
  picContainer: {
    width: '90%',
    alignSelf: 'center',
    paddingLeft: '10@ms',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingRight: '10@ms',
  },
  image1: {
    width: '155@ms',
    height: '155@ms',
    margin: '8@ms',
    //borderRadius: '20@ms',
  },
  border: {
    borderWidth: 0.4,
    borderColor: 'lightgrey',
    marginTop: 10,
  },
});
export default styles;
