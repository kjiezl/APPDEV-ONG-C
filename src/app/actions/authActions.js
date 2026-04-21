import * as types from './actionTypes';

// Login
export const loginRequest = (username, password) => ({
  type: types.LOGIN_REQUEST,
  payload: {username, password},
});

export const loginSuccess = (user) => ({
  type: types.LOGIN_SUCCESS,
  payload: user,
});

export const loginFailure = (error) => ({
  type: types.LOGIN_FAILURE,
  payload: error,
});

// Register
export const registerRequest = (username, email, password, accountType) => ({
  type: types.REGISTER_REQUEST,
  payload: {username, email, password, accountType},
});

export const registerSuccess = (user) => ({
  type: types.REGISTER_SUCCESS,
  payload: user,
});

export const registerFailure = (error) => ({
  type: types.REGISTER_FAILURE,
  payload: error,
});

// Google Login
export const googleLoginRequest = () => ({
  type: types.GOOGLE_LOGIN_REQUEST,
});

export const googleLoginSuccess = (user) => ({
  type: types.GOOGLE_LOGIN_SUCCESS,
  payload: user,
});

export const googleLoginFailure = (error) => ({
  type: types.GOOGLE_LOGIN_FAILURE,
  payload: error,
});

// Logout
export const logoutRequest = () => ({
  type: types.LOGOUT_REQUEST,
});

export const logoutSuccess = () => ({
  type: types.LOGOUT_SUCCESS,
});

// Get Profile
export const getProfileRequest = () => ({
  type: types.GET_PROFILE_REQUEST,
});

export const getProfileSuccess = (profile) => ({
  type: types.GET_PROFILE_SUCCESS,
  payload: profile,
});

export const getProfileFailure = (error) => ({
  type: types.GET_PROFILE_FAILURE,
  payload: error,
});
