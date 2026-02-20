import { Image, Text, View } from 'react-native';
import { IMG } from '../../utils';

const ProfileScreen = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <Image
        source={{
          uri: IMG.LOGO,
          // uri: 'https://tse2.mm.bing.net/th/id/OIP.pZ-q9NpVVYqUywmjvYSzdgHaD4?rs=1&pid=ImgDetMain&o=7&rm=3',
        }}
        className="w-[200px] h-[200px]"
      />
      <Text className="text-[40px]">ProfileScreen</Text>
    </View>
  );
};

export default ProfileScreen;