import * as types from './actionTypes';

// Connection lifecycle
export const mercureConnectRequest = () => ({
  type: types.MERCURE_CONNECT_REQUEST,
});

export const mercureConnected = () => ({
  type: types.MERCURE_CONNECTED,
});

export const mercureDisconnectRequest = () => ({
  type: types.MERCURE_DISCONNECT_REQUEST,
});

export const mercureDisconnected = () => ({
  type: types.MERCURE_DISCONNECTED,
});

export const mercureError = (error: string) => ({
  type: types.MERCURE_ERROR,
  payload: error,
});

// Incoming real-time data events
export const mercureBookingCreated = (booking: any) => ({
  type: types.MERCURE_BOOKING_CREATED,
  payload: booking,
});

export const mercureBookingUpdated = (booking: any) => ({
  type: types.MERCURE_BOOKING_UPDATED,
  payload: booking,
});

export const mercureBookingCancelled = (booking: any) => ({
  type: types.MERCURE_BOOKING_CANCELLED,
  payload: booking,
});

export const mercurePhotographerUpdated = (photographer: any) => ({
  type: types.MERCURE_PHOTOGRAPHER_UPDATED,
  payload: photographer,
});

export const mercureProfileUpdated = (profile: any) => ({
  type: types.MERCURE_PROFILE_UPDATED,
  payload: profile,
});
