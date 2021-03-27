import React from 'react';
import styles from './AreaPanel.module.scss';
import AreasDisplay from './AreasDisplay/AreasDisplay';
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
 
  const addingArea = (area: IAddArea) => {
    apiArea.postArea(area).then((area) => {
      setAreas((prevAreas: any ) => [...prevAreas, area]);
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
      <div className={styles.title}>
        <h1>Areas</h1>
        <button onClick={() => setShowAreaForm(!showAreaForm)}> + </button>
      </div>
      <div className={styles.areaContainer}></div>
      {areas && <AreasDisplay areas={areas} deleteArea={deleteArea} showAreaForm={showAreaForm}/>}
      {showAreaForm && <AddArea addingArea={addingArea}  />}
    </div>
  );
};

export default AreaPanel;
