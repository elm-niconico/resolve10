import {FilledRectParameterObject, SceneParameterObject, SpriteParameterObject} from "@akashic/akashic-engine";

export type Scene = g.Scene;
export type Rect = g.FilledRect;
export type Entity = g.E;


export const pushScene =
    (scene: Scene) => g.game.pushScene(scene)

export const createScene =
    (param: SceneParameterObject) => new g.Scene(param);

export const createFilledRect =
    (param: FilledRectParameterObject) => new g.FilledRect(param)

export const createSprite =
    (param: SpriteParameterObject) => new g.Sprite(param)

export const getAudioById =
    (id: string) => g.game.scene().asset.getAudioById(id);

export const getImageById =
    (id: string) => g.game.scene().asset.getImageById(id);


export const deleteAllChildren = (e: Entity) => {
    if (e.children && e.children.length > 0) {
        e.children.forEach(c => e.remove(c))
    }
    e.modified()
}

export const deleteSceneAllChildren = (e: Scene) => {
    if (e.children && e.children.length > 0) {
        e.children.forEach(c => e.remove(c))
    }

}
