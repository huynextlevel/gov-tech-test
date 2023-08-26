import React, {
  useRef,
  ElementRef,
  forwardRef,
  useCallback,
  useImperativeHandle,
  ForwardRefRenderFunction,
} from 'react'
import { View, StyleSheet } from 'react-native'

import { BasicModal } from 'src/components/basics/modals'
import { BoxTextButton } from 'src/components/basics/buttons'
import { Typography } from 'src/components/basics/typographies'

export type ErrorMessageModalHandle = {
  /**
   * @prop show: callback to show the modal
   */

  show: () => void
  /**
   * @prop close: callback to close the modal
   */
  close: () => void
}

export interface ErrorMessageModalProps {
  title: string
  desc: string
  isShowRefreshButton?: boolean
  /**
   * @prop isConnected: Network status
   */
  onPress?: () => void
}

const ErrorMessageModal: ForwardRefRenderFunction<
  ErrorMessageModalHandle,
  ErrorMessageModalProps
> = ({
  title,
  desc,
  isShowRefreshButton = true,
  onPress
}, ref) => {
  const modalRef = useRef<ElementRef<typeof BasicModal>>(null)

  const show = useCallback(() => {
    modalRef.current?.show()
  }, [modalRef])

  const close = useCallback(() => {
    modalRef.current?.close()
  }, [modalRef])

  useImperativeHandle(ref, () => ({ show: show, close: close }), [show, close])

  const onTryAgain = () => {
    onPress && onPress()
  }

  return (
    <BasicModal ref={modalRef} type="bottom">
      <View style={styles.root}>
        <Typography size={22} color="gray3" align="center" weight="bold" style={{ marginBottom: 8 }}>
          {title}
        </Typography>
        <Typography size={16} color="gray3" align="center" weight="regular">
          {desc}
        </Typography>
        {isShowRefreshButton && (
          <BoxTextButton
            type="sec"
            size="large"
            label="Try Again"
            onPress={onTryAgain}
            style={{ marginTop: 16 }}
          />
        )}
      </View>
    </BasicModal>
  )
}

const styles = StyleSheet.create({
  root: {
    paddingBottom: 16,
    paddingHorizontal: 16
  }
})

export default forwardRef(ErrorMessageModal)
