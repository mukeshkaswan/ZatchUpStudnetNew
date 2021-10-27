import { ScaledSheet } from 'react-native-size-matters';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
 


import { Platform, Dimensions } from 'react-native';
 
const screenWidth = Dimensions.get('window').width;
const screenHeight = Math.round(Dimensions.get('window').height);

export default ScaledSheet.create({
    container: {
        flex: 1,
       // backgroundColor: '$backgroundColor',
        

    },
    tabButtonWrapper: {
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
      },
      tabButtonStyles: {
        paddingVertical: 15,
        height: 55,
        marginTop: 10,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
      },
      tabButtonRightStyle:{
       paddingVertical: 15,
        height: 55,
        marginTop: 10,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
      },
      tabButtonTextStyle: {
        fontSize: 18,
        color:'#C9C9C9',
        marginLeft: 40,
        marginRight: 40,
      },
    Cardview: {
        width: '100%',
        height: '50%',
        // marginLeft: 10,
        // marginTop: 10

    },
    CardviewChild: {
        width: '95%',
        height: '65%',
        marginLeft: 5,
        marginTop: 20

    },
    view: {
        flexDirection: 'column'
    },
    view_1: {
        flexDirection: 'row', marginLeft: 20, marginTop: 10
    },
    imageTitle: {
        width: 100, height: 90, borderRadius: 60 / 2
    },
    Title_Tv: {
        marginLeft: 10, marginTop:15, fontSize: 18
    },
    Title_Sub: {
        marginLeft: 20, marginTop: 2, fontSize: 12, color: '#A2A2A2'
    },
    underview: {
        height: 3,
        width: '90%',
        marginTop: 10,
        marginLeft: 20,
        // marginRight:10,
        backgroundColor: '#FCFCFC',
    },
    view_2: {
        marginLeft: 10, marginTop: 2
    },
    image_Des: {
        width: 80, height: 100, borderRadius: 60 / 2, marginTop: 2,
    },
    view_3: {
        flexDirection: 'column', marginLeft: 10
    },
    view_4: {
        flexDirection: 'row', marginLeft: 5, marginTop: 10, alignItems: 'center',
    },
    like_tv: {
        marginLeft: 2, marginTop: 5, fontSize: 18, color: '#4B2A6A',
    },
    like_image: {
        tintColor: '#4B2A6A', marginLeft: 5,     },
    tv_Des: {
        marginLeft: 25, marginTop: 20, fontSize: 16
    },
    //  add Message Button Wrapper---------------------------------------__>
    addMsgButtonWrapper: {
        borderWidth: 1,
        borderColor: '#11111120',
        alignItems: 'center',
        justifyContent: 'center',
        width: 70,
        position: 'absolute',
        bottom: 30,
        right: 10,
        height: 70,
        backgroundColor: '#4B2A6A',
        borderRadius: 35,
        zIndex: 1,
      },
      addMsgImageStyle: {height: '100%', width: '100%'},

      //
      listCardWrapper: {
        flexDirection: 'row',
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 10,
      },
      userImageWrapper: {
        width: 80,
        height: 80,
        borderRadius: 80 / 2,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
      },
      userImageStyle: {width: '90%', height: '90%', borderRadius: 80 / 2},
      msgCardRightWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 5,
      },
      msgCardHeaderWrapper: {flexDirection: 'row'},
      userNameStyle: {
        fontSize: 18,
        fontWeight: '700',
      },
      timeTextStyle: {
        fontSize: 12,
        fontWeight: '600',
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
           backgroundColor:'white',width:'100%',height:hp('18'),borderRadius:15,padding:16,elevation:8
         },
         coursecontainer:{
           backgroundColor:'white',width:'100%',height:hp('10'),borderRadius:15,padding:16,justifyContent:'space-between',flexDirection:'row',alignItems:'center'
         },
         coursetext:{
           fontSize:14,color:'grey',marginTop:2
         },
         requestbutton:{
           backgroundColor:'rgb(70,50,103)',justifyContent:'center',width:wp('38'),alignItems:'center',height:hp('5'),elevation:5
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
             width:'100%',
             backgroundColor:'orange',
             marginTop:30,
             borderRadius:15,
             justifyContent:'center',
             alignItems:'center',
             elevation:4
         },
         zatchupstarclasstext:{
             color:'white',
             fontSize:20
         }
});