import { apiRequest } from '../apiService';
import { ICurrentWeather, IHistoricalWeather } from 'types/weatherInterfaces';

export function fetchCurrentWeather (areaId: string): Promise<ICurrentWeather> {
  return apiRequest(`/areas/weather/${areaId}`);
}

export function fetchHistoricalWeather (areaId: string, unixDate: string): Promise<IHistoricalWeather> {
  return apiRequest(`/areas/weather/${areaId}/${unixDate}`);
}