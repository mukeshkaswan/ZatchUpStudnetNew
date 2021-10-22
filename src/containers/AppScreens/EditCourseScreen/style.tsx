import { ScaledSheet } from 'react-native-size-matters';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const styles = ScaledSheet.create({
container: {
     flex:1,
       
      },
       
      t_2:{
        textAlign:'center',fontWeight:'bold',fontSize:hp('2.1')
      }
      
})
export default styles;