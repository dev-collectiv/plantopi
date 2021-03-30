import React, { useState } from 'react';
import NavBar from 'components/NavBar/NavBar';
import Dashboard from 'components/Dashboard/Dashboard';

import styles from './App.module.scss';
import IntroAnimation from 'components/IntroAnimation/IntroAnimation';

const App: React.FC = () => {
  const [isEndOfIntroAnimation, setIsEndOfIntroAnimation] = useState<boolean>(false);

  //check the session storage to see if the animation already ran
  if (!isEndOfIntroAnimation && window.sessionStorage.getItem('firstLoadDone') == null) {
    return <IntroAnimation setIsEndOfIntroAnimation={setIsEndOfIntroAnimation} />;
  } else
    return (
      <div className={styles.container}>
        <NavBar />
        <Dashboard />
      </div>
    );
};

export default App;
