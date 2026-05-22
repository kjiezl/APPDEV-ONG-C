import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ActivityIndicator, Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createBookingRequest } from '../../app/actions';
import { RootState } from '../../app/reducers';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import { ROUTES } from '../../utils';

const CreateBookingScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const dispatch = useDispatch();
  const { loading, error, bookings } = useSelector((state: RootState) => state.bookings);

  const photographerId = route.params?.photographerId;
  const photographerName = route.params?.photographerName || `Photographer #${photographerId}`;

  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [prevBookingsCount] = useState(bookings.length);

  useEffect(() => {
    if (isSubmitting && bookings.length > prevBookingsCount) {
      setIsSubmitting(false);
      Alert.alert('Booking Confirmed!', 'Your booking has been created successfully.', [
        { text: 'View Bookings', onPress: () => navigation.navigate(ROUTES.BOOKINGS) },
      ]);
    }
  }, [bookings, isSubmitting, prevBookingsCount, navigation]);

  useEffect(() => {
    if (isSubmitting && error) {
      Alert.alert('Error', error);
      setIsSubmitting(false);
    }
  }, [error, isSubmitting]);

  const handleCreate = () => {
    if (!date) {
      Alert.alert('Missing date', 'Please enter a date before confirming your booking.');
      return;
    }

    setIsSubmitting(true);
    dispatch(
      createBookingRequest({
        photographer_id: photographerId,
        date,
        notes: notes || undefined,
      }),
    );
  };

  const initials = photographerName
    ? photographerName.slice(0, 2).toUpperCase()
    : '?';

  const avatarColors = ['bg-vivid-sky-blue', 'bg-accent-coral', 'bg-space-cadet', 'bg-slate-gray'];
  const avatarColor = avatarColors[(photographerName?.charCodeAt(0) || 0) % avatarColors.length];

  return (
    <ScrollView
      className="flex-1 bg-anti-flash-white"
      contentContainerStyle={{ paddingBottom: 48 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Back button */}
      <View className="px-5 pt-6">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
          className="flex-row items-center"
        >
          <Text className="text-vivid-sky-blue text-base font-semibold">‹ Back</Text>
        </TouchableOpacity>
      </View>

      {/* Header */}
      <View className="px-5 pt-4 pb-2">
        <Text className="text-2xl font-bold text-space-cadet">Create Booking</Text>
        <Text className="text-slate-gray text-sm mt-1">Fill in the details below to confirm</Text>
      </View>

      {/* Photographer summary card */}
      <View className="mx-5 mt-4 bg-white rounded-2xl shadow-sm px-4 py-4 flex-row items-center">
        <View className={`w-12 h-12 rounded-full ${avatarColor} items-center justify-center`}>
          <Text className="text-white font-bold text-base">{initials}</Text>
        </View>
        <View className="ml-3 flex-1">
          <Text className="text-xs text-slate-gray">Booking with</Text>
          <Text className="text-space-cadet font-bold text-base">{photographerName}</Text>
        </View>
      </View>

      {/* Form card */}
      <View className="mx-5 mt-5 bg-white rounded-2xl shadow-sm px-4 pt-4 pb-2">
        <Text className="text-space-cadet font-bold text-base mb-4">Booking Details</Text>

        <CustomTextInput
          label="Date"
          placeholder="YYYY-MM-DD  e.g. 2026-06-01"
          value={(val) => setDate(val)}
          containerStyle="w-full mb-2"
          textStyle="text-[15px]"
        />

        <CustomTextInput
          label="Notes (optional)"
          placeholder="e.g. Wedding shoot, outdoor location"
          value={(val) => setNotes(val)}
          containerStyle="w-full mb-2"
          textStyle="text-[15px]"
        />
      </View>

      {/* Confirm button */}
      <View className="mx-5 mt-5">
        <CustomButton
          containerStyle="w-full"
          touchableStyle="mt-0"
          buttonStyle="rounded-xl"
          onPress={handleCreate}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white text-[15px] font-bold text-center">Confirm Booking</Text>
          )}
        </CustomButton>
      </View>
    </ScrollView>
  );
};

export default CreateBookingScreen;