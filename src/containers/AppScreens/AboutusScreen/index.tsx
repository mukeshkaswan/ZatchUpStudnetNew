import React, { Component,FC,useState } from 'react';
import {  View,FlatList,Image,TouchableOpacity,ImageBackground ,ScrollView,Switch,Platform} from 'react-native';
import { TextField, CustomButton, CustomStatusBar, Validate, CustomHeader, BackBtn,HeaderTitleWithBack } from '../../../components';
import { RadioButton, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import styles from './style.tsx';  
interface ResetPasswordScreenProps {
  navigation: any;
}

const AboutusScreen= (props: ResetPasswordScreenProps) => {
      const [value, setValue] = React.useState('first');
      const [isEnabled, setIsEnabled] = useState(false);
      const toggleSwitch = () => setIsEnabled(previousState => !previousState);
      const backPressed = () => {
        props.navigation.goBack(null);
        return true;
      }
    
 return (
     <View style={styles.container}> 
      
      
      <HeaderTitleWithBack
           navigation={props.navigation}
          headerTitle="About Us"
        />
        

<Text>About Us</Text>
          
</View>
   
 
     );
}
export default AboutusScreen;