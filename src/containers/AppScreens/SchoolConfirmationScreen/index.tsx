import React, { Component,FC,useState } from 'react';
import {  View,FlatList,Image,TouchableOpacity,ImageBackground ,ScrollView,Switch,Platform} from 'react-native';
import { TextField, CustomButton, CustomStatusBar, Validate, CustomHeader, BackBtn,HeaderTitleWithBack,Images} from '../../../components';
import { RadioButton, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import styles from './style.tsx';  
interface ResetPasswordScreenProps {
  navigation: any;
}

const SchoolConfirmationScreen= (props: ResetPasswordScreenProps) => {
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
          headerTitle="School Confirmation"
        />
        <View style={{backgroundColor:'white',marginTop:10,paddingHorizontal:16,marginHorizontal:10,paddingVertical:10,borderRadius:10}}>
          <View style={{flexDirection:'row'}}> 
            <Text style={{fontSize:hp('2.1')}}><Text style={{fontWeight:'bold'}}>Zatchup ID</Text> : HRFAROO3132</Text>
            <TouchableOpacity style={styles.zatchupstarclassbtn} onPress={() => {
                   props.navigation.navigate('EditCourseScreen');
                    }}>
           <Image
             source={Images.edit_icon}
             style={styles.addicon}
           />
           </TouchableOpacity>
           </View>
            <Text style={styles.T_1}><Text style={styles.textbold}>State</Text> : Haryana</Text>
            <Text style={styles.T_1}><Text style={styles.textbold}>City</Text>: Faridabad</Text>
            <Text style={styles.T_1}><Text style={{fontWeight:'bold'}}>School Name</Text> : Mukul School</Text>
            <Text style={styles.T_1}><Text style={styles.textbold}>School Address</Text> : Faridabad</Text>
            <Text style={styles.T_1}><Text style={styles.textbold}>Pincode</Text> : 21001</Text>
            <Text style={styles.T_1}><Text style={styles.textbold}>University/Board</Text> : CBSE</Text>
            <Text style={styles.T_1}><Text style={styles.textbold}>Course Name</Text> : btech</Text>
            <Text style={styles.T_1}><Text style={styles.textbold}>Course Description </Text>: ths is description </Text>
            <Text style={styles.T_1}><Text style={styles.textbold}>Starting Year</Text> : Oct 2021</Text>
            <Text style={styles.T_1}><Text style={styles.textbold}>Standard</Text> : BCCA</Text>
            <Text style={styles.T_1}><Text style={styles.textbold}>Duration</Text> : 0 month</Text>
           
            <Text style={styles.T_1}><Text style={styles.textbold}>Section</Text> : Oct BCCA1</Text>
        </View>
        <TouchableOpacity style={{alignItems:'center',marginTop:20,backgroundColor:'rgb(70,50,103)',marginHorizontal:18,height:hp('4.4'),borderRadius:10,justifyContent:'center'}}>
           <Text style={{color:'white',fontWeight:'bold'}}>Confirm and Send for School Verification</Text>
        </TouchableOpacity>
</View>
   
 
     );
}
export default SchoolConfirmationScreen;