import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ActivityIndicator, Alert, ScrollView, Text, View } from 'react-native';
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
      Alert.alert('Success', 'Booking created successfully!', [
        { text: 'OK', onPress: () => navigation.navigate(ROUTES.BOOKINGS) },
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
      Alert.alert('Missing fields', 'Please enter a date (e.g. 2026-06-01)');
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

  return (
    <ScrollView className="flex-1 bg-anti-flash-white" contentContainerStyle={{ paddingBottom: 40 }}>
      <View className="px-5 pt-6">
        <Text className="text-2xl font-bold text-space-cadet mb-2">Create Booking</Text>
        <Text className="text-slate-gray mb-6">
          Booking with <Text className="font-bold text-vivid-sky-blue">{photographerName}</Text>
        </Text>

        <CustomTextInput
          label="Date (YYYY-MM-DD)"
          placeholder="e.g. 2026-06-01"
          value={(val) => setDate(val)}
          containerStyle="p-2.5 w-full"
          textStyle="text-[15px]"
        />

        <CustomTextInput
          label="Notes (optional)"
          placeholder="e.g. Wedding shoot, outdoor location"
          value={(val) => setNotes(val)}
          containerStyle="p-2.5 w-full"
          textStyle="text-[15px]"
        />

        <CustomButton
          containerStyle="w-full mt-2"
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
