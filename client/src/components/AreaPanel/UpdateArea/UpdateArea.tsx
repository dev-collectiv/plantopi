import { useState } from 'react';
import { IPatchArea } from 'types/areaInterfaces';

import styles from './UpdateArea.module.scss';

const AreaUpdate: React.FC<{ area: IPatchArea; patchArea: Function; goToAreasPanel: Function }> = ({ area, patchArea, goToAreasPanel }) => {
  const [areaToUpdate, setAreaToUpdate] = useState<IPatchArea>({ ...area });

  const { id, isActive, longitude, latitude, user, sensors } = areaToUpdate;

  const handleEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAreaToUpdate({
      ...areaToUpdate,
      [event.target.name]: [event.target.value]
    });
  };

  const handleActivity = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAreaToUpdate({
      ...areaToUpdate,
      [event.target.name]: !areaToUpdate.isActive
    });
  };

  return (
    <div className={styles.areaContainer}>
      <form>
        <h4>Update Area</h4>
        <h3>Area name: {id}</h3>
        <label>
          <h3> Longitude:</h3>
          <input value={longitude} name="longitude" type="text" onChange={handleEvent} />
        </label>
        <label>
          <h3> Latitude: </h3>
          <input value={latitude} name="latitude" type="text" onChange={handleEvent} />
        </label>
        <div>
          <h3>Active: </h3>
          <input name="isActive" type="checkbox" onChange={handleActivity} />
        </div>
        <div>
          <button type="submit" onClick={() => patchArea(areaToUpdate, areaToUpdate.id)}>
            UPDATE
          </button>
          <button onClick={() => goToAreasPanel()}> CANCEL </button>
        </div>
      </form>
    </div>
  );
};
export default AreaUpdate;
