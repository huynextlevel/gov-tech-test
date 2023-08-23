import React, { useState } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'

import Welcome from '../Welcome'
import { IScreen } from 'src/globals/types'
import { colors, globalStyles } from 'src/styles'

import { DateTimePicker } from 'src/components/extra'

const BookingScreen: React.FC<IScreen> = ({ navigation }) => {
  const [birthday, setBirthday] = useState<Date>(new Date(Date.now()))
  const [isBirthdayPickerVisible, setIsBirthdayPickerVisible] =
    useState<boolean>(false)

  const handleGoBack = () => {
    navigation.goBack()
  }

  const onChangeBirthday = (date: Date) => {
    setBirthday(date)
  }

  const onCloseDatePicker = () => {
    setIsBirthdayPickerVisible(false)
  }

  return (
    <View style={styles.container}>
      <Welcome navigation={navigation} />
      <TouchableOpacity onPress={handleGoBack}>
        <Text style={globalStyles.goBackText}>Go Back</Text>
      </TouchableOpacity>
        <DateTimePicker
          mode="date"
          date={new Date(birthday)}
          onDateChange={onChangeBirthday}
          isVisible={isBirthdayPickerVisible}
          onClose={onCloseDatePicker}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 17,
    paddingHorizontal: 24,
    backgroundColor: colors.white
  },
})

export default BookingScreen
