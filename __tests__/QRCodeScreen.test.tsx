import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react-native'
import QRCodeScreen from 'src/screens/QRCode'

jest.mock('rn-qr-generator', () => ({
  detect: jest.fn(),
}))
jest.mock('react-native-image-picker', () => ({
  launchImageLibrary: jest.fn()
}))
jest.mock('react-native-qrcode-scanner', () => 'QRCodeScanner')
jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon')

describe('QR Code Screen unit test', () => {
  let navigationMock: any

  beforeAll(() => {
    jest.clearAllMocks()
  })

  beforeEach(() => {
    navigationMock = {
      addListener: jest.fn(),
      goBack: jest.fn(),
      navigate: jest.fn()
    }
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('navigates back on pressing the close button', async () => {
    const { getByLabelText } = render(<QRCodeScreen navigation={navigationMock} />)

    const closeButton = getByLabelText('cancelButton')
    fireEvent.press(closeButton)

    await waitFor(() => {
      expect(navigationMock.goBack).toHaveBeenCalledTimes(1)
    })
  })
})
