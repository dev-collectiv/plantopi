import React from 'react';
import IScheduleCardProps from './IScheduleCardProps';
import styles from './ScheduleCard.module.scss';
import CronForm from 'components/Cards/ScheduleCard/CronForm/CronForm';

const ScheduleCard: React.FC<IScheduleCardProps> = (props) => {
  const { controllerId, position } = props;
  return (
    <div className={`${position && styles[position]} ${styles.card}`}>
      <CronForm />
    </div>
  );
};

export default ScheduleCard;
