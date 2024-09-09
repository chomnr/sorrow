import {
  CameraLocation,
  CURRENT_CAMERA_LOCATION,
  INITIAL_POSITION,
  MONITOR_POSITION,
  updateCameraLocation,
} from "./App";

/**
 * Dispatches a custom event named "virtual_move_camera_event" with the specified CameraLocation.
 *
 * @param {number} cameraLocation - The location where you want the camera to be.
 */
export function VirtualMoveCamera(cameraLocation: CameraLocation) {
  if (cameraLocation === CURRENT_CAMERA_LOCATION) {
    return;
  } else {
    let [x, y, z] = [0, 0, 0];
    if (cameraLocation === CameraLocation.INITIAL) {
      x = INITIAL_POSITION[0];
      y = INITIAL_POSITION[1];
      z = INITIAL_POSITION[2];
      updateCameraLocation(CameraLocation.INITIAL)
    }
    if (cameraLocation === CameraLocation.MONITOR) {
      x = MONITOR_POSITION[0];
      y = MONITOR_POSITION[1];
      z = MONITOR_POSITION[2];
      updateCameraLocation(CameraLocation.MONITOR)
    }
    document.dispatchEvent(
      new CustomEvent("virtual_move_camera_event", {
        detail: { x, y, z },
      })
    );
  }
}