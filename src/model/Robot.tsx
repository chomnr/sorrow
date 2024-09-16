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
  const { nodes, materials, animations } = useGLTF("/robot.glb");
  const { actions } = useAnimations(animations, group);
  const { phase, setPhase } = usePhase();

  // Custom Material: Robot
  const robotShell = new MeshStandardMaterial({ color: "black", roughness: 1 });
  const robotOrgan = new MeshStandardMaterial({ color: "black", roughness: 1 });

  // Animation Hook: Handles animations
  const action = actions["Animation_3"];

  if (action) {
    action.play();
    action.paused = true;
  }

  // Easter Egg: Annoyance
  const [annoyance, setAnnoyance] = useState(0);
  const annoy = () => {
    setAnnoyance((prev) => prev + 1);
  };
  useEffect(() => {
    const handleAnimation = (
      action: AnimationAction,
      targetPhase: Phase,
      animationLimit: number,
      callback: { (): void; (): void; (): void }
    ) => {
      const mixer = action.getMixer();
      mixer.timeScale = 0.5;
      action.play();
      action.paused = false;
      const intervalId = setInterval(() => {
        mixer.update(0.016);
        const animationTime = action.time;
        if (animationTime >= animationLimit) {
          action.paused = true;
          clearInterval(intervalId);
          setPhase(targetPhase);
          if (callback) callback();
        }
      }, 1000 / 60);
      return () => {
        clearInterval(intervalId);
        action.paused = true;
      };
    };

    if (action && annoyance >= 17) {
      // head up pause
      if (phase === Phase.Begun) {
        return handleAnimation(action, Phase.RobotAnnoyed, 4.9, () => {
          setTimeout(() => {
            setAnnoyance(17);
            setPhase(Phase.RobotCalming);
          }, 5153);
        });
      }
      // head down pause
      if (phase === Phase.RobotCalming) {
        const clipDuration = action.getClip().duration;
        return handleAnimation(
          action,
          Phase.RobotCalmed,
          clipDuration - 0.2,
          () => {
            setAnnoyance(17);
          }
        );
      }
    }

    // ANGRY (head down phase)
    if (action && annoyance >= 37 && phase === Phase.RobotCalmed) {
      const mixer = action.getMixer()
      mixer.timeScale = 6
      action.play()
      action.paused = false
      setTimeout(() => {
        action.paused = true
        setTimeout(() => {
          setPhase(Phase.RobotAngry)
        })
      }, 1100)
    }
  }, [action, annoyance, phase, setPhase]);

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
