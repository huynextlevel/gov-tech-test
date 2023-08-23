import React from 'react'
import { StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'

import HomeScreen from 'src/screens/Home'

const HomeStack = createStackNavigator()

export default function HomeStackScreen() {
  return (
    <HomeStack.Navigator initialRouteName="HomeScreen">
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
          gestureEnabled: true
        }}
      />
    </HomeStack.Navigator>
  )
}

const styles = StyleSheet.create({})
