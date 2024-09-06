import React, { useEffect, useState } from "react";
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
  // todo make time update visually...
  /*
  const [currentTime, setCurrentTime] = useState(formatTime());
  /*
  useEffect(() => {
    setTimeout(() => {
      setCurrentTime(formatTime)
    }, 500)
  })
  */
  
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
          <div className="cam-top-line" />
          <div className="cam-line" />

          {/*
          <div className="cctv-info-group">
            <div
              className="cctv-info"
              style={{ display: "flex", gap: "6px", alignItems: "center" }}
            >
              <div className="record-pulse"></div>
              RECORDING
            </div>
            <div className="cctv-info">L {currentTime}</div>
          </div>
          */}
        </div>

        {/* BOTTOM LEFT */}
        <div
          className="cctv-line-group"
          style={{ left: "14px", bottom: "13px", transform: "rotate(270deg)" }}
        >
          <div className="cam-top-line" />
          <div className="cam-line" />
        </div>

        {/* TOP RIGHT */}
        <div
          className="cctv-line-group"
          style={{ right: "13px", transform: "rotate(90deg)" }}
        >
          <div className="cam-top-line" />
          <div className="cam-line-v2" />
        </div>

        {/* BOTTOM RIGHT */}
        <div
          className="cctv-line-group"
          style={{ bottom: "13px", right: "13px", transform: "rotate(270deg)" }}
        >
          <div className="cam-line-v2" />
          <div className="cam-top-line" />
        </div>
      </div>
    </div>
  );
}

/*
const formatTime = () => {
  const now = new Date();

  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const milliseconds = String(now.getMilliseconds()).padStart(3, "0");

  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12;

  // Format date
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const year = String(now.getFullYear()).slice(-2);

  return `${hours}:${minutes}:${seconds}-${milliseconds} ${ampm} ${month}/${day}/${year}`;
};
*/
export default App;
