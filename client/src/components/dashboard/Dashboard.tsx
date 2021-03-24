import styles from './Dashboard.module.scss';
import DashboardHeader from './dashboardHeader/DashboardHeader';
import DashboardIllustration from './dashboardIllustration/DashboardIllustration';
import DashboardInformation from './dashboardInformation/DashboardInformation';
const Dashboard = () => {
  return (
    <div className={styles.dashboardContainer}>
      <DashboardHeader />
      <div className={styles.illustrationInformation}>
        <DashboardIllustration />
        <DashboardInformation />
      </div>
    </div>
  );
};
export default Dashboard;
