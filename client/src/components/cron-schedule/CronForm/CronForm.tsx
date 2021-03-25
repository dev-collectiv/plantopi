import React, { useState } from 'react';
import Select from '../Select/Select';

import styles from './CronForm.module.scss';

const CronForm: React.FC = () => {
  const [cron, setCron] = useState(null);
  const [activeDays, setActiveDays] = useState<string[]>([]);

  function onSelectDayFn(day: string, active: boolean) {
    if (active) {
      const _activeDays = activeDays.filter((_day) => _day !== day);
      setActiveDays(_activeDays);
    } else {
      const _activeDays = [...activeDays, day];
      setActiveDays(_activeDays);
    }
  }

  function onSelectFn(label: string, value: string | number) {
    console.log(label, value);
  }

  const daysInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const customOptionsObj = {
    hours: Array(12)
      .fill(null)
      .map((_, idx) => idx + 1),
    minutes: ['00', '15', '30', '45']
  };

  function renderCustomOptions() {
    return daysInWeek.map((day, idx) => {
      const active: boolean = activeDays.includes(day);
      return (
        <button
          value={day}
          key={day + idx}
          className={`${styles.dayButton} ${active && styles.activeButton}`}
          onClick={() => onSelectDayFn(day, active)}
        >
          <span> {day.slice(0, 1)}</span>
        </button>
      );
    });
  }

  const quickOptionsObj = {
    days: Array(4)
      .fill(null)
      .map((_, idx) => idx * 2),
    hours: Array(14)
      .fill(null)
      .map((_, idx) => idx + 6)
  };

  function renderQuickOptions() {}

  return (
    <div className={styles.container}>
      <div className={styles.cronSelection}>
        <h2>Quick Set</h2>
      </div>

      <div className={styles.cronSelection}>
        <h2>Custom</h2>
        <span className={styles.customSelection}>{renderCustomOptions()}</span>
        <Select options={customOptionsObj.hours} onChangeFn={onSelectFn} label="hours" /> :
        <Select options={customOptionsObj.minutes} onChangeFn={onSelectFn} label="minutes" />
      </div>

      <div className={styles.cronSelection}>
        <h2>Scheduled Jobs</h2>
        {/* <p>Every </p> */}
      </div>

      <button className={styles.cronScheduleButton}>
        <span>Schedule</span>
      </button>
    </div>
  );
};

export default CronForm;

function convertToCronSchedule(label: string, value: string | number, prevSchedule: string) {}
