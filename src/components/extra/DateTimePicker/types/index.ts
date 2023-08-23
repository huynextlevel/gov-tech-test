import { DatePickerProps } from 'react-native-date-picker'

export interface IProps extends DatePickerProps {
  isVisible: boolean
  onClose: () => void
  noBackdropPress?: boolean
  isShowConfirmTitle?: boolean
}