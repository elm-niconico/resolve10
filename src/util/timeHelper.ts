import {Scene} from "./entityHelper";

export const sleep = (scene: Scene, ms: number)=> new Promise<void>((resolve) => scene.setTimeout(()=>resolve(), ms))


export const isNumber = (ob: unknown): ob is number => typeof(ob) == "number"
