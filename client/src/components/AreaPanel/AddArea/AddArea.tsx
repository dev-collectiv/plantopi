import { useState } from 'react';
import { IAddArea } from 'types/areaInterfaces';
import styles from './AddArea.module.scss';

const AddArea: React.FC<{ addArea: Function; cancelCreateArea: Function }> = ({ addArea, cancelCreateArea }) => {
  const [newArea, setNewArea] = useState<IAddArea>({
    name: '',
    isActive: false,
    sensors: []
  });

  const handleEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewArea({
      ...newArea,
      [event.target.name]: event.target.value
    });
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.cardTitle}>New Area</h3>
      <label className={styles.inputContainer}>
        <h3> Name</h3>
        <input value={newArea.name} name="name" type="text" onChange={handleEvent} />
      </label>
      <label className={styles.inputContainer}>
        <h3> Longitude</h3>
        <input value={newArea.longitude} name="longitude" type="text" onChange={handleEvent} />
      </label>
      <label className={styles.inputContainer}>
        <h3> Latitude</h3>
        <input value={newArea.latitude} name="latitude" type="text" onChange={handleEvent} />
      </label>

      <div className={styles.buttonContainer}>
        <button className={styles.btn} type="submit" onClick={() => cancelCreateArea()}>
          CANCEL
        </button>
        <button
          className={styles.btn}
          type="submit"
          onClick={() => {
            addArea(newArea);
            cancelCreateArea();
          }}
        >
          CREATE
        </button>
      </div>
    </div>
  );
};

export default AddArea;
