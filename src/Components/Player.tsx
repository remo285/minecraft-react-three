import { useThree, useFrame } from "@react-three/fiber"
import { useSphere } from "@react-three/cannon"
import { useKeyboard } from "../hooks/useKeyboard"
import { Ref, useRef, useEffect } from "react"
import { Mesh, BufferGeometry, Vector3 } from "three"

const CHAR_SPEED = 5
const CHAR_JUMP_FORCE = 3

export const Player = () => {
  const { forward, backwards, left, right, jump } = useKeyboard()

  const { camera } = useThree()
  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: "Dynamic",
    position: [0, 0.5, 0]
  }))

  const pos = useRef([0, 0, 0])
  useEffect(() => {
    api.position.subscribe((p) => {
      pos.current = p
    })
  }, [api.position])

  const vel = useRef([0, 0, 0])
  useEffect(() => {
    api.velocity.subscribe((v) => {
      vel.current = v
      console.log(vel.current)
    })
  }, [api.velocity])

  useFrame(() => {
    camera.position.copy(
      new Vector3(pos.current[0], pos.current[1], pos.current[2])
    )

    const direction = new Vector3()

    const frontVector = new Vector3(0, 0, Number(backwards) - Number(forward))

    const sideVector = new Vector3(Number(left) - Number(right), 0, 0)

    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .applyEuler(camera.rotation)
      .multiplyScalar(CHAR_SPEED)

    api.velocity.set(direction.x, vel.current[1], direction.z)

    if (jump && Math.abs(vel.current[1]) < 0.05) {
      api.velocity.set(vel.current[0], CHAR_JUMP_FORCE, vel.current[2])
    }
  })

  return <mesh ref={ref as Ref<Mesh<BufferGeometry>>} />
}
