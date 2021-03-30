import { useState } from 'react';

import { ICron, IPatchCrons } from 'types/cronsInterfaces';
import { Delete } from 'assets';

import styles from './ScheduledCron.module.scss';

const refArr = ['minutes', 'hours', 'weeks', 'months', 'days'];
const daysInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

interface IScheduledCron {
  cron: ICron;
  handleDeleteCron: Function;
  handlePatchCron: Function;
}

const ScheduledCron: React.FC<IScheduledCron> = ({ cron, handleDeleteCron, handlePatchCron }) => {
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [cronTimeArr, setCronTimeArr] = useState<string[]>(cron.time.split(' '));
  const { time, id, action } = cron;
  const { duration } = action;

  //this string is the one displayed in the top part and cannot be changed
  const parsedString = parseCronSchedule(cron.time.split(' '), duration);

  function handleSelectTimeFn(event: any) {
    const [hours, minutes] = event.target.value.split(':');

    //since the convertToCronArray is only designed to take one label at a time,
    //we first call it with the hours and then with the minutes
    const _cronHours = convertToCronArray('hours', [hours], cronTimeArr);
    const _cron = convertToCronArray('minutes', [minutes], _cronHours);

    setCronTimeArr(_cron);
  }

  function handleUpdate() {
    const updateObj = {
      time: cronTimeArr.join(' ')
    };

    handlePatchCron(id, updateObj);
    setIsUpdating(false);
  }

  //TODO - close update panel
  return (
    <div className={`${styles.container} ${isUpdating && styles.containerUpdating}`}>
      <div onClick={() => !isUpdating && setIsUpdating(true)} className={styles.scheduledCron}>
        <h3>{parsedString}</h3>

        {isUpdating && (
          <div className={styles.updateContainer}>
            <input
              type="time"
              onChange={handleSelectTimeFn}
              className={styles.timeSelect}
              defaultValue={`${cronTimeArr[1]}:${cronTimeArr[0]}`}
            />
            <button onClick={handleUpdate}>UPDATE</button>
            <button onClick={() => setIsUpdating(false)}>CANCEL</button>
          </div>
        )}
      </div>
      <Delete className={styles.svg} onClick={() => handleDeleteCron(id)} />
    </div>
  );
};

export default ScheduledCron;

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
    //TODO -  find another way to do this
    if (key === 'months' || key === 'weeks') return null;

    //slice the S at the end of the refArr[idx]
    if (value === '*') return `Every ${refArr[idx].slice(0, refArr[idx].length - 1)} `;
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
