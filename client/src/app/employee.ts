export interface Employee {
    name: string;
    position: string;
    level: Level;
    _id?: string;
}

export enum Level {
    JUNIOR = 0,
    MIDDLE = 1,
    SENIOR = 2
}