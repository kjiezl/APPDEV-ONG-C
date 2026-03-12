import { useNavigation } from '@react-navigation/native';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import CustomButton from '../../components/CustomButton';
import { ROUTES } from '../../utils';

const PLACEHOLDER_POSTS = [
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

const PostCard = ({ post }) => {
  return (
    <View className="bg-white rounded-xl mb-4 shadow-sm overflow-hidden">
      <View className="flex-row items-center px-4 py-3">
        <View className="w-10 h-10 rounded-full bg-vivid-sky-blue items-center justify-center">
          <Text className="text-white font-bold">{post.photographer.charAt(0)}</Text>
        </View>
        <View className="ml-3">
          <Text className="font-bold text-space-cadet">{post.photographer}</Text>
          <Text className="text-gray-500 text-xs">{post.location}</Text>
        </View>
      </View>

      <Image
        source={{ uri: post.image }}
        className="w-full h-64"
        resizeMode="cover"
      />

      <View className="px-4 py-3">
        <View className="flex-row items-center mb-2">
          {/* <Text className="text-accent-coral font-bold">♥ {post.likes}</Text> */}
          {/* <Text className="text-gray-400 ml-4">💬 Comment</Text>
          <Text className="text-gray-400 ml-4">↗ Share</Text> */}
        </View>
        <Text className="text-space-cadet">{post.caption}</Text>
      </View>
    </View>
  );
};

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView className="flex-1 bg-anti-flash-white" contentContainerStyle={{ paddingBottom: 28 }}>
      <View className="flex-row justify-between items-center px-5 pt-4">
        <Text className="text-2xl font-bold text-space-cadet">QwePic</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate(ROUTES.PROFILE)}
          className="w-10 h-10 rounded-full bg-vivid-sky-blue items-center justify-center"
        >
          <Text className="text-white font-bold">👤</Text>
        </TouchableOpacity>
      </View>

      {/* <View className="px-5 pt-4 pb-2">
        <Text className="text-[28px] font-bold text-space-cadet">Discover Amazing Photography</Text>
        <Text className="text-gray-500 mt-1">Find the perfect photographer for your needs</Text>
      </View> */}

      <CustomButton
        label="Hire Photographer"
        onPress={() => console.log('Hire Photographer')}
        containerStyle="w-4/5 mx-auto"
        buttonStyle="bg-vivid-sky-blue"
        textStyle="text-space-cadet"
      />

      <View className="px-5 mt-4">
        <Text className="text-lg font-bold text-space-cadet mb-3">Featured Posts</Text>
        {PLACEHOLDER_POSTS.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;