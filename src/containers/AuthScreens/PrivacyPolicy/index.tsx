import React, { Component,FC,useState } from 'react';
import {  View,FlatList,Image,TouchableOpacity,ImageBackground ,ScrollView,Switch,Platform} from 'react-native';
import {CustomHeader} from '../../../components/Customheader';
import {Custombutton} from '../../../components/Custombutton';
import { RadioButton, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import styles from './styles.tsx';  
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
      <View style={{
          height: Platform.OS === 'ios' ? '10%' : '7%',
          backgroundColor: 'rgb(70,50,103)',
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,

        }}>
          <View style={{ flexDirection: 'row', width: '100%', alignSelf: 'center', }}>


            <TouchableOpacity onPress={backPressed}
              style={{ marginTop: Platform.OS === 'ios' ? 30 : 10, marginLeft: 10 }} >
              <Icon name="arrow-left" size={25} color="white" />
            </TouchableOpacity>



            <View style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",

            }}>
              <Text style={{
                textAlignVertical: "center",
                textAlign: "center",
                color: 'white',
                fontSize: hp(2.8),
                marginRight: 20,
                fontFamily: 'Lato-Regular',
                marginTop: Platform.OS === 'ios' ? 30 : 5,
              }}>{'Privacy Policy'}</Text>
            </View>


          </View>

        </View>



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
                 <Custombutton title="Save"/>
         </View>
</View>
   
 
     );
}
export default PrivacyPolicy;