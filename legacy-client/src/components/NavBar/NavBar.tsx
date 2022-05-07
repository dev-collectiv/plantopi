import { Settings } from 'assets';

import styles from './NavBar.module.scss';

const NavBar: React.FC = () => {
  return (
    <div className={styles.container}>
      <img src={process.env.PUBLIC_URL + '/logo.png'} alt="plantopi-logo" className={styles.logo} />
      <Settings className={styles.svg} />
    </div>
  );
};

export default NavBar;
