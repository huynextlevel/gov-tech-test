import React, {
  useMemo,
  useState,
  forwardRef,
  useCallback,
  useImperativeHandle,
  ForwardRefRenderFunction
} from 'react'
import { View, StyleSheet, ViewStyle } from 'react-native'
import Modal from 'react-native-modal'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { colors } from 'src/styles'
import { Dimension } from 'src/utils'

export type BasicModalHandle = {
  isVisible: boolean
  show: () => void
  close: () => void
}

export interface BasicModalProps {
  type: 'popup' | 'bottom'
  onClose?: (data?: any) => void
  children: any
  modalStyle?: ViewStyle
  containerStyle?: ViewStyle
  onBackdropPress?: () => void
}

const BasicModal: ForwardRefRenderFunction<BasicModalHandle, BasicModalProps> = ({
  type,
  onClose,
  children,
  modalStyle,
  containerStyle,
  ...rest
}, ref) => {
  const insets = useSafeAreaInsets()
  const [isVisible, setIsVisible] = useState(false)

  const show = () => {
    setIsVisible(true)
  }

  const close = useCallback(() => {
    setIsVisible(false)
    onClose && onClose()
  }, [onClose])

  useImperativeHandle(ref, () => ({
    isVisible: isVisible,
    show: show,
    close: close
  }), [isVisible, show, close])

  const getModalStyle = useMemo(() => {
    if (type === 'popup') {
      return {
        container: '',
        item: 'popupItemContainer'
      }
    } else if (type === 'bottom') {
      return {
        container: 'bottomWrapper',
        item: 'bottomItemContainer'
      }
    }
  }, [type])

  return (
    <Modal
      {...rest}
      isVisible={isVisible}
      useNativeDriver={true}
      accessibilityLabel="basicModal"
      deviceHeight={Dimension.vertical}
      hideModalContentWhileAnimating={true}
      style={[styles[getModalStyle.container], containerStyle]}
    >
      <View
        style={[
          type === 'bottom' && { paddingBottom: insets.bottom },
          styles[getModalStyle.item],
          modalStyle
        ]}
      >
        {children}
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  popupItemContainer: {
    borderRadius: 10,
    paddingBottom: 20,
    overflow: 'hidden',
    alignItems: 'center',
    backgroundColor: colors.white
  },
  bottomWrapper: {
    flex: 1,
    zIndex: 10,
    elevation: 10,
    margin: 0,
    justifyContent: 'flex-end'
  },
  bottomItemContainer: {
    paddingTop: 30,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: colors.white
  }
})

export default forwardRef(BasicModal)
