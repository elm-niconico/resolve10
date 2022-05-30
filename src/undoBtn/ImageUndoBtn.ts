import {BaseParam, IUndoBtn} from "./createUndoBtn";
import {createSprite, Entity, getImageById} from "../util/entityHelper";

export class ImageUndoBtn implements IUndoBtn {
    createUndoBtn(param: BaseParam): Entity {
        return createSprite({
            src: getImageById("undo"),
            ...param
        })
    }

}
