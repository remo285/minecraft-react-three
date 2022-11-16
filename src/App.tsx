import { Canvas } from "@react-three/fiber"
import { Physics } from "@react-three/cannon"
import { Sky } from "@react-three/drei"

import { Ground, FloatingCamera, Player } from "./Components"

import "./App.css"

function App() {
  return (
    <Canvas>
      <Sky sunPosition={[100, 100, 20]} />
      <ambientLight />
      <FloatingCamera />
      <Physics>
        <Ground />
        <Player />
      </Physics>
    </Canvas>
  )
}

export default App
