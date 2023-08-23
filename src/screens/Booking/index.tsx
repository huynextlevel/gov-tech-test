import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'

import { colors } from 'src/styles'
import { IScreen } from 'src/globals/types'

import { RoomList, DateTimeSelect } from 'src/systems'

const BookingScreen: React.FC<IScreen> = ({ navigation }) => {
  const [bookingDate, setBookingDate] = useState<any>(new Date(Date.now()))
  const [timeSlot, setTimeSlot] = useState<any>(new Date(Date.now()))

  return (
    <View style={styles.container}>
      <DateTimeSelect
        title="Date"
        date={bookingDate}
        setBookingDate={setBookingDate}
        style={{ marginBottom: 27 }}
      />
      <DateTimeSelect
        title="Timeslot"
        date={timeSlot}
        mode="time"
        setBookingDate={setTimeSlot}
        style={{ marginBottom: 36 }}
      />
      <RoomList timeSlot={timeSlot}/>
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
