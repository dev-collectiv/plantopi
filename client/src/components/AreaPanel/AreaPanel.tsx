import React from 'react';
import styles from './AreaPanel.module.scss';
import AreasDisplay from './AreaContainer/AreaContainer';
import AddArea from './AreaForm/AreaForm';
import { apiArea } from '../../services/apiArea/apiArea';
import { IGetArea, IAddArea } from '../../types/areaInterfaces';
import { useEffect, useState } from 'react';

const AreaPanel: any = () => {
  const [areas, setAreas] = useState<IGetArea[]>([]);
  const [showAreaForm, setShowAreaForm] = useState<boolean>(false);

  useEffect(() => {
    apiArea.getArea().then((area) => {
      setAreas(area);
    });
  }, []);

  const addArea = (area: IAddArea) => {
    apiArea.postArea(area).then((area) => {
      setAreas((prevAreas: any) => [...prevAreas, area]);
    });
  };

  const deleteArea = (id: number) => {
    apiArea.deleteArea(id);
    const _areas = areas.filter((el: IGetArea) => {
      return el.id !== id;
    });
    setAreas(_areas);
  };

  function renderAreas() {
    return areas.map((area) => {
      return <AreasDisplay area={area} deleteArea={deleteArea} />;
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles.panelTop}>
        <h2 className={styles.panelTitle}>AREAS</h2>
      </div>
      <div className={styles.areasContainer}>
        {renderAreas()}
        {showAreaForm && <AddArea addingArea={addArea} />}
      </div>

      <button onClick={() => setShowAreaForm(!showAreaForm)} className={styles.newAreaButton}>
        NEW AREA
      </button>
    </div>
  );
};

export default AreaPanel;
