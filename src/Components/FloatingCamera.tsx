import { PointerLockControls, OrbitControls } from "@react-three/drei"
import { useThree } from "@react-three/fiber"

export function FloatingCamera() {
  const { camera, gl } = useThree()

  return <PointerLockControls camera={camera} domElement={gl.domElement} />
}
