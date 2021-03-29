export interface ICurrentWeather {
  lat: number,
  lon: number,
  timezone: string,
  timezone_offset: number,
  current: any,
  minutely: any,
  hourly: any,
  daily: any
}

export interface IHistoricalWeather {
  lat: number,
  lon: number,
  timezone: string,
  timezone_offset: number,
  current: any,
  hourly: any
}

export interface IWeatherSummary {
  temperature: number,
  icon: string
}