import {
  GET_ROOM_LIST,
  RESET_APP_STATE
} from 'src/store/actions'

export const getRoomList = (roomList: any[]) => ({
  type: GET_ROOM_LIST as typeof GET_ROOM_LIST,
  roomList
})

export const resetAppState = () => ({
  type: RESET_APP_STATE as typeof RESET_APP_STATE
})
