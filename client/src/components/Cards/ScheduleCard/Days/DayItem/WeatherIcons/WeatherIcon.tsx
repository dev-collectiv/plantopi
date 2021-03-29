import * as React from 'react';
import styles from './WeatherIcon.module.scss';
import { IWeatherSummary } from 'types/weatherInterfaces';
import iconMap from './iconMap';

export interface Props {
  weatherData: IWeatherSummary;
}

const WeatherIcon: React.FC<Props> = ({ weatherData }) => {
  console.log(iconMap[weatherData.icon]);
  return (
    <div className={styles.iconContainer}>
      <img src={iconMap[weatherData.icon]} alt={`${weatherData.temperature} celsius`} />
      <p>{weatherData.temperature}</p>
    </div>
  );
};

export default WeatherIcon;
