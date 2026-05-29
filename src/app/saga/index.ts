import {all, fork} from 'redux-saga/effects';
import authSaga from './authSaga';
import bookingSaga from './bookingSaga';
import photographerSaga from './photographerSaga';
import mercureSaga from './mercureSaga';
import notificationPollingSaga from './notificationPollingSaga';

export default function* rootSaga(): Generator<any, void, any> {
  yield all([
    fork(authSaga),
    fork(bookingSaga),
    fork(photographerSaga),
    fork(mercureSaga),
    fork(notificationPollingSaga),
  ]);
}
