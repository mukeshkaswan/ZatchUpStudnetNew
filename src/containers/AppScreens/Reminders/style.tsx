import { ScaledSheet } from 'react-native-size-matters';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  reminderrowcontainer: {
    width: '100%', backgroundColor: 'white', marginTop: 18, borderRadius: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: hp('8'), paddingLeft: 15, elevation: 1
  },
  reminderarrowcontainer: {
    backgroundColor: 'rgb(70,50,103)s', borderBottomEndRadius: 15, borderTopEndRadius: 15, height: hp('8'), width: wp('10'), alignItems: 'center', justifyContent: 'center'
  },
  schoolremindertext: {
    fontSize: 18,
    
  },
  time: {
    fontSize: 12
  },
  child_view: {
    flexDirection: 'row',
    backgroundColor: '#4B2A6A',
    height: 60,
  },
  image_menu: {
    marginLeft: 15,
    marginTop: 10,
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
    marginRight: 30,
    fontSize: 28,
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
  tabButtonWrapper: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabButtonStyles: {
    paddingVertical: 15,
    height: 55,
    marginTop: 10,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  tabButtonRightStyle: {
    paddingVertical: 15,
    height: 55,
    marginTop: 10,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  tabButtonTextStyle: {
    fontSize: 18,
    color: '#C9C9C9',
    marginLeft: 40,
    marginRight: 40,
  },
  Cardview: {
    width: '100%',
    height: '50%',
    // marginLeft: 10,
    // marginTop: 10

  },
  CardviewChild: {
    width: '95%',
    height: '65%',
    marginLeft: 5,
    marginTop: 20

  },
  view: {
    flexDirection: 'column'
  },
  view_1: {
    flexDirection: 'row', marginLeft: 20, marginTop: 10
  },
  imageTitle: {
    width: 100, height: 90, borderRadius: 60 / 2
  },
  Title_Tv: {
    marginLeft: 10, marginTop: 15, fontSize: 18
  },
  Title_Sub: {
    marginLeft: 20, marginTop: 2, fontSize: 12, color: '#A2A2A2'
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
    marginLeft: 10, marginTop: 2
  },
  image_Des: {
    width: 80, height: 100, borderRadius: 60 / 2, marginTop: 2,
  },
  view_3: {
    flexDirection: 'column', marginLeft: 10
  },
  view_4: {
    flexDirection: 'row', marginLeft: 5, marginTop: 10, alignItems: 'center',
  },
  like_tv: {
    marginLeft: 2, marginTop: 5, fontSize: 18, color: '#4B2A6A',
  },
  like_image: {
    tintColor: '#4B2A6A', marginLeft: 5,
  },
  tv_Des: {
    marginLeft: 25, marginTop: 20, fontSize: 16
  },
  //  add Message Button Wrapper---------------------------------------__>
  addMsgButtonWrapper: {
    borderWidth: 1,
    borderColor: '#11111120',
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    position: 'absolute',
    bottom: 10,
    right: 10,
    height: 70,
    backgroundColor: '#4B2A6A',
    borderRadius: 35,
    zIndex: 1,
  },
  addMsgImageStyle: { height: '100%', width: '100%' },

  //
  listCardWrapper: {
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  userImageWrapper: {
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  userImageStyle: { width: '90%', height: '90%', borderRadius: 80 / 2 },
  msgCardRightWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 5,
  },
  msgCardHeaderWrapper: { flexDirection: 'row' },
  userNameStyle: {
    fontSize: 18,
    fontWeight: '700',
  },
  timeTextStyle: {
    fontSize: 12,
    fontWeight: '600',
  },




})
export default styles;