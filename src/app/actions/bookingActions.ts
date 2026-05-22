import * as types from './actionTypes';

// Get all bookings
export const getBookingsRequest = () => ({
  type: types.GET_BOOKINGS_REQUEST,
});

export const getBookingsSuccess = (bookings: any[]) => ({
  type: types.GET_BOOKINGS_SUCCESS,
  payload: bookings,
});

export const getBookingsFailure = (error: string) => ({
  type: types.GET_BOOKINGS_FAILURE,
  payload: error,
});

// Get single booking
export const getBookingRequest = (id: number) => ({
  type: types.GET_BOOKING_REQUEST,
  payload: id,
});

export const getBookingSuccess = (booking: any) => ({
  type: types.GET_BOOKING_SUCCESS,
  payload: booking,
});

export const getBookingFailure = (error: string) => ({
  type: types.GET_BOOKING_FAILURE,
  payload: error,
});

// Create booking
export const createBookingRequest = (bookingData: {
  photographer_id: number;
  date: string;
  notes?: string;
}) => ({
  type: types.CREATE_BOOKING_REQUEST,
  payload: bookingData,
});

export const createBookingSuccess = (booking: any) => ({
  type: types.CREATE_BOOKING_SUCCESS,
  payload: booking,
});

export const createBookingFailure = (error: string) => ({
  type: types.CREATE_BOOKING_FAILURE,
  payload: error,
});

// Cancel booking
export const cancelBookingRequest = (id: number) => ({
  type: types.CANCEL_BOOKING_REQUEST,
  payload: id,
});

export const cancelBookingSuccess = (booking: any) => ({
  type: types.CANCEL_BOOKING_SUCCESS,
  payload: booking,
});

export const cancelBookingFailure = (error: string) => ({
  type: types.CANCEL_BOOKING_FAILURE,
  payload: error,
});
