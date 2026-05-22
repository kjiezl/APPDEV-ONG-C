import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import CustomButton from '../../components/CustomButton';
import { ROUTES } from '../../utils';

interface Post {
  id: string;
  photographer: string;
  location: string;
  image: string;
  likes: number;
  caption: string;
}

const PLACEHOLDER_POSTS: Post[] = [
  {
    id: '1',
    photographer: 'Sarah Mitchell',
    location: 'Bali, Indonesia',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    likes: 234,
    caption: 'Golden hour at the rice terraces 🌅',
  },
  {
    id: '2',
    photographer: 'James Chen',
    location: 'Tokyo, Japan',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
    likes: 189,
    caption: 'City lights never sleep',
  },
  {
    id: '3',
    photographer: 'Emma Rodriguez',
    location: 'Santorini, Greece',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800',
    likes: 456,
    caption: 'Blue domes and endless views',
  },
  {
    id: '4',
    photographer: 'Michael Park',
    location: 'New York, USA',
    image: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800',
    likes: 312,
    caption: 'Street photography at its finest',
  },
  {
    id: '5',
    photographer: 'Lisa Wang',
    location: 'Patagonia, Chile',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800',
    likes: 521,
    caption: 'Mountains calling ⛰️',
  },
];

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <View className="bg-white rounded-2xl mb-5 shadow-sm overflow-hidden">
      {/* Header */}
      <View className="flex-row items-center px-4 py-3">
        <View className="w-10 h-10 rounded-full bg-vivid-sky-blue items-center justify-center">
          <Text className="text-white font-bold text-base">{post.photographer.charAt(0)}</Text>
        </View>
        <View className="ml-3 flex-1">
          <Text className="font-bold text-space-cadet text-sm">{post.photographer}</Text>
          <Text className="text-gray-400 text-xs mt-0.5">📍 {post.location}</Text>
        </View>
      </View>

      {/* Image */}
      <Image
        source={{ uri: post.image }}
        className="w-full h-64"
        resizeMode="cover"
      />

      {/* Footer */}
      <View className="px-4 py-3">
        <Text className="text-space-cadet text-sm leading-5">{post.caption}</Text>
        {/* <View className="flex-row items-center mt-2 pt-2 border-t border-gray-100">
          <Text className="text-accent-coral text-xs font-semibold">♥ {post.likes} likes</Text>
        </View> */}
      </View>
    </View>
  );
};

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  return (
    <ScrollView
      className="flex-1 bg-anti-flash-white"
      contentContainerStyle={{ paddingBottom: 36 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View className="flex-row justify-between items-center px-5 pt-6 pb-2">
        <View>
          <Text className="text-2xl font-bold text-space-cadet">QwePic</Text>
          {/* <Text className="text-gray-400 text-xs mt-0.5">Discover amazing photography</Text> */}
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate(ROUTES.PROFILE)}
          className="w-10 h-10 rounded-full bg-vivid-sky-blue items-center justify-center shadow-sm"
          activeOpacity={0.8}
        >
          <Text className="text-white font-bold">👤</Text>
        </TouchableOpacity>
      </View>

      {/* Action Buttons */}
      <View className="flex-row px-5 mt-4 gap-3">
        <CustomButton
          containerStyle="flex-1"
          touchableStyle="mt-0"
          buttonStyle="bg-vivid-sky-blue rounded-xl shadow-sm flex-row justify-center items-center gap-2"
          onPress={() => navigation.navigate(ROUTES.PHOTOGRAPHERS)}
        >
          <Text className="text-space-cadet font-bold text-sm">Hire Photographer</Text>
        </CustomButton>

        <CustomButton
          containerStyle="flex-1"
          touchableStyle="mt-0"
          buttonStyle="bg-white border border-gray-200 rounded-xl shadow-sm flex-row justify-center items-center gap-2"
          onPress={() => navigation.navigate(ROUTES.BOOKINGS)}
        >
          <Text className="text-space-cadet font-bold text-sm">My Bookings</Text>
        </CustomButton>
      </View>

      {/* Featured Posts */}
      <View className="px-5 mt-6">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-lg font-bold text-space-cadet">Featured Posts</Text>
        </View>

        {PLACEHOLDER_POSTS.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;