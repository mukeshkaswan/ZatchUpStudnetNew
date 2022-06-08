import { Dimensions } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const screenWidth = Dimensions.get('window').width;
import { Colors } from '../../../components/index';
const screenHeight = Math.round(Dimensions.get('window').height);
const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F1F1F1',

    },
    Cardview: {
        backgroundColor: '#FFFFFF',
        marginBottom: 10,
        paddingHorizontal: 10,
        justifyContent: 'center',
        paddingVertical: 10,
        width:'90%',
        marginLeft:20
    },
    CardviewChild: {
        backgroundColor: '#FFFFFF',
    },
    Title_tv_: {
        fontSize: 15, padding: 10, width: '80%',
    },
    Title_view: {
        // position: 'absolute',
        right: 0,
        //top: 0,

        alignItems: 'flex-end',
        marginRight: 10,

    },

    Title_view_child: {
        fontSize: 16, color: '#A5A5A5'

    },



    Title_Tv: {
        marginLeft: 10, marginTop: 15, fontSize: 18
    },
    Title_Sub: {
        marginLeft: 20, marginTop: 2, fontSize: 12, color: '#A2A2A2'
    },



});
export default styles;