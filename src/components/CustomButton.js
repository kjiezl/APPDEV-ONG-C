import { Text, TouchableOpacity, View } from 'react-native';

const CustomButton = ({ containerStyle, label, onPress, textStyle, buttonStyle }) => {
  return (
    <View className={`${containerStyle}`}>
      <TouchableOpacity className='m-5' onPress={onPress}>
        <View className={`p-4 bg-accent-coral rounded-lg ${buttonStyle}`}>
          <Text className={`text-white text-[15px] font-bold text-center ${textStyle}`}>
            {label}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;