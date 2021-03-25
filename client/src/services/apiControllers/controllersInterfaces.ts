export interface IAddControllers {
  areaId: string;
  type: string;
  isActive: boolean;
}

export interface IGetControllers {
  id: number;
  area: string;
  type: string;
  isActive: boolean;
}

interface IpostRespond {
  id: number;
  isActive?: boolean;
}

export interface IPostControllerRespond {
  identifiers: IpostRespond[];
  generatedMaps: IpostRespond[];
  raw: IpostRespond[];
}

export interface IPatchControllers {
  id?: number;
  area?: string;
  type?: string;
  isActive?: boolean;
}
