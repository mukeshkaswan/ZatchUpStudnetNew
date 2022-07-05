import React, { Component, FC, useState } from 'react';
import { Text, View, FlatList, Image, TouchableOpacity, Platform, ImageBackground, ScrollView, Alert, BackHandler, Switch, TextInput } from 'react-native';
import styles from './style.tsx';
import { TextField, CustomButton, CustomStatusBar, Validate, CustomHeader, BackBtn, HeaderTitleWithBack } from '../../../components';
import { Images } from '../../../components/index';
import Toast from 'react-native-simple-toast';
import { useDispatch, useSelector } from 'react-redux';
import * as userActions from '../../../actions/user-actions-types';
import ProgressLoader from 'rn-progress-loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import style from '../Messages/style';
import CardView from 'react-native-cardview';
import Modal from "react-native-modal";
import { CheckBox } from 'react-native-elements'
interface ResetPasswordScreenProps {
  navigation: any;
}

const SettingScreen = (props: ResetPasswordScreenProps) => {
  const [value, setValue] = React.useState('first');
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [isModalVisible, setModalVisible] = useState(false);
  const [number, onChangeNumber] = React.useState(null);

  const [Gender, setGender] = useState('');

  const [count, setCount] = useState(0);
  const [allSelected, setSelected] = useState(false)
  const [male, setMale] = useState(false)
  const [Female, setFemale] = useState(false)
  const [Custom, setCustom] = useState(false)


  const checkedterm = () => {
    setSelected(!allSelected)

  }


  const checkedMale = () => {
    setMale(!male)
    setFemale(false)
    setCustom(false)
    setcustomgenderView(false)
    setGender('M')
  }

  const checkedFemale = () => {
    setFemale(!Female)
    setCustom(false)
    setMale(false)
    setcustomgenderView(false)
    setGender('F')
  }

  const checkedCustom = () => {
    setCustom(!Custom)
    setMale(false)
    setFemale(false)
    setcustomgenderView(true)
    setGender('M')
  }









  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const renderIndicator = () => {
    return (
      <View style={{}}>

        <ProgressLoader
          visible={true}
          isModal={true} isHUD={true}
          //hudColor={"#ffffff00"}
          hudColor={"#4B2A6A"}
          style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
          color={"white"} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CustomStatusBar />
      <HeaderTitleWithBack
        navigation={props.navigation}
        headerTitle="Setting"
      />

      <CardView
        cardElevation={5}
        cardMaxElevation={5}
        // cornerRadius={15}
        style={{
          // width: '95%',

          backgroundColor: 'white',
          marginHorizontal: 15,
          marginTop: 20,
          paddingBottom: 14,
          paddingTop: 10

        }}>
        <View style={styles.addcitycontainer}>

          <Text style={styles.title_text}>Personal Setting</Text>
          <TouchableOpacity onPress={toggleModal}>
            <Image
              source={Images.edit_icon}
              style={styles.addicon}
            />
          </TouchableOpacity>

          <Modal isVisible={isModalVisible}
            onBackdropPress={toggleModal}
          >



            <View style={{ height: hp('45'), backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 22 }}>
              <Text style={{ fontSize: 20, marginVertical: 10, fontWeight: 'bold' }}>Personal Information</Text>
              <Text style={{ fontWeight: 'bold', alignSelf: 'flex-start', paddingLeft: 20, paddingVertical: 6 }}>Mother's Name</Text>
              <View style={{ borderWidth: 1, height: hp('5'), borderColor: 'lightgrey', width: 300, borderRadius: 10 }}>

                <TextInput
                  style={{ paddingLeft: 10 }}
                  onChangeText={onChangeNumber}
                  value={number}
                  placeholder="Maa"
                  keyboardType='default'
                />
              </View>
              <Text style={{ fontWeight: 'bold', alignSelf: 'flex-start', paddingLeft: 20, marginTop: 8 }}>Father's Name</Text>
              <View style={{ borderWidth: 1, height: hp('5'), borderColor: 'lightgrey', width: 300, borderRadius: 10, marginTop: 10 }}>

                <TextInput
                  style={{ paddingLeft: 10 }}
                  onChangeText={onChangeNumber}
                  value={number}
                  placeholder="Paa"
                  keyboardType='default'
                />
              </View>
              <View style={styles.labelConatiner} ><Text style={styles.labelText}>Gender</Text></View>

              <View style={[styles.inputmarginBottom, { flexDirection: 'row', flex: 1, marginLeft: 25, marginRight: 25 }]}>
                <View style={{ flex: 1 }}>
                  <CheckBox
                    title=' Male'
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle'
                    checked={male}
                    containerStyle={{ padding: 0, margin: 0, backgroundColor: 'transparent', borderColor: 'transparent' }}
                    titleProps={{ style: { color: 'rgba(51,51,51,0.5)', fontFamily: 'Lato-Regular' } }}
                    uncheckedColor={'#fff'}
                    checkedColor={'rgb(70,50,103)'}
                    textStyle={{ color: '#33333380', fontFamily: 'Lato-Regular' }}
                    onPress={checkedMale}
                  // fontFamily={'Lato-Regular'}
                  />
                </View>


                <View style={{ flex: 1 }}>
                  <CheckBox
                    title=' Female'
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle'
                    checked={Female}
                    containerStyle={{ padding: 0, margin: 0, backgroundColor: 'transparent', borderColor: 'transparent' }}
                    titleProps={{ style: { color: 'rgba(51,51,51,0.5)', fontFamily: 'Lato-Regular' } }}
                    uncheckedColor={'#fff'}
                    checkedColor={'rgb(70,50,103)'}
                    onPress={checkedFemale}
                  // fontFamily={'Lato-Regular'}
                  />
                </View>

                <View style={{ flex: 1 }}>
                  <CheckBox
                    title=' Custom'
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle'
                    checked={Custom}
                    containerStyle={{ padding: 0, margin: 0, backgroundColor: 'transparent', borderColor: 'transparent' }}
                    titleProps={{ style: { color: 'rgba(51,51,51,0.5 )', fontFamily: 'Lato-Regular' } }}
                    uncheckedColor={'lightgrey'}
                    checkedColor={'rgb(70,50,103)'}
                    textStyle={{ color: '#33333380' }}
                    onPress={checkedCustom}

                  />

                </View>




              </View>
              <TouchableOpacity onPress={toggleModal} style={{ height: hp('4.5'), width: wp('40'), backgroundColor: 'rgb(70,50,103)', marginTop: 15, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}><Text style={{ color: 'white' }}>Submit</Text></TouchableOpacity>


            </View>
          </Modal>
        </View>

        <View style={styles.border}></View>
        <View style={{ marginTop: 15 }}>
          <View style={styles.text_container}>
            <Text style={styles.detail_text}>DOB : </Text>
            <Text>Nitya</Text>
          </View>
          <View style={styles.text_container}>
            <Text style={styles.detail_text}>DOB : </Text>
            <Text>ff</Text>
          </View>
          <View style={styles.text_container}>
            <Text style={styles.detail_text}>Gender : </Text>
            <Text>gen</Text>
          </View>

          <View style={styles.text_container}>
            <Text style={styles.detail_text}>Email : </Text>
            <Text>email</Text>
          </View>
          <View style={styles.text_container}>
            <Text style={styles.detail_text}>Phone Number : </Text>
            <Text>phone</Text>
            <Image
              source={Images.inbox}
              style={{ resizeMode: 'stretch', tintColor: 'green', marginLeft: 8, width: 20, height: 20 }}
            />
          </View>
          <View style={styles.text_container}>
            <Text style={styles.detail_text}>Father's Name : </Text>
            <Text>Paa</Text>
          </View>
          <View style={styles.text_container}>
            <Text style={styles.detail_text}>Mother's Name : </Text>
            <Text>Maa</Text>
          </View>
        </View>


      </CardView>
      <CardView
        cardElevation={5}
        cardMaxElevation={5}
        //cornerRadius={20}
        style={styles.card}>


        <Text style={styles.title_text}>Privacy Setting</Text>

        <View style={styles.border}></View>
        <View style={styles.privacyrowcontainer}>
          <Text style={styles.detail_text}>Mobile Number : </Text>
          <Text>69659693698</Text>
          <Switch
            trackColor={{ false: "grey", true: "lightgreen" }}
            thumbColor={isEnabled ? "limegreen" : "lightgrey"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        <View style={styles.border1}></View>
        <View style={styles.privacyrowcontainer}>
          <Text style={styles.detail_text}>Date of Birth : </Text>
          <Text>   69659693698</Text>
          <Switch
            trackColor={{ false: "grey", true: "lightgreen" }}
            thumbColor={isEnabled ? "limegreen" : "lightgrey"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        <View style={styles.border1}></View>
        <View style={styles.privacyrowcontainer}>
          <Text style={styles.detail_text}>Gender : </Text>
          <Text>             69659693698</Text>
          <Switch
            trackColor={{ false: "grey", true: "lightgreen" }}
            thumbColor={isEnabled ? "limegreen" : "lightgrey"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </CardView>



    </View>

  );
}
export default SettingScreen;