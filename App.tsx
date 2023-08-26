import React from 'react'
import { Platform, LogBox, StatusBar } from 'react-native'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { appStore } from './src/store'
import AppView from './src/routers/AppViewContainer'
import { ErrorBoundary } from 'src/components/extra'
import { NetworkProvider } from 'src/context/NetworkContext'

LogBox.ignoreAllLogs()

const App = () => {
  return (
    <Provider store={appStore}>
      <ErrorBoundary>
        <NavigationContainer>
          <SafeAreaProvider>
            <NetworkProvider>
              <StatusBar barStyle="dark-content"/>
              <AppView />
            </NetworkProvider>
          </SafeAreaProvider>
        </NavigationContainer>
      </ErrorBoundary>
    </Provider>
  )
}

export default App
