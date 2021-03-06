interface ISensors {
  id?: number;
  type?: string;
  isActive?: boolean;
  iotId: string;
}

interface IControllers {
  id?: number;
  area?: string;
  type?: string;
  isActive?: boolean;
  iotId?: string;
}

interface IRespond {
  id: number;
  isActive?: boolean;
}
export interface IAddArea {
  user?: string;
  name: string;
  userId?: number;
  isActive?: boolean;
  sensors?: string[];
  latitude?: string;
  longitude?: string;
}

export interface IGetArea {
  id: number;
  name: string;
  user: string | null;
  isActive: boolean;
  sensors: ISensors[];
  controllers: IControllers[];
  latitude?: string;
  longitude?: string;
}

export interface IArea {
  id: number;
  name?: string;
  userId: number;
  user: string | null;
  isActive?: boolean;
  sensors: string[] | ISensors[];
  controllers?: IControllers[];
}

export interface IPatchArea {
  id?: number;
  name?: string;
  user?: string;
  isActive?: boolean;
  sensors?: ISensors[];
  controllers?: IControllers[];
  latitude?: string;
  longitude?: string;
}

export interface IPostRes {
  identifiers: IRespond[];
  generatedMaps: IRespond[];
  raw: IRespond[];
}
