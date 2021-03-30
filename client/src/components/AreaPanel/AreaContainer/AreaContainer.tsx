import { useState } from 'react';
import UpdateArea from '../UpdateArea/UpdateArea';
import { IPatchArea } from 'types/areaInterfaces';

import styles from './AreaContainer.module.scss';

const AreasDisplay: React.FC<{ area: IPatchArea; deleteArea: Function; patchArea:Function; cancelCreateArea:Function; cancelUpdateArea?:Function; areaOnUse : Function }> = ({ area, deleteArea, patchArea, cancelCreateArea, cancelUpdateArea, areaOnUse }) => {
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
 
  function goToAreasPanel() {
    setIsUpdating(false);
  }
  if (cancelUpdateArea) setIsUpdating(cancelUpdateArea());
  if (isUpdating) {
    return <UpdateArea area={area} patchArea={patchArea} goToAreasPanel={goToAreasPanel} />;
  } else
    return (
      <div className={styles.areaContainer} key={area.id}>
        <div>
          <h2>Area name: {area.id}</h2>
          <button onClick={() => areaOnUse(area)}>View</button>
        </div>
        <h2>Area longitude: {area.longitude}</h2>
        <h2>Area latitude: {area.latitude}</h2>
        <div>
          <button onClick={() => {setIsUpdating(!isUpdating); cancelCreateArea();}}>UPDATE</button>
          <button onClick={() => deleteArea(area.id)}>DELETE</button>
        </div>
      </div>
    );
};
export default AreasDisplay;
