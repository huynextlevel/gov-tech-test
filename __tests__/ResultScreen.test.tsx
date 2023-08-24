import React from 'react'
import { StackNavigationProp } from '@react-navigation/stack'
import { render, fireEvent, waitFor } from '@testing-library/react-native'

import ResultScreen from 'src/screens/Result'
import { RootStackParamList } from 'src/globals/types'

jest.mock('src/components/extra/Webview', () => 'Webview')

describe('Result unit test', () => {
  let routeMock: any
  let navigationMock: StackNavigationProp<RootStackParamList>

  beforeAll(() => {
    jest.clearAllMocks()
  })

  beforeEach(() => {
    routeMock = {
      key: 'test',
      name: 'ResultScreen',
      params: {
        url: 'https://qrgo.page.link/N3vzh'
      }
    }
    navigationMock = {
      navigate: jest.fn()
    } as any
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders Webview with the correct URL', () => {
    const { getByTestId } = render(<ResultScreen route={routeMock} navigation={navigationMock} />)
    const webView = getByTestId('webview')
    expect(webView.props.url).toBe(routeMock.params?.url)
  })

  it('renders Typography and BoxTextButton after Webview loading ends', async () => {
    const { getByTestId, queryByText } = render(
      <ResultScreen route={routeMock} navigation={navigationMock} />
    )
    
    expect(queryByText(routeMock.params.url)).toBeNull()
    expect(queryByText('Back to Home')).toBeNull()
    
    fireEvent(getByTestId('webview'), 'onLoadEnd')
    
    await waitFor(() => {
      expect(queryByText(routeMock.params.url)).not.toBeNull()
      expect(queryByText('Back to Home')).not.toBeNull()
    })
  })

  it('navigates to BookingScreen when "Back to Home" button is pressed', async () => {
    const { getByTestId, getByText } = render(
      <ResultScreen route={routeMock} navigation={navigationMock} />
    )
    
    fireEvent(getByTestId('webview'), 'onLoadEnd')
    
    await waitFor(() => {
      fireEvent.press(getByText('Back to Home'))
      expect(navigationMock.navigate).toHaveBeenCalledWith('BookingScreen')
    })
  })
})
