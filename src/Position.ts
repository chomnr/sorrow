import { Dpr } from "@react-three/fiber";
import { Color, Euler, Vector3 } from "three";

export const BACKGROUND_COLOR: Color = new Color("#202020")

// export var IN_POSITION = new Vector3(-60, 30, 30)
export var IN_POSITION = new Vector3(0, 13, 13)
export const IN_DPR = [1, 1.5] as Dpr
export const IN_FOV = 17;
export const IN_ROTATION = new Euler(0, 0, 0);