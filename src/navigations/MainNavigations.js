import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/main/HomeScreen'
import ProfileScreen from '../screens/main/ProfileScreen'
import LoginScreen from '../screens/auth/LoginScreen'
import {ROUTES} from '../utils'

const Stack = createStackNavigator();

const MainNav = () => {
    return (
    <Stack.Navigator initialRouteName={ROUTES.LOGIN}>
      <Stack.Screen name={ROUTES.LOGIN} component={LoginScreen} />
      <Stack.Screen name={ROUTES.HOME} component={HomeScreen} />
      <Stack.Screen name={ROUTES.PROFILE} component={ProfileScreen} />
    </Stack.Navigator>
  );
}

export default MainNav;