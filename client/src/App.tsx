import styles from './App.module.scss';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import MenuSideBar from 'components/menuSideBar/MenuSideBar';
import Dashboard from 'components/dashboard/Dashboard';
import InfoSideBar from 'components/infoSideBar/InfoSideBar';

let socket = io('http://localhost:3002');

const App: React.FC = () => {
  return (
    <div className={styles.App}>
      <MenuSideBar />
      <Dashboard />
      <InfoSideBar />
    </div>
  );
};

export default App;
