import { ICurrentWeather, IWeatherSummary } from 'types/weatherInterfaces';
import { fetchHistoricalWeather } from 'services/apiWeather/apiWeather';

// FETCHING FOR HARDCODED AREA 1 ONLY - SWAP WITH AREAID LATER

async function _getWeatherForPastDays (currentWeather: ICurrentWeather) {
  const todayInUnix = currentWeather.current.dt;
  const currentDay = new Date(Date.now()).getDay();
  const oneDayInUnixTime = 86400; // 1 day in seconds -- historical weather API uses unix time
  const weatherForPastDays = [];

  //TODO: HISTORICAL DATA IS ALLOWED TILL 5 DAYS AGO, NEED TO FILL IN WITH BLANK IF TODAY IS FRIDAY OR SATURDAY

  for (let i = 0; i < currentDay; i++) {
    const daysAgo = currentDay - i;
    const unixSecondsAgo = (daysAgo * oneDayInUnixTime);

    const weatherData = await fetchHistoricalWeather('1', (todayInUnix - unixSecondsAgo).toString());
    weatherForPastDays.push({temperature: Math.round(weatherData.current.temp), icon: weatherData.current.weather[0].icon});
  }

  return weatherForPastDays;
}

function _getWeatherForNextDays (currentWeather: ICurrentWeather) {
  const currentDay = new Date(Date.now()).getDay();
  const daysInWeek = 7;
  const weatherForNextDays = [];

  // daily forecast data from API includes the current day, so it has 8 elements
  for (let i = 1; i < daysInWeek - currentDay; i++) {
    const temperature = Math.round(currentWeather.daily[i].temp.day);
    const icon = currentWeather.daily[i].weather[0].icon;
    weatherForNextDays.push({temperature, icon});
  }

  return weatherForNextDays;
}

export async function getWeatherForTheWeek (currentWeather: ICurrentWeather): Promise<IWeatherSummary[]> {
  const weatherForPastDays = await _getWeatherForPastDays(currentWeather);
  const weatherForCurrentDay = {temperature: Math.round(currentWeather.current.temp), icon: currentWeather.current.weather[0].icon};
  const weatherForNextDays = _getWeatherForNextDays(currentWeather);

  return [...weatherForPastDays, weatherForCurrentDay, ...weatherForNextDays];
}