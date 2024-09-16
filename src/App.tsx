//////////
// CSS //
////////
import "normalize.css";
import "./App.css";

////////////
// THREE //
//////////
import { Canvas, Dpr } from "@react-three/fiber";
import { Color, Euler, Vector3 } from "three";

////////////
// REACT //
//////////
import { Suspense, useEffect } from "react";

////////////
// Model //
//////////
import { Scene } from "./component/Scene";
import { Effect } from "./component/Effect";
import { CameraControls } from "@react-three/drei";
import { PhaseProvider, usePhase } from "./context/PhaseContext";
import { LoadingScreen } from "./component/LoadingScreen";
import { Overlay } from "./component/Overlay";
import { BackgroundSound } from "./component/BackgroundSound";
import { SoundContext, ToggleableSound } from "./context/SoundContext";

/////////////
// CUSTOM //
///////////

// do code here...

///////////////
// SETTINGS //
/////////////
const WEBGL_DPR = [1, 1.15] as Dpr;
const WEBGL_POS = new Vector3(0, 0, 0);
const WEBGL_BG = new Color(0x0a0a0a);
const WEBGL_FOV = 90;

export const ROBOT_POS = new Vector3(0, 3.4, 0.5);
export const ROBOT_AZIMUTH = 5.4;
export const ROBOT_POLAR = 1;
export const ROBOT_ROT = new Euler(0, 0, 0);

export const CAMERA_AZIMUTH = 5.4;
export const CAMERA_POLAR = 1;

export const CAMERA_AZIMUTH_SPEED = 0;
export const CAMERA_POLAR_SPEED = 0;
export const CAMERA_DOLLY_SPEED = 0;
export const CAMERA_TRUCK_SPEED = 0;

///////////
// CORE //
/////////
function App() {
  return (
    <PhaseProvider>
      <Canvas
        gl={{ antialias: false }}
        dpr={WEBGL_DPR}
        camera={{ position: WEBGL_POS, fov: WEBGL_FOV }}
      >
        <Suspense fallback={null}>
          <color
            attach={"background"}
            args={[WEBGL_BG.r, WEBGL_BG.g, WEBGL_BG.b]}
          />
          <Scene />
          <Effect />
        </Suspense>
      </Canvas>
      <ToggleableSound>
        <LoadingScreen />
        <BackgroundSound />
        <Overlay />
      </ToggleableSound>
    </PhaseProvider>
  );
}

export default App;

/*
import {
  EffectComposer,
  DepthOfField,
  Bloom,
  Noise,
  Vignette,
} from "@react-three/postprocessing";

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
*/

/*
<>
      <LoadingProvider>
        <Canvas
          gl={{ antialias: false }}
          dpr={IN_DPR}
          camera={{ position: IN_POSITION, fov: IN_FOV }}
        >
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
          <Effect />
        </Canvas>
        <ToggleableSound>
          <BackgroundSound />
          <LoadingScreen />
          <Overlay/>
        </ToggleableSound>
      </LoadingProvider>
    </>
*/
