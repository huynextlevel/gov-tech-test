import { getRoomList, resetAppState } from 'src/store/actions/app'

export interface AppState {
  roomList: any[]
}

export type AppActions =
  | ReturnType<typeof getRoomList>
  | ReturnType<typeof resetAppState>