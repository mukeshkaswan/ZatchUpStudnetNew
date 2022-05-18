import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
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
  MySchoolScreen,
} from '../../../containers';
import CustomTabBar from '../CustomTab';

const Drawer = createDrawerNavigator();

const DrawerNav = () => {
  return (
    <Drawer.Navigator
      drawerType="slide"
      drawerContent={props => <DrawerMenu {...props} />}
      initialRouteName="CoomingSoon">
      <Drawer.Screen name="CoomingSoon" component={CustomTabBar} />
    </Drawer.Navigator>
  );
};

export default DrawerNav;
