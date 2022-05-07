import Chart from '@components/Cards/ChartCard/Chart/Chart';
import React from 'react';
import style from './ChartCardStyle.module.scss';
import IChartProps from './Chart/IChartProps';

const ChartCard: React.FC<IChartProps> = (props) => {
  return (
    <div className={`${style.card} ${props.position && style[props.position]}`}>
      <Chart data={props.data} options={props.options} />
    </div>
  );
};

export default ChartCard;
