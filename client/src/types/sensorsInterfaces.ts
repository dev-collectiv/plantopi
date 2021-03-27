export interface IAddSensors {
  area: string;
  type: string;
  isActive: boolean;
}

interface IRespond {
  id: number;
  isActive?: boolean;
}
export interface IPostRespond {
  identifiers: IRespond[];
  generatedMaps: IRespond[];
  raw: IRespond[];
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
  id?: number;
  area?: string;
  type?: string;
  isActive?: boolean;
}
