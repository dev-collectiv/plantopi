import React, { useState } from 'react';
import Select from '../Select/Select';

import styles from './CronForm.module.scss';

const daysInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const minutes = ['00', '15', '30', '45'];
const hours = Array(12)
  .fill(null)
  .map((_, idx) => idx + 1);

const CronForm: React.FC = () => {
  const [cron, setCron] = useState<string[]>(Array(5).fill('*'));
  const [activeDays, setActiveDays] = useState<string[]>([]);
  const [scheduledCron, setScheduledCron] = useState<string>();

  function handleSelectDayFn(day: string, active: boolean) {
    let _activeDays;

    if (active) _activeDays = activeDays.filter((_day) => _day !== day);
    else _activeDays = [...activeDays, day];

    const _cron = convertToCronSchedule('days', _activeDays, cron);

    setCron(_cron);
    setActiveDays(_activeDays);
  }

  function handleSelectTimeFn(label: string, value: string | number) {
    const _cron = convertToCronSchedule(label, [value], cron);
    setCron(_cron);
  }

  function handleScheduleCron() {
    const _parsedScheduledCron = parseCronSchedule(cron);

    //this one goes to backend ->
    const _cronScheduleString = cron.join(' ');

    setScheduledCron(_parsedScheduledCron);
  }

  function renderCustomOptions() {
    return daysInWeek.map((day, idx) => {
      const active: boolean = activeDays.includes(day);
      return (
        <button
          value={day}
          key={day + idx}
          className={`${styles.dayButton} ${active && styles.activeButton}`}
          onClick={() => handleSelectDayFn(day, active)}
        >
          <span> {day.slice(0, 1)}</span>
        </button>
      );
    });
  }

  return (
    <div className={styles.container}>
      {/* <div className={styles.cronSelection}>
        <h2>Quick Set</h2>
      </div> */}

      <div className={styles.cronSelection}>
        <h2>Custom</h2>
        <span className={styles.customSelection}>{renderCustomOptions()}</span>
        <Select options={hours} onChangeFn={handleSelectTimeFn} label="hours" /> :
        <Select options={minutes} onChangeFn={handleSelectTimeFn} label="minutes" />
      </div>

      <div className={styles.cronSelection}>
        <h2>Scheduled Jobs</h2>
        {scheduledCron && <h3>{scheduledCron}</h3>}
      </div>

      <button className={styles.cronScheduleButton} onClick={handleScheduleCron}>
        <span>Schedule</span>
      </button>
    </div>
  );
};

export default CronForm;

const refArr = ['minutes', 'hours', 'days', 'weeks', 'months'];

function convertToCronSchedule(label: string, values: (string | number)[], currCron: string[]) {
  const newCron = [...currCron];
  const refIdx = refArr.indexOf(label);

  newCron[refIdx] = values.length < 1 ? '*' : values.join(',');

  return newCron;
}

//TODO -  find a more customizable way after MVP
function parseCronSchedule(cron: string[]): string {
  const _cron = [...cron];
  const cronObj: { [key: string]: string | number } = {};

  //slice up until the days since we are still not concerned with weeks and months
  refArr.slice(0, 3).forEach((key, idx) => (cronObj[key] = _cron[idx]));

  const customTag: { [key: string]: string } = {
    minutes: '.hrs',
    hours: '@ .:',
    days: 'Every . '
  };

  const parsedSchedule = Object.entries(cronObj).map(([key, value], idx) => {
    const [left, right] = customTag[key].split('.');
    return `${left}${value}${right}`;
  });

  const scheduleString = parsedSchedule.reverse().join('');

  return scheduleString;
}

// const quickOptionsObj = {
//   days: Array(4)
//     .fill(null)
//     .map((_, idx) => idx * 2),
//   hours: Array(14)
//     .fill(null)
//     .map((_, idx) => idx + 6)
// };

// function renderQuickOptions() {}
