import * as types from '../actions/actionTypes';

interface BookingState {
  bookings: any[];
  selectedBooking: any | null;
  loading: boolean;
  error: string | null;
}

interface BookingAction {
  type: string;
  payload?: any;
}

const initialState: BookingState = {
  bookings: [],
  selectedBooking: null,
  loading: false,
  error: null,
};

const bookingReducer = (state: BookingState = initialState, action: BookingAction): BookingState => {
  switch (action.type) {
    case types.GET_BOOKINGS_REQUEST:
    case types.GET_BOOKING_REQUEST:
    case types.CREATE_BOOKING_REQUEST:
    case types.CANCEL_BOOKING_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.GET_BOOKINGS_SUCCESS:
      return {
        ...state,
        loading: false,
        bookings: action.payload,
        error: null,
      };
    case types.GET_BOOKING_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedBooking: action.payload,
        error: null,
      };
    case types.CREATE_BOOKING_SUCCESS:
      return {
        ...state,
        loading: false,
        bookings: [...state.bookings, action.payload],
        error: null,
      };
    case types.CANCEL_BOOKING_SUCCESS:
      return {
        ...state,
        loading: false,
        bookings: state.bookings.map((b: any) =>
          b.id === action.payload.id ? action.payload : b,
        ),
        selectedBooking:
          state.selectedBooking?.id === action.payload.id
            ? action.payload
            : state.selectedBooking,
        error: null,
      };
    case types.GET_BOOKINGS_FAILURE:
    case types.GET_BOOKING_FAILURE:
    case types.CREATE_BOOKING_FAILURE:
    case types.CANCEL_BOOKING_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    // Mercure real-time events
    case types.MERCURE_BOOKING_CREATED:
      return {
        ...state,
        bookings: state.bookings.some((b: any) => b.id === action.payload.id)
          ? state.bookings
          : [...state.bookings, action.payload],
      };
    case types.MERCURE_BOOKING_UPDATED:
      return {
        ...state,
        bookings: state.bookings.map((b: any) =>
          b.id === action.payload.id ? action.payload : b,
        ),
        selectedBooking:
          state.selectedBooking?.id === action.payload.id
            ? action.payload
            : state.selectedBooking,
      };
    case types.MERCURE_BOOKING_CANCELLED:
      return {
        ...state,
        bookings: state.bookings.map((b: any) =>
          b.id === action.payload.id ? action.payload : b,
        ),
        selectedBooking:
          state.selectedBooking?.id === action.payload.id
            ? action.payload
            : state.selectedBooking,
      };
    case types.LOGOUT_SUCCESS:
      return { ...initialState };
    default:
      return state;
  }
};

export default bookingReducer;
