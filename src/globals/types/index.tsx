export type ResultParam = {
  url: string
}

export type RootStackParamList = {
  BookScreen: undefined
  QRCodeScreen: undefined
  ResultScreen: ResultParam
}

export type SortItem = {
  id: string
  label: string
  value: string
}

export interface IScreen {
  route?: any
  navigation?: any
}

export type Room = {
  name: string
  capacity: string
  level: string
  availability: { [key: string]: string }
}

export type CaptureData = {
  uri: string
  name?: string
  // Android only
  id?: string
  path?: string
  height?: number
  width?: number
  // iOS only
  size?: number
}

export interface ApiRequest {
  data?: any
  onSuccess?: (data?: any) => void
  onError?: (data?: any) => void
}
