import React from 'react';
import styles from './BottomCard.module.scss';

const BottomCard: React.FC = ({ children }) => {
  return <div className={`${styles.card}`}>{children}</div>;
};

export default BottomCard;
