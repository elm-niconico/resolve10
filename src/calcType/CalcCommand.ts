import {INumberBox, NumberBox} from "../numberBox/NumberBox";
import {CalcType} from "./CalcTypeManager";
import {Entity, Scene} from "../util/entityHelper";


export interface ICalcCommand {
    do(): INumberBox;

    undo(): void;
}


export class CalcCommand {
    private source: [number, INumberBox];
    private collision: [number, INumberBox];
    private calcBox: [number, INumberBox]

    constructor(
        private readonly scene: Scene,
        private readonly container: Entity,
        private readonly calcType: CalcType,
        private readonly boxes: (INumberBox | null)[],
        private readonly sourceIndex: number,
        private readonly collisionIndex: number
    ) {
    }

    do() {

        const collideBox = this.boxes[this.collisionIndex]
        const sourceBox = this.boxes[this.sourceIndex]
        const calcBox = this.createCalcBox(sourceBox, collideBox)

        this.source = [this.sourceIndex, sourceBox]
        this.collision = [this.collisionIndex, collideBox]
        this.calcBox = [this.collisionIndex, calcBox]


        this.boxes[this.sourceIndex] = null
        this.boxes[this.collisionIndex] = null

        this.container.remove(collideBox.entity)
        this.container.remove(sourceBox.entity)
        this.container.append(calcBox.entity)
        return calcBox;
    }

    undo() {
        this.boxes[this.source[0]] = this.source[1];
        this.boxes[this.collision[0]] = this.collision[1]
        this.container.remove(this.calcBox[1].entity)
        this.container.append(this.source[1].entity)
        this.container.append(this.collision[1].entity)
    }

    private createCalcBox(sourceBox: INumberBox, collideBox: INumberBox) {
        return new NumberBox(
            this.scene,
            this.container,
            collideBox.x,
            collideBox.y,
            calc(this.calcType, collideBox.num, sourceBox.num))
    }
}


const calc = (type: CalcType, num1: number, num2: number) => {
    switch (type) {
        case "Plus":
            return num1 + num2;
        case "Minus":
            return num1 - num2;
        case "Multi":
            return num1 * num2;
        case "Division":
            return num1 / num2;
    }
}
