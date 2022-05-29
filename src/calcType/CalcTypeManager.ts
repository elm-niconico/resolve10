import {createSprite, getImageById, Scene} from "../util/entityHelper";

export type CalcType = "Plus" | "Minus" | "Multi" | "Division"

export class CalcTypeManager {
    private _calcType: CalcType = "Plus"
    private _typeBoxes: [CalcType, g.Sprite][] = []


    get calcType() {
        return this._calcType
    }

    constructor(private readonly scene: Scene) {
        this.settingsCalcTypeBoxes(scene)
    }

    settingsCalcTypeBoxes(scene: Scene) {
        const height = 100
        const width = 100

        const x = 20;

        const thunkNextY = () => {
            let count = 0;
            const margin = 50;

            return () => 80 + (count++ * (height + margin))
        }
        const nextY = thunkNextY();


        const plus = createSprite({
            scene,
            width: 100,
            height: 100,
            src: getImageById("plus_active"),
            touchable: true,
            x: 20,
            y: nextY()
        })
        plus.onPointDown.add(() => {
            this.setCalcType("Plus")
        })
        const minus = createSprite({
            scene,
            width,
            height,
            touchable: true,
            src: getImageById("minus"),
            x,
            y: nextY()
        })
        minus.onPointDown.add(() => {
            this.setCalcType("Minus")
        })
        const multi = createSprite({
            scene,
            width,
            height,
            touchable: true,
            src: getImageById("multi"),
            x,
            y: nextY()
        })
        multi.onPointDown.add(() => {
            this.setCalcType("Multi")
        })
        const division = createSprite({
            scene,
            width,
            height,
            touchable: true,
            src: getImageById("division"),
            x,
            y: nextY()
        })
        division.onPointDown.add(() => {
            this.setCalcType("Division")
        })
        this._typeBoxes.push(["Plus", plus], ["Minus", minus], ["Multi", multi], ["Division", division])
        scene.append(plus)
        scene.append(minus)
        scene.append(multi)
        scene.append(division)
    }

    private setCalcType(type: CalcType) {
        this._calcType = type;
        this._typeBoxes.forEach(([calcType, box]) => {
            const assetId = calcType == type ?
                CalcTypeManager.choiceActiveSrc(calcType) :
                CalcTypeManager.choiceDeActiveSrc(calcType);
            box.src = getImageById(assetId)
            box.invalidate()
        })
    }

    private static choiceActiveSrc(type: CalcType) {
        switch (type) {
            case "Plus":
                return "plus_active"
            case "Division":
                return "division_active"
            case "Minus":
                return "minus_active"
            case "Multi":
                return "multi_active"
        }
    }

    private static choiceDeActiveSrc(type: CalcType) {
        switch (type) {
            case "Plus":
                return "plus"
            case "Division":
                return "division"
            case "Minus":
                return "minus"
            case "Multi":
                return "multi"
        }
    }
}
