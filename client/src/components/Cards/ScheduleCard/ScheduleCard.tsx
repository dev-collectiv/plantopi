import { useState, useEffect } from 'react';
import CronForm from './CronForm/CronForm';
import ScheduledCron from './ScheduledCron/ScheduledCron';

import { Dot } from 'assets';
import { postCrons, getCrons, patchCrons, deleteCrons } from 'services/apiCrons/apiCrons';
import { ICurrentWeather } from 'types/weatherInterfaces';
import { IAddCrons, ICron, IPatchCrons } from 'types/cronsInterfaces';

import styles from './ScheduleCard.module.scss';

interface Props {
  currentWeather?: ICurrentWeather;
  controllerId: string;
  controllerTopic: string;
}

const ScheduleCard: React.FC<Props> = ({ currentWeather, controllerId, controllerTopic }) => {
  const [scheduledCrons, setScheduledCrons] = useState<ICron[]>([]);
  const [activePanel, setActivePanel] = useState<number>(0);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    getCrons().then((crons) => {
      if (!crons) return;
      else setScheduledCrons(crons);
    });
  }, []);

  function handleScheduleCron(cron: string[], duration: string) {
    const _cronTimeString = cron.join(' ');

    const addCronObj: IAddCrons = {
      time: _cronTimeString,
      controllerId: controllerId,
      action: {
        id: controllerTopic,
        action: 'on',
        duration: +duration
      }
    };

    postCrons(addCronObj).then((cron: any) => {
      if (!cron) {
        setError(true);
        return;
      }

      setScheduledCrons([...scheduledCrons, cron]);
    });
  }

  function handlePatchCron(id: string, updateObj: IPatchCrons) {
    patchCrons(id, updateObj);
  }

  function handleDeleteCron(id: string) {
    deleteCrons(id).then((res) => {
      if (!res) return;
      if (res.affected === 1) {
        const _scheduledCrons = scheduledCrons.filter((cron) => cron.id !== id);
        setScheduledCrons(_scheduledCrons);
      }
    });
  }

  function renderScheduledCrons() {
    return scheduledCrons.map((cron) => {
      return <ScheduledCron key={cron.id} cron={cron} handlePatchCron={handlePatchCron} handleDeleteCron={handleDeleteCron} />;
    });
  }

  return (
    <>
      {activePanel === 0 ? (
        <CronForm
          handleScheduleCron={handleScheduleCron}
          currentWeather={currentWeather}
          controllerId={controllerId}
          controllerTopic={controllerTopic}
          error={error}
          scheduledCrons={scheduledCrons}
        />
      ) : (
        <div className={`${styles.container} ${styles.scrollPanelModule}`}>
          <h2 className={styles.panelTitle}>YOUR SCHEDULED ACTIONS</h2>
          {renderScheduledCrons()}
        </div>
      )}
      <div className={styles.panelDotContainer}>
        <Dot className={`${styles.svg} ${activePanel === 0 ? styles.active : null}`} onClick={() => setActivePanel(0)} />
        <Dot className={`${styles.svg} ${activePanel === 1 ? styles.active : null}`} onClick={() => setActivePanel(1)} />
      </div>
    </>
  );
};

export default ScheduleCard;
