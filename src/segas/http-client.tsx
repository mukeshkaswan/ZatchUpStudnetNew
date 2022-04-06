import {call, select, put, delay} from 'redux-saga/effects';
import {showLoader, hideLoader} from '../actions/app-actions-types';
import getAxiosInstance from '../utilities/axiosInstance';
import Idx from 'idx';
import Toast from 'react-native-simple-toast';

const message =
  "Please make sure you're connected with internet or our servers are not responding.";

function* HttpClient(payload) {
  if (!payload.hideLoader) {
    //yield put(showLoader());
  }
  const data = {...payload};
  console.log(
    '%c------ payload ------ ',
    'color: green; font-size:10px',
    JSON.stringify(data, undefined, 2),
  );
  const axiosInstance = getAxiosInstance();
  
  try {
    const {data: result} = yield call(axiosInstance, data);
    if (!payload.hideLoader) {
      yield put(hideLoader());
    }

    // eslint-disable-next-line no-console
    console.log(
      '%c------ result ------ ',
      'color: green; font-size:10px',
      result,
    );

    return {
      error: null,
      result,
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('%c------ error ------ ', 'color: red; font-size:10px', error);
    if (!payload.hideLoader) {
      yield put(hideLoader());
    }

    // yield put(hideLoader());
    if (Idx(error, _ => _.code)) {
      if (error.code === 'ECONNABORTED') {
        //Toast.show(message, Toast.LONG);
      }
    }
    if (Idx(error, _ => _.statusCode)) {
    } else {
      //Toast.show(error.message, Toast.LONG);
    }

    return {
      error,
      result: null,
    };
  }
}

export default HttpClient;
