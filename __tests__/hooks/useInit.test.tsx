import React from 'react'
import { render, act } from '@testing-library/react-native'

import { useInit } from 'src/hooks'
import { checkCameraPermission } from 'src/globals/permissions'

// Mock the checkCameraPermission function
jest.mock('src/globals/permissions', () => ({
  checkCameraPermission: jest.fn()
}))

describe('useInit', () => {
  let result: any

  function TestComponent() {
    result = useInit()
    return null
  }

  beforeAll(() => {
    jest.clearAllMocks()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should call checkCameraPermission when init is called', async () => {
    render(<TestComponent />)

    await act(async () => {
      result.init()
    })

    expect(checkCameraPermission).toBeCalled()
    expect(checkCameraPermission).toBeCalledTimes(1)
  })
})
