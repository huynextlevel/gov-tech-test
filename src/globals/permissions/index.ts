import { Platform } from 'react-native'
import {
  check,
  RESULTS,
  request,
  PERMISSIONS
} from 'react-native-permissions'

// Function handle check/get camera permission
const checkCameraPermission = async () => {
  const permissions = Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA;
  const cameraStatus = await check(permissions);

  if (cameraStatus !== RESULTS.GRANTED) {
    await request(permissions)
  }
}

export { checkCameraPermission }
