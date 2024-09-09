import "normalize.css";
import "./App.css";
import { Canvas, Dpr } from "@react-three/fiber";
import { Euler, Vector3 } from "three";
import { Scene } from "./Scene";
import { Overlay } from "./Overlay";
import { ToggleableSound } from "./Context";

export enum CameraLocation {
  INITIAL,
  MONITOR
}

export const BACKGROUND = ["background", "#101010"];
export const DPR = [1, 1.5] as Dpr;

export const INITIAL_POSITION = [-60, 30, 30];
export const INITIAL_FOV = 5;
export const INITIAL_ROTATION = [0, 0, 0];

export const MONITOR_POSITION = [0, 0, 0];
export const MONITOR_FOV = 5;
export const MONITOR_ROTATION = [0, 0, 0];

export let CURRENT_CAMERA_LOCATION: CameraLocation = CameraLocation.INITIAL

function App() {
  return (
    <>
      <Canvas
        gl={{ antialias: false }}
        dpr={DPR}
        camera={{
          position: new Vector3(INITIAL_POSITION[0], INITIAL_POSITION[1], INITIAL_POSITION[2]),
          fov: INITIAL_FOV,
          rotation: new Euler(INITIAL_ROTATION[0], INITIAL_ROTATION[1], INITIAL_ROTATION[2]),
        }}
      >
      <Scene/>
      </Canvas>
      <ToggleableSound>
        <Overlay/>
      </ToggleableSound>
    </>
  );
}

/**
 * Updates CURRENT_CAMERA_LOCATION.
 *
 * @param {number} cameraLocation - The location where you want the camera to be.
 */
export function updateCameraLocation(cameraLocation: CameraLocation) {
  CURRENT_CAMERA_LOCATION = cameraLocation
}

export default App;
