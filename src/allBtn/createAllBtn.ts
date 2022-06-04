import {BaseParam} from "../resetBtn/createResetBtn";
import {createFilledRect, Entity} from "../util/entityHelper";
import {createIpaBitmapFont, createLabel} from "../util/fontHelper";

export const createAllBtn = (baseParam: BaseParam): Entity => {
    const rect = createFilledRect({
        cssColor: "#ffffff",
        ...baseParam
    })
    rect.append(createLabel({
        textColor: "#000000",
        fontSize: 30,
        y: baseParam.height / 2 - 20,
        x: 10,
        textAlign: "center",
        scene: baseParam.scene,
        text: "all sum",
        font: createIpaBitmapFont(),
    }))
    return rect
}
