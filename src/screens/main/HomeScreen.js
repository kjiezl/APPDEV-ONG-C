import { Image, Text, View } from 'react-native';
import { IMG } from '../../utils';

const HomeScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Image
        source={{
          uri: IMG.LOGO,
          /* uri: 'https://img.freepik.com/free-vector/bird-colorful-gradient-design-vector_343694-2506.jpg?semt=ais_hybrid&w=740&q=80' */
        }}
        style={{ width: 200, height: 200 }}
      />

      
      <Text style={{ fontSize: 20 }}>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;