interface Isensors {
  id?: number;
  type?: string;
  isActive?: boolean;
}

interface Icontrollers {
  id?: number;
  area?: string;
  type?: string;
  isActive?: boolean;
}

interface Irespond {
  id: number;
  isActive?: boolean;
}
export interface IAddArea {
  user: string;
  isActive: boolean;
}

export interface IGetArea {
  id: number;
  user: string | null;
  isActive: boolean;
  sensors: Isensors[];
  controllers: Icontrollers[];
}

export interface IPatchArea {
  id?: number;
  user?: string;
  isActive?: boolean;
  sensors?: Isensors[];
  controllers?: Icontrollers[];
}

export interface IPostRes {
  identifiers: Irespond[];
  generatedMaps: Irespond[];
  raw: Irespond[];
}
