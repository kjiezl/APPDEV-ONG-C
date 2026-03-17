import React from 'react';
import {View} from 'react-native';
import {Provider} from 'react-redux';
import store from './src/app/store';
import Nav from './src/navigations'
import {AuthProvider} from './src/contexts/AuthContext';

const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <View className='flex-1'>
          <Nav />
        </View>
      </AuthProvider>
    </Provider>
  );
};
export default App;