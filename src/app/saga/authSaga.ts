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
  updateProfileSuccess,
  updateProfileFailure,
} from '../actions/authActions';
import { signInWithGoogle } from '../../services/firebase/googleAuth';
import * as authApi from '../api/auth';

function* handleLogin(action: any): Generator<any, void, any> {
  try {
    const {username, password} = action.payload;
    const response = yield call(authApi.login, username, password);
    // Extract user data if nested, otherwise use full response
    const userData = response.user || response;
    // Normalize field names: convert camelCase to snake_case
    const normalizedUserData = {
      ...userData,
      created_at: userData.created_at || userData.createdAt,
      updated_at: userData.updated_at || userData.updatedAt,
    };
    yield put(loginSuccess(normalizedUserData));
  } catch (error: any) {
    yield put(loginFailure(error.message));
  }
}

function* handleRegister(action: any): Generator<any, void, any> {
  try {
    const {username, email, password, accountType} = action.payload;
    const response = yield call(authApi.register, username, email, password, accountType);
    // Extract user data if nested, otherwise use full response
    const userData = response.user || response;
    // Normalize field names: convert camelCase to snake_case
    const normalizedUserData = {
      ...userData,
      created_at: userData.created_at || userData.createdAt,
      updated_at: userData.updated_at || userData.updatedAt,
    };
    yield put(registerSuccess(normalizedUserData));
  } catch (error: any) {
    yield put(registerFailure(error.message));
  }
}

function* handleGoogleLogin(): Generator<any, void, any> {
  try {
    const { idToken, googleUser } = yield call(signInWithGoogle);
    const response = yield call(
      authApi.googleLogin,
      idToken,
      googleUser.email,
      googleUser.displayName,
    );
    console.log('GOOGLE_LOGIN response:', JSON.stringify(response, null, 2));
    // Backend returns { token, user: {...} } - extract just the user data
    const userData = response.user || response;
    console.log('GOOGLE_LOGIN userData:', JSON.stringify(userData, null, 2));
    // Normalize field names: convert camelCase to snake_case
    const normalizedUserData = {
      ...userData,
      created_at: userData.created_at || userData.createdAt,
      updated_at: userData.updated_at || userData.updatedAt,
    };
    console.log('GOOGLE_LOGIN normalized:', JSON.stringify(normalizedUserData, null, 2));
    yield put(googleLoginSuccess(normalizedUserData));
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
    console.log('GET_PROFILE response:', JSON.stringify(response, null, 2));
    // Extract user data if nested, otherwise use full response
    const userData = response.user || response;
    console.log('Extracted userData:', JSON.stringify(userData, null, 2));
    console.log('created_at value:', userData.created_at);
    console.log('createdAt value:', userData.createdAt);
    // Normalize field names: convert camelCase to snake_case
    const normalizedUserData = {
      ...userData,
      created_at: userData.created_at || userData.createdAt,
      updated_at: userData.updated_at || userData.updatedAt,
    };
    console.log('Normalized userData:', JSON.stringify(normalizedUserData, null, 2));
    yield put(getProfileSuccess(normalizedUserData));
  } catch (error: any) {
    console.log('GET_PROFILE error:', error.message);
    yield put(getProfileFailure(error.message));
  }
}

function* handleUpdateProfile(action: any): Generator<any, void, any> {
  try {
    const response = yield call(authApi.updateProfile, action.payload);
    // Extract user data if nested, otherwise use full response
    const userData = response.user || response;
    // Normalize field names: convert camelCase to snake_case
    const normalizedUserData = {
      ...userData,
      created_at: userData.created_at || userData.createdAt,
      updated_at: userData.updated_at || userData.updatedAt,
    };
    yield put(updateProfileSuccess(normalizedUserData));
  } catch (error: any) {
    yield put(updateProfileFailure(error.message));
  }
}

export default function* authSaga(): Generator<any, void, any> {
  yield takeLatest(types.LOGIN_REQUEST, handleLogin);
  yield takeLatest(types.REGISTER_REQUEST, handleRegister);
  yield takeLatest(types.GOOGLE_LOGIN_REQUEST, handleGoogleLogin);
  yield takeLatest(types.LOGOUT_REQUEST, handleLogout);
  yield takeLatest(types.GET_PROFILE_REQUEST, handleGetProfile);
  yield takeLatest(types.UPDATE_PROFILE_REQUEST, handleUpdateProfile);
}
