import React, { useRef, useEffect } from 'react';
import { useStoreObjs, useBoundingBox } from "../../store"

function DodecahedronGeometry() {
    const { minWGS84, maxWGS84 } = useBoundingBox(state => state)
    const { add, remove } = useStoreObjs(state => state)

    const group = useRef()

    useEffect(() => {
      if (group.current) {
        add({
          mesh: group.current,
          minWGS84,
          maxWGS84,
        })
    
        return () => remove({ mesh: group.current })
      }
    }, [add, remove, minWGS84, maxWGS84])
    
    return (
      <group ref={group} >
        <mesh
          position={[0, 0, 15000]}
          scale={[5000,5000,5000]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <dodecahedronGeometry attach="geometry" />
          <meshLambertMaterial attach="material" />
        </mesh>
      </group>
    )
  }

  export default DodecahedronGeometry