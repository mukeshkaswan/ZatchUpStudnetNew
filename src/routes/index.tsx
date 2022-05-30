import React, { useEffect, useState } from "react";
import { createStackNavigator, CardStyleInterpolators, TransitionPresets } from "@react-navigation/stack";
import AuthStack from "./AuthStack";
import { LoginScreen, SignUpScreen, Otp, ForgotPassword, eKYC, eKycSuccess, EIInformation, EiInfoSave, Approval, SelectStudent, CurrentSchoolinfo, Onboarded, EducationProfile, EIconfirmation, AddCourseDetailsOthers, AddMoreCourseDetailsOthers, OtpForgot, Personalinfo, OtpLogin, AlumniNo, Home, DrawerMenu } from "../containers";
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

const Stack = createStackNavigator();

const config = {
  animation: 'timing',
  config: {
    stiffness: 1000,
    damping: 50,
    mass: 3,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

let Navigator = () => {
  return (
  
    <Stack.Navigator screenOptions={{
      headerShown: false, gestureDirection: 'horizontal',
      ...TransitionPresets.SlideFromRightIOS
    }} animation="fade" headerMode='screen'  >
      <Stack.Screen name="AuthStack" component={AuthStack} />
    </Stack.Navigator>
  );
};

export default Navigator;