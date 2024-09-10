import {
  CameraControls,
  Environment,
  Lightformer,
  MeshReflectorMaterial,
  OrbitControls,
} from "@react-three/drei";
import { BACKGROUND_COLOR } from "../Position";
import { Robot } from "../model/Robot";
import { useLoading } from "../context/LoadingContext";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Mesh } from "three/src/objects/Mesh";

export function Scene() {
  const { isLoading } = useLoading();
  // const meshRef = useRef<Mesh>(null);
  // const { camera } = useThree();
  const cameraControlsRef = useRef<CameraControls>(null);
  useFrame(() => {
    if (cameraControlsRef.current) {
      cameraControlsRef.current.update(0);
    }
  });
  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        if (cameraControlsRef.current) {
          cameraControlsRef.current.setLookAt(-60, 30, 30, 0, 0, 0, true);
        }
      }, 50);
    }
  });
  return (
    <>
      <color attach={"background"} args={[BACKGROUND_COLOR]} />
      <group position={[-0, -1, 0]}>
        <Robot />
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
        <CameraControls
          ref={cameraControlsRef}
          enabled={true}
          dollySpeed={0}
          maxSpeed={0}
          polarRotateSpeed={0}
          azimuthRotateSpeed={0}
        />
      </group>
    </>
  );
}
