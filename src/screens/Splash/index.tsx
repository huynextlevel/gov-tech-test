import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native'

import { useInit, useScreenEventListener } from 'src/hooks'

import { IScreen } from 'src/globals/types'
import { useGetRoomList } from 'src/services'

const SplashScreen: React.FC<IScreen> = ({ navigation }) => {
  const { init } = useInit()
  const { fetchRoomList } = useGetRoomList()

  const onDidFocus = async () => {
    await init()
    fetchRoomList()
    setTimeout(() => navigation.navigate('Main'), 1000)
  }

  useScreenEventListener({
    navigation,
    listenerType: 'focus',
    callback: onDidFocus
  })

  return (
    <View style={styles.container}>
      <Text style={{ marginBottom: 10 }}>Book a Room</Text>
      <ActivityIndicator color="#000" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
})

export default SplashScreen
