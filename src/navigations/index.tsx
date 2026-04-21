import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, View } from 'react-native';

import AuthNav from './AuthNavigations';

const Nav: React.FC = () => {
  useEffect(() => {
    StatusBar.setBarStyle('dark-content', true);
  }, []);
  return (
    <View className='flex-1'>
      <NavigationContainer>
        <AuthNav />
      </NavigationContainer>
    </View>
  );
};

export default Nav;
