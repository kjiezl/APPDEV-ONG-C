import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import { ROUTES } from '../../utils';
import Svg, { Path } from 'react-native-svg';

const LoginScreen = () => {
  const [emailAdd, setEmailAdd] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 50 }}>
      <Svg width="120" height="120" viewBox="0 0 640 640" xmlns="http://www.w3.org/2000/svg">
        <Path fill="rgb(252, 127, 196)" d="M240.5 365.4C240.5 291.6 345.6 242.9 345.6 162.4C345.6 115.3 311.6 74.4 306.5 72C306.9 75.3 307.1 78.7 307.1 82C307.1 174.1 160 235.9 160 350.6C160 400.4 192.2 429.8 226.5 458.9C291.6 505.6 304.6 530.3 304.6 545.5C304.6 555.6 299.8 562.5 299.8 567.8C312.9 551.1 317.2 535.9 317.3 521.4C317.3 491.8 295.6 465.1 273.1 434.9C257.1 412.6 240.5 392.3 240.5 365.4zM445.8 326.4C433.7 259.6 367.8 202 351.1 195.5L355.1 202.7C357.5 207.8 358.5 213.6 358.5 219.8C358.5 264.5 304.3 331 301.9 336.5C299.7 341.6 298.7 347 298.7 352.3C298.7 372.4 313.9 394.4 316.6 394.4C319 394.4 373.2 339 374.7 306.7C381.1 318.4 383.8 329.3 383.8 340.1C383.8 381.3 342 437 342 437C342 448.6 373.9 490.2 377.5 490.2C378.5 490.2 379.7 488.8 380.7 487.8C418.6 448.5 448 402.8 448 351C448 343 447.3 334.8 445.8 326.4z" />
      </Svg>

      {/* <Svg style={{ alignSelf: 'start', marginLeft: 30 }} width="120" height="120" viewBox="0 0 640 640" xmlns="http://www.w3.org/2000/svg">
        <Path fill="rgba(218, 218, 218, 1)" d="M483.6 98L156.6 98C123.9 98 97.1 124.8 97.1 157.5L97.1 484.6C97.1 517.2 123.9 544 156.6 544L483.7 544C516.7 544 543.2 517.2 543.2 484.5L543.2 157.5C543.1 124.8 516.3 98 483.6 98zM184.2 184.8L280.2 184.8L280.2 300.8L342 184.8L452.9 184.8L371.7 316.8L184.2 316.8L184.2 184.8zM346 456.9L280.3 343.3L280.3 456.9L184.3 456.9L184.3 326.1L375.8 326.1L464.4 456.9L346 456.9z" />
      </Svg> */}

      <Text style={{ fontSize: 40, fontWeight: 'bold', marginBottom: 40 }}>
        Welcome Back!
      </Text>

      <CustomTextInput
        label={'Email Address'}
        placeholder={'example@email.com'}
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
        placeholder={'********'}
        value={val => setPassword(val)}
        containerStyle={{
          padding: 10,
          width: '80%',
        }}
        textStyle={{
          fontSize: 15,
        }}
      />

      <Text style={{ fontSize: 13, color: '#fc7fc4ff', alignSelf: 'flex-end', marginRight: 50, marginBottom: 10 }}>
        Forgot Password
      </Text>

      <CustomButton
        label={'Login'}
        containerStyle={{
          width: '80%',
        }}
        textStyle={{
          textAlign: 'center',
        }}
        onPress={() => {
          if (emailAdd !== 'qwe' || password !== 'qwe') {
            Alert.alert('Invalid credentials', 'Please check your email and password');
            return;
          }
          navigation.navigate(ROUTES.HOME);
        }}
      />

      <Text style={{ fontSize: 13, color: '#666', marginTop: 10 }}>
        Don't have an account? <Text style={{ color: '#fc7fc4ff', fontWeight: 'bold' }}>Sign up</Text>
      </Text>
    </View>
  );
};

export default LoginScreen;