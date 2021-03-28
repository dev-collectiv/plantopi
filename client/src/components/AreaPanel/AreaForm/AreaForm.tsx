import { useState } from 'react';
import { IAddArea } from '../../../types/areaInterfaces';
import styles from './AreaForm.module.scss';
const AddArea: any = (props: IAddArea | any) => {
  const [newArea, setNewArea] = useState<IAddArea>({
    userId: 0,
    isActive: false,
    sensors: []
  });

  const handleEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewArea({
      ...newArea,
      [e.target.name]: [e.target.value]
    });
  };

  const handleActivity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewArea({
      ...newArea,
      [e.target.name]: !newArea.isActive
    });
  };

  return (
    <form className={styles.formsContainer} onSubmit={() => props.addingArea(newArea)}>
      <h4>New Area</h4>
      <label>
        <h3> User Id:</h3>
        <input value={newArea.userId} name="userId" type="text" onChange={handleEvent} />
      </label>
      <label>
        <h3> sensors:</h3>
        <input value={newArea.sensors} name="sensors" type="text" onChange={handleEvent} />
      </label>
      <div className={styles.isactive}>
        <h3>Is Active?</h3>
        {/* <input value={newArea.isActive} name="isActive" type="checkbox" onChange={handleActivity} /> */}
      </div>
      <div>
        <button className={styles.btn} type="submit">
          submit
        </button>
      </div>
    </form>
  );
};

export default AddArea;
