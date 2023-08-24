import React from 'react'
import { ViewStyle } from 'react-native'
import { SvgProps } from 'react-native-svg'

import graphicIcons from 'src/assets/svgs/graphics'

export interface GraphicIconProps extends SvgProps {
  name: keyof typeof graphicIcons
  size?: number
  width?: number
  height?: number
  style?: ViewStyle
}

const GraphicIcon = ({
  name,
  width,
  style,
  height,
  size = 24,
  ...props
}: GraphicIconProps) => {
  const Svg = graphicIcons[name]

  return (
    <Svg
      {...props}
      accessibilityLabel="graphicIcon"
      width={width ? width : size}
      height={height ? height : size}
      style={style}
    />
  )
}

export default GraphicIcon
