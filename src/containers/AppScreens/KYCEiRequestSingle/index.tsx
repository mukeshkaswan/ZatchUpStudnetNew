import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, Image, KeyboardAvoidingView, Dimensions, ScrollView, BackHandler, Alert } from 'react-native';
import styles from './style';
import { Images } from '../../../components/index';
import { TextField, CustomButton, CustomStatusBar, BackBtn, ModelComponent, CustomHeader } from '../../../components';
import {
    NavigationContainer,
    useIsFocused,
    DrawerActions,
  } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import * as userActions from '../../../actions/user-actions-types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenWidth = Dimensions.get('window').width;

interface eKycSuccesscreenProps { navigation: any }

const KYCEiRequestSingle = (props: eKycSuccesscreenProps) => {
    const [Aadhar, setAadhar] = useState('');
    const [Name, setName] = useState('');
    const [message, setMessage] = useState('');

    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(false);

    
    function handleBackButtonClick() {
        Alert.alert(
            'ZatchUp',
            'Do you want to exit?',
            [
                { text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'Yes', onPress: () => BackHandler.exitApp() },
            ],
            { cancelable: false });
        return true;
    }

    // function handleBackButtonClick() {
    //     props.navigation.goBack();
    //     return true;
    //   }

    useEffect(() => {
        getEidetail();

        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
    }, [isFocused]);



    /***************************User Auth  User Info *******************************/

    const getEidetail = async () => {

        var token = '';
        try {
          const value = await AsyncStorage.getItem('token');
          if (value !== null) {
            token = value;
          }
        } catch (e) {
        }
    
        const data = {
          token: token,
        };
    
        dispatch(
          userActions.getEidetailforalreadystudents({
            data,
            callback: ({ result, error }) => {
              if (result) {
                setLoading(false);
                console.warn(
                  'after result ',
                  JSON.stringify(result, undefined, 2),
    
                );
                setMessage(result.data.message);
              }
              if (!error) {
                console.warn(JSON.stringify(error, undefined, 2));
                setLoading(false);
    
    
              } else {
                setLoading(false);
                console.warn(JSON.stringify(error, undefined, 2));
              }
            },
          }),
        );
      };

      
    return (
        <View style={styles.container}>

            <CustomStatusBar />

            <CustomHeader Title={'Welcome to ZatchUp'} />


            {/*   <View style={styles.backbtnCss}><BackBtn navigation={this.props.navigation} /></View> */}

            <ScrollView>

                <View style={styles.inputContainer}>



                    {/* <View style={styles.enterTextConatiner}>
                        <Text style={styles.enterText}>Welcome to ZatchUp</Text>
                    </View> */}

                    <View style={styles.enterTextConatiner}>
                        <Text style={styles.enterText_}>{message}</Text>
                    </View>


                    <View style={{ marginTop: '20%', marginRight: 50, marginLeft: 50 ,}}>
                        <CustomButton backgroundColor={'green'} title={'Add This School to your profile'} onPress={() => props.navigation.navigate('SelectStudent', { 're_verify': false })} />
                    </View>


                    <View style={{ marginTop: 20, marginRight: 80, marginLeft: 80 }}>
                        <CustomButton backgroundColor={'none'} textColor={'red'} title={'Not My School'} onPress={() => props.navigation.navigate('SelectStudent', { 're_verify': false })} />
                    </View>
                </View>


            </ScrollView>
        </View>
    );
};

export default KYCEiRequestSingle;
