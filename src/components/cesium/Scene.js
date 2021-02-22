import React from 'react';
import { CameraFlyTo } from "resium";

import Polygon from "./Polygon"
import { useBoundingBox } from "../../store"
import {Cartesian3, Math as CesiumMath} from 'cesium';

function CesiumContainer() {
    const { minWGS84, maxWGS84 } = useBoundingBox(state => state)

    const center = Cartesian3.fromDegrees(
      (minWGS84[0] + maxWGS84[0]) / 2,
      ((minWGS84[1] + maxWGS84[1]) / 2)-1,
      200000
    );
    const duration = 5
    const orientation = {
      heading : CesiumMath.toRadians(0),
      pitch : CesiumMath.toRadians(-60),
      roll : CesiumMath.toRadians(0)
    }
      
    return (
        <>
            <CameraFlyTo
                duration={duration}
                destination={center}
                orientation={orientation}
            />
            <Polygon />
        </>
    )
  }

  export default CesiumContainer