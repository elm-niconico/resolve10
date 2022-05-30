import {GameMainParameterObject} from "@akashic/akashic-engine";
import {pushScene, Scene} from "../util/entityHelper";
import {ScoreBoard} from "./ScoreBoard";
import {Game} from "./Game";

export const changeScene = (param: GameMainParameterObject, type: SceneType) => new Promise<void>((resolve) => {
    const sceneExe = fact(type)
    const scene = sceneExe.createScene(param)
    scene.onLoad.add(() => {
        (async () => {
            await sceneExe.execute(scene, param)

            resolve()
        })()
    })
    pushScene(scene)
})

const fact = (type: SceneType): IScene => {
    switch (type) {
        case "Game":
            return new Game()
        case "Scoreboards":
            return new ScoreBoard()
    }
}
export type SceneType = "Game" | "Scoreboards"

export interface IScene {
    createScene(param: GameMainParameterObject): Scene

    execute(scene: Scene, param: GameMainParameterObject): Promise<void>
}
