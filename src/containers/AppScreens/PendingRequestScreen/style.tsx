import { ScaledSheet } from 'react-native-size-matters';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const styles = ScaledSheet.create({
 container:{
flex:1,},
boxcontainer:{
  marginTop:15,paddingHorizontal:16
},
pendingtext:{
  fontWeight:'bold',fontSize:18
},
mainbordercontainer:{
  backgroundColor:'white',height:hp('12'),marginTop:10,justifyContent:'center',paddingHorizontal:10
},
bordercontainer:{
  height:hp('8'),borderWidth:1,justifyContent:'center',alignItems:'center',borderColor:'lightgrey'
}

  
      
})
export default styles;