import React from 'react';
import Cesium from "cesium"
import { PolygonGraphics, Entity } from "resium";

import { useBoundingBox } from "../../store" 

function Polygon() {
    const { minWGS84, maxWGS84 } = useBoundingBox(state => state)

    const hierarchy = Cesium.Cartesian3.fromDegreesArray([
      minWGS84[0], minWGS84[1],
      maxWGS84[0], minWGS84[1],
      maxWGS84[0], maxWGS84[1],
      minWGS84[0], maxWGS84[1],
    ])
    const material = Cesium.Color.RED.withAlpha(0.2)
  
    return (
      <Entity>
        <PolygonGraphics
          hierarchy={hierarchy}
          material={material}
        />
      </Entity>
    )
  }

export default Polygon