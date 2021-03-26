import React, { useState } from 'react';
import IIrrigationCardProps from './IIrrigationCard';
import styles from './IrrigationCard.module.scss';
// import io from 'socket.io-client';

import { Stop, Start, IrrigatingPlant, Plant } from 'assets';

// let socket = io(`${process.env.REACT_APP_SOCKET_HOST}:${process.env.REACT_APP_SOCKET_PORT}`);

const IrrigationCard: React.FC<IIrrigationCardProps> = (props) => {
  const { controllerId } = props;
  let [duration, setDuration] = useState<number>(0);
  let [irrigating, setIrrigating] = useState<boolean>(false);

  function inputChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setDuration(+e.target.value);
  }

  function clickHandler(e: React.FormEvent) {
    e.preventDefault();
    // socket.emit('action', { id: controllerId, action: 'on', duration: duration });
    setIrrigating(true); // TODO receive web socket with response before changing 'irrigating' variable
  }

  function abortIrrigation() {
    // socket.emit('action', { id: controllerId, action: 'off', duration: 0 });
    setIrrigating(false); // TODO receive web socket with response before changing 'irrigating' variable
  }

  return (
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
  );
};

export default IrrigationCard;
