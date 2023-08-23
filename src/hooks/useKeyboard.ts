import { useState, useEffect } from 'react'
import { Keyboard } from 'react-native'
import { isIphoneX } from 'react-native-iphone-x-helper'

const useKeyboard = () => {
  const [keyboardHeight, setKeyboardHeight] = useState(0)

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardWillShow',
      keyboardWillShow
    )
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardWillHide',
      keyboardWillHide
    )

    return () => {
      keyboardDidShowListener.remove()
      keyboardDidHideListener.remove()
    }
  }, [])

  const keyboardWillShow = (e: any) => {
    setKeyboardHeight(e.endCoordinates.height - (!isIphoneX() ? 20 : 30))
  }

  const keyboardWillHide = () => {
    setKeyboardHeight(0)
  }

  const closeKeyboard = () => {
    Keyboard.dismiss()
  }

  return {
    keyboardHeight,
    closeKeyboard
  }
}

export default useKeyboard
