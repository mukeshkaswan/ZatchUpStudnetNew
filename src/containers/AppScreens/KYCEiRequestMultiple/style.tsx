import {ScaledSheet} from 'react-native-size-matters';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  boxcontainer: {
    marginTop: 15,
    paddingHorizontal: 16,
  },
  pendingtext: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  pendingtextt: {
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft:10,
    marginBottom:10
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
  snotext: {
    flex: 2,
    marginHorizontal: 2,
    textAlign: 'center',
    marginRight:10

  },
  snotext_: {
    flex: 2,
    marginHorizontal: 1,
    textAlign: 'center',
    marginRight:10
  },
  lecturetitletext: {
    flex: 2,
    marginHorizontal: 2,
    textAlign: 'center',
    marginRight:10

  },
  titletext: {
    // fontSize: 18,
    fontWeight: 'bold',
  },

  topictext: {
    flex: 2,
    marginHorizontal: 2,
    textAlign: 'center',
  },
  coursestextcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    marginHorizontal: 5,
    paddingVertical: 4,
    alignItems:'center'
  },

  eyeimage: {
    height: 18,
    width: 18,
    resizeMode: 'contain',
    tintColor: 'blue',
  },

  image: {
    height: 18,
    width: 18,
    resizeMode: 'contain',
    tintColor: 'blue',
  },
});
export default styles;