import { ScaledSheet } from 'react-native-size-matters';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const styles = ScaledSheet.create({
container: {
     flex:1,
       backgroundColor:'#ecf0f1',
      },
      fillText_Add: {
       
        fontFamily: 'Lato-Medium',
        fontSize: hp(2.1),
        
        paddingLeft:14
    },
})
export default styles;