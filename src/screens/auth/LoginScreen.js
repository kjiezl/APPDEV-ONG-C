import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { ActivityIndicator, Alert, Image, Text, View } from 'react-native';
import { login } from '../../app/api/auth';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import { ROUTES } from '../../utils';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Missing fields', 'Please enter username and password');
      return;
    }

    setLoading(true);
    try {
      await login(username, password);
      navigation.navigate(ROUTES.HOME);
    } catch (error) {
      Alert.alert('Login failed', error.message || 'Please check your credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center items-center mb-12">
      <Image
        source={require('../../../assets/images/trans-q-logo.png')}
        alt="QwePic Logo"
        className='w-[70px] h-[70px] mb-10'
      />

      <Text className="text-[40px] font-bold mb-10">
        Welcome Back!
      </Text>

      <CustomTextInput
        label={'Username'}
        placeholder={'Your username'}
        value={val => setUsername(val)}
        containerStyle="p-2.5 w-4/5"
        textStyle="text-[15px]"
      />

      <CustomTextInput
        label={'Password'}
        placeholder={'********'}
        value={val => setPassword(val)}
        containerStyle="p-2.5 w-4/5"
        textStyle="text-[15px]"
      />

      <Text className="size-13 text-vivid-sky-blue self-end mr-[50px] mb-2.5">
        Forgot Password
      </Text>

      <CustomButton
        label={loading ? '' : 'Login'}
        containerStyle="w-4/5"
        onPress={handleLogin}
        disabled={loading}
      >
        {loading && <ActivityIndicator color="#fff" />}
      </CustomButton>

      <Text className="text-[13px] text-[#666] mt-2.5">
        Don't have an account?{' '}
        <Text
          className="text-vivid-sky-blue font-bold"
          onPress={() => navigation.navigate(ROUTES.REGISTER)}
        >
          Sign up
        </Text>
      </Text>
    </View>
  );
};

export default LoginScreen;