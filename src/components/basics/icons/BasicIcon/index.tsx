import React from 'react'

import { ViewStyle } from 'react-native'
import { SvgProps } from 'react-native-svg'

import { colors } from 'src/styles'
import basicIcons from 'src/assets/svgs/basics'

export interface BasicIconProps extends SvgProps {
  name: keyof typeof basicIcons
  size?: number
  width?: number
  height?: number
  color?: keyof typeof colors
  sColor?: keyof typeof colors
  style?: ViewStyle
}

const BasicIcon = ({
  name,
  width,
  style,
  height,
  size = 24,
  color,
  sColor,
  ...props
}: BasicIconProps) => {
  const Svg = basicIcons[name]

  return (
    <Svg
      {...props}
      width={width ? width : size}
      height={height ? height : size}
      style={style}
      {...(color && { fill: colors[color] })}
      {...(sColor && { stroke: colors[sColor] })}
    />
  )
}

export default BasicIcon
