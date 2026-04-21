import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { ActivityIndicator, Alert, Image, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest, googleLoginRequest } from '../../app/actions';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import { ROUTES } from '../../utils';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector(state => state.auth);

  useEffect(() => {
    if (isSubmitting && user) {
      setIsSubmitting(false);
      navigation.navigate(ROUTES.HOME);
    }
  }, [user, navigation, isSubmitting]);

  useEffect(() => {
    if (isSubmitting && error) {
      Alert.alert('Login failed', error);
      setIsSubmitting(false);
    }
  }, [error, isSubmitting]);

  const handleGoogleLogin = () => {
    setIsSubmitting(true);
    dispatch(googleLoginRequest());
  };

  const handleLogin = () => {
    if (!username || !password) {
      Alert.alert('Missing fields', 'Please enter username and password');
      return;
    }

    setIsSubmitting(true);
    dispatch(loginRequest(username, password));
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
        containerStyle="w-4/5"
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white text-[15px] font-bold text-center">Login</Text>
        )}
      </CustomButton>

      <View className="flex-row items-center w-4/5 my-4">
        <View className="flex-1 h-px bg-[#ccc]" />
        <Text className="mx-3 text-[13px] text-[#666]">OR</Text>
        <View className="flex-1 h-px bg-[#ccc]" />
      </View>

      <CustomButton
        containerStyle="w-4/5"
        buttonStyle="bg-white border border-[#ccc]"
        onPress={handleGoogleLogin}
        disabled={loading}
      >
        <Text className="text-[#333] text-[15px] font-bold text-center">
          Sign in with Google
        </Text>
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