import {BaseParam, IUndoBtn} from "./createUndoBtn";
import {createFilledRect, Entity} from "../util/entityHelper";
import {createIpaBitmapFont, createLabel} from "../util/fontHelper";

export class TextUndoBtn implements IUndoBtn {
    createUndoBtn(baseParam: BaseParam): Entity {
        const rect = createFilledRect({
            cssColor: "#ffffff",
            ...baseParam
        })
        rect.append(createLabel({
            textColor: "#000000",
            fontSize: 37,
            y: baseParam.height / 2 - 18,
            x: 15,
            textAlign: "center",
            scene: baseParam.scene,
            text: "undo",
            font: createIpaBitmapFont(),
        }))
        return rect
    }

}
