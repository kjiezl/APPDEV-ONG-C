import {takeLatest, put, call} from 'redux-saga/effects';
import * as types from '../actions/actionTypes';
import {
  loginSuccess,
  loginFailure,
  registerSuccess,
  registerFailure,
  googleLoginSuccess,
  googleLoginFailure,
  logoutSuccess,
  getProfileSuccess,
  getProfileFailure,
} from '../actions/authActions';
import { signInWithGoogle } from '../../services/firebase/googleAuth';
import * as authApi from '../api/auth';

function* handleLogin(action: any): Generator<any, void, any> {
  try {
    const {username, password} = action.payload;
    const response = yield call(authApi.login, username, password);
    yield put(loginSuccess(response));
  } catch (error: any) {
    yield put(loginFailure(error.message));
  }
}

function* handleRegister(action: any): Generator<any, void, any> {
  try {
    const {username, email, password, accountType} = action.payload;
    const response = yield call(authApi.register, username, email, password, accountType);
    yield put(registerSuccess(response));
  } catch (error: any) {
    yield put(registerFailure(error.message));
  }
}

function* handleGoogleLogin(): Generator<any, void, any> {
  try {
    const { user, idToken } = yield call(signInWithGoogle);
    const response = yield call(
      authApi.googleLogin,
      idToken,
      user.email,
      user.displayName,
    );
    yield put(googleLoginSuccess(response));
  } catch (error: any) {
    yield put(googleLoginFailure(error.message));
  }
}

function* handleLogout(): Generator<any, void, any> {
  try {
    yield call(authApi.logout);
    yield put(logoutSuccess());
  } catch (error: any) {
    console.log('Logout error:', error);
  }
}

function* handleGetProfile(): Generator<any, void, any> {
  try {
    const response = yield call(authApi.getProfile);
    yield put(getProfileSuccess(response));
  } catch (error: any) {
    yield put(getProfileFailure(error.message));
  }
}

export default function* authSaga(): Generator<any, void, any> {
  yield takeLatest(types.LOGIN_REQUEST, handleLogin);
  yield takeLatest(types.REGISTER_REQUEST, handleRegister);
  yield takeLatest(types.GOOGLE_LOGIN_REQUEST, handleGoogleLogin);
  yield takeLatest(types.LOGOUT_REQUEST, handleLogout);
  yield takeLatest(types.GET_PROFILE_REQUEST, handleGetProfile);
}
