import * as React from 'react';
import { useState, useEffect } from 'react';
import styles from './Days.module.scss';
import DayItem from './DayItem/DayItem';
import { ICurrentWeather, IWeatherSummary } from 'types/weatherInterfaces';
import { getWeatherForTheWeek } from './Days.helper';

export interface Props {
  activeDays: number[];
  daysInWeek: string[];
  handleSelectDayFn: (idx: number, active: boolean) => void;
  currentWeather?: ICurrentWeather;
}

const Day: React.FC<Props> = ({ daysInWeek, activeDays, handleSelectDayFn, currentWeather }) => {
  let [weatherData, setWeatherData] = useState<IWeatherSummary[]>();

  useEffect(() => {
    async function initializeWeatherData(currentWeather: ICurrentWeather) {
      const weatherForTheWeek = await getWeatherForTheWeek(currentWeather);
      console.log(weatherForTheWeek);
      setWeatherData(weatherForTheWeek);
    }
    if (currentWeather) {
      try {
        initializeWeatherData(currentWeather);
      } catch (err) {
        console.log('Weekly weather data could not be fetched.');
      }
    }
  }, [currentWeather]);

  return (
    <div className={styles.dayContainer}>
      {daysInWeek.map((day, idx) => {
        const active: boolean = activeDays.includes(idx);
        return (
          <DayItem
            active={active}
            day={day}
            idx={idx}
            weatherData={weatherData && weatherData[idx]}
            handleSelectDayFn={handleSelectDayFn}
          />
        );
      })}
    </div>
  );
};

export default Day;
