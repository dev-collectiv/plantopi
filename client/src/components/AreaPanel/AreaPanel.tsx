import React, { useState, useEffect } from 'react';
import styles from './AreaPanel.module.scss';
import AreaContainer from './AreaContainer/AreaContainer';
import AddArea from './AddArea/AddArea';
import { IAddArea, IPatchArea,  } from 'types/areaInterfaces';

const AreaPanel: React.FC<{
  user: string;
  areas: any;
  addingArea: (area: IAddArea) => void;
  deleteArea: (id: number) => void;
  patchArea: (body: IPatchArea, id: number) => void;
}> = ({ user, areas, deleteArea, addingArea, patchArea }) => {
  const [showAreaNewForm, setShowAreaNewForm] = useState<boolean>(false);
   
  function cancelUpdateArea() {
    return false;
  }
  function renderAreas() {
    if (showAreaNewForm) return;
    return areas.map((area: IPatchArea) => {
      return <AreaContainer area={area} deleteArea={deleteArea} patchArea={patchArea} cancelCreateArea={cancelCreateArea} />;
    });
  }
  function cancelCreateArea () {
    setShowAreaNewForm(false);
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.panelTitle}>AREAS</h2>

      <div className={styles.areasContainer}>
        {renderAreas()}
        {showAreaNewForm && <AddArea addArea={addingArea} cancelCreateArea={cancelCreateArea}/>}
      </div>

      <div className={styles.addAreaContainer}>
        <button onClick={() => {setShowAreaNewForm(true); cancelUpdateArea();}} className={styles.addAreaButton} >
          NEW AREA
        </button>
      </div>
    </div>
  );
};

export default AreaPanel;
