import React from 'react'
import { Alert } from 'react-native'
import { render, fireEvent, waitFor } from '@testing-library/react-native'
import RNQRGenerator from 'rn-qr-generator'
import QRCodeScanner from 'react-native-qrcode-scanner'
import ImagePicker from 'react-native-image-crop-picker'

import QRCodeScreen from 'src/screens/QRCode'

jest.mock('react-native-qrcode-scanner', () => 'QRCodeScanner')
jest.mock('react-native-vector-icons/MaterialIcons', () => {
  return {
    __esModule: true,
    default: () => <></>,  // A mock component that renders nothing
  }
})

jest.mock('rn-qr-generator', () => ({
  detect: jest.fn()
}))

jest.mock('react-native-image-crop-picker', () => ({
  openPicker: jest.fn().mockImplementation(() => Promise.resolve({ path: 'src/assets/images/qrcode_booking.png' }))
}))

describe('<QRCodeScreen />', () => {
  let mockNavigation: any
  const alertSpy = jest.spyOn(Alert, 'alert')
  const detectSpy = jest.spyOn(RNQRGenerator, 'detect')

  beforeAll(() => {
    jest.clearAllMocks()
  })

  beforeEach(() => {
    mockNavigation = {
      addListener: jest.fn(),
      goBack: jest.fn(),
      navigate: jest.fn()
    }
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders the QRCodeScreen component', () => {
    const { getByLabelText, UNSAFE_getByType } = render(<QRCodeScreen navigation={mockNavigation} />)

    expect(getByLabelText('chooseFromLibraryButton')).toBeDefined()
    expect(getByLabelText('cancelButton')).toBeDefined()
    expect(UNSAFE_getByType(QRCodeScanner)).toBeDefined()
  })

  it('navigates back on pressing the close button', async () => {
    const { getByLabelText } = render(<QRCodeScreen navigation={mockNavigation} />)

    const closeButton = getByLabelText('cancelButton')
    fireEvent.press(closeButton)

    await waitFor(() => {
      expect(mockNavigation.goBack).toHaveBeenCalledTimes(1)
    })
  })

  it('navigates to ResultScreen with URL when a QR Code image is chosen', async () => {
    const { getByLabelText } = render(<QRCodeScreen navigation={mockNavigation} />)
    detectSpy.mockResolvedValue({ values: ['https://qrgo.page.link/N3vzh'], type: 'QRCode' })
    fireEvent.press(getByLabelText('chooseFromLibraryButton'))

    await waitFor(() => {
      expect(ImagePicker.openPicker).toHaveBeenCalledTimes(1)
      expect(mockNavigation.navigate).toHaveBeenCalledWith('ResultScreen', { url: 'https://qrgo.page.link/N3vzh' })
    })
  })

  it('shows an error alert when a non-QR Code image is chosen', async () => {
    const { getByLabelText } = render(<QRCodeScreen navigation={mockNavigation} />)

    detectSpy.mockResolvedValue({ values: [], type: 'QRCode' })

    fireEvent.press(getByLabelText('chooseFromLibraryButton'))

    await waitFor(() => {
      expect(ImagePicker.openPicker).toHaveBeenCalledTimes(1)
      expect(alertSpy).toHaveBeenCalledWith('The image is not QR Code image.', '', expect.anything())
    })
  })

  it('shows an error message on QR detection error', async () => {
    const { getByLabelText } = render(<QRCodeScreen navigation={mockNavigation} />)
    detectSpy.mockRejectedValue(new Error('Detect QR error'))
    fireEvent.press(getByLabelText('chooseFromLibraryButton'))

    await waitFor(() => {
      expect(ImagePicker.openPicker).toHaveBeenCalledTimes(1)
      expect(alertSpy).toHaveBeenCalledWith('Detect QRCode error', '', expect.anything())
    })
  })
})
