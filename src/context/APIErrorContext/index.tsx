import React, {
  createContext, 
  useRef,
  useState,
  useEffect,
  ElementRef,
  useCallback
} from 'react'

import { ErrorMessageModal } from 'src/systems'

// Define the shape of your context
export interface APIErrorContextType {
  setError: React.Dispatch<ErrorState>
}

// Create the context with a default value of undefined
const APIErrorContext = createContext<APIErrorContextType | undefined>(undefined)

interface APIErrorProviderProps {
  children: any
  onPress?: () => void
}

type ErrorState = {
  error: string | null
  retryApiCall?: () => void
}

const APIErrorProvider = ({ children }: APIErrorProviderProps) => {
  const errorMessageModalRef = useRef<ElementRef<typeof ErrorMessageModal>>(null)
  const [error, setError] = useState<ErrorState>({
    error: null,
    retryApiCall: undefined
  })

  const onRetryApi = useCallback(() => {
    if (error.retryApiCall) {
      error.retryApiCall()
    }
  }, [error])

  const show = useCallback(() => {
    errorMessageModalRef.current?.show()
  }, [errorMessageModalRef])

  const close = useCallback(() => {
    errorMessageModalRef.current?.close()
  }, [errorMessageModalRef])

  useEffect(() => {
    if (error.error) {
      show()
    } else {
      close()
    }
  }, [error, show, close])

  return (
    <APIErrorContext.Provider value={{ setError }}>
      <ErrorMessageModal
        ref={errorMessageModalRef}
        title="Service Error"
        desc="Oops! Looks like the service have problem."
        onPress={onRetryApi}
      />
      {children}
    </APIErrorContext.Provider>
  )
}

export { APIErrorContext, APIErrorProvider }
