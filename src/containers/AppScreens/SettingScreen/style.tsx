import { Dimensions } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const screenWidth = Dimensions.get('window').width;
import {Colors } from '../../../components/index';
 const screenHeight = Math.round(Dimensions.get('window').height);
 const styles = ScaledSheet.create({
    container:{
   flex:1,
   
    },
       detail_text: {
           fontSize: 15,
           color: 'black',
           fontWeight: 'bold',
         },
         text_container: {
           flexDirection: 'row',
           marginLeft: 18,
         },
         border: {
           borderBottomWidth: 1,
           borderColor: 'lightgrey',
           width: '90%',
           alignSelf: 'center',
           marginTop: 10,
         },
         border1: {
            borderBottomWidth: 1,
            borderColor: 'lightgrey',
            width: '100%',
            alignSelf: 'center',
            marginTop: 10,
          },
         title_text: {
           
           fontSize: 18,
           fontWeight: 'bold',
           marginLeft: 10,
           color:'rgb(70,50,103)'
         },
         image: {width: 20, height: 20, marginStart: 8},
         addicon:{
           height:25,
           width:25,
           borderRadius:15,
           marginRight:10
         },
         addcitycontainer:{
           flexDirection:'row',justifyContent:'space-between',alignItems:'center'
         },
         card:{
           backgroundColor: 'white',
           marginHorizontal:20,
            marginTop: 20,
            paddingBottom: 18,
            paddingTop:8,
           paddingHorizontal:8
         },
         privacyrowcontainer:{
            flexDirection:'row',marginHorizontal:8,marginTop:20,marginBottom:20,justifyContent:'space-between'
         }
         
   })
   export default styles;