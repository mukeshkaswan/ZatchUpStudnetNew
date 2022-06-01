import {put, takeLatest, all, call, takeEvery} from 'redux-saga/effects';
import {
  // LOGIN_SUCCESS,
  EMAILLOGIN,
  loginSuccess,
  OTP_SUCCESS,
  REGISTER_USER,
  registerSuccess,
  OTP_REGISTER_SUCCESS,
  GET_STATES,
  KYC_SUCCESS,
  GET_CITY,
  GET_SCHOOL,
  ADD_EI,
  RESENDOTP,
  COURSELIST,
  STANDARD,
  STANDARDCLASS,
  ADDREGISTEREDEICOURSE,
  EICOURSECONFIRMATIONLIST,
  REGSTEPCOUNT,
  DELETESCHOOLCOURSE,
  CHECKUSEREKYC,
  AUTHUSERINFO,
  GETREMINDERS,
  ADDPROFILEPICINFO,
  ADDPROFILEPICINFOSKIP,
  EDITCOURSELIST,
  EDITSTANDARD,
  ADDCOURSEBYUSER,
  ADDPASTEICOURSE,
  GETADDMISSIONNODETAILBYSCHOOL,
  GETCOURSELISTOTHER,
  UPLOADFILE,
  ADMINFORGOTPASSWORD,
  ADMINVEROFYRESETPASSWORD,
  SETNEWPASSWORD,
  SCHOOLZATCHUPID,
  STUDENTEDUCATIONPROFILE,
  RESETPASSWORD,
  NOTIFICATIONFETCHLIST,
  SKIPPED,
  EDITCOURSESTANDARD,
  CLASSLISTBYSTANDARDID,
  EDITCOURSESTANDARDDROPDOWN,
  UPDATEPERSONALINFO,
  ADDUSERSTEPSEVEN,
  USERCOURSECONFIRMATION,
  USERDELETECOURSESTANDARD,
  CITYLISTSEARCH,
  ADDCITYSTATEFORUSER,
  STARTCLASSCOURSELIST,
  SCHOOLLISTFORSTARCLASS,
  COURSEPREVIEW,
  STARCLASSLECTURELISTBYCOURSEID,
  STARCLASSLECTURELISTBYCOURSEIDCOURSEPREVIEW,
  LECTUREHISTORY,
  GETUPDATESCHOOLCOURSEDETAILBYUSER,
  SEARCHLISTFORSCHOOLSTUDENT,
  PROFILEDETAILOFUSER,
  PROFILEDETAILOFSCHOOL,
  GETADMISSIONNUMBERDETAILBYSCHOOL,
  USERCOURSEDELETENOT,
  USEREDITADMISSIONROLLNO,
  GETALLWORKDEPARTMENTS,
  GETCOUNTRY,
  USEREDITADMISSIONROLLNOTWO,
  CHATTEACHERLIST,
  PENDINGUSERCHANGEDETAILLIST,
  DELETEPENDINGUSERREQUEST,
  UPLOADEKYCFORDETAILCHANGE,
  USERPENDINGCOURSELISTOFUSER,
  USERDELETEPENDINGCOURSEDETAIL,
  USERCHANGECOURSESTANDARDDETAILBYSTUDENTBYID,
  USERCOURSEDELETEBEFORECONFORMATION,
  USERCOURSECONFIRM,
  USERGETSTATE,
  USERGETCITY,
  USERWORKDETAIL,
  DELETEWORKDETAIL,
  UPLOADEKYCFORDETAILCHANGES,
  UPLOADEKYCFORDETAILCHANGESDOB,
  USERCOURSECONFIRMATIONREVERIFY,
  ADDPROFILEPICINFOEDU,
  OTP_SUCCESS_SKIP,
  REQUESTCHANGEUSERDETAIL,
  REQUESTCHANGEUSERDETAILVERIFYOTP,
  RESENDOTPEIDETAILCHANGE,
  REQUESTCHANGEUSERDETAILEMAIL,
  REQUESTCHANGEUSERDETAILVERIFYOTPEMAIL,
  RESENDOTPEIDETAILCHANGEEMAIL,
  SCHOOLISTONUSER,
  USERSETTINGSTATUS,
  USERSETTINGSTATUSPOST,
  EIDETAILFORALREADYSTUDENT,
  EIDETAILFORALREADYSTUDENTMULTI,
  SENTFORAPPROVALVIEWSTATUS,
  LOGOUTVIEWSTATUS,
  PROFILEDELETEZATCHUP,
  CHANGESTATUSACCEPTEDBYUSER,
  CHANGESTATUSACCEPTEDBYUSERMULTI,
  GETSCHOOLDETAILSCHOOLID,

  // Add new
  POSTOFUSER,
  LIKEUNLIKEPOST,
  COMMENTPOST,
  COMMENTLIKEUNLIKE,
  GETPOSTDETAIL,
  REPLYCOMMENT,
  GETUSERPROFILE,
  GETSCHOOLPROFILE,
  GETSUGGESTIONS,
  GETFOLLOWREQUEST,
  GETUSERNOTIFICATION,
  GETUSERCOVERMEDIAPIC,
  GETALUMIGALLERYDETAIL,
  CHANGEFOLLOWREQUESTSTATUS,
  FOLLOWUSER,
  GETFOLLOWERS,
  GETFOLLOWING,
  GETREPORTDATA,
  REPORTPOST,
  UPLOADPOSTIMAGEVIDEOS,
  REPORTPROFILE,
  GETREPORTDATAUSER,
  CREATEPOST,
  DELETEPOST,
  GETUSERALLPOST,
  DELETECOMMENT,
  CHANGEPROFILEIMAGE,
  GETPRIVACYSETTING,
  SOCIALPRIVACYSETTING,
  CHANGESOCIALMEDIASTATUS,
  BLOACKUSER,
  GETBLOCKLIST,
  CHANGEPRIVATESTATUS,
} from '../actions/user-actions-types';
import httpClient from './http-client';
import HttpClientPost from './http-client-post';

import Toast from 'react-native-simple-toast';

// http://172.105.61.231:3000/api/user/user-verify/
/***************************User Login Auth Segas*******************************/

