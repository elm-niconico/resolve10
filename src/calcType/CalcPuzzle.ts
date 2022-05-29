import {CalcCommand} from "./CalcCommand";
import {CalcTypeManager} from "./CalcTypeManager";
import {INumberBox} from "../numberBox/NumberBox";
import {Entity, Scene} from "../util/entityHelper";

export class CalcPuzzle {
    private calcCommands: CalcCommand[] = []

    get calcType() {
        return this.calcTypeManager.calcType
    }

    constructor(
        private readonly scene: Scene,
        private readonly container: Entity,
        private readonly calcTypeManager: CalcTypeManager
    ) {
    }


    calc(boxes: (INumberBox | null)[], sourceIndex: number, collideIndex: number) {
        const command = new CalcCommand(
            this.scene,
            this.container,
            this.calcTypeManager.calcType,
            boxes
        )
        this.calcCommands.push(command)
        return command.do(sourceIndex, collideIndex)
    }

    undo() {
        if (this.calcCommands.length <= 0)
            return
        const command = this.calcCommands.pop();
        command.undo()
    }
}
