import { ScaledSheet } from 'react-native-size-matters';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const styles = ScaledSheet.create({
 container:{
flex:1,marginBottom:20},
 
 textcontainer:{
  flexDirection:'row',marginTop:10,marginLeft:5},
 coursetext:{
  fontWeight:'bold', flex:1
 },
 coursetext1:{
  flex:1.5,  
   
 },
 
 
 
 coursetext_:{
   flex:1.5,
   marginBottom:30  
    
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
    flexDirection:'row',justifyContent:'space-between',paddingHorizontal:5,paddingVertical:10,flex:1,
    marginHorizontal:10,elevation:2
 }
})
export default styles;