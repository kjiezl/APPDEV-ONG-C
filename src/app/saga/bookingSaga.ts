import {takeLatest, put, call} from 'redux-saga/effects';
import * as types from '../actions/actionTypes';
import {
  getBookingsSuccess,
  getBookingsFailure,
  getBookingSuccess,
  getBookingFailure,
  createBookingSuccess,
  createBookingFailure,
  cancelBookingSuccess,
  cancelBookingFailure,
} from '../actions/bookingActions';
import * as bookingsApi from '../api/bookings';

function* handleGetBookings(): Generator<any, void, any> {
  try {
    const response = yield call(bookingsApi.getBookings);
    yield put(getBookingsSuccess(response));
  } catch (error: any) {
    yield put(getBookingsFailure(error.message));
  }
}

function* handleGetBooking(action: any): Generator<any, void, any> {
  try {
    const response = yield call(bookingsApi.getBooking, action.payload);
    yield put(getBookingSuccess(response));
  } catch (error: any) {
    yield put(getBookingFailure(error.message));
  }
}

function* handleCreateBooking(action: any): Generator<any, void, any> {
  try {
    const response = yield call(bookingsApi.createBooking, action.payload);
    yield put(createBookingSuccess(response));
  } catch (error: any) {
    yield put(createBookingFailure(error.message));
  }
}

function* handleCancelBooking(action: any): Generator<any, void, any> {
  try {
    const response = yield call(bookingsApi.cancelBooking, action.payload);
    yield put(cancelBookingSuccess(response));
  } catch (error: any) {
    yield put(cancelBookingFailure(error.message));
  }
}

export default function* bookingSaga(): Generator<any, void, any> {
  yield takeLatest(types.GET_BOOKINGS_REQUEST, handleGetBookings);
  yield takeLatest(types.GET_BOOKING_REQUEST, handleGetBooking);
  yield takeLatest(types.CREATE_BOOKING_REQUEST, handleCreateBooking);
  yield takeLatest(types.CANCEL_BOOKING_REQUEST, handleCancelBooking);
}
