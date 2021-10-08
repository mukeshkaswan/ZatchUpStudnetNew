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

    logoContainer: {
        alignItems: 'center',
        marginTop: '10%',
    },

    imagess: {
        resizeMode: "cover",
        justifyContent: "center",
        width: '100%',
        height: '100%'
    },


    
});

export default styles;