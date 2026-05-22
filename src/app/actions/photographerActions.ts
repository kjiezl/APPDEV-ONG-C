import * as types from './actionTypes';

// Get all photographers
export const getPhotographersRequest = () => ({
  type: types.GET_PHOTOGRAPHERS_REQUEST,
});

export const getPhotographersSuccess = (photographers: any[]) => ({
  type: types.GET_PHOTOGRAPHERS_SUCCESS,
  payload: photographers,
});

export const getPhotographersFailure = (error: string) => ({
  type: types.GET_PHOTOGRAPHERS_FAILURE,
  payload: error,
});

// Get single photographer
export const getPhotographerRequest = (id: number) => ({
  type: types.GET_PHOTOGRAPHER_REQUEST,
  payload: id,
});

export const getPhotographerSuccess = (photographer: any) => ({
  type: types.GET_PHOTOGRAPHER_SUCCESS,
  payload: photographer,
});

export const getPhotographerFailure = (error: string) => ({
  type: types.GET_PHOTOGRAPHER_FAILURE,
  payload: error,
});
