import {createRect, Scene} from "./util/entityHelper"

import {BoxManager} from "./BoxManager";
import {CalcTypeManager} from "./calcType/CalcTypeManager";
import {CalcPuzzle} from "./calcType/CalcPuzzle";
import {fact} from "./makeNumbers/Maker";
import {GameMainParameterObject} from "./parameterObject";
import {sleep} from "./util/timeHelper";

export const startGameScene = (param: GameMainParameterObject) => new Promise<void>((resolve, reject) => {
    const scene = new g.Scene({
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
            "game_end"
        ]
    })

    scene.onLoad.add(() => {
        (async () => {
            const bgm = scene.asset.getAudioById("bgm")
            bgm.play()
            await game(scene, param)
            scene.append(new g.FilledRect({
                cssColor: "rgba(255,255,255,0)",
                height: g.game.height,
                scene,
                touchable: true,
                width: g.game.width,
                x: 0,
                y: 0
            }))

            bgm.stop()
            bgm.destroy()
            scene.asset.getAudioById("game_end").play()
            await sleep(scene, 3000)
            resolve();
        })()
    })

    g.game.pushScene(scene)
})
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
    const patternGenerator = fact("Standard")
    let nextPatterns = patternGenerator.makeNext()
    while (timer > 0) {
        const container = settingNumberBoxContainer(scene)
        const calc = new CalcPuzzle(scene, container, calcTypeManager);
        const boxManager = new BoxManager(scene, container, calc, nextPatterns)
        const resetOrClear = await boxManager.placePuzzle()
        if (resetOrClear == "success") {
            g.game.vars.gameState.score++;
            updateText(scoreLabel, g.game.vars.gameState.score.toString())
            nextPatterns = patternGenerator.makeNext()
        }
        scene.remove(container)

    }
})


const settingBackGround = (scene: Scene) => {
    const backGround = createRect({
        scene,
        width: scene.game.width,
        height: scene.game.height,
        cssColor: "#26ce1f"
    })
    scene.append(backGround)
}

const settingNumberBoxContainer = (scene: Scene) => {
    const container = createRect({
        scene,
        width: 500,
        height: g.game.height - 80 - 100,
        cssColor: "#f5efe9",
        x: 150,
        y: 90
    })
    scene.append(container)
    return container
}

const createTimerLabel = (scene: Scene, limitTime: number) => {
    scene.append(new g.Label({
        scene: scene,
        font: createBitmapFont(),
        text: "Time",
        fontSize: 60,
        x: 150,
        y: 20
    }))
    return new g.Label({
        scene: scene,
        font: createBitmapFont(),
        text: limitTime.toString(),
        fontSize: 70,
        x: 300,
        y: 10
    })
}

const createScoreLabel = (scene: Scene) => {
    scene.append(new g.Label({
        scene: scene,
        font: createBitmapFont(),
        text: "Score",
        fontSize: 60,
        x: 500,
        y: 20
    }))
    return new g.Label({
        scene: scene,
        font: createBitmapFont(),
        text: "0",
        fontSize: 70,
        x: 670,
        y: 15
    })
}


const updateText = (label: g.Label, text: string) => {
    label.text = text

    label.invalidate()
}


const createBitmapFont = () => {
    // 上で生成した nicokaku.png と nicokaku_glyphs.json に対応するアセットを取得
    const fontAsset = g.game.scene().asset.getImageById("ipa");
    const fontGlyphAsset = g.game.scene().asset.getTextById("ipa_glyphs");

    const glyphInfo = JSON.parse(fontGlyphAsset.data);

    return new g.BitmapFont({
        src: fontAsset,
        glyphInfo: glyphInfo,
    });
}

