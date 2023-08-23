import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Platform,
} from 'react-native'

interface IProps {
  navigation: any
}

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
})

const Welcome = ({ navigation }: IProps) => {

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to React Native Boilerplate</Text>
      <Text style={styles.instructions}>
        To get started, edit src/welcome.js
      </Text>
      <Text style={styles.instructions}>{instructions}</Text>
    </View>
  )
}

export default Welcome

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
})
