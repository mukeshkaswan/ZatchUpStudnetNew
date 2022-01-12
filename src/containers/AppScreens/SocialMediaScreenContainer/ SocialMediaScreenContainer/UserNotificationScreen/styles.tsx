import {Dimensions} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Math.round(Dimensions.get('window').height);
const styles = ScaledSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    paddingBottom: 10,
  },
  profileImg: {width: 50, height: 50, borderRadius: 25},
  childContainer: {
    marginStart: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  name: {fontWeight: '700', fontSize: 16},
  item: {
    // backgroundColor: '#f9c2ff',
    // padding: 20,
    marginHorizontal: 16,
    marginVertical: 8,
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  header: {
    fontSize: 18,
    fontWeight: '700',
    // backgroundColor: '#fff',
    marginHorizontal: 16,
  },
  title: {
    fontSize: 16,
  },
});

export default styles;
