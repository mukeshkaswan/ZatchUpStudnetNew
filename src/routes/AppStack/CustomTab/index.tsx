import React, {useMemo, useState, useRef, useEffect} from 'react';
import {View, TouchableOpacity, Text, Platform, Alert} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';
import Svg, {Path} from 'react-native-svg';
import {useDispatch, useSelector} from 'react-redux';
import {
  LoginScreen,
  SignUpScreen,
  Otp,
  ForgotPassword,
  eKYC,
  eKycSuccess,
  EIInformation,
  EiInfoSave,
  Approval,
  SelectStudent,
  CurrentSchoolinfo,
  Onboarded,
  EducationProfile,
  EIconfirmation,
  AddCourseDetailsOthers,
  AddMoreCourseDetailsOthers,
  OtpForgot,
  Personalinfo,
  OtpLogin,
  AlumniNo,
  Home,
  DrawerMenu,
  Messages,
  CoomingSoon,
  MySchoolScreen,
  Reminders,
} from '../../../containers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as userActions from '../../../actions/user-actions-types';
import {
  NavigationContainer,
  useIsFocused,
  DrawerActions,
  useFocusEffect,
} from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const TabBarCustomButton = ({
  accessibilityLabel,
  accessibilityState,
  children,
  onPress,
}) => {
  var isSelected = accessibilityState.selected;

  if (isSelected) {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <View style={{flexDirection: 'row', position: 'absolute', top: 0}}>
          <View style={{flex: 1, backgroundColor: '#ffffff'}}></View>
          <Svg width={75} height={61} viewBox="0 0 75 61">
            <Path
              d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
              fill={'#ffffff'}
            />
          </Svg>
          <View style={{flex: 1, backgroundColor: '#ffffff'}}></View>
        </View>

        {/* {accessibilityLabel == "Reminders_Tab, tab, 3 of 3" ? <View
          style={{
            position: 'absolute',
            marginTop: Platform.OS == 'ios' ? 2 : 5,
            right: 23,
            alignSelf: 'flex-end',
            borderRadius: 15,
            backgroundColor: '#00B200',
            width: Platform.OS == 'ios' ? 20 : 18,
            height: Platform.OS == 'ios' ? 20 : 18,
          }}>
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 12,
              textAlign: 'center',
              fontWeight: 'bold',
              marginTop: Platform.OS == 'ios' ? 2 : 0,
            }}>
            {' '}
            {'0'}{' '}
          </Text>
        </View> : null} */}

        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            //  top: -22.5,
            zIndex: 20,
            justifyContent: 'center',
            alignItems: 'center',
            width: 45,
            height: 45,
            borderRadius: 25,
            backgroundColor: 'rgb(70,50,103)',
            elevation: 3,
          }}
          onPress={onPress}>
          {children}
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          flex: 1,
          height: 60,
          backgroundColor: '#ffffff',
        }}
        onPress={onPress}>
        {children}
      </TouchableOpacity>
    );
  }
};

const CustomTabBar = () => {
  const dispatch = useDispatch();
  const [getcount, set_Count] = useState('0');
  const isFocused = useIsFocused();
  const isInitialMount = useRef(true);

  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,

        style: {
          borderTopWidth: 0,
          backgroundColor: 'transparent',
          elevation: 0,
        },
      }}
      initialRouteName={'CoomingSoon_Tab'}>
      <Tab.Screen
        name="CoomingSoon_Tab"
        component={CoomingSoon}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({focused}) => {
            return (
              <Icon
                name="home"
                size={24}
                color={focused ? '#ffffff' : 'gray'}
              />
            );
          },
          tabBarButton: props => {
            return <TabBarCustomButton {...props} />;
          },
        }}
      />

      <Tab.Screen
        name="MySchool_Tab"
        component={MySchoolScreen}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({focused}) => {
            return (
              <Icon
                name="book-open"
                size={24}
                color={focused ? '#ffffff' : 'gray'}
              />
            );
          },
          tabBarButton: props => {
            return <TabBarCustomButton {...props} />;
          },
        }}
      />

      <Tab.Screen
        name="Messages_Tab"
        component={Messages}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({focused}) => {
            return (
              <Icon
                name="message-square"
                size={24}
                color={focused ? '#ffffff' : 'gray'}
              />
            );
          },
          tabBarButton: props => {
            return <TabBarCustomButton {...props} />;
          },
        }}
      />

      {/* <Tab.Screen
        name="Reminders_Tab"
        component={Reminders}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ focused }) => {
            return (

              <View>

                <Icon
                  name="clock"
                  size={24}
                  color={focused ? '#ffffff' : 'gray'}
                />

                {focused == true ? <View
                  style={{
                    position: 'absolute',
                    marginTop: Platform.OS == 'ios' ? 2 : 0,
                    left: 25,
                    alignSelf: 'flex-end',
                    borderRadius: 15,
                    backgroundColor: '#00B200',
                    width: Platform.OS == 'ios' ? 20 : 18,
                    height: Platform.OS == 'ios' ? 20 : 18,
                    bottom: 15

                  }}>
                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontSize: 12,
                      textAlign: 'center',
                      fontWeight: 'bold',
                      marginTop: Platform.OS == 'ios' ? 2 : 0,
                    }}>
                    {' '}
                    {'0'}{' '}
                  </Text>
                </View> : <View
                  style={{
                    position: 'absolute',
                    marginTop: Platform.OS == 'ios' ? 2 : 5,
                    left: 15,
                    alignSelf: 'flex-end',
                    borderRadius: 15,
                    backgroundColor: '#00B200',
                    width: Platform.OS == 'ios' ? 20 : 18,
                    height: Platform.OS == 'ios' ? 20 : 18,
                    bottom: 15
                  }}>
                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontSize: 12,
                      textAlign: 'center',
                      fontWeight: 'bold',
                      marginTop: Platform.OS == 'ios' ? 2 : 0,
                    }}>
                    {' '}
                    {getcount}{' '}
                  </Text>
                </View>}
              </View>

            );
          },
          tabBarButton: props => {
            return <TabBarCustomButton {...props} />;
          },
        }}
      /> */}
    </Tab.Navigator>
  );
};

export default CustomTabBar;
