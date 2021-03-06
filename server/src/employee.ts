import * as mongodb from 'mongodb';

export interface Employee {
    name: string;
    position: string;
    level: Level;
    _id?: mongodb.ObjectId;
}

export enum Level {
    JUNIOR = 0,
    MIDDLE = 1,
    SENIOR = 2
}