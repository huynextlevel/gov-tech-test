import axios from 'axios'

import { API_URL } from 'src/utils'

const fetchRoomList = () => {
  return axios.get(`${API_URL}/yuhong90/7ff8d4ebad6f759fcc10cc6abdda85cf/raw/463627e7d2c7ac31070ef409d29ed3439f7406f6/room-availability.json`)
}

const apis = {
  fetchRoomList
}

export default apis
