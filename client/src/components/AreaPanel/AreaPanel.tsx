import React, { useState, useEffect } from 'react';
import styles from './AreaPanel.module.scss';
import AreaContainer from './AreaContainer/AreaContainer';
import AddArea from './AddArea/AddArea';
import { apiArea } from 'services/apiArea/apiArea';
import { IGetArea, IAddArea } from 'types/areaInterfaces';

const AreaPanel: React.FC<{
  user: string;
  areas: any;
  addingArea: (area: IAddArea) => void;
  deleteArea: (id: number) => void;
}> = ({ user, areas, deleteArea, addingArea }) => {
  const [showAreaForm, setShowAreaForm] = useState<boolean>(false);

  function renderAreas() {
    return areas.map((area: IGetArea) => {
      return <AreaContainer area={area} deleteArea={deleteArea} />;
    });
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.panelTitle}>AREAS</h2>

      <div className={styles.areasContainer}>
        {renderAreas()}
        {showAreaForm && <AddArea addArea={addingArea} />}
      </div>

      <button onClick={() => setShowAreaForm(!showAreaForm)} className={styles.newAreaButton}>
        NEW AREA
      </button>
    </div>
  );
};

export default AreaPanel;
