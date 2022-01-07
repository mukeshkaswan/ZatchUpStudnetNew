import {ScaledSheet} from 'react-native-size-matters';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Platform,
} from 'react-native';
import {
  TextField,
  CustomButton,
  CustomStatusBar,
  Validate,
  CustomHeader,
  BackBtn,
  HeaderTitleWithBack,
  Colors,
  Customcard,
  CustomCheckBox,
} from '../../../../components';

const styles = ScaledSheet.create({
  container: {
    flex: 1,
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
  checkbox: {
    //  width: Dimensions.get('window').width * 0.1,
    //  height: Dimensions.get('window').width * 0.1,
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },

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
