export type ShareType = "Global" | "Local"


export const random = (type: ShareType): number => {
    return type == "Global" ? g.game.random.generate() : g.game.localRandom.generate()
}
