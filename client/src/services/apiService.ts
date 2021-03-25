import { IAddArea, IAddControllers, IAddSensors, IAddUser, IGetArea, IGetControllers, IGetSensors, IGetUser } from './interfaces';
const urlBase = 'http://localhost:3001'; //TODO .env

function apiRequest(method: string, option?: RequestInit): Promise<any> {
  // TODO no any
  return fetch(urlBase + method, option)
    .then((res) => (res.status <= 400 ? res : Promise.reject()))
    .then((res) => (res.status === 204 ? res : res.json()))
    .catch((e) => {
      console.log(e);
    });
}

function getArea(): Promise<IGetArea[]> {
  return apiRequest('/areas');
}
function getControllers(endpoint: string): Promise<IGetControllers[]> {
  return apiRequest('/controllers');
}
function getSensors(): Promise<IGetSensors[]> {
  return apiRequest('/sensors');
}
function getUser(): Promise<IGetUser[]> {
  return apiRequest('/users');
}

function postArea(body: IAddArea): Promise<void> {
  return apiRequest('/areas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
}

function postController(body: IAddControllers): Promise<void> {
  return apiRequest('/controllers', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
}

function postSensor(body: IAddSensors): Promise<void> {
  return apiRequest('/sensors', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
}

function postUser(body: IAddUser): Promise<void> {
  return apiRequest('/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
}

function deleteArea(id: number): Promise<void> {
  const httpOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(id)
  };
  return apiRequest(`/areas/:${id}`, httpOptions);
}

function deleteController(id: number): Promise<any> {
  //TODO no any
  const httpOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(id)
  };
  return apiRequest(`/controllers/:${id}`, httpOptions);
}
function deleteSensor(id: number): Promise<any> {
  //TODO no any
  const httpOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(id)
  };
  return apiRequest(`/sensors/:${id}`, httpOptions);
}
function deleteUser(id: number): Promise<any> {
  //TODO no any
  const httpOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(id)
  };
  return apiRequest(`/users/:${id}`, httpOptions);
}

function patchAreas(body: any, id: number): Promise<any> {
  //TODO no any
  const httpOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  };
  return apiRequest(`/areas/:${id}`, httpOptions);
}
function patchControllers(body: any, id: number): Promise<any> {
  //TODO no any
  const httpOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  };
  return apiRequest(`/controllers/:${id}`, httpOptions);
}

function patchSensors(body: any, id: number): Promise<any> {
  //TODO no any
  const httpOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  };
  return apiRequest(`/sensors/:${id}`, httpOptions);
}

function patchUsers(body: any, id: number): Promise<any> {
  //TODO no any
  const httpOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  };
  return apiRequest(`/users/:${id}`, httpOptions);
}

export const api = {
  patchUsers,
  patchSensors,
  patchControllers,
  patchAreas,
  deleteUser,
  deleteSensor,
  deleteController,
  deleteArea,
  getArea,
  getControllers,
  getSensors,
  getUser,
  postArea,
  postController,
  postSensor,
  postUser
};
