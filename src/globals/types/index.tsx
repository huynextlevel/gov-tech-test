export type RootStackParamList = {
  BookScreen: undefined
  QRCodeScreen: undefined
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