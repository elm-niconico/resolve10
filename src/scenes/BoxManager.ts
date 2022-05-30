import {Entity, getAudioById, Scene} from "../util/entityHelper";
import {isNumber, sleep} from "../util/timeHelper";
import {INumberBox, NumberBox} from "../numberBox/NumberBox";
import {CalcPuzzle} from "../calcType/CalcPuzzle";
import {createResetBtn} from "../resetBtn/createResetBtn";
import {createUndoBtn} from "../undoBtn/createUndoBtn";

export class BoxManager {

    private readonly boxes: (INumberBox | null)[];
    private undoBtn: Entity
    private resetBtn: Entity

    constructor(private readonly scene: Scene,
                private readonly container: Entity,
                private readonly calcManager: CalcPuzzle,
                private readonly nums: number[],
    ) {
        this.boxes = this.initNumberBoxes(scene, container)

    }


    async placePuzzle() {

        this.createUndoBtn()
        const resetBtnTask = this.createResetBtn();
        const completeTask = () => new Promise<"10">(async (resolve, reject) => {
            for (let i = 0; i < this.boxes.length; i++) {
                this.setBox(i, this.boxes[i], resolve)
            }
            await resetBtnTask()
            reject()
        })

        try {
            return await completeTask()
        } catch (e) {
            return "reset"
        } finally {
            this.scene.remove(this.resetBtn)
            this.scene.remove(this.undoBtn)
        }
    }


    private createResetBtn() {
        const reset = createResetBtn("Text", {
            scene: this.scene,
            width: 100,
            height: 100,
            touchable: true,
            x: 680,
            y: 250
        })
        this.resetBtn = reset;

        this.scene.append(reset)
        return () => new Promise<"reset">((resolve) => {
            reset.onPointDown.add(() => {
                resolve("reset")
            })
        })
    }

    private createUndoBtn() {
        const undo = createUndoBtn("Text", {
            scene: this.scene,
            width: 100,
            height: 100,
            touchable: true,
            x: 680,
            y: 100
        })
        this.undoBtn = undo;
        undo.onPointDown.add(() => {
            this.calcManager.undo();
        })

        this.scene.append(undo)
    }


    private initNumberBoxes(scene: Scene, container: Entity) {
        const boxes = []
        const n = this.nums
        const one = new NumberBox(scene, container, 80, 80, n[0]);
        const two = new NumberBox(scene, container, 280, 80, n[1]);
        const three = new NumberBox(scene, container, 80, 380, n[2]);
        const four = new NumberBox(scene, container, 280, 380, n[3]);
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
                const calcBox = this.calcManager.calc(this.boxes, sourceIndex, collideIndex);
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
