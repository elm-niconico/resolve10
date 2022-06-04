import {ICalcCommand} from "./CalcCommand";
import {CalcTypeManager} from "./CalcTypeManager";
import {Entity, Scene} from "../util/entityHelper";

export class CalcPuzzle {
    private calcCommands: ICalcCommand[] = []

    get calcType() {
        return this.calcTypeManager.calcType
    }

    constructor(
        private readonly scene: Scene,
        private readonly container: Entity,
        private readonly calcTypeManager: CalcTypeManager
    ) {
    }


    calc(command: ICalcCommand) {

        this.calcCommands.push(command)
        return command.do()
    }

    undo() {
        if (this.calcCommands.length <= 0)
            return
        const command = this.calcCommands.pop();
        command.undo()
    }
}
