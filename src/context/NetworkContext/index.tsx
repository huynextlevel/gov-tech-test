import React, {
  useRef,
  useState,
  useEffect,
  ElementRef,
  useCallback,
  createContext,
} from 'react'
import NetInfo from '@react-native-community/netinfo'

import { NetworkModal } from 'src/systems'

interface NetworkContextType {
  isConnected: boolean | null
}

export const NetworkContext = createContext<NetworkContextType | undefined>(undefined)

interface NetworkProviderProps {
  children: any
}

export const NetworkProvider: React.FC<NetworkProviderProps> = ({ children }) => {
  const modalRef = useRef<ElementRef<typeof NetworkModal>>(null)
  const [isConnected, setIsConnected] = useState<boolean | null>(true)

  const show = useCallback(() => {
    modalRef.current?.show()
  }, [modalRef])

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      const currentConnectedStatus = state.isConnected
      if (isConnected && !currentConnectedStatus) {
        show()
      }

      setIsConnected(currentConnectedStatus)
    })

    return () => unsubscribe()
  }, [show, isConnected])

  return (
    <NetworkContext.Provider value={{ isConnected }}>
      <NetworkModal ref={modalRef} isConnected={isConnected}/>
      {children}
    </NetworkContext.Provider>
  )
}
