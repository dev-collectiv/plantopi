import SensorCard from 'components/Cards/SensorCard/SensorCard';
import Chart from 'components/Chart/Chart';
import style from './DashboardInfo.module.scss';

const DashboardInfo: React.FC = () => {
  return (
    <div className={style.container}>
      <div className={style.gridContainer}>
        <SensorCard id="1" name="Humidity" type="humidity" reading={25} position="smallFirst" />
        <SensorCard id="2" name="Temperature" type="temperature" reading={30} position="smallSecond" />
        <div className={`${style.card} ${style.bigCard}`}>
          <Chart />
        </div>
      </div>
    </div>
  );
};
export default DashboardInfo;
