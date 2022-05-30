import {IScene} from "./changeScene";

import {createScene, Scene} from "../util/entityHelper";
import {GameMainParameterObject, RPGAtsumaruWindow} from "../parameterObject";


export class ScoreBoard implements IScene {
    createScene(param: GameMainParameterObject): Scene {
        return createScene({game: g.game})
    }

    async execute(scene: Scene, param: GameMainParameterObject, window: RPGAtsumaruWindow): Promise<void> {
        await showScoreboardIfAtsumaru(param, window)
    }
}

const showScoreboardIfAtsumaru = async (param: GameMainParameterObject, window: RPGAtsumaruWindow) => {
    try {
        // ゲームアツマール環境であればランキングを表示します

        if (param.isAtsumaru) {
            const boardId = 1;
            await window.RPGAtsumaru.scoreboards.setRecord(boardId, g.game.vars.gameState.score);
            window.RPGAtsumaru.scoreboards.display(boardId);
        }
    } catch (e) {
        console.error(e)
    }
}
