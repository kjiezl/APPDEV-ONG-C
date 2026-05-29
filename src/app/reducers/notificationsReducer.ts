import * as types from '../actions/actionTypes';
import type { AppNotification } from '../actions/notificationActions';

interface NotificationsState {
  items: AppNotification[];
  lastKnownStatuses: Record<string, string>;
}

const initialState: NotificationsState = {
  items: [],
  lastKnownStatuses: {},
};

export default function notificationsReducer(
  state = initialState,
  action: any,
): NotificationsState {
  switch (action.type) {
    case types.ADD_NOTIFICATION: {
      const newItem: AppNotification = {
        ...action.payload,
        id: `notif_${Date.now()}_${Math.random().toString(36).slice(2)}`,
        read: false,
        createdAt: new Date().toISOString(),
      };
      const items = [newItem, ...state.items].slice(0, 50); // keep max 50
      return { ...state, items };
    }
    case types.MARK_NOTIFICATION_READ:
      return {
        ...state,
        items: state.items.map(n =>
          n.id === action.payload ? { ...n, read: true } : n,
        ),
      };
    case types.MARK_ALL_NOTIFICATIONS_READ:
      return {
        ...state,
        items: state.items.map(n => ({ ...n, read: true })),
      };
    case types.CLEAR_ALL_NOTIFICATIONS:
      return { ...state, items: [] };
    case types.SET_LAST_KNOWN_STATUS:
      return {
        ...state,
        lastKnownStatuses: {
          ...state.lastKnownStatuses,
          [action.payload.bookingId]: action.payload.status,
        },
      };
    default:
      return state;
  }
}