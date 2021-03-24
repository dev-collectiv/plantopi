export interface IAddArea {
  user: string;
  isActive: boolean;
}
export interface IAddControllers {
  area: string;
  isActive: true;
}
export interface IAddSensors {
  area: string;
  isActive: boolean;
}
export interface IAddUser {
  firstName: string;
  lastName: string;
  isActive: boolean;
}

export interface IGetArea {
  _id: number;
  user: string;
  isActive: boolean;
}

export interface IGetControllers {
  _id: number;
  area: string;
  isActive: true;
}

export interface IGetSensors {
  _id: number;
  area: string[];
  isActive: boolean;
}

export interface IGetUser {
  _id: number;
  firstName: string;
  lastName: string;
  isActive: boolean;
}
