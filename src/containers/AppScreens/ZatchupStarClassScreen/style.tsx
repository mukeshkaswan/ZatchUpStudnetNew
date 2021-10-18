import { ScaledSheet } from 'react-native-size-matters';
import { Text, View, FlatList, Image, TouchableOpacity, Platform, ImageBackground, ScrollView, Alert, BackHandler } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const styles = ScaledSheet.create({
container: {
     flex:1,
       backgroundColor:'#ecf0f1',
      },
      inderrowcontainer:{
        width:'100%',backgroundColor:'white',marginTop:18,borderRadius:15,flexDirection:'row',justifyContent:'space-between',alignItems:'center',height:70,paddingLeft:15,elevation:5
      },
      reminderarrowcontainer:{
        backgroundColor:'rgb(70,50,103)s',borderBottomEndRadius:15,borderTopEndRadius:15,height:70,width:30,alignItems:'center',justifyContent:'center'
      }
,
inbox_iconreminder:{
    tintColor:'white',
    marginTop: Platform.OS === 'ios' ? 30 : 10, marginRight: 10
},
flex1: {flex: 1},
      dropdownOffsetStyle: {top: 6, left: 0},
      dropdownContainerStyle: {
        backgroundColor: '#fff',
        borderRadius: 12,
        borderWidth: 0.7,
        borderColor: 'rgba(51,51,51,0.5)',
        justifyContent: 'center',
        width: '100%',
      },
      dropdownInputContainerStyle: {
        borderBottomColor: 'transparent',
        marginLeft: '5%',
        marginTop:4
      },
      dropdownItemTextStyle: {fontSize: 10},

      textInputWrapper: {marginBottom: '5%', flex: 1},
      DobWrapper: {
        marginBottom: '5%',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      dropdownWrapper: {flex: 1, marginRight: '2%'},
      dropdowncontainer:{
        backgroundColor:'white',width:'100%',height:hp('18'),borderRadius:15,padding:16,elevation:4
      },
      coursecontainer:{
        marginHorizontal:16,
        backgroundColor:'white',height:hp('10'),borderRadius:15,padding:16,justifyContent:'space-between',flexDirection:'row',alignItems:'center',marginVertical:10,elevation:4
      },
      coursetext:{
        fontSize:14,color:'grey',marginTop:2
      },
      requestbutton:{
        backgroundColor:'rgb(70,50,103)',justifyContent:'center',width:wp('38'),alignItems:'center',height:hp('5')
      }
      ,
      requesttext:{
        color:'white',fontSize:16
      },
      coursetext1:{
        fontSize:16
      },
      zatchupstarclassbtn:{
          height:hp('8'),
          backgroundColor:'orange',
          marginTop:30,
          borderRadius:15,
          justifyContent:'center',
          alignItems:'center',
          marginHorizontal:16,
          elevation:4
          ,marginBottom:8
           
      },
      zatchupstarclasstext:{
          color:'white',
          fontSize:20
      }
})
export default styles;