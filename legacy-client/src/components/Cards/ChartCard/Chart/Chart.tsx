import { Line } from 'react-chartjs-2';
import styles from './Chart.module.scss';
import IChartProps from './IChartProps';
import charSettings from './chartsSettings';
const Chart: React.FC<IChartProps> = (props) => {
  let options;
  if (props.options) {
    options = props.options;
  } else {
    options = charSettings;
  }

  return (
    <div className={styles.container}>
      <Line data={props.data} options={options} />
    </div>
  );
};

export default Chart;

// const [values, setValues] = useState([]);

// const onDragEnd = useDebounce(function (_, __, idx, value) {
//   const val = clamp(labels[idx], value);
//   const _values = [...values];

//   _values[idx] = val;

//   dispatch({ type: 'SET_ENVELOPE', values: _values });
// }, 100);

// useEffect(() => {
//   setValues(envelope);
// }, [envelope]);

// function clamp(key, val) {
//   switch (key) {
//     case 'A':
//       return val <= 2 ? val : 2;

//     case 'D':
//       return val <= 2 ? val : 2;

//     case 'S': {
//       return val <= 1 ? val : 1;
//     }

//     case 'R':
//       return val <= 5 ? val : 5;

//     default:
//       console.log('Please select a key using ADSR');
//   }
// }
