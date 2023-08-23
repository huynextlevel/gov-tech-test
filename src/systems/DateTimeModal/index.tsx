import React, { useRef, ElementRef, useCallback, forwardRef, useImperativeHandle, ForwardRefRenderFunction } from 'react'

import { DateTimePicker } from 'src/components/extra'
import { DateTimePickerProps } from 'src/components/extra/DateTimePicker/types'

import { BasicModal } from 'src/components/basics/modals'

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
