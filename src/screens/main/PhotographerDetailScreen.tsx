import React, { useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getPhotographerRequest } from '../../app/actions';
import { RootState } from '../../app/reducers';
import CustomButton from '../../components/CustomButton';
import { ROUTES } from '../../utils';

const PhotographerDetailScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const dispatch = useDispatch();
  const { selectedPhotographer, loading } = useSelector((state: RootState) => state.photographers);
  const { photographerId } = route.params;

  useEffect(() => {
    dispatch(getPhotographerRequest(photographerId));
  }, [dispatch, photographerId]);

  if (loading || !selectedPhotographer) {
    return (
      <View className="flex-1 justify-center items-center bg-anti-flash-white">
        <ActivityIndicator size="large" color="#00B4D8" />
      </View>
    );
  }

  const initials = selectedPhotographer.username
    ? selectedPhotographer.username.slice(0, 2).toUpperCase()
    : '?';

  const avatarColors = [
    'bg-vivid-sky-blue',
    'bg-accent-coral',
    'bg-space-cadet',
    'bg-slate-gray',
  ];
  const avatarColor = avatarColors[(selectedPhotographer.username?.charCodeAt(0) || 0) % avatarColors.length];

  return (
    <ScrollView
      className="flex-1 bg-anti-flash-white"
      contentContainerStyle={{ paddingBottom: 40 }}
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

      {/* Hero section */}
      <View className="items-center pt-6 pb-8 px-5">
        <View className={`w-24 h-24 rounded-full ${avatarColor} items-center justify-center mb-4 shadow-sm`}>
          <Text className="text-white text-3xl font-bold">{initials}</Text>
        </View>
        <Text className="text-space-cadet text-2xl font-bold">
          {selectedPhotographer.username || 'Unknown'}
        </Text>
        <Text className="text-slate-gray text-sm mt-1">
          {selectedPhotographer.email || ''}
        </Text>
        <View className={`mt-3 px-4 py-1 rounded-full ${selectedPhotographer.is_active ? 'bg-green-100' : 'bg-gray-100'}`}>
          <Text className={`text-xs font-semibold ${selectedPhotographer.is_active ? 'text-green-600' : 'text-gray-400'}`}>
            {selectedPhotographer.is_active ? '● Available for booking' : '● Offline'}
          </Text>
        </View>
      </View>

      {/* Details card */}
      <View className="mx-5">
        <Text className="text-space-cadet font-bold text-base mb-3">Photographer Info</Text>
        <View className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <View className="flex-row justify-between items-center px-4 py-4 border-b border-gray-100">
            <Text className="text-slate-gray text-sm">Username</Text>
            <Text className="text-space-cadet font-semibold text-sm">{selectedPhotographer.username || 'N/A'}</Text>
          </View>
          <View className="flex-row justify-between items-center px-4 py-4">
            <Text className="text-slate-gray text-sm">Email</Text>
            <Text className="text-space-cadet font-semibold text-sm" numberOfLines={1}>
              {selectedPhotographer.email || 'N/A'}
            </Text>
          </View>
        </View>
      </View>

      {/* Book button */}
      <View className="mx-5 mt-6">
        <CustomButton
          containerStyle="w-full"
          touchableStyle="mt-0"
          buttonStyle="rounded-xl"
          onPress={() =>
            navigation.navigate(ROUTES.CREATE_BOOKING, {
              photographerId: selectedPhotographer.id,
              photographerName: selectedPhotographer.username,
            })
          }
        >
          <Text className="text-white text-[15px] font-bold text-center">Book This Photographer</Text>
        </CustomButton>
      </View>
    </ScrollView>
  );
};

export default PhotographerDetailScreen;