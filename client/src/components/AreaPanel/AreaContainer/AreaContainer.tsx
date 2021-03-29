import { useState } from 'react';
import UpdateArea from '../UpdateArea/UpdateArea';
import { IGetArea } from 'types/areaInterfaces';

import styles from './AreaContainer.module.scss';

const AreasDisplay: React.FC<{ area: IGetArea; deleteArea: Function; patchArea:Function }> = ({ area, deleteArea, patchArea }) => {
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  if (isUpdating) {
    return <UpdateArea area={area} patchArea={patchArea}/>;
  } else
    return (
      <div className={styles.areaContainer} key={area.id}>
        <h2>Area id: {area.id}</h2>
        <h2>Area sensors: {area.isActive}</h2>
        <h2>Area id: {area.id}</h2>
        <button onClick={() => setIsUpdating(!isUpdating)}>UPDATE</button>
        <button onClick={() => deleteArea(area.id)}>DELETE</button>
      </div>
    );
};
export default AreasDisplay;
