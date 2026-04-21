import * as types from '../actions/actionTypes';

interface AuthState {
  user: any;
  loading: boolean;
  error: string | null;
}

interface AuthAction {
  type: string;
  payload?: any;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

const authReducer = (state: AuthState = initialState, action: AuthAction): AuthState => {
  switch (action.type) {
    // Login
    case types.LOGIN_REQUEST:
    case types.REGISTER_REQUEST:
    case types.GOOGLE_LOGIN_REQUEST:
    case types.GET_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.LOGIN_SUCCESS:
    case types.REGISTER_SUCCESS:
    case types.GOOGLE_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: null,
      };
    case types.LOGIN_FAILURE:
    case types.REGISTER_FAILURE:
    case types.GOOGLE_LOGIN_FAILURE:
    case types.GET_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.GET_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: null,
      };
    case types.LOGOUT_SUCCESS:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default authReducer;
