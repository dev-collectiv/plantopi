import React, { useState } from 'react';
import NavBar from 'components/NavBar/NavBar';
import Dashboard from 'components/Dashboard/Dashboard';

import styles from './App.module.scss';
import IntroAnimation from 'components/IntroAnimation/IntroAnimation';

const App: React.FC = () => {
  const [isEndOfIntroAnimation, setIsEndOfIntroAnimation] = useState<boolean>(false);

  if (!isEndOfIntroAnimation) {
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
