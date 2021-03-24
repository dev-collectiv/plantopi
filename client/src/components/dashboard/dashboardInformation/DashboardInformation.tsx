import style from './DashboardInformation.module.scss';
const DashboardInformation: React.FC = () => {
  return (
    <div className={style.informationContainer}>
      <div className={style.sensorInformation}>
        <div className={style.humidity}>
          <h2>25%</h2>
          <p>Humidity</p>
        </div>
        <div className={style.temperature}>
          <h2>30ºC</h2>
          <p>temperature</p>
        </div>
      </div>
      <div className={style.chartContainer}>
        <img
          src="https://png.pngtree.com/png-vector/20190223/ourlarge/pngtree-charts-glyph-black-icon-png-image_691516.jpg"
          alt=""
          className={style.chart}
        />
      </div>
    </div>
  );
};
export default DashboardInformation;
