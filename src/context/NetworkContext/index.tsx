import React, {
  useState,
  useEffect,
  createContext,
} from 'react'
import Toast from 'react-native-toast-message'
import NetInfo from '@react-native-community/netinfo'

interface NetworkContextType {
  isConnected: boolean | null
}

export const NetworkContext = createContext<NetworkContextType | undefined>(undefined)

interface NetworkProviderProps {
  children: any
}

export const NetworkProvider: React.FC<NetworkProviderProps> = ({ children }) => {
  const [isConnected, setIsConnected] = useState<boolean | null>(true)

  useEffect(() => {
    // Function to listener when Network status change
    const unsubscribe = NetInfo.addEventListener(state => {
      const currentConnectedStatus = state.isConnected
      if (isConnected && !currentConnectedStatus) {
        Toast.show({
          type: 'error',
          text1: 'Oops! Looks like your device is not connected to the Internet.',
          visibilityTime: 2000
        })
      } else if (!isConnected && currentConnectedStatus) {
        Toast.show({
          type: 'success',
          text1: 'Great! Your Internet is re-connected again.',
          visibilityTime: 2000,
        })
      }

      setIsConnected(currentConnectedStatus)
    })

    return () => unsubscribe()
  }, [isConnected])

  return (
    <NetworkContext.Provider value={{ isConnected }}>
      {children}
    </NetworkContext.Provider>
  )
}
