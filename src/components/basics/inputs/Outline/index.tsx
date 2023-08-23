import React, {
  useRef,
  useCallback,
  forwardRef,
  useImperativeHandle,
  ForwardRefRenderFunction
} from 'react'
import { View, TextInput, StyleProp, TextStyle, StyleSheet, TextInputProps, ViewStyle } from 'react-native'

import { colors } from 'src/styles'

import { Typography } from 'src/components/basics/typographies'

export type OutlineInputHandle = {
  blur: () => void
  focus: () => void
  clear: () => void
  isFocused: () => boolean | null
}

export interface OutlineInputProps extends TextInputProps {
  title?: string
  containerStyle?: ViewStyle
  inputStyle?: StyleProp<TextStyle>
  onPress?: () => void
}

const OutlineInput: ForwardRefRenderFunction<OutlineInputHandle, OutlineInputProps> = ({
  title,
  onPress,
  inputStyle,
  containerStyle,
  ...rest
}, ref) => {
  const inputRef = useRef<TextInput>(null)

  const clear = useCallback(() => {
    inputRef.current && inputRef.current.clear()
  }, [inputRef])

  const isFocused = useCallback(() => {
    return inputRef.current && inputRef.current.isFocused()
  }, [inputRef])

  const focus = useCallback(() => {
    return inputRef.current && inputRef.current.focus()
  }, [inputRef])

  const blur = useCallback(() => {
    return inputRef.current && inputRef.current.blur()
  }, [inputRef])

  useImperativeHandle(ref, () => ({ blur, clear, isFocused, focus }), [
    blur,
    clear,
    focus,
    isFocused
  ])

  return (
    <View style={{ width: '100%', ...containerStyle }}>
      {title && (
        <Typography size={12} weight="regular" color="gray4" style={{ marginBottom: 2 }}>
          {title}
        </Typography>
      )}
      <TextInput
        ref={inputRef}
        placeholderTextColor="#ACACAC"
        selectionColor={colors.gray2}
        style={[styles.inputContainer, inputStyle]}
        {...rest}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    fontSize: 14,
    width: '100%',
    paddingBottom: 5,
    fontWeight: '400',
    overflow: 'hidden',
    color: colors.gray5,
    fontFamily: 'System',
    borderBottomWidth: 1
  }
})

export default forwardRef(OutlineInput)
