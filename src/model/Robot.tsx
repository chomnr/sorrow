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

useGLTF.preload('/robot-transformed.glb')