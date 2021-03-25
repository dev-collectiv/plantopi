import styles from './Dashboard.module.scss';
import DashboardTop from './DashboardTop/DashboardTop';
import DashboardLeft from './DashboardLeft/DashboardLeft';
import DashboardRight from './DashboardRight/DashboardRight';
const Dashboard = () => {
  return (
    <div className={styles.container}>
      <DashboardTop />
      <div className={styles.contentContainer}>
        <DashboardLeft />
        <DashboardRight />
      </div>
    </div>
  );
};
export default Dashboard;
