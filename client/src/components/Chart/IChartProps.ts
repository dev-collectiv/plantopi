interface IData {
  labels: string[];
  datasets?: IDataSets[];
}

interface IOptions {
  legend: { display: boolean };
  scales: IScales;
}
interface IDataSets {
  data: number[];
  fill?: boolean;
  backgroundColor?: string;
  borderColor?: string;
  fontFamily?: string;
}

interface IScales {
  gridLines: IGridLines;
  xAxes: ITicks[];
  yAxes: ITicks[];
}

interface IGridLines {
  lineWidth: number;
  color: string;
}
interface ITicks {
  ticks: {
    none?: boolean;
    beginAtZero?: boolean;
    stepSize?: number;
    maxTicksLimit?: number;
    suggestedMax?: number;
    fontFamily?: string;
    fontSize: number;
    fontColor: string;
    fontWeight: number;
  };
}
interface IChartProps {
  data: IData;
  options?: IOptions;
  position?: string;
}
export default IChartProps;
