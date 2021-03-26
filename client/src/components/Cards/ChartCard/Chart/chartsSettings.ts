const charSettings = {
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

export default charSettings;
