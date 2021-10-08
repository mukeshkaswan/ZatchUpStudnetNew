import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, Image, KeyboardAvoidingView, Dimensions, ScrollView, Alert, BackHandler } from 'react-native';
import styles from './style';
import { Images } from '../../../components/index';
import OtpInputs from 'react-native-otp-inputs';
import { TextField, CustomButton, CustomStatusBar, BackBtn, CustomHeader } from '../../../components';
const screenWidth = Dimensions.get('window').width;
import { CheckBox } from 'react-native-elements'
import { Dropdown } from 'react-native-material-dropdown-v2';
interface CoomingSoonScreenProps { navigation: any }
import { RadioButton } from 'react-native-paper';
import { NavigationContainer, useIsFocused, useFocusEffect } from '@react-navigation/native';

const CoomingSoon = (props: CoomingSoonScreenProps) => {
  const [password, setPassword] = useState('');

  const isFocused = useIsFocused();

//   useEffect(() => {
   

//    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
//    return () => {
//      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
//    };
//  }, [isFocused]);




  // function handleBackButtonClick() {
  //   props.navigation.goBack();
  //   return true;
  // }
  return (
    <View style={styles.container}>

      <CustomStatusBar />

      {/* <CustomHeader Title={'School Information'} /> */}



      <View style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        //  backgroundColor: '#979797'
      }}>
        <Text style={{ color: '#7B7B7B', fontSize: 26, fontWeight: 'bold' }}>
          Coming soon
                    </Text>
      </View>

    </View>
  );
};

export default CoomingSoon;
