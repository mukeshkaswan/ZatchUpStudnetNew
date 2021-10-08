import { ScaledSheet } from 'react-native-size-matters';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const styles = ScaledSheet.create({

  maincontainer: {
    flex: 1,
    backgroundColor: '#F1F1F1',

  },
  fillTextContainer:{
    paddingVertical: '5%',
},
underview: {
  height: 1,
  width: '100%',
 // marginTop: 20,
 // marginLeft: 20,
  // marginRight:10,
  backgroundColor: '#C6C6C6',
},

fillText: {
  textAlign: 'center',
  fontFamily: 'Lato-Medium',
  fontSize: hp(2.8),
  color: 'rgb(48,48,48)'
},

  picker: {
    width: '170@ms',
    marginTop: '25@ms',
    // marginLeft:'20@ms',
    // marginRight:'20@ms',
  //   height: '50@ms',
  //   margin: '5@ms',
  //  // borderRadius: '10@ms',
  //   backgroundColor: 'white',
  //   justifyContent: 'center',
  //   borderWidth: '1@ms',
  // //  borderColor: 'lightgray',
  //   color: 'lightgray'
  },
  pickerItem: {
    color: '#A9A9A9'
  },
  submitbutton: {
    marginTop: '25@ms',
    backgroundColor: '#4E387E',
    width: '310@ms',
    height: '55@ms',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '10@ms'

  },
  submittext: {
    color: 'white',
    fontSize: '18@ms'

  },
  paddingDividerWrappers: { marginBottom: '8%', flex: 1 },

  gradepicker: {
    width: '190@ms',
    marginTop: '8@ms',
    // marginLeft:'20@ms',
    // marginRight:'20@ms',
    height: '50@ms',
    margin: '5@ms',
    borderRadius: '10@ms',
    backgroundColor: 'white',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'lightgray',

  },
  gradepickercontainer: {
    flexDirection: 'row',
    marginTop: '15@ms'

  },
  addbatchtext: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 20

  },
  addresstextinputstyle: {
    width: '340@ms',
    marginTop: '12@ms',
   // borderWidth: '1@ms',
   // borderColor: 'lightgray',
    // marginLeft:'20@ms',
    // marginRight:'20@ms',
   // height: '90@ms',
    

    margin: 5,
	  borderRadius: 8,
    backgroundColor: 'white',
  },
  addressinput: {
    fontSize: '14@ms',
    padding: '16@ms',
    color: 'lightgray'
  },
  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '110@ms',
    //  alignItems: 'center',
    backgroundColor: '#fff',
    height: '50@ms',
    borderRadius: '10@ms',
    margin: '8@ms',
    borderColor: 'lightgray',
    borderWidth: 3,
    padding: '5@ms'


  },
  addmorecontainer: {
    flexDirection: 'row',
    marginRight: '120@ms',
    padding: '10@ms'

  },
  addmorebutton: {
    backgroundColor: '#4E387E',
    width: '35@ms',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '10@ms',
    height: '35@ms',

  },
  addmorebuttontext: {
    color: 'white',
    fontSize: '24@ms',

  },
  addmoreschooltext: {
    color: '#4E387E',
    fontWeight: 'bold',
    fontSize: '15@ms',
    marginTop: '6@ms',
    marginLeft: '12@ms'

  }

})
export default styles;