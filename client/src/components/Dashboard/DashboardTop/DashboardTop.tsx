import styles from './DashboardTop.module.scss';

const DashboardTop: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Area 1 - Pump 1</h1>
        <h3>INFORMATION</h3>
      </div>
      <div className={styles.shortcuts}>
        <h4>L</h4>
        <h4>S</h4>
      </div>
    </div>
  );
};

export default DashboardTop;
