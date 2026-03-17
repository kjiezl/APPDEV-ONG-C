import {takeLatest, put, call} from 'redux-saga/effects';
import * as types from '../actions/actionTypes';
import {
  loginSuccess,
  loginFailure,
  registerSuccess,
  registerFailure,
  logoutSuccess,
  getProfileSuccess,
  getProfileFailure,
} from '../actions/authActions';
import * as authApi from '../api/auth';

function* handleLogin(action) {
  try {
    const {username, password} = action.payload;
    const response = yield call(authApi.login, username, password);
    yield put(loginSuccess(response));
  } catch (error) {
    yield put(loginFailure(error.message));
  }
}

function* handleRegister(action) {
  try {
    const {username, email, password, accountType} = action.payload;
    const response = yield call(authApi.register, username, email, password, accountType);
    yield put(registerSuccess(response));
  } catch (error) {
    yield put(registerFailure(error.message));
  }
}

function* handleLogout() {
  try {
    yield call(authApi.logout);
    yield put(logoutSuccess());
  } catch (error) {
    console.log('Logout error:', error);
  }
}

function* handleGetProfile() {
  try {
    const response = yield call(authApi.getProfile);
    yield put(getProfileSuccess(response));
  } catch (error) {
    yield put(getProfileFailure(error.message));
  }
}

export default function* authSaga() {
  yield takeLatest(types.LOGIN_REQUEST, handleLogin);
  yield takeLatest(types.REGISTER_REQUEST, handleRegister);
  yield takeLatest(types.LOGOUT_REQUEST, handleLogout);
  yield takeLatest(types.GET_PROFILE_REQUEST, handleGetProfile);
}
