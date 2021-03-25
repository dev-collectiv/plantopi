/* eslint-disable indent */
import React from 'react';
import ISensorCardProps from './ISensorCardProps';
import styles from './SensorCard.module.scss';

const SensorCard: React.FC<ISensorCardProps> = (props) => {
  const { name, type, reading } = props;
  let celsius = true; //TODO get this from the settings
  let reading_data: string = '';
  switch (type) {
    case 'temperature':
      reading_data = `${reading}º${celsius ? 'C' : 'F'}`;
      break;
    case 'humidity':
      reading_data = `${reading}%`;
      break;
  }

  return (
    <div className={`${styles.container} ${type === 'humidity' ? styles.humidity : styles.temperature}`}>
      <p className={`${styles.reading}`}>{reading_data}</p>
      <p className={`${styles.name}`}>{name}</p>
    </div>
  );
};

export default SensorCard;
