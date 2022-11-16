import { usePlane } from "@react-three/cannon"
import { Mesh, BufferGeometry } from "three"

import { textureMap } from "../assets/images/textures"

export function Ground() {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -0.5, 0]
  }))

  textureMap[0].repeat.set(100, 100)

  return (
    <mesh ref={ref as React.RefObject<Mesh<BufferGeometry>>}>
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <meshStandardMaterial attach="material" map={textureMap[0]} />
    </mesh>
  )
}
