import { Identifier } from 'typescript';

export interface IAddSensors {
  area: string;
  type: string;
  isActive: boolean;
}

interface Irespond {
  id: number;
  isActive?: boolean;
}
export interface IPostRespond {
  identifiers: Irespond[];
  generatedMaps: Irespond[];
  raw: Irespond[];
}

export interface IGetSensors {
  id: number;
  area: {
    id: number;
    isActive: boolean;
  };
  isActive: boolean;
  type: string;
}

export interface IPatchSensors {
  id?: Identifier;
  area?: string;
  type?: string;
  isActive?: boolean;
}
