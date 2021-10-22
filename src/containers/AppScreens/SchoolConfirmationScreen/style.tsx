import { ScaledSheet } from 'react-native-size-matters';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const styles = ScaledSheet.create({
container: {
     flex:1,
       backgroundColor:'#ecf0f1',
      },
      
      addicon:{
        height:25,
        width:25,
        borderRadius:15,
        marginLeft:10
      },
      textbold:{
        fontWeight:'bold'
      },
      T_1:{
        fontSize:hp('2.1'),marginTop:4
      }
})
export default styles;