import React, { useState, useEffect } from 'react';
import styles from './AreaPanel.module.scss';
import AreaContainer from './AreaContainer/AreaContainer';
import AddArea from './AddArea/AddArea';
import { IAddArea, IPatchArea, IGetArea } from 'types/areaInterfaces';

const AreaPanel: React.FC<{
  user: string;
  areas: any;
  addingArea: (area: IAddArea) => void;
  deleteArea: (id: number) => void;
  patchArea: (body: IPatchArea, id: number) => void;
  selectedArea: IGetArea | undefined;
  setAreaOnUse: (area: IGetArea) => void;
}> = ({ user, areas, deleteArea, addingArea, patchArea, setAreaOnUse, selectedArea }) => {
  const [showAreaNewForm, setShowAreaNewForm] = useState<boolean>(false);

  function cancelUpdateArea() {
    return false;
  }

  function renderAreas() {
    if (showAreaNewForm) return;
    return areas.map((area: IPatchArea) => {
      const active = selectedArea?.id === area.id ? true : false;
      return (
        <AreaContainer
          area={area}
          active={active}
          patchArea={patchArea}
          deleteArea={deleteArea}
          setAreaOnUse={setAreaOnUse}
          cancelCreateArea={cancelCreateArea}
        />
      );
    });
  }
  function cancelCreateArea() {
    setShowAreaNewForm(false);
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.panelTitle}>AREAS</h2>
      <div className={styles.areasContainer}>
        {renderAreas()}
        {showAreaNewForm && <AddArea addArea={addingArea} cancelCreateArea={cancelCreateArea} />}
      </div>
      <div className={styles.addAreaContainer}>
        <button
          onClick={() => {
            setShowAreaNewForm(true);
            cancelUpdateArea();
          }}
          className={styles.addAreaButton}
        >
          NEW AREA
        </button>
      </div>
    </div>
  );
};

export default AreaPanel;
