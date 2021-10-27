import { ScaledSheet } from 'react-native-size-matters';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const styles = ScaledSheet.create({
 container:{
flex:1,},
textinputcontainer:{
    borderWidth:1,height:hp('5'),borderColor:'lightgrey',width:270,borderRadius:10,flexDirection:'row',justifyContent:'space-between',alignItems:'center'
  },
  snotext:{
    flex:0.5,marginHorizontal:2,textAlign:'center'
  }
 ,
 lecturetitletext:{
  flex:1,marginHorizontal:2,textAlign:'center'
 },
 titletext:{
  fontSize:18,fontWeight:'bold'
 },
  
topictext:{
  flex:1.5,marginHorizontal:2,textAlign:'center'
},
eyeimage:{
  height:18,width:18,resizeMode:'contain',tintColor:'blue'
},
coursestextcontainer:{
  flexDirection:'row',justifyContent:'space-between',paddingHorizontal:5,marginHorizontal:10,paddingVertical:10,
}  ,
image:{
  height:18,width:18,resizeMode:'contain',tintColor:'blue'
},
applybtn:{
  height:hp('5'),width:wp('20'),backgroundColor:'rgb(70,50,103)',alignItems:'center',justifyContent:'center',borderTopEndRadius:5,borderBottomEndRadius:5
},
playbtn:{
  height:hp('5'),width:wp('24'),backgroundColor:'black',alignItems:'center',justifyContent:'center',marginLeft:5,borderRadius:5
},
rowinputcontainer:{
  flexDirection:'row',alignItems:'center',padding:10,alignSelf:'center'
}
})
export default styles;