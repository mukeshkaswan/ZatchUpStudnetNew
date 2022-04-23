import { Platform, Dimensions } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const screenWidth = Dimensions.get('window').width;
import { Images, Colors, TextField, Font, CustomButton } from '../../../components';
const screenHeight = Math.round(Dimensions.get('window').height);
const styles = ScaledSheet.create({
    container: {
        flex: 1,


    },




    balanceContainer: {
        padding: 5,
    },
    child_view: {
        flexDirection: 'row', backgroundColor: '#4B2A6A', height: 60,


    },
    image_menu: {
        marginLeft: 15, marginTop: 10, tintColor: '#FFFFFF'

    },
    tv_view: {
        flex: 1, flexDirection: 'row', justifyContent: "center", alignItems: "center",marginRight: 15,

    },

    ZatchUp_tv: {
        color: '#FFFFFF',
        // marginRight: 10,
        fontSize: 28,
        fontWeight: 'bold',
        bottom: 5,
    },
    TM_tv: {
        color: '#4B2A6A', marginRight: 20, fontSize: 10, bottom: 10

    },
    Notification_view: {
        position: 'absolute', right: 60, alignSelf: 'flex-end', top: 1

    },
    inbox_icon: {
        marginRight: 5, marginTop: 12, tintColor: '#FFFFFF', height: 28, width: 28
    },
    inbox_iconreminder: {
        marginRight: 5, marginTop: 11, tintColor: '#FFFFFF', height: 30, width: 30
    },
    inbox_icon_1: {
        position: 'absolute', right: 30, alignSelf: 'flex-end', top: 1
    },
    Notification_Count_View: {
        position: 'absolute', right: 32, alignSelf: 'flex-end', borderRadius: 15, backgroundColor: 'red', width: Platform.OS == 'ios' ? 20 : 18, height: Platform.OS == 'ios' ? 20 : 18, bottom: 35
    },
    Count_Tv: {
        color: '#FFFFFF', fontSize: 12, textAlign: 'center', fontWeight: 'bold', marginTop: Platform.OS == 'ios' ? 2 : 0
    },
    dot_view: {
        position: 'absolute', right: 10, alignSelf: 'flex-end', top: 0
    },

    dot_image: {
        marginRight: 0, marginTop: 15, tintColor: '#FFFFFF', height: 26, width: 26, right: 10,
    },



    boxcontainer: {
        backgroundColor: 'white', height: 220, width: 170, borderRadius: 15, margin: 10, justifyContent: 'center', alignItems: 'center'
    },
    mainBoxesContainer: {
        paddingHorizontal: 15, marginTop: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'
    },
    boximage: {
        width: 70, height: 70, borderRadius: 60 / 2
    },
    text: {
        textAlign: 'center', fontSize: 15, fontWeight: 'bold'
    }


});

export default styles;