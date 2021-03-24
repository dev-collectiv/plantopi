import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import styles from './DashboardIllustration.module.scss';
import { Stop, Start, IrrigatingPlant, Plant } from 'assets';

let socket = io('http://localhost:3002');

const DashboardIllustration: React.FC = () => {
  let [duration, setDuration] = useState<number>();
  let [irrigating, setIrrigating] = useState<boolean>(false);

  function inputChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setDuration(+e.target.value);
  }

  function clickHandler(e: React.FormEvent) {
    e.preventDefault();
    socket.emit('action', duration);
    setIrrigating(true);
    setDuration(0);
  }

  function abortIrrigation() {
    setIrrigating(false);
    setDuration(0);
    socket.emit('action', 0);
  }
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {irrigating ? (
          <IrrigatingPlant className={`${styles.picture} ${styles.svg}`} />
        ) : (
          <Plant className={`${styles.picture} ${styles.svg}`} />
        )}

        <form className={styles.form} action="" onSubmit={clickHandler}>
          <div className={styles.formElement}>
            <label htmlFor="duration">Duration in seconds:</label>
            <input type="number" id="duration" name="duration" min="0" max="300" value={duration} onChange={inputChangeHandler} />
          </div>
          <div className={`${styles.formElement}`}>
            <Start onClick={clickHandler} className={`${styles.button} ${styles.svg}`} />
            <Stop onClick={abortIrrigation} className={`${styles.button} ${styles.svg}`} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default DashboardIllustration;
