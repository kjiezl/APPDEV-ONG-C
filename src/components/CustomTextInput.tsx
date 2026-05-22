import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

interface CustomTextInputProps {
  placeholder?: string;
  label?: string;
  value?: (val: string) => void;
  textStyle?: string;
  containerStyle?: string;
  secureTextEntry?: boolean;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  placeholder,
  label,
  value,
  textStyle,
  containerStyle,
  secureTextEntry = false,
}) => {
  const [isHidden, setIsHidden] = useState(secureTextEntry);

  return (
    <View className={`${containerStyle}`}>
      <Text className='color-[#555]'>{label}</Text>
      <View className="relative">
        <TextInput
          placeholder={placeholder}
          onChangeText={value}
          secureTextEntry={isHidden}
          className={`border border-[#ccc] rounded-lg px-5 mt-2.5 w-full ${textStyle}`}
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setIsHidden(prev => !prev)}
            className="absolute right-4 top-0 bottom-0 justify-center mt-2.5"
          >
            <Text className="text-[13px] text-vivid-sky-blue font-bold">
              {isHidden ? 'Show' : 'Hide'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CustomTextInput;