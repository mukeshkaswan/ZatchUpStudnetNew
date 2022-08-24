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
    fontSize: hp(2.4),
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

  // ddsg

  detail_text: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
  },
  text_container: {
    flexDirection: 'row',
    marginLeft: 18,
  },
  border: {
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
  },

  title_text: {
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 10,
    color: 'rgb(70,50,103)',
  },
  
  // image: {width: 20, height: 20, marginStart: 8},

  rowcontainer: {
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
  },
  card_: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginTop: 20,
    paddingBottom: 18,
    paddingTop: 8,
  },
  view_Tv_1: {
    marginTop: 5,
    // fontSize: 18,
    fontSize: hp(2),
    marginLeft: 15,
    color: 'black',
  },
  view_Tv_2: {
    marginTop: 5,
    fontSize: hp(2),
    marginLeft: 5,
    color: '#565656',
    flex: 1,
    flexWrap: 'wrap',
  },
  view_Tv_current: {
    marginTop: 5,
    fontSize: hp(2),
    color: '#565656',
  },
  view_Row: {
    flexDirection: 'row',
  },
});
export default styles;