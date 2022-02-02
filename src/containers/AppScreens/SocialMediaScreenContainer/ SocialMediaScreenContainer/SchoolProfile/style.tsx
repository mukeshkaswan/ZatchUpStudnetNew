import {ScaledSheet} from 'react-native-size-matters';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = ScaledSheet.create({
  container: {
    // backgroundColor: 'pink',

    flex: 1,
    flexGrow: 1,
    paddingBottom: 10,
  },

  rowContainer1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  profilepic1: {
    height: 40,
    width: 40,
    borderRadius: 40,
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
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: -40,
  },

  nametext: {
    fontSize: hp(2.1),
    fontWeight: 'bold',
    marginLeft: 10,
  },
  likecontainer: {
    //   backgroundColor:'grey',
    flexDirection: 'row',
    // justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: '8@ms',
    marginBottom: '10@ms',
    justifyContent: 'space-between',
  },

  cardContent: {
    width: '92%',
    alignSelf: 'center',
    padding: '10@ms',
    marginTop: '10@ms',
    borderRadius: '10@ms',
  },

  cardtitletext: {
    fontWeight: 'bold',
    fontSize: hp(2.4),
    color: '#4E387E',
  },
  cardtitlecontent: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  textcontainer: {
    marginLeft: '10@ms',
  },

  schooltext: {
    fontWeight: 'bold',
    fontSize: hp(2),
    marginBottom: '4@ms',
  },
  textcontent: {
    fontSize: hp(1.8),
    fontWeight: 'bold',
    color: 'grey',
  },
  currentschoolText: {
    fontSize: hp(1.8),
    fontWeight: 'bold',
    color: 'grey',
    marginLeft: '30@ms',
  },
  boldtext: {
    fontWeight: 'bold',
    fontSize: hp(1.8),
    color: 'black',
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '70@ms',
  },
  borderstyle: {
    borderBottomColor: '#DCDCDC',
    borderBottomWidth: 1,
    marginTop: '14@ms',
    marginBottom: '14@ms',
    width: '95%',
    alignSelf: 'center',
  },
  personalinfocontent: {
    fontSize: '13@ms',
    fontWeight: 'bold',
    color: 'grey',
    marginBottom: '4@ms',
  },
  picContainer: {
    width: '90%',
    alignSelf: 'center',
    paddingLeft: '10@ms',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingRight: '10@ms',
  },
  image: {
    width: '155@ms',
    height: '155@ms',
    margin: '8@ms',
    borderRadius: '20@ms',
  },
  boldText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  editicon: {
    resizeMode: 'stretch',
    marginLeft: 8,
    width: 20,
    height: 20,
  },
  postbtn: {
    borderWidth: 1,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: 'rgb(70,50,103)',
    paddingVertical: 5,
  },
  profilepic: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  tabrowContainer: {
    flexDirection: 'row',

    width: 300,

    justifyContent: 'center',

    alignSelf: 'center',
    marginTop: 10,
  },
  changebtn: {
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
  },
  view_Row: {
    flexDirection: 'row',
  },

  view_Tv_1: {
    marginTop: 4,
    fontSize: hp(2),
    // marginLeft: 15,
    color: 'black',
  },
  view_Tv_2: {
    marginTop: 4,
    fontSize: hp(2),
    marginLeft: 5,
    color: '#565656',
    flex: 1,
    flexWrap: 'wrap',
  },
  Personal_Tv: {
    // marginTop: 10,
    fontSize: hp(2.2),

    color: 'black',
  },

  schoolcontainer: {
    flexDirection: 'row',
    marginTop: '10@ms',
    // justifyContent: 'center',
    marginLeft: 10,
  },

  followerscontent: {
    marginTop: '8@ms',
  },

  addresstext: {
    fontSize: '15@ms',
    fontWeight: 'bold',
  },
  overviewtext: {
    fontSize: hp(2),
    fontWeight: 'bold',
  },
  buttoncontainer: {
    flexDirection: 'row',
    marginTop: '35@ms',
  },
  addresscontainer: {
    flexDirection: 'row',
    marginTop: '20@ms',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  paragraphcontainer: {
    marginTop: '20@ms',
    paddingLeft: '20@ms',
    paddingRight: '24@ms',
    // alignItems:'center',
    // justifyContent:'center'
  },
  totalstudentcontainer: {
    padding: '18@ms',
    borderRadius: '20@ms',

    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20@ms',
    marginRight: '20@ms',
    marginLeft: '20@ms',
  },

  numbertext: {
    fontSize: hp(2),
    fontWeight: 'bold',
  },
  image1: {
    width: '100%',
    height: '155@ms',
    //margin: '8@ms',
    //borderRadius: '20@ms',
  },

  cardcontent: {
    width: '90%',
    marginTop: '10@ms',
    borderRadius: '10@ms',
    //padding:'15@ms',
    alignSelf: 'center',
  },

  cardcontent1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#DCDCDC',
    padding: '5@ms',
  },

  cardcontent2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '5@ms',
    padding: '6@ms',
  },
  videocontent: {
    width: '100%',
    height: '120@ms',
  },
  cardcontent3: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: '5@ms',
    padding: '6@ms',
  },
  cardparagrap: {
    color: 'gray',
    marginTop: '5@ms',
    fontSize: hp(1.5),
    // fontWeight:'bold',
    textAlign: 'justify',
    fontWeight: 'bold',
  },
  projecttitletext: {
    color: 'grey',
    fontSize: hp(1.8),
    fontWeight: 'bold',
  },

  icontext: {
    marginRight: '15@ms',
  },
  cardrowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',

    paddingVertical: 10,

    borderRadius: 5,
  },
  rowContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    alignItems: 'center',
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
  btn: {
    color: 'red',
    marginTop: 10,
    fontWeight: 'bold',
  },
  textinputContainer: {
    borderWidth: 0.5,
    marginTop: 10,
  },
  textinput: {
    textAlignVertical: 'top',
    paddingHorizontal: 8,
    fontSize: hp(2),
  },
});
export default styles;
