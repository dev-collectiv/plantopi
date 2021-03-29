import styles from './App.module.scss';
import React from 'react';
import NavBar from 'components/NavBar/NavBar';
import Dashboard from 'components/Dashboard/Dashboard';

const App: React.FC = () => {
  return (
    <div className={styles.container}>
      <NavBar />
      <Dashboard />
    </div>
  );
};

export default App;
