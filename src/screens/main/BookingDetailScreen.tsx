import React, { useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { ActivityIndicator, Alert, ScrollView, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getBookingRequest, cancelBookingRequest } from '../../app/actions';
import { RootState } from '../../app/reducers';
import CustomButton from '../../components/CustomButton';

const BookingDetailScreen: React.FC = () => {
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

  const formatDate = (dateString?: string): string => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
        return { bg: 'bg-green-100', text: 'text-green-600' };
      case 'pending':
        return { bg: 'bg-yellow-100', text: 'text-yellow-600' };
      case 'cancelled':
        return { bg: 'bg-red-100', text: 'text-red-600' };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-600' };
    }
  };

  if (loading || !selectedBooking) {
    return (
      <View className="flex-1 justify-center items-center bg-anti-flash-white">
        <ActivityIndicator size="large" color="#00B4D8" />
      </View>
    );
  }

  const statusColors = getStatusColor(selectedBooking.status);

  return (
    <ScrollView className="flex-1 bg-anti-flash-white">
      <View className="px-5 pt-6">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-2xl font-bold text-space-cadet">
            Booking #{selectedBooking.id}
          </Text>
          <View className={`px-3 py-1 rounded-full ${statusColors.bg}`}>
            <Text className={`text-sm font-medium ${statusColors.text}`}>
              {selectedBooking.status || 'Unknown'}
            </Text>
          </View>
        </View>

        <View className="bg-white rounded-xl p-4 shadow-sm">
          <View className="flex-row justify-between py-3 border-b border-gray-100">
            <Text className="text-gray-500">Date</Text>
            <Text className="text-space-cadet font-medium">{formatDate(selectedBooking.date)}</Text>
          </View>

          <View className="flex-row justify-between py-3 border-b border-gray-100">
            <Text className="text-gray-500">Photographer</Text>
            <Text className="text-space-cadet font-medium">
              {selectedBooking.photographer?.username || `ID: ${selectedBooking.photographer_id || 'N/A'}`}
            </Text>
          </View>

          {selectedBooking.notes ? (
            <View className="py-3 border-b border-gray-100">
              <Text className="text-gray-500 mb-1">Notes</Text>
              <Text className="text-space-cadet">{selectedBooking.notes}</Text>
            </View>
          ) : null}

          <View className="flex-row justify-between py-3">
            <Text className="text-gray-500">Created</Text>
            <Text className="text-space-cadet font-medium">{formatDate(selectedBooking.created_at)}</Text>
          </View>
        </View>

        {selectedBooking.status?.toLowerCase() !== 'cancelled' && (
          <CustomButton
            containerStyle="w-full mt-2"
            buttonStyle="bg-red-500"
            onPress={handleCancel}
            disabled={loading}
          >
            <Text className="text-white text-[15px] font-bold text-center">Cancel Booking</Text>
          </CustomButton>
        )}
      </View>
    </ScrollView>
  );
};

export default BookingDetailScreen;
