import {ScaledSheet} from 'react-native-size-matters';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  schoolcontainer: {
    flexDirection: 'row',
    marginTop: '10@ms',
    // justifyContent: 'center',
    marginLeft: 10,
  },
  textcontainer: {
    marginLeft: '10@ms',
    alignItems: 'center',
    justifyContent: 'center',
  },
  schooltext: {
    fontWeight: 'bold',
    fontSize: '16@ms',
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

  profilepic: {
    borderWidth: 2,
    borderColor: 'white',
    width: '80@ms',
    height: '80@ms',
    borderRadius: '50@ms',
  },

  cardContent: {
    width: '90%',
    alignSelf: 'center',
    padding: '10@ms',
    marginTop: '15@ms',
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    marginBottom: -1.5,

    height: 50,

    //borderBottomWidth: '1@ms',
    borderTopEndRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: 'white',
    shadowColor: 'white',
    elevation: 0,
  },
  cardtitletext: {
    fontWeight: 'bold',
    fontSize: hp(2),
    color: '#4E387E',
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

  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: -40,
  },

  likecontainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: '8@ms',
    marginBottom: '10@ms',
    justifyContent: 'space-between',
  },

  cardtitlecontent: {
    justifyContent: 'space-between',
    flexDirection: 'row',
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
    height: 28,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: 'rgb(70,50,103)',
    alignSelf: 'flex-end',
    marginRight: 10,
    marginBottom: 12,
  },
  tabrowContainer: {
    flexDirection: 'row',

    width: 300,

    justifyContent: 'center',

    alignSelf: 'center',
    marginTop: 10,
  },
  changebtn: {
    borderWidth: 0.3,
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
  nametext: {
    fontWeight: 'bold',
    marginTop: '10@ms',
    marginLeft: '20@ms',
    fontSize: hp(2),
    color: 'black',
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
});
export default styles;