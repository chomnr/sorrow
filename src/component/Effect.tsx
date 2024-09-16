import {
  EffectComposer,
  DepthOfField,
  Bloom,
  Noise,
  Vignette,
  ChromaticAberration,
  Glitch,
  Sepia,
} from "@react-three/postprocessing";
import { Vector2 } from "three";

export function Effect() {
  return (
    <EffectComposer>
      <DepthOfField
        focusDistance={0.5}
        focalLength={0.05}
        bokehScale={1.5}
        height={480}
      />
      <Bloom luminanceThreshold={0.3} luminanceSmoothing={0.8} height={300} />
      <Sepia intensity={0.6} />
      <Noise opacity={0.03} />
      <Vignette eskil={false} offset={0.2} darkness={1.5} />
      <ChromaticAberration
        offset={new Vector2(0.002, 0.002)}
        radialModulation={false}
        modulationOffset={0}
      />
      <Glitch
        delay={new Vector2(0.3, 0.3)}
      />
      <Noise opacity={0.02} />
    </EffectComposer>
  );
}
