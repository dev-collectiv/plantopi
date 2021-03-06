import styles from './Dashboard.module.scss';
import React, { useEffect, useState } from 'react';

import { SocketContext, socket } from 'context/socket';

import { apiUser } from 'services/apiUser/apiUser';
import { apiArea } from 'services/apiArea/apiArea';
import { apiControllers } from 'services/apiControllers/apiControllers';
import { apiSensors } from 'services/apiSensors/apiSensors';

import { IGetUser } from 'types/userInterfaces';
import { IAddArea, IGetArea, IPatchArea } from 'types/areaInterfaces';
import { IGetControllers } from 'types/controllersInterfaces';
import { IGetSensors } from 'types/sensorsInterfaces';

import DashboardIllustration from './DashboardIllustration/DashboardIllustration';
import DashboardInfo from './DashboardInfo/DashboardInfo';
import AreaPanel from 'components/AreaPanel/AreaPanel';

const Dashboard = () => {
  const [users, setUsers] = useState<IGetUser[]>([]);
  const [areas, setAreas] = useState<IGetArea[]>([]);
  const [selectedArea, setSelectedArea] = useState<IGetArea>();
  const [controllers, setControllers] = useState<IGetControllers[]>([]);
  const [sensors, setSensors] = useState<IGetSensors[]>([]);

  useEffect(() => {
    apiUser.getUser().then((user) => {
      user && setUsers(user);
    });

    apiArea.getAreas().then((area) => {
      if (area) {
        setAreas(area);

        setSelectedArea(area[0]);
      }
    });

    apiControllers.getControllers().then((controller) => {
      controller && setControllers(controller);
    });

    apiSensors.getSensors().then((sensor) => {
      sensor && setSensors(sensor);
    });
  }, []);

  const addingArea = (area: IAddArea): void => {
    apiArea.postArea(area).then((area) => {
      area && setAreas((prevAreas: any) => [...prevAreas, area]);
    });
  };

  const deleteArea = (id: number): void => {
    apiArea.deleteArea(id);
    const areasfiltered: IGetArea[] = areas.filter((el: IGetArea) => {
      return el.id !== id;
    });
    setAreas(areasfiltered);
  };

  const patchArea = (body: IPatchArea, id: number): void => {
    apiArea.patchAreas(body, id).then((area) => {
      const updatedAreas = areas.map(el =>{
        if (el.id !== area.id) return el;
        return {...el, ...area};
      });
      setAreas(updatedAreas);
    });
    ;
  };

  const setAreaOnUse = (area: IGetArea): void => {
    setSelectedArea(area);
  };

  return (
    <SocketContext.Provider value={socket}>
      <div className={styles.container}>
        {/* TODO dashboardIllustration should receive controller's iotId instead, which should be created together with the area */}
        <DashboardIllustration controllerId={selectedArea?.id ? selectedArea?.id.toString() : '1' } />
        {/* TODO area={areas[selectedArea]} */}
        <DashboardInfo selectedArea={selectedArea} />
        {/* TODO user={users[selectedUser].id} */}
        <AreaPanel user="0" areas={areas} addingArea={addingArea} deleteArea={deleteArea} patchArea={patchArea} setAreaOnUse={setAreaOnUse} selectedArea={selectedArea} />
      </div>
    </SocketContext.Provider>
  );
};
export default Dashboard;