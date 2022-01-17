import React, {Component, FC, useEffect, useState} from 'react';
import {
  Text,
  View,
  Dimensions,
  BackHandler,
  FlatList,
  Image,
  TextInput,
} from 'react-native';
import styles from './styles';
import {Images, Colors} from '../../../../../components/index';
//import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  TextField,
  CustomButton,
  CustomStatusBar,
  Validate,
  CustomHeader,
  BackBtn,
  HeaderTitleWithBack,
} from '../../../../../components';
import {CheckBox} from 'react-native-elements';
import Modal from 'react-native-modal';
import {
  NavigationContainer,
  useIsFocused,
  useFocusEffect,
} from '@react-navigation/native';
import CardView from 'react-native-cardview';
import {useDispatch, useSelector} from 'react-redux';
import * as userActions from '../../../../../actions/user-actions-types';
import Toast from 'react-native-simple-toast';
import ProgressLoader from 'rn-progress-loader';
import {Card} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
const screenWidth = Dimensions.get('window').width;
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

interface NotificationsScreenProps {
  navigation: any;
}
const CreatePostScreen = (props: NotificationsScreenProps) => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const [setdatafromlist, setData] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [allSelected, setSelected] = useState(false);
  const checkedterm = () => {
    setSelected(!allSelected);
  };

  const renderIndicator = () => {
    return (
      <View style={{}}>
        <ProgressLoader
          visible={true}
          isModal={true}
          isHUD={true}
          //hudColor={"#ffffff00"}
          hudColor={'#4B2A6A'}
          style={{justifyContent: 'center', alignItems: 'center', flex: 1}}
          color={'white'}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <CustomStatusBar />
      <CustomHeader
        Title={'Create Post'}
        Back={'true'}
        navigation={props.navigation}
      />
      <CardView
        cardElevation={5}
        cardMaxElevation={5}
        //cornerRadius={20}
        style={styles.card}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={Images.profile_img2}
              style={{
                height: 50,
                width: 50,
                tintColor: 'grey',
                borderRadius: 25,
              }}
            />
            <Text style={styles.nametext}>Simmi Sharma</Text>
          </View>
          <View style={{margin: 0, padding: 0}}>
            <CheckBox
              title={
                <Text style={styles.addtoalumnitext}>
                  Add to Alumni Gallery
                </Text>
              }
              checkedIcon={
                <Image
                  source={Images.checkbox_select}
                  style={styles.checkbox}
                />
              }
              uncheckedIcon={
                <Image
                  source={Images.checkbox_unselect}
                  style={styles.checkbox}
                />
              }
              checked={allSelected}
              containerStyle={{
                padding: 0,
                margin: 0,
                backgroundColor: 'transparent',
                borderColor: 'transparent',
                alignItems: 'center',
              }}
              onPress={checkedterm}
              // onPress={() => setCount(count + 1)}
            />
          </View>
        </View>

        <View style={styles.textinputContainer}>
          <TextInput
            placeholder="Write a caption"
            multiline={true}
            numberOfLines={4}
            style={styles.textinput}
          />
        </View>
      </CardView>
      <View style={styles.rowContainer}>
        <TouchableOpacity
          style={{
            backgroundColor: 'white',
            height: hp(12),
            width: 110,
            borderRadius: 10,
            alignItems: 'center',
          }}>
          <Image
            source={require('../../../../../assets/images/college4.jpg')}
            style={{
              resizeMode: 'cover',

              width: hp(12),
              height: 90,
            }}
          />
          <Image source={Images.delete_icon} style={styles.deleteicon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: '#4B2A6A',
            height: hp(12),
            width: 110,
            marginLeft: 10,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Icon name="camera" size={25} color="white" style={{margin: 5}} />
          <Text style={styles.addphotoText}>Add Photo</Text>
        </TouchableOpacity>
      </View>
      <View style={{paddingHorizontal: 16, marginTop: 10}}>
        <CustomButton
          title={'Post'}
          // onPress={onPressSignup}
        />
      </View>
    </View>
  );
};

export default CreatePostScreen;
