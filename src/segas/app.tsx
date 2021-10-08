import {put, takeLatest, all} from 'redux-saga/effects';
import {SHOW_TOAST, SHOW_ERROR_TOAST} from '../actions/app-actions-types';
import Toast from 'react-native-simple-toast';

function* showToast(action) {
  yield put(Toast.show(action.payload));
}

function* showErrorToast(action) {
  yield put(Toast.show(action.payload));
}

function* app() {
  yield all([
    yield takeLatest(SHOW_TOAST, showToast),
    yield takeLatest(SHOW_ERROR_TOAST, showErrorToast),
  ]);
}

export default app;
