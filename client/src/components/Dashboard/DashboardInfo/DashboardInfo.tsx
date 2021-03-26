import ScheduleCard from 'components/Cards/ScheduleCard/ScheduleCard';
import SensorCard from 'components/Cards/SensorCard/SensorCard';
import style from './DashboardInfo.module.scss';

const DashboardInfo: React.FC = () => {
  return (
    <div className={style.container}>
      <SensorCard id="1" name="Humidity" type="humidity" reading={25} position="smallFirst" />
      <SensorCard id="2" name="Temperature" type="temperature" reading={30} position="smallSecond" />
      <ScheduleCard position="bigCard" controllerId="pump1" />
    </div>
  );
};
export default DashboardInfo;
