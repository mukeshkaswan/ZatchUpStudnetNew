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

const PrivacyPolicy= (props: ResetPasswordScreenProps) => {
      const [value, setValue] = React.useState('first');
      const [isEnabled, setIsEnabled] = useState(false);
      const toggleSwitch = () => setIsEnabled(previousState => !previousState);
      const backPressed = () => {
        props.navigation.goBack(null);
        return true;
      }
    
 return (
     <View style={styles.container}> 
      <View style={{backgroundColor:'white'}}> 
      
      <HeaderTitleWithBack
           navigation={props.navigation}
          headerTitle="Privacy Policy"
        />


          <View style={styles.lastseentextcontent}>
            <Text style={styles.lastseentext}>Last Seen will be visible to</Text>
          </View>
          <View style={styles.radiobuttoncontainer}>
              <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
                <View style={styles.radiocontent}>
                    <RadioButton value="first" color="#4E387E" />
                    <Text style={styles.radiotext}>Everyone</Text>
                </View>
                <View style={styles.radiocontent}>
                    <RadioButton value="second"  color="#4E387E"/>
                    <Text  style={styles.radiotext}>My Buddies</Text>
                </View>
                <View style={styles.radiocontent}>
                     <RadioButton value="third" color="#4E387E"/>
                     <Text  style={styles.radiotext}>Nobody</Text>
                </View>
              </RadioButton.Group>
            </View>
         </View>
          <View style={styles.readrecipienttextcontent}>
                <Text style={styles.readrecipienttext}>Read Recipient</Text>
                <View style={styles.switchcontent}> 
                 <Switch
                  trackColor={{ false: "#3CB371", true: "#3CB371"}}
                  thumbColor={isEnabled ? "white" : "grey"}
                  ios_backgroundColor="#3e3e3e"
                   onValueChange={toggleSwitch}
                    value={isEnabled}
                   />
          </View>
         </View>
         <View style={styles.savebuttoncontent}> 
                 {/* <Custombutton title="Save"/> */}
         </View>
</View>
   
 
     );
}
export default PrivacyPolicy;