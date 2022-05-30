import {LabelParameterObject} from "@akashic/akashic-engine";

export const createBitmapFont = (imageId: string, textId: string) => {

    const fontAsset = g.game.scene().asset.getImageById(imageId);
    const fontGlyphAsset = g.game.scene().asset.getTextById(textId);

    const glyphInfo = JSON.parse(fontGlyphAsset.data);

    return new g.BitmapFont({
        src: fontAsset,
        glyphInfo: glyphInfo,
    });
}

export const createIpaBitmapFont = () => createBitmapFont("ipa", "ipa_glyphs")

export const createNicoBitmapFont = () => createBitmapFont("nicokaku", "nicokaku_glyphs")

export const createLabel = (param: LabelParameterObject) => new g.Label(param)
