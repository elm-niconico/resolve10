import {ICalcCommand} from "./CalcCommand";
import {INumberBox, NumberBox} from "../numberBox/NumberBox";
import {deleteAllChildren, Entity, Scene} from "../util/entityHelper";

export class AllCalcCommand implements ICalcCommand {

    private cacheBoxes: (INumberBox | null)[]

    constructor(
        private readonly scene: Scene,
        private readonly container: Entity,
        private readonly boxes: (INumberBox | null)[],
    ) {
    }


    do(): INumberBox {
        this.cacheBoxes = [...this.boxes];

        const withoutNullBoxes = this.boxes
            .filter(b => b != null)

        const sumNumber = withoutNullBoxes
            .map(b => b.num)
            .reduce((pre, b) => pre + b)

        const sumBox = new NumberBox(
            this.scene,
            this.container,
            withoutNullBoxes[0].x,
            withoutNullBoxes[0].y,
            sumNumber);

        withoutNullBoxes.forEach(b => {
            this.container.remove(b.entity)
        })
        for (let i = 0; i < this.boxes.length; i++) {
            this.boxes[i] = null;
        }
        this.container.append(sumBox.entity)
        return sumBox
    }

    undo(): void {
        deleteAllChildren(this.container)
        this.cacheBoxes
            .filter(b => b)
            .forEach(b => {
                this.container.append(b.entity)
            })
        for (let i = 0; i < this.boxes.length; i++) {
            this.boxes[i] = this.cacheBoxes[i];
        }

    }

}
