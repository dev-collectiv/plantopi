import styles from './Dashboard.module.scss';
import DashboardIllustration from './DashboardIllustration/DashboardIllustration';
import DashboardInfo from './DashboardInfo/DashboardInfo';
import AreaPanel from 'components/AreaPanel/AreaPanel';

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <DashboardIllustration controllerId="1" />
      <DashboardInfo />
      <AreaPanel />
    </div>
  );
};
export default Dashboard;
