import React, { useEffect } from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'

import { checkCameraPermission } from 'src/globals/permissions'

import { IScreen } from 'src/globals/types'
import { useGetRoomList } from 'src/services'
import { Typography } from 'src/components/basics/typographies'

const SplashScreen: React.FC<IScreen> = ({ navigation }) => {
  const { isError, isLoading } = useGetRoomList()

  useEffect(() => {
    const initialApp = async () => {
      await checkCameraPermission()

      if (!isError && !isLoading) {
        setTimeout(() => navigation.navigate('Main'), 500)
      }
    }
  
    initialApp()
  }, [isError, isLoading])

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
