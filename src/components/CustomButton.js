import { Text, TouchableOpacity, View } from 'react-native';

const CustomButton = ({ containerStyle, label, onPress, textStyle }) => {
  return (
    <View className={`${containerStyle}`}>
      <TouchableOpacity className='m-10' onPress={onPress}>
        <View className='p-4 bg-[#fc7fc4ff] rounded-full'>
          <Text className={`text-white text-[15px] font-bold text-center ${textStyle}`}>
            {label}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;