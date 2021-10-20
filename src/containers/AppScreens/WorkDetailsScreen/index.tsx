import React, { Component,FC,useState } from 'react';
import {  View,FlatList,Image,TouchableOpacity,ImageBackground ,ScrollView,Switch,Platform} from 'react-native';
import { TextField, CustomButton, CustomStatusBar, Validate, CustomHeader, BackBtn,HeaderTitleWithBack,CustomDropdown} from '../../../components';
import { RadioButton, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import styles from './style.tsx';  
import fonts from '../../../components/fonts';
interface ResetPasswordScreenProps {
  navigation: any;
}

const WorkDetailsScreen= (props: ResetPasswordScreenProps) => {
    const [KYC_type_doc_Selected, setKYCSelected] = useState('');
    
   const [KYC_type_doc, setKYC_type_doc] = useState([
     {
       label: 'value1',
       value: '0',
     },
     {
       label: 'value2',
       value: '1',
     },
     {
       label: 'value3',
       value: '2',
     },
   ]);
    
 return (
     <View style={styles.container}> 
      
      
      <HeaderTitleWithBack
           navigation={props.navigation}
          headerTitle="Enter Your Work Details"
        />
        <View style={{paddingHorizontal:16}}>
           <View style={{marginTop:20}}>
              <Text style={styles. fillText_Add}>Employment Type</Text>
              <CustomDropdown
              placeholder={'Employment Status'}
              data={KYC_type_doc}
              selectedValue={KYC_type_doc_Selected}
              SelectedLanguagedata={(selectedValue: any) => {
                  }
              }
          
            />
           </View>
           <View style={{marginTop:20}}>
              <Text style={styles. fillText_Add}>Employment Profile</Text> 
              <CustomDropdown
              placeholder={'Select Your Job Title'}
              data={KYC_type_doc}
              selectedValue={KYC_type_doc_Selected}
              SelectedLanguagedata={(selectedValue: any) => {
                  }
              }
          
            />
           </View>
           
           <View style={{paddingHorizontal:20,marginTop:20}}> 
           <CustomButton
                title={'Submit'}
                 
               //onPress={() => props.navigation.navigate('Home')}
              />
            </View>
        </View>

 
          
</View>
   
 
     );
}
export default WorkDetailsScreen;