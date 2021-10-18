import { ScaledSheet } from 'react-native-size-matters';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const styles = ScaledSheet.create({
container: {
     flex:1,
       backgroundColor:'#ecf0f1',
      },
     reminderrowcontainer:{
        width:'100%',backgroundColor:'white',marginTop:18,borderRadius:15,flexDirection:'row',justifyContent:'space-between',alignItems:'center',height:hp('8'),paddingLeft:15,elevation:1
      },
      reminderarrowcontainer:{
        backgroundColor:'rgb(70,50,103)s',borderBottomEndRadius:15,borderTopEndRadius:15,height:hp('8'),width:wp('10'),alignItems:'center',justifyContent:'center'
      },
      schoolremindertext:{
        fontSize:18
      }
      
      
})
export default styles;