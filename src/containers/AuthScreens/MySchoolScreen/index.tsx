import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Dimensions,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  BackHandler,
  ImageBackground,
  FlatList,
  Platform
} from 'react-native';
import styles from './style';
import { Images } from '../../../components/index';
import { TextField, CustomButton, CustomStatusBar } from '../../../components';
 import { NavigationContainer, useIsFocused, DrawerActions } from '@react-navigation/native';
 import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
 import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const screenWidth = Dimensions.get('window').width;

interface HomeScreenProps {
  navigation: any;
}
const MySchool = (props: HomeScreenProps) => {
 
  const backPressed = () => {
    props.navigation.goBack(null);
    return true;
  }
  const onBurgerBarPress = () => {
    props.navigation.dispatch(DrawerActions.toggleDrawer());
  }

  
  return (
    <View>

<View style={styles.child_view}>

<TouchableOpacity onPress={onBurgerBarPress} >
  <Image source={Images.menu_dash} style={styles.image_menu} />
</TouchableOpacity>

<View style={styles.tv_view}>
  <Text style={styles.ZatchUp_tv}>My School</Text>
  <Text style={styles.TM_tv}>TM</Text>
</View>

<View style={styles.Notification_view}>
  <Image source={Images.search} style={styles.inbox_iconreminder} />
  <View style={{ position: 'absolute', marginTop: Platform.OS == 'ios' ? 2 : 5, right: 5, alignSelf: 'flex-end', borderRadius: 15, backgroundColor: '#00B200', width: Platform.OS == 'ios' ? 20 : 18, height: Platform.OS == 'ios' ? 20 : 18 }}>
    {/* <Text style={{ color: '#FFFFFF', fontSize: 12, textAlign: 'center', fontWeight: 'bold', marginTop: Platform.OS == 'ios' ? 2 : 0 }}> {unreadremindercount} </Text> */}
  </View>
</View>
<TouchableOpacity
  onPress={() => {
    props.navigation.navigate('Notifications');
  }}
  style={styles.dot_view}
>
  <View >
    <Image source={Images.inbox_icon} style={styles.dot_image} />
    <View style={{ position: 'absolute', marginTop: Platform.OS == 'ios' ? 2 : 5, right: 5, alignSelf: 'flex-end', borderRadius: 15, backgroundColor: '#00B200', width: Platform.OS == 'ios' ? 20 : 18, height: Platform.OS == 'ios' ? 20 : 18 }}>
      {/* <Text style={{ color: '#FFFFFF', fontSize: 12, textAlign: 'center', fontWeight: 'bold', marginTop: Platform.OS == 'ios' ? 2 : 0 }}> {unreadnotificationcount} </Text> */}
    </View>

  </View>
</TouchableOpacity>
</View>
<ScrollView>

<View style={{paddingHorizontal:15,marginTop:12,flexDirection:'row',alignItems:'center',justifyContent:'center'}}> 

  <View style={styles.boxcontainer}>
            <Image
                        style={{ width: 70, height: 70, borderRadius: 60 / 2 }}
                        source={Images.profile_img2}
                    />
             <View style={{marginTop:12}}>
                <Text style={{textAlign:'center',fontSize:15,fontWeight:'bold'}}>E-certificates{'\n'}&{'\n'}E-reports</Text>
            </View>  
 </View>
 <TouchableOpacity onPress={() => props.navigation.navigate('EducationProfileScreen')}>
  <View style={styles.boxcontainer}>
    <Image
                        style={{ width: 70, height: 70, borderRadius: 60 / 2 }}
                        source={Images.profile_img2}
                    />
             <View style={{marginTop:12}}>
                <Text style={{textAlign:'center',fontSize:15,fontWeight:'bold'}}>View My Education Profile</Text>
            </View> 
  </View>
</TouchableOpacity>

</View>
<View style={{paddingHorizontal:15,flexDirection:'row',alignItems:'center',justifyContent:'center'}}> 
<TouchableOpacity onPress={() => props.navigation.navigate('ZatchupStarClassScreen')}>
  <View style={styles.boxcontainer}>
  <Image
                        style={{ width: 70, height: 70, borderRadius: 60 / 2 ,resizeMode:'stretch'}}
                        source={Images.profile_img2}
                    />
             <View style={{marginTop:12}}>
                <Text style={{textAlign:'center',fontSize:15,fontWeight:'bold'}}>Zatchup Star{'\n'}Class</Text>
            </View> 
  </View>
  </TouchableOpacity>
<TouchableOpacity onPress={() => props.navigation.navigate('Reminders')}>
  <View style={styles.boxcontainer}>
  <Image
                        style={{ width: 70, height: 70, borderRadius: 60 / 2 }}
                        source={Images.profile_img2}
                    />
             <View style={{marginTop:12}}>
                <Text style={{textAlign:'center',fontSize:15,fontWeight:'bold'}}>Reminders</Text>
            </View> 
  </View>
</TouchableOpacity>

</View>

<View style={{paddingHorizontal:15,marginTop:8,alignItems:'center',justifyContent:'center'}}> 

  <View style={{width:'100%',backgroundColor:'white',height:150,borderRadius:15,alignSelf:'center',justifyContent:'center'}}> 
  <Image
                        style={{ width: 70, height: 70, borderRadius: 60 / 2 ,alignSelf:'center'}}
                        source={Images.profile_img2}
                    />
             <View style={{marginTop:12}}>
                <Text style={{textAlign:'center',fontSize:15,fontWeight:'bold'}}>Chat with Teachers</Text>
            </View> 
  </View>

</View>

</ScrollView>

  </View>
 
  );
};

export default MySchool;
