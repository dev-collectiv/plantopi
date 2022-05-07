import { IGetSensors, IAddSensors, IPostRespond, IPatchSensors } from '../../types/sensorsInterfaces';
import { apiRequest } from '../apiService';

function getSensors(): Promise<IGetSensors[]> {
  return apiRequest('/sensors');
}

function postSensor(body: IAddSensors): Promise<IPostRespond> {
  return apiRequest('/sensors', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
} 

function deleteSensor(id: number): Promise<void> {
  const httpOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(id)
  };
  return apiRequest(`/sensors/:${id}`, httpOptions);
}

function patchSensors(body: IPatchSensors, id: number): Promise<IPatchSensors> {
  const httpOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  };
  return apiRequest(`/sensors/:${id}`, httpOptions);
}

export const apiSensors = {
  patchSensors,
  deleteSensor,
  getSensors,
  postSensor
};
