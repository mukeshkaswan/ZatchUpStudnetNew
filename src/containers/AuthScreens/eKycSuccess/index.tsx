import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, Image, KeyboardAvoidingView, Dimensions, ScrollView, BackHandler, Alert } from 'react-native';
import styles from './style';
import { Images } from '../../../components/index';
import { TextField, CustomButton, CustomStatusBar, BackBtn, ModelComponent, CustomHeader } from '../../../components';
const screenWidth = Dimensions.get('window').width;

interface eKycSuccesscreenProps { navigation: any ;  route: any;}

const eKycSuccess = (props: eKycSuccesscreenProps) => {
    const [Aadhar, setAadhar] = useState('');
    const [Name, setName] = useState('');
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


        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
    }, []);
    return (
        <View style={styles.container}>

            <CustomStatusBar />

            <CustomHeader Title={'eKYC'} />


            {/*   <View style={styles.backbtnCss}><BackBtn navigation={this.props.navigation} /></View> */}

            <ScrollView>

                <View style={styles.inputContainer}>


                    <View style={styles.logoContainer}>

                        <Image source={Images.blue_tick} style={styles.messagelogo} />
                    </View>

                    <View style={styles.enterTextConatiner}>
                        <Text style={styles.enterText}>KYC Added Successfully</Text>
                    </View>


                    <View>
                        <CustomButton title={'Continue'} onPress={() => props.navigation.navigate('SelectStudent', { 're_verify': false ,'ei_request_count':props.route.params.ei_request_count})} />
                    </View>
                </View>


            </ScrollView>
        </View>
    );
};

export default eKycSuccess;
