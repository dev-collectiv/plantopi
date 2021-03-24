import styles from './DashboardIllustration.module.scss';

const DashboardIllustration: React.FC = () => {
  return (
    <div className={styles.illustrationContainer}>
      <div className={styles.pictureContainer}>
        <img src="https://static.thenounproject.com/png/2240444-200.png" alt="" className={styles.picture} />
      </div>
      <div className={styles.buttonsContainer}>
        <button>START</button>
        <button>STOP</button>
      </div>
    </div>
  );
};

export default DashboardIllustration;
