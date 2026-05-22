import { createRef } from 'react';
import { NavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createRef<NavigationContainerRef<any>>();

export function navigateToLogin() {
  navigationRef.current?.reset({
    index: 0,
    routes: [{ name: 'Login' }],
  });
}
