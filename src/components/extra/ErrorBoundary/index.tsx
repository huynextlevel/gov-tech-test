import React from 'react'
import { View } from 'react-native'
import Toast from 'react-native-toast-message'
import NetInfo, { NetInfoState, NetInfoSubscription } from '@react-native-community/netinfo'

import { Typography } from 'src/components/basics/typographies'

interface State {
  hasError: boolean
  isOnline: boolean | null
}

export interface ErrorBoundaryProps {
  children?: any
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, State> {
  private netInfoUnsubscribe: NetInfoSubscription | null = null

  constructor(props: {}) {
    super(props)
    this.state = {
      hasError: false,
      isOnline: true
    }
  }

  componentDidMount() {
    this.netInfoUnsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      const isOnline = state.isConnected
      this.setState({ isOnline })

      if (isOnline) {
        Toast.show({
          type: 'success',
          text1: 'Network Connected',
          visibilityTime: 2000,
        })
      } else {
        Toast.show({
          type: 'error',
          text1: 'Network Disconnected',
          visibilityTime: 2000,
        })
      }
    })
  }

  componentWillUnmount() {
    if (this.netInfoUnsubscribe) {
      this.netInfoUnsubscribe()
    }
  }

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true, isOnline: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log the error to an error reporting service, e.g., Sentry, LogRocket, etc.
    console.error('Uncaught error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Typography size={14} color="gray3" weight="bold" align="center">
            Something went wrong. Please try again later.
          </Typography>
        </View>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
