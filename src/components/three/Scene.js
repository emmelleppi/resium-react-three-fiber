import React from 'react';
import * as THREE from 'three/src/Three'
import { useFrame } from 'react-three-fiber'

import Lathe from "./Lathe"
import Dodecahedron from "./Dodecahedron"

import { useStoreObjs, useStoreCesium } from "../../store"
import { cartToVec } from "../../utils"
import {Math as CesiumMath, Cartesian3} from 'cesium';

function ThreeScene() {
  
    const objArray = useStoreObjs(state => state.objs)
    const cesiumRef = useStoreCesium(state => state.cesium)

    
    useFrame(({ gl, scene, camera: threeCamera }) => {
      if (!cesiumRef) return
  
      const { camera: cesiumCamera } = cesiumRef.cesiumElement
      
      threeCamera.fov = CesiumMath.toDegrees(cesiumCamera.frustum.fovy) // ThreeJS FOV is vertical
      threeCamera.updateProjectionMatrix()
  
      objArray.forEach(obj => {
        const { mesh, minWGS84, maxWGS84 } = obj
  
        // convert lat/long center position to Cartesian3
        const center = cartToVec(Cartesian3.fromDegrees((minWGS84[0] + maxWGS84[0]) / 2, (minWGS84[1] + maxWGS84[1]) / 2));
    
        // get forward direction for orienting model
        const centerHigh = cartToVec(Cartesian3.fromDegrees((minWGS84[0] + maxWGS84[0]) / 2, (minWGS84[1] + maxWGS84[1]) / 2,1));
    
        // use direction from bottom left to top left as up-vector
        const bottomLeft  = cartToVec(Cartesian3.fromDegrees(minWGS84[0], minWGS84[1]));
        const topLeft = cartToVec(Cartesian3.fromDegrees(minWGS84[0], maxWGS84[1]));
        const latDir  = new THREE.Vector3().subVectors(bottomLeft, topLeft).normalize();
    
        // configure entity position and orientation
        mesh.position.set(center.x, center.y, center.z);
        mesh.lookAt(centerHigh);
        mesh.up.copy(latDir);
      })
  
      // Clone Cesium Camera projection position so the
      // Three.js Object will appear to be at the same place as above the Cesium Globe
      threeCamera.matrixAutoUpdate = false;
      const cvm = cesiumCamera.viewMatrix;
      const civm = cesiumCamera.inverseViewMatrix;
      threeCamera.matrixWorld.set(
          civm[0], civm[4], civm[8 ], civm[12],
          civm[1], civm[5], civm[9 ], civm[13],
          civm[2], civm[6], civm[10], civm[14],
          civm[3], civm[7], civm[11], civm[15]
      );
      threeCamera.matrixWorldInverse.set(
          cvm[0], cvm[4], cvm[8 ], cvm[12],
          cvm[1], cvm[5], cvm[9 ], cvm[13],
          cvm[2], cvm[6], cvm[10], cvm[14],
          cvm[3], cvm[7], cvm[11], cvm[15]
      );
  
      const width = window.innerWidth;
      const height = window.innerHeight;
      const aspect = width / height;
      threeCamera.aspect = aspect;
      threeCamera.updateProjectionMatrix();
  
      gl.setSize(width, height);
      gl.render(scene, threeCamera);
    }, false, [objArray, cesiumRef])
  
    return (
      <>
        <ambientLight color="lightblue" />
        <pointLight color="white" intensity={1} position={[10, 10, 10]} />
        <Lathe />
        <Dodecahedron />
      </>
    )
  }
  
  export default ThreeScene