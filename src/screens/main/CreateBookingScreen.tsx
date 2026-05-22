import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ActivityIndicator, Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createBookingRequest } from '../../app/actions';
import { RootState } from '../../app/reducers';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import { ROUTES } from '../../utils';

// --- Helpers ---
const HOURS = Array.from({ length: 24 }, (_, i) => {
  const h = i % 12 === 0 ? 12 : i % 12;
  const ampm = i < 12 ? 'AM' : 'PM';
  return { label: `${h}:00 ${ampm}`, value: i };
});

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function toISO(date: Date, hour: number): string {
  const d = new Date(date);
  d.setHours(hour, 0, 0, 0);
  return d.toISOString();
}

// --- Sub-components ---
const SectionLabel: React.FC<{ label: string }> = ({ label }) => (
  <Text className="text-space-cadet font-bold text-base mb-3">{label}</Text>
);

const TimeSelector: React.FC<{
  label: string;
  selected: number;
  onSelect: (h: number) => void;
}> = ({ label, selected, onSelect }) => (
  <View className="mb-4">
    <Text className="text-slate-gray text-sm mb-2">{label}</Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View className="flex-row gap-2">
        {HOURS.map(({ label: l, value }) => (
          <TouchableOpacity
            key={value}
            onPress={() => onSelect(value)}
            className={`px-4 py-2 rounded-full border ${
              selected === value
                ? 'bg-vivid-sky-blue border-vivid-sky-blue'
                : 'bg-white border-gray-200'
            }`}
          >
            <Text className={`text-xs font-semibold ${selected === value ? 'text-white' : 'text-space-cadet'}`}>
              {l}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  </View>
);

const CalendarPicker: React.FC<{
  selected: Date;
  onSelect: (d: Date) => void;
}> = ({ selected, onSelect }) => {
  const today = new Date();
  const [viewYear, setViewYear] = useState(selected.getFullYear());
  const [viewMonth, setViewMonth] = useState(selected.getMonth());

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDayOfWeek });

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const isSelected = (d: number) =>
    selected.getDate() === d &&
    selected.getMonth() === viewMonth &&
    selected.getFullYear() === viewYear;

  const isPast = (d: number) =>
    new Date(viewYear, viewMonth, d) < new Date(today.getFullYear(), today.getMonth(), today.getDate());

  return (
    <View>
      {/* Month nav */}
      <View className="flex-row justify-between items-center mb-3">
        <TouchableOpacity onPress={prevMonth} className="p-2">
          <Text className="text-vivid-sky-blue font-bold text-base">‹</Text>
        </TouchableOpacity>
        <Text className="text-space-cadet font-bold text-sm">
          {MONTHS[viewMonth]} {viewYear}
        </Text>
        <TouchableOpacity onPress={nextMonth} className="p-2">
          <Text className="text-vivid-sky-blue font-bold text-base">›</Text>
        </TouchableOpacity>
      </View>

      {/* Day headers */}
      <View className="flex-row mb-1">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
          <Text key={d} className="flex-1 text-center text-slate-gray text-xs font-semibold">{d}</Text>
        ))}
      </View>

      {/* Day grid */}
      <View className="flex-row flex-wrap">
        {blanks.map((_, i) => (
          <View key={`b${i}`} style={{ width: '14.28%' }} />
        ))}
        {days.map(d => (
          <TouchableOpacity
            key={d}
            style={{ width: '14.28%' }}
            disabled={isPast(d)}
            onPress={() => onSelect(new Date(viewYear, viewMonth, d))}
            className="items-center py-1"
          >
            <View className={`w-8 h-8 rounded-full items-center justify-center ${
              isSelected(d) ? 'bg-vivid-sky-blue' : 'bg-transparent'
            }`}>
              <Text className={`text-sm font-medium ${
                isSelected(d) ? 'text-white' : isPast(d) ? 'text-gray-300' : 'text-space-cadet'
              }`}>
                {d}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

// --- Main Screen ---
const CreateBookingScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const dispatch = useDispatch();
  const { loading, error, bookings } = useSelector((state: RootState) => state.bookings);

  const photographerId = route.params?.photographerId;
  const photographerName = route.params?.photographerName || `Photographer #${photographerId}`;

  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  const [startHour, setStartHour] = useState(9);
  const [endHour, setEndHour] = useState(11);
  const [location, setLocation] = useState('');
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
    if (endHour <= startHour) {
      Alert.alert('Invalid time', 'End time must be after start time.');
      return;
    }

    setIsSubmitting(true);
    dispatch(
      createBookingRequest({
        photographer_id: photographerId,
        start_at: toISO(selectedDate, startHour),
        end_at: toISO(selectedDate, endHour),
        location: location || undefined,
        notes: notes || undefined,
      }),
    );
  };

  const initials = photographerName ? photographerName.slice(0, 2).toUpperCase() : '?';
  const avatarColors = ['bg-vivid-sky-blue', 'bg-accent-coral', 'bg-space-cadet', 'bg-slate-gray'];
  const avatarColor = avatarColors[(photographerName?.charCodeAt(0) || 0) % avatarColors.length];

  const formattedDate = selectedDate.toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });
  const startLabel = HOURS[startHour].label;
  const endLabel = HOURS[endHour].label;

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
        <Text className="text-2xl font-bold text-space-cadet">Create Booking</Text>
        <Text className="text-slate-gray text-sm mt-1">Fill in the details below to confirm</Text>
      </View>

      {/* Photographer card */}
      <View className="mx-5 mt-4 bg-white rounded-2xl shadow-sm px-4 py-4 flex-row items-center">
        <View className={`w-12 h-12 rounded-full ${avatarColor} items-center justify-center`}>
          <Text className="text-white font-bold text-base">{initials}</Text>
        </View>
        <View className="ml-3 flex-1">
          <Text className="text-xs text-slate-gray">Booking with</Text>
          <Text className="text-space-cadet font-bold text-base">{photographerName}</Text>
        </View>
      </View>

      {/* Calendar */}
      <View className="mx-5 mt-5 bg-white rounded-2xl shadow-sm px-4 pt-4 pb-4">
        <SectionLabel label="Select Date" />
        <CalendarPicker selected={selectedDate} onSelect={setSelectedDate} />
      </View>

      {/* Time */}
      <View className="mx-5 mt-4 bg-white rounded-2xl shadow-sm px-4 pt-4 pb-2">
        <SectionLabel label="Select Time" />
        <TimeSelector label="Start time" selected={startHour} onSelect={setStartHour} />
        <TimeSelector label="End time" selected={endHour} onSelect={setEndHour} />
      </View>

      {/* Summary pill */}
      <View className="mx-5 mt-4 bg-vivid-sky-blue rounded-2xl px-4 py-3">
        <Text className="text-white text-xs font-semibold opacity-80">Booking Summary</Text>
        <Text className="text-white font-bold mt-1">{formattedDate}</Text>
        <Text className="text-white text-sm mt-0.5">{startLabel} → {endLabel}</Text>
      </View>

      {/* Optional fields */}
      <View className="mx-5 mt-4 bg-white rounded-2xl shadow-sm px-4 pt-4 pb-2">
        <SectionLabel label="Additional Details" />
        <CustomTextInput
          label="Location (optional)"
          placeholder="e.g. Central Park, New York"
          value={(val) => setLocation(val)}
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