import { useEffect, useState } from "react"

interface KeyMap {
  [key: string]: string
}

const ACTIONS_KEY_MAP: KeyMap = {
  KeyW: "forward",
  KeyS: "backwards",
  KeyA: "left",
  KeyD: "right",
  Space: "jump"
}

export function useKeyboard() {
  const [actions, setActions] = useState({
    forward: false,
    backwards: false,
    left: false,
    right: false,
    jump: false
  })

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { code } = event
      const action = ACTIONS_KEY_MAP[code]
      if (action) {
        setActions((prevActions) => ({
          ...prevActions,
          [action]: true
        }))
      }
    }

    const handleKeyUp = (event: KeyboardEvent) => {
      const { code } = event
      const action = ACTIONS_KEY_MAP[code]
      if (action) {
        setActions((prevActions) => ({
          ...prevActions,
          [action]: false
        }))
      }
    }

    document.addEventListener("keyup", handleKeyUp)
    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("keyup", handleKeyUp)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  return actions
}
