import React from 'react';
import styles from './AreaPanel.module.scss';
import AreasDisplay from './AreasDisplay/AreasDisplay';
import AreaForm from './AreaForm/AreaForm';
import { IAddArea } from '../../types/areaInterfaces';
import { useState } from 'react';

const AreaPanel: React.FC<{
  user: string;
  areas: any;
  addingArea: (area: IAddArea) => void;
  deleteArea: (id: number) => void;
}> = ({ user, areas, addingArea, deleteArea }) => {
  const [showAreaForm, setShowAreaForm] = useState<boolean>(false);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Areas</h1>
        <button onClick={() => setShowAreaForm(!showAreaForm)}> + </button>
      </div>
      <div className={styles.areaContainer}></div>
      {areas && <AreasDisplay user={user} areas={areas} deleteArea={deleteArea} showAreaForm={showAreaForm} />}
      {showAreaForm && <AreaForm user={user} addingArea={addingArea} />}
    </div>
  );
};

export default AreaPanel;
