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
    <View style={containerStyle}>
      <Text style={{ color: '#555' }}>{label}</Text>
      <TextInput
        placeholder={placeholder}
        onChangeText={value}
        style={[
          textStyle,
          {
            borderWidth: 1,
            borderBottomWidth: 1,
            borderRadius: 30,
            borderColor: '#ccc',
            paddingHorizontal: 20,
            width: '100%',
            marginTop: 10,
          },
        ]}
      />
    </View>
  );
};

export default CustomTextInput;