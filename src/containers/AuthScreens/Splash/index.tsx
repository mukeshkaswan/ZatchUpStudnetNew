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
    ImageBackground,
    StatusBar,
} from 'react-native';
import styles from './style';
import { Images } from '../../../components/index';
import { TextField, CustomButton, CustomStatusBar, Validate } from '../../../components';
import { useDispatch, useSelector } from 'react-redux';
import * as userActions from '../../../actions/user-actions-types';
import Toast from 'react-native-simple-toast';
import SplashScreen from 'react-native-splash-screen';

const screenWidth = Dimensions.get('window').width;

interface SplashScProps {
    navigation: any;
}
const SplashSc = (props: SplashScProps) => {



    React.useEffect(() => {
        SplashScreen.hide();
        const dataSetTimeOut = setTimeout(() => {
            props.navigation.replace(
                'LoginScreen'
            )

            return () => {
                dataSetTimeOut.clear();
            }
        }, 2000);
        // console.log('rtyuigfghj', props)
    }, []);



    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor='transparent' />

            <View style={{ flex: 1 }}>

                <ImageBackground source={Images.Splash} style={styles.imagess}>

                </ImageBackground>

            </View>
        </View>
    );
};

export default SplashSc;
