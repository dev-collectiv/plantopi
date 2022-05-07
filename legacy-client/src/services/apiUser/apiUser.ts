import { IGetUser, IAddUserInput, IAddUserRespond, IPathUserInput } from '../../types/userInterfaces';
import { apiRequest } from '../apiService';

function getUser(): Promise<IGetUser[]> {
  return apiRequest('/users');
}

function postUser(body: IAddUserInput): Promise<IAddUserRespond> {
  return apiRequest('/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
}

function deleteUser(id: number): Promise<void> {
  const httpOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(id)
  };
  return apiRequest(`/users/:${id}`, httpOptions);
}

function patchUsers(body: IPathUserInput, id: number): Promise<IPathUserInput> {
  const httpOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  };
  return apiRequest(`/users/:${id}`, httpOptions);
}

export const apiUser = {
  patchUsers,
  deleteUser,
  getUser,
  postUser
};
