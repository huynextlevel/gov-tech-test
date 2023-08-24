import React from 'react'
import { Text, TextStyle, StyleProp } from 'react-native'

import { colors } from 'src/styles'
import { fontWeights, textAlign } from 'src/components/globals'

export interface TypographyProps {
  color?: keyof typeof colors
  weight?: keyof typeof fontWeights
  align?: keyof typeof textAlign
  size?: number
  extraColor?: string
  children?: any
  style?: StyleProp<TextStyle>
}

const Typography = ({
  size,
  style,
  children,
  extraColor,
  align = 'left',
  color = 'gray3',
  weight = 'regular',
}: TypographyProps) => {
  const textWeight = fontWeights[weight] as any

  return (
    <Text
      allowFontScaling={false}
      style={Object.assign(
        {},
        {
          flexShrink: 1,
          fontFamily: 'System',
          color: extraColor ? extraColor : colors[color],
          fontWeight: textWeight,
          fontSize: size,
          textAlign: textAlign[align],
          flexWrap: 'wrap'
        },
        style
      )}
      accessibilityLabel="typography"
    >
      {children}
    </Text>
  )
}

export default Typography
