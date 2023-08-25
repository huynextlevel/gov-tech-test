import React from 'react'
import { render } from '@testing-library/react-native'
import { QRCustomMarker } from 'src/components/extra'

jest.mock('react-native-vector-icons/Ionicons', () => {
  return {
    __esModule: true,
    default: () => <></>,
  }
})

jest.mock('src/utils/dimensions', () => {
  return {
    horizontalPercent: jest.fn(() => 50),
  }
})

describe('<QRCustomMarker />', () => {
  beforeAll(() => {
    jest.clearAllMocks()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders the QRCustomMarker component', () => {
    const { getByLabelText } = render(<QRCustomMarker />)

    const qrCustomMarker = getByLabelText('qrCustomMarker')
    expect(qrCustomMarker).toBeDefined()
  })
})
