import React from 'react';
import styles from './DashboardIllustration.module.scss';
import IrrigationCard from 'components/Cards/IrrigationCard/IrrigationCard';

const DashboardIllustration: React.FC = () => {
  return (
    <div className={styles.container}>
      <IrrigationCard controllerId="pump1" />
    </div>
  );
};

export default DashboardIllustration;
