import React, { useCallback, useEffect, useState } from 'react'
import { View, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import moment from 'moment-timezone'

import { colors } from 'src/styles'
import { RootState } from 'src/store/reducers'

import { BasicIcon } from 'src/components/basics/icons'
import { Typography } from 'src/components/basics/typographies'

export interface RoomListProps {
  timeSlot: Date
}

const RoomList = ({ timeSlot }: RoomListProps) => {
  const roomList = useSelector((state: RootState) => state.app.roomList)
  const [rooms, setRooms] = useState<any[]>([])

  useEffect(() => {
    if (roomList.length !== 0) {
      const sortData = roomList.sort((a, b) => parseInt(b.level) - parseInt(a.level))
      setRooms(sortData)
    }
  }, [roomList])

  const roomStatus = useCallback((availability: any) => {
    const formatTime = moment(new Date(timeSlot)).format('HH:mm')
    const availabilityTime = availability[formatTime]

    if (availabilityTime === '1') {
      return {
        isAvailable: true,
        lable: 'Available'
      }
    } else {
      return {
        isAvailable: false,
        lable: 'Not Available'
      }
    }
  }, [timeSlot])

  const renderItem = ({ item }: { item: any }) => {
    return (
      <View style={styles.roomItem}>
        <View style={[styles.row, { marginBottom: 8, justifyContent: 'space-between' }]}>
          <Typography size={16} weight="bold" color="gray2">
            {item.name}
          </Typography>
          <Typography
            size={14}
            weight="regular"
            align="right"
            style={{ fontStyle: 'italic' }}
            color={roomStatus(item.availability).isAvailable ? 'green1' : 'gray1'}
          >
            {roomStatus(item.availability).lable}
          </Typography>
        </View>
        <View style={[styles.row, { justifyContent: 'space-between' }]}>
          <Typography size={14} weight="regular" color="gray2">
            Level {item.level}
          </Typography>
          <Typography size={14} weight="regular" color="gray2" align="right">
            {item.capacity} Pax
          </Typography>
        </View>
      </View>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={[styles.row, { marginBottom: 8, justifyContent: 'space-between' }]}>
        <Typography size={12} color="gray4" weight="regular">
          Rooms
        </Typography>
        <View style={styles.row}>
          <Typography size={12} color="gray3" weight="bold" style={{ marginRight: 4 }}>
            Sort
          </Typography>
          <TouchableOpacity>
            <BasicIcon size={20} name="ic_sort" color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={rooms}
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  roomItem: {
    borderRadius: 8,
    marginBottom: 8,
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: colors.gray6
  }
})

export default RoomList
