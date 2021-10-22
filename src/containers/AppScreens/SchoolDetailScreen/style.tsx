import { ScaledSheet } from 'react-native-size-matters';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
 


import { Platform, Dimensions } from 'react-native';
 
const screenWidth = Dimensions.get('window').width;
const screenHeight = Math.round(Dimensions.get('window').height);

export default ScaledSheet.create({
    container: {
        flex: 1,
       // backgroundColor: '$backgroundColor',
        paddingBottom:10

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
      tabButtonRightStyle:{
       paddingVertical: 15,
        height: 55,
        marginTop: 10,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
      },
      tabButtonTextStyle: {
        fontSize: 18,
        color:'#C9C9C9',
        marginLeft: 40,
        marginRight: 40,
      },
    
   fillText_Add: {
       
            fontFamily: 'Lato-Medium',
            fontSize: hp(2.1),
            marginBottom:5,
            paddingLeft:10
        },
        t_1:{
          textAlign:'center',fontWeight:'bold',fontSize:hp('2.2')
        },
        t_2:{
          textAlign:'center',fontWeight:'bold',fontSize:hp('2.1')
        }
});