import React from 'react'
import { View, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import { Dimension } from 'src/utils'

const QRCustomMarker = () => {
  return (
    <View accessibilityLabel='qrCustomMarker' style={styles.rectangle}>
      <Icon
        name="scan-outline"
        size={Dimension.horizontalPercent(0.73)}
        color="#FFF"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  rectangle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
})

export default QRCustomMarker
