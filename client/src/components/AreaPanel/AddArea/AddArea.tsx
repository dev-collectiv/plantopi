import { useState } from 'react';
import { IAddArea } from 'types/areaInterfaces';
import styles from './AddArea.module.scss';

const AddArea: React.FC<{ addArea: Function;  cancelCreateArea:Function }> = ({ addArea, cancelCreateArea}) => {
  const [newArea, setNewArea] = useState<IAddArea>({
    userId: 0,
    isActive: false,
    sensors: []
  });

  const handleEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewArea({
      ...newArea,
      [event.target.name]: [event.target.value]
    });
  };

  return (
    <div className={styles.container}>
      <h4>New Area</h4>
      <label>
        <h3> User ID:</h3>
        <input className={styles.input} value={newArea.userId} name="userId" type="text" onChange={handleEvent} />
      </label>
      <label>
        <h3> Sensors:</h3>
        <input className={styles.input} value={newArea.sensors} name="sensors" type="text" onChange={handleEvent} />
      </label>
      <div>
        <button className={styles.btn} type="submit" onClick={() => {addArea(newArea); cancelCreateArea();} }>
          CREATE
        </button>
        <button className={styles.btn} type="submit" onClick={() => cancelCreateArea()}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddArea;
