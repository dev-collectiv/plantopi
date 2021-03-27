import styles from './AreasDisplay.module.scss';
const AreasDisplay: any = ({ areas }: any) => {
  console.log(areas);
  if (areas) {
    return (
      <div className={styles.componentAreaContainer}>
        {areas.map((area: any) => (
          <div className={styles.areasContainer} key={areas.id}>
            <h2>Area id: {area.id}</h2>
            <h2>Area id: {area.id}</h2>
            <h2>Area id: {area.id}</h2>
          </div>
        ))}
      </div>
    );
  }
};
export default AreasDisplay;
