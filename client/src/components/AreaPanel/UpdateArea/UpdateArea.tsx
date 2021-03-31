import { useState } from 'react';
import { IPatchArea } from 'types/areaInterfaces';
import { useDebounce } from 'utils';

import { Delete } from 'assets';
import styles from './UpdateArea.module.scss';

// <button onClick={() => deleteArea(area.id)}>DELETE</button>

const AreaUpdate: React.FC<{ area: IPatchArea; patchArea: Function; goToAreasPanel: Function; deleteArea: Function }> = ({
  area,
  patchArea,
  deleteArea,
  goToAreasPanel
}) => {
  const [areaToUpdate, setAreaToUpdate] = useState<IPatchArea>({ ...area });

  const { longitude, latitude, name, id } = areaToUpdate;

  const handleEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAreaToUpdate({
      ...areaToUpdate,
      [event.target.name]: event.target.value
    });
  };

  const handleName = useDebounce((event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.textContent;
    if (name) {
      const _areaToUpdate: IPatchArea = { ...areaToUpdate, name };
      setAreaToUpdate(_areaToUpdate);
    }
  }, 250);

  return (
    <div className={styles.areaContainer}>
      <h3 className={styles.cardTitle} onInput={(event) => handleName(event)} contentEditable>
        {name}
      </h3>
      <Delete className={styles.deleteIcon} onClick={() => deleteArea(id)} />

      <label className={styles.inputContainer}>
        <h3>Longitude</h3>
        <input value={longitude} name="longitude" type="text" onChange={handleEvent} />
      </label>

      <label className={styles.inputContainer}>
        <h3>Latitude</h3>
        <input value={latitude} name="latitude" type="text" onChange={handleEvent} />
      </label>

      <div className={styles.buttonContainer}>
        <button onClick={() => goToAreasPanel()}>CANCEL</button>
        <button type="submit" onClick={() => {patchArea(areaToUpdate, areaToUpdate.id); goToAreasPanel();}}>
          UPDATE
        </button>
      </div>
    </div>
  );
};
export default AreaUpdate;
