import React, { useEffect } from 'react'
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native'

import { IScreen } from 'src/globals/types'
import { useGetRoomList } from 'src/services'

const SplashScreen: React.FC<IScreen> = ({ navigation }) => {
  const { fetchRoomList } = useGetRoomList()
  useEffect(() => navigation.addListener('focus', () => {
    fetchRoomList()
    setTimeout(() => navigation.navigate('Main'), 1000)
  }), [navigation])

  return (
    <View style={styles.container}>
      <Text style={{ marginBottom: 10 }}>SplashScreen</Text>
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
