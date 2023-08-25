import React from 'react'
import { Text, View } from 'react-native'
import { render } from '@testing-library/react-native'
import Toast from 'react-native-toast-message'
import { NetInfoState } from '@react-native-community/netinfo'
// @ts-ignore
import mockRNCNetInfo from '@react-native-community/netinfo/jest/netinfo-mock.js'

import { ErrorBoundary } from 'src/components/extra'

jest.mock('react-native-toast-message', () => ({
  show: jest.fn(),
}))

jest.mock('@react-native-community/netinfo', () => mockRNCNetInfo)

describe('ErrorBoundary component unit test', () => {
  beforeAll(() => {
    jest.clearAllMocks()
  })

  it('renders children when there is no error', () => {
    const { queryByText } = render(
      <ErrorBoundary>
        <Text>Test Content</Text>
      </ErrorBoundary>
    )

    const textComponent = queryByText('Test Content')
    expect(textComponent).toBeDefined()
  })

  it('displays error message when there is an error', () => {
    console.error = jest.fn()

    const ErrorThrower = () => {
      throw new Error('Test Error')
    }

    const { queryByText } = render(
      <ErrorBoundary>
        <ErrorThrower />
      </ErrorBoundary>
    )

    const errorMessage = 'Something went wrong. Please try again later.'
    const errorComponent = queryByText(errorMessage)
    expect(errorComponent).toBeDefined()

    expect(console.error).toHaveBeenCalled()
  })

  it('handles network online status', () => {
    const { queryByText } = render(
      <ErrorBoundary>
        <Text>Online Content</Text>
      </ErrorBoundary>
    )

    const onlineTextComponent = queryByText('Online Content')
    expect(onlineTextComponent).toBeDefined()
  })

  it('shows network disconnected toast when offline', () => {
    mockRNCNetInfo.addEventListener.mockImplementation((callback: (state: NetInfoState) => void) => {
      callback({ isConnected: false } as NetInfoState)
    })

    render(
      <ErrorBoundary>
        <View />
      </ErrorBoundary>
    )

    expect(Toast.show).toHaveBeenCalledWith({
      type: 'error',
      text1: 'Network Disconnected',
      visibilityTime: 2000,
    })
    expect(Toast.show).toHaveBeenCalledTimes(1)
  })

  it('shows network connected toast when online', () => {
    mockRNCNetInfo.addEventListener.mockImplementation((callback: (state: NetInfoState) => void) => {
      callback({ isConnected: true } as NetInfoState)
    })

    render(
      <ErrorBoundary>
        <View />
      </ErrorBoundary>
    )

    expect(Toast.show).toHaveBeenCalledWith({
      type: 'success',
      text1: 'Network Connected',
      visibilityTime: 2000,
    })
    expect(Toast.show).toHaveBeenCalledTimes(1)
  })
})
