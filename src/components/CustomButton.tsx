import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface CustomButtonProps {
  containerStyle?: string;
  label?: string;
  onPress?: () => void;
  textStyle?: string;
  buttonStyle?: string;
  disabled?: boolean;
  children?: React.ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({ containerStyle, label, onPress, textStyle, buttonStyle, disabled, children }) => {
  return (
    <View className={`${containerStyle}`}>
      <TouchableOpacity className='m-5' onPress={onPress} disabled={disabled} activeOpacity={disabled ? 1 : 0.7}>
        <View className={`p-4 bg-accent-coral rounded-lg ${buttonStyle} ${disabled ? 'opacity-70' : ''}`}>
          {children ? (
            children
          ) : (
            <Text className={`text-white text-[15px] font-bold text-center ${textStyle}`}>
              {label}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;
