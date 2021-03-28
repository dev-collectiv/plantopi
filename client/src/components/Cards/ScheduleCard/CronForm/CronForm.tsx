import React, { useEffect, useState } from 'react';

import { postCrons, getCrons, patchCrons, deleteCrons } from 'services/apiCrons/apiCrons';
import Select from '../Select/Select';
import { IAddCrons, ICron } from 'types/cronsInterfaces';

import { Settings } from 'assets/index';
import styles from './CronForm.module.scss';

const daysInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const refArr = ['minutes', 'hours', 'weeks', 'months', 'days'];

const durationOptions = Array(60)
  .fill(null)
  .map((_, idx) => idx + 1);

const CronForm: React.FC = () => {
  const [cron, setCron] = useState<string[]>(Array(5).fill('*'));
  const [activeDays, setActiveDays] = useState<number[]>([]);
  const [scheduledCrons, setScheduledCrons] = useState<ICron[]>([]);
  const [duration, setDuration] = useState<number | string>(5);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    getCrons().then((crons) => {
      if (!crons) return;
      else setScheduledCrons(crons);
    });
  }, []);

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

  async function handleScheduleCron() {
    parseCronSchedule(cron, duration);

    const _cronTimeString = cron.join(' ');

    const addCronObj: IAddCrons = {
      time: _cronTimeString,
      controllerId: '1',
      action: {
        id: 'pump1',
        action: 'on',
        duration: +duration
      }
    };

    postCrons(addCronObj).then((cron) => {
      if (!cron) {
        setError(true);
        return;
      }

      setScheduledCrons([...scheduledCrons, cron]);
    });
  }

  function handleDeleteCron(id: string) {
    deleteCrons(id).then((res) => {
      if (!res) return;
      if (res.affected === 1) {
        const _scheduledCrons = scheduledCrons.filter((cron) => cron.id !== id);
        setScheduledCrons(_scheduledCrons);
      }
    });
  }

  function renderScheduledCrons() {
    return scheduledCrons.map((cron) => {
      const { time, id, action } = cron;
      const timeArr = time.split(' ');
      const { duration } = action;

      const parsedString = parseCronSchedule(timeArr, duration);

      return (
        <span className={styles.scheduledCron} key={id}>
          <h3>{parsedString}</h3>
          <button className={styles.deleteCron} onClick={() => handleDeleteCron(id)}>
            X
          </button>
        </span>
      );
    });
  }

  function handleDuration(label: string, value: number | string) {
    setDuration(value);
  }

  function renderCustomOptions() {
    return daysInWeek.map((day, idx) => {
      const active: boolean = activeDays.includes(idx);

      return (
        <button
          key={day + idx}
          className={`${styles.dayButton} ${active && styles.activeButton}`}
          onClick={() => handleSelectDayFn(idx, active)}
        >
          {day.slice(0, 1)}
        </button>
      );
    });
  }

  return (
    <div className={styles.container}>
      <Settings className={styles.svg} />

      <div className={styles.cronPanelModule}>
        <h2>New Action</h2>
        <span className={styles.actionSelection}>
          <h4 className={styles.selectionTags}>Day</h4>
          {renderCustomOptions()}
        </span>
        <span className={styles.actionSelection}>
          <h4 className={styles.selectionTags}>Time</h4>
          <input type="time" className={styles.timeSelect} onChange={handleSelectTimeFn}></input>
          <h4 className={styles.selectionTags}>Duration</h4>
          <Select options={durationOptions} onChangeFn={handleDuration} label="duration" initialOption={duration} />
        </span>
      </div>

      <div className={`${styles.cronPanelModule} ${styles.scrollPanelModule}`}>
        <h2>Scheduled Actions</h2>
        {renderScheduledCrons()}
      </div>

      <button className={styles.cronScheduleButton} onClick={handleScheduleCron}>
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

function parseCronSchedule(cron: string[], duration: string | number) {
  const _cron = [...cron];
  const cronObj: { [key: string]: string } = {};

  refArr.forEach((key, idx) => (cronObj[key] = _cron[idx]));

  // the dot is a placeholder for the label [hours, days, etc]
  const customTag: { [key: string]: string } = {
    minutes: '.hrs',
    hours: '@ .:',
    days: 'Every . '
  };

  const parsedSchedule = Object.entries(cronObj).map(([key, value], idx) => {
    if (value === '*') return `${idx === 0 ? '' : 'of'} every ${refArr[idx].slice(0, refArr[idx].length - 1)} `;
    if (key === 'days') value = parseStringOfDays(value);

    const [left, right] = customTag[key].split('.');

    return `${left}${value}${right}`;
  });

  const scheduleString = parsedSchedule.reverse().join('') + ` for ${duration} secs`;

  return scheduleString;
}

function parseStringOfDays(str: string): string {
  const _str = str
    .split(',')
    .map((val) => daysInWeek[+val])
    .join(', ');

  return _str;
}
