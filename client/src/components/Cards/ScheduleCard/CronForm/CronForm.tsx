import React, { useState } from 'react';
import Select from '../Select/Select';
import styles from './CronForm.module.scss';
import { postCrons } from 'services/apiCrons/apiCrons';
const daysInWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
//const minutes = ['00', '15', '30', '45'];
const minutes = Array(60)
  .fill(null)
  .map((_, idx) => idx);

const hours = Array(12)
  .fill(null)
  .map((_, idx) => idx + 1);
const durationOptions = Array(60)
  .fill(null)
  .map((_, idx) => idx + 1);

const CronForm: React.FC = () => {
  const [cron, setCron] = useState<string[]>(Array(5).fill('*'));
  const [activeDays, setActiveDays] = useState<string[]>([]);
  const [scheduledCron, setScheduledCron] = useState<string>();
  const [duration, setDuration] = useState<number | string>(5);

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
    const _parsedScheduledCron = parseCronSchedule(cron, duration);

    const _cronScheduleString = convertToCronSchedule2(cron);

    postCrons({
      time: _cronScheduleString,
      controllerId: '1',
      action: {
        id: 'pump1',
        action: 'on',
        duration: +duration
      }
    });
    setScheduledCron(_parsedScheduledCron);
  }

  function handleDuration(label: string, value: number | string) {
    setDuration(value);
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
        <span>
          <Select options={hours} onChangeFn={handleSelectTimeFn} label="hours" />:
          <Select options={minutes} onChangeFn={handleSelectTimeFn} label="minutes" />
          <Select options={durationOptions} onChangeFn={handleDuration} label="duration" initialOption={duration} />
        </span>
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

const refArr = ['minutes', 'hours', 'weeks', 'months', 'days'];

function convertToCronSchedule(label: string, values: (string | number)[], currCron: string[]) {
  const newCron = [...currCron];
  const refIdx = refArr.indexOf(label);

  newCron[refIdx] = values.length < 1 ? '*' : values.join(',');

  return newCron;
}

//TODO -  find a more customizable way after MVP
function parseCronSchedule(cron: string[], duration: string | number): string {
  const _cron = [...cron];
  const cronObj: { [key: string]: string | number } = {};

  refArr.forEach((key, idx) => (cronObj[key] = _cron[idx]));

  const customTag: { [key: string]: string } = {
    minutes: '.hrs',
    hours: '@ .:',
    days: 'Every . '
  };

  const parsedSchedule = Object.entries(cronObj).map(([key, value], idx) => {
    if (value === '*') return `of every ${refArr[idx].slice(0, refArr[idx].length - 1)} `;

    const [left, right] = customTag[key].split('.');
    return `${left}${value}${right}`;
  });

  const scheduleString = parsedSchedule.reverse().join('') + ` for ${duration} secs`;

  return scheduleString;
}

function convertToCronSchedule2(cron: string[]) {
  const _cron = [...cron];

  _cron[_cron.length - 1] = _cron[_cron.length - 1]
    .split(',')
    .map((el) => daysInWeek.indexOf(el))
    .sort((a, b) => a - b)
    .join(',');

  return _cron.join(' ');
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
