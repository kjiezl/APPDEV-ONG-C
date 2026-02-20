import { Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const CustomTextInput = ({
  placeholder,
  label,
  value,
  textStyle,
  containerStyle,
}) => {
  return (
    <View className={`${containerStyle}`}>
      <Text className='color-[#555]'>{label}</Text>
      <TextInput
        placeholder={placeholder}
        onChangeText={value}
        className={`border border-[#ccc] rounded-full px-5 mt-2.5 w-full ${textStyle}`}
      />
    </View>
  );
};

export default CustomTextInput;