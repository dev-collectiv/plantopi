import TopCard from 'components/Cards/TopCard/TopCard';
import BottomCard from 'components/Cards/BottomCard/BottomCard';
import SensorCard from 'components/Cards/SensorCard/SensorCard';
import styles from './DashboardInfo.module.scss';
import CronForm from 'components/Cards/ScheduleCard/CronForm/CronForm';

const DashboardInfo: React.FC = () => {
  return (
    <div className={styles.container}>
      <TopCard>
        <SensorCard id="1" name="Humidity" type="humidity" reading={25} />
        <SensorCard id="2" name="Temperature" type="temperature" reading={30} />
      </TopCard>
      <BottomCard>
        <CronForm />
      </BottomCard>
    </div>
  );
};
export default DashboardInfo;
