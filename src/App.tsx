import "normalize.css";
import "./App.css";
import { Canvas, Dpr } from "@react-three/fiber";
import { Euler, Vector3 } from "three";
import { Overlay } from "./Overlay";
import { Scene } from "./Scene";

// DPR
const DPR = [1, 1.5] as Dpr;

// ROBOT
const INITIAL_POSITION = new Vector3(-60, 30, 30);
const INITIAL_FOV = 5;
const INITIAL_ROTATION = new Euler(0, 0, 0);

// MONITOR (PLACEHOLDER VALUES)
const MONITOR_POSITION = new Vector3(0, 0, 0);
const MONITOR_FOV = 5;
const MONITOR_ROTATION = new Euler(0, 0, 0);

function App() {
  return (
    <>
      <Canvas gl={{ antialias: false }} dpr={DPR} camera={{position: INITIAL_POSITION,fov: INITIAL_FOV, rotation: INITIAL_ROTATION}}>
        <Scene/>
      </Canvas>
      <Overlay/>
    </>
  );
}

export default App;