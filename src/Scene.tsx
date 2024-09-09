import { useFrame, useThree } from "@react-three/fiber";
import { Mesh } from "three";
import { Robot } from "./model/Robot";
import {
  CameraControls,
  Environment,
  Lightformer,
  MeshReflectorMaterial,
  OrbitControls,
} from "@react-three/drei";
import { Composer } from "./Composer";
import { useEffect, useRef } from "react";
import { BACKGROUND } from "./App";

export function Scene() {
  // camera
  // const meshRef = useRef<Mesh>(null);
  const cameraControlsRef = useRef<CameraControls>(null);
  // const { camera } = useThree();
  useFrame(() => {
    if (cameraControlsRef.current) {
      cameraControlsRef.current.update(0);
    }
  });
  // effect
  useEffect(() => {
    // camera
    const cameraMoveListener = (e: CustomEvent) => {
      const { x, y, z } = e.detail;
      cameraControlsRef.current?.setLookAt(x, y, z, 0, 0, 0, true);
    };
    document.addEventListener("virtual_move_camera_event", cameraMoveListener as EventListener);
    return () => {
      document.removeEventListener("virtual_move_camera_event", cameraMoveListener as EventListener);
    };
  }, []);
  return (
    <>
      <color attach={BACKGROUND[0]} args={[BACKGROUND[1]]} />
      <group position={[-0, -1, 0]}>
        <Robot />
        {/*<Desk/> <Desk position={[0, 0, 3]} /> */}
        {/* Plane reflections + distance blur */}
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
          {/* Ceiling Lights */}
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
          {/* Sides */}
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
        <Composer />
        <OrbitControls
          enableDamping={false}
          enableZoom={false}
          enableRotate={false}
        />
        {/* Camera Controls */}
        <CameraControls
          ref={cameraControlsRef}
          minDistance={0}
          enabled={true}
        />
      </group>
    </>
  );
}