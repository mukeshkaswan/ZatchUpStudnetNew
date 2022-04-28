import React, { Component, FC, useState, useEffect, useRef } from 'react';
import { Text, View, FlatList, SafeAreaView, Image, TouchableOpacity, Platform, ImageBackground, ScrollView, Alert, BackHandler, TextInput, ActivityIndicator } from 'react-native';
import styles from './style';
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
import { WebView } from 'react-native-webview';
import {
  NavigationContainer,
  useIsFocused,
  DrawerActions,
  useFocusEffect
} from '@react-navigation/native';

interface ResetPasswordScreenProps {
  navigation: any;
  route: any;

}

const SIngleChatWithTeacherWebView = (props: ResetPasswordScreenProps) => {
  const [number, onChangeNumber] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [schoolid, setSchoolID] = useState('');
  const [coursedata, setCourseData] = useState([]);
  const webviewRef = useRef(null)
  const isFocused = useIsFocused();
  const [userid, setUserid] = useState(false);

  const dispatch = useDispatch();

  function handleBackBut() {
    props.navigation.goBack();
    return true;
  }


  useEffect(() => {


  }, [isFocused]);
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

  const backPressed = () => {
    props.navigation.goBack(null);
    return true;
  }






  return (
    <SafeAreaView style={{ flex: 1 }}>

      <View style={styles.container}>
        {isLoading && renderIndicator()}

        <CustomStatusBar />
        <HeaderTitleWithBack
          navigation={props.navigation}
          headerTitle="Chat"
        />



        <View style={{ flex: 1 }}>

          <WebView
            source={{ uri: 'https://zatchup.com/preprod/#/user/mobile-chat-app?user_profile_id=' + props.route.params.user_id + '&type=app&getVerify=2&id=' + props.route.params.firebase_id }}
            //source={{ uri: 'https://zatchup.com/#/user/mobile-chat-app?user_profile_id=' + props.route.params.user_id + '&type=app&getVerify=2&id=' + props.route.params.firebase_id }}

            startInLoadingState={true}
            renderLoading={() => (
              <ActivityIndicator
                color='#F8CA00'
                size='large'
                style={{ flex: 1 }}
              />
            )}
            ref={webviewRef}

            onNavigationStateChange={navState => {

              console.log('weburl', navState.url);

              //  setCanGoBack(navState.canGoBack)
              //  setCanGoForward(navState.canGoForward)
              //  setCurrentUrl(navState.url)
            }}
          />


        </View>
      </View>

    </SafeAreaView>


  );
}
export default SIngleChatWithTeacherWebView;