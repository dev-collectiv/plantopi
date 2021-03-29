import * as React from 'react';
import { useState } from 'react';
import styles from './WeatherIcon.module.scss';

export interface Props {

}

const WeatherIcon: React.FC<Props> = (props: Props) => {
  return (
    <div className={styles.iconContainer}>aa</div>
  );
};

export default WeatherIcon;