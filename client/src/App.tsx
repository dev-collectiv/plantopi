import styles from './App.module.scss';
import React, { useEffect, useState } from 'react';
import NavBar from 'components/NavBar/NavBar';
import Dashboard from 'components/Dashboard/Dashboard';
import DetailBar from 'components/DetailBar/DetailBar';
import AreaPanel from 'components/AreaPanel/AreaPanel';

const App: React.FC = () => {
  return (
    <div className={styles.container}>
      <NavBar />
      <Dashboard />
      <DetailBar />
      <AreaPanel />
    </div>
  );
};

export default App;
