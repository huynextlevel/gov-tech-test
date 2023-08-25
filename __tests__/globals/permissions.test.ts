// @ts-ignore
import { check, request, RESULTS, PERMISSIONS } from 'react-native-permissions/mock'
import { checkCameraPermission } from 'src/globals/permissions'

jest.mock('react-native', () => ({
  Platform: {
    OS: 'ios'
  }
}))

jest.mock('react-native-permissions', () => ({
  check: jest.fn(),
  request: jest.fn(),
  RESULTS: {
    GRANTED: 'granted'
  },
  PERMISSIONS: {
    IOS: {
      CAMERA: 'ios_camera'
    },
    ANDROID: {
      CAMERA: 'android_camera'
    }
  }
}))

describe('checkCameraPermission', () => {
  beforeAll(() => {
    jest.clearAllMocks()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should check camera permission for iOS', async () => {
    await checkCameraPermission()

    expect(check).toHaveBeenCalledWith(PERMISSIONS.IOS.CAMERA)
  })

  it('should request permission if not granted', async () => {
    check.mockResolvedValueOnce(RESULTS.DENIED)

    await checkCameraPermission()

    expect(request).toHaveBeenCalledWith(PERMISSIONS.IOS.CAMERA)
  })

  it('should not request permission if already granted', async () => {
    check.mockResolvedValueOnce(RESULTS.GRANTED)

    await checkCameraPermission()

    expect(request).not.toHaveBeenCalled()
  })
})
