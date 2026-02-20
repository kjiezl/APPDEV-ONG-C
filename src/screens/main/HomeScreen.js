import { Image, Text, View } from 'react-native';
import { IMG } from '../../utils';

const HomeScreen = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <Image
        source={{
          uri: IMG.LOGO,
          /* uri: 'https://img.freepik.com/free-vector/bird-colorful-gradient-design-vector_343694-2506.jpg?semt=ais_hybrid&w=740&q=80' */
        }}
        className='w-[200px] h-[200px]'
      />
      
      <Text className="text-[20px]">HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;