import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { Camera, useCameraDevices } from 'react-native-vision-camera'

import { globalStyles } from 'src/styles'
import { IScreen } from 'src/globals/types'

const QRCodeScreen: React.FC<IScreen> = ({ navigation }) => {
  const devices = useCameraDevices()
  const device = devices.back

  if (!device) return
  return (
    <Camera
      device={device}
      isActive={true}
      style={StyleSheet.absoluteFill}
    />
    // <View style={styles.container}>
    //   <TouchableOpacity onPress={handleGoBack}>
    //     <Text style={globalStyles.goBackText}>Go Back</Text>
    //   </TouchableOpacity>
    // </View>
  )
}

const styles = StyleSheet.create({
  container: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute'
  }
})

export default QRCodeScreen
