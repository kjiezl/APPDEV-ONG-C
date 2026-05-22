import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getBookingsRequest } from '../../app/actions';
import { RootState } from '../../app/reducers';
import { ROUTES } from '../../utils';

const BookingsScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const { bookings, loading, error } = useSelector((state: RootState) => state.bookings);

  useEffect(() => {
    dispatch(getBookingsRequest());
  }, [dispatch]);

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

  const formatDate = (dateString?: string): string => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const renderItem = ({ item }: { item: any }) => {
    const statusColors = getStatusColor(item.status);
    return (
      <TouchableOpacity
        className="bg-white rounded-xl p-4 mb-3 shadow-sm"
        onPress={() => navigation.navigate(ROUTES.BOOKING_DETAIL, { bookingId: item.id })}
        activeOpacity={0.7}
      >
        <View className="flex-row justify-between items-start">
          <View className="flex-1">
            <Text className="text-space-cadet text-base font-bold">
              Booking #{item.id}
            </Text>
            <Text className="text-slate-gray text-sm mt-1">
              {formatDate(item.date)}
            </Text>
            {item.notes ? (
              <Text className="text-gray-500 text-sm mt-1" numberOfLines={2}>
                {item.notes}
              </Text>
            ) : null}
          </View>
          <View className={`px-3 py-1 rounded-full ${statusColors.bg}`}>
            <Text className={`text-xs font-medium ${statusColors.text}`}>
              {item.status || 'Unknown'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading && bookings.length === 0) {
    return (
      <View className="flex-1 justify-center items-center bg-anti-flash-white">
        <ActivityIndicator size="large" color="#00B4D8" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-anti-flash-white">
      <View className="px-5 pt-4 pb-2">
        <Text className="text-2xl font-bold text-space-cadet">My Bookings</Text>
        <Text className="text-slate-gray mt-1">Manage your photography sessions</Text>
      </View>

      {error ? (
        <View className="px-5 py-4">
          <Text className="text-red-500">{error}</Text>
        </View>
      ) : null}

      <FlatList
        data={bookings}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
        ListEmptyComponent={
          <Text className="text-slate-gray text-center mt-10">No bookings yet</Text>
        }
      />
    </View>
  );
};

export default BookingsScreen;
