import './App.css';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import DashboardHeder from './components/central/dashboardHeader/DashboardHeader';
let socket = io('http://localhost:3002');

const App: React.FC = () => {
  return (
    <div className="App">
      <DashboardHeder />
    </div>
  );
};
export default App;
