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

export let IS_SOUND_ON: boolean = true;

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

export function updateCameraLocation(cameraLocation: CameraLocation) {
  CURRENT_CAMERA_LOCATION = cameraLocation
}

export function toggleSound() {
  if (IS_SOUND_ON) {
    IS_SOUND_ON = false;
  } else {
    IS_SOUND_ON = true
  }
}

export default App;
