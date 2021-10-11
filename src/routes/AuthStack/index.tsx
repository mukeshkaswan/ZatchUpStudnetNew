import React from "react";
import { createStackNavigator, CardStyleInterpolators, TransitionPresets } from "@react-navigation/stack";
import { LoginScreen, SignUpScreen, Otp, ForgotPassword, eKYC, eKycSuccess, EIInformation, EiInfoSave, Approval, SelectStudent, CurrentSchoolinfo, Onboarded, EducationProfile, EIconfirmation, AddCourseDetailsOthers, AddMoreCourseDetailsOthers, OtpForgot, Personalinfo, OtpLogin, AlumniNo, Home, DrawerMenu, Messages, EducationProfileEdit, AlumniNoEdit, CoomingSoon, ResetPassword, ContactUs, Notifications ,TeacherMessageChat,MySchoolScreen} from "../../containers";
const Stack = createStackNavigator();
import Splash from '..//../containers/AuthScreens/Splash';
import DrawerNav from '../AppStack/DrawerStack';

function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName={'Splash'} screenOptions={{
        gestureDirection: 'horizontal',
        ...TransitionPresets.SlideFromRightIOS
      }}>
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ header: () => null }}
      />

      <Stack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{ header: () => null }}
      />

      <Stack.Screen
        name="Otp"
        component={Otp}
        options={{ header: () => null }}
      />

      <Stack.Screen
        name="eKYC"
        component={eKYC}
        options={{ header: () => null }}
      />

      <Stack.Screen
        name="eKycSuccess"
        component={eKycSuccess}
        options={{ header: () => null }}
      />

      <Stack.Screen
        name="EIInformation"
        component={EIInformation}
        options={{ header: () => null }}
      />

      <Stack.Screen
        name="EiInfoSave"
        component={EiInfoSave}
        options={{ header: () => null }}
      />

      <Stack.Screen
        name="Approval"
        component={Approval}
        options={{ header: () => null }}
      />

      <Stack.Screen
        name="SelectStudent"
        component={SelectStudent}
        options={{ header: () => null }}
      />

      <Stack.Screen
        name="CurrentSchoolinfo"
        component={CurrentSchoolinfo}
        options={{ header: () => null }}
      />

      <Stack.Screen
        name="Onboarded"
        component={Onboarded}
        options={{ header: () => null }}
      />


      <Stack.Screen
        name="EducationProfile"
        component={EducationProfile}
        options={{ header: () => null }}
      />


      <Stack.Screen
        name="EIconfirmation"
        component={EIconfirmation}
        options={{ header: () => null }}
      />

      <Stack.Screen
        name="AddCourseDetailsOthers"
        component={AddCourseDetailsOthers}
        options={{ header: () => null }}
      />

      <Stack.Screen
        name="AddMoreCourseDetailsOthers"
        component={AddMoreCourseDetailsOthers}
        options={{ header: () => null }}
      />

      <Stack.Screen
        name="OtpForgot"
        component={OtpForgot}
        options={{ header: () => null }}
      />

      <Stack.Screen
        name="Personalinfo"
        component={Personalinfo}
        options={{ header: () => null }}
      />

      <Stack.Screen
        name="OtpLogin"
        component={OtpLogin}
        options={{ header: () => null }}
      />

      <Stack.Screen
        name="AlumniNo"
        component={AlumniNo}
        options={{ header: () => null }}
      />

      <Stack.Screen
        name="Home"
        component={DrawerNav}
        options={{ headerShown: false, }}
      />

      <Stack.Screen
        name="Messages"
        component={Messages}
        options={{ header: () => null }}
      />


      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{ header: () => null }}
      />

      <Stack.Screen
        name="EducationProfileEdit"
        component={EducationProfileEdit}
        options={{ header: () => null }}
      />

      <Stack.Screen
        name="AlumniNoEdit"
        component={AlumniNoEdit}
        options={{ header: () => null }}
      />

      <Stack.Screen
        name="CoomingSoon"
        component={CoomingSoon}
        options={{ header: () => null }}
      />


      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{ header: () => null }}
      />

      <Stack.Screen
        name="ContactUs"
        component={ContactUs}
        options={{ header: () => null }}
      />

      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={{ header: () => null }}
      />
       <Stack.Screen
        name="TeacherMessageChat"
        component={TeacherMessageChat}
        options={{ header: () => null }}
      />
  
{/* <Stack.Screen
        name="messagechat"
        component={TeacherMessageChat}
        options={{ header: () => null }}
      /> */}
 
 
    </Stack.Navigator>
  );
}

export default AuthStack;