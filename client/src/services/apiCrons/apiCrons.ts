import { IGetCrons, IAddCrons, ICron, IPatchCronsRes, IPatchCrons } from '../../types/cronsInterfaces';
import { apiRequest } from '../apiService';

function getCrons(): Promise<IGetCrons[]> {
  return apiRequest('/crons');
}

function postCrons(body: IAddCrons): Promise<ICron> {
  return apiRequest('/crons', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
}

function deleteCrons(id: string): Promise<void> {
  const httpOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(id)
  };
  return apiRequest(`/crons/:${id}`, httpOptions);
}

function patchCrons(body: IPatchCrons, id: string): Promise<IPatchCronsRes> {
  const httpOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  };
  return apiRequest(`/crons/:${id}`, httpOptions);
}

export { getCrons, postCrons, deleteCrons, patchCrons };
