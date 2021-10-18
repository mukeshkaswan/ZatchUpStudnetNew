import React, { Component, FC, useState } from 'react';
import { Text, View, FlatList, Image, TouchableOpacity, Platform, ImageBackground, ScrollView, Alert, BackHandler,Dimensions} from 'react-native';
import styles from './style.tsx';  
 import ProgressLoader from 'rn-progress-loader';
import { CustomButton, CustomStatusBar, Validate, CustomHeader, BackBtn ,CustomDropdown} from '../../../components';
import { Images } from '../../../components/index';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Dropdown } from 'react-native-material-dropdown';



interface ResetPasswordScreenProps {
  navigation: any;
}


const {width} = Dimensions.get("window");

const ZatchupStarClassScreen= (props: ResetPasswordScreenProps) => {
  const [KYC_type_doc_Selected, setKYCSelected] = useState('');
   const backPressed = () => {
    props.navigation.goBack(null);
    return true;
  }
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
    <CustomStatusBar />

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
            //marginRight: 20,
            fontFamily: 'Lato-Regular',
            marginTop: Platform.OS === 'ios' ? 30 : 5,
          }}>{'ZatchUp Star Class'}</Text>
        </View>
        <Image source={Images.search} style={styles.inbox_iconreminder} />

      </View>
</View>
<ScrollView style={{}}>
      <View style={[styles.dropdowncontainer,{width:width-32,marginStart:16,marginTop:16}]}>
          <Text style={{fontSize:17}}>Select Course</Text>
        <View style={{marginTop:10}}>
          <CustomDropdown
              placeholder={'Select'}
              data={KYC_type_doc}
              selectedValue={KYC_type_doc_Selected}
              SelectedLanguagedata={(selectedValue: any) => {
                  }
              }
          
            />
        </View>
          
      </View>
    <View style={{alignItems:'center',marginTop:40}}> 
        <Text style={{fontSize:18,textAlign:'center'}}>Available Lectures in the {'\n'}Selected Course</Text>
    </View>
 {/* qefff */}
     <View style={{marginTop:30}}>
      <View style={styles.coursecontainer}>
          <View>
             <Text style={styles.coursetext1}>Trignometry</Text>
             <Text style={styles.coursetext}>Mathematics</Text>
          </View>
          <TouchableOpacity style={styles.requestbutton}>
              <Text style={styles.requesttext}>Request Lecture</Text>

          </TouchableOpacity>
      </View>
      <View style={styles.coursecontainer}>
          <View>
             <Text style={styles.coursetext1}>Algebra</Text>
             <Text style={styles.coursetext}>Mathematics</Text>
          </View>
          <TouchableOpacity style={styles.requestbutton}>
              <Text style={styles.requesttext}>Request Lecture</Text>

          </TouchableOpacity>
      </View>
      <View style={styles.coursecontainer}>
          <View>
             <Text style={styles.coursetext1}>Dimensional Concepts</Text>
             <Text style={styles.coursetext}>Mathematics</Text>
          </View>
          <TouchableOpacity style={styles.requestbutton}>
              <Text style={styles.requesttext}>Request Lecture</Text>

          </TouchableOpacity>
      </View>
     </View>
    {/* fgjjj */}
    <TouchableOpacity style={styles.zatchupstarclassbtn} onPress={() => {
    props.navigation.navigate('StarClassRequestScreen');
  }}>
         <Text style={styles.zatchupstarclasstext}>Zatchup Star Class Request</Text>
    </TouchableOpacity>
 </ScrollView>
</View>


  );
}
export default ZatchupStarClassScreen;