function* emailLogin({payload: {data, callback}}) {
  console.warn('data in saga', data);
  const formdata = new FormData();
  formdata.append('username', data.username);
  formdata.append('password', data.password);

  // const params = {
  //   username: data.username,
  //   password: data.password,

  // };

  const payload = {
    data: formdata,
    method: 'POST',
    url: 'user/login/',
  };
  const {result, error} = yield call(httpClient, payload);
  if (!error) {
    if (result) {
      console.log('login result', JSON.stringify(result, undefined, 2));
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************Upadate Personal Info*******************************/

function* updatePersonalinfo({payload: {data, callback}}) {
  console.warn('data in saga', data);

  const params = {
    father_name: data.father_name,
    mother_name: data.mother_name,
    pronoun: data.pronoun,
    gender: data.gender,
    profile_pic: data.profile_pic,
    custom_gender: data.custom_gender,
  };

  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    data: params,
    method: 'POST',
    url: 'user/get-update-personal-info/',
  };
  const {result, error} = yield call(httpClient, payload);
  if (!error) {
    if (result) {
      //  console.log('login result', JSON.stringify(result, undefined, 2));
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************User Register Auth Segas*******************************/

function* registerUser({payload: {data, callback}}) {
  console.warn('data in saga', data);
  //const { email, first_name, last_name, is_term_cond, profile, password } = data;
  // var formdata = new FormData();
  // formdata.append("username", email);
  // formdata.append("email", email);
  // formdata.append("password", password);
  // formdata.append("first_name", first_name);
  // formdata.append("last_name", last_name);
  // formdata.append("phone", "");
  // formdata.append("profile", JSON.stringify({
  //   "dob": "2004-10-15",
  //   "gender": "M",
  //   "pronoun": "He"
  // }));
  // formdata.append("is_term_cond", is_term_cond);

  const payload = {
    data: data,
    method: 'POST',
    url: 'user/register/',
  };
  const {result, error} = yield call(httpClient, payload);
  if (!error) {
    if (result) {
      // console.log('register result', JSON.stringify(result, undefined, 2));
      callback({result, error});
      // console.log('result',result.error.email[0]);
      //  Toast.show(result.error.email[0]);

      // Toast.show(result.error);
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************User KYC Auth Segas*******************************/

function* KycSuccess({payload: {data, callback}}) {
  console.warn('data in saga', data);
  let formdata = new FormData();
  formdata.append('kyc_type', data.kyc_type);
  formdata.append('kyc_id_no', data.kyc_id_no);
  formdata.append('kyc_name', data.kyc_name);
  formdata.append('kyc_dob', data.kyc_dob);
  formdata.append('kyc_document', data.kyc_document);
  formdata.append('kyc_document_back', data.kyc_document_back);

  // formdata.append('kyc_type', 'ADHAR');
  // formdata.append('kyc_id_no', '1234567890');
  // formdata.append('kyc_name', 'mukesh');
  // formdata.append('kyc_dob', '2020-5-15');
  // formdata.append('kyc_document', data.kyc_document);
  // formdata.append('kyc_document_back', data.kyc_document_back);
  //  console.warn('data in saga-------------------->', formdata);
  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    data: formdata,
    method: 'POST',
    url: 'user/kyc-upload/',
  };
  // console.warn('data in saga----4324---------------->', payload);
  const {result, error} = yield call(httpClient, payload);
  //  console.log('kyc error', JSON.stringify(error, undefined, 2));
  if (!error) {
    if (result) {
      //  console.log('kyc result', JSON.stringify(result, undefined, 2));
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************User OTP Auth Segas*******************************/

function* otpSuccess({payload: {data, callback}}) {
  console.warn('data in saga', data);
  const formdata = new FormData();
  formdata.append('firebase_id', data.firebase_id);
  formdata.append('phone_otp', data.phone_otp);
  formdata.append('username', data.username);
  formdata.append('is_skip', 'false');
  formdata.append('is_mobile', true);

  const payload = {
    data: formdata,
    method: 'POST',
    url: 'user/verify-otp/',
  };
  const {result, error} = yield call(httpClient, payload);
  if (!error) {
    if (result) {
      console.log('otp result', JSON.stringify(result, undefined, 2));
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************User OTP Auth Segas*******************************/

function* getResendotp({payload: {data, callback}}) {
  console.warn('data in saga', data);
  const formdata = new FormData();
  formdata.append('username', data.username);

  const payload = {
    data: formdata,
    method: 'POST',
    url: 'user/resend-otp/',
  };
  const {result, error} = yield call(httpClient, payload);
  if (!error) {
    if (result) {
      console.log('otp Re-Send result', JSON.stringify(result, undefined, 2));
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************User registerOtpSuccess OTP Auth Segas*******************************/

function* registerOtpSuccess({payload: {data, callback}}) {
  console.warn('data in saga', data);
  const formdata = new FormData();
  formdata.append('username', data.username);
  formdata.append('verify_otp_no', data.verify_otp_no);
  formdata.append('is_skip', 'false');

  const payload = {
    data: formdata,
    method: 'POST',
    url: 'user/user-verify/',
  };
  const {result, error} = yield call(httpClient, payload);
  if (!error) {
    if (result) {
      // console.log(
      //   'otp Register success data  result',
      //   JSON.stringify(result, undefined, 2),
      // );
      callback({result, error});
      //console.log('result',result.error);
      //  Toast.show(result.error);

      //console.log('error',result.error);

      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

// function* registerUser({ payload: { data, callback } }) {
//   console.warn('data in saga', data);
//   const formdata = new FormData();
//   formdata.append("username", data.Email);
//   formdata.append("email", data.Email);
//   formdata.append("password", data.Password);
//   formdata.append("first_name", data.Firstname);
//   formdata.append("last_name", data.Lastname);
//   formdata.append("phone", "");
//   formdata.append("profile", { "dob": data.date_copy, "gender": data.Gender, "pronoun": data.pronoun });
//   formdata.append("is_term_cond", data.allSelected);

//   const payload = {
//     data: formdata,
//     method: 'POST',
//     url: 'user/register/',
//   };
//   const { result, error } = yield call(httpClient, payload);
//   if (!error) {
//     if (result) {
//       console.log('Register result', JSON.stringify(result, undefined, 2))
//       callback({ result, error });

//     } else {
//       Toast.show(result.message);
//     }
//   }
// }

/***************************User GET States Auth Segas*******************************/

function* getStates({payload: {data, callback}}) {
  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      // "Content-Type": "application/json"
    },
    method: 'GET',
    url: 'user/getallstate/',
  };
  const {result, error} = yield call(httpClient, payload);
  callback({result, error});
  if (!error) {
    if (result) {
      // console.log('get States result', JSON.stringify(result, undefined, 2));
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************User GET City Auth Segas*******************************/

function* getCity({payload: {data, callback}}) {
  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      // "Content-Type": "application/json"
    },
    method: 'GET',
    url: `user/getcitybystateid/${data.id}/`,
  };
  const {result, error} = yield call(httpClient, payload);
  callback({result, error});
  if (!error) {
    if (result) {
      // console.log('get City result', JSON.stringify(result, undefined, 2));
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************User GET School Auth Segas*******************************/

function* getSchool({payload: {data, callback}}) {
  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      // "Content-Type": "application/json"
    },
    method: 'GET',
    url: `ei/getschoollistwithcity/${data.id}/`,
  };
  const {result, error} = yield call(httpClient, payload);
  callback({result, error});
  if (!error) {
    if (result) {
      //  console.log('get School result', JSON.stringify(result, undefined, 2));
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************User ADD EI Auth Segas*******************************/

function* getAddEi({payload: {data_update, callback}}) {
  console.warn('data in saga ADD EI', data_update);

  const payload = {
    headers: {
      Authorization: `Bearer ${data_update.token}`,
      'Content-Type': 'application/json',
    },
    data: data_update.data,
    method: 'POST',
    url: 'user/add-ei/',
  };
  const {result, error} = yield call(httpClient, payload);
  if (!error) {
    if (result) {
      // console.log('add ei result', JSON.stringify(result, undefined, 2));
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************User GET Course list Auth Segas*******************************/

function* getCourselist({payload: {data, callback}}) {
  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      // "Content-Type": "application/json"
    },
    method: 'GET',
    url: `user/get-course-list-for-userpanel/?school_id=${data.id}`,
  };
  const {result, error} = yield call(httpClient, payload);
  callback({result, error});
  if (!error) {
    if (result) {
      // console.log(
      //   'get Course list result',
      //   JSON.stringify(result, undefined, 2),
      // );
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************User GET Edit Course list Auth Segas*******************************/

function* getEditCourseList({payload: {data, callback}}) {
  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      // "Content-Type": "application/json"
    },
    method: 'GET',
    url: `user/get-course-list-for-userpanel/?school_id=${data.id}&edit_course_id=${data.edit_course_id}`,
  };
  const {result, error} = yield call(httpClient, payload);
  callback({result, error});
  if (!error) {
    if (result) {
      // console.log(
      //   'get Course list result',
      //   JSON.stringify(result, undefined, 2),
      // );
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************User GET Standard list Auth Segas*******************************/

function* getStandard({payload: {data, callback}}) {
  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      // "Content-Type": "application/json"
    },
    method: 'GET',
    url: `user/standard-list-by-courseid/?course_id= ${data.id}`,
  };
  const {result, error} = yield call(httpClient, payload);
  callback({result, error});
  if (!error) {
    if (result) {
      // console.log(
      //   'get Standard list result',
      //   JSON.stringify(result, undefined, 2),
      // );
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************User GET Standard Edit list Auth Segas*******************************/

function* getStandardEdit({payload: {data, callback}}) {
  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      // "Content-Type": "application/json"
    },
    method: 'GET',
    url: `user/standard-list-by-courseid/?course_id= ${data.id}`,
  };
  const {result, error} = yield call(httpClient, payload);
  callback({result, error});
  if (!error) {
    if (result) {
      // console.log(
      //   'get Standard list result',
      //   JSON.stringify(result, undefined, 2),
      // );
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************User GET Standard Class list Auth Segas*******************************/

function* getStandardClass({payload: {data, callback}}) {
  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      // "Content-Type": "application/json"
    },
    method: 'GET',
    //  url: `user/class-list-by-standardid/?standard_id= ${data.id}`,
    url: `user/class-list-by-standardid/?standard_id= ${data.id}`,
  };
  const {result, error} = yield call(httpClient, payload);
  callback({result, error});
  if (!error) {
    if (result) {
      // console.log(
      //   'get Standard list result',
      //   JSON.stringify(result, undefined, 2),
      // );
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************User get Add Registered Ei Course Auth Segas*******************************/

function* getAddRegisteredEiCourse({payload: {data_update, callback}}) {
  console.warn('data in saga ADD  Registered Course', data_update);

  const payload = {
    headers: {
      Authorization: `Bearer ${data_update.token}`,
      'Content-Type': 'application/json',
    },
    data: data_update.data,
    method: 'POST',
    url: 'user/add-registered-ei-course/',
    // redirect: 'follow'
  };
  console.warn('data in saga ADD  Registered Course------------->', payload);
  const {result, error} = yield call(httpClient, payload);
  if (!error) {
    if (result) {
      // console.log(
      //   'add Registered Course result',
      //   JSON.stringify(result, undefined, 2),
      // );
      callback({result, error});
      // const userToken = JSON.stringify(data).st result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************User GET Ei Course Confirmation List Auth Segas*******************************/

function* getEiCourseConfirmationList({payload: {data, callback}}) {
  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      //'Authorization': `Bearer ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxODI5LCJ1c2VybmFtZSI6InNkZmRzZmRmZ2RmZ2RmZEBnbWFpbC5jb20iLCJleHAiOjE2NDgwODc2NjksImVtYWlsIjoic2RmZHNmZGZnZGZnZGZkQGdtYWlsLmNvbSIsIm9yaWdfaWF0IjoxNjIyMTY3NjY5fQ.7WvxKra_SiUrogr5QUaehANDegDPJYfPN-f86sqMgjE'}`,
      // "Content-Type": "application/json"
    },
    method: 'GET',
    url: 'user/get-ei-course-confirmation-list/',
  };
  const {result, error} = yield call(httpClient, payload);
  callback({result, error});
  if (!error) {
    if (result) {
      // console.log(
      //   'get Ei Course Confirmation List result',
      //   JSON.stringify(result, undefined, 2),
      // );
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************User GET Step Count Auth Segas*******************************/

function* getRegStepCount({payload: {data, callback}}) {
  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    method: 'GET',
    url: 'user/reg-step-count/',
  };
  const {result, error} = yield call(httpClient, payload);
  callback({result, error});
  if (!error) {
    if (result) {
      // console.log(
      //   'get Step Count result',
      //   JSON.stringify(result, undefined, 2),
      // );
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************User Delete Course Data Auth Segas*******************************/

function* getDeleteCourseData({payload: {data, callback}}) {
  console.warn('data in saga Delete Course', data);
  const formdata = new FormData();
  formdata.append('school_id', data.school_id);

  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      //'Authorization': `Bearer ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxODI5LCJ1c2VybmFtZSI6InNkZmRzZmRmZ2RmZ2RmZEBnbWFpbC5jb20iLCJleHAiOjE2NDgwODc2NjksImVtYWlsIjoic2RmZHNmZGZnZGZnZGZkQGdtYWlsLmNvbSIsIm9yaWdfaWF0IjoxNjIyMTY3NjY5fQ.7WvxKra_SiUrogr5QUaehANDegDPJYfPN-f86sqMgjE'}`,
      'Content-Type': 'application/json',
    },
    data: formdata,
    method: 'POST',
    url: 'user/delete-school-course-detail-by-student/',
  };
  const {result, error} = yield call(httpClient, payload);
  if (!error) {
    if (result) {
      // console.log('Delete Course Result', JSON.stringify(result, undefined, 2));
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************User Delete Course Standard Data Auth Segas*******************************/

function* getDeleteCourseStandard({payload: {data, callback}}) {
  console.warn('data in saga Delete Course Standard', data);
  const formdata = new FormData();
  formdata.append('course_id', data.course_id);

  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      //'Authorization': `Bearer ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxODI5LCJ1c2VybmFtZSI6InNkZmRzZmRmZ2RmZ2RmZEBnbWFpbC5jb20iLCJleHAiOjE2NDgwODc2NjksImVtYWlsIjoic2RmZHNmZGZnZGZnZGZkQGdtYWlsLmNvbSIsIm9yaWdfaWF0IjoxNjIyMTY3NjY5fQ.7WvxKra_SiUrogr5QUaehANDegDPJYfPN-f86sqMgjE'}`,
      'Content-Type': 'application/json',
    },
    data: formdata,
    method: 'POST',
    url: 'user/delete-course-standard-detail-by-student/',
  };
  const {result, error} = yield call(httpClient, payload);
  if (!error) {
    if (result) {
      //console.log('Delete Course Standard Result', JSON.stringify(result, undefined, 2));
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************User Check User KYC  Segas*******************************/

function* getCheckUserKyc({payload: {data, callback}}) {
  console.warn('data in saga Check User Kyc', data);

  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      //'Authorization': `Bearer ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxODI5LCJ1c2VybmFtZSI6InNkZmRzZmRmZ2RmZ2RmZEBnbWFpbC5jb20iLCJleHAiOjE2NDgwODc2NjksImVtYWlsIjoic2RmZHNmZGZnZGZnZGZkQGdtYWlsLmNvbSIsIm9yaWdfaWF0IjoxNjIyMTY3NjY5fQ.7WvxKra_SiUrogr5QUaehANDegDPJYfPN-f86sqMgjE'}`,
      'Content-Type': 'application/json',
    },
    data: {},
    method: 'POST',
    url: 'user/check-user-ekyc/',
  };
  const {result, error} = yield call(httpClient, payload);
  if (!error) {
    if (result) {
      // console.log(
      //   'Check User Kyc Result',
      //   JSON.stringify(result, undefined, 2),
      // );
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************User Auth Info Segas*******************************/

function* getAuthUserInfo({payload: {data, callback}}) {
  console.warn('data in saga Auth User Info', data);

  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      //'Authorization': `Bearer ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxODI5LCJ1c2VybmFtZSI6InNkZmRzZmRmZ2RmZ2RmZEBnbWFpbC5jb20iLCJleHAiOjE2NDgwODc2NjksImVtYWlsIjoic2RmZHNmZGZnZGZnZGZkQGdtYWlsLmNvbSIsIm9yaWdfaWF0IjoxNjIyMTY3NjY5fQ.7WvxKra_SiUrogr5QUaehANDegDPJYfPN-f86sqMgjE'}`,
      'Content-Type': 'application/json',
    },
    //data: JSON.stringify(data.course_id),
    method: 'GET',
    url: 'ei/auth-user-info/',
  };
  const {result, error} = yield call(httpClient, payload);
  if (!error) {
    if (result) {
      // console.log(
      //   'Auth User Info Result',
      //   JSON.stringify(result, undefined, 2),
      // );
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}
/***************************User get reminders api s*******************************/

function* getReminders({payload: {data, callback}}) {
  console.warn('data in saga Auth User Info', data);

  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      //'Authorization': `Bearer ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxODI5LCJ1c2VybmFtZSI6InNkZmRzZmRmZ2RmZ2RmZEBnbWFpbC5jb20iLCJleHAiOjE2NDgwODc2NjksImVtYWlsIjoic2RmZHNmZGZnZGZnZGZkQGdtYWlsLmNvbSIsIm9yaWdfaWF0IjoxNjIyMTY3NjY5fQ.7WvxKra_SiUrogr5QUaehANDegDPJYfPN-f86sqMgjE'}`,
      'Content-Type': 'application/json',
    },
    //data: JSON.stringify(data.course_id),
    method: 'GET',
    url: 'user/get-all-reminders/?page_size=20',
  };
  const {result, error} = yield call(httpClient, payload);
  if (!error) {
    if (result) {
      // console.log(
      //   'Auth User Info Result',
      //   JSON.stringify(result, undefined, 2),
      // );
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************UserAdd Profile Pic Info Data Auth Segas*******************************/

function* getAddProfilePicInfo({payload: {data, callback}}) {
  console.warn('data in saga Add Profile Pic Info', data);
  const formdata = new FormData();
  formdata.append('mother_name', data.mother_name);
  formdata.append('father_name', data.father_name);
  formdata.append('profile_pic', data.profile_pic);

  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      //'Authorization': `Bearer ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxODI5LCJ1c2VybmFtZSI6InNkZmRzZmRmZ2RmZ2RmZEBnbWFpbC5jb20iLCJleHAiOjE2NDgwODc2NjksImVtYWlsIjoic2RmZHNmZGZnZGZnZGZkQGdtYWlsLmNvbSIsIm9yaWdfaWF0IjoxNjIyMTY3NjY5fQ.7WvxKra_SiUrogr5QUaehANDegDPJYfPN-f86sqMgjE'}`,
      'Content-Type': 'application/json',
    },
    data: formdata,
    method: 'POST',
    url: 'user/add-profile-pic-info/',
  };
  const {result, error} = yield call(httpClient, payload);
  if (!error) {
    if (result) {
      // console.log(
      //   'Add Profile Pic Info Result',
      //   JSON.stringify(result, undefined, 2),
      // );
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************User Add Profile Pic Info Skip Data Auth Segas*******************************/

function* getAddProfilePicInfoSkip({payload: {data, callback}}) {
  console.warn('data in saga Add Profile Pic Skip Info', data);
  // const formdata = new FormData();
  // formdata.append('mother_name',":");
  // formdata.append('father_name', ":");
  // formdata.append('profile_pic', ":");

  const datakey = {
    mother_name: '',
    father_name: '',
    profile_pic: '',
  };

  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      //'Authorization': `Bearer ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxODI5LCJ1c2VybmFtZSI6InNkZmRzZmRmZ2RmZ2RmZEBnbWFpbC5jb20iLCJleHAiOjE2NDgwODc2NjksImVtYWlsIjoic2RmZHNmZGZnZGZnZGZkQGdtYWlsLmNvbSIsIm9yaWdfaWF0IjoxNjIyMTY3NjY5fQ.7WvxKra_SiUrogr5QUaehANDegDPJYfPN-f86sqMgjE'}`,
      'Content-Type': 'application/json',
    },
    data: datakey,
    method: 'POST',
    url: 'user/add-profile-pic-info/',
  };
  const {result, error} = yield call(httpClient, payload);
  if (!error) {
    if (result) {
      // console.log(
      //   'Add Profile Pic Info Result',
      //   JSON.stringify(result, undefined, 2),
      // );
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************User Delete Course Data Auth Segas*******************************/

function* getAddProfilePicInfoEdu({payload: {data, callback}}) {
  console.warn('data in saga Add Profile Pic Info', data);

  const datakey = {
    profile_pic: data.profile_pic,
  };

  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      //'Authorization': `Bearer ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxODI5LCJ1c2VybmFtZSI6InNkZmRzZmRmZ2RmZ2RmZEBnbWFpbC5jb20iLCJleHAiOjE2NDgwODc2NjksImVtYWlsIjoic2RmZHNmZGZnZGZnZGZkQGdtYWlsLmNvbSIsIm9yaWdfaWF0IjoxNjIyMTY3NjY5fQ.7WvxKra_SiUrogr5QUaehANDegDPJYfPN-f86sqMgjE'}`,
      'Content-Type': 'application/json',
    },
    data: datakey,
    method: 'POST',
    url: 'user/add-profile-pic-info/',
  };
  const {result, error} = yield call(httpClient, payload);
  if (!error) {
    if (result) {
      // console.log(
      //   'Add Profile Pic Info Result',
      //   JSON.stringify(result, undefined, 2),
      // );
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************User Add Course By User Auth Segas*******************************/

function* getAddCourseByUser({payload: {data_update, callback}}) {
  console.warn('data in saga ADD  Course By User', data_update);

  const payload = {
    headers: {
      Authorization: `Bearer ${data_update.token}`,
      'Content-Type': 'application/json',
    },
    data: data_update.data,
    method: 'POST',
    url: 'user/add-course-by-user/',
    // redirect: 'follow'
  };
  //console.warn('data in saga ADD  Course By User------------->', payload);
  const {result, error} = yield call(httpClient, payload);
  if (!error) {
    if (result) {
      // console.log('add Course By User', JSON.stringify(result, undefined, 2));
      callback({result, error});
      // const userToken = JSON.stringify(data).st result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************User Add Past Course EI  By User Auth Segas*******************************/

function* getAddPastEiCourse({payload: {data_update, callback}}) {
  console.warn('data in saga ADD Past Course By User', data_update);

  const payload = {
    headers: {
      Authorization: `Bearer ${data_update.token}`,
      'Content-Type': 'application/json',
    },
    data: data_update.data,
    method: 'POST',
    url: '/user/add-past-registered-ei-course/',
    // redirect: 'follow'
  };
  //console.warn('data in saga ADD  Course By User------------->', payload);
  const {result, error} = yield call(httpClient, payload);
  if (!error) {
    if (result) {
      // console.log(
      //   'add Past Course By User',
      //   JSON.stringify(result, undefined, 2),
      // );
      callback({result, error});
      // const userToken = JSON.stringify(data).st result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************User Get Addmission No By School User Auth Segas*******************************/

function* getAddmissionNoBySchool({payload: {data, callback}}) {
  console.warn('data in saga Addmission no by school By User', data);

  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      'Content-Type': 'application/json',
    },
    data: data.data,
    method: 'POST',
    url: 'user/get-admission-number-detail-by-school/',
    // redirect: 'follow'
  };
  //console.warn('data in saga ADD  Course By User------------->', payload);
  const {result, error} = yield call(httpClient, payload);
  if (!error) {
    if (result) {
      // console.log(
      //   'Addmission no by school By User',
      //   JSON.stringify(result, undefined, 2),
      // );
      callback({result, error});
      // const userToken = JSON.stringify(data).st result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************User GET Course Other list Auth Segas*******************************/

function* getCourselistOther({payload: {data, callback}}) {
  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      // "Content-Type": "application/json"
    },
    method: 'GET',
    url: `user/get-usercourse-list/?school_id=${data.id}`,
  };
  const {result, error} = yield call(httpClient, payload);
  callback({result, error});
  if (!error) {
    if (result) {
      // console.log(
      //   'get Course list other result',
      //   JSON.stringify(result, undefined, 2),
      // );
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************User Get Upload File User Auth Segas*******************************/

function* getUploadFile({payload: {data, callback}}) {
  console.warn('data in saga Upload File By User', data);
  const formdata = new FormData();
  formdata.append('file_name', data.file_name);

  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      'Content-Type': 'application/json',
    },
    data: formdata,
    method: 'POST',
    url: '/ei/uploaddocsfile/',
    // redirect: 'follow'
  };
  //console.warn('data in saga ADD  Course By User------------->', payload);
  const {result, error} = yield call(httpClient, payload);
  if (!error) {
    if (result) {
      // console.log('Upload File User', JSON.stringify(result, undefined, 2));
      callback({result, error});
      // const userToken = JSON.stringify(data).st result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************User Get get Admin Forgot Password  User Auth Segas*******************************/

function* getAdminForgotPassword({payload: {data, callback}}) {
  console.warn('data in saga get Admin Forgot Password By User', data);
  const formdata = new FormData();
  formdata.append('email_or_phone', data.email_or_phone);

  const payload = {
    headers: {
      // "Authorization": `Bearer ${data.token}`,
      'Content-Type': 'application/json',
    },
    data: formdata,
    method: 'POST',
    url: 'admin/forgot-password/',
    // redirect: 'follow'
  };
  //console.warn('data in saga ADD  Course By User------------->', payload);
  const {result, error} = yield call(httpClient, payload);
  if (!error) {
    if (result) {
      // console.log(
      //   'get Admin Forgot Password User',
      //   JSON.stringify(result, undefined, 2),
      // );
      callback({result, error});
      // const userToken = JSON.stringify(data).st result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

function* getAdminVerifyResetPassword({payload: {data, callback}}) {
  console.warn('data in saga get Admin Verify Reset Password By User', data);
  const formdata = new FormData();
  formdata.append('email_or_phone', data.email_or_phone);
  formdata.append('code', data.code);

  const payload = {
    headers: {
      // "Authorization": `Bearer ${data.token}`,
      'Content-Type': 'application/json',
    },
    data: formdata,
    method: 'POST',
    url: 'admin/verify_reset_password/',
    // redirect: 'follow'
  };
  //console.warn('data in saga ADD  Course By User------------->', payload);
  const {result, error} = yield call(httpClient, payload);
  if (!error) {
    if (result) {
      // console.log(
      //   'get Admin Verify Reset Password User',
      //   JSON.stringify(result, undefined, 2),
      // );
      callback({result, error});
      // const userToken = JSON.stringify(data).st result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

function* getAdminSetNewPassword({payload: {data, callback}}) {
  console.warn('data in saga get Admin Set New Password By User', data);
  const formdata = new FormData();
  formdata.append('key', data.key);
  formdata.append('uid', data.uid);
  formdata.append('password', data.password);
  formdata.append('confirm_password', data.confirm_password);

  const payload = {
    headers: {
      // "Authorization": `Bearer ${data.token}`,
      'Content-Type': 'application/json',
    },
    data: formdata,
    method: 'POST',
    url: 'admin/set_new_password/',
    // redirect: 'follow'
  };
  //console.warn('data in saga ADD  Course By User------------->', payload);
  const {result, error} = yield call(httpClient, payload);
  if (!error) {
    if (result) {
      // console.log(
      //   'get Admin Set New Password User',
      //   JSON.stringify(result, undefined, 2),
      // );
      callback({result, error});
      // const userToken = JSON.stringify(data).st result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

function* getSchoolZatchUpId({payload: {data, callback}}) {
  console.warn('data in saga get ZatchUp ID  By User', data);
  const formdata = new FormData();
  formdata.append('zatchup_id', data.zatchup_id);

  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      'Content-Type': 'application/json',
    },
    data: formdata,
    method: 'POST',
    url: 'user/get-school-detail-zatchupid/',
    // redirect: 'follow'
  };
  //console.warn('data in saga ADD  Course By User------------->', payload);
  const {result, error} = yield call(httpClient, payload);
  if (!error) {
    if (result) {
      // console.log(
      //   'get Admin ZatchUp ID User',
      //   JSON.stringify(result, undefined, 2),
      // );
      callback({result, error});
      // const userToken = JSON.stringify(data).st result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************User GET Student Education Profile list Auth Segas*******************************/

function* getStudentEducationProfile({payload: {data, callback}}) {
  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      // "Content-Type": "application/json"
    },
    method: 'GET',
    url: 'user/student-education-profile/',
  };
  const {result, error} = yield call(httpClient, payload);
  //callback({result, error});
  if (!error) {
    if (result) {
      // console.log(
      //   'Student Education Profile list  result',
      //   JSON.stringify(result, undefined, 2),
      // );
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

function* getBlockList({payload: {data, callback}}) {
  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      // "Content-Type": "application/json"
    },
    method: 'GET',
    url: 'socialmedia/profile/blocked_user_list/',
  };
  const {result, error} = yield call(httpClient, payload);
  //callback({result, error});
  if (!error) {
    if (result) {
      // console.log(
      //   'Student Education Profile list  result',
      //   JSON.stringify(result, undefined, 2),
      // );
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************User GET Reset Password Auth Segas*******************************/

function* getResetPassword({payload: {data, callback}}) {
  console.warn('data in saga Reset Password User', data);
  const formdata = new FormData();
  formdata.append('old_password', data.old_password);
  formdata.append('password', data.password);
  formdata.append('confirm_password', data.confirm_password);

  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      'Content-Type': 'application/json',
    },
    data: formdata,
    method: 'POST',
    url: 'admin/reset_password/',
    // redirect: 'follow'
  };
  //console.warn('data in saga ADD  Course By User------------->', payload);
  const {result, error} = yield call(httpClient, payload);
  if (!error) {
    if (result) {
      // console.log(
      //   'get Reset Password User',
      //   JSON.stringify(result, undefined, 2),
      // );
      callback({result, error});
      // const userToken = JSON.stringify(data).st result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************User GET Notification list Auth Segas*******************************/

function* getNotificationFetch({payload: {data, callback}}) {
  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      // "Content-Type": "application/json"
    },
    method: 'GET',
    url: 'ei/notification-fetch-list/',
  };
  const {result, error} = yield call(httpClient, payload);
  callback({result, error});
  if (!error) {
    if (result) {
      // console.log(
      //   'Student Notification list result',
      //   JSON.stringify(result, undefined, 2),
      // );
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************User Skipped standard Data Auth Segas*******************************/

function* getskipped({payload: {data, callback}}) {
  //console.warn('data in saga Skipped standard', data);
  const formdata = new FormData();
  formdata.append('standard_id', data.standard_id);

  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      //'Authorization': `Bearer ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxODI5LCJ1c2VybmFtZSI6InNkZmRzZmRmZ2RmZ2RmZEBnbWFpbC5jb20iLCJleHAiOjE2NDgwODc2NjksImVtYWlsIjoic2RmZHNmZGZnZGZnZGZkQGdtYWlsLmNvbSIsIm9yaWdfaWF0IjoxNjIyMTY3NjY5fQ.7WvxKra_SiUrogr5QUaehANDegDPJYfPN-f86sqMgjE'}`,
      'Content-Type': 'application/json',
    },
    data: formdata,
    method: 'POST',
    url: 'user/delete-standard-detail-by-student/',
  };
  const {result, error} = yield call(httpClient, payload);
  if (!error) {
    if (result) {
      // console.log(
      //   'Skipped Standard Result',
      //   JSON.stringify(result, undefined, 2),
      // );
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************User Edit standard Data Auth Segas*******************************/

function* geteditcoursestandard({payload: {data, callback}}) {
  //console.warn('data in saga Edit standard', data);
  const formdata = new FormData();
  formdata.append('standard_id', data.standard_id);
  formdata.append('standard_start_year', data.standard_start_year);
  formdata.append('standard_end_year', data.standard_end_year);

  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      //'Authorization': `Bearer ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxODI5LCJ1c2VybmFtZSI6InNkZmRzZmRmZ2RmZ2RmZEBnbWFpbC5jb20iLCJleHAiOjE2NDgwODc2NjksImVtYWlsIjoic2RmZHNmZGZnZGZnZGZkQGdtYWlsLmNvbSIsIm9yaWdfaWF0IjoxNjIyMTY3NjY5fQ.7WvxKra_SiUrogr5QUaehANDegDPJYfPN-f86sqMgjE'}`,
      'Content-Type': 'application/json',
    },
    data: formdata,
    method: 'POST',
    url: 'user/edit-course-standard-detail-by-student/',
  };
  const {result, error} = yield call(httpClient, payload);
  if (!error) {
    if (result) {
      // console.log('Edit Standard Result', JSON.stringify(result, undefined, 2));
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************User Edit standard drop down Data Auth Segas*******************************/

function* geteditcoursestandarddropdown({payload: {data, callback}}) {
  //console.warn('data in saga Edit standard drop down', data);
  const formdata = new FormData();
  formdata.append('standard_id', data.standard_id);
  formdata.append('standard_start_year', data.standard_start_year);
  formdata.append('standard_end_year', data.standard_end_year);
  formdata.append('class_id', data.class_id);

  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      //'Authorization': `Bearer ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxODI5LCJ1c2VybmFtZSI6InNkZmRzZmRmZ2RmZ2RmZEBnbWFpbC5jb20iLCJleHAiOjE2NDgwODc2NjksImVtYWlsIjoic2RmZHNmZGZnZGZnZGZkQGdtYWlsLmNvbSIsIm9yaWdfaWF0IjoxNjIyMTY3NjY5fQ.7WvxKra_SiUrogr5QUaehANDegDPJYfPN-f86sqMgjE'}`,
      'Content-Type': 'application/json',
    },
    data: formdata,
    method: 'POST',
    url: 'user/edit-course-standard-detail-by-student/',
  };
  const {result, error} = yield call(httpClient, payload);
  if (!error) {
    if (result) {
      // console.log(
      //   'Edit Standard drop down Result',
      //   JSON.stringify(result, undefined, 2),
      // );
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************User GET Class List By Standard ID Auth Segas*******************************/

function* getClassListByStandard({payload: {data, callback}}) {
  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      // "Content-Type": "application/json"
    },
    method: 'GET',
    //  url: `user/getcitybystateid/${data.id}/`,
    url: `user/class-list-by-standardid/?standard_id=${data.standard_id}`,
  };
  const {result, error} = yield call(httpClient, payload);
  callback({result, error});
  if (!error) {
    if (result) {
      // console.log('get Class result', JSON.stringify(result, undefined, 2));
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************User Post Add User Step Seven Auth Segas*******************************/

function* getadduserstepseven({payload: {data, callback}}) {
  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      // "Content-Type": "application/json"
    },
    method: 'POST',
    //  url: `user/getcitybystateid/${data.id}/`,
    url: `user/add-user-step-seven/`,
  };
  const {result, error} = yield call(httpClient, payload);
  callback({result, error});
  if (!error) {
    if (result) {
      // console.log('get Add Step Seven result', JSON.stringify(result, undefined, 2));
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************User Course Confirmation Step Auth Segas*******************************/

function* getusercourseconfirmation({payload: {data, callback}}) {
  // const formdata = new FormData();
  //  formdata.append('school_id', data.school_id);

  const datakey = {
    id: data.id,
    school_id: data.school_id,
  };

  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      // "Content-Type": "application/json"
    },
    method: 'POST',
    data: datakey,
    //  url: `user/getcitybystateid/${data.id}/`,
    url: `user/user-course-conformation/`,
  };
  const {result, error} = yield call(httpClient, payload);
  callback({result, error});
  if (!error) {
    if (result) {
      // console.log('get User Course Confirmation Step result', JSON.stringify(result, undefined, 2));
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************User Course Confirmation Re verify Step Auth Segas*******************************/

function* getusercourseconfirmationreverify({payload: {data, callback}}) {
  // const formdata = new FormData();
  //  formdata.append('school_id', data.school_id);

  const datakey = {
    id: data.id,
    school_id: data.school_id,
    re_verify: true,
  };

  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      // "Content-Type": "application/json"
    },
    method: 'POST',
    data: datakey,
    //  url: `user/getcitybystateid/${data.id}/`,
    url: `user/user-course-conformation/`,
  };
  const {result, error} = yield call(httpClient, payload);
  callback({result, error});
  if (!error) {
    if (result) {
      // console.log('get User Course Confirmation Step result', JSON.stringify(result, undefined, 2));
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************User GET Search City Auth Segas*******************************/

function* getCitySearch({payload: {data, callback}}) {
  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      // "Content-Type": "application/json"
    },
    method: 'GET',
    //  url: `user/city-list/?search=${data.key}`,
    url: `user/world-location-search-list/?search=${data.key}`,
  };
  const {result, error} = yield call(httpClient, payload);
  //callback({result, error});
  //console.log('get City Search R', result, error);

  if (!error) {
    if (result) {
      // console.log('get City Search Result', JSON.stringify(result, undefined, 2));
      callback(result, error);
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************User Add City State of User Auth Segas*******************************/

function* getAddcitystateofuser({payload: {data, callback}}) {
  const formdata = new FormData();
  formdata.append('city_id', data.city_id);
  formdata.append('country_id', data.country_id);
  formdata.append('state_id', data.state_id);

  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      // "Content-Type": "application/json"
    },
    method: 'POST',
    data: formdata,
    //  url: `user/getcitybystateid/${data.id}/`,
    url: `user/add-city-state-of-user/`,
  };
  const {result, error} = yield call(httpClient, payload);
  callback({result, error});
  if (!error) {
    if (result) {
      // console.log('get User Add City of user result', JSON.stringify(result, undefined, 2));
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************User GET Star Class Course List Auth Segas*******************************/

function* getStarclasscourselist({payload: {data, callback}}) {
  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      // "Content-Type": "application/json"
    },
    method: 'GET',
    //  url: `user/city-list/?search=${data.key}`,
    url: `starclass/starclass-course-list-by-user/?school_id=${data.school_id}`,
  };
  const {result, error} = yield call(httpClient, payload);
  //callback({result, error});

  if (!error) {
    if (result) {
      console.log(
        'get Course List Result',
        JSON.stringify(result, undefined, 2),
      );
      callback(result, error);
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************User GET School List For Star Class  Auth Segas*******************************/

function* getSchoollistforstarclass({payload: {data, callback}}) {
  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      // "Content-Type": "application/json"
    },
    method: 'GET',
    //  url: `user/city-list/?search=${data.key}`,
    // url: `user/school-list-for-student-startclass/?page=`+data.page+'&page_size=2'
    url: `user/school-list-for-student-startclass/`,
  };
  const {result, error} = yield call(httpClient, payload);
  //callback({result, error});

  if (!error) {
    if (result) {
      //  console.log('get School List For Start Class Result', JSON.stringify(result, undefined, 2));
      callback(result, error);
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************User GET Course Preview List Auth Segas*******************************/

function* getCoursePreview({payload: {data, callback}}) {
  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      // "Content-Type": "application/json"
    },
    method: 'GET',
    //  url: `user/city-list/?search=${data.key}`,
    url: `starclass/course_preview/?id=${data.id}`,
  };
  const {result, error} = yield call(httpClient, payload);
  //callback({result, error});

  if (!error) {
    if (result) {
      // console.log('get Course Preview Result', JSON.stringify(result, undefined, 2));
      callback(result, error);
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************User GET Star Class Lecture List Auth Segas*******************************/

function* getStartClasslecturelist({payload: {data, callback}}) {
  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      // "Content-Type": "application/json"
    },
    method: 'GET',
    //  url: `user/city-list/?search=${data.key}`,
    url: `starclass/starclass-lecture-list-by-courseid/?course_id=${data.id}`,
  };
  const {result, error} = yield call(httpClient, payload);
  //callback({result, error});

  if (!error) {
    if (result) {
      //  console.log('get Star Clas lecture List Result', JSON.stringify(result, undefined, 2));
      callback(result, error);
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************User GET Star Class Lecture List Course Preview Auth Segas*******************************/

function* getStartClasslecturelistcoursepreview({payload: {data, callback}}) {
  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      // "Content-Type": "application/json"
    },
    method: 'GET',
    //  url: `user/city-list/?search=${data.key}`,
    //   url: `starclass/starclass-lecture-list-by-courseid/${data.id}/`,
    url: `starclass/starclass-lecture-detail-by-courseid/${data.id}/`,
  };
  const {result, error} = yield call(httpClient, payload);
  callback({result, error});
  if (!error) {
    if (result) {
      // console.log('get Star Clas lecture List Course Preview Result', JSON.stringify(result, undefined, 2));

      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************User GET Star Class Lecture History List Auth Segas*******************************/

function* getLecturehistory({payload: {data, callback}}) {
  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      // "Content-Type": "application/json"
    },
    method: 'GET',
    //  url: `user/city-list/?search=${data.key}`,
    url: `starclass/lecture_history_of_school/?school_id=${data.id}`,
  };
  const {result, error} = yield call(httpClient, payload);
  //callback({result, error});

  if (!error) {
    if (result) {
      //  console.log('get Star Class Lecture History List Result', JSON.stringify(result, undefined, 2));
      callback(result, error);
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************User GET Update School Course Details By User Auth Segas*******************************/

function* getUpdateschoolcoursedetailbyuser({payload: {data, callback}}) {
  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      // "Content-Type": "application/json"
    },
    method: 'GET',
    //  url: `user/city-list/?search=${data.key}`,
    //url: `starclass/lecture_history_of_school/?school_id=${data.id}`,
    url: `user/get-update-school-course-detail-by-user/?school_id=${data.school_id}&course_id=${data.course_id}`,
  };
  const {result, error} = yield call(httpClient, payload);
  if (!error) {
    if (result) {
      //console.log('get Update School Course Details By User Result', JSON.stringify(result, undefined, 2));

      callback({result, error});
      // const userToken = JSON.stringify(data).st result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
  //callback({result, error});
}

/***************************User GET Search School Student List By User Auth Segas*******************************/

function* getSearchSchoolStudentSearchList({payload: {data, callback}}) {
  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      // "Content-Type": "application/json"
    },
    method: 'GET',
    url: `user/search-list-for-school-student/?search=${data.search}`,
  };
  const {result, error} = yield call(httpClient, payload);
  //callback({result, error});
  // console.log('get City Search R', result, error);

  if (!error) {
    if (result) {
      //   console.log('get Search School Student List By User Result', JSON.stringify(result, undefined, 2));
      callback(result, error);
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************User GET Profile Detail For User Auth Segas*******************************/

function* getProfileDetailForUser({payload: {data, callback}}) {
  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      // "Content-Type": "application/json"
    },
    method: 'GET',
    url: `user/profile-detail-of-users/?count_type=true&user_id=${data.user_id}`,
  };
  const {result, error} = yield call(httpClient, payload);
  //callback({result, error});
  if (!error) {
    if (result) {
      // console.log(
      //   'Profile Detail For User result',
      //   JSON.stringify(result, undefined, 2),
      // );
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************User GET Profile Detail For School Auth Segas*******************************/

function* getProfileDetailForSchool({payload: {data, callback}}) {
  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      // "Content-Type": "application/json"
    },
    method: 'GET',
    url: `user/profile-detail-of-school/?count_type=true&school_id=${data.school_id}`,
  };
  const {result, error} = yield call(httpClient, payload);
  //callback({result, error});
  if (!error) {
    if (result) {
      // console.log(
      //   'Profile Detail For School result',
      //   JSON.stringify(result, undefined, 2),
      // );
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************User Get Admission Number Detail By School Auth Segas*******************************/

function* getGetAdmissionNumberDetailBySchool({payload: {data, callback}}) {
  //console.warn('data in saga Get Admission Number Detail By School', data);
  const formdata = new FormData();
  formdata.append('course_id', data.course_id);
  formdata.append('course_type', '');
  formdata.append('school_id', data.school_id);

  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      //'Authorization': `Bearer ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxODI5LCJ1c2VybmFtZSI6InNkZmRzZmRmZ2RmZ2RmZEBnbWFpbC5jb20iLCJleHAiOjE2NDgwODc2NjksImVtYWlsIjoic2RmZHNmZGZnZGZnZGZkQGdtYWlsLmNvbSIsIm9yaWdfaWF0IjoxNjIyMTY3NjY5fQ.7WvxKra_SiUrogr5QUaehANDegDPJYfPN-f86sqMgjE'}`,
      'Content-Type': 'application/json',
    },
    data: formdata,
    method: 'POST',
    url: 'user/get-admission-number-detail-by-school/',
  };
  const {result, error} = yield call(httpClient, payload);
  if (!error) {
    if (result) {
      // console.log('Get Admission Number Detail By School', JSON.stringify(result, undefined, 2));
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************User User Course Delete Not Confirm Auth Segas*******************************/

function* getUserCourseDeleteNotConfirm({payload: {data, callback}}) {
  // console.warn('data in saga Get User Course Delete Not Confirm', data);

  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      //'Authorization': `Bearer ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxODI5LCJ1c2VybmFtZSI6InNkZmRzZmRmZ2RmZ2RmZEBnbWFpbC5jb20iLCJleHAiOjE2NDgwODc2NjksImVtYWlsIjoic2RmZHNmZGZnZGZnZGZkQGdtYWlsLmNvbSIsIm9yaWdfaWF0IjoxNjIyMTY3NjY5fQ.7WvxKra_SiUrogr5QUaehANDegDPJYfPN-f86sqMgjE'}`,
      'Content-Type': 'application/json',
    },
    data: {},
    method: 'POST',
    url: 'user/user-course-delete-not-conformation/',
  };
  const {result, error} = yield call(httpClient, payload);
  if (!error) {
    if (result) {
      // console.log('Get User Course Delete Not Confirm', JSON.stringify(result, undefined, 2));
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************User Get User edit admission roll no Auth Segas*******************************/

function* getUsereditadmissionrollno({payload: {data, callback}}) {
  // console.warn('data in saga Get User edit admission roll no School', data);

  const datakey = {
    old_value: data.old_value,
    school_id: data.school_id,
    value: data.value,
    class_id: data.class_id,
    key: 'admission_number',
  };

  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      //'Authorization': `Bearer ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxODI5LCJ1c2VybmFtZSI6InNkZmRzZmRmZ2RmZ2RmZEBnbWFpbC5jb20iLCJleHAiOjE2NDgwODc2NjksImVtYWlsIjoic2RmZHNmZGZnZGZnZGZkQGdtYWlsLmNvbSIsIm9yaWdfaWF0IjoxNjIyMTY3NjY5fQ.7WvxKra_SiUrogr5QUaehANDegDPJYfPN-f86sqMgjE'}`,
      'Content-Type': 'application/json',
    },
    data: datakey,
    method: 'POST',
    url: 'user/edit-admission-roll-no/',
  };
  const {result, error} = yield call(httpClient, payload);
  if (!error) {
    if (result) {
      // console.log('Get User edit admission roll no By School', JSON.stringify(result, undefined, 2));
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************User GET All Work Departments Auth Segas*******************************/

function* getAllWorkDepartments({payload: {data, callback}}) {
  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      // "Content-Type": "application/json"
    },
    method: 'GET',
    url: `user/get-all-work-departments/`,
  };
  const {result, error} = yield call(httpClient, payload);
  //callback({result, error});
  if (!error) {
    if (result) {
      // console.log(
      //   'GET All Work Department result',
      //   JSON.stringify(result, undefined, 2),
      // );
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************User GET Country Auth Segas*******************************/

function* getCountry({payload: {data, callback}}) {
  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      // "Content-Type": "application/json"
    },
    method: 'GET',
    url: `user/get_country/`,
  };
  const {result, error} = yield call(httpClient, payload);
  //callback({result, error});
  if (!error) {
    if (result) {
      // console.log(
      //   'GET All Country Result',
      //   JSON.stringify(result, undefined, 2),
      // );
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************User Get User edit admission roll no two Auth Segas*******************************/

function* getUsereditadmissionrollnotwo({payload: {data, callback}}) {
  //console.warn('data in saga Get User edit admission roll no School', data);

  const datakey = {
    old_value: data.old_value,
    course_id: data.course_id,
    value: data.value,
    class_id: data.class_id,
    key: 'roll_no',
  };

  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      //'Authorization': `Bearer ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxODI5LCJ1c2VybmFtZSI6InNkZmRzZmRmZ2RmZ2RmZEBnbWFpbC5jb20iLCJleHAiOjE2NDgwODc2NjksImVtYWlsIjoic2RmZHNmZGZnZGZnZGZkQGdtYWlsLmNvbSIsIm9yaWdfaWF0IjoxNjIyMTY3NjY5fQ.7WvxKra_SiUrogr5QUaehANDegDPJYfPN-f86sqMgjE'}`,
      'Content-Type': 'application/json',
    },
    data: datakey,
    method: 'POST',
    url: 'user/edit-admission-roll-no/',
  };
  const {result, error} = yield call(httpClient, payload);
  if (!error) {
    if (result) {
      // console.log('Get User edit admission roll no By School', JSON.stringify(result, undefined, 2));
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************User GET Chat Teacher List Auth Segas*******************************/

function* getChatTeacherList({payload: {data, callback}}) {
  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      // "Content-Type": "application/json"
    },
    method: 'GET',
    url: `chat/teachers_list_based_on_school/?ei_id=${data.id}`,
  };
  const {result, error} = yield call(httpClient, payload);
  //callback({result, error});

  if (!error) {
    if (result) {
      //console.log('get Teacher Chat List Result', JSON.stringify(result, undefined, 2));
      callback(result, error);
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************User GET School List On User Auth Segas*******************************/

function* getSchoolListOnUser({payload: {data, callback}}) {
  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      // "Content-Type": "application/json"
    },
    method: 'GET',
    url: `chat/school_list_on_user/`,
  };
  const {result, error} = yield call(httpClient, payload);
  //callback({result, error});

  if (!error) {
    if (result) {
      //console.log('get Teacher Chat List Result', JSON.stringify(result, undefined, 2));
      callback(result, error);
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************User GET Pending user change detail list Auth Segas*******************************/

function* getPendinguserchangedetaillist({payload: {data, callback}}) {
  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      // "Content-Type": "application/json"
    },
    method: 'GET',
    url: `user/pending-user-change-detail-list/?page_size=100&page=1`,
  };
  const {result, error} = yield call(httpClient, payload);
  //callback({result, error});

  if (!error) {
    if (result) {
      console.log(
        'get Pending user change detail list Result',
        JSON.stringify(result, undefined, 2),
      );
      callback(result, error);
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************User Delete Pending User Request Auth Segas*******************************/

function* getDeletePendingUserRequest({payload: {data, callback}}) {
  console.warn('data in saga Delete Course', data);

  const datakey = {
    id: data.id,
    type: data.type,
  };

  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      //'Authorization': `Bearer ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxODI5LCJ1c2VybmFtZSI6InNkZmRzZmRmZ2RmZ2RmZEBnbWFpbC5jb20iLCJleHAiOjE2NDgwODc2NjksImVtYWlsIjoic2RmZHNmZGZnZGZnZGZkQGdtYWlsLmNvbSIsIm9yaWdfaWF0IjoxNjIyMTY3NjY5fQ.7WvxKra_SiUrogr5QUaehANDegDPJYfPN-f86sqMgjE'}`,
      'Content-Type': 'application/json',
    },
    data: datakey,
    method: 'POST',
    url: 'user/delete_pending_user_request/',
  };
  const {result, error} = yield call(httpClient, payload);
  if (!error) {
    if (result) {
      // console.log('Delete Course Result', JSON.stringify(result, undefined, 2));
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************User GET Upload ekyc for detail chnage list Auth Segas*******************************/

function* getUploadekycfordetailchnage({payload: {data, callback}}) {
  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      // "Content-Type": "application/json"
    },
    method: 'GET',
    url: `user/upload-ekyc-for-detail-change-list/?page_size=100&page=1`,
  };
  const {result, error} = yield call(httpClient, payload);
  //callback({result, error});

  if (!error) {
    if (result) {
      console.log(
        'get Upload ekyc for detail chnage list Result',
        JSON.stringify(result, undefined, 2),
      );
      callback(result, error);
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************User GET Pending Course List Of User list Auth Segas*******************************/

function* getPendingCourseListOfUser({payload: {data, callback}}) {
  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      // "Content-Type": "application/json"
    },
    method: 'GET',
    url: `user/pending-course-list-of-user/?school_id=${data.school_id}`,
  };
  const {result, error} = yield call(httpClient, payload);
  //callback({result, error});
  if (!error) {
    if (result) {
      // console.log(
      //   'Student Education Profile list  result',
      //   JSON.stringify(result, undefined, 2),
      // );
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************User delete pending course detail Auth Segas*******************************/

function* getUserdeletependingcoursedetail({payload: {data, callback}}) {
  console.warn('data in saga Delete pending Course', data);

  const datakey = {
    course_id: data.course_id,
  };

  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      //'Authorization': `Bearer ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxODI5LCJ1c2VybmFtZSI6InNkZmRzZmRmZ2RmZ2RmZEBnbWFpbC5jb20iLCJleHAiOjE2NDgwODc2NjksImVtYWlsIjoic2RmZHNmZGZnZGZnZGZkQGdtYWlsLmNvbSIsIm9yaWdfaWF0IjoxNjIyMTY3NjY5fQ.7WvxKra_SiUrogr5QUaehANDegDPJYfPN-f86sqMgjE'}`,
      'Content-Type': 'application/json',
    },
    data: datakey,
    method: 'POST',
    url: 'user/delete-pending-course-detail/',
  };
  const {result, error} = yield call(httpClient, payload);
  if (!error) {
    if (result) {
      // console.log('Delete Course Result', JSON.stringify(result, undefined, 2));
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************User change course standard detail by student by id Auth Segas*******************************/

function* getUserchangecoursestandarddetailbystudentbyid({
  payload: {data, callback},
}) {
  console.warn('data in saga change course standard detail', data);

  const datakey = {
    course_id: data.course_id,
  };

  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      //'Authorization': `Bearer ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxODI5LCJ1c2VybmFtZSI6InNkZmRzZmRmZ2RmZ2RmZEBnbWFpbC5jb20iLCJleHAiOjE2NDgwODc2NjksImVtYWlsIjoic2RmZHNmZGZnZGZnZGZkQGdtYWlsLmNvbSIsIm9yaWdfaWF0IjoxNjIyMTY3NjY5fQ.7WvxKra_SiUrogr5QUaehANDegDPJYfPN-f86sqMgjE'}`,
      'Content-Type': 'application/json',
    },
    data: datakey,
    method: 'POST',
    url: 'user/change-course-standard-detail-by-student-by-id/',
  };
  const {result, error} = yield call(httpClient, payload);
  if (!error) {
    if (result) {
      // console.log('Delete Course Result', JSON.stringify(result, undefined, 2));
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************User Course Delete Befor Conformation Auth Segas*******************************/

function* getUserCourseDeleteBeforConformation({payload: {data, callback}}) {
  console.warn('data in saga Get User Course Delete Befor Conformation', data);
  const datakey = {
    course_id: data.course_id,
  };

  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      //'Authorization': `Bearer ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxODI5LCJ1c2VybmFtZSI6InNkZmRzZmRmZ2RmZ2RmZEBnbWFpbC5jb20iLCJleHAiOjE2NDgwODc2NjksImVtYWlsIjoic2RmZHNmZGZnZGZnZGZkQGdtYWlsLmNvbSIsIm9yaWdfaWF0IjoxNjIyMTY3NjY5fQ.7WvxKra_SiUrogr5QUaehANDegDPJYfPN-f86sqMgjE'}`,
      'Content-Type': 'application/json',
    },
    data: datakey,
    method: 'POST',
    url: 'user/user-course-delete-beforeconformation/',
  };
  const {result, error} = yield call(httpClient, payload);
  if (!error) {
    if (result) {
      // console.log('Get User Course Delete Not Confirm', JSON.stringify(result, undefined, 2));
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************User Course Confirmation - 2 Step Auth Segas*******************************/

function* getUserCourseConfirm({payload: {data, callback}}) {
  const datakey = {
    school_id: data.school_id,
    existing_course: data.existing_course,
    change_course_id: data.change_course_id,
    // before_exist: data.course_id,
    // course_id: data.course_id,
  };

  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      // "Content-Type": "application/json"
    },
    method: 'POST',
    data: datakey,
    //  url: `user/getcitybystateid/${data.id}/`,
    url: `user/user-course-conformation/`,
  };
  const {result, error} = yield call(httpClient, payload);
  callback({result, error});
  if (!error) {
    if (result) {
      // console.log('get User Course Confirmation Step result', JSON.stringify(result, undefined, 2));
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************User GET State Work Auth Segas*******************************/

function* getUserGetState({payload: {data, callback}}) {
  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      // "Content-Type": "application/json"
    },
    method: 'GET',
    url: `user/get_state/${data.id}/`,
  };

  const {result, error} = yield call(httpClient, payload);
  callback({result, error});
  if (!error) {
    if (result) {
      // console.log('get City result', JSON.stringify(result, undefined, 2));
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************User GET City Work Auth Segas*******************************/

function* getUserGetCity({payload: {data, callback}}) {
  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      // "Content-Type": "application/json"
    },
    method: 'GET',
    url: `user/get_city/${data.id}/`,
  };

  const {result, error} = yield call(httpClient, payload);
  callback({result, error});
  if (!error) {
    if (result) {
      // console.log('get City result', JSON.stringify(result, undefined, 2));
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************User Work Details Add Auth Segas*******************************/

function* getUserWorkDetail({payload: {data_update, callback}}) {
  console.warn('data in saga Work Details Add', data_update);

  const payload = {
    headers: {
      Authorization: `Bearer ${data_update.token}`,
      'Content-Type': 'application/json',
    },
    data: data_update.data,
    method: 'POST',
    url: 'user/workdetail/',
  };
  const {result, error} = yield call(httpClient, payload);
  if (!error) {
    if (result) {
      // console.log('add ei result', JSON.stringify(result, undefined, 2));
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************User Delete Work Details Auth Segas*******************************/

function* getUserDeleteWorkDetail({payload: {data, callback}}) {
  const datakey = {
    id: data.id,
  };

  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      // "Content-Type": "application/json"
    },
    method: 'POST',
    data: datakey,
    //  url: `user/getcitybystateid/${data.id}/`,
    url: `user/delete-work-detail/`,
  };
  const {result, error} = yield call(httpClient, payload);
  callback({result, error});
  if (!error) {
    if (result) {
      // console.log('get User Course Confirmation Step result', JSON.stringify(result, undefined, 2));
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************User Upload ekyc for detail change Auth Segas*******************************/

function* getUploadekycfordetailchange({payload: {data, callback}}) {
  console.warn('data in saga', data);

  let formdata = new FormData();
  formdata.append('kyc_type', data.kyc_type);
  formdata.append('kyc_id_no', data.kyc_id_no);
  formdata.append('kyc_name', data.kyc_name);
  formdata.append('kyc_document', data.kyc_document);
  formdata.append('kyc_document_back', data.kyc_document_back);

  // formdata.append('kyc_type', 'ADHAR');
  // formdata.append('kyc_id_no', '1234567890');
  // formdata.append('kyc_name', 'mukesh');
  // formdata.append('kyc_dob', '2020-5-15');
  // formdata.append('kyc_document', data.kyc_document);
  // formdata.append('kyc_document_back', data.kyc_document_back);
  //  console.warn('data in saga-------------------->', formdata);
  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    data: formdata,
    method: 'POST',
    url: 'user/upload-ekyc-for-detail-change/',
  };
  // console.warn('data in saga----4324---------------->', payload);
  const {result, error} = yield call(httpClient, payload);
  //  console.log('kyc error', JSON.stringify(error, undefined, 2));
  if (!error) {
    if (result) {
      //  console.log('kyc result', JSON.stringify(result, undefined, 2));
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************User Upload ekyc for detail change dob Auth Segas*******************************/

function* getUploadekycfordetailchangedob({payload: {data, callback}}) {
  console.warn('data in saga', data);

  let formdata = new FormData();
  formdata.append('kyc_type', data.kyc_type);
  formdata.append('kyc_id_no', data.kyc_id_no);
  formdata.append('kyc_dob', data.kyc_dob);
  formdata.append('kyc_document', data.kyc_document);
  formdata.append('kyc_document_back', data.kyc_document_back);

  // formdata.append('kyc_type', 'ADHAR');
  // formdata.append('kyc_id_no', '1234567890');
  // formdata.append('kyc_name', 'mukesh');
  // formdata.append('kyc_dob', '2020-5-15');
  // formdata.append('kyc_document', data.kyc_document);
  // formdata.append('kyc_document_back', data.kyc_document_back);
  //  console.warn('data in saga-------------------->', formdata);
  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    data: formdata,
    method: 'POST',
    url: 'user/upload-ekyc-for-detail-change/',
  };
  // console.warn('data in saga----4324---------------->', payload);
  const {result, error} = yield call(httpClient, payload);
  //  console.log('kyc error', JSON.stringify(error, undefined, 2));
  if (!error) {
    if (result) {
      //  console.log('kyc result', JSON.stringify(result, undefined, 2));
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}
/***************************User OTP SKIP Auth Segas*******************************/

function* otpSuccessSkip({payload: {data, callback}}) {
  console.warn('data in saga', data);
  const formdata = new FormData();
  formdata.append('firebase_id', data.firebase_id);
  formdata.append('username', data.username);
  formdata.append('is_skip', true);
  formdata.append('is_mobile', true);

  const payload = {
    data: formdata,
    method: 'POST',
    url: 'user/verify-otp/',
  };
  const {result, error} = yield call(httpClient, payload);
  if (!error) {
    if (result) {
      console.log('otp result', JSON.stringify(result, undefined, 2));
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************Request Change User Detail NO*******************************/

function* requestChangeUserDetail({payload: {data, callback}}) {
  console.warn('data in saga', data);

  const params = {
    class_id: data.class_id,
    key: data.key,
    old_value: data.old_value,
    value: data.value,
  };

  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    data: params,
    method: 'POST',
    url: 'user/request-change-user-detail-by-ei/',
  };
  const {result, error} = yield call(httpClient, payload);
  if (!error) {
    if (result) {
      //  console.log('login result', JSON.stringify(result, undefined, 2));
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************Request Change User Detail EMAIL*******************************/

function* requestChangeUserDetailEmail({payload: {data, callback}}) {
  console.warn('data in saga', data);

  const params = {
    class_id: data.class_id,
    key: data.key,
    old_value: data.old_value,
    value: data.value,
  };

  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    data: params,
    method: 'POST',
    url: 'user/request-change-user-detail-by-ei/',
  };
  const {result, error} = yield call(httpClient, payload);
  if (!error) {
    if (result) {
      //  console.log('login result', JSON.stringify(result, undefined, 2));
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

function* changeSocialMediaStatus({payload: {data, callback}}) {
  console.warn('data in saga', data);

  const params = {
    social_status: data.social_status,
  };

  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    data: params,
    method: 'POST',
    url: 'socialmedia/socialmedia_enable_disable_self/',
  };
  const {result, error} = yield call(httpClient, payload);
  if (!error) {
    if (result) {
      //  console.log('login result', JSON.stringify(result, undefined, 2));
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

function* changePrivateStatus({payload: {data, callback}}) {
  console.warn('data in saga', data);

  const params = {
    privacy_status: data.privacy_status,
  };

  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    data: params,
    method: 'POST',
    url: 'socialmedia/socialmedia_privacy_setting/',
  };
  const {result, error} = yield call(httpClient, payload);
  if (!error) {
    if (result) {
      //  console.log('login result', JSON.stringify(result, undefined, 2));
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

function* blockUser({payload: {data, callback}}) {
  console.warn('data in saga', data);

  const params = {
    block_user_status: data.block_user_status,
    blocked_user_id: data.blocked_user_id,
  };

  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    data: params,
    method: 'POST',
    url: 'socialmedia/profile/block_user/',
  };
  const {result, error} = yield call(httpClient, payload);
  if (!error) {
    if (result) {
      //  console.log('login result', JSON.stringify(result, undefined, 2));
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************Request Change User Detail Verify Otp*******************************/

function* requestChangeUserDetailVerifyOtp({payload: {data, callback}}) {
  console.warn('data in saga', data);

  const params = {
    key: data.key,
    verify_otp_no: data.verify_otp_no,
    value: data.value,
  };

  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    data: params,
    method: 'POST',
    url: 'user/user-request-verify-otp-detail-change/',
  };
  const {result, error} = yield call(httpClient, payload);
  if (!error) {
    if (result) {
      //  console.log('login result', JSON.stringify(result, undefined, 2));
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************Request Change User Detail Verify Otp email*******************************/

function* requestChangeUserDetailVerifyOtpEmail({payload: {data, callback}}) {
  console.warn('data in saga', data);

  const params = {
    key: data.key,
    verify_otp_no: data.verify_otp_no,
    value: data.value,
  };

  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    data: params,
    method: 'POST',
    url: 'user/user-request-verify-otp-detail-change/',
  };
  const {result, error} = yield call(httpClient, payload);
  if (!error) {
    if (result) {
      //  console.log('login result', JSON.stringify(result, undefined, 2));
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************User Re-send Otp data success otp-ei-request-for-detail*******************************/

function* getResendotpEiRequest({payload: {data, callback}}) {
  const params = {
    class_id: data.class_id,
    key: data.key,
    old_value: data.old_value,
    value: data.value,
  };

  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    data: params,
    method: 'POST',
    url: 'user/resend-otp-ei-request-for-detail-change/',
  };
  const {result, error} = yield call(httpClient, payload);
  if (!error) {
    if (result) {
      console.log('otp Re-Send result', JSON.stringify(result, undefined, 2));
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************User Re-send Otp data success otp-ei-request-for-detail email*******************************/

function* getResendotpEiRequestEmail({payload: {data, callback}}) {
  const params = {
    class_id: data.class_id,
    key: data.key,
    old_value: data.old_value,
    value: data.value,
  };

  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    data: params,
    method: 'POST',
    url: 'user/resend-otp-ei-request-for-detail-change/',
  };
  const {result, error} = yield call(httpClient, payload);
  if (!error) {
    if (result) {
      console.log('otp Re-Send result', JSON.stringify(result, undefined, 2));
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************User GET User Setting Status Auth Segas*******************************/

function* getUserSettingStatus({payload: {data, callback}}) {
  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      // "Content-Type": "application/json"
    },
    method: 'GET',
    url: `user/setting_status/${data.id}/`,
  };
  const {result, error} = yield call(httpClient, payload);
  callback({result, error});
  if (!error) {
    if (result) {
      // console.log('get City result', JSON.stringify(result, undefined, 2));
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************User GET User Setting Status Post*******************************/

function* getUserSettingStatusPost({payload: {data, callback}}) {
  const params = {
    is_disabled: data.is_disabled,
    status_type: data.status_type,
    user: data.user,
  };

  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    data: params,
    method: 'POST',
    url: 'user/setting_status/',
  };
  const {result, error} = yield call(httpClient, payload);
  if (!error) {
    if (result) {
      console.log(
        'User Setting Status Post result',
        JSON.stringify(result, undefined, 2),
      );
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************User GET Ei detail for already students Segas*******************************/

function* getEidetailforalreadystudents({payload: {data, callback}}) {
  console.warn('data in saga Ei detail for already students', data);

  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      //'Authorization': `Bearer ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxODI5LCJ1c2VybmFtZSI6InNkZmRzZmRmZ2RmZ2RmZEBnbWFpbC5jb20iLCJleHAiOjE2NDgwODc2NjksImVtYWlsIjoic2RmZHNmZGZnZGZnZGZkQGdtYWlsLmNvbSIsIm9yaWdfaWF0IjoxNjIyMTY3NjY5fQ.7WvxKra_SiUrogr5QUaehANDegDPJYfPN-f86sqMgjE'}`,
      'Content-Type': 'application/json',
    },
    data: {},
    method: 'POST',
    url: 'user/get-ei-detail-for-already-students/',
  };
  const {result, error} = yield call(httpClient, payload);
  if (!error) {
    if (result) {
      // console.log(
      //   'Check User Kyc Result',
      //   JSON.stringify(result, undefined, 2),
      // );
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************User GET Ei detail for already students Segas*******************************/

function* getEidetailforalreadystudentsmulti({payload: {data, callback}}) {
  console.warn('data in saga Ei detail for already students', data);

  const params = {
    school_id: data.school_id,
  };
  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      //'Authorization': `Bearer ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxODI5LCJ1c2VybmFtZSI6InNkZmRzZmRmZ2RmZ2RmZEBnbWFpbC5jb20iLCJleHAiOjE2NDgwODc2NjksImVtYWlsIjoic2RmZHNmZGZnZGZnZGZkQGdtYWlsLmNvbSIsIm9yaWdfaWF0IjoxNjIyMTY3NjY5fQ.7WvxKra_SiUrogr5QUaehANDegDPJYfPN-f86sqMgjE'}`,
      'Content-Type': 'application/json',
    },
    data: params,
    method: 'POST',
    url: 'user/get-ei-detail-for-already-students/',
  };
  const {result, error} = yield call(httpClient, payload);
  if (!error) {
    if (result) {
      // console.log(
      //   'Check User Kyc Result',
      //   JSON.stringify(result, undefined, 2),
      // );
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************User GET Sent for approval view status Segas*******************************/

function* getSentforapprovalviewstatus({payload: {data, callback}}) {
  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      // "Content-Type": "application/json"
    },
    method: 'GET',
    url: `user/sent_for_approval_view_status/?status=SENTFORSIGNUP`,
  };
  const {result, error} = yield call(httpClient, payload);
  //callback({result, error});

  if (!error) {
    if (result) {
      console.log(
        'get sent_for_approval_view_status',
        JSON.stringify(result, undefined, 2),
      );
      callback(result, error);
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************User GET Logout View Status Auth Segas*******************************/

function* getLogoutViewStatus({payload: {data, callback}}) {
  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    method: 'GET',
    url: 'user/logout_view_status/',
  };
  const {result, error} = yield call(httpClient, payload);
  callback({result, error});
  if (!error) {
    if (result) {
      // console.log(
      //   'get Step Count result',
      //   JSON.stringify(result, undefined, 2),
      // );
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************User GET User Profile Delete Zatchup Account*******************************/

function* getProfileDeleteZatchupAccount({payload: {data, callback}}) {
  const params = {
    is_active: data.is_active,
  };

  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    data: params,
    method: 'POST',
    url: 'socialmedia/profile/delete_zatchup_account/',
  };
  const {result, error} = yield call(httpClient, payload);
  if (!error) {
    if (result) {
      console.log(
        'User Profile Delete Zatchup Account result',
        JSON.stringify(result, undefined, 2),
      );
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************GET Change status accepted by user*******************************/

function* getChangestatusacceptedbyuser({payload: {data, callback}}) {
  const params = {
    is_sent_up: data.is_sent_up,
    school_id: data.school_id,
    status: data.status,
  };

  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    data: params,
    method: 'POST',
    url: 'user/change-status-accepted-by-user/',
  };
  const {result, error} = yield call(httpClient, payload);
  if (!error) {
    if (result) {
      console.log(
        'user change status accepted result',
        JSON.stringify(result, undefined, 2),
      );
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************GET Change status accepted by user*******************************/

function* getChangestatusacceptedbyusermulti({payload: {data, callback}}) {
  const params = {
    school_id: data.school_id,
    status: data.status,
  };

  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    data: params,
    method: 'POST',
    url: 'user/change-status-accepted-by-user/',
  };
  const {result, error} = yield call(httpClient, payload);
  if (!error) {
    if (result) {
      console.log(
        'user change status accepted result',
        JSON.stringify(result, undefined, 2),
      );
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************GET School detail schoolid by user*******************************/

function* getSchooldetailschoolid({payload: {data, callback}}) {
  const params = {
    school_id: data.school_id,
  };

  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    data: params,
    method: 'POST',
    url: 'user/get-school-detail-schoolid/',
  };
  const {result, error} = yield call(httpClient, payload);
  if (!error) {
    if (result) {
      console.log(
        'user get School detail school id result',
        JSON.stringify(result, undefined, 2),
      );
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

// Add new

/******************USer post api  *****************/

function* getPostOfUser({payload: {data, callback}}) {
  console.warn('data in saga users post', data);

  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      //'Authorization': `Bearer ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxODI5LCJ1c2VybmFtZSI6InNkZmRzZmRmZ2RmZ2RmZEBnbWFpbC5jb20iLCJleHAiOjE2NDgwODc2NjksImVtYWlsIjoic2RmZHNmZGZnZGZnZGZkQGdtYWlsLmNvbSIsIm9yaWdfaWF0IjoxNjIyMTY3NjY5fQ.7WvxKra_SiUrogr5QUaehANDegDPJYfPN-f86sqMgjE'}`,
      'Content-Type': 'application/json',
    },
    //data: JSON.stringify(data.course_id),
    method: 'GET',
    url:
      'socialmedia/post/user_following_post/?page=' +
      data.page +
      '&page_size=9&count_type=true',
  };
  const {result, error} = yield call(httpClient, payload);
  if (!error) {
    if (result) {
      console.log('Post of User', JSON.stringify(result, undefined, 2));
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************POst like and unlike */

function* likeUnlikePost({payload: {data, callback}}) {
  console.warn('data in saga', data);

  const params = {
    post_id: data.post_id,
    like: data.like,
  };

  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    data: params,
    method: 'POST',
    url: 'socialmedia/post/userpostlikeunlike/',
  };
  const {result, error} = yield call(httpClient, payload);
  if (!error) {
    if (result) {
      console.log('post like unlike', JSON.stringify(result, undefined, 2));
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************POst like and unlike */

function* commentlikeUnlike({payload: {data, callback}}) {
  console.warn('data in saga', data);

  const params = {
    like: data.like,
  };
  if (data.hasOwnProperty('reply_comment_id')) {
    params.reply_comment_id = data.reply_comment_id;
  } else {
    params.comment_id = data.comment_id;
  }

  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    data: params,
    method: 'POST',
    url: data.hasOwnProperty('reply_comment_id')
      ? 'socialmedia/comment/replycommentlikeunlike/'
      : 'socialmedia/comment/postcommentlikeunlike/',
  };
  const {result, error} = yield call(httpClient, payload);
  if (!error) {
    if (result) {
      console.log('Ccomment like unlike', JSON.stringify(result, undefined, 2));
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************POst Comment */

function* commentPost({payload: {data, callback}}) {
  console.warn('data in saga', data);

  const params = {
    post_id: data.post_id,
    comment: data.comment,
  };

  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    data: params,
    method: 'POST',
    url: 'socialmedia/comment/postcomment/',
  };
  const {result, error} = yield call(httpClient, payload);
  if (!error) {
    if (result) {
      console.log('post comment', JSON.stringify(result, undefined, 2));
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************reply Comment */

function* replyComment({payload: {data, callback}}) {
  console.warn('data in saga', data);

  const params = {
    reply_comment: data.reply_comment,
    comment_id: data.comment_id,
    user_id: data.user_id,
  };

  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    data: params,
    method: 'POST',
    url: 'socialmedia/comment/replycomment/',
  };
  const {result, error} = yield call(httpClient, payload);
  if (!error) {
    if (result) {
      console.log('reply comment', JSON.stringify(result, undefined, 2));
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}
/**************this is for profile image change */

function* changeProfileImage({payload: {data, callback}}) {
  console.warn('data in saga', data);
  const formdata = new FormData();
  formdata.append('socialmedia_coverpic', data.socialmedia_coverpic);
  formdata.append('socialmedia_profilepic', data.socialmedia_profilepic);
  formdata.append('user', data.user);
  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      //'Authorization': `Bearer ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxODI5LCJ1c2VybmFtZSI6InNkZmRzZmRmZ2RmZ2RmZEBnbWFpbC5jb20iLCJleHAiOjE2NDgwODc2NjksImVtYWlsIjoic2RmZHNmZGZnZGZnZGZkQGdtYWlsLmNvbSIsIm9yaWdfaWF0IjoxNjIyMTY3NjY5fQ.7WvxKra_SiUrogr5QUaehANDegDPJYfPN-f86sqMgjE'}`,
      'Content-Type': 'application/json',
    },
    data: formdata,
    method: 'POST',
    url: 'user/socia_media_image_uplode/',
  };
  const {result, error} = yield call(httpClient, payload);
  if (!error) {
    if (result) {
      console.log(
        'upload profile pic of user',
        JSON.stringify(result, undefined, 2),
      );
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/************get post details **********/

function* getPostDetails({payload: {data, callback}}) {
  console.warn('data in saga Auth User Info', data);

  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      //'Authorization': `Bearer ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxODI5LCJ1c2VybmFtZSI6InNkZmRzZmRmZ2RmZ2RmZEBnbWFpbC5jb20iLCJleHAiOjE2NDgwODc2NjksImVtYWlsIjoic2RmZHNmZGZnZGZnZGZkQGdtYWlsLmNvbSIsIm9yaWdfaWF0IjoxNjIyMTY3NjY5fQ.7WvxKra_SiUrogr5QUaehANDegDPJYfPN-f86sqMgjE'}`,
      'Content-Type': 'application/json',
    },
    //data: JSON.stringify(data.course_id),
    method: 'GET',
    url: 'socialmedia/post/userpostinfo/?count_type=false&id=' + data.id,
  };
  const {result, error} = yield call(httpClient, payload);
  if (!error) {
    if (result) {
      console.log(
        'Get post details Result',
        JSON.stringify(result, undefined, 2),
      );
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/*************************get user profile of post     **************/
function* getUserProfile({payload: {data, callback}}) {
  console.warn('data in saga Auth User Info', data);

  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      //'Authorization': `Bearer ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxODI5LCJ1c2VybmFtZSI6InNkZmRzZmRmZ2RmZ2RmZEBnbWFpbC5jb20iLCJleHAiOjE2NDgwODc2NjksImVtYWlsIjoic2RmZHNmZGZnZGZnZGZkQGdtYWlsLmNvbSIsIm9yaWdfaWF0IjoxNjIyMTY3NjY5fQ.7WvxKra_SiUrogr5QUaehANDegDPJYfPN-f86sqMgjE'}`,
      'Content-Type': 'application/json',
    },
    //data: JSON.stringify(data.course_id),
    method: 'GET',
    url:
      'user/profile-detail-of-users/?count_type=true&user_id=' + data.user_id,
  };
  const {result, error} = yield call(httpClient, payload);
  if (!error) {
    if (result) {
      console.log(
        'Get user profile Result',
        JSON.stringify(result, undefined, 2),
      );
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/*************************get user profile of post     **************/
function* getUserCoverMediaPic({payload: {data, callback}}) {
  console.warn('data in saga Auth User Info', data);

  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      //'Authorization': `Bearer ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxODI5LCJ1c2VybmFtZSI6InNkZmRzZmRmZ2RmZ2RmZEBnbWFpbC5jb20iLCJleHAiOjE2NDgwODc2NjksImVtYWlsIjoic2RmZHNmZGZnZGZnZGZkQGdtYWlsLmNvbSIsIm9yaWdfaWF0IjoxNjIyMTY3NjY5fQ.7WvxKra_SiUrogr5QUaehANDegDPJYfPN-f86sqMgjE'}`,
      'Content-Type': 'application/json',
    },
    //data: JSON.stringify(data.course_id),
    method: 'GET',
    url: 'user/socia_media_profile_and_cover_pic/?user_id=' + data.user_id,
  };
  const {result, error} = yield call(httpClient, payload);
  if (!error) {
    if (result) {
      console.log(
        'Get user cover pic Result',
        JSON.stringify(result, undefined, 2),
      );
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/*************************get user profile of post     **************/
function* getSchoolProfile({payload: {data, callback}}) {
  console.warn('data in saga Auth User Info', data);

  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      //'Authorization': `Bearer ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxODI5LCJ1c2VybmFtZSI6InNkZmRzZmRmZ2RmZ2RmZEBnbWFpbC5jb20iLCJleHAiOjE2NDgwODc2NjksImVtYWlsIjoic2RmZHNmZGZnZGZnZGZkQGdtYWlsLmNvbSIsIm9yaWdfaWF0IjoxNjIyMTY3NjY5fQ.7WvxKra_SiUrogr5QUaehANDegDPJYfPN-f86sqMgjE'}`,
      'Content-Type': 'application/json',
    },
    //data: JSON.stringify(data.course_id),
    method: 'GET',
    url:
      'user/profile-detail-of-school/?count_type=true&school_id=' +
      data.school_id,
  };
  const {result, error} = yield call(httpClient, payload);
  if (!error) {
    if (result) {
      console.log(
        'Get school profile Result',
        JSON.stringify(result, undefined, 2),
      );
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/*************************get user profile of post     **************/
function* getAlumniGalleryDetail({payload: {data, callback}}) {
  console.warn('data in saga Auth User Info', data);

  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      //'Authorization': `Bearer ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxODI5LCJ1c2VybmFtZSI6InNkZmRzZmRmZ2RmZ2RmZEBnbWFpbC5jb20iLCJleHAiOjE2NDgwODc2NjksImVtYWlsIjoic2RmZHNmZGZnZGZnZGZkQGdtYWlsLmNvbSIsIm9yaWdfaWF0IjoxNjIyMTY3NjY5fQ.7WvxKra_SiUrogr5QUaehANDegDPJYfPN-f86sqMgjE'}`,
      'Content-Type': 'application/json',
    },
    //data: JSON.stringify(data.course_id),
    method: 'GET',
    url:
      'socialmedia/get_alumni_gallery/?count_type=false&user_id=' +
      data.user_id,
  };
  const {result, error} = yield call(httpClient, payload);
  if (!error) {
    if (result) {
      console.log(
        'Get alumni gallery Result',
        JSON.stringify(result, undefined, 2),
      );
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/*************************get suggestion of users     **************/
function* getSuggestions({payload: {data, callback}}) {
  console.warn('data in saga Auth User Info', data);

  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      //'Authorization': `Bearer ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxODI5LCJ1c2VybmFtZSI6InNkZmRzZmRmZ2RmZ2RmZEBnbWFpbC5jb20iLCJleHAiOjE2NDgwODc2NjksImVtYWlsIjoic2RmZHNmZGZnZGZnZGZkQGdtYWlsLmNvbSIsIm9yaWdfaWF0IjoxNjIyMTY3NjY5fQ.7WvxKra_SiUrogr5QUaehANDegDPJYfPN-f86sqMgjE'}`,
      'Content-Type': 'application/json',
    },
    //data: JSON.stringify(data.course_id),
    method: 'GET',
    url: 'socialmedia/get_user_suggestion/',
  };
  const {result, error} = yield call(httpClient, payload);
  if (!error) {
    if (result) {
      console.log(
        'Get suggestions of user Result',
        JSON.stringify(result, undefined, 2),
      );
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/*************************get suggestion of users     **************/
function* getFollowRequest({payload: {data, callback}}) {
  console.warn('data in saga Auth User Info', data);

  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      //'Authorization': `Bearer ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxODI5LCJ1c2VybmFtZSI6InNkZmRzZmRmZ2RmZ2RmZEBnbWFpbC5jb20iLCJleHAiOjE2NDgwODc2NjksImVtYWlsIjoic2RmZHNmZGZnZGZnZGZkQGdtYWlsLmNvbSIsIm9yaWdfaWF0IjoxNjIyMTY3NjY5fQ.7WvxKra_SiUrogr5QUaehANDegDPJYfPN-f86sqMgjE'}`,
      'Content-Type': 'application/json',
    },
    //data: JSON.stringify(data.course_id),
    method: 'GET',
    url: 'socialmedia/follow/userfollowrequest/',
  };
  const {result, error} = yield call(httpClient, payload);
  if (!error) {
    if (result) {
      console.log(
        'Get follow request of user Result',
        JSON.stringify(result, undefined, 2),
      );
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/*************************get suggestion of get followers     **************/
function* getFollowers({payload: {data, callback}}) {
  console.warn('data in saga Auth User Info', data);

  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      //'Authorization': `Bearer ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxODI5LCJ1c2VybmFtZSI6InNkZmRzZmRmZ2RmZ2RmZEBnbWFpbC5jb20iLCJleHAiOjE2NDgwODc2NjksImVtYWlsIjoic2RmZHNmZGZnZGZnZGZkQGdtYWlsLmNvbSIsIm9yaWdfaWF0IjoxNjIyMTY3NjY5fQ.7WvxKra_SiUrogr5QUaehANDegDPJYfPN-f86sqMgjE'}`,
      'Content-Type': 'application/json',
    },
    //data: JSON.stringify(data.course_id),
    method: 'GET',
    url:
      'socialmedia/follow/search_user_follower_list/?user_id=' + data.user_id,
  };
  const {result, error} = yield call(httpClient, payload);
  if (!error) {
    if (result) {
      console.log(
        'Get followers list Result',
        JSON.stringify(result, undefined, 2),
      );
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/*************************get suggestion of get following     **************/
function* getFollowing({payload: {data, callback}}) {
  console.warn('data in saga Auth User Info', data);

  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      //'Authorization': `Bearer ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxODI5LCJ1c2VybmFtZSI6InNkZmRzZmRmZ2RmZ2RmZEBnbWFpbC5jb20iLCJleHAiOjE2NDgwODc2NjksImVtYWlsIjoic2RmZHNmZGZnZGZnZGZkQGdtYWlsLmNvbSIsIm9yaWdfaWF0IjoxNjIyMTY3NjY5fQ.7WvxKra_SiUrogr5QUaehANDegDPJYfPN-f86sqMgjE'}`,
      'Content-Type': 'application/json',
    },
    //data: JSON.stringify(data.course_id),
    method: 'GET',
    url:
      'socialmedia/follow/search_user_following_list/?user_id=' + data.user_id,
  };
  const {result, error} = yield call(httpClient, payload);
  if (!error) {
    if (result) {
      console.log(
        'Get following list Result',
        JSON.stringify(result, undefined, 2),
      );
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/*************************get suggestion of get following     **************/
function* getReportData({payload: {data, callback}}) {
  console.warn('data in saga Auth User Info', data);

  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      //'Authorization': `Bearer ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxODI5LCJ1c2VybmFtZSI6InNkZmRzZmRmZ2RmZ2RmZEBnbWFpbC5jb20iLCJleHAiOjE2NDgwODc2NjksImVtYWlsIjoic2RmZHNmZGZnZGZnZGZkQGdtYWlsLmNvbSIsIm9yaWdfaWF0IjoxNjIyMTY3NjY5fQ.7WvxKra_SiUrogr5QUaehANDegDPJYfPN-f86sqMgjE'}`,
      'Content-Type': 'application/json',
    },
    //data: JSON.stringify(data.course_id),
    method: 'GET',
    url:
      'socialmedia/report/masterreportlist/?' +
      data.parameter +
      '=' +
      data.type,
  };
  const {result, error} = yield call(httpClient, payload);
  if (!error) {
    if (result) {
      console.log(
        'Get report data Result',
        JSON.stringify(result, undefined, 2),
      );
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/*************************get suggestion of get following     **************/
function* getReportDataUser({payload: {data, callback}}) {
  console.warn('data in saga Auth User Info', data);

  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      //'Authorization': `Bearer ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxODI5LCJ1c2VybmFtZSI6InNkZmRzZmRmZ2RmZ2RmZEBnbWFpbC5jb20iLCJleHAiOjE2NDgwODc2NjksImVtYWlsIjoic2RmZHNmZGZnZGZnZGZkQGdtYWlsLmNvbSIsIm9yaWdfaWF0IjoxNjIyMTY3NjY5fQ.7WvxKra_SiUrogr5QUaehANDegDPJYfPN-f86sqMgjE'}`,
      'Content-Type': 'application/json',
    },
    //data: JSON.stringify(data.course_id),
    method: 'GET',
    url:
      'socialmedia/report/masterreportlist/?' +
      data.parameter +
      '=' +
      data.type,
  };
  const {result, error} = yield call(httpClient, payload);
  if (!error) {
    if (result) {
      console.log(
        'Get report data Result User',
        JSON.stringify(result, undefined, 2),
      );
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************report post*******************************/

function* reportPost({payload: {data, callback}}) {
  console.warn('data in saga Add Profile Pic Info', data);
  let params = {
    post_id: data.post_id,
    report_id: data.report_id,
  };

  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      //'Authorization': `Bearer ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxODI5LCJ1c2VybmFtZSI6InNkZmRzZmRmZ2RmZ2RmZEBnbWFpbC5jb20iLCJleHAiOjE2NDgwODc2NjksImVtYWlsIjoic2RmZHNmZGZnZGZnZGZkQGdtYWlsLmNvbSIsIm9yaWdfaWF0IjoxNjIyMTY3NjY5fQ.7WvxKra_SiUrogr5QUaehANDegDPJYfPN-f86sqMgjE'}`,
      'Content-Type': 'application/json',
    },
    data: params,
    method: 'POST',
    url: 'socialmedia/report/userreportpost/',
  };
  const {result, error} = yield call(httpClient, payload);
  if (!error) {
    if (result) {
      console.log('report post success', JSON.stringify(result, undefined, 2));
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************report post*******************************/

function* reportProfile({payload: {data, callback}}) {
  console.warn('data in saga Add Profile Pic Info', data);
  let params = {
    reported_user_id: data.reported_user_id,
    report_id: data.report_id,
  };
  if (data.hasOwnProperty('profile_report_comment')) {
    params.profile_report_comment = data.profile_report_comment;
  }
  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      //'Authorization': `Bearer ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxODI5LCJ1c2VybmFtZSI6InNkZmRzZmRmZ2RmZ2RmZEBnbWFpbC5jb20iLCJleHAiOjE2NDgwODc2NjksImVtYWlsIjoic2RmZHNmZGZnZGZnZGZkQGdtYWlsLmNvbSIsIm9yaWdfaWF0IjoxNjIyMTY3NjY5fQ.7WvxKra_SiUrogr5QUaehANDegDPJYfPN-f86sqMgjE'}`,
      'Content-Type': 'application/json',
    },
    data: params,
    method: 'POST',
    url: 'socialmedia/profile/profile_report/',
  };
  const {result, error} = yield call(httpClient, payload);
  if (!error) {
    if (result) {
      console.log(
        'report profile success',
        JSON.stringify(result, undefined, 2),
      );
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************change follow request status*******************************/

function* changeFollowRequestStatus({payload: {data, callback}}) {
  console.warn('data in saga Add Profile Pic Info', data);
  let params = {
    follow_user_id: data.follow_user_id,
    accept_request_status: data.accept_request_status,
  };

  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      //'Authorization': `Bearer ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxODI5LCJ1c2VybmFtZSI6InNkZmRzZmRmZ2RmZ2RmZEBnbWFpbC5jb20iLCJleHAiOjE2NDgwODc2NjksImVtYWlsIjoic2RmZHNmZGZnZGZnZGZkQGdtYWlsLmNvbSIsIm9yaWdfaWF0IjoxNjIyMTY3NjY5fQ.7WvxKra_SiUrogr5QUaehANDegDPJYfPN-f86sqMgjE'}`,
      'Content-Type': 'application/json',
    },
    data: params,
    method: 'POST',
    url: 'socialmedia/follow/userfollowerfollowing/',
  };
  const {result, error} = yield call(httpClient, payload);
  if (!error) {
    if (result) {
      console.log(
        'follow request status change',
        JSON.stringify(result, undefined, 2),
      );
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************change follow request status*******************************/

function* followUser({payload: {data, callback}}) {
  console.warn('data in saga Add Profile Pic Info', data);
  let params = {
    follow_status: data.follow_status,
    following_user_id: data.following_user_id,
  };

  if (data.hasOwnProperty('follow_user_id')) {
    params.follow_user_id = data.follow_user_id;
  }
  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      //'Authorization': `Bearer ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxODI5LCJ1c2VybmFtZSI6InNkZmRzZmRmZ2RmZ2RmZEBnbWFpbC5jb20iLCJleHAiOjE2NDgwODc2NjksImVtYWlsIjoic2RmZHNmZGZnZGZnZGZkQGdtYWlsLmNvbSIsIm9yaWdfaWF0IjoxNjIyMTY3NjY5fQ.7WvxKra_SiUrogr5QUaehANDegDPJYfPN-f86sqMgjE'}`,
      'Content-Type': 'application/json',
    },
    data: params,
    method: 'POST',
    url: 'socialmedia/follow/userfollowerfollowing/',
  };
  const {result, error} = yield call(httpClient, payload);
  if (!error) {
    if (result) {
      console.log(
        'follow the user by another user',
        JSON.stringify(result, undefined, 2),
      );
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************get all post of user*******************************/

function* getUserAllPost({payload: {data, callback}}) {
  console.warn('data in saga Add Profile Pic Info', data);

  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      //'Authorization': `Bearer ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxODI5LCJ1c2VybmFtZSI6InNkZmRzZmRmZ2RmZ2RmZEBnbWFpbC5jb20iLCJleHAiOjE2NDgwODc2NjksImVtYWlsIjoic2RmZHNmZGZnZGZnZGZkQGdtYWlsLmNvbSIsIm9yaWdfaWF0IjoxNjIyMTY3NjY5fQ.7WvxKra_SiUrogr5QUaehANDegDPJYfPN-f86sqMgjE'}`,
      'Content-Type': 'application/json',
    },
    //data: JSON.stringify(data.course_id),
    method: 'GET',
    url:
      'socialmedia/post/userpostdetailinfo/?user_id=' +
      data.user_id +
      '&count_type=' +
      data.count_type,
  };
  const {result, error} = yield call(httpClient, payload);
  if (!error) {
    if (result) {
      console.log(
        'get all the post of user',
        JSON.stringify(result, undefined, 2),
      );
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************create post request status*******************************/

function* createPost({payload: {data, callback}}) {
  console.warn('data in saga Add Profile Pic Info', data);
  let params = {
    caption: data.caption,
    post_gallery: data.post_gallery,
  };

  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      //'Authorization': `Bearer ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxODI5LCJ1c2VybmFtZSI6InNkZmRzZmRmZ2RmZ2RmZEBnbWFpbC5jb20iLCJleHAiOjE2NDgwODc2NjksImVtYWlsIjoic2RmZHNmZGZnZGZnZGZkQGdtYWlsLmNvbSIsIm9yaWdfaWF0IjoxNjIyMTY3NjY5fQ.7WvxKra_SiUrogr5QUaehANDegDPJYfPN-f86sqMgjE'}`,
      'Content-Type': 'application/json',
    },
    data: params,
    method: 'POST',
    url: 'socialmedia/post/uploaduserpost/',
  };
  const {result, error} = yield call(httpClient, payload);
  if (!error) {
    if (result) {
      console.log(
        'post creayed by the user',
        JSON.stringify(result, undefined, 2),
      );
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************delete post request status*******************************/

function* deletePost({payload: {data, callback}}) {
  //  console.warn('data in saga Add Profile Pic Info', data);
  let params = {
    id: data.id,
  };

  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      //'Authorization': `Bearer ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxODI5LCJ1c2VybmFtZSI6InNkZmRzZmRmZ2RmZ2RmZEBnbWFpbC5jb20iLCJleHAiOjE2NDgwODc2NjksImVtYWlsIjoic2RmZHNmZGZnZGZnZGZkQGdtYWlsLmNvbSIsIm9yaWdfaWF0IjoxNjIyMTY3NjY5fQ.7WvxKra_SiUrogr5QUaehANDegDPJYfPN-f86sqMgjE'}`,
      'Content-Type': 'application/json',
    },
    data: params,
    method: 'POST',
    url: 'socialmedia/post/userpostdelete/',
  };
  const {result, error} = yield call(httpClient, payload);
  if (!error) {
    if (result) {
      console.log(
        'post deleted by the user',
        JSON.stringify(result, undefined, 2),
      );
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************delete comment request status*******************************/

function* deleteComment({payload: {data, callback}}) {
  //  console.warn('data in saga Add Profile Pic Info', data);
  let params = {
    id: data.id,
  };

  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      //'Authorization': `Bearer ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxODI5LCJ1c2VybmFtZSI6InNkZmRzZmRmZ2RmZ2RmZEBnbWFpbC5jb20iLCJleHAiOjE2NDgwODc2NjksImVtYWlsIjoic2RmZHNmZGZnZGZnZGZkQGdtYWlsLmNvbSIsIm9yaWdfaWF0IjoxNjIyMTY3NjY5fQ.7WvxKra_SiUrogr5QUaehANDegDPJYfPN-f86sqMgjE'}`,
      'Content-Type': 'application/json',
    },
    data: params,
    method: 'POST',
    url:
      data.type == 'comment'
        ? 'socialmedia/comment/postcommentdelete/'
        : 'socialmedia/comment/replycommentdelete/',
  };
  const {result, error} = yield call(httpClient, payload);
  if (!error) {
    if (result) {
      console.log(
        'comment deleted by the user',
        JSON.stringify(result, undefined, 2),
      );
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/*************************get notification of users     **************/
function* getUserNotification({payload: {data, callback}}) {
  console.warn('data in saga Auth User Info', data);

  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      //'Authorization': `Bearer ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxODI5LCJ1c2VybmFtZSI6InNkZmRzZmRmZ2RmZ2RmZEBnbWFpbC5jb20iLCJleHAiOjE2NDgwODc2NjksImVtYWlsIjoic2RmZHNmZGZnZGZnZGZkQGdtYWlsLmNvbSIsIm9yaWdfaWF0IjoxNjIyMTY3NjY5fQ.7WvxKra_SiUrogr5QUaehANDegDPJYfPN-f86sqMgjE'}`,
      'Content-Type': 'application/json',
    },
    //data: JSON.stringify(data.course_id),
    method: 'GET',
    url: 'socialmedia/get_user_notification/?record=true&date_type=all',
  };
  const {result, error} = yield call(httpClient, payload);
  if (!error) {
    if (result) {
      console.log(
        'Get notification of user Result',
        JSON.stringify(result, undefined, 2),
      );
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************User Get Upload post image and videos*******************************/

function* uploadPostImageVideos({payload: {data, callback}}) {
  console.warn('data in saga Upload File By User', data);
  const formdata = new FormData();
  formdata.append('myFile', data.myFile);
  formdata.append('folder_name', data.folder_name);

  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      'Content-Type': 'application/json',
    },
    data: formdata,
    method: 'POST',
    url: 'uploadFile',
    // redirect: 'follow'
  };
  //console.warn('data in saga ADD  Course By User------------->', payload);
  const {result, error} = yield call(HttpClientPost, payload);
  if (!error) {
    if (result) {
      console.log(
        'Upload Post Image/Videos',
        JSON.stringify(result, undefined, 2),
      );
      callback({result, error});
      // const userToken = JSON.stringify(data).st result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************User GET Privacy Setting Auth Segas*******************************/

function* getPrivacySetting({payload: {data, callback}}) {
  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      // "Content-Type": "application/json"
    },
    method: 'GET',
    url: 'socialmedia/get_privacy_setting/',
  };
  const {result, error} = yield call(httpClient, payload);
  callback({result, error});
  if (!error) {
    if (result) {
      // console.log('get States result', JSON.stringify(result, undefined, 2));
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

/***************************User Social media Setting Status Post*******************************/

function* getSocialPrivacySetting({payload: {data, callback}}) {
  const params = {
    privacy_status: data.privacy_status,
  };

  const payload = {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    data: params,
    method: 'POST',
    url: 'socialmedia/socialmedia_privacy_setting/',
  };
  const {result, error} = yield call(httpClient, payload);
  if (!error) {
    if (result) {
      console.log(
        'user social setting status post result',
        JSON.stringify(result, undefined, 2),
      );
      callback({result, error});
      // const userToken = result.token;
      // const data = result.data;
      // yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

function* User() {
  yield all([
    yield takeLatest(EMAILLOGIN, emailLogin),
    yield takeLatest(UPDATEPERSONALINFO, updatePersonalinfo),
    yield takeLatest(REGISTER_USER, registerUser),
    yield takeLatest(GET_STATES, getStates),
    yield takeLatest(GET_CITY, getCity),
    yield takeLatest(GET_SCHOOL, getSchool),
    yield takeLatest(OTP_SUCCESS, otpSuccess),
    yield takeLatest(OTP_REGISTER_SUCCESS, registerOtpSuccess),
    yield takeLatest(KYC_SUCCESS, KycSuccess),
    yield takeLatest(ADD_EI, getAddEi),
    yield takeLatest(RESENDOTP, getResendotp),
    yield takeLatest(COURSELIST, getCourselist),
    yield takeLatest(STANDARD, getStandard),
    yield takeLatest(STANDARDCLASS, getStandardClass),
    yield takeLatest(ADDREGISTEREDEICOURSE, getAddRegisteredEiCourse),
    yield takeLatest(EICOURSECONFIRMATIONLIST, getEiCourseConfirmationList),
    yield takeLatest(REGSTEPCOUNT, getRegStepCount),
    yield takeLatest(DELETESCHOOLCOURSE, getDeleteCourseData),
    yield takeLatest(CHECKUSEREKYC, getCheckUserKyc),
    yield takeLatest(AUTHUSERINFO, getAuthUserInfo),
    yield takeLatest(GETREMINDERS, getReminders),
    yield takeLatest(ADDPROFILEPICINFO, getAddProfilePicInfo),
    yield takeLatest(ADDPROFILEPICINFOSKIP, getAddProfilePicInfoSkip),
    yield takeLatest(EDITCOURSELIST, getEditCourseList),
    yield takeLatest(EDITSTANDARD, getStandardEdit),
    yield takeLatest(ADDCOURSEBYUSER, getAddCourseByUser),
    yield takeLatest(ADDPASTEICOURSE, getAddPastEiCourse),
    yield takeLatest(GETADDMISSIONNODETAILBYSCHOOL, getAddmissionNoBySchool),
    yield takeLatest(GETCOURSELISTOTHER, getCourselistOther),
    yield takeLatest(UPLOADFILE, getUploadFile),
    yield takeLatest(ADMINFORGOTPASSWORD, getAdminForgotPassword),
    yield takeLatest(ADMINVEROFYRESETPASSWORD, getAdminVerifyResetPassword),
    yield takeLatest(SETNEWPASSWORD, getAdminSetNewPassword),
    yield takeLatest(SCHOOLZATCHUPID, getSchoolZatchUpId),
    yield takeLatest(STUDENTEDUCATIONPROFILE, getStudentEducationProfile),
    yield takeLatest(RESETPASSWORD, getResetPassword),
    yield takeLatest(NOTIFICATIONFETCHLIST, getNotificationFetch),
    yield takeLatest(SKIPPED, getskipped),
    yield takeLatest(EDITCOURSESTANDARD, geteditcoursestandard),
    yield takeLatest(CLASSLISTBYSTANDARDID, getClassListByStandard),
    yield takeLatest(EDITCOURSESTANDARDDROPDOWN, geteditcoursestandarddropdown),
    yield takeLatest(ADDUSERSTEPSEVEN, getadduserstepseven),
    yield takeLatest(USERCOURSECONFIRMATION, getusercourseconfirmation),
    yield takeLatest(
      USERCOURSECONFIRMATIONREVERIFY,
      getusercourseconfirmationreverify,
    ),
    yield takeLatest(USERDELETECOURSESTANDARD, getDeleteCourseStandard),
    yield takeLatest(CITYLISTSEARCH, getCitySearch),
    yield takeLatest(ADDCITYSTATEFORUSER, getAddcitystateofuser),
    yield takeLatest(STARTCLASSCOURSELIST, getStarclasscourselist),
    yield takeLatest(SCHOOLLISTFORSTARCLASS, getSchoollistforstarclass),
    yield takeLatest(COURSEPREVIEW, getCoursePreview),
    yield takeLatest(STARCLASSLECTURELISTBYCOURSEID, getStartClasslecturelist),
    yield takeLatest(
      STARCLASSLECTURELISTBYCOURSEIDCOURSEPREVIEW,
      getStartClasslecturelistcoursepreview,
    ),
    yield takeLatest(LECTUREHISTORY, getLecturehistory),
    yield takeLatest(
      GETUPDATESCHOOLCOURSEDETAILBYUSER,
      getUpdateschoolcoursedetailbyuser,
    ),
    yield takeLatest(
      SEARCHLISTFORSCHOOLSTUDENT,
      getSearchSchoolStudentSearchList,
    ),
    yield takeLatest(PROFILEDETAILOFUSER, getProfileDetailForUser),
    yield takeLatest(PROFILEDETAILOFSCHOOL, getProfileDetailForSchool),
    yield takeLatest(
      GETADMISSIONNUMBERDETAILBYSCHOOL,
      getGetAdmissionNumberDetailBySchool,
    ),
    yield takeLatest(USERCOURSEDELETENOT, getUserCourseDeleteNotConfirm),
    yield takeLatest(USEREDITADMISSIONROLLNO, getUsereditadmissionrollno),
    yield takeLatest(GETALLWORKDEPARTMENTS, getAllWorkDepartments),
    yield takeLatest(GETCOUNTRY, getCountry),
    yield takeLatest(USEREDITADMISSIONROLLNOTWO, getUsereditadmissionrollnotwo),
    yield takeLatest(CHATTEACHERLIST, getChatTeacherList),
    yield takeLatest(SCHOOLISTONUSER, getSchoolListOnUser),
    yield takeLatest(
      PENDINGUSERCHANGEDETAILLIST,
      getPendinguserchangedetaillist,
    ),
    yield takeLatest(DELETEPENDINGUSERREQUEST, getDeletePendingUserRequest),
    yield takeLatest(UPLOADEKYCFORDETAILCHANGE, getUploadekycfordetailchnage),
    yield takeLatest(USERPENDINGCOURSELISTOFUSER, getPendingCourseListOfUser),
    yield takeLatest(
      USERDELETEPENDINGCOURSEDETAIL,
      getUserdeletependingcoursedetail,
    ),
    yield takeLatest(
      USERCHANGECOURSESTANDARDDETAILBYSTUDENTBYID,
      getUserchangecoursestandarddetailbystudentbyid,
    ),
    yield takeLatest(
      USERCOURSEDELETEBEFORECONFORMATION,
      getUserCourseDeleteBeforConformation,
    ),
    yield takeLatest(USERCOURSECONFIRM, getUserCourseConfirm),
    yield takeLatest(USERGETSTATE, getUserGetState),
    yield takeLatest(USERGETCITY, getUserGetCity),
    yield takeLatest(USERWORKDETAIL, getUserWorkDetail),
    yield takeLatest(DELETEWORKDETAIL, getUserDeleteWorkDetail),
    yield takeLatest(UPLOADEKYCFORDETAILCHANGES, getUploadekycfordetailchange),
    yield takeLatest(
      UPLOADEKYCFORDETAILCHANGESDOB,
      getUploadekycfordetailchangedob,
    ),
    yield takeLatest(ADDPROFILEPICINFOEDU, getAddProfilePicInfoEdu),
    yield takeLatest(ADDPROFILEPICINFOEDU, getAddProfilePicInfoEdu),
    yield takeLatest(OTP_SUCCESS_SKIP, otpSuccessSkip),
    yield takeLatest(REQUESTCHANGEUSERDETAIL, requestChangeUserDetail),
    yield takeLatest(
      REQUESTCHANGEUSERDETAILVERIFYOTP,
      requestChangeUserDetailVerifyOtp,
    ),
    yield takeLatest(RESENDOTPEIDETAILCHANGE, getResendotpEiRequest),
    yield takeLatest(
      REQUESTCHANGEUSERDETAILEMAIL,
      requestChangeUserDetailEmail,
    ),
    yield takeLatest(
      REQUESTCHANGEUSERDETAILVERIFYOTPEMAIL,
      requestChangeUserDetailVerifyOtpEmail,
    ),
    yield takeLatest(RESENDOTPEIDETAILCHANGEEMAIL, getResendotpEiRequestEmail),
    yield takeLatest(USERSETTINGSTATUS, getUserSettingStatus),
    yield takeLatest(USERSETTINGSTATUSPOST, getUserSettingStatusPost),
    yield takeLatest(EIDETAILFORALREADYSTUDENT, getEidetailforalreadystudents),
    yield takeLatest(
      EIDETAILFORALREADYSTUDENTMULTI,
      getEidetailforalreadystudentsmulti,
    ),
    yield takeLatest(SENTFORAPPROVALVIEWSTATUS, getSentforapprovalviewstatus),
    yield takeLatest(LOGOUTVIEWSTATUS, getLogoutViewStatus),
    yield takeLatest(PROFILEDELETEZATCHUP, getProfileDeleteZatchupAccount),
    yield takeLatest(CHANGESTATUSACCEPTEDBYUSER, getChangestatusacceptedbyuser),
    yield takeLatest(
      CHANGESTATUSACCEPTEDBYUSERMULTI,
      getChangestatusacceptedbyusermulti,
    ),
    yield takeLatest(GETSCHOOLDETAILSCHOOLID, getSchooldetailschoolid),

    // Add new

    yield takeLatest(POSTOFUSER, getPostOfUser),
    yield takeLatest(UPLOADPOSTIMAGEVIDEOS, uploadPostImageVideos),
    yield takeLatest(LIKEUNLIKEPOST, likeUnlikePost),
    yield takeLatest(COMMENTLIKEUNLIKE, commentlikeUnlike),
    yield takeLatest(COMMENTPOST, commentPost),
    yield takeLatest(GETPOSTDETAIL, getPostDetails),
    yield takeLatest(REPLYCOMMENT, replyComment),
    yield takeLatest(GETUSERPROFILE, getUserProfile),
    yield takeLatest(GETUSERCOVERMEDIAPIC, getUserCoverMediaPic),
    yield takeLatest(GETSCHOOLPROFILE, getSchoolProfile),
    yield takeLatest(GETALUMIGALLERYDETAIL, getAlumniGalleryDetail),
    yield takeLatest(GETUSERNOTIFICATION, getUserNotification),
    yield takeLatest(GETSUGGESTIONS, getSuggestions),
    yield takeLatest(FOLLOWUSER, followUser),
    yield takeLatest(GETFOLLOWREQUEST, getFollowRequest),
    yield takeLatest(GETFOLLOWERS, getFollowers),
    yield takeLatest(GETFOLLOWING, getFollowing),
    yield takeLatest(GETREPORTDATA, getReportData),
    yield takeLatest(GETREPORTDATAUSER, getReportDataUser),
    yield takeLatest(REPORTPOST, reportPost),
    yield takeLatest(REPORTPROFILE, reportProfile),
    yield takeLatest(CHANGEFOLLOWREQUESTSTATUS, changeFollowRequestStatus),
    yield takeLatest(CREATEPOST, createPost),
    yield takeLatest(DELETEPOST, deletePost),
    yield takeLatest(GETUSERALLPOST, getUserAllPost),
    yield takeLatest(DELETECOMMENT, deleteComment),
    yield takeLatest(CHANGEPROFILEIMAGE, changeProfileImage),
    yield takeLatest(GETPRIVACYSETTING, getPrivacySetting),
    yield takeLatest(SOCIALPRIVACYSETTING, getSocialPrivacySetting),

    yield takeLatest(CHANGESOCIALMEDIASTATUS, changeSocialMediaStatus),
    yield takeLatest(CHANGEPRIVATESTATUS, changePrivateStatus),
    yield takeLatest(BLOACKUSER, blockUser),
    yield takeLatest(GETBLOCKLIST, getBlockList),
  ]);
}

export default User;
