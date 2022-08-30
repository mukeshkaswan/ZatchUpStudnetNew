import { Platform, Dimensions } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const screenWidth = Dimensions.get('window').width;
import { Images, Colors, TextField, Font, CustomButton } from '../../../components';
const screenHeight = Math.round(Dimensions.get('window').height);
const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.$backgroundColor,
    },
    inputContainer: {
        padding: '2%',
        flex: 1,
        // marginTop: '2%'


    },

    Cardview: {
        backgroundColor: '#FFFFFF',
        marginLeft: 5,
        marginRight: 5,
        marginTop: 0,


    },

    editicon: {
        height: 25,
        width: 25,
        // resizeMode: 'contain',
        // marginTop: '20%',
        // alignContent:'flex-end',
        // alignItems:'flex-end',
        //alignSelf:'flex-end',
        //  marginLeft: 10,
        right: 0,
        marginRight: 45,
        position: 'absolute',
    },
    editiconCopy: {
        height: 28,
        width: 28,
        // resizeMode: 'contain',
        // marginTop: '20%',
        // alignContent:'flex-end',
        // alignItems:'flex-end',
        //alignSelf:'flex-end',
        marginLeft: '15%',
        //left: 15,
        // marginRight: 10,
        // position: 'absolute',
    },
    CardviewChild: {
        width: '95%',
        height: '65%',
        marginLeft: 5,
        marginTop: 20

    },
    Personal_Tv: {
        marginTop: 10, fontSize: 19, marginLeft: 15, color: '#4B2A6A'
    },
    view: {
        flexDirection: 'column'
    },
    view_Row: {
        flexDirection: 'row',
    },
    view_Tv_1: {
        marginTop: 5, fontSize: 18, marginLeft: 20, color: '#565656'
    },
    view_Tv_2: {
        marginTop: 5, fontSize: 18, marginLeft: 5, color: '#565656'
    },
    Schoolname: {
        marginTop: 5, fontSize: 18, marginLeft: 5, color: '#565656',width:'50%'
    },
    view_Tv_3: {
        marginTop: 5, fontSize: 18, marginLeft: 20, color: '#565656', marginBottom: 20,width: '60%',
    },
    view_Row_: {
        flexDirection: 'row', marginTop: 5,
    },
    view_Row_Child: {
        flexDirection: 'row', marginTop: 5, marginBottom: 20
    },



    view_1: {
        flexDirection: 'row', marginLeft: 20, marginTop: 10
    },
    imageTitle: {
        width: 100, height: 90, borderRadius: 60 / 2
    },
    Title_Tv: {
        marginLeft: 10, marginTop: 15, fontSize: 18
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
        backgroundColor: '#FFFFFF',
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
        tintColor: '#4B2A6A', marginLeft: 5,
    },
    tv_Des: {
        marginLeft: 25, marginTop: 20, fontSize: 16
    },
    checkbox: {
        width: Dimensions.get('window').width * 0.080,
        height: Dimensions.get('window').width * 0.080,
        resizeMode: 'contain',
        marginLeft: 10, marginTop: 1
    },
    fillText_Add: {
        textAlign: 'center',
        fontFamily: 'Lato-Medium',
        fontSize: hp(2.3),
        color: '#453166'
    },




});

export default styles;