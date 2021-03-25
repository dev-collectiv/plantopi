import { Line } from 'react-chartjs-2';

import styles from './Chart.module.scss';

const Chart: React.FC = () => {
  const data = {
    labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
    datasets: [
      {
        data: [2, 1, 4, 2, 5, 2, 3],
        fill: false,
        backgroundColor: 'rgb(237, 137, 119)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
        fontFamily: 'Roboto'
      }
    ]
  };

  const options = {
    legend: { display: false },
    scales: {
      gridLines: {
        lineWidth: 2,
        color: 'rgb(170, 170, 170)'
      },
      xAxes: [
        {
          ticks: {
            fontSize: 11,
            fontColor: '#383838',
            fontWeight: 700
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            none: true,
            beginAtZero: true,
            stepSize: 0.5,
            maxTicksLimit: 5,
            suggestedMax: 5,
            fontFamily: 'Roboto',
            fontSize: 11,
            fontColor: '#383838',
            fontWeight: 700
          }
        }
      ]
    }
  };

  return (
    <div className={styles.container}>
      <Line data={data} options={options} />
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
