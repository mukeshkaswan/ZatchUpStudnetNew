import { Dimensions } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const screenWidth = Dimensions.get('window').width;
import {Colors } from '../../../components/index';
 const screenHeight = Math.round(Dimensions.get('window').height);
const styles = ScaledSheet.create({
    container: {
        flex: 1,
         backgroundColor: '#F1F1F1',

    },
    Cardview: {
        backgroundColor: '#FFFFFF',

    },
    CardviewChild: {
        backgroundColor: '#FFFFFF',
        marginTop: 5
    },
    Title_tv_: {
        marginTop: 10, fontSize: 18, marginLeft: 10, padding: 20, marginBottom: 10
    },
    Title_view: {
        position: 'absolute',
        right: 0,
        //top: 0,
        bottom: 10,

        marginRight: 20,
    },

    Title_view_child: {
        fontSize: 16, color: '#A5A5A5'

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
        tintColor: '#4B2A6A', marginLeft: 5,
    },
    tv_Des: {
        marginLeft: 25, marginTop: 20, fontSize: 16
    },

    
});
export default styles;