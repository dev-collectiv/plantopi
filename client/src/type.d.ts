interface IArea {
  id: string | number; //TODO decide if we get number o string
  name: string;
  controllers: IController[];
  sensors: ISensor[];
}

interface ISensor {
  id: string;
  type: string;
  reading: number;
}

interface IController {
  id: string;
}

type AreaState = {
  areas: IArea[];
};

type AreaAction = {
  type: string;
  area: IArea;
};

type DispatchType = (args: AreaAction) => AreaAction;
