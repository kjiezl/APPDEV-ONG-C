import { eventChannel, EventChannel } from 'redux-saga';
import { takeLatest, put, call, take, select, cancelled, fork } from 'redux-saga/effects';
import * as types from '../actions/actionTypes';
import {
  mercureConnected,
  mercureDisconnected,
  mercureError,
  mercureBookingCreated,
  mercureBookingUpdated,
  mercureBookingCancelled,
  mercurePhotographerUpdated,
  mercureProfileUpdated,
} from '../actions/mercureActions';
import { connect, disconnect, TOPICS } from '../../services/mercure';
import type { MercureMessage } from '../../services/mercure';
import * as mercureApi from '../api/mercure';
import { RootState } from '../reducers';

/**
 * Creates a Redux-Saga EventChannel that bridges Mercure SSE events
 * into the saga world.
 */
function createMercureChannel(
  topics: string[],
  subscriberToken: string,
): EventChannel<MercureMessage | { type: 'connected' } | { type: 'error'; error: any }> {
  return eventChannel(emitter => {
    connect(
      topics,
      subscriberToken,
      (message: MercureMessage) => {
        emitter(message);
      },
      (error: any) => {
        emitter({ type: 'error', error });
      },
    );

    // Emit a connected signal after setup
    setTimeout(() => emitter({ type: 'connected' } as any), 0);

    // Unsubscribe function
    return () => {
      disconnect();
    };
  });
}

/**
 * Dispatches the correct Redux action based on the Mercure event type.
 */
function* handleMercureMessage(message: MercureMessage): Generator<any, void, any> {
  const { event, data } = message;

  if (__DEV__) {
    console.log('[Mercure Saga] Handling event:', event, 'with data:', data);
  }

  switch (event) {
    case 'booking.created':
      yield put(mercureBookingCreated(data));
      break;
    case 'booking.updated':
      if (__DEV__) {
        console.log('[Mercure Saga] Dispatching booking updated:', data);
      }
      yield put(mercureBookingUpdated(data));
      break;
    case 'booking.cancelled':
      yield put(mercureBookingCancelled(data));
      break;
    case 'photographer.updated':
    case 'photographer.created':
    case 'photographer.deleted':
      yield put(mercurePhotographerUpdated(data));
      break;
    case 'profile.updated':
      yield put(mercureProfileUpdated(data));
      break;
    default:
      if (__DEV__) {
        console.log('[Mercure Saga] Unhandled event:', event, data);
      }
  }
}

/**
 * Main connection handler — fetches a subscriber token, opens the SSE
 * connection, and listens for messages until disconnected.
 */
function* handleMercureConnect(): Generator<any, void, any> {
  let channel: EventChannel<any> | undefined;

  try {
    // Get current user from state
    const user = yield select((state: RootState) => state.auth.user);
    if (!user?.id) {
      yield put(mercureError('Cannot connect to Mercure: no authenticated user'));
      return;
    }

    // Fetch a Mercure subscriber JWT from the backend
    const { token: subscriberToken } = yield call(mercureApi.getMercureToken);

    // Build the list of topics to subscribe to
    const topics: string[] = [
      TOPICS.USER_BOOKINGS(user.id),
      TOPICS.PHOTOGRAPHERS,
      TOPICS.PROFILE(user.id),
    ];

    // Open the EventChannel
    channel = yield call(createMercureChannel, topics, subscriberToken);
    yield put(mercureConnected());

    // Listen for messages forever (until channel closes or saga is cancelled)
    while (true) {
      const message: any = yield take(channel!);

      if (message.type === 'connected') {
        continue;
      }

      if (message.type === 'error') {
        yield put(mercureError(String(message.error)));
        continue;
      }

      // It's a MercureMessage
      yield call(handleMercureMessage, message as MercureMessage);
    }
  } catch (error: any) {
    yield put(mercureError(error.message || 'Mercure connection failed'));
  } finally {
    if (yield cancelled()) {
      channel?.close();
      disconnect();
    }
    yield put(mercureDisconnected());
  }
}

/**
 * Handles explicit disconnect requests.
 */
function* handleMercureDisconnect(): Generator<any, void, any> {
  disconnect();
  yield put(mercureDisconnected());
}

/**
 * Auto-connect to Mercure after a successful login / Google login.
 */
function* watchAuthSuccess(): Generator<any, void, any> {
  while (true) {
    yield take([
      types.LOGIN_SUCCESS,
      types.GOOGLE_LOGIN_SUCCESS,
      types.GET_PROFILE_SUCCESS,
    ]);

    // Small delay to let the auth state settle
    yield call(delay, 500);
    yield put({ type: types.MERCURE_CONNECT_REQUEST });
  }
}

/**
 * Auto-disconnect from Mercure on logout.
 */
function* watchLogout(): Generator<any, void, any> {
  while (true) {
    yield take(types.LOGOUT_SUCCESS);
    yield put({ type: types.MERCURE_DISCONNECT_REQUEST });
  }
}

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default function* mercureSaga(): Generator<any, void, any> {
  yield takeLatest(types.MERCURE_CONNECT_REQUEST, handleMercureConnect);
  yield takeLatest(types.MERCURE_DISCONNECT_REQUEST, handleMercureDisconnect);
  yield fork(watchAuthSuccess);
  yield fork(watchLogout);
}
