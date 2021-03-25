/* eslint-disable indent */
import React from 'react';
import ISensorCardProps from './ISensorCardProps';
import style from './SensorCard.module.scss';

const SensorCard: React.FC<ISensorCardProps> = (props) => {
  const { name, type, reading, position } = props;

  let celsius = true; //TODO get this from the settings

  let reading_data: { [key: string]: string } = {
    temperature: `${reading}º${celsius ? 'C' : 'F'}`,
    humidity: `${reading}%`
  };

  return (
    <div className={`${style[position]} ${style.card} ${style.smallCard}`}>
      <span className={style.smallCardContainer}>
        <h2 className={style.cardTitle}>{name}</h2>
        <h2 className={style.cardReading}>{reading_data[type]}</h2>
      </span>
    </div>
  );
};

export default SensorCard;
