import { useEffect, useRef, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import {
  AnimationAction,
  AnimationMixer,
  Group,
  MeshStandardMaterial,
  SkinnedMesh,
} from "three";
import { Phase, usePhase } from "../context/PhaseContext";

export function Robot(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<Group>(null);
  const { nodes, materials, animations } = useGLTF("/robot.glb")
  const { actions } = useAnimations(animations, group)
  const { phase, setPhase } = usePhase()

  // Custom Material: Robot
  const robotShell = new MeshStandardMaterial({ color: "black", roughness: 1 })
  const robotOrgan = new MeshStandardMaterial({ color: "black", roughness: 1 })

  // Animation Hook: Handles animations
  const action = actions["Animation_3"]

  if (action) {
    action.play()
    action.paused = true
  }

  // Easter Egg: Annoyance
  const [annoyance, setAnnoyance] = useState(0);
  const annoy = () => {
    setAnnoyance((prev) => prev + 1)
  };

  useEffect(() => {
    if (action && annoyance >= 17) {
      const mixer = action.getMixer()
      mixer.timeScale = 0.5
      action.play()
      action.paused = false
  
      let intervalId: NodeJS.Timeout
  
      if (phase === Phase.Begun) {
        intervalId = setInterval(() => {
          mixer.update(0.016)
          if (action.time >= 4.9) {
            action.paused = true
            clearInterval(intervalId)
            setPhase(Phase.RobotAnnoyed)
            setTimeout(() => {
              setPhase(Phase.RobotCalming)
            }, 5153);
          }
        }, 1000 / 60);
      }
  
      if (phase === Phase.RobotCalming) {
        const clipDuration = action.getClip().duration;
        intervalId = setInterval(() => {
          mixer.update(0.016)
          if (action.time >= clipDuration - 0.2) {
            action.paused = true
            clearInterval(intervalId)
            setPhase(Phase.RobotCalmed)
          }
        }, 1000 / 60)
      }
  
      return () => {
        clearInterval(intervalId)
        action.paused = true
      };
    }
  }, [action, annoyance, phase, setPhase])

  // Model
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="CTRL_RIG">
        <group name="Armature001" position={[0, 0, -0.158]}>
          <group name="Cube002">
            <skinnedMesh
              onClick={annoy}
              name="Cube001_1"
              geometry={(nodes.Cube001_1 as SkinnedMesh).geometry}
              material={robotShell}
              skeleton={(nodes.Cube001_1 as SkinnedMesh).skeleton}
            />
            <skinnedMesh
              onClick={annoy}
              name="Cube001_2"
              geometry={(nodes.Cube001_2 as SkinnedMesh).geometry}
              material={robotOrgan}
              skeleton={(nodes.Cube001_2 as SkinnedMesh).skeleton}
            />
            <skinnedMesh
              name="Cube001_3"
              geometry={(nodes.Cube001_3 as SkinnedMesh).geometry}
              material={materials.Metal_Chain}
              skeleton={(nodes.Cube001_3 as SkinnedMesh).skeleton}
            />
          </group>
          <primitive object={nodes.Hip_1} />
          <primitive object={nodes.IkTarget_L_1} />
          <primitive object={nodes.ik_L_1} />
          <primitive object={nodes.IkTarget_R_1} />
          <primitive object={nodes.ik_R_1} />
        </group>
      </group>
      <mesh
        name="Chain_Right"
        castShadow
        receiveShadow
        geometry={(nodes.Chain_Right as SkinnedMesh).geometry}
        material={materials.Metal_Chain}
      />
      <mesh
        name="HookFloor"
        castShadow
        receiveShadow
        geometry={(nodes.HookFloor as SkinnedMesh).geometry}
        material={materials.Metal_Chain} // materials.Metal_Chain
      />
      <mesh
        name="Chain_Right001"
        castShadow
        receiveShadow
        geometry={(nodes.Chain_Right001 as SkinnedMesh).geometry}
        material={materials.Metal_Chain} // materials.Metal_Chain
        position={[0, 0, -0.15]}
        rotation={[-Math.PI, 0.032, -Math.PI]}
      />
      <group
        name="AIM_Chain"
        position={[-0.2, 0.463, -0.335]}
        rotation={[0.228, 0.533, 0.467]}
      />
    </group>
  );
}

useGLTF.preload("/robot.glb");