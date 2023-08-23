import {
  GET_ROOM_LIST,
  RESET_APP_STATE
} from 'src/store/actions'

import { AppState, AppActions } from 'src/store/types/app'

const initialState: AppState = {
  roomList: []
}

const reducer = (state = initialState, action: AppActions) => {
  switch (action.type) {
    case GET_ROOM_LIST:
      return Object.assign({}, state, {
        profile: {
          ...state.roomList,
          ...action
        }
      })
    case RESET_APP_STATE:
      return initialState
    default:
      return state
  }
}

export default reducer