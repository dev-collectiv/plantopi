import React, { useEffect, useState, useContext } from 'react';
import { SocketContext } from 'context/socket';

import IIrrigationCardProps from './IIrrigationCard';
import Select from '../ScheduleCard/Select/Select';
import { gsap } from 'gsap';

import styles from './IrrigationCard.module.scss';

import { Stop, Start, Plant } from 'assets';

const durationOptions = Array(60)
  .fill(null)
  .map((_, idx) => idx + 1);

const IrrigationCard: React.FC<IIrrigationCardProps> = (props) => {
  const socket = useContext(SocketContext);

  const { controllerId } = props;
  const [duration, setDuration] = useState<number | string>(5);

  let [irrigating, setIrrigating] = useState<boolean>(false);

  function handleDuration(label: string, value: number | string) {
    setDuration(value);
  }

  function clickHandler(e: React.FormEvent) {
    e.preventDefault();
    socket.emit('action', { id: controllerId, action: 'on', duration: duration });
    setIrrigating(true); // TODO receive web socket with response before changing 'irrigating' variable
  }

  function abortIrrigation() {
    socket.emit('action', { id: controllerId, action: 'off', duration: 0 });
    setIrrigating(false); // TODO receive web socket with response before changing 'irrigating' variable
  }

  // useEffect(() => {
  //   const defaults = {
  //     ease: 'Sine.easeInOut',
  //     repeat: -1,
  //     yoyo: true,
  //     duration: 2
  //   };

  //   const leavesDefaults = {
  //     ...defaults,
  //     transformOrigin: 'center center'
  //   };

  //   gsap.to('.top-dark-leaves', {
  //     ...leavesDefaults,
  //     rotate: '5deg',
  //     x: 7
  //   });

  //   gsap.to('.top-light-leaves', {
  //     ...leavesDefaults,
  //     rotate: '-3deg'
  //   });

  //   gsap.to('.trunk', {
  //     ...defaults,
  //     transformOrigin: 'center bottom',
  //     rotate: '2deg'
  //   });

  //   return () => {
  //     gsap.killTweensOf('*');
  //   };
  // }, []);

  // useEffect(() => {
  //   if (irrigating) {
  //     gsap.fromTo(
  //       '.drop',
  //       {
  //         stagger: 0.5,
  //         y: -400,
  //         opacity: 0.8
  //       },
  //       {
  //         stagger: 0.5,
  //         duration: 2,
  //         repeat: -1,
  //         y: 400,
  //         opacity: 0,
  //         ease: 'Power1.easeIn'
  //       }
  //     );
  //   } else {
  //     gsap.set('.drop', { opacity: 0 });
  //   }

  //   return () => {
  //     gsap.killTweensOf('.drop');
  //   };
  // }, [irrigating]);

  return (
    <div className={styles.card}>
      <Plant className={`${styles.picture} ${styles.svg}`} />

      <form className={styles.form} action="" onSubmit={clickHandler}>
        <div className={styles.formElement}>
          <label htmlFor="duration">Duration in seconds:</label>
          <Select options={durationOptions} onChangeFn={handleDuration} label="duration" initialOption={duration} />
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
