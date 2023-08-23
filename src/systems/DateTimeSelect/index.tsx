import React, { useRef, ElementRef, useCallback, useMemo } from 'react'
import { View, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native'
import moment from 'moment-timezone'

import { colors } from 'src/styles'
import { roundToNearestHalfHour } from 'src/utils'
import { DateTimePickerProps } from 'src/components/extra/DateTimePicker/types'

import { DateTimeModal } from 'src/systems'
import { Typography } from 'src/components/basics/typographies'

type DateTimeProps = Pick<DateTimePickerProps, 'mode' | 'minuteInterval'>

export interface DateTimeSelectProps {
  date: Date
  title: string
  style?: ViewStyle
  mode?: DateTimeProps['mode']
  minuteInterval?: DateTimeProps['minuteInterval']
  setBookingDate: (date: Date) => void
}

const DateTimeSelect = ({
  date,
  title,
  style,
  mode = 'date',
  minuteInterval = 30,
  setBookingDate
}: DateTimeSelectProps) => {
  const dateTimeModalRef = useRef<ElementRef<typeof DateTimeModal>>(null)

  const onChangeDate = (date: Date) => {
    setBookingDate(date)
  }

  const showModal = useCallback(() => {
    dateTimeModalRef.current?.show()
  }, [dateTimeModalRef])

  const displayTime = useMemo(() => {
    if (mode === 'time') return moment(roundToNearestHalfHour(date)).format('hh:mm A')
    return moment(date).format('DD MMM YYYY')
  }, [mode, date])

  return (
    <View style={style}>
      <DateTimeModal
        date={date}
        mode={mode}
        ref={dateTimeModalRef}
        onDateChange={onChangeDate}
        minuteInterval={minuteInterval}
      />

      <TouchableOpacity style={styles.root} onPress={showModal}>
        <Typography size={12} color="gray4" weight="regular" style={{ marginBottom: 2 }}>
          {title}
        </Typography>
        <Typography size={14} color="gray3" weight="regular">
          {displayTime}
        </Typography>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray5
  }
})

export default DateTimeSelect