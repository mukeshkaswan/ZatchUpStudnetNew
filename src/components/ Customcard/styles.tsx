import {ScaledSheet} from 'react-native-size-matters';
const styles = ScaledSheet.create({
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
    marginTop: '5@ms',
    marginLeft: '20@ms',
    fontSize: '15@ms',
    color: 'black',
  },
  profilepic: {
    width: '35@ms',
    height: '35@ms',
    borderRadius: '20@ms',
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
    fontSize: '11@ms',
    // fontWeight:'bold',
    textAlign: 'justify',
    fontWeight: 'bold',
  },
  projecttitletext: {
    color: 'grey',
    fontSize: '13@ms',
    fontWeight: 'bold',
  },

  //small card
  smallcardcontent: {
    width: '100@ms',
    height: '135@ms',
    borderRadius: '20@ms',
    alignItems: 'center',
    margin: '5@ms',
    justifyContent: 'center',
  },
  smallcardimage: {
    width: '100@ms',
    height: '65@ms',
    borderTopRightRadius: '20@ms',

    borderTopLeftRadius: '20@ms',
  },
  addbuddybutton: {
    height: '25@ms',
    backgroundColor: '#4E387E',
    justifyContent: 'center',
    alignItems: 'center',
    width: '60@ms',
    borderRadius: '5@ms',
    marginTop: '10@ms',
    marginLeft: '20@ms',
  },
  icontext: {
    marginRight: '15@ms',
  },
});
export default styles;
