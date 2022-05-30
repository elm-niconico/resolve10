import {Entity, Scene} from "../util/entityHelper";
import {ImageUndoBtn} from "./ImageUndoBtn";
import {TextUndoBtn} from "./TextUndoBtn";

export interface IUndoBtn {
    createUndoBtn(baseParam: BaseParam): Entity
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

const fact = (type: ResetBtnType): IUndoBtn => {
    switch (type) {
        case "Image":
            return new ImageUndoBtn()
        case "Text":
            return new TextUndoBtn()
    }
}
export const createUndoBtn = (type: ResetBtnType, baseParam: BaseParam) => {
    return fact(type).createUndoBtn(baseParam)
}
