import React from 'react'
import { Platform, LogBox, StatusBar } from 'react-native'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import Toast from 'react-native-toast-message'

import { appStore } from './src/store'
import AppView from './src/routers/AppViewContainer'
import { ErrorBoundary } from 'src/components/extra'

LogBox.ignoreAllLogs()

const App = () => {
  return (
    <Provider store={appStore}>
      <ErrorBoundary>
        <NavigationContainer>
          <StatusBar barStyle="dark-content"/>
          <AppView />
        </NavigationContainer>
        <Toast topOffset={Platform.OS === 'ios' ? 50 : 0} />
      </ErrorBoundary>
    </Provider>
  )
}

export default App
