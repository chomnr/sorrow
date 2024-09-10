import "normalize.css";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import { IN_DPR, IN_POSITION, IN_FOV, IN_ROTATION } from "./Position";
import { Scene } from "./component/Scene";
import { Loader } from "@react-three/drei";
import { Suspense } from "react";
import {
  EffectComposer,
  DepthOfField,
  Bloom,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { LoadingScreen } from "./component/LoadingScreen";
import { LoadingProvider } from "./context/LoadingContext";

function App() {
  return (
    <>
      <LoadingProvider>
        <Canvas
          gl={{ antialias: false }}
          dpr={IN_DPR}
          camera={{ position: IN_POSITION, fov: IN_FOV, rotation: IN_ROTATION }}
        >
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
          <Effect />
        </Canvas>
        <LoadingScreen />
      </LoadingProvider>
    </>
  );
}

export function Effect() {
  return (
    <EffectComposer>
      <DepthOfField
        focusDistance={0}
        focalLength={0.02}
        bokehScale={2}
        height={480}
      />
      <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
      <Noise opacity={0.02} />
      <Vignette eskil={false} offset={0.1} darkness={1.1} />
    </EffectComposer>
  );
}

/*
export enum CameraLocation {
  INITIAL,
  MONITOR
}

export enum AppState {
  LOADING,
  LOADED
}


export const BACKGROUND = ["background", "#0A0A0A"];
export const DPR = [1, 1.5] as Dpr;

export const INITIAL_POSITION = [-60, 30, 30];
export const INITIAL_FOV = 5;
export const INITIAL_ROTATION = [0, 0, 0];

export const MONITOR_POSITION = [0.225, 1, 18];
export const MONITOR_FOV = 5;
export const MONITOR_ROTATION = [0, 0, 0];

export let CURRENT_CAMERA_LOCATION: CameraLocation = CameraLocation.INITIAL

export let CURRENT_APP_STATE: AppState = AppState.LOADING;

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

export function updateAppState(appState: AppState) {
  CURRENT_APP_STATE = appState
}
*/

/**
 * Background Sound
 */

export default App;
