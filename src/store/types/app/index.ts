import { Room } from 'src/globals/types'
import { getRoomList, resetAppState } from 'src/store/actions/app'

export interface AppState {
  roomList: Room[]
}

export type AppActions =
  | ReturnType<typeof getRoomList>
  | ReturnType<typeof resetAppState>