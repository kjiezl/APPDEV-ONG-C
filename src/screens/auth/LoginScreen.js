import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import {IMG} from '../../utils'
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../utils';

const LoginScreen = () => {
    const nav = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Welcome to the App!</Text>
      <TouchableOpacity onPress={() => {
        nav.navigate(ROUTES.HOME);
      }}>
        <View style={{ backgroundColor: 'blue', padding: 10, borderRadius: 5, marginTop: 20 }}>
          <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold'}}>Login</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default LoginScreen