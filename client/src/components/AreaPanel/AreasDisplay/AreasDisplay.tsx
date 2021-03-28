import styles from './AreasDisplay.module.scss';
import {IGetArea} from '../../../types/areaInterfaces';
const AreasDisplay: any = ({ areas, deleteArea, showAreaForm }: any) => {
   
  let styleContainer;
  if (showAreaForm) {
    styleContainer = styles.componentAreaContainer;
  } else {
    styleContainer=styles.componentAreaContainer2;
  }
  if (areas) {
    return (
      <div className={styleContainer}>
        {areas.map((area: IGetArea) => (
          <div className={styles.areasContainer} key={areas.id}>
            <h2>Area id: {area.id}</h2>
            <h2>Area id: {area.isActive}</h2>
            <h2>Area id: {area.id}</h2>
            <button onClick={() => deleteArea(area.id)}>delete </button>
          </div>
        ))} 
      </div>
    ); 
  }
};
export default AreasDisplay;
