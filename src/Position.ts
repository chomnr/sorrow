import { Dpr } from "@react-three/fiber";
import { Color, Euler, Vector3 } from "three";

export const BACKGROUND_COLOR: Color = new Color("#202020")

export var IN_POSITION = new Vector3(-60, 30, 30)
export const IN_DPR = [1, 1.5] as Dpr
export const IN_FOV = 5;
export const IN_ROTATION = new Euler(0, 0, 0);