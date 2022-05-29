import {createRect, Entity, Rect, Scene} from "../util/entityHelper";
import {PointMoveEvent} from "@akashic/akashic-engine";

export interface NumberBoxStructure {
    readonly num: number
    readonly entity: g.E
    readonly x: number,
    readonly y: number,

}

export interface NumberBoxCollision {
    isCollide(x: number, y: number, box: INumberBox): boolean
}

export type INumberBox = NumberBoxStructure & NumberBoxCollision


export class NumberBox implements INumberBox {
    readonly entity: Entity;

    constructor(scene: Scene,
                container: Entity,
                readonly x: number,
                readonly y: number,
                readonly num: number) {

        this.entity = this.toEntity(scene, container, x, y)
    }

    isCollide(x: number, y: number, box: INumberBox): boolean {

        return g.Collision.intersect(
            this.entity.x,
            this.entity.y,
            this.entity.width,
            this.entity.height,
            x,
            y,
            box.entity.width,
            box.entity.height);
    }


    private toEntity(scene: Scene, container: Entity, x: number, y: number): g.E {
        const numberBox = createRect({
            cssColor: "#6395ff",
            width: 100,
            height: 100,
            touchable: true,
            x,
            y,
            scene
        })
        numberBox
            .onPointMove
            .add((ev) => NumberBox.onMove(numberBox, container, ev));


        setLabel(numberBox, scene, this.num)

        return numberBox;
    }


    private static onMove(numberBox: Rect, container: Entity, ev: PointMoveEvent) {
        const nextX = numberBox.x + ev.prevDelta.x
        const nextY = numberBox.y + ev.prevDelta.y
        if (this.caNotMove(nextX, nextY, numberBox, container)) {
            return;
        }
        numberBox.x = nextX
        numberBox.y = nextY
        numberBox.modified();
    }

    private static caNotMove(nextX: number, nextY: number, numberBox: Rect, container: Entity) {
        const caNotX = nextX < 0 || container.width < (nextX + numberBox.width);
        const caNotY = nextY < 0 || container.height < (nextY + numberBox.height)
        return caNotX || caNotY;
    }
}

const setLabel = (numberBox: Entity, scene: Scene, num: number) => {

    const label = new g.Label({
        scene: scene,
        font: createBitmapFont(),
        text: num.toString(),
        fontSize: 57,
        y: (numberBox.height / 2) - 30,
        textAlign: "center",
        height: 100,
        width: 100, // 中央寄せに使う描画の幅
        widthAutoAdjust: false // 幅を自動で更新しない
    });
    numberBox.append(label)
}
const createBitmapFont = () => {

    const fontAsset = g.game.scene().asset.getImageById("nicokaku");
    const fontGlyphAsset = g.game.scene().asset.getTextById("nicokaku_glyphs");

    const glyphInfo = JSON.parse(fontGlyphAsset.data);

    return new g.BitmapFont({
        src: fontAsset,
        glyphInfo: glyphInfo,
    });
}

