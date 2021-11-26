import {createAction} from 'redux-actions';

// this is for login with Email
export const EMAILLOGIN = 'EMAILLOGIN';
export const emailLogin = createAction(EMAILLOGIN);
// export const SETTINGSTATUS = 'SETTINGSTATUS';
// export const settingStatus = createAction(SETTINGSTATUS);
// this is for  setting personal info setting
export const UPDATEPERSONALINFO = 'UPDATEPERSONALINFO';
export const updatePersonalinfo = createAction(UPDATEPERSONALINFO);
// this is for login success
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const loginSuccess = createAction(LOGIN_SUCCESS);
// this is for otplogin verify
export const OTP_SUCCESS = 'OTP_SUCCESS';
export const otpSuccess = createAction(OTP_SUCCESS);
// this is for SignUp New User
export const REGISTER_USER = 'REGISTER_USER';
export const registerUser = createAction(REGISTER_USER);
// this is for SignUp success
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const registerSuccess = createAction(REGISTER_SUCCESS);
// this is for OTP SignUp success
export const OTP_REGISTER_SUCCESS = 'OTP_REGISTER_SUCCESS';
export const registerOtpSuccess = createAction(OTP_REGISTER_SUCCESS);
// this is for OTP SignUp success
export const KYC_SUCCESS = 'KYC_SUCCESS';
export const KycSuccess = createAction(KYC_SUCCESS);
// this is for Get States data success
export const GET_STATES = 'GET_STATES';
export const getStates = createAction(GET_STATES);
// this is for Get City data success
export const GET_CITY = 'GET_CITY';
export const getCity = createAction(GET_CITY);
// this is for Get School data success
export const GET_SCHOOL = 'GET_SCHOOL';
export const getSchool = createAction(GET_SCHOOL);
// this is for Get ADD EI data success
export const ADD_EI = 'ADD_EI';
export const getAddEi = createAction(ADD_EI);
// this is for Get Re-send Otp data success
export const RESENDOTP = 'RESENDOTP';
export const getResendotp = createAction(RESENDOTP);
// this is for Get Course-list data success
export const COURSELIST = 'COURSELIST';
export const getCourselist = createAction(COURSELIST);
// this is for Get Standard-list data success
export const STANDARD = 'STANDARD';
export const getStandard = createAction(STANDARD);
// this is for Get Standard-list-Class data success
export const STANDARDCLASS = 'STANDARDCLASS';
export const getStandardClass = createAction(STANDARDCLASS);
// this is for Get Add-registered-ei-course data success
export const ADDREGISTEREDEICOURSE = 'ADDREGISTEREDEICOURSE';
export const getAddRegisteredEiCourse = createAction(ADDREGISTEREDEICOURSE);
// this is for Get Add-registered-ei-course data success
export const EICOURSECONFIRMATIONLIST  = 'EICOURSECONFIRMATIONLIST';
export const getEiCourseConfirmationList  = createAction(EICOURSECONFIRMATIONLIST);
// this is for Get Edit Course List Info success
export const EDITCOURSELIST = 'EDITCOURSELIST';
export const getEditCourseList  = createAction(EDITCOURSELIST);
// this is for Get Add Course By User Info success
export const ADDCOURSEBYUSER = 'ADDCOURSEBYUSER';
export const getAddCourseByUser  = createAction(ADDCOURSEBYUSER);
// this is for Get Addmission no by school User Info success
export const GETADDMISSIONNODETAILBYSCHOOL = 'GETADDMISSIONNODETAILBYSCHOOL';
export const getAddmissionNoBySchool  = createAction(GETADDMISSIONNODETAILBYSCHOOL);
// this is for Upload File User Info success
export const UPLOADFILE = 'UPLOADFILE';
export const getUploadFile  = createAction(UPLOADFILE);
// this is for get admin/verify_reset_password/
export const ADMINVEROFYRESETPASSWORD = 'ADMINVEROFYRESETPASSWORD';
export const getAdminVerifyResetPassword  = createAction(ADMINVEROFYRESETPASSWORD);
// this is for Get reg-step-count data success
export const REGSTEPCOUNT = 'REGSTEPCOUNT';
export const getRegStepCount = createAction(REGSTEPCOUNT);
// this is for Get Delete Course data success
export const DELETESCHOOLCOURSE = 'DELETESCHOOLCOURSE';
export const getDeleteCourseData = createAction(DELETESCHOOLCOURSE);
// this is for Get Delete Course data success
export const CHECKUSEREKYC = 'CHECKUSEREKYC';
export const getCheckUserKyc = createAction(CHECKUSEREKYC);
// this is for Get Auth User Info success
export const AUTHUSERINFO = 'AUTHUSERINFO';
export const getAuthUserInfo = createAction(AUTHUSERINFO);
export const GETREMINDERS = 'GETREMINDERS';
export const getReminders = createAction(GETREMINDERS);
// this is for Get Add Profile Pic Info success
export const ADDPROFILEPICINFO = 'ADDPROFILEPICINFO';
export const getAddProfilePicInfo = createAction(ADDPROFILEPICINFO);

