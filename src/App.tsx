import React from 'react'
import { LogBox } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'

import AppView from './routers/AppViewContainer'

LogBox.ignoreAllLogs()

const App = () => {
  return (
    <NavigationContainer>
      <AppView />
    </NavigationContainer>
  )
}

export default App
