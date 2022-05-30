import {IScene} from "./changeScene";

import {createScene, Scene} from "../util/entityHelper";
import {GameMainParameterObject} from "../parameterObject";
import {window} from "../main";

export class ScoreBoard implements IScene {
    createScene(param: GameMainParameterObject): Scene {
        return createScene({game: g.game})
    }

    async execute(scene: Scene, param: GameMainParameterObject): Promise<void> {
        await showScoreboardIfAtsumaru(param)
    }
}

const showScoreboardIfAtsumaru = async (param: GameMainParameterObject) => {
    // ゲームアツマール環境であればランキングを表示します
    if (param.isAtsumaru) {
        const boardId = 1;
        await window.RPGAtsumaru.experimental.scoreboards.setRecord(boardId, g.game.vars.gameState.score);
        window.RPGAtsumaru.experimental.scoreboards.display(boardId);
    }
}
