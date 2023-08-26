import React, {
  useRef,
  useEffect,
  ElementRef,
  forwardRef,
  useCallback,
  useImperativeHandle,
  ForwardRefRenderFunction,
} from 'react'
import { View, StyleSheet } from 'react-native'
import NetInfo, { NetInfoState } from '@react-native-community/netinfo'

import { BasicModal } from 'src/components/basics/modals'
import { BoxTextButton } from 'src/components/basics/buttons'
import { Typography } from 'src/components/basics/typographies'

export type NetworkModalHandle = {
  /**
   * @prop show: callback to show the modal
   */

  show: () => void
  /**
   * @prop close: callback to close the modal
   */
  close: () => void
}

export interface NetworkModalProps {
  /**
   * @prop isConnected: Network status
   */
  isConnected: boolean | null
}

const NetworkModal: ForwardRefRenderFunction<
  NetworkModalHandle,
  NetworkModalProps
> = ({ isConnected }, ref) => {
  const modalRef = useRef<ElementRef<typeof BasicModal>>(null)

  const show = useCallback(() => {
    modalRef.current?.show()
  }, [modalRef])

  const close = useCallback(() => {
    modalRef.current?.close()
  }, [modalRef])

  useEffect(() => {
    if (isConnected) {
      close()
    }
  }, [close, isConnected])

  useImperativeHandle(ref, () => ({ show: show, close: close }), [show, close])

  const onCheckAgain = async () => {
    try {
      const netState: NetInfoState = await NetInfo.refresh()
      if (netState.isConnected) {
        close()
      }
    } catch(err) {}
  }

  return (
    <BasicModal ref={modalRef} type="bottom">
      <View style={styles.root}>
        <Typography size={22} color="gray3" align="center" weight="bold" style={{ marginBottom: 8 }}>
          Connection Error
        </Typography>
        <Typography size={16} color="gray3" align="center" weight="regular" style={{ marginBottom: 16 }}>
          Oops! Looks like your device is not connected to the Internet.
        </Typography>
        <BoxTextButton
          type="sec"
          size="large"
          label="Try Again"
          onPress={onCheckAgain}
        />
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

export default forwardRef(NetworkModal)
