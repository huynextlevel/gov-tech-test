import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

import { RootStackParamList } from 'src/globals/types'
import { BasicIcon } from 'src/components/basics/icons'

const QRScan = () => {
  const { navigate } = useNavigation<StackNavigationProp<RootStackParamList>>()

  const onNavigate = () => {
    navigate("QRCodeScreen")
  }

  return (
    <TouchableOpacity onPress={onNavigate}>
      <BasicIcon name="ic_camera" size={24} sColor="black" />
    </TouchableOpacity>
  )
}

export default QRScan
