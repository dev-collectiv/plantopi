import React from 'react';
import styles from './AreaPanel.module.scss';
import AreasDisplay from './AreasDisplay/AreasDisplay';
import AddArea from './AreaForm/AreaForm';
import { apiArea } from '../../services/apiArea/apiArea';
import { IGetArea } from '../../services/apiArea/areaInterfaces';
import { useEffect, useState } from 'react';

const AreaPanel: React.FC = () => {
  const [areas, setAreas] = useState<IGetArea[]>();
  const [showAreaForm, setShowAreaForm] = useState<boolean>(false);

  useEffect(() => {
    apiArea.getArea().then((area) => {
      setAreas(area);
    });
  }, []);

  const addingArea = (area: any) => {
    apiArea.postArea(area).then((area: any) => {
      setAreas((prevAreas: any) => [...prevAreas, area]);
    });
  };

  return (
    <div className={styles.container}>
      <h1>Area</h1>
      <div className={styles.areaContainer}></div>
      {areas && <AreasDisplay areas={areas} />}
      <button onClick={() => setShowAreaForm(!showAreaForm)}> add </button>
      {showAreaForm && <AddArea addingArea={addingArea} />}
    </div>
  );
};

export default AreaPanel;
