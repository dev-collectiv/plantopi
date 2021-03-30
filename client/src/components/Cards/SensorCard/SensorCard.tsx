import { BGLogo } from 'assets';
import ISensorCardProps from './ISensorCardProps';
import styles from './SensorCard.module.scss';

const SensorCard: React.FC<ISensorCardProps> = (props) => {
  const { name, type, reading, position } = props;

  let celsius = true; //TODO get this from the settings

  let reading_data: { [key: string]: string } = {
    temperature: `${reading}º${celsius ? 'C' : 'F'}`,
    humidity: `${reading}%`
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.cardTitle}>{name}</h2>
      <BGLogo className={styles.background} />
      <span className={styles.readingContainer}>
        <h2 className={styles.reading}>{reading ? reading_data[type] : '--'}</h2>
      </span>
    </div>
  );
};

export default SensorCard;
