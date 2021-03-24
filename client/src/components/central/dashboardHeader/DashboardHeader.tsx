import styles from './DashboardHeader.module.scss';

const Header: React.FC = () => {
  return (
    <div className={styles.headerContainer}>
      <div className="areaInfo">
        <h1>Area 1 -Pump 1</h1>
        <h3>INFORMATION</h3>
      </div>
      <div className="search-container">
        <h4>L</h4>
        <h4>S</h4>
      </div>
    </div>
  );
};

export default Header;
