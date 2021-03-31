import React, { useState } from 'react';
import NavBar from 'components/NavBar/NavBar';
import Dashboard from 'components/Dashboard/Dashboard';

import styles from './App.module.scss';
import IntroAnimation from 'components/IntroAnimation/IntroAnimation';

const App: React.FC = () => {
  const [isEndOfIntroAnimation, setIsEndOfIntroAnimation] = useState<boolean>(false);
  const firstLoad = window.sessionStorage.getItem('firstLoadDone');
  //check the session storage to see if the animation already ran
  if (!isEndOfIntroAnimation && firstLoad === null) {
    return <IntroAnimation setIsEndOfIntroAnimation={setIsEndOfIntroAnimation} />;
  } else
    return (
      <div className={`${styles.container} ${firstLoad === null && styles.animation}`}>
        <NavBar />
        <Dashboard />
      </div>
    );
};

export default App;
