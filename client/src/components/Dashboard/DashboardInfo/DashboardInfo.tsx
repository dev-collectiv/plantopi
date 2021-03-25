import Chart from 'components/Chart/Chart';
import CronForm from 'components/cron-schedule/CronForm/CronForm';
import style from './DashboardInfo.module.scss';

const DashboardInfo: React.FC = () => {
  return (
    <div className={style.container}>
      <div className={style.gridContainer}>
        <div className={`${style.smallFirst} ${style.card} ${style.smallCard}`}>
          <span className={style.smallCardContainer}>
            <h2 className={style.cardTitle}>Humidity</h2>
            <h2 className={style.cardReading}>25%</h2>
          </span>
        </div>

        <div className={`${style.smallSecond} ${style.card} ${style.smallCard}`}>
          <span className={style.smallCardContainer}>
            <h2 className={style.cardTitle}>Temperature</h2>
            <h2 className={style.cardReading}>30ºC</h2>
          </span>
        </div>

        <div className={`${style.card} ${style.bigCard}`}>
          {/* <Chart /> */}
          <CronForm />
        </div>
      </div>
    </div>
  );
};
export default DashboardInfo;
