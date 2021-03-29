import React from 'react';
import { IAddArea, IGetArea } from 'types/areaInterfaces';

import TopCard from 'components/Cards/TopCard/TopCard';
import BottomCard from 'components/Cards/BottomCard/BottomCard';
import SensorCard from 'components/Cards/SensorCard/SensorCard';
import styles from './DashboardInfo.module.scss';
import CronForm from 'components/Cards/ScheduleCard/CronForm/CronForm';
import { fetchCurrentWeather } from 'services/apiWeather/apiWeather';
import { useEffect, useState } from 'react';
import { ICurrentWeather } from 'types/weatherInterfaces';

const DashboardInfo: React.FC<{ area: IGetArea }> = ({ area }) => {
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
        {/*TODO <SensorCard id={area.sensors[0].id} name={area.sensors[0].name} type={area.sensors[0].type} reading={area.sensors[0].value} /> */}
        <SensorCard id="1" name="Humidity" type="humidity" reading={25} />
        {/*TODO <SensorCard id={area.sensors[1].id} name={area.sensors[1].name} type={area.sensors[1].type} reading={area.sensors[1].value} /> */}
        <SensorCard id="2" name="Temperature" type="temperature" reading={Math.round(currentWeather?.current.temp)} />
      </TopCard>
      <BottomCard>
        {/* TODO controllerId={areas[selectedArea].controllers[0].id} type issue */}
        <CronForm controllerId="1" controllerTopic="pump1" currentWeather={currentWeather} />
      </BottomCard>
    </div>
  );
};
export default DashboardInfo;
