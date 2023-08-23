import React from 'react'
import { View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'

import { globalStyles } from 'src/styles'
import { QRScanHeader } from 'src/components/headers'

import QRCodeScreen from 'src/screens/QRCode'
import ResultScreen from 'src/screens/Result'
import BookingScreen from 'src/screens/Booking'

const BookingStack = createStackNavigator()

function HomeStackScreen() {
  return (
    <BookingStack.Navigator
      initialRouteName="BookingScreen"
      screenOptions={{
        headerShown: true,
        gestureEnabled: false,
        headerBackTitleVisible: false,
        headerStyle: globalStyles.headerStyle,
        headerTitleStyle: globalStyles.headerTitle,
        headerRightContainerStyle: globalStyles.headerRightContainer
      }}
    >
      <BookingStack.Screen
        name="BookingScreen"
        component={BookingScreen}
        options={{
          gestureEnabled: true,
          headerTitle: 'Book a Room',
          headerLeft: () => <View />,
          headerRight: () => <QRScanHeader />
        }}
      />
      <BookingStack.Screen
        name="QRCodeScreen"
        component={QRCodeScreen}
        options={{
          headerShown: false
        }}
      />
      <BookingStack.Screen
        name="ResultScreen"
        component={ResultScreen}
        options={{
          headerShown: false,
          headerTitle: 'Book a Room'
        }}
      />
    </BookingStack.Navigator>
  )
}

export default HomeStackScreen