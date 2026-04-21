import {all, fork} from 'redux-saga/effects';
import authSaga from './authSaga';

export default function* rootSaga(): Generator<any, void, any> {
  yield all([
    fork(authSaga),
  ]);
}
