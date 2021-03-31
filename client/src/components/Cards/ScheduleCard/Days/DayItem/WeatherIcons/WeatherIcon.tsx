import * as React from 'react';
import styles from './WeatherIcon.module.scss';
import { IWeatherSummary } from 'types/weatherInterfaces';
import iconMap from './iconMap';

export interface Props {
  weatherData: IWeatherSummary;
}

const WeatherIcon: React.FC<Props> = ({ weatherData }) => {
  return (
    <div className={styles.iconContainer}>
      {/* just did this temp fix while we decide on the night icons */}
      <img src={iconMap[weatherData.icon.replace('n', 'd')]} alt={`${weatherData.temperature} celsius`} />
      <p>{weatherData.temperature}</p>
    </div>
  );
};

export default WeatherIcon;
