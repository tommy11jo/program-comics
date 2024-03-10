export const UP = [0, 1] as const
export const DOWN = [0, -1] as const
export const RIGHT = [1, 0] as const
export const LEFT = [-1, 0] as const
export const CENTER = [0, 0] as const

export type DirType = typeof UP | typeof DOWN | typeof RIGHT | typeof LEFT
export type HAlignType = typeof RIGHT | typeof LEFT | typeof CENTER
export type VAlignType = typeof UP | typeof DOWN | typeof CENTER

export type HPosType = typeof RIGHT | typeof LEFT
export type VPosType = typeof UP | typeof DOWN
