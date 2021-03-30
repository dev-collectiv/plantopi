import { useState } from 'react';
import UpdateArea from '../UpdateArea/UpdateArea';
import { IPatchArea } from 'types/areaInterfaces';
import { useDebounce } from 'utils';

import styles from './AreaContainer.module.scss';
import { Delete, Settings } from 'assets';

const AreasDisplay: React.FC<{ area: IPatchArea; deleteArea: Function; patchArea: Function }> = ({ area, deleteArea, patchArea }) => {
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [hover, setHover] = useState<boolean>(false);

  area.name = 'Pineapple';
  function goToAreasPanel() {
    setIsUpdating(false);
  }

  const handleMouseLeave = useDebounce(() => {
    setHover(false);
  }, 250);

  if (isUpdating) {
    return <UpdateArea area={area} patchArea={patchArea} goToAreasPanel={goToAreasPanel} />;
  } else
    return (
      <div
        onMouseEnter={() => {
          setHover(true);
        }}
        onMouseLeave={handleMouseLeave}
        className={styles.areaContainer}
        key={area.id}
      >
        <div className={styles.content}>
          <h1>{area.name}</h1>
          <p>
            Poblenou - Barcelona
            {/* {area.latitude}/{area.longitude} */}
          </p>
          <p>
            (Sensor{area.id} - Pump{area.id})
          </p>
        </div>
        {hover && <Settings onClick={() => setIsUpdating(!isUpdating)} className={`${styles.svg} ${styles.settings}`} />}
      </div>
    );
};
export default AreasDisplay;
