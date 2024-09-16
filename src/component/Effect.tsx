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
import { Phase, usePhase } from "../context/PhaseContext";
import { useEffect, useRef } from "react";
import { GlitchEffect } from "postprocessing"; // Adjust import based on the correct library

export function Effect() {
  const { phase } = usePhase();
  const glitchRef = useRef<GlitchEffect>(null);

  useEffect(() => {
    let glitch = glitchRef.current;

    if (glitch) {
      if (phase === Phase.RobotAnnoyed) {
        glitch.minStrength = 0.3;
        glitch.maxStrength = 0.7;
        glitch.minDuration = 0.3;
        glitch.maxDuration = 0.7;
        glitch.ratio = 0.53;
      }

      if (phase === Phase.RobotCalming) {
        glitch.minStrength = 0.1;
        glitch.maxStrength = 0.4;
        glitch.minDuration = 0.1;
        glitch.maxDuration = 0.4;
      }

      if (phase === Phase.RobotCalmed) {
        glitch.minStrength = 0.05;
        glitch.maxStrength = 0.08;
        glitch.minDuration = 0.03;
        glitch.maxDuration = 0.07;
      }
    }
  });
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
      <Glitch ref={glitchRef} delay={new Vector2(0.3, 0.3)} />
      <Noise opacity={0.02} />
    </EffectComposer>
  );
}
