import {createFilledRect, createScene, Scene} from "../util/entityHelper"

import {BoxManager} from "./BoxManager";
import {CalcTypeManager} from "../calcType/CalcTypeManager";
import {CalcPuzzle} from "../calcType/CalcPuzzle";
import {factPatternGenerator, INumbersMaker} from "../makeNumbers/Maker";
import {GameMainParameterObject} from "../parameterObject";
import {sleep} from "../util/timeHelper";
import {IScene} from "./changeScene";
import {createIpaBitmapFont, createLabel} from "../util/fontHelper";

export class Game implements IScene {
    createScene(param: GameMainParameterObject): Scene {
        return createScene({
            game: g.game,
            local: true,
            assetIds: [
                "nicokaku",
                "nicokaku_glyphs",
                "plus",
                "plus_active",
                "minus",
                "minus_active",
                "multi",
                "multi_active",
                "division",
                "division_active",
                "undo",
                "reset",
                "ipa",
                "ipa_glyphs",
                "resolve",
                "bgm",
                "game_end",
                "pass"
            ]
        })
    }

    async execute(scene: Scene, param: GameMainParameterObject): Promise<void> {
        const bgm = scene.asset.getAudioById("bgm")
        bgm.play()
        await game(scene, param)

        scene.append(createDummyForeground(scene))

        bgm.stop()
        bgm.destroy()
        scene.asset.getAudioById("game_end").play()
        await sleep(scene, 3000)
    }

}


const game = async (scene: Scene, param: GameMainParameterObject) => {
    g.game.vars.gameState = {score: 0};
    settingBackGround(scene)

    await loopPuzzle(scene, param)
}

const loopPuzzle = (scene: Scene, param: GameMainParameterObject) => new Promise<void>(async (resolve) => {
    let timer = 90; // 制限時間
    if (param.sessionParameter.totalTimeLimit) {
        timer = param.sessionParameter.totalTimeLimit; // セッションパラメータで制限時間が指定されたらその値を使用します
    }


    const timeLabel = createTimerLabel(scene, timer)
    scene.append(timeLabel)

    const scoreLabel = createScoreLabel(scene)
    scene.append(scoreLabel)

    const updateHandler = () => {
        if (timer <= 0) {
            scene.onUpdate.remove(updateHandler)

            resolve()
        }
        timer -= 1 / g.game.fps;
        updateText(timeLabel, Math.ceil(timer).toString())
    }

    scene.onUpdate.add(updateHandler)

    const calcTypeManager = new CalcTypeManager(scene)
    const patternGenerator = factPatternGenerator("Standard")
    let nextPatterns = patternGenerator.makeNext()
    while (timer > 0) {
        const container = settingNumberBoxContainer(scene)
        const calc = new CalcPuzzle(scene, container, calcTypeManager);
        const boxManager = new BoxManager(scene, container, calc, nextPatterns)

        const puzzleResult = await boxManager.placePuzzle()
        if (puzzleResult == "10") {
            nextPatterns = update(patternGenerator, scoreLabel, 1)
        } else if (puzzleResult == "pass") {
            nextPatterns = update(patternGenerator, scoreLabel, -1)
        }

        scene.remove(container)
    }
})

const update = (patternGenerator: INumbersMaker, scoreLabel: g.Label, addScore: number) => {
    g.game.vars.gameState.score += addScore;
    updateText(scoreLabel, g.game.vars.gameState.score.toString())
    return patternGenerator.makeNext()
}

const settingBackGround = (scene: Scene) => {
    const backGround = createFilledRect({
        scene,
        width: scene.game.width,
        height: scene.game.height,
        cssColor: "#26ce1f"
    })
    scene.append(backGround)
}

const settingNumberBoxContainer = (scene: Scene) => {
    const container = createFilledRect({
        scene,
        width: 500,
        height: g.game.height - 80 - 100,
        cssColor: "#f5efe9",
        x: 200,
        y: 130
    })
    scene.append(container)
    return container
}

const createTimerLabel = (scene: Scene, limitTime: number) => {
    scene.append(createLabel({
        scene: scene,
        font: createIpaBitmapFont(),
        text: "Time",
        fontSize: 55,
        x: 200,
        y: 30
    }))
    return createLabel({
        scene: scene,
        font: createIpaBitmapFont(),
        text: limitTime.toString(),
        fontSize: 60,
        x: 335,
        y: 27
    })
}

const createScoreLabel = (scene: Scene) => {
    scene.append(createLabel({
        scene: scene,
        font: createIpaBitmapFont(),
        text: "Score",
        fontSize: 55,
        x: 470,
        y: 30
    }))
    return createLabel({
        scene: scene,
        font: createIpaBitmapFont(),
        text: "0",
        fontSize: 60,
        x: 630,
        y: 27
    })
}


const updateText = (label: g.Label, text: string) => {
    label.text = text

    label.invalidate()
}


// タップ阻止用のダミーエンティティ
const createDummyForeground = (scene: Scene) => {
    return createFilledRect({
        cssColor: "rgba(255,255,255,0)",
        height: g.game.height,
        scene,
        touchable: true,
        width: g.game.width,
        x: 0,
        y: 0
    })
}
