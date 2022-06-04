import {StandardRule} from "./StandardRule";

/**
 * 次の数字パズルの数字の組を生成します
 */
export interface INumbersMaker {
    makeNext(): number[]
}

/**
 * Make10には基本ルールのほかに特殊ルールがあるらしい
 * Standard = 基本ルールで解ける組の生成
 */
export type Rule = "Standard"
export const factPatternGenerator = (type: Rule) => {
    switch (type) {
        case "Standard":
            return new StandardRule()
    }
}
