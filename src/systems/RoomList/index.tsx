import React, { useRef, useEffect, useState, useCallback, ElementRef, useMemo } from 'react'
import { View, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import moment from 'moment-timezone'

import { colors } from 'src/styles'
import { Room } from 'src/globals/types'
import { RootState } from 'src/store/reducers'
import { roundToNearestHalfHour } from 'src/utils'

import { SortActionSheet } from 'src/systems'

import { BasicIcon } from 'src/components/basics/icons'
import { Typography } from 'src/components/basics/typographies'

export interface RoomListProps {
  /**
   * @prop timeSlot: The selected time slot
   */
  timeSlot: Date
}

const RoomList = ({ timeSlot }: RoomListProps) => {
  const sortSheetRef = useRef<ElementRef<typeof SortActionSheet>>(null)
  const roomList = useSelector((state: RootState) => state.app.roomList)
  const [rooms, setRooms] = useState<Room[]>([])
  const [sortValue, setSortValue] = useState<string | undefined>()

  const formatTimeSlot = useMemo(() => 
    moment(roundToNearestHalfHour(new Date(timeSlot))).format('HH:mm'),
  [timeSlot])

  useEffect(() => {
    if (roomList.length !== 0) {
      const sortData = roomList.sort((a, b) => parseInt(a.level) - parseInt(b.level))
      setRooms(sortData)
    }
  }, [roomList])

  const show = useCallback(() => {
    sortSheetRef.current?.show()
  }, [sortSheetRef])

  // Function return the status of room based on the selected time slot
  const roomStatus = useCallback((availability: any) => {
    const availabilityTime = availability[formatTimeSlot]

    if (availabilityTime === '1') {
      return {
        isAvailable: true,
        label: 'Available'
      }
    } else {
      return {
        isAvailable: false,
        label: 'Not Available'
      }
    }
  }, [formatTimeSlot])

  // Function handle sorting data when you sort value change
  const onSort = useCallback((sortValue: any) => {
    setSortValue(sortValue)
    if (sortValue !== undefined) {
      const tempData = [...rooms]

      switch(sortValue) {
        case 'capacity':
          const capacityData = tempData.sort((a, b) => parseInt(b.capacity) - parseInt(a.capacity))
          setRooms(capacityData)
          break
        case 'availability':
          const availabilityData = tempData.sort((a, b) => {
            if (a.availability[formatTimeSlot] > b.availability[formatTimeSlot]) {
              return -1
            } else if (a.availability[formatTimeSlot] < b.availability[formatTimeSlot]) {
              return 1
            } else {
              return a.name.localeCompare(b.name)
            }
          })
          setRooms(availabilityData)
          break
        case 'location':
          const locationData = roomList.sort((a, b) => parseInt(a.level) - parseInt(b.level))
          setRooms(locationData)
          break
        default:
          break
      }
    }
  }, [rooms, formatTimeSlot])

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
            {roomStatus(item.availability).label}
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
      <SortActionSheet
        ref={sortSheetRef}
        value={sortValue}
        onChange={onSort}
      />
      <View style={[styles.row, { marginBottom: 8, justifyContent: 'space-between' }]}>
        <Typography size={12} color="gray4" weight="regular">
          Rooms
        </Typography>
        <TouchableOpacity style={styles.row} onPress={show}>
          <Typography size={12} color="gray3" weight="bold" style={{ marginRight: 4 }}>
            Sort
          </Typography>
          <BasicIcon size={20} name="ic_sort" color="black" />
        </TouchableOpacity>
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