// this is for Get Edit Standard List Info success
export const EDITSTANDARD = 'EDITSTANDARD';
export const getStandardEdit = createAction(EDITSTANDARD);

// this is for Get Add Course By User Info success
export const ADDPASTEICOURSE = 'ADDPASTEICOURSE';
export const getAddPastEiCourse = createAction(ADDPASTEICOURSE);

// this is for Get Course List Other User Info success
export const GETCOURSELISTOTHER = 'GETCOURSELISTOTHER';
export const getCourselistOther = createAction(GETCOURSELISTOTHER);

// this is for get Admin Forgot Password
export const ADMINFORGOTPASSWORD = 'ADMINFORGOTPASSWORD';
export const getAdminForgotPassword = createAction(ADMINFORGOTPASSWORD);

// this is for get admin/set new password/
export const SETNEWPASSWORD = 'SETNEWPASSWORD';
export const getAdminSetNewPassword = createAction(SETNEWPASSWORD);

// this is for get  SCHOOL ZATCHUP ID/
export const SCHOOLZATCHUPID = 'SCHOOLZATCHUPID';
export const getSchoolZatchUpId = createAction(SCHOOLZATCHUPID);

// this is for get Student Education Profile /
export const STUDENTEDUCATIONPROFILE = 'STUDENTEDUCATIONPROFILE';
export const getStudentEducationProfile = createAction(STUDENTEDUCATIONPROFILE);

// this is for get Notification Fetch List /
export const NOTIFICATIONFETCHLIST = 'NOTIFICATIONFETCHLIST';
export const getNotificationFetch = createAction(NOTIFICATIONFETCHLIST);

// this is for get Reset Password /
export const RESETPASSWORD = 'RESETPASSWORD';
export const getResetPassword = createAction(RESETPASSWORD);

// this is for logOut user 
// this is for logOut user
export const LOGOUT_USER = 'LOGOUT_USER';
export const logoutUser = createAction(LOGOUT_USER);

// this is for logOut user 
export const SKIPPED = 'SKIPPED';
export const getskipped = createAction(SKIPPED);

// this is for edit standard course user 
export const EDITCOURSESTANDARD = 'EDITCOURSESTANDARD';
export const geteditcoursestandard = createAction(EDITCOURSESTANDARD);

// this is for edit standard course user 
export const EDITCOURSESTANDARDDROPDOWN = 'EDITCOURSESTANDARDDROPDOWN';
export const geteditcoursestandarddropdown = createAction(EDITCOURSESTANDARDDROPDOWN);


// this is for class List By Standard iD user 
export const CLASSLISTBYSTANDARDID = 'CLASSLISTBYSTANDARDID';
export const getClassListByStandard = createAction(CLASSLISTBYSTANDARDID);
