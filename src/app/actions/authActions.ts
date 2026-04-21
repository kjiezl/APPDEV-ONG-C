import * as types from './actionTypes';

// Login
export const loginRequest = (username: string, password: string) => ({
  type: types.LOGIN_REQUEST,
  payload: {username, password},
});

export const loginSuccess = (user: any) => ({
  type: types.LOGIN_SUCCESS,
  payload: user,
});

export const loginFailure = (error: string) => ({
  type: types.LOGIN_FAILURE,
  payload: error,
});

// Register
export const registerRequest = (username: string, email: string, password: string, accountType: string) => ({
  type: types.REGISTER_REQUEST,
  payload: {username, email, password, accountType},
});

export const registerSuccess = (user: any) => ({
  type: types.REGISTER_SUCCESS,
  payload: user,
});

export const registerFailure = (error: string) => ({
  type: types.REGISTER_FAILURE,
  payload: error,
});

// Google Login
export const googleLoginRequest = () => ({
  type: types.GOOGLE_LOGIN_REQUEST,
});

export const googleLoginSuccess = (user: any) => ({
  type: types.GOOGLE_LOGIN_SUCCESS,
  payload: user,
});

export const googleLoginFailure = (error: string) => ({
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

export const getProfileSuccess = (profile: any) => ({
  type: types.GET_PROFILE_SUCCESS,
  payload: profile,
});

export const getProfileFailure = (error: string) => ({
  type: types.GET_PROFILE_FAILURE,
  payload: error,
});
