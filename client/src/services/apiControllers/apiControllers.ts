import { IGetControllers, IAddControllers, IPostControllerRespond, IPatchControllers } from './controllersInterfaces';
import { apiRequest } from '../apiService';

function getControllers(): Promise<IGetControllers[]> {
  return apiRequest('/controllers');
}

function postController(body: IAddControllers): Promise<IPostControllerRespond> {
  return apiRequest('/controllers', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
}

function deleteController(id: number): Promise<void> {
  const httpOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(id)
  };
  return apiRequest(`/controllers/:${id}`, httpOptions);
}

function patchControllers(body: IPatchControllers, id: number): Promise<IPatchControllers> {
  const httpOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  };
  return apiRequest(`/controllers/:${id}`, httpOptions);
}

export const apiControllers = {
  patchControllers,
  deleteController,
  getControllers,
  postController
};
