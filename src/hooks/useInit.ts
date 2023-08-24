import { checkCameraPermission } from "src/globals/permissions"

const useInit = () => {
  const init = async () => {
    await checkCameraPermission()
  }

  return { init }
}

export default useInit
