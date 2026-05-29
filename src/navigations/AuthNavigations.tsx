import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import HomeScreen from '../screens/main/HomeScreen';
import ProfileScreen from '../screens/main/ProfileScreen';
import PhotographersScreen from '../screens/main/PhotographersScreen';
import PhotographerDetailScreen from '../screens/main/PhotographerDetailScreen';
import BookingsScreen from '../screens/main/BookingsScreen';
import BookingDetailScreen from '../screens/main/BookingDetailScreen';
import CreateBookingScreen from '../screens/main/CreateBookingScreen';
import NotificationsScreen from '../screens/main/NotificationsScreen';

import { ROUTES } from '../utils';

const AuthNav: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName={ROUTES.LOGIN}>
      <Stack.Screen name={ROUTES.LOGIN} component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name={ROUTES.REGISTER} component={RegisterScreen} options={{ headerShown: false }} />
      <Stack.Screen name={ROUTES.HOME} component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name={ROUTES.PROFILE} component={ProfileScreen} options={{ headerShown: false }} />
      <Stack.Screen name={ROUTES.PHOTOGRAPHERS} component={PhotographersScreen} options={{ headerShown: false }} />
      <Stack.Screen name={ROUTES.PHOTOGRAPHER_DETAIL} component={PhotographerDetailScreen} options={{ headerShown: false }} />
      <Stack.Screen name={ROUTES.BOOKINGS} component={BookingsScreen} options={{ headerShown: false }} />
      <Stack.Screen name={ROUTES.BOOKING_DETAIL} component={BookingDetailScreen} options={{ headerShown: false }} />
      <Stack.Screen name={ROUTES.CREATE_BOOKING} component={CreateBookingScreen} options={{ headerShown: false }} />
      <Stack.Screen name={ROUTES.NOTIFICATIONS} component={NotificationsScreen} options={{ title: 'Notifications' }} />
    </Stack.Navigator>
  );
};

export default AuthNav;