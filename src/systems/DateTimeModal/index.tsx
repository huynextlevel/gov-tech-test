import React, {
  useRef,
  ElementRef,
  forwardRef,
  useCallback,
  useImperativeHandle,
  ForwardRefRenderFunction
} from 'react'
import { View, TouchableOpacity } from 'react-native'

import { DateTimePicker } from 'src/components/extra'
import { BasicIcon } from 'src/components/basics/icons'
import { BasicModal } from 'src/components/basics/modals'

import { DateTimePickerProps } from 'src/components/extra/DateTimePicker/types'

export type DateTimeModalHandle = {
  show: () => void
  close: () => void
}

export interface DateTimeModalProps extends DateTimePickerProps {}

const DateTimeModal: ForwardRefRenderFunction<DateTimeModalHandle, DateTimeModalProps> = ({
  date,
  mode,
  minuteInterval,
  isShowConfirmHeader = false,
  onClose,
  onDateChange
}, ref) => {
  const modalRef = useRef<ElementRef<typeof BasicModal>>(null)

  const show = useCallback(() => {
    modalRef.current?.show()
  }, [modalRef])

  const close = useCallback(() => {
    modalRef.current?.close()
  }, [modalRef])

  useImperativeHandle(ref, () => ({ show: show, close: close }), [show, close])

  return (
    <BasicModal ref={modalRef} type="bottom" onBackdropPress={close}>
      <View style={{ alignSelf: 'flex-end', paddingHorizontal: 24 }}>
        <TouchableOpacity onPress={close}>
          <BasicIcon size={16} name="ic_close_line_bold" color="gray4" />
        </TouchableOpacity>
      </View>
      <DateTimePicker
        mode={mode}
        date={date}
        onClose={onClose}
        onDateChange={onDateChange}
        minuteInterval={minuteInterval}
        isShowConfirmHeader={isShowConfirmHeader}
      />
    </BasicModal>
  )
}

export default forwardRef(DateTimeModal)
