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
  },
  lecturetitletext: {
    flex: 2,
    marginHorizontal: 2,
    textAlign: 'center',
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
  topictext_: {
    flex: 2,
    marginHorizontal: 2,
    textAlign:'left',
    marginLeft:20
  },
  coursestextcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    marginHorizontal: 10,
    paddingVertical: 10,
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