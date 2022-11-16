import { NearestFilter, RepeatWrapping, TextureLoader } from "three"

import { grassImg, dirtImg, glassImg, logImg, woodImg } from "./images"

const textures = [grassImg, dirtImg, glassImg, logImg, woodImg]

const textureMap = textures.map((texture) => {
  const loadedTexture = new TextureLoader().load(texture)
  loadedTexture.wrapS = RepeatWrapping
  loadedTexture.wrapT = RepeatWrapping
  loadedTexture.magFilter = NearestFilter
  return loadedTexture
})

export { textureMap }
