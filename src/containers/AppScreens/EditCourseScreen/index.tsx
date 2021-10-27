import React, { Component,FC,useState } from 'react';
import {  View,FlatList,Image,TouchableOpacity,ImageBackground ,ScrollView,Switch,Platform} from 'react-native';
import { TextField, CustomButton, CustomStatusBar, Validate, CustomHeader, BackBtn,HeaderTitleWithBack,CustomDropdown } from '../../../components';
import { RadioButton, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import styles from './style.tsx';  
import { Images } from '../../../components/index';
interface ResetPasswordScreenProps {
  navigation: any;
}

const EditCourseScreen= (props: ResetPasswordScreenProps) => {
      const [value, setValue] = React.useState('first');
      const [isEnabled, setIsEnabled] = useState(false);
      const toggleSwitch = () => setIsEnabled(previousState => !previousState);
      const backPressed = () => {
        props.navigation.goBack(null);
        return true;
      }
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
          headerTitle="Education Profile"
        />
        

        <ScrollView > 
            <View style={{paddingHorizontal:16}}>
                <View style={{alignSelf:'center',marginTop:20}}>
                  
                   <Text style={styles.t_2}>Mukul School (HRFAR003132)</Text>
               </View>
             
                <CustomDropdown
                   placeholder={'Select Course'}
                   data={KYC_type_doc}
                   selectedValue={KYC_type_doc_Selected}
                   SelectedLanguagedata={(selectedValue: any) => {
                  }
              }
              />
           
            <View style={{ marginTop: '2%',marginHorizontal:6
          }}>
                <TextField
                    placeholder={'Joining Date'}
                    imageIcon={Images.calendar_icon}
                    editable={false}
                    //value={startDate3.toString()} 
                    />
            </View>
        
        
       
      
        
              
        
        <CustomDropdown
              placeholder={'Select Joining Standard'}
              data={KYC_type_doc}
              selectedValue={KYC_type_doc_Selected}
              SelectedLanguagedata={(selectedValue: any) => {
                  }
              }
          
            />
         
         
        
              
        
        <CustomDropdown
              placeholder={'Select Current Standard'}
              data={KYC_type_doc}
              selectedValue={KYC_type_doc_Selected}
              SelectedLanguagedata={(selectedValue: any) => {
                  }
              }
          
            />
        
        
        
        
        <CustomDropdown
              placeholder={'Select Class'}
              data={KYC_type_doc}
              selectedValue={KYC_type_doc_Selected}
              SelectedLanguagedata={(selectedValue: any) => {
                  }
              }
          
            />
        
        
              
        <CustomDropdown
              placeholder={'Select School ID'}
              data={KYC_type_doc}
              selectedValue={KYC_type_doc_Selected}
              SelectedLanguagedata={(selectedValue: any) => {
                  }
              }
          
            />
        
              
        <View style={{marginTop:'2%',marginHorizontal:6}}>
        
              <TextField placeholder={'Enter Roll Number'}
             //  onChangeText={val => setID(val)}
             //   value={ID}
             //   onEndEditing={val => getDetailZatchupID(val)}
             //    onEndEditing={() => getDetailZatchupID}
             //   onEndEditing={(value) => getDetailZatchupID()}
     
             />
             </View>
             <View style={{marginTop:'3%'}}>
        
              <TextField placeholder={'Enter Course Description'}
                multiline={true}
             //  onChangeText={val => setID(val)}
             //   value={ID}
             //   onEndEditing={val => getDetailZatchupID(val)}
             //    onEndEditing={() => getDetailZatchupID}
             //   onEndEditing={(value) => getDetailZatchupID()}
     
             />
             </View>
            <View style={{marginTop:15,marginBottom:10}}>
             <CustomButton
                title={'Submit'}
                 
               //onPress={() => props.navigation.navigate('Home')}
              />
            </View>
             </View>
    </ScrollView> 
          
</View>
   
 
     );
}
export default EditCourseScreen;