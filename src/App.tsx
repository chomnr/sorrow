import React from "react";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  Lightformer,
  MeshReflectorMaterial,
  OrbitControls,
} from "@react-three/drei";
import { Effects } from "./Effects";
import { Robot } from "./Robot";

function App() {
  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      {/* WebGL Canvas */}
      <Canvas
        gl={{ antialias: false }}
        dpr={[1, 1.5]}
        camera={{ position: [-60, 30, 30], fov: 5, rotation: [0, 0, 0] }}
      >
        <color attach="background" args={["#101010"]} />
        <group position={[-0, -1, 0]}>
          <Robot />
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
        </group>
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
          {/* Key */}
          <Lightformer
            form="ring"
            color="red"
            intensity={10}
            scale={2}
            position={[10, 5, 10]}
            onUpdate={(self) => self.lookAt(0, 0, 0)}
          />
        </Environment>
        <Effects />
        <OrbitControls
          enableDamping={false}
          enableZoom={false}
          enableRotate={false}
        />
      </Canvas>

      {/* HTML Overlay */}
      <div className="cctv">
        {/* LEFT */}
        <div className="cctv-line-group">
          <div className="cam-top-line"/>
          <div className="cam-line" />

          <div className="cctv-info-group">
            <div className="cctv-info">RECORDING</div>
            <div className="cctv-info">L 11:57:20-653 AM 04/20/99</div>            
          </div>
        </div>

        {/* BOTTOM LEFT */}
        <div
          className="cctv-line-group"
          style={{ left: '14px', bottom: "13px", transform: "rotate(270deg)" }}
        >
          <div className="cam-top-line" />
          <div className="cam-line" />
        </div>

        {/* TOP RIGHT */}
        <div className="cctv-line-group" style={{right: '13px', transform: 'rotate(90deg)'}}>
          <div className="cam-top-line" />
          <div className="cam-line-v2" />
        </div>

        {/* BOTTOM RIGHT */}
        <div className="cctv-line-group" style={{bottom: '13px', right: '13px', transform: 'rotate(270deg)'}}>
          <div className="cam-line-v2" />
          <div className="cam-top-line" />
        </div>
      </div>
    </div>
  );
}

export default App;
