import "normalize.css";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import { IN_DPR, IN_POSITION, IN_FOV, IN_ROTATION } from "./Position";
import { Scene } from "./component/Scene";
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
import { BackgroundSound } from "./component/BackgroundSound";
import { ToggleableSound } from "./context/SoundContext";

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
        <ToggleableSound>
          <BackgroundSound />
          <LoadingScreen />
        </ToggleableSound>
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

export default App;
