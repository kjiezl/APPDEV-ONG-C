import React from 'react'
import { View, Text, Image } from 'react-native'
import {IMG} from '../../utils'

const HomeScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Home Screen</Text>
      <Image source={{uri: IMG.LOGO}} style={{width: 200, height: 200}} />
      {/* <Image source={{uri: 'https://img.freepik.com/free-vector/bird-colorful-gradient-design-vector_343694-2506.jpg?semt=ais_hybrid&w=740&q=80'}} style={{width: 200, height: 200}} /> */}
    </View>
  )
}

export default HomeScreen