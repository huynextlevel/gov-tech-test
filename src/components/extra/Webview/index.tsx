import React from 'react'
import { WebView, WebViewProps } from 'react-native-webview'

export interface WebviewProps extends WebViewProps {
  url: string
}

const Webview = ({ url, ...rest }: WebviewProps) => {
  return (
    <WebView
      originWhitelist={['*']}
      source={{ uri: url }}
      javaScriptEnabled
      domStorageEnabled
      startInLoadingState
      {...rest}
    />
  )
}

export default Webview
