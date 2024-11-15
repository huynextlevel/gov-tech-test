import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'

import { colors } from 'src/styles'

import { RoomList, DateTimeSelect } from 'src/systems'

const BookingScreen = () => {
  const [timeSlot, setTimeSlot] = useState<any>(new Date(Date.now()))
  const [bookingDate, setBookingDate] = useState<any>(new Date(Date.now()))

  return (
    <View style={styles.container}>
      <DateTimeSelect
        title="Date"
        date={bookingDate}
        setBookingDate={setBookingDate}
        style={{ marginBottom: 27 }}
      />
      <DateTimeSelect
        mode="time"
        title="Timeslot"
        date={timeSlot}
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
  }
})

export default BookingScreen
