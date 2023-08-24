import React, { useMemo } from 'react'
import { StyleSheet, ViewStyle } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export type Edges = 'top' | 'left' | 'right' | 'bottom'

interface ILayoutProps {
  style?: ViewStyle
  children: any
  edges?: Edges[] | undefined
}

const Main = ({
  style,
  edges,
  children
}: ILayoutProps) => {
  const edgesUpdate: Edges[] = useMemo(() => edges ? ['right', 'left', ...edges] : ['right', 'left'], [edges])
  
  return (
    <SafeAreaView style={[styles.container, style]} edges={edgesUpdate}>
      {children}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default Main
