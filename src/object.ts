export type Coords = {
    x: number;
    y: number;
    z: number;
}

export interface Object {
    position: Coords,
    orientation: Coords,
}