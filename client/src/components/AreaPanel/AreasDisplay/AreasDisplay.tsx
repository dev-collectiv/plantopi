import styles from './AreasDisplay.module.scss';
import { IGetArea } from 'types/areaInterfaces';

const AreasDisplay: React.FC<{ area: IGetArea; deleteArea: Function }> = ({ area, deleteArea }) => {
  return (
    <div className={styles.container}>
      <div className={styles.areaContainer} key={area.id}>
        <h2>Area id: {area.id}</h2>
        <h2>Area sensors: {area.isActive}</h2>
        <h2>Area id: {area.id}</h2>
        <button onClick={() => deleteArea(area.id)}>DELETE</button>
      </div>
    </div>
  );
};
export default AreasDisplay;
