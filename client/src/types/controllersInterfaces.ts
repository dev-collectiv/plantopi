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

interface IPostRespond {
  id: number;
  isActive?: boolean;
}

export interface IPostControllerRespond {
  identifiers: IPostRespond[];
  generatedMaps: IPostRespond[];
  raw: IPostRespond[];
}

export interface IPatchControllers {
  id?: number;
  area?: string;
  type?: string;
  isActive?: boolean;
}

export interface MqttStatusDto {
  id: string,
  status: 'on' | 'off',
  time: number
}