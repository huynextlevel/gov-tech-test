import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { apis } from 'src/services'
import { Room } from 'src/globals/types'
import { getRoomList } from 'src/store/actions/app'

const useGetRoomList = () => {
  const dispatch = useDispatch()
  const [isError, setIsError] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [roomList, setRoomList] = useState<Room[]>([])

  const fetchRoomList = useCallback(async () => {
    try {
      if (!isLoading) setIsLoading(true)
      const { data } = await apis.fetchRoomList()
      setIsLoading(false)
      setRoomList(data)
      dispatch(getRoomList(data))
    } catch(err) {
      setIsError(true)
      setIsLoading(false)
    }
  }, [isLoading])

  useEffect(() => {
    fetchRoomList()
  }, [fetchRoomList])

  return { isError, isLoading, roomList, fetchRoomList }
}

export default useGetRoomList