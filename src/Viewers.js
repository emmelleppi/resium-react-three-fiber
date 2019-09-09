import React, { useRef, useEffect } from 'react';
import { Viewer } from "resium";
import { Canvas } from 'react-three-fiber'

import ThreeScene from "./components/three/Scene"
import CesiumScene from "./components/cesium/Scene"

import { removeCesiumMenu } from "./utils"
import { useStoreCesium } from "./store"

function CesiumContainer() {
  const add = useStoreCesium(state => state.add)
  const remove = useStoreCesium(state => state.remove)

  const cesium = useRef()

  useEffect(() => {
    if (cesium.current) {
      removeCesiumMenu()
      add(cesium.current)
  
      return () => remove()
    }
  }, [add, remove])
    
  return (
    <Viewer full ref={cesium}  >
      <CesiumScene />
    </Viewer>
  )
}

function ThreeContainer() {
  const cameraProps = {
    fov: 45,
    width: window.innerWidth,
    height: window.innerHeight,
    aspect: window.innerWidth / window.innerHeight,
    near: 1,
    far: 10*1000*1000, // needs to be far to support Cesium's world-scale rendering
  }

  return (
      <Canvas
        gl={{ alpha: true }}
        camera={{...cameraProps}}
      >
        <ThreeScene />
      </Canvas>
  )
}

function Viewers() {  
    return (
      <>
        <CesiumContainer />
        <ThreeContainer />
      </>
    )
}

export default Viewers;
