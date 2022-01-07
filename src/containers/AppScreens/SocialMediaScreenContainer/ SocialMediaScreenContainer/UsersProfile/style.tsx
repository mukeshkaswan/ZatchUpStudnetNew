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

  profilepic: {
    resizeMode: 'cover',
    borderWidth: 2,
    borderColor: 'white',
    width: '80@ms',
    height: '80@ms',
    borderRadius: '50@ms',
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
    height: 30,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: 'rgb(70,50,103)',
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
});
export default styles;
