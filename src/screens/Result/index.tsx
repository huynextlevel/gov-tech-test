import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'

import { globalStyles } from 'src/styles'
import { IScreen } from 'src/globals/types'

const ResultScreen: React.FC<IScreen> = ({ navigation }) => {
  const handleGoBack = () => {
    navigation.goBack()
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleGoBack}>
        <Text style={globalStyles.goBackText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default ResultScreen
