import React, { useState } from 'react';

import Day from '../Days/Days';
import Select from 'components/Select/Select';
import { Settings } from 'assets/index';

import { ICurrentWeather } from 'types/weatherInterfaces';
import { ICron } from 'types/cronsInterfaces';

import styles from './CronForm.module.scss';

const daysInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const refArr = ['minutes', 'hours', 'weeks', 'months', 'days'];

const durationOptions = Array(60)
  .fill(null)
  .map((_, idx) => idx + 1);

interface Props {
  currentWeather?: ICurrentWeather;
  controllerId: string;
  controllerTopic: string;
  handleScheduleCron: Function;
  scheduledCrons: ICron[];
  error: boolean;
}

const CronForm: React.FC<Props> = ({ currentWeather, controllerId, controllerTopic, handleScheduleCron, scheduledCrons, error }) => {
  const [cron, setCron] = useState<string[]>(Array(5).fill('*'));
  const [activeDays, setActiveDays] = useState<number[]>([]);
  const [duration, setDuration] = useState<number | string>(5);

  function handleSelectDayFn(dayIdx: number, active: boolean) {
    let _activeDays;

    if (!active) _activeDays = [...activeDays, dayIdx].sort((a, b) => a - b);
    else _activeDays = activeDays.filter((_dayIdx) => _dayIdx !== dayIdx);

    const _cron = convertToCronArray('days', _activeDays, cron);

    setCron(_cron);
    setActiveDays(_activeDays);
  }

  function handleSelectTimeFn(event: any) {
    const [hours, minutes] = event.target.value.split(':');

    //since the convertToCronArray is only designed to take one label at a time,
    //we first call it with the hours and then with the minutes
    const _cronHours = convertToCronArray('hours', [hours], cron);
    const _cron = convertToCronArray('minutes', [minutes], _cronHours);

    setCron(_cron);
  }

  const handleDuration = (label: string, value: number | string) => setDuration(value);

  return (
    <div className={styles.container}>
      <Settings className={styles.svg} />

      <div className={styles.cronPanelModule}>
        <h2>New Action</h2>
        <div className={styles.actionSelection}>
          <Day activeDays={activeDays} daysInWeek={daysInWeek} handleSelectDayFn={handleSelectDayFn} currentWeather={currentWeather} />
        </div>

        <div className={styles.timeAndDurationSelection}>
          <div>
            <h4 className={styles.selectionTags}>Time</h4>
            <input type="time" className={styles.timeSelect} onChange={handleSelectTimeFn}></input>
          </div>
          <div>
            <h4 className={styles.selectionTags}>Duration</h4>
            <Select options={durationOptions} onChangeFn={handleDuration} label="duration" initialOption={duration} />
          </div>
        </div>
      </div>

      <button className={styles.cronScheduleButton} onClick={() => handleScheduleCron(cron, duration)}>
        <span>Schedule</span>
      </button>

      {error && (
        <div className={styles.error}>
          <h3>There has been an error, please try again</h3>
        </div>
      )}
    </div>
  );
};

export default CronForm;

function convertToCronArray(label: string, values: (string | number)[], currCron: string[]) {
  const newCron = [...currCron];
  const refIdx = refArr.indexOf(label);

  newCron[refIdx] = values.length < 1 ? '*' : values.join(',');

  return newCron;
}
