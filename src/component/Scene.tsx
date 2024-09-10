import {
  Environment,
  Lightformer,
  MeshReflectorMaterial,
  OrbitControls,
} from "@react-three/drei";
import { BACKGROUND_COLOR } from "../Position";
import { Robot } from "../model/Robot";
import { EffectComposer, DepthOfField, Bloom, Noise, Vignette } from "@react-three/postprocessing";
import { useLoading } from "../context/LoadingContext";

export function Scene() {
  const { setLoading } = useLoading();

  return (
    <>
      <color attach={"background"} args={[BACKGROUND_COLOR]} />
      <group position={[-0, -1, 0]}>
        <Robot/>
        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[50, 50]} />
          <MeshReflectorMaterial
            blur={[300, 30]}
            resolution={2048}
            mixBlur={1}
            mixStrength={180}
            roughness={1}
            depthScale={1.2}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            color="#202020"
            metalness={0.8}
            mirror={0}
          />
        </mesh>
        <Environment resolution={512}>
          <Lightformer
            intensity={2}
            rotation-x={Math.PI / 2}
            position={[0, 4, -9]}
            scale={[10, 1, 1]}
          />
          <Lightformer
            intensity={2}
            rotation-x={Math.PI / 2}
            position={[0, 4, 0]}
            scale={[10, 1, 1]}
          />
          <Lightformer
            intensity={2}
            rotation-y={Math.PI / 2}
            position={[-50, 2, 0]}
            scale={[100, 2, 1]}
          />
          <Lightformer
            intensity={2}
            rotation-y={-Math.PI / 2}
            position={[50, 2, 0]}
            scale={[100, 2, 1]}
          />
        </Environment>
        <OrbitControls
          enableDamping={false}
          enableZoom={false}
          enableRotate={false}
        />
        {/*
        <CameraControls
          ref={cameraControlsRef}
          minDistance={0}
          enabled={true}
        /> */}
      </group>
    </>
  );
}