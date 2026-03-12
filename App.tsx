import React from 'react';
import {View} from 'react-native';
import Nav from './src/navigations'
import {AuthProvider} from './src/contexts/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <View className='flex-1'>
        <Nav />
      </View>
    </AuthProvider>
  );
};
export default App;