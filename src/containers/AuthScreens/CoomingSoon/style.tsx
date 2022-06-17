import * as React from 'react';
import {ScaledSheet} from 'react-native-size-matters';
import {
  Text,
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import {Images} from '../../../components/index';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import OtpInputs from 'react-native-otp-inputs';
import {
  TextField,
  CustomButton,
  CustomStatusBar,
  BackBtn,
  Colors,
} from '../../../components';
const screenWidth = Dimensions.get('window').width;
const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.$backgroundColor,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  child_view: {
    flexDirection: 'row',
    backgroundColor: '#4B2A6A',
    height: 60,
  },
  image_menu: {
    marginLeft: 15,
    marginTop: 15,
    tintColor: '#FFFFFF',
  },
  tv_view: {
    flex: 1,
    flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
  },

  ZatchUp_tv: {
    color: '#FFFFFF',
    marginRight: 30,
    fontSize: 28,
    fontWeight: 'bold',
    bottom: 5,
  },
  TM_tv: {
    color: '#FFFFFF',
    marginRight: 30,
    fontSize: 10,
    bottom: 10,
  },
  Notification_view: {
    position: 'absolute',
    right: 55,
    alignSelf: 'flex-end',
    top: 1,
  },


  Cardview_city: {
    //  marginLeft: 5,
   // marginRight: 15,
    //marginLeft: '10%',
    width: '90%',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    //shadowRadius: 6,
    shadowOpacity: 0.26,

    borderColor: 'lightgrey',
  },


  dot_view: {
    position: 'absolute',
    right: 10,
    alignSelf: 'flex-end',
    top: 0,
  },

  dot_image: {
    marginRight: 0,
    marginTop: 15,
    tintColor: '#FFFFFF',
    height: 26,
    width: 26,
    right: 10,
  },

  inbox_iconreminder: {
    marginRight: 5,
    marginTop: 11,
    tintColor: '#FFFFFF',
    height: 30,
    width: 30,
  },
  signupConatiner: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: '10%',
  },
  firstnameContainer: {
    flexDirection: 'row',
    // marginBottom: '1%',
    marginTop: '5%',
  },
  inputmarginBottom: {
    marginBottom: '5%',
  },
  stateInnerWrapper: {flex: 1, marginRight: '2%'},
  paddingDividerWrapper: {marginBottom: '5%', flex: 1},
  paddingDividerWrapper_: {marginBottom: '2%', flex: 1},
  paddingDividerWrappers: {marginBottom: '8%', flex: 1},
  paddingDividerWrapperss: {marginBottom: '1%', flex: 1},

  stateWrapper: {
    marginTop: '5%',
    marginBottom: '3%',
    flex: 1,
    flexDirection: 'row',
  },

  stateWrapper_cop: {
    marginTop: '2%',
    // marginBottom: '1%',
    flex: 1,
    flexDirection: 'row',
  },
  stateWrapper_copy: {
    // marginTop: '2%',
    marginBottom: '3%',
    flex: 1,
    flexDirection: 'row',
  },
  fillTextContainer: {
    paddingVertical: '5%',
  },
  fillText: {
    textAlign: 'center',
    fontFamily: 'Lato-Medium',
    fontSize: hp(2.5),
    color: 'rgb(48,48,48)',
  },

  fillText_Add: {
    textAlign: 'center',
    fontFamily: 'Lato-Medium',
    fontSize: hp(2.5),
    color: '#453166',
  },
  logoContainer: {
    marginBottom: '5%',
    marginTop: '5%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  messagelogo: {
    width: Dimensions.get('window').width * 0.2,
    height: Dimensions.get('window').width * 0.2,
    marginRight: '5%',
  },

  inputContainer: {
    padding: '5%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  uploadtext: {
    fontFamily: 'Lato-Regular',
    color: 'rgb(51,51,51)',
    fontSize: hp(2.5),
  },
  selectiontext: {
    fontFamily: 'Lato-Regular',
    color: 'rgba(51,51,51,0.5)',
    fontSize: hp(2.0),
  },
  bottomText: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 15,
    alignItems: 'center',
  },
  signupText: {
    fontFamily: 'LatoSemibold',
    fontSize: hp(3.0),
    color: 'rgb(70,50,103)',
  },
  checkbox: {
    width: Dimensions.get('window').width * 0.1,
    height: Dimensions.get('window').width * 0.1,
    resizeMode: 'contain',
  },
  agreetext: {
    fontFamily: 'Lato-Regular',
    color: 'rgb(51,51,51)',
    fontSize: hp(2.5),
  },
  termText: {
    fontFamily: 'LatoSemibold',
    fontSize: hp(2.5),
    color: 'rgb(70,50,103)',
    textDecorationLine: 'underline',
    textDecorationColor: 'rgb(70,50,103)',
  },
  profilepic: {
    height: 40,
    width: 40,
    borderRadius: 40,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  postbtn: {
    backgroundColor: '#4B2A6A',
    height: 30,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  likecommentContainer: {
    flexDirection: 'row',
    marginTop: 5,
    paddingHorizontal: 16,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    justifyContent: 'space-between',
  },
  border: {
    borderWidth: 0.4,
    borderColor: 'lightgrey',
    marginTop: 10,
  },
  boldText: {
    fontWeight: 'bold',
  },
  //   checkbox: {
  //     //  width: Dimensions.get('window').width * 0.1,
  //     //  height: Dimensions.get('window').width * 0.1,
  //     width: 20,
  //     height: 20,
  //     resizeMode: 'contain',
  //   },

  // styles for modal
  btn: {
    color: 'red',
    marginTop: 10,
    fontWeight: 'bold',
  },
  modalContainer: {
    backgroundColor: Colors.$backgroundColor,

    paddingVertical: 10,

    borderRadius: 5,
  },
  rowContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  mborder: {
    borderWidth: 0.5,
    borderColor: 'lightgrey',
    width: '100%',
    marginTop: 12,
  },
  reporttext: {
    fontSize: hp(2.1),
  },
});

export default styles;
