import React from 'react';
import styles from './AreaPanel.module.scss';
import AreasDisplay from './AreasDisplay/AreasDisplay';
import AddArea from './AreaForm/AreaForm';
import { apiArea } from '../../services/apiArea/apiArea';
import { IGetArea, IAddArea } from '../../types/areaInterfaces';
import { useEffect, useState } from 'react';

const AreaPanel: React.FC = () => {
  const [areas, setAreas] = useState<any>();
  const [showAreaForm, setShowAreaForm] = useState<boolean>(false);

  useEffect(() => {
    apiArea.getArea().then((area) => {
      setAreas(area); 
    });
  }, []);
 
  const addingArea = (area: IAddArea) => {
    apiArea.postArea(area).then((area) => {
      setAreas((prevAreas: any) => [...prevAreas, area]);
    });
    
  };
  
  const deleteArea = (id:number) => {
    apiArea.deleteArea(id);
    let areasfiltered:IGetArea[]=[];
    areas.map((el:IGetArea) => {
      if (el.id !== id) areasfiltered.push(el);
    });
    setAreas(areasfiltered);
  };
  return (
    <div className={styles.container}>
      <h1>Area</h1>
      <div className={styles.areaContainer}></div>
      {areas && <AreasDisplay areas={areas} deleteArea={deleteArea} />}
      <button onClick={() => setShowAreaForm(!showAreaForm)}> add </button>
      {showAreaForm && <AddArea addingArea={addingArea} />}
    </div>
  );
};

export default AreaPanel;
