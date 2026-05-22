import React, { useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
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

  return (
    <ScrollView className="flex-1 bg-anti-flash-white">
      <View className="items-center pt-8 pb-6">
        <View className="w-24 h-24 rounded-full bg-vivid-sky-blue items-center justify-center mb-4">
          <Text className="text-white text-4xl font-bold">
            {selectedPhotographer.username?.charAt(0)?.toUpperCase() || '?'}
          </Text>
        </View>
        <Text className="text-space-cadet text-2xl font-bold">
          {selectedPhotographer.username || 'Unknown'}
        </Text>
        <Text className="text-slate-gray text-sm mt-1">
          {selectedPhotographer.email || ''}
        </Text>
      </View>

      <View className="px-5 py-4">
        <View className="bg-white rounded-xl p-4 shadow-sm">
          <View className="flex-row justify-between py-3 border-b border-gray-100">
            <Text className="text-gray-500">Username</Text>
            <Text className="text-space-cadet font-medium">{selectedPhotographer.username || 'N/A'}</Text>
          </View>
          <View className="flex-row justify-between py-3 border-b border-gray-100">
            <Text className="text-gray-500">Email</Text>
            <Text className="text-space-cadet font-medium">{selectedPhotographer.email || 'N/A'}</Text>
          </View>
          <View className="flex-row justify-between py-3">
            <Text className="text-gray-500">Status</Text>
            <View className={`px-2 py-1 rounded-full ${selectedPhotographer.is_active ? 'bg-green-100' : 'bg-red-100'}`}>
              <Text className={`text-xs font-medium ${selectedPhotographer.is_active ? 'text-green-600' : 'text-red-600'}`}>
                {selectedPhotographer.is_active ? 'Available' : 'Unavailable'}
              </Text>
            </View>
          </View>
        </View>

        <CustomButton
          containerStyle="w-full mt-2"
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
