import React, { useRef, useState, useMemo, useEffect } from 'react';
import * as THREE from 'three/src/Three'

import { useStoreObjs, useBoundingBox } from "../../store"

function Lathe() {
    const { minWGS84, maxWGS84 } = useBoundingBox(state => state)
    const { add, remove } = useStoreObjs(state => state)

    const group = useRef()
    const [hovered, setHover] = useState(false)
    
    const points = useMemo(() => {
      const segments = 10;
      const points = [];
      for ( var i = 0; i < segments; i ++ ) {
          points.push( new THREE.Vector2( Math.sin( i * 0.2 ) * segments + 5, ( i - 5 ) * 2 ) );
      }
      return points
    }, [])
  
    const color = hovered ? "red" : "green"
    
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
          onPointerOver={e => setHover(true)}
          onPointerOut={e => setHover(false)} 
          position={[0, 0, 15000]}
          scale={[1500,1500,1500]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <latheGeometry args={[points]} attach="geometry" />
          <meshLambertMaterial side={ THREE.DoubleSide } attach="material" color={color} />
        </mesh>
      </group>
    )
  }

  export default Lathe