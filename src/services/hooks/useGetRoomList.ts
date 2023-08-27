import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { apis } from 'src/services'
import { getRoomList } from 'src/store/actions/app'

import { ErrorMessageModal } from 'src/systems'

const useGetRoomList = () => {
  const dispatch = useDispatch()
  const [isError, setIsError] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const fetchRoomList = useCallback(async () => {
    try {
      if (!isLoading) setIsLoading(true)
      const { data } = await apis.fetchRoomList()
      setIsLoading(false)
      dispatch(getRoomList(data))
    } catch(err) {
      setIsError(true)
      setIsLoading(false)
      showErrorModal()
    }
  }, [isLoading])

  const showErrorModal = useCallback(() => {
    if (!isError) {
      ErrorMessageModal.show({
        title: 'Service Error',
        desc: 'Oops! Looks like the service have problem.',
        isShowRefreshButton: true,
        onPress: fetchRoomList
      })
    }
  }, [isError])

  useEffect(() => {
    fetchRoomList()
  }, [])

  return { isError, isLoading, fetchRoomList }
}

export default useGetRoomList