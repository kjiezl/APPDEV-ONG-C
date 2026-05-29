import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/reducers';
import {
  markAllNotificationsRead,
  clearAllNotifications,
  markNotificationRead,
} from '../../app/actions/notificationActions';
import type { AppNotification } from '../../app/actions/notificationActions';

const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  CONFIRMED:  { bg: '#dcfce7', text: '#15803d' },
  REJECTED:   { bg: '#fee2e2', text: '#b91c1c' },
  COMPLETED:  { bg: '#dbeafe', text: '#1d4ed8' },
  CANCELLED:  { bg: '#f3f4f6', text: '#4b5563' },
  REQUESTED:  { bg: '#fef9c3', text: '#a16207' },
};

function timeAgo(isoString: string): string {
  const diff = Date.now() - new Date(isoString).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

const NotificationItem: React.FC<{
  item: AppNotification;
  onPress: (id: string) => void;
}> = ({ item, onPress }) => {
  const color = item.status ? STATUS_COLORS[item.status] : null;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onPress(item.id)}
      style={{
        backgroundColor: '#fff',
        marginHorizontal: 16,
        marginBottom: 12,
        borderRadius: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowRadius: 4,
        elevation: 2,
        borderLeftWidth: item.read ? 0 : 4,
        borderLeftColor: '#38bdf8', // vivid-sky-blue equivalent
      }}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Text
          style={{ fontWeight: 'bold', color: '#1e1b4b', fontSize: 13, flex: 1, paddingRight: 8 }}
          numberOfLines={2}
        >
          {item.title}
        </Text>
        <Text style={{ color: '#9ca3af', fontSize: 11 }}>{timeAgo(item.createdAt)}</Text>
      </View>
      <Text style={{ color: '#6b7280', fontSize: 12, marginTop: 4 }}>{item.body}</Text>
      {color && (
        <View
          style={{
            marginTop: 8,
            alignSelf: 'flex-start',
            backgroundColor: color.bg,
            borderRadius: 999,
            paddingHorizontal: 10,
            paddingVertical: 2,
          }}
        >
          <Text style={{ color: color.text, fontSize: 11, fontWeight: '600' }}>{item.status}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const NotificationsScreen: React.FC = () => {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.notifications.items);

  return (
    <View style={{ flex: 1, backgroundColor: '#f4f4f5' }}>
      {items.length > 0 && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            gap: 16,
            paddingHorizontal: 16,
            paddingVertical: 12,
          }}
        >
          <TouchableOpacity onPress={() => dispatch(clearAllNotifications())}>
            <Text style={{ color: '#f87171', fontSize: 12, fontWeight: '600' }}>Clear all</Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={items}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <NotificationItem item={item} onPress={id => dispatch(markNotificationRead(id))} />
        )}
        contentContainerStyle={{ paddingTop: 8, paddingBottom: 32 }}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', marginTop: 100 }}>
            <Text style={{ fontSize: 40, marginBottom: 12 }}>🔔</Text>
            <Text style={{ color: '#1e1b4b', fontWeight: 'bold', fontSize: 16 }}>
              No notifications yet
            </Text>
            <Text style={{ color: '#9ca3af', fontSize: 13, marginTop: 4 }}>
              Booking updates will appear here
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default NotificationsScreen;