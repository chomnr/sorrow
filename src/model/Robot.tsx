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
    console.log(annoyance);
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
          () => {}
        );
      }
    }
  }, [action, annoyance, phase]);

  /*
  // Easter Egg: Annoyance (Should be a one time easter egg.)
  const [annoyance, setAnnoyance] = useState(0);
  const annoy = () => {
    setAnnoyance((prev) => prev + 1);
    console.log(annoyance);
  };

  useEffect(() => {
    if (action && annoyance > 10) {
      const mixer = action.getMixer()
      // const timeScale = 0.5
      // mixer.timeScale = timeScale
      action.play()
      action.paused = false
      const updateInterval = 1000 / 60
      const tolerance = 0.05
      const intervalId = setInterval(() => {
        mixer.update(0.016)
        const animationTime = action.time
        const clipDuration = action.getClip().duration
        console.log(animationTime)
        // between animtime >= 4 and animtime < 6
        if (animationTime >= clipDuration - tolerance) {
          action.paused = true
          console.log("Animation reached the end and is paused")
          clearInterval(intervalId)
        }
      }, updateInterval)
      return () => {
        clearInterval(intervalId)
        action.paused = true
      };
    }
  }, [annoyance, action])
*/

  /*
  useEffect(() => {
    const action = actions['Animation_3'];

    if (action) {
      const mixer = action.getMixer();

      const speedFactor = 0.5;
      action.timeScale = speedFactor;
      action.play();
      action.paused = true;

      const handleAnimation = () => {
        action.play();
        action.paused = false;

        const checkAnimation = () => {
          mixer.update(0.016);

          if (action.time >= action.getClip().duration) {
            action.paused = true;
            if (Math.random() < 1) {
              action.play();
              action.paused = false;
            }
          } else {
            requestAnimationFrame(checkAnimation);
          }
        };

        requestAnimationFrame(checkAnimation);
      };

      if (Math.random() < 0.45) {
        handleAnimation();
      }
    }
  }, [actions]);
  */

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

/*
OLD 


import * as THREE from 'three'
import React from 'react'
import { useGraph } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF, SkeletonUtils } from 'three-stdlib'
import { useLoading } from '../context/LoadingContext'



type RobotActionName = 'Animation_1' | 'Animation_2' | 'Animation_3'

interface RobotGLTFAction extends THREE.AnimationClip {
  name: RobotActionName
}

type GLTFResult = GLTF & {
  nodes: {
    Chain_Right: THREE.Mesh
    Cube001_1: THREE.SkinnedMesh
    Cube001_2: THREE.SkinnedMesh
    Cube001_3: THREE.SkinnedMesh
    Hip_1: THREE.Bone
    IkTarget_L_1: THREE.Bone
    ik_L_1: THREE.Bone
    IkTarget_R_1: THREE.Bone
    ik_R_1: THREE.Bone
  }
  materials: {
    Metal_Chain: THREE.MeshStandardMaterial
    Robot_MAT1: THREE.MeshStandardMaterial
    ['RobotMAt2.001']: THREE.MeshStandardMaterial
  }
  animations: RobotGLTFAction[]
}

export function Robot(props: JSX.IntrinsicElements['group']) {
  const group = React.useRef<THREE.Group>(null)
  const { scene, animations } = useGLTF('/robot-transformed.glb')
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes, materials } = useGraph(clone) as GLTFResult
  const { actions } = useAnimations(animations, group)

  const { isLoading } = useLoading();


  // GreyScale
  React.useEffect(() => {
    Object.values(materials).forEach((material) => {
      material.color.set(0x222)
      material.emissive.set(0x000)
      material.metalness = 0
      material.roughness = 1
    })
  }, [materials])

  // Animation
  React.useEffect(() => {
    const action = actions?.['Animation_3']
    if (action && !isLoading) {
      action.play()
    }

    return () => {
      if (action) {
        action.stop()
      }
    }
  }, [actions, isLoading])

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature001" position={[0, 0, -0.158]}>
          <primitive object={nodes.Hip_1} />
          <primitive object={nodes.IkTarget_L_1} />
          <primitive object={nodes.ik_L_1} />
          <primitive object={nodes.IkTarget_R_1} />
          <primitive object={nodes.ik_R_1} />
        </group>
        <mesh name="Chain_Right" geometry={nodes.Chain_Right.geometry} material={materials.Metal_Chain} />
        <group name="Cube002" position={[0, 0, -0.158]}>
          <skinnedMesh name="Cube001_1" geometry={nodes.Cube001_1.geometry} material={materials.Robot_MAT1} skeleton={nodes.Cube001_1.skeleton} />
          <skinnedMesh name="Cube001_2" geometry={nodes.Cube001_2.geometry} material={materials['RobotMAt2.001']} skeleton={nodes.Cube001_2.skeleton} />
          <skinnedMesh name="Cube001_3" geometry={nodes.Cube001_3.geometry} material={materials.Metal_Chain} skeleton={nodes.Cube001_3.skeleton} />
        </group>
      </group>
    </group>
  )
}
*/

useGLTF.preload("/robot-transformed.glb");
