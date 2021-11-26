import { Platform, Dimensions } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const screenWidth = Dimensions.get('window').width;
import {
  Images,
  Colors,
  TextField,
  Font,
  CustomButton,
} from '../../../components';
const screenHeight = Math.round(Dimensions.get('window').height);
const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  containers: {},

  overlay: {
    // backgroundColor:'rgba(255,0,0,0.5)',
  },
  avatarStyle: {
    width: 100,
    height: 100,
    marginTop: 20,
    borderRadius: 50,
    alignSelf: 'center',
    //backgroundColor: 'red',
  },
  textStyle: {
    marginTop: 5,
    fontSize: 18,
    color: '#565656',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  textStyle_: {
    marginTop: 5,
    fontSize: 18,
    color: '#565656',
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 5,
  },
  balanceContainer: {
    padding: 5,
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ZatchUp_tv: {
    color: '#FFFFFF',
    marginRight: 2,
    fontSize: 30,
    fontWeight: 'bold',
    bottom: 5,
  },
  TM_tv: {
    color: '#FFFFFF',
    marginRight: 20,
    fontSize: 10,
    bottom: 10,
  },
  Notification_view: {
    position: 'absolute',
    right: 60,
    alignSelf: 'flex-end',
    top: 1,
  },
  inbox_icon: {
    marginRight: 5,
    marginTop: 12,
    tintColor: '#FFFFFF',
    height: 28,
    width: 28,
  },
  inbox_iconreminder: {
    marginRight: 5,
    marginTop: 11,
    tintColor: '#FFFFFF',
    height: 30,
    width: 30,
  },
  inbox_icon_1: {
    position: 'absolute',
    right: 30,
    alignSelf: 'flex-end',
    top: 1,
  },
  Notification_Count_View: {
    position: 'absolute',
    right: 32,
    alignSelf: 'flex-end',
    borderRadius: 15,
    backgroundColor: 'red',
    width: Platform.OS == 'ios' ? 20 : 18,
    height: Platform.OS == 'ios' ? 20 : 18,
    bottom: 35,
  },
  Count_Tv: {
    color: '#FFFFFF',
    fontSize: 12,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: Platform.OS == 'ios' ? 2 : 0,
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

  Cardview: {
    backgroundColor: '#FFFFFF',
    marginLeft: 15,
    marginRight: 15,
    marginTop: 30,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    //  backgroundColor: 'white',
    //  padding: 20,
    borderRadius: 5,
  },
  title_text: {

    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    color: 'rgb(70,50,103)'
  },
  addicon: {
    height: 25,
    width: 25,
    borderRadius: 15,
    marginRight: 10
  },
  addcitycontainer: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
  },
  card: {
    backgroundColor: 'white',
    marginHorizontal: 15,
    marginTop: 20,
    paddingBottom: 18,
    paddingTop: 8,
    paddingHorizontal: 8,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
  },
    Cardviewcopy1: {
      backgroundColor: '#FFFFFF',
      marginLeft: 15,
      marginRight: 15,
      marginTop: 30,
      marginBottom: 10,
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 6,
      shadowOpacity: 0.26,
      elevation: 8,
      //  backgroundColor: 'white',
      //  padding: 20,
      borderRadius: 5,
    },
    CardviewChild: {
      width: '95%',
      height: '65%',
      marginLeft: 5,
      marginTop: 20,
    },
    Personal_Tv: {
      marginTop: 10,
      fontSize: 19,
      marginLeft: 15,
      color: '#4B2A6A',
    },
    Personal_Tvheader: {
      marginTop: 15,
      marginBottom: 15,
      fontSize: 19,
      marginLeft: 15,
      color: '#FFFFFF',
    },
    view: {
      flexDirection: 'column',
    },
    editicon: {
      height: 30,
      width: 30,
      marginLeft: 20,

      // right: 0,
      // marginRight: 10,
      //   position: 'absolute',
    },
    editicon2: {
      height: 25,
      width: 24,
      //marginLeft: 10,
      marginTop: 5,

      left: 5,
      // marginRight: 10,
      //   position: 'absolute',
    },
    editicon1: {
      height: 30,
      width: 30,
      marginLeft: 20,
      marginTop: 7,

      // right: 0,
      // marginRight: 10,
      //   position: 'absolute',
    },
    view_Row: {
      flexDirection: 'row',
    },
    view_Rowbg: {
      flexDirection: 'row',
      backgroundColor: '#501D6B',
    },
    view_Tv_1: {
      marginTop: 5,
      fontSize: 18,
      marginLeft: 15,
    },
    view_Tv_2: {
      marginTop: 5,
      fontSize: 18,
      marginLeft: 5,
      color: '#565656',
      flex: 1,
      flexWrap: 'wrap',
    },
    view_Tv_3: {
      marginTop: 5,
      fontSize: 18,
      marginLeft: 20,
      color: '#565656',
      marginBottom: 20,
    },
    view_Row_: {
      flexDirection: 'row',
      marginTop: 5,
    },
    view_Row_Child: {
      flexDirection: 'row',
      marginTop: 5,
      marginBottom: 20,
    },

    view_1: {
      flexDirection: 'row',
      marginLeft: 20,
      marginTop: 10,
    },
    imageTitle: {
      width: 100,
      height: 90,
      borderRadius: 60 / 2,
    },
    Title_Tv: {
      marginLeft: 10,
      marginTop: 15,
      fontSize: 18,
    },
    Title_Sub: {
      marginLeft: 20,
      marginTop: 2,
      fontSize: 12,
      color: '#A2A2A2',
    },
    underview: {
      height: 3,
      width: '90%',
      marginTop: 10,
      marginLeft: 20,
      // marginRight:10,
      backgroundColor: '#FCFCFC',
    },
    view_2: {
      marginLeft: 10,
      marginTop: 2,
    },
    image_Des: {
      width: 80,
      height: 100,
      borderRadius: 60 / 2,
      marginTop: 2,
    },
    view_3: {
      flexDirection: 'column',
      marginLeft: 10,
    },
    view_4: {
      flexDirection: 'row',
      marginLeft: 5,
      marginTop: 10,
      alignItems: 'center',
    },
    like_tv: {
      marginLeft: 2,
      marginTop: 5,
      fontSize: 18,
      color: '#4B2A6A',
    },
    like_image: {
      tintColor: '#4B2A6A',
      marginLeft: 5,
    },
    tv_Des: {
      marginLeft: 25,
      marginTop: 20,
      fontSize: 16,
    }

  })

export default styles;
