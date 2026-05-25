import * as types from '../actions/actionTypes';

interface PhotographerState {
  photographers: any[];
  selectedPhotographer: any | null;
  loading: boolean;
  error: string | null;
}

interface PhotographerAction {
  type: string;
  payload?: any;
}

const initialState: PhotographerState = {
  photographers: [],
  selectedPhotographer: null,
  loading: false,
  error: null,
};

const photographerReducer = (state: PhotographerState = initialState, action: PhotographerAction): PhotographerState => {
  switch (action.type) {
    case types.GET_PHOTOGRAPHERS_REQUEST:
    case types.GET_PHOTOGRAPHER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.GET_PHOTOGRAPHERS_SUCCESS:
      return {
        ...state,
        loading: false,
        photographers: action.payload,
        error: null,
      };
    case types.GET_PHOTOGRAPHER_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedPhotographer: action.payload,
        error: null,
      };
    case types.GET_PHOTOGRAPHERS_FAILURE:
    case types.GET_PHOTOGRAPHER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    // Mercure real-time events
    case types.MERCURE_PHOTOGRAPHER_UPDATED: {
      const updated = action.payload;
      const exists = state.photographers.some((p: any) => p.id === updated.id);
      return {
        ...state,
        photographers: exists
          ? state.photographers.map((p: any) => (p.id === updated.id ? updated : p))
          : [...state.photographers, updated],
        selectedPhotographer:
          state.selectedPhotographer?.id === updated.id
            ? updated
            : state.selectedPhotographer,
      };
    }
    case types.LOGOUT_SUCCESS:
      return { ...initialState };
    default:
      return state;
  }
};

export default photographerReducer;
