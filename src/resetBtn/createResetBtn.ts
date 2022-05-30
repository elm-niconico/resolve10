import {Entity, Scene} from "../util/entityHelper";
import {ImageResetBtn} from "./ImageResetBtn";
import {TextResetBtn} from "./TextResetBtn";

export interface IResetBtn {
    createResetBtn(baseParam: BaseParam): Entity
}

export type ResetBtnType = "Image" | "Text"

export type BaseParam = {
    scene: Scene,
    width: number,
    height: number,
    touchable: true,
    x: number,
    y: number
}

const fact = (type: ResetBtnType): IResetBtn => {
    switch (type) {
        case "Image":
            return new ImageResetBtn()
        case "Text":
            return new TextResetBtn()
    }
}
export const createResetBtn = (type: ResetBtnType, baseParam: BaseParam) => {
    return fact(type).createResetBtn(baseParam)
}
