import React, { useState, useEffect } from 'react';
import styles from './AreaPanel.module.scss';
import AreaContainer from './AreaContainer/AreaContainer';
import AddArea from './AreaForm/AddArea';
import { apiArea } from 'services/apiArea/apiArea';
import { IGetArea, IAddArea } from 'types/areaInterfaces';

import AreaForm from './AreaForm/AddArea';

const AreaPanel: React.FC<{
  user: string;
  areas: any;
  addingArea: (area: IAddArea) => void;
  deleteArea: (id: number) => void;
}> = ({ user, areas, deleteArea }) => {
  const [showAreaForm, setShowAreaForm] = useState<boolean>(false);

  // useEffect(() => {
  //   apiArea.getArea().then((area) => {
  //     setAreas(area);
  //   });
  // }, []);

  const addArea = (area: IAddArea) => {
    apiArea.postArea(area).then((area) => {
      // setAreas((prevAreas: any) => [...prevAreas, area]);
    });
  };

  function renderAreas() {
    return areas.map((area: IGetArea) => {
      return <AreaContainer area={area} deleteArea={deleteArea} />;
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles.panelTop}>
        <h2 className={styles.panelTitle}>AREAS</h2>
      </div>

      <div className={styles.areasContainer}>
        {renderAreas()}
        {showAreaForm && <AddArea addArea={addArea} />}
      </div>

      <button onClick={() => setShowAreaForm(!showAreaForm)} className={styles.newAreaButton}>
        NEW AREA
      </button>
    </div>
  );
};

export default AreaPanel;
