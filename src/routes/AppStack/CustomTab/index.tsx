import React, {useMemo, useRef} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';
import Svg, {Path} from 'react-native-svg';
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
} from '../../../containers';

// import AnimatedTabBar, { TabsConfigsType } from 'curved-bottom-navigation-bar';

// const AnimatedIcon = Animated.createAnimatedComponent(Icon);

const Tab = createBottomTabNavigator();

const TabBarCustomButton = ({accessibilityState, children, onPress}) => {
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
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,

        style: {
          borderTopWidth: 0,
          backgroundColor: 'transparent',
          elevation: 0,
          // paddingBottom: 20,
          //  paddingTop: 25,
        },
      }}
      initialRouteName={'Home_Tab'}>
      <Tab.Screen
        name="Home_Tab"
        component={CoomingSoon}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Icon
                name="calendar"
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
      <Tab.Screen
        name="MySchool_Tab"
        component={MySchoolScreen}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Icon
                name="repeat"
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
        name="MessagesMain_Tab"
        component={Messages}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Icon
                name="clock"
                size={24}
                color={focused ? '#ffffff' : 'gray'}
              />
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
