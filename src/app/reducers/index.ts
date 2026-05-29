import {combineReducers} from 'redux';
import authReducer from './authReducer';
import bookingReducer from './bookingReducer';
import photographerReducer from './photographerReducer';
import notificationsReducer from './notificationsReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  bookings: bookingReducer,
  photographers: photographerReducer,
  notifications: notificationsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
