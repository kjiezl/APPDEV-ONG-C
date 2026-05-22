import {combineReducers} from 'redux';
import authReducer from './authReducer';
import bookingReducer from './bookingReducer';
import photographerReducer from './photographerReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  bookings: bookingReducer,
  photographers: photographerReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
