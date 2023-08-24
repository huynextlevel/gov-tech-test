import React from 'react'
import { StyleSheet, TouchableOpacity, ViewStyle, TouchableOpacityProps } from 'react-native'

import { colors } from 'src/styles'

export interface BoxButtonContainerProps extends TouchableOpacityProps {
  type: 'pri' | 'sec'
  size: 'large'
  style?: ViewStyle
  children?: any
  isDisabled?: boolean
  buttonRadius?: number
  activeOpacity?: number
  isFullWidth?: boolean
  enableActiveOpacity?: boolean
  onPress: (data?: any) => void
}

const BoxButtonContainer = ({
  type,
  size,
  style,
  children,
  isDisabled,
  buttonRadius = 100,
  activeOpacity = 0.5,
  isFullWidth = true,
  enableActiveOpacity = true,
  onPress,
  ...rest
}: BoxButtonContainerProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      accessibilityLabel="boxButton"
      activeOpacity={enableActiveOpacity ? activeOpacity : 1}
      style={{
        ...buttonStyles[type]({
          size,
          type,
          buttonRadius,
          isDisabled,
          isFullWidth
        }).root,
        ...style
      }}
      {...rest}
    >
      {children}
    </TouchableOpacity>
  )
}

const containerHeight = {
  large: 48
}

const containerColor = {
  pri: colors.blue,
  sec: colors.gray
}

const containerPaddingHorizontal = {
  large: 20
}

const mainContainer = ({
  size,
  type,
  buttonRadius,
  isDisabled,
  isFullWidth
}: {
  size: BoxButtonContainerProps['size']
  type: BoxButtonContainerProps['type']
  buttonRadius: BoxButtonContainerProps['buttonRadius']
  isDisabled: BoxButtonContainerProps['isDisabled']
  isFullWidth: BoxButtonContainerProps['isFullWidth']
}) => StyleSheet.create({
  root: {
    flexShrink: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: buttonRadius,
    height: containerHeight[size],
    width: isFullWidth ? '100%' : 'auto',
    paddingHorizontal: containerPaddingHorizontal[size],
    backgroundColor: isDisabled ? colors.gray5 : containerColor[type]
  }
})

const buttonStyles = {
  pri: mainContainer,
  sec: mainContainer
}

export default BoxButtonContainer
