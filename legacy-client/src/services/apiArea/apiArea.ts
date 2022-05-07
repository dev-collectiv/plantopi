import { apiRequest } from '../apiService';
import { IGetArea, IAddArea, IPatchArea, IPostRes } from '../../types/areaInterfaces';

function getAreas(): Promise<IGetArea[]> {
  return apiRequest('/areas');
}

function postArea(body: IAddArea): Promise<IPostRes> {
  return apiRequest('/areas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
}

function deleteArea(id: number): Promise<void> {
  const httpOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  };
  return apiRequest(`/areas/${id}`, httpOptions);
}

function patchAreas(body: IPatchArea, id: number): Promise<IPatchArea> {
  const httpOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  };
  return apiRequest(`/areas/:${id}`, httpOptions);
}

export const apiArea = {
  patchAreas,
  deleteArea,
  getAreas,
  postArea
};
