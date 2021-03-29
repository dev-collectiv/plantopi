import React from 'react';
import { IAddArea, IGetArea } from 'types/areaInterfaces';

import TopCard from 'components/Cards/TopCard/TopCard';
import BottomCard from 'components/Cards/BottomCard/BottomCard';
import SensorCard from 'components/Cards/SensorCard/SensorCard';
import styles from './DashboardInfo.module.scss';
import CronForm from 'components/Cards/ScheduleCard/CronForm/CronForm';

const DashboardInfo: React.FC<{ area: IGetArea }> = ({ area }) => {
  return (
    <div className={styles.container}>
      <TopCard>
        {/*TODO <SensorCard id={area.sensors[0].id} name={area.sensors[0].name} type={area.sensors[0].type} reading={area.sensors[0].value} /> */}
        <SensorCard id="1" name="Humidity" type="humidity" reading={25} />
        {/*TODO <SensorCard id={area.sensors[1].id} name={area.sensors[1].name} type={area.sensors[1].type} reading={area.sensors[1].value} /> */}
        <SensorCard id="2" name="Temperature" type="temperature" reading={30} />
      </TopCard>
      <BottomCard>
        {/* TODO controllerId={areas[selectedArea].controllers[0].id} type issue */}
        <CronForm controllerId="1" controllerTopic="pump1" />
      </BottomCard>
    </div>
  );
};
export default DashboardInfo;
