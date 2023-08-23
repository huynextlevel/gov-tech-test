import { DatePickerProps } from 'react-native-date-picker'

export interface DateTimePickerProps extends DatePickerProps {
  onClose?: () => void
  noBackdropPress?: boolean
  isShowConfirmTitle?: boolean
  isShowConfirmHeader?: boolean
}