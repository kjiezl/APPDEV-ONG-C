import { call, put, select, delay, take, race, fork, cancel } from 'redux-saga/effects';
import * as types from '../actions/actionTypes';
import { addNotification, setLastKnownStatus } from '../actions/notificationActions';
import { getBookingNotificationText } from '../../utils/notificationMessages';
import { RootState } from '../reducers';
import { getBookings } from '../api/bookings'; // ← adjust function name if different

const POLL_INTERVAL = 30_000;

function* pollBookings(): Generator<any, void, any> {
  while (true) {
    try {
      // fetchBookings should return the array of bookings directly
      const bookings: any[] = yield call(getBookings);
      const lastKnown: Record<string, string> = yield select(
        (state: RootState) => state.notifications.lastKnownStatuses,
      );

      for (const booking of bookings ?? []) {
        const id = String(booking.id);
        const currentStatus = booking.status;
        const previousStatus = lastKnown[id];

        if (!previousStatus) {
          // First time seeing this booking — just record the baseline, no notification
          yield put(setLastKnownStatus(id, currentStatus));
          continue;
        }

        if (previousStatus !== currentStatus) {
          yield put(setLastKnownStatus(id, currentStatus));
          const text = getBookingNotificationText(currentStatus, booking?.photographer?.username);
          yield put(addNotification({
            type: 'booking.updated',
            ...text,
            bookingId: booking.id,
            status: currentStatus,
          }));
        }
      }
    } catch (e) {
      if (__DEV__) console.warn('[Polling] Failed to fetch bookings:', e);
    }

    yield delay(POLL_INTERVAL);
  }
}

export default function* notificationPollingSaga(): Generator<any, void, any> {
  while (true) {
    yield take(types.MERCURE_DISCONNECTED);
    if (__DEV__) console.log('[Polling] Mercure down — starting fallback polling');

    const pollTask = yield fork(pollBookings);

    yield take(types.MERCURE_CONNECTED);
    yield cancel(pollTask as any);
    if (__DEV__) console.log('[Polling] Mercure back — stopping fallback polling');
  }
}