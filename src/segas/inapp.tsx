import {put, takeLatest, all, call, takeEvery} from 'redux-saga/effects';
import {
  // LOGIN_SUCCESS,
} from '../actions/in-app-actions-types';
import httpClient from './http-client';
import Toast from 'react-native-simple-toast';

/***************************User Auth Segas*******************************/

function* emailLogin({payload: {data, callback}}) {
  console.warn('data in saga', data);
  const payload = {
    data: JSON.stringify(data),
    method: 'POST',
    url: 'login',
  };
  const {result, error} = yield call(httpClient, payload);
  if (!error) {
    if (result) {
      callback(result, error);
      const userToken = result.token;
      const data = result.data;
      yield put(loginSuccess({userToken, data}));
    } else {
      Toast.show(result.message);
    }
  }
}

function* registerUser({payload: {data, callback}}) {
  const payload = {
    data: JSON.stringify(data),
    method: 'POST',
    url: 'register',
  };
  const {result, error} = yield call(httpClient, payload);
  console.warn(
    'resuthghgjgjgjgjgjgjgjgjhgjggjgl',
    JSON.stringify(result, undefined, 2),
  );
  callback({result, error});
  if (!error) {
    if (result.success === true) {
      const userToken = result.token;
      const data = result.data;
      yield put(registerSuccess({userToken, data}));
      Toast.show(result.message);
    } else {
      Toast.show(result.message);
    }
  }
}

function* InApp() {
  yield all([
    // yield takeLatest(EMAILLOGIN, emailLogin),
    // yield takeLatest(REGISTER_USER, registerUser),
  ]);
}

export default InApp;
