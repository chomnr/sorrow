/**
 * IMPORTS
 **/
import "normalize.css";
import "./App.css";
import { Canvas, Dpr, useThree } from "@react-three/fiber";
import { Euler, Mesh, Vector3 } from "three";
import { Robot } from "./model/Robot";
import {
  CameraControls,
  Environment,
  Lightformer,
  MeshReflectorMaterial,
  OrbitControls,
} from "@react-three/drei";
import {
  Bloom,
  DepthOfField,
  EffectComposer,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { Desk } from "./model/Desk";
import { useRef } from "react";

/**
 * VARIABLES
 **/
const WEBGL_BACKGROUND = ["background", "#101010"];
const WEBGL_DPR = [1, 1.5] as Dpr;
const WEBGL_POSITION = new Vector3(-60, 30, 30);
const WEBGL_FOV = 5;
const WEBGL_ROTATION = new Euler(0, 0, 0);

/*
ROBOT PERSPECTIVE
const WEBGL_POSITION = new Vector3(-60, 30, 30);
const WEBGL_FOV = 5;
const WEBGL_ROTATION = new Euler(0, 0, 0);

// COMPUTER PERSPECTIVE (SOON)

*/

/**
 * GLOBAL
 **/
function App() {
  return (
    <>
      {/* SCENE */}
      <Canvas
        gl={{ antialias: false }}
        dpr={WEBGL_DPR}
        camera={{
          position: WEBGL_POSITION,
          fov: WEBGL_FOV,
          rotation: WEBGL_ROTATION,
        }}
      >
        <Scene/>
      </Canvas>
      {/* OVERLAY */}
      <div className="overlay">
        <div className="bottom-container">
          <div className="title">S O R R O W</div>
          <nav>
            <a href="#">HOME</a>
            <a id="about" href="#about">ABOUT</a>
            <a href="https://github.com/chomnr">GITHUB</a>
            <a href="mailto:me@zeljko.me">CONTACT</a>
          </nav>
        </div>
      </div>
    </>
  );
}

/**
 * SCENE
 **/

function Scene() {
  const meshRef = useRef<Mesh>(null);
  const cameraControlsRef = useRef<CameraControls>(null);

  const { camera } = useThree();

  return (
    <>
      <color attach={WEBGL_BACKGROUND[0]} args={[WEBGL_BACKGROUND[1]]} />
      <group position={[-0, -1, 0]}>
        <Robot />
        {/*<Desk/> */}
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
        <Effects />
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

function Effects() {
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

/*
      <div className="cctv-container">
        <div className="cctv-corner-lines">
          <div className="cctv-line-horizontal" />
          <div className="cctv-line-vertical" />
        </div>

        <div className="cctv-corner-lines" style={{position: 'absolute', bottom: '0'}}>
          <div className="cctv-line-vertical" />
          <div className="cctv-line-horizontal" />
        </div>

        <div className="cctv-corner-lines" style={{position: 'absolute', right: '0'}}>
          <div className="cctv-line-horizontal" />
          <div className="cctv-line-vertical" style={{position: 'absolute', right: '13px'}} />
        </div>

        <div className="cctv-corner-lines" style={{position: 'absolute', right: '0', bottom: '0'}}>
          <div className="cctv-line-vertical"/>
          <div className="cctv-line-horizontal" style={{position: 'absolute', right: '13px'}}/>
        </div>
      </div>
      */
