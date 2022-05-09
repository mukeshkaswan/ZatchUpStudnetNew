import React, { Component, FC, useEffect, useState } from 'react';
import { Text, View, Dimensions, BackHandler, SafeAreaView } from 'react-native';
import styles from './styles';
import { Images, Colors } from '../../../components/index';
//import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CustomStatusBar, CustomHeader, HeaderTitleWithBack } from '../../../components';
import { NavigationContainer, useIsFocused, useFocusEffect } from '@react-navigation/native';
const screenWidth = Dimensions.get('window').width;
interface ContacUsScreenProps { navigation: any }
const ContactUs = (props: ContacUsScreenProps) => {

  const isFocused = useIsFocused();

  useEffect(() => {

    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  }, [isFocused]);

  function handleBackButtonClick() {
    props.navigation.goBack(null);

    return true;
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>

      <View style={styles.container}>
        <CustomStatusBar />
        <HeaderTitleWithBack
          navigation={props.navigation}
          headerTitle="Contact Us"
        />
        {/* <CustomHeader Title={'Contact Us'} Back={'true'} navigation={props.navigation} /> */}

        <View style={styles.contactContainer}>
          <Icon name="phone" size={80} color={Colors.$BtnBackgroundColor} />
          <Text style={styles.text}>+91 8054441372</Text>
        </View>
        <View style={[styles.contactContainer, { marginTop: '8%' }]}>
          <Icon name="envelope" size={80} color={Colors.$BtnBackgroundColor} />
          <Text style={styles.text}>support@zatchup.com</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ContactUs;