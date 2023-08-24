import React, { useState } from 'react'
import { View } from 'react-native'

import { colors } from 'src/styles'
import { IScreen } from 'src/globals/types'

import { Webview } from 'src/components/extra'
import { MainLayout } from 'src/components/layouts'
import { BoxTextButton } from 'src/components/basics/buttons'
import { Typography } from 'src/components/basics/typographies'

const ResultScreen: React.FC<IScreen> = ({ route, navigation }) => {
  const { url } = route.params
  const [isLoadingEnd, setIsLoadingEnd] = useState<boolean>(false)

  const onGoBack = () => {
    navigation.goBack()
  }

  return (
    <MainLayout edges={['bottom']} style={{ backgroundColor: colors.white }}>
      <Webview
        url={url}
        onLoadEnd={() => {
          setIsLoadingEnd(true)
        }}
        overScrollMode="never"
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
      />
      {isLoadingEnd && (
        <View style={{ padding: 16 }}>
          <Typography size={14} align="center" color="gray3" weight="regular" style={{ marginBottom: 97 }}>
            {url}
          </Typography>
          <BoxTextButton
            type="pri"
            size="large"
            label="Back to Home"
            onPress={onGoBack}
          />
        </View>
      )}
    </MainLayout>
  )
}

export default ResultScreen
