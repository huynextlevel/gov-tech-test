import React from 'react'
import { LogBox, StatusBar } from 'react-native'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'

import { appStore } from './src/store'
import AppView from './src/routers/AppViewContainer'

LogBox.ignoreAllLogs()

const App = () => {
  return (
    <Provider store={appStore}>
      <NavigationContainer>
        <StatusBar barStyle="dark-content"/>
        <AppView />
      </NavigationContainer>
    </Provider>
  )
}

export default App
