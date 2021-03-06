export interface IAddCrons {
  time: string;
  controllerId: string;
  action: MqttRequestDto;
}

interface MqttRequestDto {
  id: string;
  action: string;
  duration: number;
}

export interface ICron {
  id: string;
  action: MqttRequestDto;
  time: string;
  isActive: boolean;
  controllerId?: string;
}

interface IAction {
  id: string;
  action: string;
  duration: string;
}

export interface IGetCrons {
  id: string;
  time: string;
  action: MqttRequestDto; //mqttrequestdto once parsed
  isActive: boolean;
}

export interface IPostCronsRes {
  identifiers: IPostRes[];
  generatedMaps: IPostRes[];
  raw: IPostRes[];
}

interface IPostRes {
  id: string;
  isActive?: boolean;
}

export interface IPatchCrons {
  id?: string;
  time?: string;
  controllerId?: string;
  action?: Iaction;
}

interface Iaction {
  id?: string;
  action?: string;
  duration: number;
}

export interface IPatchCronsRes {
  id: string;
  time?: string;
  controller?: string;
  action?: string;
}

export interface IDeleteCron {
  affected: number;
}
