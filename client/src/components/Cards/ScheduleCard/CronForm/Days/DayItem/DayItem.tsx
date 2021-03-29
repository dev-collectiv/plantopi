import * as React from 'react';
import WeatherIcon from './WeatherIcons/WeatherIcon';
import styles from './DayItem.module.scss';

export interface Props {
  active: boolean,
  day: string,
  idx: number,
  handleSelectDayFn: (idx: number, active: boolean) => void
}

const DayItem: React.FC<Props> = ({active, day, idx, handleSelectDayFn}) => {
  return (
    <div className={styles.dayContainer}>
      <button
        key={day + idx}
        className={`${styles.dayButton} ${active && styles.activeButton}`}
        onClick={() => handleSelectDayFn(idx, active)}
      >
        {day.slice(0, 1)}
      </button>
      <WeatherIcon/>
    </div>
  );
};

export default DayItem;