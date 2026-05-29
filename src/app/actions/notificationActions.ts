import * as types from './actionTypes';

export type NotificationEventType = 'booking.updated' | 'booking.created' | 'booking.cancelled';

export interface AppNotification {
  id: string;
  type: NotificationEventType;
  title: string;
  body: string;
  bookingId?: string | number;
  status?: string;
  read: boolean;
  createdAt: string;
}

export const addNotification = (
  payload: Omit<AppNotification, 'id' | 'read' | 'createdAt'>,
) => ({
  type: types.ADD_NOTIFICATION as typeof types.ADD_NOTIFICATION,
  payload,
});

export const markNotificationRead = (id: string) => ({
  type: types.MARK_NOTIFICATION_READ as typeof types.MARK_NOTIFICATION_READ,
  payload: id,
});

export const markAllNotificationsRead = () => ({
  type: types.MARK_ALL_NOTIFICATIONS_READ as typeof types.MARK_ALL_NOTIFICATIONS_READ,
});

export const clearAllNotifications = () => ({
  type: types.CLEAR_ALL_NOTIFICATIONS as typeof types.CLEAR_ALL_NOTIFICATIONS,
});

export const setLastKnownStatus = (bookingId: string, status: string) => ({
  type: types.SET_LAST_KNOWN_STATUS as typeof types.SET_LAST_KNOWN_STATUS,
  payload: { bookingId, status },
});