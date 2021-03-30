import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

import { Intro } from 'assets';
import styles from './IntroAnimation.module.scss';

const IntroAnimation: React.FC<{ setIsEndOfIntroAnimation: Function }> = ({ setIsEndOfIntroAnimation }) => {
  const svgRef = useRef(null);

  function handleEndOfIntroAnimation() {
    setIsEndOfIntroAnimation(true);

    window.sessionStorage.setItem('firstLoadDone', 'true');
  }

  useEffect(() => {
    const master = gsap.timeline({ onComplete: handleEndOfIntroAnimation });

    function animationBuilder(max = 10) {
      const scale = 40;

      const toDefaults = {
        rotate: 360,
        duration: 0.25,
        ease: 'none'
      };

      for (let i = 0; i < max; i++) {
        master.add(
          gsap
            .fromTo(
              svgRef.current,
              {
                transformOrigin: 'center',
                rotate: 0
              },
              {
                ...toDefaults
              }
            )
            .timeScale(Math.log(Math.sqrt(i)))
        );
      }

      master.add(
        gsap
          .to(svgRef.current, {
            ...toDefaults,
            duration: 0.75,
            scale: scale
          })
          .timeScale(Math.log(Math.sqrt(max)))
      );

      master.add(gsap.to(svgRef.current, { opacity: 0, duration: 0.5 }));
    }

    animationBuilder();

    return () => {
      master.kill();
      gsap.killTweensOf(svgRef.current);
    };
  }, []);

  return (
    <div className={styles.container}>
      <Intro className={styles.introSVG} ref={svgRef} />
    </div>
  );
};

export default IntroAnimation;
