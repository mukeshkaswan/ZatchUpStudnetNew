import { ScaledSheet } from 'react-native-size-matters';
const styles = ScaledSheet.create({
container: {
     flex:1,
       backgroundColor:'#ecf0f1',
      },
      radiobuttoncontainer:{
        paddingLeft:'40@ms',
        marginTop:'25@ms',
        paddingBottom:'30@ms'

      },
      radiocontent:{
        flexDirection:'row',
        alignItems:'center'

      },
      radiotext:{
        fontSize:'15@ms'
      },
      lastseentextcontent:{
        paddingLeft:'40@ms',
        marginTop:'25@ms',
      },
      lastseentext:{
        fontSize:'17@ms',
        fontWeight:'bold'
      },
      readrecipienttextcontent:{
        paddingRight:'15@ms',
        backgroundColor:'white',
        marginTop:'10@ms',
        height:'70@ms',
        paddingLeft:'55@ms',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'

      },
      readrecipienttext:{
        fontWeight:'bold',
        fontSize:'15@ms'
      },
      switchcontent:{
        backgroundColor:'#3CB371',
        borderRadius:'15@ms'
      },
      savebuttoncontent:{
         marginTop:40
      }
      
})
export default styles;