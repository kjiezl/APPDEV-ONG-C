import { Text, TouchableOpacity, View } from 'react-native';

const CustomButton = ({ containerStyle, textStyle, label, onPress }) => {
  return (
    <View style={containerStyle}>
      <TouchableOpacity style={{ margin: 10 }} onPress={onPress}>
        <View style={{ padding: 13, backgroundColor: '#fc7fc4ff', borderRadius: 30 }}>
          <Text style={[textStyle, { color: 'white', fontSize: 15, fontWeight: 'bold' }]}>
            {label}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;