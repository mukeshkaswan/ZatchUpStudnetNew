import React from 'react';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
import { LoginScreen, SignUpScreen, Otp, ForgotPassword, eKYC, eKycSuccess, EIInformation, EiInfoSave, Approval, SelectStudent, CurrentSchoolinfo, Onboarded, EducationProfile, EIconfirmation, AddCourseDetailsOthers, AddMoreCourseDetailsOthers, OtpForgot, Personalinfo, OtpLogin, AlumniNo, Home, DrawerMenu } from "../../../containers";
import CustomTabBar from '../CustomTab'

const Drawer = createDrawerNavigator();


const DrawerNav = () => {
    return (
        <Drawer.Navigator
            drawerType="slide"
            drawerContent={(props) => <DrawerMenu {...props} />}
            initialRouteName="Home">
            <Drawer.Screen name="Home" component={CustomTabBar} />
            {/* <Drawer.Screen name="Home_Tab" component={CustomTab} /> */}
            {/* <Drawer.Screen name="Notifications" component={eKYC} />
      <Drawer.Screen name="Reminders" component={eKycSuccess} />
      <Drawer.Screen name='MessagesMain' component={Approval} /> */}
            {/* <Drawer.Screen name='Notifications' component={Notifications} /> */}
        </Drawer.Navigator>
    );
};

export default DrawerNav;
