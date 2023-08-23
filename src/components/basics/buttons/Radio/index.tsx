import React, { useMemo } from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'

import { colors } from 'src/styles'

export interface RadioButtonProps {
  value: any
  selectedValue: any
  borderColor?: keyof typeof colors
  onChange: (newValue: any) => void
}


const RadioButton: React.FC<RadioButtonProps> = ({
  value,
  selectedValue,
  borderColor = 'gray4',
  onChange
}) => {
  const isSelected = useMemo(() => value === selectedValue, [value, selectedValue])
  const selectedColor = useMemo(() => isSelected ? 'black' : borderColor, [isSelected, borderColor])

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onChange(value)}
      activeOpacity={0.8}
    >
      <View style={[styles.outerCircle, { borderColor: colors[selectedColor] }]}>
        {isSelected ? <View style={[styles.innerCircle, { backgroundColor: colors[selectedColor] }]} /> : null}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  outerCircle: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCircle: {
    width: 12,
    height: 12,
    borderRadius: 6
  }
})

export default RadioButton