import { ScrollView, Text, View } from 'react-native';
import CustomButton from '../../components/CustomButton';

const HomeScreen = () => {
  return (
    <ScrollView className="flex-1 bg-anti-flash-white" contentContainerStyle={{ paddingBottom: 28 }}>
      <View className="px-5 pt-10">
        <Text className="text-[32px] font-bold text-space-cadet text-center">Discover Amazing Photography</Text>
      </View>

      <CustomButton
        label="Hire Photographer"
        onPress={() => console.log('Hire Photographer')}
        containerStyle="w-4/5 mx-auto"
        buttonStyle="bg-vivid-sky-blue"
        textStyle="text-space-cadet"
      />
    </ScrollView>
  );
};

export default HomeScreen;