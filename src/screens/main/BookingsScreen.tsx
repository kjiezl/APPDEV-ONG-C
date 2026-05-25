import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getBookingsRequest } from '../../app/actions';
import { RootState } from '../../app/reducers';
import { ROUTES } from '../../utils';

const STATUS_CONFIG: Record<string, { bg: string; text: string; dot: string; label: string }> = {
  requested:  { bg: 'bg-yellow-50',  text: 'text-yellow-600', dot: 'bg-yellow-400', label: 'Requested' },
  confirmed:  { bg: 'bg-green-50',   text: 'text-green-600',  dot: 'bg-green-400',  label: 'Confirmed' },
  cancelled:  { bg: 'bg-red-50',     text: 'text-red-500',    dot: 'bg-red-400',    label: 'Cancelled' },
  completed:  { bg: 'bg-blue-50',    text: 'text-blue-600',   dot: 'bg-blue-400',   label: 'Completed' },
  rejected:   { bg: 'bg-gray-100',   text: 'text-gray-500',   dot: 'bg-gray-400',   label: 'Rejected' },
};

const formatDate = (iso?: string): string => {
  if (!iso) return 'N/A';
  return new Date(iso).toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric', year: 'numeric',
  });
};

const formatTime = (iso?: string): string => {
  if (!iso) return '';
  return new Date(iso).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
};

const BookingCard: React.FC<{ item: any; onPress: () => void }> = ({ item, onPress }) => {
  const status = item.status?.toLowerCase() ?? 'requested';
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.requested;

  const photographerName = item.photographer?.username || 'Unknown Photographer';
  const initials = photographerName.slice(0, 2).toUpperCase();
  const avatarColors = ['bg-vivid-sky-blue', 'bg-accent-coral', 'bg-space-cadet', 'bg-slate-gray'];
  const avatarColor = avatarColors[(photographerName.charCodeAt(0) || 0) % avatarColors.length];

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.75}
      className="mb-4"
    >
      <View className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {/* Top row */}
        <View className="flex-row items-center px-4 pt-4 pb-3 border-b border-gray-100">
          <View className={`w-10 h-10 rounded-full ${avatarColor} items-center justify-center`}>
            <Text className="text-white font-bold text-sm">{initials}</Text>
          </View>
          <View className="ml-3 flex-1">
            <Text className="text-space-cadet font-bold text-sm" numberOfLines={1}>
              {photographerName}
            </Text>
            <Text className="text-slate-gray text-xs mt-0.5">Booking #{item.id}</Text>
          </View>
          {/* Status badge */}
          <View className={`flex-row items-center gap-1 px-3 py-1 rounded-full ${cfg.bg}`}>
            <View className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
            <Text className={`text-xs font-semibold ${cfg.text}`}>{cfg.label}</Text>
          </View>
        </View>

        {/* Date / time row */}
        <View className="px-4 py-3 gap-1">
          <View className="flex-row items-center gap-2">
            <Text className="text-slate-gray text-xs w-16">Date</Text>
            <Text className="text-space-cadet text-sm font-medium">{formatDate(item.start_at)}</Text>
          </View>
          <View className="flex-row items-center gap-2">
            <Text className="text-slate-gray text-xs w-16">Time</Text>
            <Text className="text-space-cadet text-sm font-medium">
              {formatTime(item.start_at)} → {formatTime(item.end_at)}
            </Text>
          </View>
          {item.location ? (
            <View className="flex-row items-center gap-2">
              <Text className="text-slate-gray text-xs w-16">Location</Text>
              <Text className="text-space-cadet text-sm font-medium" numberOfLines={1}>{item.location}</Text>
            </View>
          ) : null}
          {item.notes ? (
            <View className="flex-row items-start gap-2 mt-1">
              <Text className="text-slate-gray text-xs w-16 mt-0.5">Notes</Text>
              <Text className="text-gray-500 text-xs flex-1" numberOfLines={2}>{item.notes}</Text>
            </View>
          ) : null}
        </View>

        {/* Chevron hint */}
        <View className="absolute right-4 top-0 bottom-0 justify-center">
          <Text className="text-gray-300 text-lg">›</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const BookingsScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const { bookings, loading, error } = useSelector((state: RootState) => state.bookings);

  useEffect(() => {
    dispatch(getBookingsRequest());
  }, [dispatch]);

  if (loading && bookings.length === 0) {
    return (
      <View className="flex-1 justify-center items-center bg-anti-flash-white">
        <ActivityIndicator size="large" color="#00B4D8" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-anti-flash-white">
      {/* Back button */}
      <View className="px-5 pt-6">
        <TouchableOpacity
          onPress={() => navigation.navigate(ROUTES.HOME)}
          activeOpacity={0.7}
          className="flex-row items-center"
        >
          <Text className="text-vivid-sky-blue text-base font-semibold">‹ Back</Text>
        </TouchableOpacity>
      </View>

      {/* Header */}
      <View className="px-5 pt-6 pb-4">
        <Text className="text-2xl font-bold text-space-cadet">My Bookings</Text>
        <Text className="text-slate-gray text-sm mt-1">
          {bookings.length > 0
            ? `${bookings.length} booking${bookings.length !== 1 ? 's' : ''}`
            : 'Manage your photography sessions'}
        </Text>
      </View>

      {error ? (
        <View className="mx-5 mb-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          <Text className="text-red-500 text-sm">{error}</Text>
        </View>
      ) : null}

      <FlatList
        data={bookings}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <BookingCard
            item={item}
            onPress={() => navigation.navigate(ROUTES.BOOKING_DETAIL, { bookingId: item.id })}
          />
        )}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="items-center mt-20">
            <Text className="text-4xl mb-3">📋</Text>
            <Text className="text-space-cadet font-bold text-base">No bookings yet</Text>
            <Text className="text-slate-gray text-sm mt-1">Hire a photographer to get started</Text>
          </View>
        }
      />
    </View>
  );
};

export default BookingsScreen;