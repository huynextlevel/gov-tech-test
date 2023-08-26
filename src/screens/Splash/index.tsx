import React from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'

import { useInit, useScreenEventListener } from 'src/hooks'

import { IScreen } from 'src/globals/types'
import { useGetRoomList } from 'src/services'
import { Typography } from 'src/components/basics/typographies'

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
      <Typography size={14} weight="bold" color="gray3" align="center" style={{ marginBottom: 10 }}>
        Book a Room
      </Typography>
      <ActivityIndicator color="#000" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default SplashScreen
