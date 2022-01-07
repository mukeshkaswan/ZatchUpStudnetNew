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
import {Images, Colors} from '../../../../components/index';
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
} from '../../../../components';
import {CheckBox} from 'react-native-elements';
import Modal from 'react-native-modal';
import {
  NavigationContainer,
  useIsFocused,
  useFocusEffect,
} from '@react-navigation/native';
import CardView from 'react-native-cardview';
import {useDispatch, useSelector} from 'react-redux';
import * as userActions from '../../../../actions/user-actions-types';
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

const data2 = [
  {
    id: 1,
  },

  {
    id: 2,
  },
];

interface NotificationsScreenProps {
  navigation: any;
}
const BlockListScreen = (props: NotificationsScreenProps) => {
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
        Title={'Block List'}
        Back={'true'}
        navigation={props.navigation}
      />

      <FlatList
        data={data2}
        renderItem={({item}) => (
          <CardView
            cardElevation={5}
            cardMaxElevation={5}
            //cornerRadius={20}
            style={styles.card}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={require('../../../../assets/images/college1.jpg')}
                  style={{width: 50, height: 50, borderRadius: 50}}
                />
                <Text style={{fontWeight: 'bold', marginLeft: 10}}>
                  Alumni 00000000
                </Text>
              </View>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                  props.navigation.navigate('BlockListScreen');
                }}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>
                  Unblock
                </Text>
              </TouchableOpacity>
            </View>
          </CardView>
        )}
        //  ItemSeparatorComponent={renderIndicator}
      />
    </View>
  );
};

export default BlockListScreen;
