import {takeLatest, put, call} from 'redux-saga/effects';
import * as types from '../actions/actionTypes';
import {
  getPhotographersSuccess,
  getPhotographersFailure,
  getPhotographerSuccess,
  getPhotographerFailure,
} from '../actions/photographerActions';
import * as photographersApi from '../api/photographers';

function* handleGetPhotographers(): Generator<any, void, any> {
  try {
    const response = yield call(photographersApi.getPhotographers);
    yield put(getPhotographersSuccess(response));
  } catch (error: any) {
    yield put(getPhotographersFailure(error.message));
  }
}

function* handleGetPhotographer(action: any): Generator<any, void, any> {
  try {
    const response = yield call(photographersApi.getPhotographer, action.payload);
    yield put(getPhotographerSuccess(response));
  } catch (error: any) {
    yield put(getPhotographerFailure(error.message));
  }
}

export default function* photographerSaga(): Generator<any, void, any> {
  yield takeLatest(types.GET_PHOTOGRAPHERS_REQUEST, handleGetPhotographers);
  yield takeLatest(types.GET_PHOTOGRAPHER_REQUEST, handleGetPhotographer);
}
