import styles from './App.module.scss';
import React, { useEffect, useState } from 'react';
import { SocketContext, socket } from 'context/socket';
import NavBar from 'components/NavBar/NavBar';
import Dashboard from 'components/Dashboard/Dashboard';

import { apiUser } from './services/apiUser/apiUser';
import { apiArea } from './services/apiArea/apiArea';
import { apiControllers } from './services/apiControllers/apiControllers';
import { apiSensors } from './services/apiSensors/apiSensors';

import { IGetUser } from './types/userInterfaces';
import { IGetArea } from './types/areaInterfaces';
import { IGetControllers } from './types/controllersInterfaces';
import { IGetSensors } from './types/sensorsInterfaces';

const App: React.FC = () => {
  const [users, setUsers] = useState<IGetUser[]>([]);
  const [areas, setAreas] = useState<IGetArea[]>([]);
  const [controllers, setControllers] = useState<IGetControllers[]>([]);
  const [sensors, setSensors] = useState<IGetSensors[]>([]);

  useEffect(() => {
    apiUser.getUser().then((user) => {
      setUsers(user);
    });
  }, []);

  useEffect(() => {
    apiArea.getArea().then((area) => {
      setAreas(area);
    });
  }, []);

  useEffect(() => {
    apiControllers.getControllers().then((controller) => {
      setControllers(controller);
    });
  }, []);

  useEffect(() => {
    apiSensors.getSensors().then((sensor) => {
      setSensors(sensor);
    });
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      <div className={styles.container}>
        <NavBar />
        <Dashboard />
      </div>
    </SocketContext.Provider>
  );
};

export default App;
