import styles from './Dashboard.module.scss';
import DashboardTop from './DashboardTitle/DashboardTitle';
import DashboardIllustration from './DashboardIllustration/DashboardIllustration';
import DashboardInfo from './DashboardInfo/DashboardInfo';
const Dashboard = () => {
  return (
    <div className={styles.container}>
      <DashboardTop />
      <div className={styles.contentContainer}>
        <DashboardIllustration />
        <DashboardInfo />
      </div>
    </div>
  );
};
export default Dashboard;
