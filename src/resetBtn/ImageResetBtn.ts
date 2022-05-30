import {BaseParam, IResetBtn} from "./createResetBtn";
import {createSprite, Entity, getImageById} from "../util/entityHelper";

export class ImageResetBtn implements IResetBtn {
    createResetBtn(param: BaseParam): Entity {
        return createSprite({
            src: getImageById("reset"),
            ...param
        })
    }

}
