import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { apis } from 'src/services'
import { getRoomList } from 'src/store/actions/app'

const useGetRoomList = () => {
  const dispatch = useDispatch()
  const [roomList, setRoomList] = useState<any[]>([])

  const fetchRoomList = async () => {
    try {
      const { data } = await apis.fetchRoomList()
      dispatch(getRoomList(data))
      setRoomList(data)
    } catch(err) {}
  }

  return { roomList, fetchRoomList }
}

export default useGetRoomList