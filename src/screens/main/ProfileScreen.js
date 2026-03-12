import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { getProfile, logout } from '../../app/api/auth';
import { ROUTES } from '../../utils';

const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await getProfile();
      setUser(data);
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          await logout();
          navigation.reset({
            index: 0,
            routes: [{ name: ROUTES.LOGIN }],
          });
        },
      },
    ]);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-anti-flash-white">
        <ActivityIndicator size="large" color="#00B4D8" />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-anti-flash-white">
      <View className="items-center pt-8 pb-6 bg-anti-flash-white">
        <View className="w-24 h-24 rounded-full bg-vivid-sky-blue items-center justify-center mb-4">
          <Text className="text-white text-4xl font-bold">
            {user?.username?.charAt(0)?.toUpperCase() || '?'}
          </Text>
        </View>
        <Text className="text-space-cadet text-2xl font-bold">{user?.username || 'Unknown'}</Text>
        <Text className="text-slate-gray text-sm mt-1">{user?.email || 'No email'}</Text>
      </View>

      <View className="px-5 py-6">
        <Text className="text-lg font-bold text-space-cadet mb-4">Account Information</Text>

        <View className="bg-white rounded-xl p-4 shadow-sm">
          <View className="flex-row justify-between py-3 border-b border-gray-100">
            <Text className="text-gray-500">Username</Text>
            <Text className="text-space-cadet font-medium">{user?.username || 'N/A'}</Text>
          </View>

          <View className="flex-row justify-between py-3 border-b border-gray-100">
            <Text className="text-gray-500">Email</Text>
            <Text className="text-space-cadet font-medium">{user?.email || 'N/A'}</Text>
          </View>

          <View className="flex-row justify-between py-3 border-b border-gray-100">
            <Text className="text-gray-500">Status</Text>
            <View className={`px-2 py-1 rounded-full ${user?.is_active ? 'bg-green-100' : 'bg-red-100'}`}>
              <Text className={`text-xs font-medium ${user?.is_active ? 'text-green-600' : 'text-red-600'}`}>
                {user?.is_active ? 'Active' : 'Inactive'}
              </Text>
            </View>
          </View>

          <View className="flex-row justify-between py-3">
            <Text className="text-gray-500">Member Since</Text>
            <Text className="text-space-cadet font-medium">{formatDate(user?.created_at)}</Text>
          </View>
        </View>

        <TouchableOpacity
          className="mt-6 bg-accent-coral rounded-xl p-4"
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <Text className="text-white text-center font-bold text-base">Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;