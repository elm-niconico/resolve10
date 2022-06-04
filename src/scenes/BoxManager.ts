import {Entity, getAudioById, Scene} from "../util/entityHelper";
import {isNumber, sleep} from "../util/timeHelper";
import {INumberBox, NumberBox} from "../numberBox/NumberBox";
import {CalcPuzzle} from "../calcType/CalcPuzzle";
import {createResetBtn} from "../resetBtn/createResetBtn";
import {createUndoBtn} from "../undoBtn/createUndoBtn";
import {createPassBtn} from "../passBtn/createPassBtn";
import {AudioAsset} from "@akashic/akashic-engine";
import {CalcCommand} from "../calcType/CalcCommand";
import {createAllBtn} from "../allBtn/createAllBtn";
import {AllCalcCommand} from "../calcType/AllCalcCommand";

export class BoxManager {

    private readonly boxes: (INumberBox | null)[];
    private undoBtn: Entity
    private resetBtn: Entity
    private passBtn: Entity
    private readonly boardOperatorSe: AudioAsset

    constructor(private readonly scene: Scene,
                private readonly container: Entity,
                private readonly calcManager: CalcPuzzle,
                private readonly nums: number[],
    ) {
        this.boxes = this.initNumberBoxes(scene, container)
        this.boardOperatorSe = getAudioById("pass");
    }


    async placePuzzle(): Promise<"10" | "reset" | "pass"> {

        this.createUndoBtn()

        const resetBtnTask = this.createResetBtn();
        const passBtnTask = this.createPassBtn()
        const completeTask = () => new Promise<"10" | "reset" | "pass">(async (resolve, reject) => {
            this.createAllBtn(resolve)
            for (let i = 0; i < this.boxes.length; i++) {
                this.setBox(i, this.boxes[i], resolve)
            }
            const resetOrPass: "reset" | "pass" = await Promise.race([resetBtnTask(), passBtnTask()])
            resolve(resetOrPass)
        })

        try {
            return await completeTask()
        } catch (e) {
            return "reset"
        } finally {
            this.scene.remove(this.resetBtn)
            this.scene.remove(this.undoBtn)
            this.scene.remove(this.passBtn)
        }
    }

    private createUndoBtn() {
        const undo = createUndoBtn("Text", {
            scene: this.scene,
            width: 120,
            height: 120,
            touchable: true,
            x: 750,
            y: 30
        })
        this.undoBtn = undo;
        undo.onPointDown.add(() => {
            this.boardOperatorSe.play()
            sleep(this.scene, 100).then(() => {
                this.calcManager.undo();
            })

        })

        this.scene.append(undo)
    }

    private createResetBtn() {
        const reset = createResetBtn("Text", {
            scene: this.scene,
            width: 120,
            height: 120,
            touchable: true,
            x: 750,
            y: 180
        })
        this.resetBtn = reset;

        this.scene.append(reset)
        return () => new Promise<"reset">((resolve) => {
            reset.onPointDown.add(() => {
                this.boardOperatorSe.play()
                sleep(this.scene, 100).then(() => {
                    resolve("reset")
                })

            })
        })
    }

    private createPassBtn() {
        const passBtn = createPassBtn({
            scene: this.scene,
            width: 120,
            height: 120,
            touchable: true,
            x: 750,
            y: 330
        })
        this.passBtn = passBtn;

        this.scene.append(passBtn)
        return () => new Promise<"pass">((resolve) => {
            passBtn.onPointDown.add(() => {
                this.boardOperatorSe.play()
                sleep(this.scene, 100).then(() => {
                    resolve("pass")
                })
            })
        })
    }

    private createAllBtn(resolve: (message: "10") => void) {
        const allBtn = createAllBtn({
            scene: this.scene,
            width: 120,
            height: 120,
            touchable: true,
            x: 750,
            y: 480
        })


        this.scene.append(allBtn)
        allBtn.onPointDown.add(() => {
            if (this.boxes.filter(b => b).length <= 1) return;
            (async () => {
                this.boardOperatorSe.play()

                const calcBox = this.calcManager.calc(new AllCalcCommand(
                    this.scene,
                    this.container,
                    this.boxes
                ))

                calcBox.entity.modified()
                await sleep(this.scene, 300)
                this.setBox(0, calcBox, resolve)
            })()
        })
    }

    private initNumberBoxes(scene: Scene, container: Entity) {
        const boxes = []
        const n = this.nums
        const one = new NumberBox(scene, container, 50, 50, n[0]);
        const two = new NumberBox(scene, container, container.width - 200, 50, n[1]);
        const three = new NumberBox(scene, container, 50, container.height - 200, n[2]);
        const four = new NumberBox(scene, container, container.width - 200, container.height - 200, n[3]);
        boxes.push(one, two, three, four)
        return boxes
    }

    private setBox(sourceIndex: number, box: INumberBox, resolve: (message: "10") => void) {
        if (this.isClear(box)) {
            getAudioById("resolve").play();
            sleep(this.scene, 300).then(() => resolve("10"))

            return;
        }
        this.boxes[sourceIndex] = box

        const boxEntity = box.entity;
        boxEntity.onPointUp.add((ev) => {
            const nextX = boxEntity.x + ev.prevDelta.x
            const nextY = boxEntity.y + ev.prevDelta.y
            const collideIndex = findIndexCollideBox(this.boxes, nextX, nextY, box);

            this.resetPos(boxEntity, sourceIndex)

            if (isNumber(collideIndex)) {
                const calcBox = this.calcManager.calc(new CalcCommand(
                    this.scene,
                    this.container,
                    this.calcManager.calcType,
                    this.boxes,
                    sourceIndex,
                    collideIndex
                ));
                boxEntity.modified()

                this.setBox(collideIndex, calcBox, resolve);
            }
        })
        this.container.append(box.entity)
    }

    private isClear(box: INumberBox) {
        return box.num == 10 && this.boxes.every(b => b == null)
    }

    private resetPos(boxEntity: Entity, sourceIndex: number) {
        boxEntity.x = this.boxes[sourceIndex].x;
        boxEntity.y = this.boxes[sourceIndex].y;
        boxEntity.modified()
    }

}

const findIndexCollideBox = (boxes: (INumberBox | null)[], x: number, y: number, box: INumberBox): (number | Error) => {
    for (let i = 0; i < boxes.length; i++) {
        const b = boxes[i]

        if (!b || (b.x == box.x && b.y == box.y))
            continue;

        if (b.isCollide(x, y, box))
            return i;
    }
    return new Error("Not Found");
}
