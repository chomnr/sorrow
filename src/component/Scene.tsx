/*
import {
  CameraControls,
  Environment,
  Lightformer,
  MeshReflectorMaterial,
  OrbitControls,
} from "@react-three/drei";
import { BACKGROUND_COLOR } from "../Position";
import { useLoading } from "../context/LoadingContext";
import { extend } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Tablet } from "../model/Tablet";
import { Group } from "three";
*/

import {
  CameraControls,
  Environment,
  Lightformer,
  MeshReflectorMaterial,
} from "@react-three/drei";
import { Robot } from "../model/Robot";
import {
  CAMERA_AZIMUTH,
  CAMERA_AZIMUTH_SPEED,
  CAMERA_DOLLY_SPEED,
  CAMERA_POLAR,
  CAMERA_POLAR_SPEED,
  CAMERA_TRUCK_SPEED,
  ROBOT_AZIMUTH,
  ROBOT_POLAR,
  ROBOT_POS,
  ROBOT_ROT,
} from "../App";
import { Phase, usePhase } from "../context/PhaseContext";
import { useEffect, useRef } from "react";
import { useSound } from "../context/SoundContext";

export function Scene() {
  const { phase } = usePhase();
  const cameraRef = useRef<CameraControls | null>(null);

  useEffect(() => {
    if (phase === Phase.Begun) {
      const camera = cameraRef.current;
      if (camera) {
        camera.setPosition(ROBOT_POS.x, ROBOT_POS.y, ROBOT_POS.z, true)
        camera.rotate(ROBOT_AZIMUTH, ROBOT_POLAR, false)
        camera.update(0)
      }
    }
  });
  return (
    <>
      <group position={[0, -1, 0]} rotation={ROBOT_ROT}>
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
      </group>
      <CameraControls
        ref={cameraRef}
        azimuthAngle={CAMERA_AZIMUTH}
        polarAngle={CAMERA_POLAR}
        azimuthRotateSpeed={CAMERA_AZIMUTH_SPEED}
        polarRotateSpeed={CAMERA_POLAR_SPEED}
        dollySpeed={CAMERA_DOLLY_SPEED}
        truckSpeed={CAMERA_TRUCK_SPEED}
      />
    </>
  );
}

/*
export function Scene() {
  return (
    <>
      <color attach={"background"} args={[BACKGROUND_COLOR]} />
      <group position={[-0, -1, 0]}>
        <Robot />
      </group>
    </>  
  );
}

*/

/*

 const { isLoading } = useLoading();
  const cameraControlsRef = useRef<CameraControls>(null);
  const tabletRef = useRef<Group>(null);

  useEffect(() => {
    if (!isLoading) {
      if (cameraControlsRef.current) {
        new Audio("/sound/wooshes/sfx_whoosh_4.wav").play();
        cameraControlsRef.current.setPosition(-60, 30, 30, true);
        cameraControlsRef.current?.update(0)
      }
    }
  }, [isLoading]);

  const lookAtTablet = () => {
    if (cameraControlsRef.current) {
      new Audio("/sound/wooshes/sfx_whoosh_4.wav").play();
      cameraControlsRef.current.setPosition(0, 10, 0, true);
      cameraControlsRef.current.truck(0.3, 1, true);
    }
  };

  return (
    <>
      <color attach={"background"} args={[BACKGROUND_COLOR]} />
      <group position={[-0, -1, 0]}>
        <Robot />
        <Tablet
          ref={tabletRef}
          onClick={lookAtTablet}
          position={[-0.65, 0, 1.23]}
          scale={0.18}
          rotation={[-Math.PI / 2, 0, -0.5]}
        />
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
          polarRotateSpeed={0}
          azimuthRotateSpeed={0}
          dollySpeed={0}
        />
      </group>
    </>
 */
