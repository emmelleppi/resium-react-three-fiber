import * as THREE from 'three/src/Three'

export function cartToVec(cart) {
    return new THREE.Vector3(cart.x, cart.y, cart.z);
}

export function removeCesiumMenu() {
    const nodeList = document.querySelectorAll('.cesium-viewer > div:not(.cesium-viewer-cesiumWidgetContainer)')
    const nodeArray = Array.from(nodeList);
    nodeArray.forEach(el => el.remove())
  }