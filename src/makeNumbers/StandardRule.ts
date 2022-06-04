import {INumbersMaker} from "./Maker";
import {random, ShareType} from "../util/mathHelper";

export class StandardRule implements INumbersMaker {
    private readonly indexCache: number[] = []

    makeNext(): number[] {
        const i = this.waitForCreateIndex()

        this.indexCache.push(i)
        return shuffle(patterns[i], "Global")
    }

    private waitForCreateIndex(): number {
        const num = random("Global") * patterns.length
        const i = Math.floor(num)
        if (this.indexCache.some(s => s == i))
            return this.waitForCreateIndex()
        return i;
    }
}

const shuffle = ([...array], type: ShareType) => {
    for (let i = array.length - 1; i >= 0; i--) {
        const j = Math.floor(random(type) * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const patterns = [
    [0, 0, 1, 9],
    [0, 0, 2, 5],
    [0, 0, 2, 8],
    [0, 0, 3, 7],
    [0, 0, 4, 6],
    [0, 0, 5, 5],
    [0, 1, 1, 5],
    [0, 1, 1, 8],
    [0, 1, 1, 9],
    [0, 1, 2, 4],
    [0, 1, 2, 5],
    [0, 1, 2, 6],
    [0, 1, 2, 7],
    [0, 1, 2, 8],
    [0, 1, 2, 9],
    [0, 1, 3, 3],
    [0, 1, 3, 5],
    [0, 1, 3, 6],
    [0, 1, 3, 7],
    [0, 1, 3, 8],
    [0, 1, 3, 9],
    [0, 1, 4, 5],
    [0, 1, 4, 6],
    [0, 1, 4, 7],
    [0, 1, 4, 9],
    [0, 1, 5, 5],
    [0, 1, 5, 6],
    [0, 1, 5, 9],
    [0, 1, 6, 9],
    [0, 1, 7, 9],
    [0, 1, 8, 9],
    [0, 1, 9, 9],
    [0, 2, 2, 3],
    [0, 2, 2, 4],
    [0, 2, 2, 5],
    [0, 2, 2, 6],
    [0, 2, 2, 7],
    [0, 2, 2, 8],
    [0, 2, 2, 9],
    [0, 2, 3, 4],
    [0, 2, 3, 5],
    [0, 2, 3, 7],
    [0, 2, 3, 8],
    [0, 2, 3, 9],
    [0, 2, 4, 4],
    [0, 2, 4, 5],
    [0, 2, 4, 6],
    [0, 2, 4, 7],
    [0, 2, 4, 8],
    [0, 2, 4, 9],
    [0, 2, 5, 5],
    [0, 2, 5, 6],
    [0, 2, 5, 7],
    [0, 2, 5, 8],
    [0, 2, 5, 9],
    [0, 2, 6, 6],
    [0, 2, 6, 7],
    [0, 2, 6, 8],
    [0, 2, 7, 8],
    [0, 2, 8, 8],
    [0, 2, 8, 9],
    [0, 3, 3, 4],
    [0, 3, 3, 7],
    [0, 3, 3, 9],
    [0, 3, 4, 6],
    [0, 3, 4, 7],
    [0, 3, 4, 9],
    [0, 3, 5, 5],
    [0, 3, 5, 6],
    [0, 3, 5, 7],
    [0, 3, 5, 8],
    [0, 3, 6, 7],
    [0, 3, 6, 8],
    [0, 3, 7, 7],
    [0, 3, 7, 8],
    [0, 3, 7, 9],
    [0, 4, 4, 6],
    [0, 4, 4, 9],
    [0, 4, 5, 5],
    [0, 4, 5, 6],
    [0, 4, 5, 8],
    [0, 4, 5, 9],
    [0, 4, 6, 6],
    [0, 4, 6, 7],
    [0, 4, 6, 8],
    [0, 4, 6, 9],
    [0, 4, 7, 7],
    [0, 4, 8, 8],
    [0, 5, 5, 5],
    [0, 5, 5, 6],
    [0, 5, 5, 7],
    [0, 5, 5, 8],
    [0, 5, 5, 9],
    [0, 5, 6, 8],
    [0, 5, 6, 9],
    [0, 5, 7, 8],
    [0, 5, 7, 9],
    [0, 6, 6, 9],
    [0, 6, 7, 9],
    [0, 6, 8, 8],
    [0, 7, 7, 9],
    [0, 7, 8, 9],
    [0, 8, 8, 9],
    [0, 8, 9, 9],
    [0, 9, 9, 9],
    [1, 1, 1, 4],
    [1, 1, 1, 5],
    [1, 1, 1, 6],
    [1, 1, 1, 7],
    [1, 1, 1, 8],
    [1, 1, 1, 9],
    [1, 1, 2, 3],
    [1, 1, 2, 4],
    [1, 1, 2, 5],
    [1, 1, 2, 6],
    [1, 1, 2, 7],
    [1, 1, 2, 8],
    [1, 1, 2, 9],
    [1, 1, 3, 3],
    [1, 1, 3, 4],
    [1, 1, 3, 5],
    [1, 1, 3, 6],
    [1, 1, 3, 7],
    [1, 1, 3, 8],
    [1, 1, 3, 9],
    [1, 1, 4, 4],
    [1, 1, 4, 5],
    [1, 1, 4, 6],
    [1, 1, 4, 7],
    [1, 1, 4, 8],
    [1, 1, 4, 9],
    [1, 1, 5, 5],
    [1, 1, 5, 6],
    [1, 1, 5, 7],
    [1, 1, 5, 8],
    [1, 1, 6, 6],
    [1, 1, 6, 7],
    [1, 1, 6, 8],
    [1, 1, 8, 9],
    [1, 1, 9, 9],
    [1, 2, 2, 2],
    [1, 2, 2, 3],
    [1, 2, 2, 4],
    [1, 2, 2, 5],
    [1, 2, 2, 6],
    [1, 2, 2, 7],
    [1, 2, 2, 8],
    [1, 2, 2, 9],
    [1, 2, 3, 3],
    [1, 2, 3, 4],
    [1, 2, 3, 5],
    [1, 2, 3, 6],
    [1, 2, 3, 7],
    [1, 2, 3, 8],
    [1, 2, 3, 9],
    [1, 2, 4, 4],
    [1, 2, 4, 5],
    [1, 2, 4, 6],
    [1, 2, 4, 7],
    [1, 2, 4, 8],
    [1, 2, 4, 9],
    [1, 2, 5, 5],
    [1, 2, 5, 6],
    [1, 2, 5, 7],
    [1, 2, 5, 8],
    [1, 2, 5, 9],
    [1, 2, 6, 6],
    [1, 2, 6, 7],
    [1, 2, 6, 8],
    [1, 2, 6, 9],
    [1, 2, 7, 7],
    [1, 2, 7, 8],
    [1, 2, 7, 9],
    [1, 2, 8, 8],
    [1, 2, 8, 9],
    [1, 2, 9, 9],
    [1, 3, 3, 3],
    [1, 3, 3, 4],
    [1, 3, 3, 5],
    [1, 3, 3, 6],
    [1, 3, 3, 7],
    [1, 3, 3, 8],
    [1, 3, 3, 9],
    [1, 3, 4, 4],
    [1, 3, 4, 5],
    [1, 3, 4, 6],
    [1, 3, 4, 7],
    [1, 3, 4, 8],
    [1, 3, 4, 9],
    [1, 3, 5, 5],
    [1, 3, 5, 6],
    [1, 3, 5, 7],
    [1, 3, 5, 8],
    [1, 3, 5, 9],
    [1, 3, 6, 6],
    [1, 3, 6, 7],
    [1, 3, 6, 8],
    [1, 3, 6, 9],
    [1, 3, 7, 7],
    [1, 3, 7, 8],
    [1, 3, 7, 9],
    [1, 3, 8, 8],
    [1, 3, 8, 9],
    [1, 4, 4, 5],
    [1, 4, 4, 6],
    [1, 4, 4, 7],
    [1, 4, 4, 8],
    [1, 4, 4, 9],
    [1, 4, 5, 5],
    [1, 4, 5, 6],
    [1, 4, 5, 7],
    [1, 4, 5, 8],
    [1, 4, 5, 9],
    [1, 4, 6, 6],
    [1, 4, 6, 7],
    [1, 4, 6, 8],
    [1, 4, 6, 9],
    [1, 4, 7, 7],
    [1, 4, 7, 8],
    [1, 4, 7, 9],
    [1, 4, 8, 8],
    [1, 4, 8, 9],
    [1, 5, 5, 5],
    [1, 5, 5, 6],
    [1, 5, 5, 7],
    [1, 5, 5, 8],
    [1, 5, 5, 9],
    [1, 5, 6, 6],
    [1, 5, 6, 7],
    [1, 5, 6, 8],
    [1, 5, 6, 9],
    [1, 5, 7, 7],
    [1, 5, 7, 8],
    [1, 5, 7, 9],
    [1, 5, 8, 8],
    [1, 5, 8, 9],
    [1, 5, 9, 9],
    [1, 6, 6, 8],
    [1, 6, 6, 9],
    [1, 6, 7, 8],
    [1, 6, 7, 9],
    [1, 6, 8, 8],
    [1, 6, 8, 9],
    [1, 7, 7, 8],
    [1, 7, 7, 9],
    [1, 7, 8, 8],
    [1, 7, 8, 9],
    [1, 7, 9, 9],
    [1, 8, 8, 8],
    [1, 8, 8, 9],
    [1, 8, 9, 9],
    [1, 9, 9, 9],
    [2, 2, 2, 2],
    [2, 2, 2, 3],
    [2, 2, 2, 4],
    [2, 2, 2, 5],
    [2, 2, 2, 6],
    [2, 2, 2, 7],
    [2, 2, 2, 8],
    [2, 2, 2, 9],
    [2, 2, 3, 3],
    [2, 2, 3, 4],
    [2, 2, 3, 5],
    [2, 2, 3, 6],
    [2, 2, 3, 7],
    [2, 2, 3, 8],
    [2, 2, 3, 9],
    [2, 2, 4, 4],
    [2, 2, 4, 5],
    [2, 2, 4, 6],
    [2, 2, 4, 7],
    [2, 2, 4, 8],
    [2, 2, 4, 9],
    [2, 2, 5, 5],
    [2, 2, 5, 6],
    [2, 2, 5, 8],
    [2, 2, 5, 9],
    [2, 2, 6, 6],
    [2, 2, 6, 7],
    [2, 2, 6, 8],
    [2, 2, 6, 9],
    [2, 2, 7, 7],
    [2, 2, 7, 8],
    [2, 2, 7, 9],
    [2, 2, 8, 8],
    [2, 2, 8, 9],
    [2, 2, 9, 9],
    [2, 3, 3, 3],
    [2, 3, 3, 4],
    [2, 3, 3, 5],
    [2, 3, 3, 6],
    [2, 3, 3, 7],
    [2, 3, 3, 8],
    [2, 3, 3, 9],
    [2, 3, 4, 4],
    [2, 3, 4, 5],
    [2, 3, 4, 6],
    [2, 3, 4, 7],
    [2, 3, 4, 8],
    [2, 3, 4, 9],
    [2, 3, 5, 5],
    [2, 3, 5, 6],
    [2, 3, 5, 7],
    [2, 3, 5, 8],
    [2, 3, 5, 9],
    [2, 3, 6, 6],
    [2, 3, 6, 7],
    [2, 3, 6, 8],
    [2, 3, 6, 9],
    [2, 3, 7, 7],
    [2, 3, 7, 8],
    [2, 3, 7, 9],
    [2, 3, 8, 8],
    [2, 3, 8, 9],
    [2, 3, 9, 9],
    [2, 4, 4, 4],
    [2, 4, 4, 5],
    [2, 4, 4, 6],
    [2, 4, 4, 7],
    [2, 4, 4, 8],
    [2, 4, 4, 9],
    [2, 4, 5, 5],
    [2, 4, 5, 6],
    [2, 4, 5, 7],
    [2, 4, 5, 8],
    [2, 4, 5, 9],
    [2, 4, 6, 6],
    [2, 4, 6, 7],
    [2, 4, 6, 8],
    [2, 4, 6, 9],
    [2, 4, 7, 7],
    [2, 4, 7, 8],
    [2, 4, 7, 9],
    [2, 4, 8, 8],
    [2, 4, 8, 9],
    [2, 4, 9, 9],
    [2, 5, 5, 5],
    [2, 5, 5, 6],
    [2, 5, 5, 7],
    [2, 5, 5, 8],
    [2, 5, 5, 9],
    [2, 5, 6, 6],
    [2, 5, 6, 7],
    [2, 5, 6, 8],
    [2, 5, 6, 9],
    [2, 5, 7, 7],
    [2, 5, 7, 8],
    [2, 5, 7, 9],
    [2, 5, 8, 8],
    [2, 5, 8, 9],
    [2, 5, 9, 9],
    [2, 6, 6, 6],
    [2, 6, 6, 7],
    [2, 6, 6, 8],
    [2, 6, 6, 9],
    [2, 6, 7, 7],
    [2, 6, 7, 8],
    [2, 6, 7, 9],
    [2, 6, 8, 8],
    [2, 6, 8, 9],
    [2, 6, 9, 9],
    [2, 7, 7, 7],
    [2, 7, 7, 8],
    [2, 7, 7, 9],
    [2, 7, 8, 8],
    [2, 7, 8, 9],
    [2, 7, 9, 9],
    [2, 8, 8, 8],
    [2, 8, 8, 9],
    [2, 8, 9, 9],
    [2, 9, 9, 9],
    [3, 3, 3, 3],
    [3, 3, 3, 4],
    [3, 3, 3, 5],
    [3, 3, 3, 6],
    [3, 3, 3, 7],
    [3, 3, 3, 8],
    [3, 3, 3, 9],
    [3, 3, 4, 4],
    [3, 3, 4, 5],
    [3, 3, 4, 6],
    [3, 3, 4, 7],
    [3, 3, 4, 8],
    [3, 3, 4, 9],
    [3, 3, 5, 5],
    [3, 3, 5, 6],
    [3, 3, 5, 7],
    [3, 3, 5, 8],
    [3, 3, 5, 9],
    [3, 3, 6, 6],
    [3, 3, 6, 7],
    [3, 3, 6, 8],
    [3, 3, 6, 9],
    [3, 3, 7, 7],
    [3, 3, 7, 8],
    [3, 3, 7, 9],
    [3, 3, 8, 8],
    [3, 3, 8, 9],
    [3, 3, 9, 9],
    [3, 4, 4, 5],
    [3, 4, 4, 6],
    [3, 4, 4, 7],
    [3, 4, 4, 8],
    [3, 4, 4, 9],
    [3, 4, 5, 5],
    [3, 4, 5, 6],
    [3, 4, 5, 7],
    [3, 4, 5, 8],
    [3, 4, 5, 9],
    [3, 4, 6, 6],
    [3, 4, 6, 7],
    [3, 4, 6, 8],
    [3, 4, 6, 9],
    [3, 4, 7, 7],
    [3, 4, 7, 8],
    [3, 4, 7, 9],
    [3, 4, 8, 8],
    [3, 4, 8, 9],
    [3, 4, 9, 9],
    [3, 5, 5, 5],
    [3, 5, 5, 6],
    [3, 5, 5, 7],
    [3, 5, 5, 8],
    [3, 5, 5, 9],
    [3, 5, 6, 6],
    [3, 5, 6, 7],
    [3, 5, 6, 8],
    [3, 5, 6, 9],
    [3, 5, 7, 7],
    [3, 5, 7, 8],
    [3, 5, 7, 9],
    [3, 5, 8, 8],
    [3, 5, 8, 9],
    [3, 5, 9, 9],
    [3, 6, 6, 6],
    [3, 6, 6, 7],
    [3, 6, 6, 8],
    [3, 6, 7, 7],
    [3, 6, 7, 8],
    [3, 6, 7, 9],
    [3, 6, 8, 8],
    [3, 6, 8, 9],
    [3, 6, 9, 9],
    [3, 7, 7, 7],
    [3, 7, 7, 8],
    [3, 7, 8, 8],
    [3, 7, 8, 9],
    [3, 7, 9, 9],
    [3, 8, 8, 8],
    [3, 8, 8, 9],
    [3, 8, 9, 9],
    [4, 4, 4, 5],
    [4, 4, 4, 6],
    [4, 4, 4, 7],
    [4, 4, 4, 8],
    [4, 4, 4, 9],
    [4, 4, 5, 5],
    [4, 4, 5, 6],
    [4, 4, 5, 7],
    [4, 4, 5, 8],
    [4, 4, 6, 6],
    [4, 4, 6, 7],
    [4, 4, 6, 8],
    [4, 4, 6, 9],
    [4, 4, 7, 8],
    [4, 4, 7, 9],
    [4, 4, 8, 8],
    [4, 4, 8, 9],
    [4, 4, 9, 9],
    [4, 5, 5, 5],
    [4, 5, 5, 6],
    [4, 5, 5, 7],
    [4, 5, 5, 9],
    [4, 5, 6, 6],
    [4, 5, 6, 7],
    [4, 5, 6, 8],
    [4, 5, 6, 9],
    [4, 5, 7, 7],
    [4, 5, 7, 8],
    [4, 5, 7, 9],
    [4, 5, 8, 8],
    [4, 5, 8, 9],
    [4, 5, 9, 9],
    [4, 6, 6, 6],
    [4, 6, 6, 7],
    [4, 6, 6, 8],
    [4, 6, 6, 9],
    [4, 6, 7, 7],
    [4, 6, 7, 8],
    [4, 6, 7, 9],
    [4, 6, 8, 8],
    [4, 6, 8, 9],
    [4, 6, 9, 9],
    [4, 7, 7, 7],
    [4, 7, 7, 8],
    [4, 7, 7, 9],
    [4, 7, 8, 8],
    [4, 7, 8, 9],
    [4, 7, 9, 9],
    [4, 8, 8, 8],
    [4, 8, 8, 9],
    [5, 5, 5, 5],
    [5, 5, 5, 6],
    [5, 5, 5, 7],
    [5, 5, 5, 8],
    [5, 5, 5, 9],
    [5, 5, 6, 6],
    [5, 5, 6, 7],
    [5, 5, 6, 8],
    [5, 5, 6, 9],
    [5, 5, 7, 7],
    [5, 5, 7, 8],
    [5, 5, 7, 9],
    [5, 5, 8, 8],
    [5, 5, 8, 9],
    [5, 5, 9, 9],
    [5, 6, 6, 6],
    [5, 6, 6, 7],
    [5, 6, 6, 9],
    [5, 6, 7, 7],
    [5, 6, 7, 8],
    [5, 6, 7, 9],
    [5, 6, 8, 8],
    [5, 6, 8, 9],
    [5, 6, 9, 9],
    [5, 7, 7, 7],
    [5, 7, 7, 8],
    [5, 7, 7, 9],
    [5, 7, 8, 9],
    [5, 8, 8, 8],
    [5, 8, 8, 9],
    [5, 9, 9, 9],
    [6, 6, 6, 8],
    [6, 6, 6, 9],
    [6, 6, 7, 8],
    [6, 6, 7, 9],
    [6, 6, 8, 8],
    [6, 6, 8, 9],
    [6, 6, 9, 9],
    [6, 7, 7, 9],
    [6, 7, 8, 8],
    [6, 7, 8, 9],
    [6, 7, 9, 9],
    [6, 8, 8, 9],
    [7, 7, 7, 8],
    [7, 7, 7, 9],
    [7, 8, 8, 9],
    [7, 8, 9, 9],
    [8, 8, 8, 8],
    [8, 8, 8, 9],
    [8, 9, 9, 9],
    [9, 9, 9, 9]
]
