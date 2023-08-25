import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { DateTimePicker } from 'src/components/extra'

describe('DateTimePicker component unit test', () => {
  const mockOnClose = jest.fn()
  const mockOnDateChange = jest.fn()
  
  beforeAll(() => {
    jest.clearAllMocks()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  const defaultProps = {
    date: new Date(),
    onClose: mockOnClose,
    onDateChange: mockOnDateChange,
  }

  it('renders without crashing', () => {
    render(<DateTimePicker mode="date" minuteInterval={30} {...defaultProps} />)
  })

  it('height change when isShowConfirmTitle change', () => {
    const { getByLabelText, rerender } = render(
      <DateTimePicker
        mode="date"
        minuteInterval={30}
        isShowConfirmTitle={true}
        {...defaultProps}
      />
    )
    const confirmHeader = getByLabelText('confirmHeader')
    expect(confirmHeader.props.style.height).toBe(0)

    rerender((
      <DateTimePicker
        mode="date"
        minuteInterval={30}
        isShowConfirmTitle={false}
        {...defaultProps}
      />
    ))
    expect(confirmHeader.props.style.height).toBe(40)
  })

  it('calls onClose when Confirm is pressed', () => {
    const { getByText } = render(
      <DateTimePicker
        mode="date"
        minuteInterval={30}
        isShowConfirmTitle={true}
        {...defaultProps}
      />
    )
    const confirmButton = getByText('Confirm')
    fireEvent.press(confirmButton)
    expect(mockOnClose).toHaveBeenCalled()
  })

  it('calls onDateChange when date is changed', () => {
    render(<DateTimePicker mode="date" minuteInterval={30} {...defaultProps} />)

    const newDate = new Date()
    defaultProps.onDateChange.mockClear()
    defaultProps.onDateChange(newDate)
    expect(mockOnDateChange).toBeCalledTimes(1)
    expect(mockOnDateChange).toHaveBeenCalledWith(newDate)
  })
})
