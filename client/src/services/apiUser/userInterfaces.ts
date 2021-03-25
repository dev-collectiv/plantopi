export interface IAddUserInput {
  firstName: string;
  lastName: string;
  isActive: boolean;
}

export interface IGetUser {
  id: number;
  firstName: string;
  lastName: string;
  isActive: boolean;
  areas: [];
}

interface Isensor {
  id: number;
  isActive?: boolean;
}
export interface IAddUserRespond {
  identifiers: Isensor[];
  generatedMaps: Isensor[];
  raw: Isensor[];
}

export interface IPathUserInput {
  id: number;
  firstName?: string;
  lastName?: string;
  isActive?: boolean;
}
