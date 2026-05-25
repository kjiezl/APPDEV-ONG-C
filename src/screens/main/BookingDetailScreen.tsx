import React, { useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ActivityIndicator, Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getBookingRequest, cancelBookingRequest } from '../../app/actions';
import { RootState } from '../../app/reducers';
import CustomButton from '../../components/CustomButton';

const STATUS_CONFIG: Record<string, { bg: string; text: string; dot: string; label: string }> = {
  requested:  { bg: 'bg-yellow-50',  text: 'text-yellow-600', dot: 'bg-yellow-400', label: 'Requested' },
  accepted:   { bg: 'bg-green-50',   text: 'text-green-600',  dot: 'bg-green-400',  label: 'Confirmed' },
  rejected:   { bg: 'bg-red-50',     text: 'text-red-600',    dot: 'bg-red-400',    label: 'Rejected' },
  cancelled:  { bg: 'bg-gray-50',    text: 'text-gray-600',   dot: 'bg-gray-400',   label: 'Cancelled' },
  completed:  { bg: 'bg-blue-50',    text: 'text-blue-600',   dot: 'bg-blue-400',   label: 'Completed' },
};

const formatDate = (iso?: string): string => {
  if (!iso) return 'N/A';
  return new Date(iso).toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });
};

const formatTime = (iso?: string): string => {
  if (!iso) return 'N/A';
  return new Date(iso).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
};

const formatDateTime = (iso?: string): string => {
  if (!iso) return 'N/A';
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });
};

const InfoRow: React.FC<{ label: string; value: string; last?: boolean }> = ({ label, value, last }) => (
  <View className={`flex-row justify-between items-start py-3.5 ${!last ? 'border-b border-gray-100' : ''}`}>
    <Text className="text-slate-gray text-sm w-28">{label}</Text>
    <Text className="text-space-cadet font-semibold text-sm flex-1 text-right" numberOfLines={2}>
      {value}
    </Text>
  </View>
);

const BookingDetailScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const dispatch = useDispatch();
  const { selectedBooking, loading } = useSelector((state: RootState) => state.bookings);
  const { bookingId } = route.params;

  useEffect(() => {
    dispatch(getBookingRequest(bookingId));
  }, [dispatch, bookingId]);

  const handleCancel = () => {
    Alert.alert('Cancel Booking', 'Are you sure you want to cancel this booking?', [
      { text: 'No', style: 'cancel' },
      {
        text: 'Yes, Cancel',
        style: 'destructive',
        onPress: () => dispatch(cancelBookingRequest(bookingId)),
      },
    ]);
  };

  if (loading || !selectedBooking) {
    return (
      <View className="flex-1 justify-center items-center bg-anti-flash-white">
        <ActivityIndicator size="large" color="#00B4D8" />
      </View>
    );
  }

  const status = selectedBooking.status?.toLowerCase() ?? 'requested';
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.requested;

  const photographerName = selectedBooking.photographer?.username || 'Unknown Photographer';
  const initials = photographerName.slice(0, 2).toUpperCase();
  const avatarColors = ['bg-vivid-sky-blue', 'bg-accent-coral', 'bg-space-cadet', 'bg-slate-gray'];
  const avatarColor = avatarColors[(photographerName.charCodeAt(0) || 0) % avatarColors.length];

  const canCancel = status === 'requested';

  return (
    <ScrollView
      className="flex-1 bg-anti-flash-white"
      contentContainerStyle={{ paddingBottom: 48 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Back button */}
      <View className="px-5 pt-6">
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Text className="text-vivid-sky-blue text-base font-semibold">‹ Back</Text>
        </TouchableOpacity>
      </View>

      {/* Header */}
      <View className="px-5 pt-4 pb-2">
        <Text className="text-2xl font-bold text-space-cadet">Booking Details</Text>
        <Text className="text-slate-gray text-sm mt-1">Booking #{selectedBooking.id}</Text>
      </View>

      {/* Photographer + status hero card */}
      <View className="mx-5 mt-4 bg-white rounded-2xl shadow-sm px-4 py-4">
        <View className="flex-row items-center">
          <View className={`w-12 h-12 rounded-full ${avatarColor} items-center justify-center`}>
            <Text className="text-white font-bold text-base">{initials}</Text>
          </View>
          <View className="ml-3 flex-1">
            <Text className="text-xs text-slate-gray">Photographer</Text>
            <Text className="text-space-cadet font-bold text-base">{photographerName}</Text>
            {selectedBooking.photographer?.email ? (
              <Text className="text-slate-gray text-xs mt-0.5">{selectedBooking.photographer.email}</Text>
            ) : null}
          </View>
          <View className={`flex-row items-center gap-1 px-3 py-1.5 rounded-full ${cfg.bg}`}>
            <View className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
            <Text className={`text-xs font-semibold ${cfg.text}`}>{cfg.label}</Text>
          </View>
        </View>
      </View>

      {/* Schedule summary pill */}
      <View className="mx-5 mt-4 bg-vivid-sky-blue rounded-2xl px-4 py-4">
        <Text className="text-white text-xs font-semibold opacity-75 mb-1">Session Schedule</Text>
        <Text className="text-white font-bold text-base">{formatDate(selectedBooking.start_at)}</Text>
        <Text className="text-white text-sm mt-1 opacity-90">
          {formatTime(selectedBooking.start_at)} → {formatTime(selectedBooking.end_at)}
        </Text>
      </View>

      {/* Details card */}
      <View className="mx-5 mt-4 bg-white rounded-2xl shadow-sm px-4">
        <InfoRow label="Location" value={selectedBooking.location || 'Not specified'} />
        <InfoRow label="Notes" value={selectedBooking.notes || 'None'} />
        {selectedBooking.rejection_reason ? (
          <InfoRow label="Rejection Reason" value={selectedBooking.rejection_reason} />
        ) : null}
        <InfoRow label="Created" value={formatDateTime(selectedBooking.created_at)} />
        <InfoRow label="Last Updated" value={formatDateTime(selectedBooking.updated_at)} last />
      </View>

      {/* Cancel button — only shown for 'requested' status */}
      {canCancel ? (
        <View className="mx-5 mt-6">
          <CustomButton
            containerStyle="w-full"
            touchableStyle="mt-0"
            buttonStyle="bg-red-500 rounded-xl"
            onPress={handleCancel}
            disabled={loading}
          >
            <Text className="text-white text-[15px] font-bold text-center">Cancel Booking</Text>
          </CustomButton>
        </View>
      ) : null}
    </ScrollView>
  );
};

export default BookingDetailScreen;