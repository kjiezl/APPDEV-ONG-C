import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import HomeScreen from '../screens/main/HomeScreen';
import ProfileScreen from '../screens/main/ProfileScreen';
import NotificationsScreen from '../screens/main/NotificationsScreen';
import { ROUTES } from '../utils';
import { RootState } from '../app/reducers';

const Stack = createStackNavigator();

const BellButton: React.FC<{ onPress: () => void; unreadCount: number }> = ({
  onPress,
  unreadCount,
}) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.7}
    style={{ marginRight: 16, position: 'relative' }}
  >
    <Text style={{ fontSize: 22 }}>🔔</Text>
    {unreadCount > 0 && (
      <View
        style={{
          position: 'absolute',
          top: -4,
          right: -4,
          backgroundColor: '#ef4444',
          borderRadius: 999,
          minWidth: 16,
          height: 16,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 3,
        }}
      >
        <Text style={{ color: '#fff', fontSize: 10, fontWeight: 'bold', lineHeight: 14 }}>
          {unreadCount > 9 ? '9+' : unreadCount}
        </Text>
      </View>
    )}
  </TouchableOpacity>
);

const MainNav: React.FC = () => {
  const unreadCount = useSelector(
    (state: RootState) => state.notifications.items.filter(n => !n.read).length,
  );

  return (
    <Stack.Navigator initialRouteName={ROUTES.HOME}>
      <Stack.Screen
        name={ROUTES.HOME}
        component={HomeScreen}
        options={({ navigation }) => ({
          headerRight: () => (
            <BellButton
              unreadCount={unreadCount}
              onPress={() => navigation.navigate(ROUTES.NOTIFICATIONS)}
            />
          ),
        })}
      />
      <Stack.Screen
        name={ROUTES.NOTIFICATIONS}
        component={NotificationsScreen}
        options={{ title: 'Notifications' }}
      />
      <Stack.Screen name={ROUTES.PROFILE} component={ProfileScreen} />
      {/* keep any other existing screens you have registered here */}
    </Stack.Navigator>
  );
};

export default MainNav;