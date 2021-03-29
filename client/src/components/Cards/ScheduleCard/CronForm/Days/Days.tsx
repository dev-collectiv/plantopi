import * as React from 'react';
import { useState } from 'react';
import styles from './Days.module.scss';
import DayItem from './DayItem/DayItem';

export interface Props {
  activeDays: number[],
  daysInWeek: string[],
  handleSelectDayFn: (idx: number, active: boolean) => void
}

const Day: React.FC<Props> = ({daysInWeek, activeDays, handleSelectDayFn}) => {
  return (
    <div className={styles.dayContainer}>
      {daysInWeek.map((day, idx) => {
        const active: boolean = activeDays.includes(idx);
        return (<DayItem active={active} day={day} idx={idx} handleSelectDayFn={handleSelectDayFn}/>);
      })}
    </div>
  );
};


export default Day;