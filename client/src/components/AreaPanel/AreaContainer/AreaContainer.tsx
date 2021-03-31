import { useState } from 'react';
import UpdateArea from '../UpdateArea/UpdateArea';
import { IPatchArea } from 'types/areaInterfaces';
import { useDebounce } from 'utils';

import styles from './AreaContainer.module.scss';
import { Delete, Settings } from 'assets';

const AreasDisplay: React.FC<{
  area: IPatchArea;
  deleteArea: Function;
  patchArea: Function;
  cancelCreateArea: Function;
  cancelUpdateArea?: Function;
  setAreaOnUse: Function;
  active: boolean;
}> = ({ area, deleteArea, patchArea, cancelCreateArea, cancelUpdateArea, setAreaOnUse, active }) => {
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [hover, setHover] = useState<boolean>(false);

  function goToAreasPanel() {
    setIsUpdating(false);
  }

  if (cancelUpdateArea) setIsUpdating(cancelUpdateArea());

  if (isUpdating) {
    return <UpdateArea active={active} area={area} patchArea={patchArea} goToAreasPanel={goToAreasPanel} deleteArea={deleteArea} />;
  } else
    return (
      <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className={styles.areaContainer} key={area.id}>
        <h3 className={`${styles.cardTitle}  ${active && styles.active}`}>{area.name}</h3>
        <div className={styles.content} onClick={() => setAreaOnUse(area)}>
          <h3>Poblenou | Barcelona</h3>
          <p>
            (Sensor {area.id} - Pump {area.id})
          </p>
        </div>
        {hover && (
          <Settings
            onClick={() => {
              setIsUpdating(!isUpdating);
              cancelCreateArea();
            }}
            className={`${styles.svg} ${styles.settings}`}
          />
        )}
      </div>
    );
};
export default AreasDisplay;
