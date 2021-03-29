import { apiRequest } from '../apiService';
import { ICurrentWeather } from 'types/weatherInterfaces';

export function fetchCurrentWeather (areaId: string): Promise<ICurrentWeather> {
  return apiRequest(`/areas/weather/${areaId}`);
}