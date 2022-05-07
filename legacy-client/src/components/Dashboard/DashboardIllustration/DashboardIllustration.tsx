import React, { useEffect, useState, useContext } from 'react';
import { SocketContext } from 'context/socket';
import Select from '@components/Select/Select';
import { gsap } from 'gsap';
import { MqttStatusDto } from 'types/controllersInterfaces';

import styles from './DashboardIllustration.module.scss';

import { Drop, Plant, DropStop } from 'assets';

const durationOptions = Array(60)
  .fill(null)
  .map((_, idx) => idx + 1);

const DashboardIllustration: React.FC<{ controllerId: string }> = ({ controllerId }) => {
  const socket = useContext(SocketContext);

  const [isIrrigating, setIsIrrigating] = useState<boolean>(false);
  const [duration, setDuration] = useState<number | string>(5);

  const handleDuration = (label: string, value: number | string): void => setDuration(value);

  function handleIrrigate(e: React.FormEvent): void {
    if (!isIrrigating) {
      socket.emit('action', { id: 'pump' + controllerId, action: 'on', duration: duration });
    } else {
      socket.emit('action', { id: 'pump' + controllerId, action: 'off', duration: 0 });
    }
    // TODO receive web socket with response before changing 'irrigating' variable
  }

  useEffect(() => {
    gsap.to('.top-leaves', {
      duration: 2,
      transformOrigin: 'center center',
      rotate: '5deg',
      x: 7,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    gsap.to('.bottom-leaves', {
      duration: 2,
      transformOrigin: 'center center',
      rotate: '-3deg',
      x: 4,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    gsap.to('.trunk', {
      duration: 2,
      transformOrigin: 'center bottom',
      rotate: '2deg',
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    return () => {
      gsap.killTweensOf('*');
    };
  }, []);

  useEffect(() => {
    function statusHandler (data: MqttStatusDto) {
      let currentControllerId = controllerId;
      console.log('received status: ' + data.status + ' for ' + data.id);
      if (data.id === 'pump' + currentControllerId) {
        setIsIrrigating(data.status === 'on' ? true : false);
      }
    }
    socket.on('status', statusHandler);

    return () => {socket.removeListener('status', statusHandler);};
  }, [controllerId]);

  useEffect(() => {
    if (isIrrigating) {
      gsap.fromTo(
        '.drop-1',
        {
          y: -800,
          opacity: 1
        },
        {
          stagger: 0.05,
          duration: 1.75,
          y: 200,
          opacity: 0,
          repeat: -1,
          ease: 'Sine.easeIn'
        }
      );

      gsap.fromTo(
        '.drop-2',
        {
          y: -800,
          opacity: 1
        },
        {
          stagger: 0.05,
          duration: 2,
          y: 200,
          opacity: 0,
          repeat: -1,
          ease: 'Sine.easeIn'
        }
      );
    } else {
      gsap.set('.drop-1, .drop-2', { opacity: 0 });
    }

    return () => {
      gsap.killTweensOf('.drop-1, .drop-2');
    };
  }, [isIrrigating]);

  return (
    <div className={styles.container}>
      <div className={styles.illustrationContainer}>
        <Plant className={styles.plant} />
      </div>

      <div className={styles.irrigateOptionsContainer}>
        <div className={styles.durationContainer}>
          <label htmlFor="duration" className={styles.label}>
            DURATION
          </label>
          <p>|</p>
          <Select options={durationOptions} onChangeFn={handleDuration} label="duration" initialOption={duration} />
        </div>

        <div onClick={handleIrrigate} className={styles.irrigateButton}>
          {isIrrigating ? <DropStop className={styles.svg} /> : <Drop className={styles.svg} />}
        </div>
      </div>
    </div>
  );
};

export default DashboardIllustration;
