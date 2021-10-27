import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    KeyboardAvoidingView,
    Dimensions,
    Alert,
    ActivityIndicator,
    ScrollView,
    TouchableOpacity,
    Platform,
    FlatList,
    TextInput
} from 'react-native';
import styles from './styles';
import { Images } from '../../../components/index';
import { TextField, CustomButton, CustomStatusBar, Validate } from '../../../components';
import { useDispatch, useSelector } from 'react-redux';
import * as userActions from '../../../actions/user-actions-types';
import Toast from 'react-native-simple-toast';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const screenWidth = Dimensions.get('window').width;
 interface MessagesScreenProps {
    navigation: any;
}
const TeacherMessageChat = (props: MessagesScreenProps) => {
 

    React.useEffect(() => {
        // console.log('rtyuigfghj', props) 
    }, []);
const backPressed = () => {
            props.navigation.goBack(null);
            return true;
          }
  
    return (
      <View style={styles.container}>
        <CustomStatusBar />

        <View style={{
          height: Platform.OS === 'ios' ? '10%' : 64,
          backgroundColor: 'rgb(70,50,103)',
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
        
         
          

        }}>
          <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent:'space-between',paddingRight:15}}>

          <View style={{flexDirection:'row'}}> 
            <TouchableOpacity onPress={backPressed}
              style={{ marginTop: Platform.OS === 'ios' ? 30 : 10, marginLeft: 10 }} >
              <Icon name="arrow-left" size={25} color="white" />
            </TouchableOpacity>
            <Image
                        style={{ width: 50, height: 50, borderRadius: 60 / 2 ,marginLeft:15}}
                        source={Images.profile_img2}
                    />

         <View style={{marginLeft:10}}>  
             
              <Text style={{
                textAlignVertical: "center",
                textAlign: "center",
                color: 'white',
                fontSize: hp(2.5),
                marginRight: 20,
                fontFamily: 'Lato-Regular',
                marginTop: Platform.OS === 'ios' ? 30 : 5,
              }}>{'Nitesh'}</Text>
            <Text style={{color:'lightgrey'}}>Online</Text>

            </View>
             
            </View>  
            <Image
              style={{

                tintColor: 'white',
                // height: 25,
                // width: 25,
                resizeMode: 'stretch',
              }}
                        
                        source={Images.threedot}
                    />
          </View>
           
        </View>


<ScrollView>
  </ScrollView>

        {/* <HeaderTitleWithBack
          navigation={this.props.navigation}
          headerTitle="Messages"
        /> */}
        {/* <HeaderWithTitle headerTitle="Messages" /> */}
         
        <View
          style={{
            flexDirection: 'column',
            backgroundColor: '#F7F7F7',
            borderTopColor: '#E4E4E4',
            borderWidth: 2,
            borderLeftWidth: 0,
            borderRightWidth: 0,
          }}>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: '#FFFFFF',
                borderWidth: 1,
                borderColor: '#DBDBDB',
                height: 50,
                // width:300,
                borderRadius: 20,
                margin: 10,
                marginLeft: 15,
              }}>
              <TextInput
                style={{width: '85%', fontSize: 16, paddingLeft: 15}}
                placeholderTextColor="#A9A9A9"
                placeholder="Write a message..."
                underlineColorAndroid="transparent"
              />
            </View>
            
            <Image
              source={Images.send} //Change your icon image here
              style={{
                // padding: 10,
                marginTop: 10,

                //  marginLeft:20,
                tintColor: '#4B2A6A',
                // height: 40,
                // width: 40,
                resizeMode: 'stretch',
                alignItems: 'center',
              }}
            />
          
          </View>
        </View>
        
      </View>
      
    );
        }     

export default TeacherMessageChat;