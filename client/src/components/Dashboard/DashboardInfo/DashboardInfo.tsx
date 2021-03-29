import TopCard from 'components/Cards/TopCard/TopCard';
import BottomCard from 'components/Cards/BottomCard/BottomCard';
import SensorCard from 'components/Cards/SensorCard/SensorCard';
import styles from './DashboardInfo.module.scss';
import CronForm from 'components/Cards/ScheduleCard/CronForm/CronForm';
import { fetchCurrentWeather } from 'services/apiWeather/apiWeather';
import { useEffect, useState } from 'react';
import { ICurrentWeather } from 'types/weatherInterfaces';

const DashboardInfo: React.FC = () => {
  let [currentWeather, setCurrentWeather] = useState<ICurrentWeather>();


  // AREA ID HARDCODED IN CURRENT WEATHER FETCH BELOW - SWAP WITH AREAID LATER

  useEffect(() => {
    const initializeWeather = async () => {
      const weather = await fetchCurrentWeather ('1');
      setCurrentWeather(weather);
    };

    initializeWeather();
  }, []);


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
