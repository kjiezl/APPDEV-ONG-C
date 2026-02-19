import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import CustomTextInput from '../../components/CustomTextInput';
import { ROUTES } from '../../utils';

const LoginScreen = () => {
  const [emailAdd, setEmailAdd] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <CustomTextInput
        label={'Email Address'}
        placeholder={'Enter your email'}
        value={val => setEmailAdd(val)}
        containerStyle={{
          padding: 10,
          width: '80%',
        }}
        textStyle={{
          fontSize: 15,
        }}
      />

      <CustomTextInput
        label={'Password'}
        placeholder={'Enter your password'}
        value={val => setPassword(val)}
        containerStyle={{
          padding: 10,
          width: '80%',
        }}
        textStyle={{
          fontSize: 15,
        }}
      />

      <TouchableOpacity
        style={{ margin: 10 }}
        onPress={() => {
          if (emailAdd !== 'qwe' || password !== 'qwe') {
            Alert.alert('Incorrect credentials', 'Please try again');
            return;
          }
          navigation.navigate(ROUTES.HOME);
        }}
      >
        <View style={{ paddingVertical: 15, paddingHorizontal: 30, backgroundColor: 'blue', borderRadius: 50 }}>
          <Text style={{ color: 'white', fontSize: 15 }}>Login</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;