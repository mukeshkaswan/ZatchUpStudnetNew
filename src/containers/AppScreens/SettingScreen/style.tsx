import { Dimensions } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const screenWidth = Dimensions.get('window').width;
import { Colors } from '../../../components/index';
const screenHeight = Math.round(Dimensions.get('window').height);
const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  detail_text: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
  },
  text_container: {
    flexDirection: 'row',
    marginLeft: 18,
    marginTop: 15
  },
  border: {
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
  },
  border1: {
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
    width: '100%',
    alignSelf: 'center',
    marginTop: 10,
  },
  title_text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    color: 'rgb(70,50,103)',
  },
  image: { width: 20, height: 20, marginStart: 8 },
  addicon: {
    height: 25,
    width: 25,
    borderRadius: 15,
    marginRight: 10,
  },
  addcitycontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginTop: 20,
    paddingBottom: 18,
    paddingTop: 8,
    paddingHorizontal: 8,
  },
  cardp: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginTop: 20,
    paddingBottom: 18,
    paddingTop: 8,
    paddingHorizontal: 8,
    marginBottom: 10
  },
  privacyrowcontainer: {
    flexDirection: 'row',
    marginHorizontal: 8,
    marginTop: 20,
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  radiobuttoncontainer: {
    paddingLeft: '40@ms',
    marginTop: '25@ms',
    paddingBottom: '30@ms',
  },
  radiocontent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labeltext: {
    alignSelf: 'flex-start',
    paddingLeft: 20,
    marginTop: 20,
    marginBottom: 5,
  },
  textinputcontainer: {
    borderWidth: 1,
    height: hp('5'),
    borderColor: 'lightgrey',
    width: 300,
    borderRadius: 10,
    marginTop: 5,

  },
  logoContainer: {
    alignItems: 'center',
    alignSelf: 'center',


  },
  messagelogo: {
    width: Dimensions.get('window').width * 0.6,
    height: Dimensions.get('window').width * 0.6,
    resizeMode: 'contain',
  },

  inputContainer: {
    padding: '5%',
    flex: 1,
  },

  enterText: {
    fontFamily: 'Lato-Regular',
    fontSize: hp(2.2),
    textAlign: 'center',


  },
  otpContainer: {
    paddingHorizontal: '9%', justifyContent: 'center',
    alignItems: 'center',
  },
  OtpinputContainer: {
    backgroundColor: '#fff', borderRadius: 15, width: '22%', marginRight: '4%', height: 60, justifyContent: 'center',
    alignItems: 'center',
  },
  otpinput: {
    alignSelf: 'center', fontFamily: 'Lato-Regular', fontSize: 20, textAlign: 'center'
  },

  OtpResendContainer: {
    alignItems: 'center', marginTop: '5%', marginBottom: '5%'
  },
  resendText: {
    fontFamily: 'Lato-Regular', fontSize: hp(2.8), color: 'rgb(70,50,103)', textDecorationLine: 'underline', textDecorationColor: 'rgb(70,50,103)'
  },

});
export default styles;
