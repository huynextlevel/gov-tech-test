import React, { useCallback, useRef } from 'react'
import { Alert, View, TouchableOpacity, StyleSheet } from 'react-native'

import RNQRGenerator from 'rn-qr-generator'
import QRCodeScanner from 'react-native-qrcode-scanner'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { launchImageLibrary } from 'react-native-image-picker'

import { Dimension } from 'src/utils'
import { IScreen } from 'src/globals/types'
import { useScreenEventListener } from 'src/hooks'
import { QRCustomMarker } from 'src/components/extra'

const QRCodeScreen: React.FC<IScreen> = ({ navigation }) => {
  const qrScanRef = useRef<any>(null)
  
  const reActivateScanner = useCallback(() => {
    qrScanRef.current?.reactivate()
  }, [qrScanRef])

  const onDidFocus = () => {
    reActivateScanner()
  }

  useScreenEventListener({
    navigation,
    listenerType: 'focus',
    callback: onDidFocus
  })

  const alertMessage = (title: string) => {
    Alert.alert(
      title,
      '',
      [{ text: 'Done', onPress: reActivateScanner }]
    )
  }

  const onSuccess = (e: any) => {
    navigation.navigate('ResultScreen', { url: e.data })
  }

  const detectQR = (image: any) => {
    RNQRGenerator.detect({
      uri: image.uri,
    }).then((response) => {
      const { values } = response
      if (values.length !== 0) {
        navigation.navigate('ResultScreen', { url: values[0] })
      } else alertMessage('The image is not QR Code image.')
    }).catch((error) => alertMessage(JSON.stringify(error)))
  }

  const onChooseFromLibrary = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
    } as any

    launchImageLibrary(options, (res) => {
      if (res.assets !== undefined) detectQR(res.assets[0])
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.topControlContainer}>
        <TouchableOpacity testID="chooseFromLibraryButton" style={{ marginRight: 20 }} onPress={onChooseFromLibrary}>
          <Icon name="collections" size={30} color="#FFF"/>
        </TouchableOpacity>
        <TouchableOpacity accessibilityLabel="cancelButton" onPress={() => navigation.goBack()}>
          <Icon name="close" size={35} color="#FFF"/>
        </TouchableOpacity>
      </View>
      
      <QRCodeScanner
        showMarker
        ref={qrScanRef}
        onRead={onSuccess}
        cameraStyle={styles.cameraContainer}
        topViewStyle={styles.zeroContainer}
        bottomViewStyle={styles.zeroContainer}
        customMarker={<QRCustomMarker />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  topControlContainer: {
    top: 50,
    zIndex: 100,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    paddingHorizontal: 10,
    justifyContent: 'space-between'
  },
  zeroContainer: {
    flex: 0,
    height: 0,
  },
  cameraContainer: {
    height: Dimension.vertical
  }
})

export default QRCodeScreen
