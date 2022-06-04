import {BaseParam} from "../resetBtn/createResetBtn";
import {createFilledRect, Entity} from "../util/entityHelper";
import {createIpaBitmapFont, createLabel} from "../util/fontHelper";

export const createPassBtn = (baseParam: BaseParam): Entity => {
    const rect = createFilledRect({
        cssColor: "#ffffff",
        ...baseParam
    })
    rect.append(createLabel({
        textColor: "#000000",
        fontSize: 37,
        y: baseParam.height / 2 - 20,
        x: 20,
        textAlign: "center",
        scene: baseParam.scene,
        text: "pass",
        font: createIpaBitmapFont(),
    }))
    return rect
}
