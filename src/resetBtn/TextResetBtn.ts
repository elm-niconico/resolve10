import {BaseParam, IResetBtn} from "./createResetBtn";
import {createFilledRect, Entity} from "../util/entityHelper";
import {createIpaBitmapFont, createLabel} from "../util/fontHelper";

export class TextResetBtn implements IResetBtn {
    createResetBtn(baseParam: BaseParam): Entity {
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
            text: "reset",
            font: createIpaBitmapFont(),
        }))
        return rect
    }

}
