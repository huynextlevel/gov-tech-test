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
  highlightWeight?: keyof typeof fontWeights
  highlightTextDecoLine?:
    | 'none'
    | 'underline'
    | 'line-through'
    | 'underline line-through'
  highlightSize?: number
  numberOfLines?: number
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip'
}

const Typography = ({
  size,
  style,
  children,
  extraColor,
  highlightSize,
  align = 'left',
  highlightWeight,
  color = 'gray3',
  weight = 'regular',
  highlightTextDecoLine
}: TypographyProps) => {
  let renderText
  const textWeight = fontWeights[weight] as any
  const highlightTextWeight = highlightWeight
    ? fontWeights[highlightWeight]
    : fontWeights[weight] as any
  
  if (Array.isArray(children)) {
    renderText = children.map((item, index) => {
      if (item && typeof item === 'string' && item.includes('/')) {
        const colorText = item.split('/')
        const fontColor = colors[colorText[0] as keyof typeof colors]

        return (
          <Text
            allowFontScaling={false}
            key={index}
            style={{
              flexShrink: 1,
              fontFamily: 'System',
              textDecorationLine: highlightTextDecoLine
                ? highlightTextDecoLine
                : 'none',
              fontSize: highlightSize ? highlightSize : size,
              fontWeight: highlightTextWeight
                ? highlightTextWeight
                : textWeight,
              color: fontColor ? fontColor : colors[color],
              textAlign: textAlign[align] as any
            }}
          >
            {colorText[1]}
          </Text>
        )
      } else {
        return item
      }
    })
  } else {
    renderText = children
  }

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
    >
      {renderText}
    </Text>
  )
}

export default Typography
