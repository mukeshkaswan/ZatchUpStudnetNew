import { Dimensions, Platform } from 'react-native';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const colors = {
  backgroundColorHeader:'rgb(70,50,103)',
  headerTintColor:'#fff',
    headerTitleAlign: 'center',
    $white: '#FFFFFF',
    $gray: 'gray',
    $appRed: '#E2211C',
    $appGreen: '#68bcbc',
    $inputBoxLightColor: '#666666',
    $dividerColor: '#BBBBBB',
    $subHeaderNameBackground: '#DDDDDD',
    $subHeaderBalanceBackground: '#DDDDDD',
    $subHeaderPlaysBackground: '#CCCCCC',
    $backgroundColorHeader: 'rgb(70,50,103)',
    $dotColor: '#999999',
    $popupBackgroundColor: '#66666633',
    $activityIndicatorColor: 'black',
    $screenWidth: screenWidth,
    $screenHeight: screenHeight,
    $backgroundColor: '#F1F1F1',
    $BtnBackgroundColor: 'rgb(70,50,103)',
};

export default colors;
