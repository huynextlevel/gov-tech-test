import React, { useEffect, useContext } from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'

import { useInit } from 'src/hooks'

import { IScreen } from 'src/globals/types'
import { useGetRoomList } from 'src/services'
import { Typography } from 'src/components/basics/typographies'

import { APIErrorContext, APIErrorContextType } from 'src/context/APIErrorContext'

const SplashScreen: React.FC<IScreen> = ({ navigation }) => {
  const { init } = useInit()
  const { isError, isLoading, fetchRoomList } = useGetRoomList()
  const { setError } = useContext<APIErrorContextType | any>(APIErrorContext)

  useEffect(() => {
    const initialApp = async () => {
      await init()

      if (isError) {
        setError({
          error: 'Error: fetch room list',
          retryApiCall: fetchRoomList
        })
      } else if (!isLoading) {
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
