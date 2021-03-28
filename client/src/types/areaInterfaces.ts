interface ISensors {
  id?: number;
  type?: string;
  isActive?: boolean;
}

interface IControllers {
  id?: number;
  area?: string;
  type?: string;
  isActive?: boolean;
}

interface IRespond {
  id: number;
  isActive?: boolean;
} 
export interface IAddArea {
  userId: number;
  isActive?: boolean;
  sensors:string[]
}

export interface IGetArea {
  id: number;
  user: string | null;
  isActive: boolean;
  sensors: ISensors[];
  controllers: IControllers[];
}

export interface IPatchArea {
  id?: number;
  user?: string;
  isActive?: boolean;
  sensors?: ISensors[];
  controllers?: IControllers[];
}

export interface IPostRes {
  identifiers: IRespond[];
  generatedMaps: IRespond[];
  raw: IRespond[];
}
