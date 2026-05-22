import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getPhotographersRequest } from '../../app/actions';
import { RootState } from '../../app/reducers';
import { ROUTES } from '../../utils';

const PhotographerCard: React.FC<{ item: any; onPress: () => void }> = ({ item, onPress }) => {
  const initials = item.username
    ? item.username.slice(0, 2).toUpperCase()
    : '?';

  const avatarColors = [
    'bg-vivid-sky-blue',
    'bg-space-cadet',
    'bg-slate-gray',
  ];
  const colorIndex = (item.username?.charCodeAt(0) || 0) % avatarColors.length;
  const avatarColor = avatarColors[colorIndex];

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.75}
      className="mb-4"
    >
      <View className="bg-white rounded-2xl shadow-sm">
        <View className="flex-row items-center px-4 py-4">
          {/* Avatar */}
          <View className={`w-14 h-14 rounded-full ${avatarColor} items-center justify-center`}>
            <Text className="text-white text-lg font-bold">{initials}</Text>
          </View>

          {/* Info */}
          <View className="ml-4 flex-1">
            <Text className="text-space-cadet text-base font-bold" numberOfLines={1}>
              {item.username || 'Unknown'}
            </Text>
            <Text className="text-slate-gray text-xs mt-0.5" numberOfLines={1}>
              {item.email || ''}
            </Text>
          </View>

          {/* Chevron */}
          <Text className="text-gray-300 text-lg ml-2">›</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const PhotographersScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const { photographers, loading, error } = useSelector((state: RootState) => state.photographers);

  useEffect(() => {
    dispatch(getPhotographersRequest());
  }, [dispatch]);

  if (loading && photographers.length === 0) {
    return (
      <View className="flex-1 justify-center items-center bg-anti-flash-white">
        <ActivityIndicator size="large" color="#00B4D8" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-anti-flash-white">
      {/* Header */}
      <View className="px-5 pt-6 pb-4">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
          className="flex-row items-center mb-4"
        >
          <Text className="text-vivid-sky-blue text-base font-semibold">‹ Back</Text>
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-space-cadet">Photographers</Text>
        <Text className="text-slate-gray text-sm mt-1">
          {photographers.length > 0
            ? `${photographers.length} photographer${photographers.length !== 1 ? 's' : ''} available`
            : 'Browse and hire photographers'}
        </Text>
      </View>

      {error ? (
        <View className="mx-5 mb-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          <Text className="text-red-500 text-sm">{error}</Text>
        </View>
      ) : null}

      <FlatList
        data={photographers}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) =>
          <PhotographerCard
            item={item}
            onPress={() => navigation.navigate(ROUTES.PHOTOGRAPHER_DETAIL, { photographerId: item.id })}
          />
        }
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="items-center mt-20">
            <Text className="text-4xl mb-3">📷</Text>
            <Text className="text-space-cadet font-bold text-base">No photographers yet</Text>
            <Text className="text-slate-gray text-sm mt-1">Check back soon</Text>
          </View>
        }
      />
    </View>
  );
};

export default PhotographersScreen;