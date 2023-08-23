import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import DatePicker from 'react-native-date-picker'

import { IProps } from './types'
import { colors } from 'src/styles'

import { Typography } from 'src/components/basics/typographies'

const DateTimePicker = ({
  minuteInterval,
  onClose,
  onDateChange,
  date,
  mode,
  minimumDate,
  maximumDate,
  isShowConfirmTitle
}: IProps) => {
  return (
    <View style={{ width: '100%' }}>
      <View
        style={{
          paddingRight: 20,
          paddingVertical: 12.5,
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
          backgroundColor: colors.gray5,
          height: !isShowConfirmTitle ? 40 : 0
        }}
      >
        {isShowConfirmTitle && (
          <TouchableOpacity
            onPress={onClose}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Typography size={15} color="black" weight="medium">
              Confirm
            </Typography>
          </TouchableOpacity>
        )}
      </View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.white
        }}
      >
        <DatePicker
          mode={mode}
          date={date}
          androidVariant="iosClone"
          onDateChange={onDateChange}
          textColor={colors.gray3}
        />
      </View>
    </View>
  )
}

function shouldMemo(prevProps: IProps, nextProps: IProps) {
  return (
    prevProps.date === nextProps.date &&
    prevProps.isVisible === nextProps.isVisible
  )
}

export default React.memo(DateTimePicker, shouldMemo)
