import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator, Alert, Image, Pressable, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { registerRequest, googleLoginRequest } from '../../app/actions';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import { ROUTES } from '../../utils';
import { RootState } from '../../app/reducers';

const RegisterScreen: React.FC = () => {
  const [username, setUsername] = useState('');
  const [accountType, setAccountType] = useState('');
  const [emailAdd, setEmailAdd] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isSubmitting && user) {
      Alert.alert('Success', 'Account created successfully!');
      setIsSubmitting(false);
      navigation.navigate(ROUTES.LOGIN);
    }
  }, [user, navigation, isSubmitting]);

  useEffect(() => {
    if (isSubmitting && error) {
      Alert.alert('Registration failed', error);
      setIsSubmitting(false);
    }
  }, [error, isSubmitting]);

  const handleGoogleSignUp = () => {
    setIsSubmitting(true);
    dispatch(googleLoginRequest());
  };

  const handleRegister = () => {
    if (!username || !accountType || !emailAdd || !password || !confirmPassword) {
      Alert.alert('Missing fields', 'Please fill in all required information.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Password mismatch', 'Password and confirmation do not match.');
      return;
    }

    setIsSubmitting(true);
    dispatch(registerRequest(username, emailAdd, password, accountType));
  };

  return (
    <View className="flex-1 justify-center items-center mb-12">
      <Image
        source={require('../../../assets/images/trans-q-logo.png')}
        alt="QwePic Logo"
        className='w-[70px] h-[70px] mb-10'
      />

      <Text className="text-[40px] font-bold mb-10">
        Create Account
      </Text>

      <CustomTextInput
        label={'Username'}
        placeholder={'Enter your username'}
        value={val => setUsername(val)}
        containerStyle="p-2.5 w-4/5"
        textStyle="text-[15px]"
      />

      <CustomTextInput
        label={'Email Address'}
        placeholder={'example@email.com'}
        value={val => setEmailAdd(val)}
        containerStyle="p-2.5 w-4/5"
        textStyle="text-[15px]"
      />

      <View className="p-2.5 w-4/5">
        <Text className='color-[#555]'>Account Type</Text>
        <View className="flex-row mt-2.5">
          <Pressable
            onPress={() => setAccountType('personal')}
            className="flex-row items-center mr-6"
          >
            <View className="w-5 h-5 rounded-full border border-slate-gray items-center justify-center">
              {accountType === 'personal' ? (
                <View className="w-3 h-3 rounded-full bg-accent-coral" />
              ) : null}
            </View>
            <Text className="ml-2.5 text-[#333]">Client</Text>
          </Pressable>

          <Pressable
            onPress={() => setAccountType('business')}
            className="flex-row items-center"
          >
            <View className="w-5 h-5 rounded-full border border-slate-gray items-center justify-center">
              {accountType === 'business' ? (
                <View className="w-3 h-3 rounded-full bg-accent-coral" />
              ) : null}
            </View>
            <Text className="ml-2.5 text-[#333]">Photographer</Text>
          </Pressable>
        </View>
      </View>

      <CustomTextInput
        label={'Password'}
        placeholder={'********'}
        value={val => setPassword(val)}
        containerStyle="p-2.5 w-4/5"
        textStyle="text-[15px]"
      />

      <CustomTextInput
        label={'Confirm Password'}
        placeholder={'********'}
        value={val => setConfirmPassword(val)}
        containerStyle="p-2.5 w-4/5"
        textStyle="text-[15px]"
      />

      <CustomButton
        containerStyle="w-4/5"
        onPress={handleRegister}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white text-[15px] font-bold text-center">Sign Up</Text>
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
        onPress={handleGoogleSignUp}
        disabled={loading}
      >
        <Text className="text-[#333] text-[15px] font-bold text-center">
          Sign up with Google
        </Text>
      </CustomButton>

      <Text className="text-[13px] text-[#666] mt-2.5">
        Already a member?{' '}
        <Text
          className="text-vivid-sky-blue font-bold"
          onPress={() => navigation.navigate(ROUTES.LOGIN)}
        >
          Log in
        </Text>
      </Text>
    </View>
  );
};

export default RegisterScreen;
